from google import genai 
from google.generativeai import client
import os 
from dotenv import load_dotenv
from pydantic import BaseModel , Field
from .prompt import PHONICS_PROMPT

load_dotenv()


client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class Agent(BaseModel):
    output : str = Field(description = "Give feedback about the how the user pronounce the word" )


def analyse_audio(audio_path):

    myfile = client.files.upload(file=audio_path)

    response = client.models.generate_content(
    model='gemini-2.0-flash',
    contents=['get the words from the audio', myfile]
    )
    return response.text
    


def summary_phonics(audio_path:str , username : str = "" ,target_word : str = ""  , transcription_result : str = "") -> str:
    prompt_template =PHONICS_PROMPT.format(username=username , target_word = target_word , transcription_result = transcription_result) 
    response = client.models.generate_content(
    model='gemini-2.0-flash',
    contents=prompt_template,
    config= {'response_schema': Agent,
             'response_mime_type' : 'application/json'}
    
    )

    return response.text


if __name__ == "__main__":

    audio_path = r"C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\dyslexia\daily_activities\phonics\audio\female_c478959d-0e87-484e-8d5a-dc2d3dac9507.mp3"

    transcription = analyse_audio(audio_path=audio_path)
   
    text = summary_phonics(audio_path = audio_path , username = "John" , target_word = "dream" , transcription_result = transcription)
    print(text)
    
    


