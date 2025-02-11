from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    username = models.CharField(
        max_length=150,
        unique=False  # Make username non-unique
    )
    name = models.CharField(max_length=255)
    age = models.IntegerField(null=True, blank=True)
    email = models.EmailField(_('email address'), unique=True)  # Keep email unique
    parents_email = models.EmailField(null=True, blank=True)
    phone_number = models.CharField(max_length=15)
    disease = models.CharField(max_length=50, null=True, blank=True)
    disease_level = models.CharField(max_length=20, null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)  # Added gender
    hobbies = models.TextField(null=True, blank=True)  # Added hobbies
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'username']  # Remove username from required fields

    def __str__(self):
        return self.email

    class Meta:
        unique_together = []  # Remove any unique_together constraints
