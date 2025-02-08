from django.urls import path
from . import views

# chatroom/urls.py
urlpatterns = [
    path('history/<str:disease>/', views.get_chat_history, name='chat_history'),
]