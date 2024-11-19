from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer

@api_view(['POST'])
def register_user(request):
    #register a new user with default role set to player
    data = request.data
    data['role'] = 'player'  # Default role set to "player"
    serializer = UserSerializer(data=data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PromoteToRefereeView(APIView):
    #allow admins to promote a referee. only admins are allowed to promote
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.role == 'admin':
            return Response({"detail": "You do not have permission to perform this action."}, status=403)

        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            user.role = 'referee'
            user.save()
            return Response({"detail": f"User {user.username} has been promoted to referee."})
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=404)
