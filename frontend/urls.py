from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('ask-page', index),
    path('chat-bot', index),
    path('document-read', index),
    path('ptl-audio', index),
]