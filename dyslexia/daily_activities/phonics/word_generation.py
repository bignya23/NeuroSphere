from pydantic import BaseModel,TypeAdapter, Field
import os
from google import genai
from typing import List
from dotenv import load_dotenv
from prompt import WORD_GENERATION_PROMPT
import json



load_dotenv()


client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


class Agent(BaseModel):
    phoneme : str = Field(description="The full unit of sound in a word.")
    word : str= Field(description="The word generated")
    description : str = Field(description="Explain the word and how to pronounce the phonome in simple english")
    
def word_generation(username : str = "" ):
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

def base_word():  
    text = word_generation(username= "Ram")
    response_data = json.loads(text)  

    words = [item["word"] for item in response_data]
    return words
print (base_word())







        