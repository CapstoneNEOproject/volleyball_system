from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameViewSet, TeamViewSet

router = DefaultRouter()
router.register(r'teams', TeamViewSet)
router.register(r'games', GameViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('games/upcoming/', GameViewSet.as_view({'get': 'upcoming_games'}), name='upcoming-games')
]