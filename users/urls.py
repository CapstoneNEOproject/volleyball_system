from django.urls import path
from .views import register_user, PromoteToRefereeView

urlpatterns = [
    path('register/', register_user, name='register_user'),
    path('promote/', PromoteToRefereeView.as_view(), name='promote_to_referee'),
]
