from langchain_core.prompts import PromptTemplate
from prompt import AUTISM_PROMPT_CHATBOT
from langchain_core.output_parsers import StrOutputParser
from llm import gemini_llm


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

conversation_history = ""
user_input = ""
while True:

    response = get_response(conversation_history)
    print(f"Autism Chatbot: {response}")
    conversation_history += f"Autism Agent: {response}\n"

    user_input = input("User : ")

    conversation_history += f"User : {user_input}\n"


     
