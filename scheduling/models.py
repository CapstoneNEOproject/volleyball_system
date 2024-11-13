from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Team(models.Model):
    name = models.CharField(max_length=50)
    members = models.ManyToManyField(User, related_name="teams")

class Game(models.Model):
    date = models.DateTimeField()
    team1 = models.ForeignKey(Team, related_name="home_games", on_delete=models.CASCADE)
    team2 = models.ForeignKey(Team, related_name="away_games", on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
