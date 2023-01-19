from django.db import models

# Create your models here.


class Response(models.Model):
    response = models.CharField(max_length=256)