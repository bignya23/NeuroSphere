import os
from google.cloud import texttospeech
import uuid
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_CLOUD")

class Text_to_speech:
    def __init__(self):
        pass
    def text_to_speech_female(self , text):
        client = texttospeech.TextToSpeechClient()

        synthesis_input = texttospeech.SynthesisInput(text=text)
        uuid_ = uuid.uuid4()
        output_file = f"dyslexia/output/female_{uuid_}.mp3"
        
        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US",
            name="en-US-Chirp-HD-F",
            ssml_gender=texttospeech.SsmlVoiceGender .FEMALE
        )

        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        response = client.synthesize_speech(
            input=synthesis_input, 
            voice=voice, 
            audio_config=audio_config
        )

        os.makedirs(os.path.dirname(output_file), exist_ok=True)  

        with open(output_file, "wb") as out:
            out.write(response.audio_content)
        
        print(f"Audio content written to {output_file}")
        return output_file