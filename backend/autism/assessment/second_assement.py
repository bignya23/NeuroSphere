from google import genai 
from google.generativeai import client
import os 
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from prompt import QUESTIONS_PROMPT
import random
from  questions import QUESTIONS

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class Agent(BaseModel):
    output: str = Field(description="Give feedback and accuracy of how the user answered the question")

def accuracy_score(username: str, question: str, answer: str) -> str:
    prompt_template = QUESTIONS_PROMPT.format(username=username, question=question, answer=answer)
    
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt_template,
        config={'response_schema': Agent, 'response_mime_type': 'application/json'}
    )
    
    return response.text


