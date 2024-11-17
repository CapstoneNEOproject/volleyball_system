from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Attendance, MatchResult
from .serializers import AttendanceSerializer, MatchResultSerializer
from scheduling.models import Team

class PlayerAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'player':
            return Response({"detail": "You do not have permission to view this data."}, status=403)
        
        attendances = Attendance.objects.filter(user=request.user)
        serializer = AttendanceSerializer(attendances, many=True)
        return Response(serializer.data)

class RefereeAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'referee':
            return Response({"detail": "You do not have permission to view this data."}, status=403)
        
        games = Game.objects.filter(referee=request.user)
        serializer = MatchResultSerializer(MatchResult.objects.filter(game__in=games), many=True)
        return Response(serializer.data)

class AdminAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'admin':
            return Response({"detail": "You do not have permission to view this data."}, status=403)

        teams = Team.objects.all()
        analytics = {
            "teams": [],
            "referees": [],
        }

        # Team analytics
        for team in teams:
            total_games = team.home_games.count() + team.away_games.count()
            wins = team.wins.count()
            losses = team.losses.count()
            attendance_count = Attendance.objects.filter(game__team1=team).count()
            analytics["teams"].append({
                "team": team.name,
                "total_games": total_games,
                "wins": wins,
                "losses": losses,
                "win_percentage": (wins / total_games * 100) if total_games > 0 else 0,
                "attendance_count": attendance_count,
            })

        # Referee analytics
        referees = User.objects.filter(role='referee')
        for referee in referees:
            games_officiated = Game.objects.filter(referee=referee).count()
            attendance = Attendance.objects.filter(game__referee=referee, attended=True).count()
            analytics["referees"].append({
                "referee": referee.username,
                "games_officiated": games_officiated,
                "attendance": attendance,
            })

        return Response(analytics)

