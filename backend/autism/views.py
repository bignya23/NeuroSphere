from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .chatbot import chatbot_1, database, tools
from .chatvoice import chains, agent, tts, stt, database

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
    conversation_history = database.get_chat_history(email)
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
    conversation_history = database.get_chat_history(f"{email}_voice")
    response = agent.get_response(name, age , hobbies, level, gender, user_input, conversation_history)
    tts_file = tts.text_to_speech(response)
    print(f"Autism Agent: {response}")
    
    database.store_chat_history(f"{email}_voice",user_input, response)

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