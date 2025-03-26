from google import genai
from dotenv import load_dotenv
import os
from pydantic import BaseModel,TypeAdapter, Field
from typing import List

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


class Tasks(BaseModel):
    id : int = Field(description="id of the task")
    category : str = Field(description="Category of the Tasks")
    task : str = Field(description="Tasks Description")



def generate_tasks(name = "", age = "", level = "", hobbies = "", conversation_history = "", disease = ""):
    prompt_template = f"""You are a specialized {disease}-friendly task generator. Your goal is to create engaging, personalized, and beneficial tasks for a user based on their **conversation history** and **hobbies**.

    ### **User Information**:
    - **Name**: {name}
    - **Age**: {age}
    - **Disease Level**: {level} 
    - **Hobbies**: {hobbies} 

    ### **Recent Conversation History**:
    {conversation_history}

    ### **Task Generation Guidelines**:
    1. **Simple & Clear Instructions**: Tasks should be **direct and easy to follow**.
    2. **Hobby-Based Tasks**: If the user enjoys a certain activity, create a task around it.
    3. **Encourage Social Interaction**: If suitable, include small social tasks (e.g., "Tell someone about your favorite hobby").
    4. **Level-Appropriate Challenges**:
    - **Mild**: Can handle slightly challenging tasks (e.g., "Ask a friend about their favorite movie").
    - **Moderate**: Focus on structured activities (e.g., "Describe your favorite hobby in 3 sentences").
    - **Severe**: Keep it very simple and routine-based (e.g., "Point to something you like in a book").
    5. **Balanced Task Categories**: Include a mix of creative, logical, social, and relaxation tasks.

    ### **Task Format**:
    Generate **10 tasks** in this JSON format:
    ```json
    {{
        {{"id": 1, "category": "Social Interaction", "task": "Say 'Hi' to someone today."}},
        {{"id": 2, "category": "Social Interaction", "task": "When someone says 'Hello,' respond back."}},
        {{"id": 3, "category": "Social Interaction", "task": "Ask someone, 'How are you today?'"}},
        {{"id": 4, "category": "Social Interaction", "task": "Wave goodbye when you leave a room."}},
        {{"id": 5, "category": "Social Interaction", "task": "Say 'Thank you' when someone helps you."}}
    
    }}
    """


    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt_template,
        config={
            'response_mime_type': 'application/json',
            'response_schema': list[Tasks],
        },
    )

    
    return response.text
   



if __name__ == "__main__":
    print(generate_tasks("ravi", "14", "2", "cubing", ""))