from django.urls import path, include
from .views import register_user, PromoteToRefereeView
from rest_framework.routers import DefaultRouter
from .views import GameViewSet, TeamViewSet, GameAdminViewSet

router = DefaultRouter()
router.register(r'games', GameViewSet, basename='game')
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'games', GameAdminViewSet, basename='game-admin')

urlpatterns = [
    path('', include(router.urls)),
    path('games/upcoming/', GameViewSet.as_view({'get': 'upcoming_games'}), name='upcoming-games'),
    path('api/register/', register_user, name='register_user'),
    path('promote-to-referee/', PromoteToRefereeView.as_view(), name='promote_to_referee')
]