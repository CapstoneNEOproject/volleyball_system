from rest_framework import serializers
from .models import Attendance, MatchResult
from scheduling.models import Game, Team

class AttendanceSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    game = serializers.StringRelatedField()

    class Meta:
        model = Attendance
        fields = ['id', 'game', 'user', 'attended']

class MatchResultSerializer(serializers.ModelSerializer):
    game = serializers.StringRelatedField()
    winning_team = serializers.StringRelatedField()
    losing_team = serializers.StringRelatedField()

    class Meta:
        model = MatchResult
        fields = ['id', 'game', 'winning_team', 'losing_team', 'draw']