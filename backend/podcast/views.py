from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse, HttpResponseBadRequest
from .src.text_processing import TextProcessing 
import shutil, os, uuid

text_processor = TextProcessing()
text_summary = ""


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def process_text(request):
    text = request.data.get("text")
    if not text:
        return Response({"error": "Text cannot be empty."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        global text_summary
        text_summary = text_processor.summarise(text)
        return Response({"summary": text_summary})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    