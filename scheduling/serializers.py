from rest_framework import serializers
from .models import Game, Team
from django.contrib.auth import get_user_model

User = get_user_model()

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class RefereeSerializer(serializers.ModelSerializer):
    """
    Serializer to provide limited information about referees (optional).
    """
    class Meta:
        model = User
        fields = ['id', 'username']  # Include only relevant fields

class GameSerializer(serializers.ModelSerializer):
    formatted_date = serializers.SerializerMethodField()
    referee = RefereeSerializer(read_only=True)  # Display referee details if assigned
    referee_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='referee'), 
        source='referee', 
        write_only=True, 
        required=False
    )

    class Meta:
        model = Game
        fields = ['id', 'date', 'time', 'team1', 'team2', 'location', 'referee', 'referee_id', 'formatted_date']

    def get_formatted_date(self, obj):
        return obj.date.strftime('%A, %d %B %Y at %I:%M %p')

