import random
from django.core.management.base import BaseCommand
from scheduling.models import Team, Game
from analytics.models import Attendance, MatchResult
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = "Populate the database with demo data"

    def handle(self, *args, **kwargs):
        self.create_users()
        self.create_teams()
        self.create_games()
        self.create_attendance_and_results()
        self.stdout.write(self.style.SUCCESS("Demo data populated successfully!"))

    def create_users(self):
        self.admin, created = User.objects.get_or_create(
            username="admin",
            defaults={"email": "admin@example.com", "password": "admin123", "role": "admin"},
        )
        if created:
            self.admin.set_password("admin123")
            self.admin.save()

        self.referees = []
        for i in range(1, 6):
            referee, created = User.objects.get_or_create(
                username=f"referee{i}",
                defaults={"email": f"referee{i}@example.com", "password": "referee123", "role": "referee"},
            )
            if created:
                referee.set_password("referee123")
                referee.save()
            self.referees.append(referee)

        self.players = []
        for i in range(1, 21):
            player, created = User.objects.get_or_create(
                username=f"player{i}",
                defaults={"email": f"player{i}@example.com", "password": "player123", "role": "player"},
            )
            if created:
                player.set_password("player123")
                player.save()
            self.players.append(player)

    def create_teams(self):
        self.teams = [
            Team.objects.create(name=f"Team {i}")
            for i in range(1, 6)
        ]
        for team in self.teams:
            team.members.add(*random.sample(self.players, 4))

    def create_games(self):
        self.games = []
        start_date = datetime.now()
        for i in range(10):
            team1, team2 = random.sample(self.teams, 2)
            referee = random.choice(self.referees)
            game = Game.objects.create(
                date=start_date.date(),
                time=start_date.time(),
                team1=team1,
                team2=team2,
                location=f"Stadium {i+1}",
                referee=referee,
            )
            self.games.append(game)
            start_date += timedelta(days=1)

    def create_attendance_and_results(self):
        for game in self.games:
            for player in game.team1.members.all():
                Attendance.objects.create(game=game, user=player, attended=True)
            for player in game.team2.members.all():
                Attendance.objects.create(game=game, user=player, attended=random.choice([True, False]))

            if random.choice([True, False]):
                MatchResult.objects.create(game=game, draw=True, winning_team=None, losing_team=None)
            else:
                winning_team, losing_team = random.sample([game.team1, game.team2], 2)
                MatchResult.objects.create(game=game, winning_team=winning_team, losing_team=losing_team, draw=False)
