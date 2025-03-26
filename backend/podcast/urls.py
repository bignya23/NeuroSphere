from django.urls import path, re_path, include
from . import views


urlpatterns = [
    path("process-text/", views.process_text, name="process_text")
]