from django.urls import re_path
from podcast.consumers import WebSocketKing


websocket_urlpatterns = [
    re_path(r'ws/podcast/$', WebSocketKing.as_asgi())
]