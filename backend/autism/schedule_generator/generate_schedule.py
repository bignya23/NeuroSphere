from google import genai
from dotenv import load_dotenv
import os
from pydantic import BaseModel,TypeAdapter, Field
from typing import List

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


class Tasks(BaseModel):
    task_description : str = Field(description="A brief description of the task")
    task_no : int = Field(description="Number of the task")
    start_time  : str = Field(description="Start Time in 12 hr format")
    expected_end_time : str = Field(description="End time of the task in 12 hr format")
    task : str = Field(description="Tasks heading")


def generate_tasks(user_data : str = ""):
    prompt_template = f"""
    You are a highly skilled daily schedule generator. Below is the user input data in JSON format
    {user_data}.
    The JSON data contains a list of tasks (with some tasks having an assigned priority) and a description of how the user wants their day to be.
    Your task is to generate a comprehensive and realistic daily schedule that organizes the tasks based on their priority when provided,
    and incorporates the overall day description to ensure that there are well-distributed breaks and the day is balanced.
    Generate 3 schedules of the above activities and also include suggested activities in all the schedules at the end.
    """


    response = client.models.generate_content(
        model='gemini-2.0-flash-exp',
        contents=prompt_template,
        config={
            'response_mime_type': 'application/json',
            'response_schema': list[list[Tasks]],
        },
    )

    return response.text



if __name__ == "__main__":
    # value = get_user_input()
    generate_tasks(user_data="""{
  "tasks": [
    {
      "task": "coding practise",
      "priority": 3
    },
    {
      "task": "playing batminton",
      "priority": 2
    },
    {
      "task": "cycling in the outdoor",
      "priority": 4
    },
    {
      "task": "watching movie",
      "priority": 4
    },
    {
      "task": "lunch"
    },
    {
      "task": "dinner"
    },
    {
      "task": "bathing"
    }
  ],
  "day_description": "chill but do all the activities"
}""")