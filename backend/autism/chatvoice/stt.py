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

