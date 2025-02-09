from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

load_dotenv()

def gemini_llm_adhd():
    os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")
    adhd_llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-exp",
        temperature=0.7,
        max_tokens=512,
        max_retries=2,
    )

    return adhd_llm

