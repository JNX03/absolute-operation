from django.urls import path
from . import views

urlpatterns = [
    path('<int:lesson_id>/', views.detail_page, name='detail_page'),
    path('<int:lesson_id>/quiz/', views.quiz_page, name='quiz_page'),
]
