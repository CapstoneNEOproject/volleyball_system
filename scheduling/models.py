from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Volleyball team with a name and a list of members
class Team(models.Model):
    name = models.CharField(max_length=50)
    members = models.ManyToManyField(User, related_name="scheduling_teams")

    def __str__(self):
        return self.name

# Volleyball game, includes: date, time, teams involved, location, and assigned referee
class Game(models.Model):
    date = models.DateField()  # Date of the game
    time = models.TimeField()  # Time of the game
    team1 = models.ForeignKey(Team, related_name="home_games", on_delete=models.CASCADE)
    team2 = models.ForeignKey(Team, related_name="away_games", on_delete=models.CASCADE)
    location = models.CharField(max_length=100, blank=True, null=True)  # Optional location
    referee = models.ForeignKey(
        User,
        related_name="refereed_games",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={"role": "referee"},  # Restrict to users with "referee" role
    )

    class Meta:
        ordering = ["date", "time"]  # Order games by date and time

    def __str__(self):
        return f"{self.team1} vs {self.team2} on {self.date} at {self.time}"
