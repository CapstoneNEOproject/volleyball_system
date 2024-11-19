from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class User(AbstractUser):
    #levels of user access
    ROLE_CHOICES = [
        ('player', 'Player'),
        ('referee', 'Referee'),
        ('admin', 'Admin'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    bio = models.TextField(blank=True, null=True)

    #additional user profile choices
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('injured', 'Injured'),
        ('inactive', 'Inactive'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='available')

    #profile picture for users
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    #many-to-many relationship for teams so players can be in multiple teams
    teams = models.ManyToManyField('Team', related_name='players', blank=True)

    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )

    #many-to-many relationship for permissions
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_set_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username
#represents a team with a team name and a list of members
class Team(models.Model):
    name = models.CharField(max_length=50)
    members = models.ManyToManyField(User, related_name='teams')

    def __str__(self):
        return self.name