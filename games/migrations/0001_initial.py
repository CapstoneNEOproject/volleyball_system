# Generated by Django 5.1.2 on 2024-11-20 02:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('scheduling', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team1_score', models.IntegerField()),
                ('team2_score', models.IntegerField()),
                ('game', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='scheduling.game')),
            ],
        ),
    ]
