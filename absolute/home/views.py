from django.shortcuts import render

def home(request):
    return render(request, 'homepage/index.html')

import requests
from django.shortcuts import render
from django.conf import settings

def create_lesson(request):
    response_content = ""
    if request.method == 'POST':
        search_term = request.POST.get('search_term')
        
        # Prepare the data for the API request
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {settings.OPEN_TYPHOON_API_KEY}',  # Ensure this key is stored in your settings
        }
        data = {
            "model": "typhoon-v1.5x-70b-instruct",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful assistant. You must answer only in Thai."
                },
                {
                    "role": "user",
                    "content": search_term
                }
            ],
            "max_tokens": 1024,
            "temperature": 0.6,
            "top_p": 0.95,
            "repetition_penalty": 1.05,
            "stream": False
        }

        # Send the request to the Open Typhoon API
        response = requests.post('https://api.opentyphoon.ai/v1/chat/completions', headers=headers, json=data)

        if response.status_code == 200:
            response_content = response.json()['choices'][0]['message']['content']
        else:
            response_content = "There was an error processing your request. Please try again."

    return render(request, 'homepage/index.html', {'response': response_content})
