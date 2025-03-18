from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from autism.chatbot.chatbot_chat import ChatbotGenerate
from autism.chatbot import database
from autism.chatbot import tools
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dyslexia_chatbot(request):
    user_input = request.data.get("query")
    user = request.user
    name = user.name
    email = user.email
    age = user.age
    level = user.disease_level
    parents_email = user.parents_email
    hobbies = user.hobbies
    gender = user.gender
    disease= user.disease
    # print(conversation_history)
    chatbot_generate = ChatbotGenerate()
    conversation_history = database.get_chat_history(email)
    response_mail = chatbot_generate.content_checker(user_input, conversation_history)
    print(f"Response Mail : {response_mail}")
    if(response_mail == "yes"):
        print(tools.send_alert_email(parents_email, name, conversation_history))
          
    response = chatbot_generate.chatbot_response(name=name, age=age, hobbies=hobbies, disease=disease, gender=gender,conversation_history=conversation_history)
  
    print(f"Autism Chatbot: {response}")
        
    database.store_chat_history(email, user_input, response)

    return Response({
        "chatbot" : response,
        "conversation_history" : conversation_history
    })


