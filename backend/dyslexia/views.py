from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
import tempfile
from django.contrib.auth import get_user_model
import os
from django.http import FileResponse
from .text_coding.font_conversion import extract_text_from_pdf, text_conversion
from .phonics.word_generation import word_generate, word_with_tts
from .phonics.analyse_audio import analyse_audio, summary_phonics
User = get_user_model()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def font_change_pdf(request):
    data = request.FILES.get('pdf_file')
    print(data)
    
    if not data:
        return JsonResponse({"error": "No file uploaded"}, status=400)


    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        for chunk in data.chunks():
            temp_file.write(chunk)
        temp_file_path = temp_file.name
        
        

    text = extract_text_from_pdf(temp_file_path)
    print("text extracted: ",text)
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
