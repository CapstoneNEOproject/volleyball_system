from rest_framework import serializers
from .models import Game, Team
from users.models import User  # Use the custom User model

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class RefereeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class GameSerializer(serializers.ModelSerializer):
    formatted_date = serializers.SerializerMethodField()
    referee = RefereeSerializer(read_only=True)
    referee_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='referee'), 
        source='referee', 
        write_only=True
    )

    class Meta:
        model = Game
        fields = ['id', 'date', 'time', 'team1', 'team2', 'location', 'referee', 'referee_id', 'formatted_date']

    def get_formatted_date(self, obj):
        return f"{obj.date.strftime('%A, %d %B %Y')} at {obj.time.strftime('%I:%M %p')}"
