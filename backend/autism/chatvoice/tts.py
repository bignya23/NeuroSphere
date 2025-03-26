import os
import time
import uuid
from google.cloud import texttospeech
from google.api_core.exceptions import GoogleAPICallError
from django.conf import settings
from dotenv import load_dotenv

load_dotenv()

base_dir = r"C:\Users\bigny\OneDrive\Desktop\neuro\latest\NeuroSphereAI"
os.makedirs(base_dir, exist_ok=True) 

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIAL")

def text_to_speech_female(text):
    try:
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIAL")
        client = texttospeech.TextToSpeechClient()
        synthesis_input = texttospeech.SynthesisInput(text=text)
        uuid_ = uuid.uuid4()
        os.makedirs(settings.MEDIA_ROOT, exist_ok=True)
        output_file = os.path.join(settings.MEDIA_ROOT, f"female_{uuid_}.mp3")

        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US",
            name="en-US-Chirp-HD-F",
            ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
        )

        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        response = client.synthesize_speech(
            input=synthesis_input, 
            voice=voice, 
            audio_config=audio_config
        )

   
        with open(output_file, "wb") as out:
            out.write(response.audio_content)

        print(f"Audio saved at: {output_file}")
        return f"/media/female_{uuid_}.mp3" 

    except GoogleAPICallError as e:
        print(f" Google Cloud API error: {e}")
        return None


if __name__ == "__main__":
    start = time.time()
    text_to_speech_female("Hello! This is a test using Google Cloud Text-to-Speech.")
    end = time.time()
    print(f"Time Taken: {end - start} seconds")
