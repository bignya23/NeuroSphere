from django.urls import path, re_path, include
from . import views


urlpatterns = [
    path("chatbot/", views.chatbot, name="chatbot"),
    path("chatvoice/", views.chatvoice, name="chatvoice"),
    path("tasks/", views.tasks, name="tasks"),
    path("tasks_generate/", views.tasks_generate, name="tasks_generate"),
    path("sos/", views.sos_alert, name="sos_alert"),
    path("emergency/", views.emergency, name="emergency"),
    path("resume_generate/", views.generate_resume, name="generate_resume")
]