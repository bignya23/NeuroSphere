import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import ChatMessage
from auth_chat.models import User

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.disease_type = self.scope['url_route']['kwargs']['disease']
        self.room_group_name = f'chat_{self.disease_type}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        user_id = data['user_id']

        user = await self.get_user(user_id)
        if not user or user.disease != self.disease_type:
            return

        # ✅ Save message only once
        await self.save_message(user, message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender_email': user.email
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender_email': event['sender_email']
        }))

    @database_sync_to_async
    def get_user(self, user_id):
        return User.objects.filter(id=user_id).first()

    @database_sync_to_async
    def save_message(self, user, message):
        ChatMessage.objects.create(
            sender=user,
            content=message,
            disease_type=user.disease
        )
