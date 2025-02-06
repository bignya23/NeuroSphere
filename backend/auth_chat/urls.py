# auth_chat/urls.py
from django.urls import path, re_path, include

from . import views


urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
   

]