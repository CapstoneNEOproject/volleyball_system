from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Game, Team
from .serializers import GameSerializer, TeamSerializer
from django.utils.timezone import now
from datetime import timedelta

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAdminUser]

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=["get"])
    def upcoming_games(self, request):
        """
        Custom action to list games scheduled within the next 3 months.
        """
        upcoming = now().date() + timedelta(days=90)
        games = Game.objects.filter(date__gte=now(), date__lte=upcoming).order_by("date", "time")
        serializer = self.get_serializer(games, many=True)
        return Response(serializer.data)
