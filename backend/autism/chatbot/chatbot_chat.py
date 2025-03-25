from google import genai
from dotenv import load_dotenv
import os
from pydantic import BaseModel,TypeAdapter, Field
from typing import List
from .prompt import NEURO_PROMPT_CHATBOT, SUICIDE_CHECK_PROMPT
from .database_chat import get_chat_history, store_chat_history
from .tools import send_alert_email
import json
import playsound


load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


class ChatBot_response(BaseModel):
        chatbot_output : str = Field(description="Current output of chatbot")
class CheckResponse(BaseModel):
        check : str = Field(description="Outputs yes/no")

def chatbot_response(name = "", age = "", hobbies = "", specific_needs = "", disease = "", gender = "", user_input = "", conversation_history=""):
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
                'response_schema': ChatBot_response,
            },
        )

    return response.text


def content_checker(user_input = "", conversation_history=""):
    prompt_template = SUICIDE_CHECK_PROMPT.format(
            conversation_history=conversation_history,
            user_input=user_input)


    response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt_template,
            config={
                'response_mime_type': 'application/json',
                'response_schema': CheckResponse,
            },
        )

    return response.text
    



if __name__ == "__main__":

   
    conversation_history = ""
    while True:
        user_input = input("User : ")
        conversation_history += f"user : {user_input}"
        response_mail = content_checker(user_input=user_input, conversation_history=conversation_history)
        print(f"Response Mail : {response_mail}")
        if(response_mail == "yes"):
            print(send_alert_email("bignya18@gmail.com","ram", conversation_history))
        response = chatbot_response(name="ram", age="34", hobbies="cubing", disease="Dyslexia", gender="MALE", user_input=user_input, conversation_history=conversation_history)
        print(response)
        conversation_history += f"Chatbot: {response}"
        