from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameViewSet, TeamViewSet

router = DefaultRouter()
router.register(r'teams', TeamViewSet)
router.register(r'games', GameViewSet)

urlpatterns = [
    path('', include(router.urls)),
]