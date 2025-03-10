from .....backend.autism.chatvoice.model import gemini_llm
from langchain_core.prompts import PromptTemplate

from langchain_core.output_parsers import StrOutputParser

class Voice_Assessment():

    def __init__():
        pass
    

    def conversation_chain(self, llm):
        job_prompt = ""
        prompt = PromptTemplate(
            template= job_prompt,
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

    def get_response(self, job_description, conversation_history=""):

        chain = self.conversation_chain(gemini_llm())
        try:
            response = chain.invoke({ 
                    "",
                    "conversation_history" : conversation_history
                    })

            return response
        except Exception as e:
            return f"Error: {str(e)}"

