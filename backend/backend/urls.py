"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include  # Added include import

urlpatterns = [
    path('admin/', admin.site.urls),
<<<<<<< HEAD
    path('api/auth/', include('auth_chat.urls')),  
    path('api/autism/', include('autism.urls')) 
=======
<<<<<<< HEAD
    path('api/chat/', include('chatroom.urls')),
    path('api/auth/', include('auth_chat.urls'))  # Fixed the include statement
=======
    path('api/auth/', include('auth_chat.urls')),  
    path('api/autism/', include('autism.urls')) 
>>>>>>> d5cd088afd3a660e8e692020b04f1969056278aa
>>>>>>> dbd363c93d388599e1b908b4ade2ecb271d44300
]