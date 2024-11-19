from rest_framework import serializers
from .models import Game, Team
from django.contrib.auth import get_user_model

User = get_user_model()
#serializers are used to handle data conversion between models and JSON
class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class RefereeSerializer(serializers.ModelSerializer):
    #to list referees in simple format
    class Meta:
        model = User
        fields = ['id', 'username']  

# handle data conversion for games
class GameSerializer(serializers.ModelSerializer):
    formatted_date = serializers.SerializerMethodField()
    referee = RefereeSerializer(read_only=True)  
    referee_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='referee'), 
        source='referee', 
        write_only=True, 
        required=False
    )

    class Meta:
        model = Game
        fields = ['id', 'date', 'time', 'team1', 'team2', 'location', 'referee', 'referee_id', 'formatted_date']

# format date information for output
    def get_formatted_date(self, obj):
        return obj.date.strftime('%A, %d %B %Y at %I:%M %p')

