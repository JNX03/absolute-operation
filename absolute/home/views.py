from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from .models import Lesson
import requests
from django.conf import settings

def home_page(request):
    return render(request, 'home/index.html')

def create_lesson(request):
    search_term = request.GET.get('search_term', '')
    prompt = settings.OPEN_TYPHOON_PROMPT + f'\n\n[title:{search_term}]'

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
                    "content": prompt
                },
                {
                    "role": "user",
                    "content": f'โดยคุณต้องสอนเรื่อง {search_term}'
                }
            ],
            "max_tokens": 4096,
            "temperature": 0.6,
            "top_p": 0.95,
            "repetition_penalty": 1.05,
            "stream": False
        }

        response = requests.post('https://api.opentyphoon.ai/v1/chat/completions', headers=headers, json=data)

        # Print the full response to the console for debugging
        print("API Response Status Code:", response.status_code)
        print("API Response Content:", response.content.decode('utf-8'))

        if response.status_code == 200:
            result = response.json()['choices'][0]['message']['content']
            title = extract_between_tags(result, "title")
            summary = extract_between_tags(result, "summary")
            lesson_content = extract_between_tags(result, "lesson")

            # Extract multiple quiz and true/false contents
            quiz_content = extract_all_quiz_questions(result)
            truefalse_content = extract_all_truefalse_questions(result)

            # Combine quiz and true/false into a single string for storage
            combined_quiz_content = quiz_content + "\n" + truefalse_content

            # Save the lesson and quiz in the database
            lesson = Lesson.objects.create(
                title=title,
                summary=summary,
                content=lesson_content,
                quiz=combined_quiz_content
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

def extract_all_quiz_questions(text):
    start_tag = "[quiz:"
    end_tag = "]"
    extracted_content = []
    start = 0

    while True:
        start = text.find(start_tag, start)
        if start == -1:
            break
        start += len(start_tag)
        end = text.find(end_tag, start)
        if end == -1:
            break
        extracted_content.append(f"quiz:{text[start:end].strip()}")
        start = end + len(end_tag)

    return "\n".join(extracted_content)

def extract_all_truefalse_questions(text):
    start_tag = "[truefalse:"
    end_tag = "]"
    extracted_content = []
    start = 0

    while True:
        start = text.find(start_tag, start)
        if start == -1:
            break
        start += len(start_tag)
        end = text.find(end_tag, start)
        if end == -1:
            break
        extracted_content.append(f"truefalse:{text[start:end].strip()}")
        start = end + len(end_tag)

    return "\n".join(extracted_content)
