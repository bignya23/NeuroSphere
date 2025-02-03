import time
import os
import requests
import wave
from io import BytesIO
from dotenv import load_dotenv
import uuid
from io import BytesIO
import wave

load_dotenv()

def save_audio_from_response(response):
    """
    Save WAV audio directly from the API response to a file.
    """

    os.makedirs("audio", exist_ok=True)
    id = uuid.uuid4()
    file_name = os.path.join("audio" , f"{id}.wav")
    print(file_name)
    if response.status_code == 200:
        # Load audio content into a BytesIO stream
        audio_stream = BytesIO(response.content)
        # Open the WAV file from the stream for reading
        with wave.open(audio_stream, 'rb') as wf:
            # Open the output file for writing
            with wave.open(file_name, 'wb') as output_file:
                # Copy audio parameters
                output_file.setnchannels(wf.getnchannels())
                output_file.setsampwidth(wf.getsampwidth()) 
                output_file.setframerate(wf.getframerate())
                # Write audio frames
                output_file.writeframes(wf.readframes(wf.getnframes()))
        print(f"Audio saved successfully as {file_name}.")
        return f"audio/{id}.wav"
    else:
        print(f"Failed to generate TTS audio. Status code: {response.status_code}, Response: {response.text}")



def text_to_speech(input_response="Hello this is me"):
    """
    Generate TTS audio and play it directly.
    """

    token = os.getenv("SMALLEST_API_KEY")
    start_in = time.time()
    url = "https://waves-api.smallest.ai/api/v1/lightning/get_speech"
    payload = {
        "voice_id": "deepika",
        "text": input_response,
        "sample_rate": 8000,
        "add_wav_header": True,
        "speed" : 1.3
    }
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    response = requests.request("POST", url, json=payload, headers=headers)
    end_in = time.time()
    print(end_in - start_in)

    return save_audio_from_response(response)

if __name__ == "__main__":
    start = time.time()
    text_to_speech()
    end = time.time()
