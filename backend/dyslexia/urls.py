from django.urls import path, re_path, include
from . import views


urlpatterns = [
    path("font_conversion/" , views.font_change_pdf , name = "font_conversion"),
    path("word_generation/" , views.word_generation , name = "word_generation"),
    path("analyze_voice/" , views.analyse_voice , name = "analyse_voice")
]  