from django.contrib.auth.models import AbstractUser
from django.db import models


class Department(models.Model):
    """College Info / Department directory."""
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=10, unique=True)
    hod_name = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f'{self.code} — {self.name}'


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        FACULTY = 'faculty', 'Faculty'
        STUDENT = 'student', 'Student'

    role = models.CharField(max_length=10, choices=Role.choices, default=Role.STUDENT)
    phone = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return f'{self.get_full_name() or self.username} ({self.role})'
