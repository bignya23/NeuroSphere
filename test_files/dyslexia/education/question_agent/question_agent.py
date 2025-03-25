from tts import Text_to_speech
from text_processing import Text_processing
from pydantic import BaseModel, Field
from prompts import DISLEXIA_PROMPT
from google import genai 
from  google.generativeai import client
import os
import playsound


client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


class Question_agent(BaseModel):
    agent_output : str = Field(description="Current output of agent")


def question_agent(user_name = "", text_content : str = "", conversation_history : str = "", user_input : str = "", age = ""):
    prompt_template = DISLEXIA_PROMPT.format(
        conversation_history=conversation_history,
        user_input=user_input,
        text_content= text_content,
        username=user_name,
        age = age)

    # print(prompt_template)

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt_template,
        config={
            'response_mime_type': 'application/json',
            'response_schema': Question_agent,
        },
    )

    return response.text



if __name__ == "__main__":
    conversation_history = ""
    text_to_speech = Text_to_speech()
    processing = Text_processing()

    text = "bihu in assam"
    processed_text = processing.summarise(text)
    while True:
        user_input = input("user : ")
        response = question_agent(user_name="Ram", text_content=processed_text, conversation_history=conversation_history, user_input=user_input, age = "20")
        print(response)
        output_file = text_to_speech.text_to_speech_female(processed_text)
        playsound.playsound(output_file)
    


    




        
