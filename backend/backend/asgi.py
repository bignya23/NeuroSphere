<<<<<<< HEAD
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
=======
"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_asgi_application()
>>>>>>> d5cd088afd3a660e8e692020b04f1969056278aa
