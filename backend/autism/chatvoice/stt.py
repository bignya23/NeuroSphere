import os
import io
from google.cloud import speech

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\neurosphereai-9c5ea10a21b0.json"

def transcribe_audio(audio_file):
    client = speech.SpeechClient()

    with io.open(audio_file, "rb") as audio:
        content = audio.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=16000,
        language_code="en-US",
        enable_speaker_diarization=True,
        diarization_speaker_count=2,
        enable_automatic_punctuation=True
    )

    operation = client.long_running_recognize(config=config, audio=audio)
    print("Processing audio file... Please wait.")

    response = operation.result(timeout=600)

    print("\n🎙 **Transcription with Speaker Diarization:**\n")
    for result in response.results:
        alternative = result.alternatives[0]
        print(f"{alternative.transcript}")

if __name__ == "__main__":
    file_path = r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\female_3346fa73-ada0-40ff-94dd-c492b6e150dc.wav"  
    transcribe_audio(file_path)
