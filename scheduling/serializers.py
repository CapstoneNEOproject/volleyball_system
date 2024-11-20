from rest_framework import serializers
from .models import Game, Team
from users.models import User  # Use the custom User model

class TeamSerializer(serializers.ModelSerializer):
    """
    Serializer for the Team model.
    """
    class Meta:
        model = Team
        fields = '__all__'

class RefereeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Referee (User with referee role).
    """
    class Meta:
        model = User
        fields = ['id', 'username']

class GameSerializer(serializers.ModelSerializer):
    """
    Serializer for the Game model.
    Includes a formatted date and referee details.
    """
    formatted_date = serializers.SerializerMethodField()
    referee = RefereeSerializer(read_only=True)  # Show detailed referee info
    referee_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='referee'), 
        source='referee', 
        write_only=True
    )

    class Meta:
        model = Game
        fields = ['id', 'date', 'time', 'team1', 'team2', 'location', 'referee', 'referee_id', 'formatted_date']

    def get_formatted_date(self, obj):
        """
        Return a human-readable date and time for display purposes.
        """
        return f"{obj.date.strftime('%A, %d %B %Y')} at {obj.time.strftime('%I:%M %p')}"

    def validate(self, data):
        """
        Custom validation for games.
        Ensure that team1 and team2 are not the same and a referee is valid.
        """
        if data['team1'] == data['team2']:
            raise serializers.ValidationError("A game cannot be scheduled between the same team.")
        return data
