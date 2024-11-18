from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Team(models.Model):
    name = models.CharField(max_length=50)
    members = models.ManyToManyField(User, related_name="teams")

    def __str__(self):
        return self.name

class Game(models.Model):
    date = models.DateField()  # Stores the date of the game
    time = models.TimeField()  # Stores the time of the game
    team1 = models.ForeignKey(Team, related_name="home_games", on_delete=models.CASCADE)
    team2 = models.ForeignKey(Team, related_name="away_games", on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    referee = models.ForeignKey(
        User,
        related_name="refereed_games",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={"role": "referee"},  # Limit to users with the "referee" role
    )

    def __str__(self):
        return f"{self.team1} vs {self.team2} on {self.date} at {self.time}"


