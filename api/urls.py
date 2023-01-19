from django.urls import path
from .views import *

urlpatterns = [
    path('generate-response', GenerateResponse.as_view()),
]