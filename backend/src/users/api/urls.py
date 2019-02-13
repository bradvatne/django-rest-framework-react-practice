from django.urls import path
from myapp.views import UserViewSet
from rest_framework.routers import DefaultRouter

from .views import (
    UserListView, 
    UserDetailView,
    UserCreateView,
    UserUpdateView,
    UserDeleteView
)

urlpatterns = [
    path('', UserListView.as_view()),
    path('create/', UserCreateView.as_view()),
    path('<pk>', UserDetailView.as_view()),
    path('<pk>/update/', UserUpdateView.as_view()),
    path('<pk>/delete/', UserDeleteView.as_view())
]
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
urlpatterns = router.urls