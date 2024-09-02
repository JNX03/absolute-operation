from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from .models import Lesson
import requests
from django.conf import settings

def home_page(request):
    return render(request, 'home/index.html')

def create_lesson(request):
    search_term = request.GET.get('search_term', '')

    if search_term:
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {settings.OPEN_TYPHOON_API_KEY}',
        }
        data = {
            "model": "typhoon-v1.5x-70b-instruct",
            "messages": [
                {
                    "role": "system",
                    "content": "ต่อไปนี้คุณห้ามพูดอะไรนอกจากสิ่งที่ใช้ระบบให้ การบอก คุณจะเป็นครูสอนสิ่งต่างๆ ใช้ [title:{title}] เพื่อบอก title [summary:{summary}] เพื่อบอกย่อๆ [lesson:{lesson}] เพื่อให้ข้อมูลสำหรับสอนสามารถใช้ Tag ของ html ได้ (ต้องมีครบทุกอัน) และ [quiz:{quiz}] เพื่อสร้างคำถามสำหรับเนื้อหานี้"
                },
                {
                    "role": "user",
                    "content": f'โดยคุณต้องสอนเรื่อง {search_term}'
                }
            ],
            "max_tokens": 2048,
            "temperature": 0.6,
            "top_p": 0.95,
            "repetition_penalty": 1.05,
            "stream": False
        }

        response = requests.post('https://api.opentyphoon.ai/v1/chat/completions', headers=headers, json=data)

        if response.status_code == 200:
            result = response.json()['choices'][0]['message']['content']
            title = extract_between_tags(result, "title")
            summary = extract_between_tags(result, "summary")
            lesson_content = extract_between_tags(result, "lesson")
            quiz_content = extract_between_tags(result, "quiz")

            # Save the lesson and quiz in the database
            lesson = Lesson.objects.create(
                title=title,
                summary=summary,
                content=lesson_content,
                quiz=quiz_content
            )
            lesson_id = lesson.id

            return redirect(reverse('detail_page', args=[lesson_id]))

    return render(request, 'home/index.html')

def extract_between_tags(text, tag):
    start_tag = f"[{tag}:"
    end_tag = "]"
    start = text.find(start_tag) + len(start_tag)
    end = text.find(end_tag, start)
    return text[start:end].strip()

def detail_page(request, lesson_id):
    lesson = get_object_or_404(Lesson, id=lesson_id)
    return render(request, 'detail/detail.html', {
        'title': lesson.title,
        'summary': lesson.summary,
        'content': lesson.content,
        'quiz': lesson.quiz,
    })

def quiz_page(request, lesson_id):
    lesson = get_object_or_404(Lesson, id=lesson_id)
    return render(request, 'detail/quiz.html', {
        'title': lesson.title,
        'quiz': lesson.quiz,
    })
