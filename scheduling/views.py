from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Game, Team
from .serializers import GameSerializer, TeamSerializer
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model

User = get_user_model()
#check if user is admin
class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

#CRUD for teams. restricted to admins only
class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAdminUser]

#CRUD for games. restricted to admins only
class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def upcoming_games(self, request):
       #return games for the next three months. return empty calendar otherwise
        today = datetime.now()
        three_months_later = today + timedelta(days=90)
        games = Game.objects.filter(date__gte=today, date__lte=three_months_later).order_by('date')

        if not games.exists():
            # Generate blank calendar for the next 3 months
            response_data = {
                "calendar": [
                    {"month": (today + timedelta(days=30 * i)).strftime("%B %Y"), "games": []}
                    for i in range(3)
                ]
            }
            return Response(response_data)

        # Return scheduled games
        serializer = self.get_serializer(games, many=True)
        return Response(serializer.data)

#admin controls for managing games, assigns referees and teams
class GameAdminViewSet(viewsets.ViewSet):
    
    permission_classes = [IsAdminUser]

    @action(detail=True, methods=['post'])
    def assign_referee(self, request, pk=None):
       #assign referee to a game
        try:
            game = Game.objects.get(pk=pk)
            referee_id = request.data.get('referee_id')
            referee = User.objects.get(pk=referee_id, role='referee')
            game.referee = referee
            game.save()
            return Response({"detail": f"Referee {referee.username} assigned to game."})
        except Game.DoesNotExist:
            return Response({"detail": "Game not found."}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({"detail": "Referee not found or user is not a referee."}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def assign_teams(self, request, pk=None):
       #assign two teams to a game
        try:
            game = Game.objects.get(pk=pk)
            team1_id = request.data.get('team1_id')
            team2_id = request.data.get('team2_id')
            team1 = Team.objects.get(pk=team1_id)
            team2 = Team.objects.get(pk=team2_id)

            if team1 == team2:
                return Response({"detail": "A game cannot have the same team twice."}, status=status.HTTP_400_BAD_REQUEST)

            game.team1 = team1
            game.team2 = team2
            game.save()
            return Response({"detail": f"Teams {team1.name} and {team2.name} assigned to game."})
        except Game.DoesNotExist:
            return Response({"detail": "Game not found."}, status=status.HTTP_404_NOT_FOUND)
        except Team.DoesNotExist:
            return Response({"detail": "One or both teams not found."}, status=status.HTTP_404_NOT_FOUND)
