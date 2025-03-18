import os
import io
import wave
from google.cloud import speech
from pydub import AudioSegment
from gtts import gTTS  # Import Google Text-to-Speech

# Set Google Cloud credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\neurosphereai-9c5ea10a21b0.json"


def ensure_wav_format(file_path):
    """Ensures the audio file is in WAV format (converts if needed) and returns its sample rate."""
    if file_path.lower().endswith(".wav"):
        with wave.open(file_path, "rb") as wav_file:
            sample_rate = wav_file.getframerate()
        return file_path, sample_rate  # Already a WAV file, return as is

    elif file_path.lower().endswith(".mp3"):
        # Convert MP3 to WAV
        audio = AudioSegment.from_mp3(file_path)
        wav_path = file_path.replace(".mp3", ".wav")
        audio.export(wav_path, format="wav")

        with wave.open(wav_path, "rb") as wav_file:
            sample_rate = wav_file.getframerate()
        
        return wav_path, sample_rate  # Return new WAV file and its sample rate

    else:
        raise ValueError("Unsupported file format. Please provide a WAV or MP3 file.")


def transcribe_audio(file_path):
    """Transcribes audio using Google Cloud Speech-to-Text API."""
    client = speech.SpeechClient()

    # Ensure file is in WAV format and get its sample rate
    wav_path, sample_rate = ensure_wav_format(file_path)

    with io.open(wav_path, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=sample_rate,  # Dynamically set the correct sample rate
        language_code="en-IN"
    )

    # Perform speech recognition
    response = client.recognize(config=config, audio=audio)

    # Extract transcription
    transcription = "\n".join(result.alternatives[0].transcript for result in response.results)
    print("Transcription:\n", transcription)
    return transcription




if __name__ == "__main__":
    file_path = r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\Podcast\output.mp3"  # Replace with your file path
    transcription = transcribe_audio(file_path)

    print(transcription)

