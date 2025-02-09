from langchain_core.prompts import PromptTemplate
from prompt import AUTISM_PROMPT_CHATBOT, SUICIDE_CHECK_PROMPT
from langchain_core.output_parsers import StrOutputParser
from llm import gemini_llm
from tools import send_alert_email


def conversation_chain(llm):
    """To get the Conversation Stage"""
    prompt = PromptTemplate(
        template= AUTISM_PROMPT_CHATBOT,
        input_variables= [
                "name",
                "age",
                "conversation_history",
                "hobbies",
                "level"
        ]
    )

    chain = prompt | llm | StrOutputParser()

    return chain


def conversation_chain_mail(llm):
    """To get the Conversation Stage"""
    prompt = PromptTemplate(
        template= SUICIDE_CHECK_PROMPT,
        input_variables= [
                "conversation_history"
             
        ]
    )

    chain = prompt | llm | StrOutputParser()

    return chain



def get_response(name = "", age = "", hobbies = "", level = "", conversation_history=""):

    chain = conversation_chain(gemini_llm())
    try:
        response = chain.invoke({
                "name" : name,
                "age" : age,
                "hobbies" : hobbies,
                "level" : level,
                "conversation_history" : conversation_history
                })

        return response
    except Exception as e:
        return f"Error: {str(e)}"
    
def get_response_mail(conversation_history=""):

    chain = conversation_chain_mail(gemini_llm())
    try:
        response = chain.invoke({
                "conversation_history" : conversation_history
                })

        return response
    except Exception as e:
        return f"Error: {str(e)}"


conversation_history = ""
user_input = ""

if __name__ == "__main__":
    while True:
        response_mail = get_response_mail(conversation_history)
        print(f"Response Mail : {response_mail}")
        if(response_mail == "yes"):
            print(send_alert_email("bignya18@gmail.com","ram", conversation_history))
            print("done")
    
        response = get_response("ram", "34" , "cubing", "1", conversation_history)
        print(f"Autism Chatbot: {response}")
        conversation_history += f"Autism Agent: {response}\n"

        user_input = input("User : ")

        conversation_history += f"User : {user_input}\n"


     
