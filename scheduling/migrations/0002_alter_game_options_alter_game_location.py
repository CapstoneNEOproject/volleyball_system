# Generated by Django 5.1.2 on 2024-11-20 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scheduling', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='game',
            options={'ordering': ['date', 'time']},
        ),
        migrations.AlterField(
            model_name='game',
            name='location',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
