from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.posts),
    path('posts/<int:post_id>/comments/', views.comments),
    path('health/', views.health),
    path('readiness/', views.readiness),
]