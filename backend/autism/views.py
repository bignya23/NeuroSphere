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
    hobbies = user.hobbies
    gender = user.gender
    conversation_history = database.get_chat_history(email)
    print(conversation_history)
    response_mail = chatbot_1.get_response_mail(user_input, conversation_history)
    print(f"Response Mail : {response_mail}")
    if(response_mail == "yes"):
        print(tools.send_alert_email(parents_email, name , conversation_history))
          
    response = chatbot_1.get_response(name, age , hobbies, level, gender, user_input, conversation_history)
    # response = "Hello test"
    print(f"Autism Chatbot: {response}")
        
    database.store_chat_history(email, user_input, response)

    return Response({
        "chatbot" : response
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chatvoice(request):
    pass




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tasks(request):

    return Response({
    "tasks": [
    {
      "id": 1,
      "category": "Social Interaction",
      "task": "Say 'Hi' to someone today."
    },
    {
      "id": 2,
      "category": "Social Interaction",
      "task": "Ask someone, 'How are you today?'"
    },
    {
      "id": 3,
      "category": "Social Interaction",
      "task": "Wave goodbye when you leave a room."
    },
    {
      "id": 4,
      "category": "Social Interaction",
      "task": "Introduce yourself to someone new. ('My name is __.')"
    },
    {
      "id": 5,
      "category": "Social Interaction",
      "task": "Ask a friend what their favorite color or food is."
    },
    {
      "id": 6,
      "category": "Social Interaction",
      "task": "Share something about your favorite activity."
    }
  ]
}
)
