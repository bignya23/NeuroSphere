# chatroom/models.py
from django.db import models
from auth_chat.models import User

class ChatMessage(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    disease_type = models.CharField(max_length=50)  # Store the disease type with the message
    
    class Meta:
        ordering = ['timestamp']
    
    def __str__(self):
        return f'{self.sender.email} ({self.disease_type}): {self.content[:50]}'
