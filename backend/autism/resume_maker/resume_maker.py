from google import genai
from dotenv import load_dotenv
import os
from pydantic import BaseModel,TypeAdapter, Field
from typing import List
import json
load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


class ResumeMaker(BaseModel):
    resume : str = Field(description="Resume Description")


def generate_resume(name = "", phno = "", email = "", linkedin = "", education = "", skills = "", projects = "", experience = ""):
    prompt_template = f"""
    Prompt:
    Generate a professional and well-structured resume in a clean, ATS-friendly format based on the following details:

    Full Name: {name}
    Phone Number: {phno}
    Email Address: {email}
    LinkedIn/Leetcode/GitHub Profile: {linkedin}
    Education: {education}
    Skills: {skills}
    Projects: {projects}
    Experience: {experience}

    ### **Example Output:**

    **John Doe**  
    (123) 456-7890 | johndoe@example.com | LinkedIn | GitHub  

    **Education**  
    Bachelor of Science in Computer Science — XYZ University (2019 - 2023)  

    **Skills**  
    • Python, C++, JavaScript, SQL  
    • Machine Learning, Deep Learning, NLP  
    • Web Development, REST APIs, Flask, React  
    • Git, Docker, AWS  

    **Projects**  
    • *AI Chatbot for Customer Support*  
    Developed an AI chatbot using NLP (BERT) and Flask to automate customer queries, reducing response time by 60%.  
    Integrated with Telegram and WhatsApp for real-time support.  

    • *Stock Sentiment Analysis*  
    Built a financial news sentiment analysis tool using FinBERT and Flask.  
    Deployed on AWS with real-time stock news API integration.  

    **Experience**  
    • *Software Engineer Intern — ABC Tech (June 2022 - Aug 2022)*  
    Developed a scalable REST API using Flask and PostgreSQL.  
    Implemented an authentication system, improving security by 40%.  

    • *ML Research Intern — XYZ Labs (Jan 2023 - June 2023)*  
    Researched reinforcement learning for automated trading bots.  
    Optimized LSTM models for better predictive performance.  

    ---

    ### **Instructions for Formatting:**  
    • **Ensure professionalism, clarity, and an ATS-friendly layout.**  
    • **Do NOT use emojis.**  
    • **Use "•" for bullet points instead of dashes or asterisks.**  
    • **Use double asterisks `**Heading**` for section headers and single asterisks `*Bold Text*` for emphasis.**  
    • **Maintain proper spacing between sections for readability.**  
    • **If information is missing, intelligently add relevant details to enhance the resume.**  
    • **Ensure the output is structured in a way that can be parsed easily into a well-formatted PDF.**  
    """



    response = client.models.generate_content(
        model='gemini-2.0-flash-exp',
        contents=prompt_template,
        config={
            'response_mime_type': 'application/json',
            'response_schema': ResumeMaker,
        },
    )
    print(response.text)

    data = json.loads(response.text)

    return data["resume"]



if __name__ == "__main__":
    generate_resume(name = "John Doe", phno = "(123) 456-7890" , email = "johndoe@gmail.com"  ,linkedin = "https://linkedin.com/in/johndoe"   ,
    education = "Bachelor of Science in Computer Science, XYZ University (2019 - 2023)"  ,
    skills = "Python, C++, JavaScript, SQL, Machine Learning, Deep Learning, NLP, Web Development, Flask, React, Git, Docker, AWS"  ,
    projects = """
            "AI Chatbot"
            "Stock Sentiment Analysis , trading platform, fake news detection"
    """,
    experience = """
        
            "role": "Software Engineer Intern",
            "company": "ABC Tech",
            "duration": "June 2022 - Aug 2022",
            "responsibilities": [
                "Developed a scalable REST API using Flask and PostgreSQL.",
                "Implemented an authentication system, improving security by 40%."
            ]
        },
        {
            "role": "ML Research Intern",
            "company": "XYZ Labs",
            "duration": "Jan 2023 - June 2023",
            "responsibilities": [
                "Researched reinforcement learning for automated trading bots.",
                "Optimized LSTM models for better predictive performance."
            ]
        }
    ]"""
    )