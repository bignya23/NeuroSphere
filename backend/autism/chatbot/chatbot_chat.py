from google import genai
from dotenv import load_dotenv
import os
from pydantic import BaseModel,TypeAdapter, Field
from typing import List
from prompt import NEURO_PROMPT_CHATBOT, SUICIDE_CHECK_PROMPT
from database import get_chat_history, store_chat_history
from tools import send_alert_email
import json
import playsound


load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class ChatbotGenerate:

    def __init__(self):
        pass

    class ChatBot_response(BaseModel):
        chatbot_output : str = Field(description="Current output of chatbot")
    class CheckResponse(BaseModel):
        check : str = Field(description="Outputs yes/no")

    def chatbot_response(self, name = "", age = "", hobbies = "", specific_needs = "", disease = "", gender = "", user_input = "", conversation_history=""):
        prompt_template = NEURO_PROMPT_CHATBOT.format(
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
                'response_schema': self.ChatBot_response,
            },
        )

        return response.text


    def content_checker(self, user_input = "", conversation_history=""):
        prompt_template = SUICIDE_CHECK_PROMPT.format(
            conversation_history=conversation_history,
            user_input=user_input)


        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt_template,
            config={
                'response_mime_type': 'application/json',
                'response_schema': self.CheckResponse,
            },
        )

        return response.text
    



if __name__ == "__main__":

    chatbot = ChatbotGenerate()

    while True:
        response_mail = chatbot.content_checker(conversation_history)
        print(f"Response Mail : {response_mail}")
        if(response_mail == "yes"):
            print(send_alert_email("bignya18@gmail.com","ram", conversation_history))
        response = chatbot.chatbot_response(name="ram", age="34", hobbies="cubing", disease="Dyslexia", gender="MALE",conversation_history=conversation_history)
        print(response)
        conversation_history += f"Chatbot: {response}"
        
        user_input = input("User : ")
        conversation_history += f"User : {user_input}"
