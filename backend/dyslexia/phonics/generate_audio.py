import os
from tts import text_to_speech_female
from word_generation import base_word

AUDIO_DIR = r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\dyslexia\daily_activities\phonics\audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

def tts_words():
    words = base_word()
    audio_files = []

    for word in words:
        filename = f"{word}.mp3"
        filepath = os.path.join(AUDIO_DIR, filename)

        if not os.path.exists(filepath):
            text_to_speech_female(word, save_path=filepath)

        
        audio_files.append(filepath)

    return audio_files
