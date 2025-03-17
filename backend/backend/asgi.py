import os
import django  # Ensure Django loads before anything else
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chatroom.routing  


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")  
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chatroom.routing.websocket_urlpatterns
        )
    ),
})
