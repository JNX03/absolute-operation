from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_page, name='home_page'),
    path('create-lesson/', views.create_lesson, name='create_lesson'),
]
