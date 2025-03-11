from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .chatbot import chatbot_1, database, tools
from .chatvoice import agent, database_voice, tts, stt
from .support import send_mail_gmail
from .tasks_system import generate_tasks
from .resume_maker.resume_to_pdf import generate_resume_pdf
from django.http import FileResponse
from .schedule_generator.generate_schedule import generate_schedule_of_user
import os
from .Jobsearch.jobsearch import job_search

User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chatbot(request):
    user_input = request.data.get("query")
    user = request.user
    name = user.name
    email = user.email
    age = user.age
    level = user.disease_level
    parents_email = user.parents_email
    hobbies = user.hobbies
    gender = user.gender
    conversation_history = database_voice.get_chat_history(email)
    print(conversation_history)
    response_mail = chatbot_1.get_response_mail(user_input, conversation_history)
    print(f"Response Mail : {response_mail}")
    if(response_mail == "yes"):
        print(tools.send_alert_email(parents_email, name , conversation_history))
          
    response = chatbot_1.get_response(name, age , hobbies, level, gender, user_input, conversation_history)
  
    print(f"Autism Chatbot: {response}")
        
    database.store_chat_history(email, user_input, response)

    return Response({
        "chatbot" : response,
        "conversation_history" : conversation_history
    })



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chatvoice(request):
    audio_file = request.FILES("audio_file")
    user_input = stt.speech_to_text(audio_file)
    user = request.user
    name = user.name
    email = user.email
    age = user.age
    level = user.disease_level
    parents_email = user.parents_email
    hobbies = user.hobbies
    gender = user.gender
    conversation_history = database_voice.get_chat_history(f"{email}_voice")
    response = agent.get_response(name, age , hobbies, level, gender, user_input, conversation_history)
    tts_file = tts.text_to_speech(response)
    print(f"Autism Agent: {response}")
    
    database_voice.store_chat_history(f"{email}_voice",user_input, response)

    path = tts_file
    return Response({
        "file_path" : path,
        "conversation_history" : conversation_history
    })
    


@api_view(['GET']) 
@permission_classes([IsAuthenticated])  
def tasks(request):
    tasks_list = [
        {"id": 1, "category": "Social Interaction", "task": "Say 'Hi' to someone today."},
        {"id": 2, "category": "Social Interaction", "task": "When someone says 'Hello,' respond back."},
        {"id": 3, "category": "Social Interaction", "task": "Ask someone, 'How are you today?'"},
        {"id": 4, "category": "Social Interaction", "task": "Wave goodbye when you leave a room."},
        {"id": 5, "category": "Social Interaction", "task": "Say 'Thank you' when someone helps you."},
        {"id": 6, "category": "Social Interaction", "task": "Introduce yourself to someone new. ('My name is __.')"},
        {"id": 7, "category": "Social Interaction", "task": "Ask a friend what their favorite color or food is."},
        {"id": 8, "category": "Social Interaction", "task": "Share something about your favorite activity."},
        
        {"id": 9, "category": "Daily Living & Self-Care", "task": "Brush your teeth today."},
        {"id": 10, "category": "Daily Living & Self-Care", "task": "Wash your hands before eating."},
        {"id": 11, "category": "Daily Living & Self-Care", "task": "Drink a glass of water."},
        {"id": 12, "category": "Daily Living & Self-Care", "task": "Pick up your toys or clean your room."},
        {"id": 13, "category": "Daily Living & Self-Care", "task": "Help set the table for a meal."},
        {"id": 14, "category": "Daily Living & Self-Care", "task": "Choose your clothes and get dressed by yourself."},
        {"id": 15, "category": "Daily Living & Self-Care", "task": "Put your shoes on before going outside."},

        {"id": 16, "category": "Emotional & Sensory Regulation", "task": "Take five deep breaths when you feel overwhelmed."},
        {"id": 17, "category": "Emotional & Sensory Regulation", "task": "Use a fidget toy or stress ball when you need to focus."},
        {"id": 18, "category": "Emotional & Sensory Regulation", "task": "Listen to your favorite music when you feel upset."},
        {"id": 19, "category": "Emotional & Sensory Regulation", "task": "Tell someone how you are feeling today. ('I feel happy/sad/tired.')"},
        
        {"id": 20, "category": "School & Learning", "task": "Complete one page of your workbook or school task."},
        {"id": 21, "category": "School & Learning", "task": "Write or type your name."},
        {"id": 22, "category": "School & Learning", "task": "Follow a short instruction from your teacher or parent."},
        {"id": 23, "category": "School & Learning", "task": "Sit quietly and listen to a short story."}
    ]
    return Response({"tasks": tasks_list})    


@api_view(['GET']) 
# @permission_classes([IsAuthenticated])  
def tasks_generate(request):
    user = request.user
    conv_hist = database.get_chat_history(user.email)
    conv_hist += database_voice.get_chat_history(f"{user.email}_voice")
    tasks_list = generate_tasks.generate_tasks(user.name, user.age, user.disease_level, user.hobbies, conv_hist)


    return Response({"tasks": tasks_list})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def emergency(request):
    return Response({
        "emergency_contacts": [
            {
                "id": 1,
                "name": "National Autism Helpline",
                "contact": "+1 800 123 4567",
                "type": "Helpline"
            },
            {
                "id": 2,
                "name": "Parent Contact",
                "contact": "+1 234 567 8901",
                "type": "Guardian"
            }
        ],
        "nearest_hospitals": [
            {
                "id": 1,
                "name": "Autism Care Hospital",
                "location": "123 Main St, New York",
                "contact": "+1 555 678 9012",
                "navigation_link": "https://maps.google.com/xyz"
            }
        ],
        "my_doctors": [
            {
                "id": 1,
                "name": "Dr. Emily Davis",
                "specialty": "Autism Specialist",
                "contact": "+1 987 654 3210",
                "location": "Los Angeles, USA"
            },
            {
                "id": 2,
                "name": "Dr. Ravi kumar",
                "specialty": "Autism Specialist",
                "contact": "+1 345 654 3210",
                "location": "Munbai, India"
            }
        ]
    })



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sos_alert(request):
    user = request.user  
    parents_email = user.parents_email  

    if not parents_email:
        return Response({"error": "No guardian email found."}, status=400)
    subject = "🚨 SOS Alert: Emergency Situation 🚨"
    message = f"""
        {user.name} has triggered an SOS alert. Please check on them immediately.""",
    send_mail_gmail.send_alert_email(parents_email, subject, message)

    return Response({"message": "SOS alert sent successfully."})



@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def generate_resume(request):
    data = request.data
    name = data.get("name", "")
    phno = data.get("phno", "")
    email = data.get("email", "")
    linkedin = data.get("linkedin", "")
    education = data.get("education", "")
    skills = data.get("skills", "")
    projects = data.get("projects", [])
    experience = data.get("experience", [])

    filename = "resume.pdf"
    file_path = os.path.join(os.getcwd(), filename)  
    generate_resume_pdf(name, phno, email, linkedin, education, skills, projects, experience, file_path)

    pdf_file = open(file_path, 'rb')
    response = FileResponse(pdf_file, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    
    return response


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def generateSchedule(request):
    user_schedule = request.data.get("user_schedule")
    # print(user_schedule)

    schedule = generate_schedule_of_user(user_data=user_schedule)
    #print(schedule)
    return Response({"Schedule" : schedule})

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def job_search_route(request):
    
    assessment_data = request.data.get('assessment')
    #print(assessment_data)
    jobs_list = job_search(assessment_data)
    #print(jobs_list)
    return Response({"jobs" : jobs_list})







    