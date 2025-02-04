from langchain_core.prompts import PromptTemplate
from prompt import AUTISM_PROMPT_CHATBOT
from langchain_core.output_parsers import StrOutputParser
from llm import gemini_llm
from database.cache import get_chat_history, store_chat_history


def conversation_chain(llm):
    """To get the Conversation Stage"""
    prompt = PromptTemplate(
        template= AUTISM_PROMPT_CHATBOT,
        input_variables= [
                "name",
                "age",
                "conversation_history"
        ]
    )

    chain = prompt | llm | StrOutputParser()

    return chain



def get_response(conversation_history=""):

    chain = conversation_chain(gemini_llm())
    try:
        response = chain.invoke({
                "name" : "Ravi",
                "age" : "10",
                "conversation_history" : conversation_history
                })

        return response
    except Exception as e:
        return f"Error: {str(e)}"


user_input = ""
user_id = "ravi"
while True:

    response = get_response(get_chat_history(user_id))
    print(get_chat_history(user_id))
    print(f"Autism Chatbot: {response}")

    user_input = input("User : ")

    store_chat_history(user_id, user_input, response)



     
