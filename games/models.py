from django.db import models
from scheduling.models import Game
# Create your models here.

class Score(models.Model):
    game = models.OneToOneField(Game, on_delete=models.CASCADE)
    team1_score = models.IntegerField()
    team2_score = models.IntegerField()