from django.urls import path, re_path, include
from . import views


urlpatterns = [
    path("chatbot/", views.dyslexia_chatbot, name="dyslexia_chatbot"),
    path("chatvoice/", views.dyslexia_chatvoice, name="dyslexia_chatvoice"),
    path("font_conversion/" , views.font_change_pdf , name = "font_conversion"),
    path("word_generation/" , views.word_generation , name = "word_generation"),
    path("anslyse_voice/" , views.analyse_voice , name = "analyse_voice")
]  