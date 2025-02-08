import os
import django  # Ensure Django loads before anything else
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chatroom.routing  # Ensure this path is correct

# ✅ Set Django settings explicitly
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")  # Change 'backend' if your project name is different
django.setup()  # Ensures Django apps are loaded

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chatroom.routing.websocket_urlpatterns
        )
    ),
})
