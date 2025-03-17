from word_generation import GeminiAI, AIRequest
from prompt import WORD_GENERATION_PROMPT
import json
from tts import text_to_speech_female
import time

def generate_and_speak_words(username="CJ", delay=2):
    """
    Generates a list of words using Gemini AI and converts them to speech with a delay.

    :param username: Name of the user to personalize the request.
    :param delay: Time delay (in seconds) between playing words.
    """
    gemini_ai = GeminiAI()
    request = AIRequest(prompt=WORD_GENERATION_PROMPT, username=username)
    response = gemini_ai.generate_response(request)

    try:
        data = json.loads(response)  # Ensure the response is valid JSON
        if isinstance(data, list):  
            words_list = [entry["word"] for entry in data if "word" in entry]  # Extract words safely
        else:
            print("Error: JSON response is not a list")
            words_list = []
    except json.JSONDecodeError:
        print("Error: Response is not a valid JSON format")
        words_list = []

    for word in words_list:
        text_to_speech_female(word)
        time.sleep(delay)

if __name__ == "__main__":
    generate_and_speak_words(username="CJ", delay=2)
