from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class User(AbstractUser):
    # Levels of user access
    ROLE_CHOICES = [
        ('player', 'Player'),
        ('referee', 'Referee'),
        ('admin', 'Admin'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='player')
    bio = models.TextField(blank=True, null=True)

    # Additional user profile choices
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('injured', 'Injured'),
        ('inactive', 'Inactive'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='available')

    # Profile picture for users
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    # Many-to-many relationship for teams so players can be in multiple teams
    teams = models.ManyToManyField('Team', related_name='players', blank=True)

    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )

    # Many-to-many relationship for permissions
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_set_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def is_player(self):
        return self.role == 'player'

    def is_referee(self):
        return self.role == 'referee'

    def is_admin(self):
        return self.role == 'admin'

    def __str__(self):
        return self.username


# Represents a team with a team name and a list of members
class Team(models.Model):
    name = models.CharField(max_length=50, unique=True)  # Ensure unique team names
    members = models.ManyToManyField(User, related_name='user_teams')

    def __str__(self):
        return f"{self.name} ({self.members.count()} members)"
