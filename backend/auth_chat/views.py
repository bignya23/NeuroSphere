from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.permissions import AllowAny
from django.core.exceptions import ObjectDoesNotExist

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    # Ensure that both email and password are provided
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({
            'error': 'Email and password are required'
        }, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        try:
            # Save the user and create refresh tokens
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'error': 'Error creating user',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({
            'error': 'Please provide both email and password'
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Fetch user using email and check password
        user = User.objects.get(email=email)

        if user.check_password(password):  # This checks the password securely
            # Create refresh and access tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data,
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)

    except User.DoesNotExist:
        return Response({
            'error': 'No account found with this email'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Login error: {str(e)}")  # For debugging
        return Response({
            'error': 'An error occurred during login'
<<<<<<< HEAD
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
        
        

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        # Get refresh token from request
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Blacklist the refresh token
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response({'message': 'Successfully logged out'}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': 'Invalid token', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)
=======
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
>>>>>>> d5cd088afd3a660e8e692020b04f1969056278aa
