from django.urls import path
from .views import *

urlpatterns = [
    path('generate-response', GenerateResponse.as_view()),
    path('generate-website-ask-response', GenerateWebsiteAskResponse.as_view()),
    path('generate-chat-response', GenerateChatResponse.as_view()),
    path('document-read', GenerateDocumentResponse.as_view()),
]