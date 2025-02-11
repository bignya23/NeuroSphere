from rest_framework import serializers 
from .models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'name', 'age', 'email', 'parents_email', 'phone_number',
            'disease', 'disease_level', 'gender', 'hobbies', 'password', 'username'
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': False},
            'email': {'required': True}
        } 

    def validate_email(self, value):
        # Custom email validation to ensure uniqueness
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        # Generate username from email if not provided
        if 'username' not in validated_data:
            email = validated_data.get('email', '')
            validated_data['username'] = email.split('@')[0]  # Use part before @ as username

        # Handle optional fields with defaults
        validated_data['parents_email'] = validated_data.get('parents_email', '')
        validated_data['disease'] = validated_data.get('disease', '')
        validated_data['disease_level'] = validated_data.get('disease_level', '')
        validated_data['gender'] = validated_data.get('gender', '')  # Handle gender
        validated_data['hobbies'] = validated_data.get('hobbies', '')  # Handle hobbies

        # Hash the password
        validated_data['password'] = make_password(validated_data.get('password'))

        # Create user instance
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            name=validated_data.get('name', ''),
            age=validated_data.get('age'),
            parents_email=validated_data.get('parents_email', ''),
            phone_number=validated_data.get('phone_number', ''),
            disease=validated_data.get('disease', ''),
            disease_level=validated_data.get('disease_level', ''),
            gender=validated_data.get('gender', ''),
            hobbies=validated_data.get('hobbies', ''),
            password=validated_data['password']
        )
        return user
