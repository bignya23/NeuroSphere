import os
from google.cloud import texttospeech
import time 

# Set the path to your JSON key file
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "../podcast-453414-c05b2436ab0b.json"


def text_to_speech(text, output_file="output.mp3"):
    client = texttospeech.TextToSpeechClient()

    synthesis_input = texttospeech.SynthesisInput(text=text)

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
    
    print(f"Audio content written to {output_file}")


if __name__ == "__main__":
    start = time.time()
    text_to_speech("Hello! hmm, This is um, a demo using Google Cloud um, Text-to-Speech with the Chirp HD hmm, voice.")
    end = time.time()
    print(f"Time Taken {end - start}")