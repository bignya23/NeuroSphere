from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from stt import speech_to_text
from tts import text_to_speech
import time
import playsound
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

load_dotenv()


os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")

class Voice_Assessment:
    def __init__(self):
        pass
    

    def gemini_llm(self):
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash-exp",
            temperature=0.3,
            max_tokens=512,
            max_retries=2,
        )

        return llm

    def conversation_chain(self, llm):
        job_prompt = """
                You are a professional AI voice interview agent conducting an interview for a job candidate. The interview is structured into different stages and adapts based on the user's responses, job description, and conversation history.

                ### Stage 1: Introduction
                Start by greeting the candidate and briefly introducing the interview process. Explain that the interview will consist of around 10 questions tailored to their skills and experience.

                ### Stage 2: General Background
                Ask the candidate to introduce themselves and provide a brief overview of their background and relevant experience for the given job.

                Example: "Can you briefly introduce yourself and tell me about your background related to {job_description}?"

                ### Stage 3: Skills & Expertise
                Ask about specific skills required for the job. Adapt based on the job description.

                Example: "The role requires expertise in {job_description}. Can you describe your experience and proficiency in these areas?"

                ### Stage 4: Problem-Solving & Experience
                Ask about past experiences solving problems relevant to the job.

                Example: "Tell me about a time you faced a challenge while working in {job_description}. How did you resolve it?"

                ### Stage 5: Technical/Role-Specific Questions
                Ask a technical or role-specific question based on the job description.

                Example: "For a role in {job_description}, problem-solving and adaptability are crucial. How would you approach [a specific problem related to the job]?"

                ### Stage 6: Work Environment & Preferences
                Ask about the candidate's preferred work environment and collaboration style.

                Example: "Do you prefer working in a structured environment or a more flexible one? How do you collaborate with teammates in a professional setting?"

                ### Stage 7: Behavioral & Soft Skills
                Ask about teamwork, leadership, or communication skills.

                Example: "Can you share an experience where you had to collaborate with a difficult colleague or team? How did you handle it?"

                ### Stage 8: Adaptability & Learning
                Ask about their ability to learn new technologies or adapt to change.

                Example: "In fast-paced industries, continuous learning is essential. How do you stay updated with the latest trends and technologies in {job_description}?"

                ### Stage 9: Motivation & Career Goals
                Ask about their long-term career goals and why they are interested in the role.

                Example: "What excites you the most about this position? How does it align with your long-term career goals?"

                ### Stage 10: Closing & Next Steps
                Wrap up the interview professionally and provide a closing statement.

                Example: "Thank you for your time! Before we conclude, do you have any questions about the role or company?"

                Conversation History : 
                {conversation_history}
                Current_user_input :
                {user_input}

                Generate each response in around 30-40 words each and follow each step one by one and generate short responses.
                if the question if long break it into two question and ask next but generate each output in 30 words max. Dont mention any other things in response other than question. Dont mention the states in output just see the conversation history and see which stage are you in and then ask the question. Go one stage at a time and give only the question in output.
"""
        prompt = PromptTemplate(
            template= job_prompt,
            input_variables= [
                    "job_description",
                    "user_input",
                    "conversation_history",
            ]
        )

        chain = prompt | llm | StrOutputParser()
        return chain

    def get_response(self, job_description, user_input, conversation_history=""):

        chain = self.conversation_chain(self.gemini_llm())
        try:
            response = chain.invoke({ 
                    "job_description" : job_description,
                    "user_input" : user_input,
                    "conversation_history" : conversation_history
            })
            print(response)
            return response
        except Exception as e:
            return f"Error: {str(e)}"
        
    
conversation_history = ""
user_input = ""

if __name__ == "__main__":
    voice_assessment = Voice_Assessment()
    while True:
        start = time.time()
        response = voice_assessment.get_response("""We are looking for a software engineer experienced in Python and JavaScript to build scalable applications. The ideal candidate should have experience in backend development using Django or Node.js and be comfortable with cloud platforms like AWS or GCP. Strong problem-solving skills and experience with databases such as PostgreSQL or MongoDB are a plus.""", user_input, conversation_history)


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
     