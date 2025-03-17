from google import genai
import os
from dotenv import load_dotenv
from pydantic import BaseModel

from prompt import WORD_GENERATION_PROMPT

load_dotenv()

# Initialize the Google Gemini API client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Define a request model using Pydantic
class AIRequest(BaseModel):
    model: str = "gemini-2.0-flash"
    prompt: str
    username: str 


class GeminiAI:
    def __init__(self):
        self.client = client
    
    def generate_response(self, request: AIRequest):
        response = self.client.models.generate_content(
            model=request.model,
            contents=self.format_prompt(request.prompt, request.username),
        )
        return response.text
    
    @staticmethod
    def format_prompt(prompt: str, username: str) -> str:
        """
        Format the prompt using a template to improve AI responses.
        """
        return WORD_GENERATION_PROMPT.format(query=prompt, username=username)

gemini_ai = GeminiAI()
request = AIRequest(prompt=WORD_GENERATION_PROMPT, username="CJ") 
response = gemini_ai.generate_response(request)
print(response)
