from django.urls import re_path
from chatroom.consumers import ChatConsumer  

websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<disease>\w+)/$", ChatConsumer.as_asgi()), 
]