from userdetails import get_user_details
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from LLM import gemini_llm_adhd
from prompt import ADHD_PROMPT

def conversation_chain(llm):
    prompt = PromptTemplate(
        template=ADHD_PROMPT,
        input_variables=["name", "age", "interests", "adhd_type", "challenges", "conversation_history"]
    )
    return prompt | llm | StrOutputParser()

def get_response(name, age, interests, adhd_type, challenges, conversation_history):
    chain = conversation_chain(gemini_llm_adhd())
    try:
        response = chain.invoke({
            "name": name,
            "age": age,
            "interests": interests,
            "adhd_type": adhd_type,
            "challenges": challenges,
            "conversation_history": conversation_history
        })
        return response
    except Exception as e:
        return f"Error: {str(e)}"

#Loading
user_data = get_user_details()
conversation_history = ""

while True:
    response = get_response(
        user_data["name"], user_data["age"], user_data["interests"], 
        user_data["adhd_type"], user_data["challenges"], conversation_history
    )

    print(f"Chatbot: {response}")
    conversation_history += f"Chatbot: {response}\n"

    user_input = input("User: ")
    conversation_history += f"User: {user_input}\n"
