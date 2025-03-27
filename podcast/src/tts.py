import os
from google.cloud import texttospeech
import time 
import uuid
from dotenv import load_dotenv

load_dotenv()

# Set the path to your JSON key file
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\bigny\OneDrive\Desktop\neuro\final\NeuroSphereAI\neurosphere-453417-9278978670e4.json"


def text_to_speech_female_hindi(text):
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\bigny\OneDrive\Desktop\neuro\final\NeuroSphereAI\neurosphere-453417-9278978670e4.json"
    client = texttospeech.TextToSpeechClient()

    synthesis_input = texttospeech.SynthesisInput(text=text)
    uuid_ = uuid.uuid4()
    os.makedirs("../frontend/public/assets", exist_ok=True)
    output_file=f"../frontend/public/assets/female_{uuid_}.mp3"
    voice = texttospeech.VoiceSelectionParams(
        language_code="hi-IN",
        name="hi-IN-Chirp3-HD-Aoede",
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
    return f"/public/assets/female_{uuid_}.mp3"




def text_to_speech_male_hindi(text):
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\bigny\OneDrive\Desktop\neuro\final\NeuroSphereAI\neurosphere-453417-9278978670e4.json"
    client = texttospeech.TextToSpeechClient()

    synthesis_input = texttospeech.SynthesisInput(text=text)
    uuid_ = uuid.uuid4()
    os.makedirs("../frontend/public/assets", exist_ok=True)
    output_file=f"../frontend/public/assets/male_{uuid_}.mp3"
    voice = texttospeech.VoiceSelectionParams(
        language_code="hi-IN",
        name="hi-IN-Chirp3-HD-Charon",
        ssml_gender=texttospeech.SsmlVoiceGender.MALE
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
    return f"/public/assets/male_{uuid_}.mp3"




if __name__ == "__main__":
    start = time.time()
    print(text_to_speech_female_hindi("""
Aangan mera, galiyan yeh meri
Sooni lage har din dopehri
Taarikhon mein main rahun uljhi si
Saansein ruki, yeh hawa bhi bairi

Khaali sa daaman tere bin, piya
Bhar de yeh aangan laut ke, oh, piya
Kahun, main kahun tujhe, saajna, ke laut aao na
Dhoondhe hai, dhoondhe tujhe baawra mann, laut aao na
Ladi mann se, par gayi haar main, darpan mora bhi hai pyaar mein
Sehej karo mori uljhanein, haan, laut aao na

"""))
    end = time.time()
    print(f"Time Taken {end - start}")