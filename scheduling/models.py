from django.db import models
from users.models import Team, User

# Create your models here.

class Game(models.Model):
    team1 = models.ForeignKey(Team, related_name='team1_games', on_delete=models.CASCADE)
    team2 = models.ForeignKey(Team, related_name='team2_games', on_delete=models.CASCADE)
    date = models.DateTimeField()
    location = models.CharField(max_length=100)
    referee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    is_completed = models.BooleanField(default=False)
