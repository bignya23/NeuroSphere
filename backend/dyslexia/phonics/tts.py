import os
import time
import uuid
from google.cloud import texttospeech
from google.api_core.exceptions import GoogleAPICallError


os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"/Users/probindhakal/Desktop/NeuroSphereAI/NeuroSphereAI/neurosphere-453417-9278978670e4.json"

def text_to_speech_female(text):
    try:
        client = texttospeech.TextToSpeechClient()
        synthesis_input = texttospeech.SynthesisInput(text=text)
        uuid_ = uuid.uuid4()
        base_dir = os.getcwd()
        os.makedirs(base_dir, exist_ok=True) 
        output_file = os.path.join(base_dir, f"female_{uuid_}.mp3")

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

        print(f" Audio saved at: {output_file}")
        return output_file

    except GoogleAPICallError as e:
        print(f" Google Cloud API error: {e}")
        return None


if __name__ == "__main__":
    start = time.time()
    text_to_speech_female("Hello! This is a test using Google Cloud Text-to-Speech.")
    end = time.time()
    print(f"Time Taken: {end - start} seconds")
