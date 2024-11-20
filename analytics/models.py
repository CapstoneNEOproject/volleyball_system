from django.db import models
from scheduling.models import Game, Team

class Attendance(models.Model):
    game = models.ForeignKey(Game, related_name="attendances", on_delete=models.CASCADE)
    user = models.ForeignKey("users.User", related_name="attendances", on_delete=models.CASCADE)
    attended = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} attended {self.game}"

class MatchResult(models.Model):
    game = models.OneToOneField(Game, related_name="result", on_delete=models.CASCADE)
    winning_team = models.ForeignKey(
        Team, related_name="wins", on_delete=models.CASCADE, null=True, blank=True
    )
    losing_team = models.ForeignKey(
        Team, related_name="losses", on_delete=models.CASCADE, null=True, blank=True
    )
    draw = models.BooleanField(default=False)

    def __str__(self):
        if self.draw:
            return f"{self.game} ended in a draw."
        return f"{self.winning_team} won against {self.losing_team}"
