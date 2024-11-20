from django.urls import path
from .views import CustomTokenObtainPairView, register_user, PromoteToRefereeView

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('register/', register_user, name='register_user'),
    path('promote/', PromoteToRefereeView.as_view(), name='promote_to_referee'),
]
