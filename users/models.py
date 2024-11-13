from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class User(AbstractUser):
    # Role Choices for users (player, referee, admin)
    ROLE_CHOICES = [
        ('player', 'Player'),
        ('referee', 'Referee'),
        ('admin', 'Admin'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    bio = models.TextField(blank=True, null=True)

    # Profile status choices (available, injured, inactive, etc.)
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('injured', 'Injured'),
        ('inactive', 'Inactive'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='available')

    # Profile picture for users (image upload field)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    # Many-to-many relationship with teams
    teams = models.ManyToManyField('Team', related_name='players', blank=True)

    # Adding Many-to-many relationship for groups (this should still work fine with custom related name)
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )

    # Adding Many-to-many relationship for user permissions (custom related name)
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_set_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username

class Team(models.Model):
    name = models.CharField(max_length=50)
    members = models.ManyToManyField(User, related_name='teams')

    def __str__(self):
        return self.name