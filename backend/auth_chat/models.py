from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    username = models.CharField(
        max_length=150,
        unique=False 
    )
    name = models.CharField(max_length=255)
    age = models.IntegerField(null=True, blank=True)
    email = models.EmailField(_('email address'), unique=True)  
    parents_email = models.EmailField(null=True, blank=True)
    phone_number = models.CharField(max_length=15)
    disease = models.CharField(max_length=50, null=True, blank=True)
    disease_level = models.CharField(max_length=20, null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)  
    hobbies = models.TextField(null=True, blank=True) 
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'username']  

    def __str__(self):
        return self.email

    class Meta:
        unique_together = []  
