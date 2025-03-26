import asyncio
import uuid
import json
import queue
import janus
import numpy as np
from channels.generic.websocket import AsyncWebsocketConsumer
from google.cloud import speech

# Import your own modules (adjust the paths as needed)
from .src.podcast_agent_threaded import PodcastAgent
from .src.user_handeling_agent import HandelUser
from .src.conv_history import store_chat_history, get_chat_history

# Constants for audio processing
RATE = 16000  
BUFFER_SIZE = RATE // 4 
SILENCE_THRESHOLD = 500  
SILENCE_DURATION = 50 

client = speech.SpeechClient()

def calculate_rms(chunk):
    """Calculate RMS value of audio chunk."""
    audio_data = np.frombuffer(chunk, dtype=np.int16)
    return np.sqrt(np.mean(np.square(audio_data)))

def audio_generator(audio_queue):
    """Sync generator for Google STT."""
    while True:
        chunk = audio_queue.sync_q.get()
        if chunk is None:
            break
        yield speech.StreamingRecognizeRequest(audio_content=chunk)
        audio_queue.sync_q.task_done()

async def process_audio(audio_queue, consumer):
    """Process audio with Google STT."""
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=RATE,
        language_code="en-US"
    )
    streaming_config = speech.StreamingRecognitionConfig(
        config=config, interim_results=True
    )

    response_queue = janus.Queue()

    def run_streaming():
        """Run blocking STT client."""
        try:
            responses = client.streaming_recognize(streaming_config, audio_generator(audio_queue))
            for response in responses:
                response_queue.sync_q.put(response)
            response_queue.sync_q.put(None)
        except Exception as e:
            response_queue.sync_q.put(e)

    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, run_streaming)

    try:
        while True:
            response = await response_queue.async_q.get()
            if response is None:
                break
            if isinstance(response, Exception):
                raise response

            for result in response.results:
                transcript = result.alternatives[0].transcript
                if result.is_final:
                    print(f"✅ Final: {transcript}")
                    await consumer.send_json({"Final": transcript})
                    break
                else:
                    print(f"⏳ Interim: {transcript}", end="\r")
    except Exception as e:
        print(f"STT Error: {e}")

async def process_audio_stream(consumer):
    """WebSocket audio processing with silence detection."""
    audio_queue = janus.Queue() 
    transcription_task = asyncio.create_task(process_audio(audio_queue, consumer))
    silent_chunks = 0
    chunks_needed = int(SILENCE_DURATION / (BUFFER_SIZE / RATE))  # ~12 chunks

    try:
        while True:
            chunk = await consumer.receive_bytes()
            
            # Silence detection
            rms = calculate_rms(chunk)
            if rms < SILENCE_THRESHOLD:
                silent_chunks += 1
                print(f"🛑 Silence detected ({silent_chunks}/{chunks_needed})")
            else:
                silent_chunks = 0  # Reset on speech
                print("🎙 Speech detected")

            if silent_chunks >= chunks_needed:
                print(f"🚫 {SILENCE_DURATION}s of silence detected, ending loop...")
                break  

            await audio_queue.async_q.put(chunk)

    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await audio_queue.async_q.put(None)
        await transcription_task
        audio_queue.close()
        await audio_queue.wait_closed()
        print("User function Connection closed")
        
        # Optionally, flush any pending messages.
        while True:
            try:
                pending = await asyncio.wait_for(consumer.receive_json(), timeout=0.1)
                print("Flushing pending message:", pending)
                break
            except (KeyError, asyncio.TimeoutError):
                break

async def endpoint_user(user_id, user_message, consumer):
    """Handles interactive chat with the user."""
    user_tts_queue = queue.Queue()
    user_output_queue = queue.Queue()
    handleUser = HandelUser()
    conversation_stage = 0

    while True:
        print("user called ")
        end_of_query_a = False
        end_of_query_b = False
        user_input = user_message
        conversation_history = get_chat_history(user_id)
        store_chat_history(user_id, "User", user_input, conversation_stage)
        conversation_history = get_chat_history(user_id)
        await handleUser.generate_agent_response(conversation_history, conversation_stage, user_output_queue, pdf_content=consumer.text_summary)
        alex_output, conversation_stage, emma_output = user_output_queue.get()

        if alex_output.endswith("[end_of_query]"):
            end_of_query_a = True
            alex_output = alex_output.removesuffix("[end_of_query]").rstrip()
            print(alex_output) 
             
        if emma_output.endswith("[end_of_query]"):
            end_of_query_b = True
            emma_output = emma_output.removesuffix("[end_of_query]").rstrip()
            print(emma_output)  
       
        store_chat_history(user_id, "Alex", alex_output, conversation_stage)
        store_chat_history(user_id, "Emma", emma_output, conversation_stage)
        alex_tts_task = asyncio.create_task(handleUser.generate_tts(text=alex_output, gender="male", output_queue=user_tts_queue))
        await alex_tts_task
        file_path_male = user_tts_queue.get()
        print(alex_output)
        await consumer.send_json({"speaker": "Alex", "text": alex_output, "audio": file_path_male, "stage": conversation_stage})
        emma_tts_task = asyncio.create_task(handleUser.generate_tts(text=emma_output, gender="female", output_queue=user_tts_queue))
        print("alex done")
        await emma_tts_task
        response = await consumer.receive_json()  # Waits until a JSON message is received
        print(response)
        
        if response['message'] == "chunks":
            await process_audio_stream(consumer) 
            print("audio processing ended")
            response1 = await consumer.receive_json()
            print(response1)
            if response1['message'] == "Yes":
                print(response1['input'])
                await endpoint_user(user_id, response1['input'], consumer)
                print("Loop ended")
                break
        
        if end_of_query_a:
            break

        file_path_female = user_tts_queue.get()
        await consumer.send_json({"speaker": "Emma", "text": emma_output, "audio": file_path_female, "stage": conversation_stage})
        print(emma_output)
        response = await consumer.receive_json()
        print(response)
        
        if response['message'] == "chunks":
            await process_audio_stream(consumer) 
            print("audio processing ended")
            response1 = await consumer.receive_json()
            print(response1)
            if response1['message'] == "Yes":
                print(response1['input'])
                await endpoint_user(user_id, response1['input'], consumer)
                print("Loop ended")
                break
        
        if end_of_query_b:
            break

# Dictionary to keep track of active users (if needed)
active_users = {}

class WebSocketKing(AsyncWebsocketConsumer):
    async def send_json(self, content, close=False):
        """Helper method to send JSON messages."""
        await self.send(text_data=json.dumps(content))
        if close:
            await self.close()

    async def receive_json(self):
        """
        Helper method that waits until a JSON message is received from the frontend.
        It waits (blocks) on an instance-level asyncio.Queue until a message is available.
        """
        return await self.json_message_queue.get()

    async def connect(self):
        self.user_id = str(uuid.uuid4())  
        await self.accept()
        # Create a queue to store incoming JSON messages from the frontend.
        self.json_message_queue = asyncio.Queue()
        active_users[self.user_id] = self  
        self.text_summary = ""  
        self.podcast_agent = PodcastAgent()
        alex_response_queue = queue.Queue()
        emma_response_queue = queue.Queue()
        alex_tts_queue = queue.Queue()
        emma_tts_queue = queue.Queue()
        prev_alex = ""
        prev_emma = ""
        try:
            await self.podcast_agent.generate_alex_response("", "1", alex_response_queue, pdf_content=self.text_summary)
            alex_output, conversation_stage = alex_response_queue.get()
            store_chat_history(self.user_id, "Alex", alex_output, conversation_stage)
            await self.podcast_agent.generate_tts(alex_output, "male", alex_tts_queue)
            prev_alex = alex_output
            conversation_history = get_chat_history(self.user_id)
            await self.podcast_agent.generate_emma_response(conversation_history, conversation_stage, emma_response_queue, pdf_content=self.text_summary)
            emma_output, conversation_stage = emma_response_queue.get()
            store_chat_history(self.user_id, "Emma", emma_output, conversation_stage)
            await self.podcast_agent.generate_tts(emma_output, "female", emma_tts_queue)
            prev_emma = emma_output
            conversation_history = get_chat_history(self.user_id)
            await self.podcast_agent.generate_alex_response(conversation_history, conversation_stage, alex_response_queue, pdf_content=self.text_summary)
            alex_output, conversation_stage = alex_response_queue.get()
            store_chat_history(self.user_id, "Alex", alex_output, conversation_stage)
            
            while True:
                conversation_history = get_chat_history(self.user_id)
                alex_tts_task = asyncio.create_task(self.podcast_agent.generate_tts(alex_output, "male", alex_tts_queue))
                emma_task = asyncio.create_task(self.podcast_agent.generate_emma_response(conversation_history, conversation_stage, emma_response_queue, self.text_summary))

                file_path_male = alex_tts_queue.get()
                await self.send_json({"speaker": "Alex", "text": prev_alex, "audio": file_path_male, "stage": conversation_stage})
                prev_alex = alex_output

                await alex_tts_task
                await emma_task

                if False:
                    print("Podcast Ended ... Closing Socket")
                    await self.close()
                    print(f"User {self.user_id} disconnected")
                    del active_users[self.user_id]
                    break

                response = await self.receive_json()

                if response.get('message') == "chunks":
                    await process_audio_stream(self) 
                    print("audio processing ended")
                    response1 = await self.receive_json()
                    print(response1)
                    if response1.get('message') == "Yes":
                        print(response1.get('input'))
                        await endpoint_user(self.user_id, response1.get('input'), self)
                        print("Loop ended")

                emma_output, conversation_stage = emma_response_queue.get()
                if emma_output.endswith("[end_of_podcast]"):
                    end_of_podcast = True
                    emma_output = emma_output.removesuffix("[end_of_podcast]").rstrip()

                store_chat_history(self.user_id, "Emma", emma_output, conversation_stage)

                conversation_history = get_chat_history(self.user_id)

                alex_task = asyncio.create_task(self.podcast_agent.generate_alex_response(conversation_history, conversation_stage, alex_response_queue, self.text_summary))
                emma_tts_task = asyncio.create_task(self.podcast_agent.generate_tts(emma_output, "female", emma_tts_queue))

                file_path_female = emma_tts_queue.get()
                await self.send_json({"speaker": "Emma", "text": prev_emma, "audio": file_path_female, "stage": conversation_stage})
                prev_emma = emma_output
                await emma_tts_task
                await alex_task

                if False:
                    print("Podcast Ended ... Closing Socket")
                    await self.close()
                    print(f"User {self.user_id} disconnected")
                    del active_users[self.user_id]
                    break

                response = await self.receive_json()

                if response.get('message') == "chunks":
                    await process_audio_stream(self) 
                    print("audio processing ended")
                    response1 = await self.receive_json()
                    print(response1)
                    if response1.get('message') == "Yes":
                        print(response1.get('input'))
                        await endpoint_user(self.user_id, response1.get('input'), self)
                        print("Loop ended")

                alex_output, conversation_stage = alex_response_queue.get()
                if alex_output.endswith("[end_of_podcast]"):
                    end_of_podcast = True
                    alex_output = alex_output.removesuffix("[end_of_podcast]").rstrip()

                store_chat_history(self.user_id, "Alex", alex_output, conversation_stage)

        except Exception as e:
            print("Error in WebSocketKing:", e)

    async def disconnect(self, close_code):
        print(f"User {self.user_id} disconnected")
        if self.user_id in active_users:
            del active_users[self.user_id]

    async def receive(self, text_data=None, bytes_data=None):
        """
        Overridden receive method.
        When text_data is provided, parse it as JSON and put it in the queue.
        """
        print("called")
        if text_data:
            try:
                data = json.loads(text_data)
                print(data['message'])
                # Put the received JSON into the queue so that receive_json() can return it.
                await self.json_message_queue.put(data)
            except Exception as e:
                print("Error parsing JSON:", e)
        elif bytes_data:
            # Handle binary data if needed.
            pass
