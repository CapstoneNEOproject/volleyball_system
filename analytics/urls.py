from django.urls import path
from .views import PlayerAnalyticsView, RefereeAnalyticsView, AdminAnalyticsView

urlpatterns = [
    path('analytics/player/', PlayerAnalyticsView.as_view(), name='player-analytics'),
    path('analytics/referee/', RefereeAnalyticsView.as_view(), name='referee-analytics'),
    path('analytics/admin/', AdminAnalyticsView.as_view(), name='admin-analytics'),
]
