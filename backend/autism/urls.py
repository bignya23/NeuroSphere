from django.urls import path, re_path, include
from . import views


urlpatterns = [
    path("chatbot/", views.chatbot, name="chatbot"),
    path("chatvoice/", views.chatvoice, name="chatvoice"),
    path("tasks/", views.tasks, name="tasks"),
    path("tasks_generate/", views.tasks_generate, name="tasks"),
    path("sos/", views.sos_alert, name="tasks"),
    path("emergency/", views.emergency, name="tasks"),
]