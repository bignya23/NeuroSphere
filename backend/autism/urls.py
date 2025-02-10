from django.urls import path, re_path, include
from . import views


urlpatterns = [
    path("chatbot/", views.chatbot, name="chatbot"),
    path("chatvoice/", views.chatvoice, name="chatvoice"),
    path("tasks/", views.tasks, name="tasks"),
]