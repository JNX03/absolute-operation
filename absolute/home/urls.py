from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('CreateLesson/', views.create_lesson, name='create_lesson'),
]
