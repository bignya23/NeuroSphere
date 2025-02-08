<<<<<<< HEAD
from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),  # ✅ Add logout route
]
=======
# auth_chat/urls.py
from django.urls import path, re_path, include

from . import views


urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),

]
>>>>>>> d5cd088afd3a660e8e692020b04f1969056278aa
