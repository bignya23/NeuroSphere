from model import gemini_llm
from chains import conversation_chain
from variables import *
import time
import playsound
from stt import audio_file, speech_to_text
from tts import text_to_speech

def get_response(name = "", age = "", hobbies = "", level = "", gender = "", user_input = "", conversation_history=""):

    chain = conversation_chain(gemini_llm())
    try:
        response = chain.invoke({ 
                "name" : name,
                "age" : age,
                "hobbies" : hobbies,
                "level" : level,
                "gender"  : gender,
                "user_input" : user_input,
                "conversation_history" : conversation_history
                })

        return response
    except Exception as e:
        return f"Error: {str(e)}"

conversation_history = ""
user_input = ""

if __name__ == "__main__":
    while True:

        start = time.time()
        response = get_response("Ravi", "23", "cubing", "2", "male", user_input, conversation_history)
        tts_file = text_to_speech(response)
        print(tts_file)
        playsound.playsound(tts_file)
        print(f"Autism Agent: {response}")
        conversation_history += f"Autism Agent: {response}\n"
        end = time.time()
        user_input = input("User : ")
        # filename = audio_file()
        # transcribed = speech_to_text(filename)
        # user_input = transcribed
        conversation_history += f"User : {user_input}\n"

        print(f"Time Taken : {end - start}")
     
