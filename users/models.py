from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class User(AbstractUser):
    # User roles with predefined choices
    ROLE_CHOICES = [
        ('player', 'Player'),
        ('referee', 'Referee'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='player')

    # Optional biography for users
    bio = models.TextField(blank=True, null=True)

    # User status with predefined choices
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('injured', 'Injured'),
        ('inactive', 'Inactive'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='available')

    # Profile picture for user accounts
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    # Many-to-many relationship for teams
    teams = models.ManyToManyField('Team', related_name='players', blank=True)

    # Group relationships for permissions
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )

    # Permissions relationships for custom permissions
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_set_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    # Helper methods for role checks
    def is_player(self):
        return self.role == 'player'

    def is_referee(self):
        return self.role == 'referee'

    def is_admin(self):
        return self.role == 'admin'

    def __str__(self):
        return self.username


class Team(models.Model):
    # Team name must be unique
    name = models.CharField(max_length=50, unique=True)

    # Many-to-many relationship for team members
    members = models.ManyToManyField(User, related_name='user_teams')

    def __str__(self):
        return f"{self.name} ({self.members.count()} members)"

    # Helper method to add a member to the team
    def add_member(self, user):
        self.members.add(user)

    # Helper method to remove a member from the team
    def remove_member(self, user):
        self.members.remove(user)
