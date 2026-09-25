from django.conf import settings
from django.db import models

from apps.accounts.models import Department


class Student(models.Model):
    class Year(models.TextChoices):
        FIRST = '1st', '1st Year'
        SECOND = '2nd', '2nd Year'
        THIRD = '3rd', '3rd Year'
        FOURTH = '4th', '4th Year'

    class Status(models.TextChoices):
        ACTIVE = 'Active', 'Active'
        INACTIVE = 'Inactive', 'Inactive'

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile',
        null=True, blank=True,
    )
    roll_number = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=150)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='students')
    year = models.CharField(max_length=5, choices=Year.choices, default=Year.FIRST)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['roll_number']

    def __str__(self):
        return f'{self.roll_number} — {self.name}'
