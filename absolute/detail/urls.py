from django.urls import path
from . import views

urlpatterns = [
    path('detail/<int:lesson_id>/', views.detail_page, name='detail_page'),
    path('detail/<int:lesson_id>/quiz/', views.quiz_page, name='quiz_page'),
    path('lesson/<int:lesson_id>/true-false-quiz/', views.true_false_quiz_page, name='true_false_quiz_page'),
]
