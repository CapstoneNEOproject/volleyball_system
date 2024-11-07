from django.utils import timezone
from datetime import timedelta
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Game
from .serializers import GameSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        today = timezone.now().date()
        next_month = today + timedelta(days=30)
        return Game.objects.filter(date__range =(today, next_month))
