from langchain_core.prompts import PromptTemplate
from prompts import AUTISM_PROMPT, AUTISM_SUPPORT_PROMPT
from langchain_core.output_parsers import StrOutputParser

def conversation_chain(llm):
    """To get the Conversation Stage"""
    prompt = PromptTemplate(
        template= AUTISM_PROMPT,
        input_variables= [
                "name",
                "age" ,
                "conversation_history"
        ]
    )

    chain = prompt | llm | StrOutputParser()

    return chain