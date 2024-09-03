from django.shortcuts import render, get_object_or_404
from home.models import Lesson

def detail_page(request, lesson_id):
    lesson = get_object_or_404(Lesson, id=lesson_id)
    return render(request, 'detail/detail.html', {
        'title': lesson.title,
        'summary': lesson.summary,
        'lesson_content': lesson.content,
        'lesson_id': lesson.id,
    })

def quiz_page(request, lesson_id):
    lesson = get_object_or_404(Lesson, id=lesson_id)
    
    quiz_content = lesson.quiz  # Assuming this is a string containing quiz data
    
    quiz_questions = []
    question_counter = 1

    # Debug: Print the raw quiz content
    print(f"Raw Quiz Content: {quiz_content}")

    # Split the content by each line
    lines = quiz_content.splitlines()

    for line in lines:
        if line.startswith("quiz:"):
            parts = line[len("quiz:"):].split(":")
            if len(parts) >= 6:
                question_text = parts[0].strip()
                choices = [part.strip() for part in parts[1:5]]
                correct_answer = parts[5].strip()
                
                quiz_questions.append({
                    'id': question_counter,
                    'question': question_text,
                    'options': choices,
                    'correct_answer': correct_answer,
                })
                question_counter += 1

    # Debug: Print the parsed quiz questions
    print(f"Parsed Quiz Questions: {quiz_questions}")

    return render(request, 'detail/quiz.html', {
        'title': lesson.title,
        'quiz_questions': quiz_questions,
        'lesson_id': lesson.id,
    })

def true_false_quiz_page(request, lesson_id):
    lesson = get_object_or_404(Lesson, id=lesson_id)
    
    quiz_content = lesson.quiz  # Assuming this contains the AI's response
    
    questions = []
    question_counter = 1

    # Debug: Print the raw true/false quiz content
    print(f"Raw True/False Content: {quiz_content}")

    # Split the content by each line
    lines = quiz_content.splitlines()

    for line in lines:
        if line.startswith("truefalse:"):
            parts = line[len("truefalse:"):].split(":")
            if len(parts) == 2:
                question_text = parts[0].strip()
                correct_answer = parts[1].strip().lower()
                
                questions.append({
                    'id': question_counter,
                    'type': 'true-false',
                    'question': question_text,
                    'correct_answer': correct_answer.capitalize(),
                })
                question_counter += 1

    # Debug: Print the parsed true/false questions
    print(f"Parsed True/False Questions: {questions}")

    return render(request, 'detail/true_false.html', {
        'title': lesson.title,
        'questions': questions,
        'lesson_id': lesson.id,
    })
