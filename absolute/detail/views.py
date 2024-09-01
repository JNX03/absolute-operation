from django.shortcuts import render, get_object_or_404
from home.models import Lesson

def detail_page(request, lesson_id):
    # Fetch the lesson object from the database
    lesson = get_object_or_404(Lesson, id=lesson_id)
    
    # Pass the lesson details to the template
    return render(request, 'detail/detail.html', {
        'title': lesson.title,
        'summary': lesson.summary,
        'lesson_content': lesson.content,
        'lesson_id': lesson.id
    })

def quiz_page(request, lesson_id):
    # Fetch the lesson object from the database
    lesson = get_object_or_404(Lesson, id=lesson_id)

    # Convert the quiz JSON to a list of questions
    quiz_questions = lesson.quiz.get('questions', [])

    # Pass the quiz details to the template
    return render(request, 'detail/quiz.html', {
        'title': lesson.title,
        'quiz_questions': quiz_questions,
        'lesson_id': lesson.id,
    })
