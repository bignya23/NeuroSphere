from google import genai
import os 
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

myfile = client.files.upload(file=r'C:\Users\bigny\OneDrive\Desktop\neuro\NeuroSphereAI\dyslexia\daily_activities\phonics\audio\female_5c943263-323f-42da-a553-fbee7e705eeb.mp3')

response = client.models.generate_content(
  model='gemini-2.0-flash',
  contents=['Describe this audio clip', myfile]
)

print(response.text)