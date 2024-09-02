from django.shortcuts import render, get_object_or_404
from home.models import Lesson

def detail_page(request, lesson_id):
    lesson = get_object_or_404(Lesson, id=lesson_id)
    
    return render(request, 'detail/detail.html', {
        'title': lesson.title,
        'summary': lesson.summary,
        'lesson_content': lesson.content,
        'lesson_id': lesson.id
    })

def quiz_page(request, lesson_id):
    lesson = get_object_or_404(Lesson, id=lesson_id)

    quiz_questions = lesson.quiz.get('questions', [])

    return render(request, 'detail/quiz.html', {
        'title': lesson.title,
        'quiz_questions': quiz_questions,
        'lesson_id': lesson.id,
    })
