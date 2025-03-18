from google import genai
from dotenv import load_dotenv
import os
from pydantic import BaseModel,TypeAdapter, Field
from typing import List
from .prompts import NEURO_PROMPT_CHATVOICE
import json
import playsound
import time
from .tts import *
load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class ChatVoice:
    def __init__(self):
        pass

    class ChatVoice_response(BaseModel):
        chatbot_output : str = Field(description="Current output of chatbot")


    def chatvoice_response(self, name = "", age = "", hobbies = "", specific_needs = "", disease = "", gender = "", user_input = "", conversation_history=""):
        prompt_template = NEURO_PROMPT_CHATVOICE.format(
            conversation_history=conversation_history,
            age=age,
            user_input=user_input,
            name=name,
            gender=gender,
            specific_needs=specific_needs,
            condition=disease,
            hobbies=hobbies)


        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt_template,
            config={
                'response_mime_type': 'application/json',
                'response_schema': self.ChatVoice_response,
            },
        )

        return response.text


conversation_history = ""
user_input = ""

chatvoice = ChatVoice()
text_to_speech = ""
if __name__ == "__main__":
    while True:
        start = time.time()
        response = chatvoice.chatvoice_response(name="ram", age="34", hobbies="cubing", disease="Dyslexia", gender="MALE",conversation_history=conversation_history)

        tts_file = text_to_speech.text_to_speech_female(response)
        print(tts_file)

        playsound.playsound(tts_file)
        print(f"VoiceAgent: {response}")
        conversation_history += f"VoiceAgent: {response}\n"
        end = time.time()
        user_input = input("User : ")

        conversation_history += f"User : {user_input}\n"

        print(f"Time Taken : {end - start}")
     