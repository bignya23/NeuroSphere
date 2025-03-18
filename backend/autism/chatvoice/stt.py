import os
import io
from google.cloud import speech
from pydub import AudioSegment

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\neurosphereai-9c5ea10a21b0.json"


def convert_mp3_to_wav(mp3_path):
    """Converts an MP3 file to WAV format."""
    audio = AudioSegment.from_mp3(mp3_path)
    wav_path = mp3_path.replace(".mp3", ".wav")
    audio.export(wav_path, format="wav")
    return wav_path


def transcribe_audio(file_path):
    """Transcribes audio using Google Cloud Speech-to-Text API."""
    client = speech.SpeechClient()


    wav_path = convert_mp3_to_wav(file_path)


    with io.open(wav_path, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code="en-IN"
    )

    # Perform speech recognition
    response = client.recognize(config=config, audio=audio)

    # Print transcription
    transcription = "\n".join(result.alternatives[0].transcript for result in response.results)
    print("Transcription:\n", transcription)
    return transcription

if __name__ == "_main_":
    file_path = r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\Podcast\output.mp3"  # Replace with your MP3 file path
    print(transcribe_audio(file_path))
    