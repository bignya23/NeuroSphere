from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from autism.chatbot.chatbot_chat import ChatbotGenerate
from ..autism.chatbot import database_chat
from ..autism.chatvoice import database_voice, tts
from ..autism.chatvoice.voice_agent import ChatVoice
from ..autism.chatbot import tools
from django.contrib.auth import get_user_model
import os
from django.http import FileResponse
from .text_coding.font_conversion import extract_text_from_pdf, text_conversion
from .phonics.word_generation import word_generate, word_with_tts
from .phonics.analyse_audio import analyse_audio, summary_phonics
User = get_user_model()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dyslexia_chatbot(request):
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
  
    print(f"Dyslexia Chatbot: {response}")
        
    database_chat.store_chat_history(f"{email}_chat", user_input, response)

    return Response({
        "chatbot" : response
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dyslexia_chatvoice(request):
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
    print(f"Dyslexia VoiceAgent: {response}")
    
    print(response)
    database_voice.store_chat_history(f"{email}_voice",user_input, response)

  
    return Response({
        "file_path" : tts_file
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def font_change_pdf(request):
    data = request.FILES.get('pdf_file')
    
    text = extract_text_from_pdf(data)

    text_conversion(text)

    filename = "output.pdf"
    file_path = os.path.join(os.getcwd(), filename)  


    pdf_file = open(file_path, 'rb')
    response = FileResponse(pdf_file, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    
    return response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def word_generation(request):
    user = request.user  
    print("Authenticated User:", user)

    name = getattr(user, 'name', 'Unknown')

    words = word_generate(name)
    file_paths = word_with_tts(words) 
    return Response({
        "words" : words,
        "file_path" : file_paths
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def analyse_voice(request):
    word = request.data.get('word') 
    voice_file = request.FILES.get('voice_file')
    user = request.user
    transcription = analyse_audio(voice_file)
    
    summary = summary_phonics(audio_path=voice_file, username=user.name, target_word=word, transcription_result=transcription)

    return Response({
        "summary" : summary
    })
