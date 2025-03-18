import os
import sounddevice as sd
import wave
import numpy as np
from scipy.io.wavfile import write
from tts import text_to_speech_female
from word_generation import base_word
from analyse_audio import analyse_audio, summary_phonics

# Directory to save user audio
AUDIO_DIR = r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\dyslexia\daily_activities\phonics\user_audio"
os.makedirs(AUDIO_DIR, exist_ok=True)


SAMPLE_RATE = 44100 
DURATION = 3  

def record_audio(filename):
    """Records audio from the microphone and saves it to a file."""
    print("Recording... Speak now!")
    audio_data = sd.rec(int(SAMPLE_RATE * DURATION), samplerate=SAMPLE_RATE, channels=1, dtype=np.int16)
    sd.wait()
    write(filename, SAMPLE_RATE, audio_data)
    print(f"Audio saved: {filename}")

def main():
    target_word = base_word()[0]
    print(f"Target Word: {target_word}")

   
    text_to_speech_female(target_word)

    user_audio_path = os.path.join(AUDIO_DIR, f"user_{target_word}.wav")
    record_audio(user_audio_path)

 
    transcription = analyse_audio(user_audio_path)
    print(f"User said: {transcription}")


    feedback = summary_phonics(audio_path=user_audio_path, username="John", target_word=target_word, transcription_result=transcription)
    
    print("Feedback:", feedback)

if __name__ == "__main__":
    main()
