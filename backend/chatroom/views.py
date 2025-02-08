
# chatroom/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ChatMessage
from .serializers import ChatMessageSerializer


# chatroom/views.py
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chat_history(request, disease):
    # Verify user has access to this disease chat
    if request.user.disease != disease:
        return Response(
            {'error': 'Not authorized for this chat room'},
            status=status.HTTP_403_FORBIDDEN
        )
        
    messages = ChatMessage.objects.filter(disease_type=disease)
    serializer = ChatMessageSerializer(messages, many=True)
    return Response(serializer.data)