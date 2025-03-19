from pydantic import BaseModel,TypeAdapter, Field
import os
from google import genai
from typing import List
from dotenv import load_dotenv
from prompt import WORD_GENERATION_PROMPT
import json
from tts import text_to_speech_female


load_dotenv()


client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


class Agent(BaseModel):
    phoneme : str = Field(description="The full unit of sound in a word.")
    word : str= Field(description="The word generated")
    description : str = Field(description="Explain the word and how to pronounce the phonome in simple english")
    
def word_generate(username : str = "" ):
    prompt_template =WORD_GENERATION_PROMPT.format(username=username)
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt_template,
        config={
            'response_mime_type': 'application/json',
            'response_schema': list[Agent],
        },
    )

    return response.text

def word_with_tts(username):  
    text = word_generate(username=username)
    response_data = json.loads(text)  

    words = [item["word"] for item in response_data]
    file_paths = []
    for word in words:
        file_path = text_to_speech_female(word)
        file_paths.append(file_path)

    return file_paths


if __name__ == "__main__":
    print(word_with_tts())





        