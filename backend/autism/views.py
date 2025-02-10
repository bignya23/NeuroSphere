from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .chatbot import chatbot_1, database, tools
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
    conversation_history = database.get_chat_history(email)
    print(conversation_history)
    response_mail = "no"
    print(f"Response Mail : {response_mail}")
    if(response_mail == "yes"):
        print(tools.send_alert_email(parents_email, name , conversation_history))
          
    
    # response = chatbot_1.get_response(name, age , "cubing", level, "MALE", conversation_history)
    response = "Hello test"
    print(f"Autism Chatbot: {response}")
        
    database.store_chat_history(email, user_input, response)

    return Response({
        "chatbot" : response
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure user is logged in
def get_current_user(request):
    """Retrieve details of the currently logged-in user"""
    user = request.user  # Get the logged-in user

    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
    }

    return Response(user_data)


