from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
# Create your models here.

class User(AbstractUser):
    ROLE_CHOICES = [
        ('player', 'Player'),
        ('referee', 'Referee'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    bio = models.TextField(blank=True, null=True)

    groups = models.ManyToManyField(
        Group,
        related_name = 'custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_set_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

class Team(models.Model):
    name = models.CharField(max_length=50)
    members = models.ManyToManyField(User, related_name='teams')
