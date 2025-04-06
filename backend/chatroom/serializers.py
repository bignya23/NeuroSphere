from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    sender_email = serializers.CharField(source='sender.email', read_only=True)
    disease_type = serializers.CharField(read_only=True)
    
    class Meta:
        model = ChatMessage
        fields = ['id', 'content', 'timestamp', 'sender_email', 'disease_type']