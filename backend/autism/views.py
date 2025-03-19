from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from .chatbot.chatbot_chat import ChatbotGenerate
from .chatbot import database_chat, tools
from .chatvoice import database_voice, tts
from .chatvoice.voice_agent import ChatVoice
from .support import send_mail_gmail
from .chatvoice.stt import transcribe_audio
from .tasks_system import generate_tasks
from .resume_maker.resume_to_pdf import generate_resume_pdf
from django.http import FileResponse
from .schedule_generator.generate_schedule import generate_schedule_of_user
import os
from .Jobsearch.jobsearch import job_search
import playsound 
from .assessment.second_assement import accuracy_score

User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def autism_chatbot(request):
    user_input = request.data.get("query")  
    print("User Input:", user_input)


    user = request.user  
    print("Authenticated User:", user)

    name = getattr(user, 'name', 'Unknown')
    email = getattr(user, 'email', 'Unknown')
    age = getattr(user, 'age', 'Unknown')
    level = getattr(user, 'disease_level', 'Unknown')
    parents_email = getattr(user, 'parents_email', 'Unknown')
    hobbies = getattr(user, 'hobbies', 'Unknown')
    gender = getattr(user, 'gender', 'Unknown')
    disease = getattr(user, 'disease', 'Unknown')


    chatbot_generate = ChatbotGenerate()
    conversation_history = database_chat.get_chat_history(f"{email}_chat")
    response_mail = chatbot_generate.content_checker(user_input, conversation_history)
    print(f"Response Mail : {response_mail}")
    if(response_mail == "yes"):
        print(tools.send_alert_email(parents_email, name, conversation_history))
          
    response = chatbot_generate.chatbot_response(name=name, age=age, hobbies=hobbies, disease=disease, gender=gender,conversation_history=conversation_history)
  
    print(f"Autism Chatbot: {response}")
        
    database_chat.store_chat_history(f"{email}_chat", user_input, response)

    return Response({
        "chatbot" : response
    })



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def autism_chatvoice(request):
    audio_file = request.FILES.get("audio_file")
    print(audio_file)
    
    user_input = ""
    
    # transcribe_audio(audio_file)
    user = request.user
    name = getattr(user, 'name', 'Unknown') 
    email = getattr(user, 'email', 'Unknown')
    age = getattr(user, 'age', 'Unknown')
    level = getattr(user, 'disease_level', 'Unknown')
    parents_email = getattr(user, 'parents_email', 'Unknown')
    hobbies = getattr(user, 'hobbies', 'Unknown')
    gender = getattr(user, 'gender', 'Unknown')
    disease = getattr(user, 'disease', 'Unknown')
    chat_voice = ChatVoice()
    conversation_history = database_voice.get_chat_history(f"{email}_voice")
    response = chat_voice.chatvoice_response(name=name, age=age, hobbies=hobbies, disease=disease, gender=gender,conversation_history=conversation_history)
    tts_file = tts.text_to_speech_female(response)
    print(f"Autism VoiceAgent: {response}")
    
    print(response)
    database_voice.store_chat_history(f"{email}_voice",user_input, response)

  
    return Response({
        "file_path" : tts_file
    })
    

@api_view(['POST']) 
@permission_classes([IsAuthenticated]) 
def tasks_generate(request):
    user = request.user 

    conv_hist = database_chat.get_chat_history(f"{user.email}_chat")
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def generateSchedule(request):
    user_schedule = request.data.get("user_schedule")
    # print(user_schedule)

    schedule = generate_schedule_of_user(user_data=user_schedule)
    #print(schedule)
    return Response({"Schedule" : schedule})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def job_search_route(request):
    
    assessment_data = request.data.get('assessment')
    #print(assessment_data)
    jobs_list = job_search(assessment_data)
    #print(jobs_list)
    return Response({"jobs" : jobs_list})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def second_assessment(request):

    assessment = {
  "Social Interaction": [
    "Imagine you are at a social event where most people are strangers. How would you initiate a conversation and build a connection with someone new?",
    "Picture a scenario where you notice a group of people engaged in a discussion, but you feel hesitant to join. What steps would you take to approach them?",
    "Consider a situation where you see someone who appears upset in a social setting. How might you approach them to offer support?"
  ],
  "Team Collaboration": [
    "Imagine you're in a team meeting and your idea is different from others. How would you present your viewpoint and invite feedback?",
    "Picture a scenario where a project is facing challenges and the team seems divided. How would you help bridge the gap and encourage collaboration?",
    "Consider a situation where one team member is struggling with their task. How would you approach them to offer help while ensuring the project stays on track?"
  ],
  "Structured Team Based Activities": [
    "Imagine you are participating in a structured team-based activity with clear roles, and midway the instructions suddenly change. How would you adapt to the new situation?",
    "Picture a scenario where you are unsure about your role in a team activity. What steps would you take to clarify your responsibilities?",
    "Consider a situation where your team is given a complex task with a time limit. What strategies would you use to communicate effectively and ensure everyone contributes?"
  ]
}
    
    return Response({"second_assessment" : assessment})




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def voice_interview(request):
    
    job_details = request.data.get("job_details")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def second_assessment_result(request):

    result = request.data.get('question_answer')

    ans_result = accuracy_score(result)

    return Response({
        "results" : ans_result
    })









    