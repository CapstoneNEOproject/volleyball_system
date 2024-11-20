from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['role'] = 'admin' if user.is_superuser else user.role  # Superuser check
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Include role in response data
        data['role'] = 'admin' if self.user.is_superuser else self.user.role  # Superuser check
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
    """
    Register a new user. Default role is 'player'.
    """
    data = request.data
    data['role'] = 'player'  # Default role

    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully!", "user": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    return Response(
        {"message": "Registration failed", "errors": serializer.errors},
        status=status.HTTP_400_BAD_REQUEST,
    )


class PromoteToRefereeView(APIView):
    """
    Allow admins to promote a user to referee. Only admins can perform this action.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != 'admin':
            return Response(
                {"detail": "You do not have permission to perform this action."},
                status=status.HTTP_403_FORBIDDEN,
            )

        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            user.role = 'referee'
            user.save()
            return Response(
                {"detail": f"User {user.username} has been promoted to referee."},
                status=status.HTTP_200_OK,
            )
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
