from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Team

class UserSerializer(serializers.ModelSerializer):
    bio = serializers.CharField(required=False, allow_blank=True)
    profile_picture = serializers.ImageField(required=False)
    teams = serializers.PrimaryKeyRelatedField(
        queryset=Team.objects.all(),  # Provide a queryset to resolve the error
        many=True,
        required=False  # Make the field optional
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'bio', 'status', 'profile_picture', 'teams']
        extra_kwargs = {
            'password': {'write_only': True},  # Password should not be exposed
        }

    def create(self, validated_data):
        # Extract and hash the password before saving the user
        password = validated_data.pop('password', None)
        instance = super(UserSerializer, self).create(validated_data)
        if password:
            instance.set_password(password)
            instance.save()
        return instance
