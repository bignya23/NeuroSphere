# from google.cloud import speech
# import os 





# def transcribe_file(audio_file: str) -> speech.RecognizeResponse:
#     """Transcribe the given audio file.
#     Args:
#         audio_file (str): Path to the local audio file to be transcribed.
#             Example: "resources/audio.wav"
#     Returns:
#         cloud_speech.RecognizeResponse: The response containing the transcription results
#     """

#     os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\bigny\OneDrive\Desktop\neuro\latest\NeuroSphereAI\neurosphereai-9c5ea10a21b0.json"

#     client = speech.SpeechClient()

#     with open(audio_file, "rb") as f:
#         audio_content = f.read()

#     audio = speech.RecognitionAudio(content=audio_content)
#     config = speech.RecognitionConfig(
#         encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
#         sample_rate_hertz=16000,
#         language_code="en-US",
#     )

#     response = client.recognize(config=config, audio=audio)

#     # Each result is for a consecutive portion of the audio. Iterate through
#     # them to get the transcripts for the entire audio file.
#     for result in response.results:
#         # The first alternative is the most likely one for this portion.
#         print(f"Transcript: {result.alternatives[0].transcript}")

#     return response.speech_adaptation_info

# if __name__ == "__main__":
   
#     print(transcribe_file(r"C:\Users\bigny\OneDrive\Desktop\neuro\latest\NeuroSphereAI\female_bcc33ad8-0d13-4f9e-ac5e-b7bbd0c4e065.mp3"))


import wave
import time
from collections import deque

def transcribe_file(filename):
    import os
    from groq import Groq

    client = Groq()

    with open(filename, "rb") as file:
        transcription = client.audio.transcriptions.create(
        file=(filename, file.read()), 
        model="whisper-large-v3-turbo", 
        prompt="Specify context or spelling",  
        response_format="json",  
        language="en",  
        temperature=0.0  
        )

        return transcription.text

if __name__ == "_main_":
    # filename = audio_file()
    print(transcribe_file(r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\audio\female_3346fa73-ada0-40ff-94dd-c492b6e150dc.wav"))
 