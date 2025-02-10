from langchain_core.prompts import PromptTemplate
from prompts import AUTISM_PROMPT_1
from langchain_core.output_parsers import StrOutputParser

def conversation_chain(llm):
    """To get the Conversation Stage"""
    prompt = PromptTemplate(
        template= AUTISM_PROMPT_1,
        input_variables= [
                "name",
                "age",
                "conversation_history",
                "hobbies",
                "gender",
                "user_input",
                "level"
        ]
    )

    chain = prompt | llm | StrOutputParser()

    return chain