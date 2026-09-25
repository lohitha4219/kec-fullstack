from django.conf import settings
from django.db import models

from apps.accounts.models import Department


class Faculty(models.Model):
    class Designation(models.TextChoices):
        PROFESSOR = 'Professor', 'Professor'
        ASSOCIATE = 'Associate Professor', 'Associate Professor'
        ASSISTANT = 'Assistant Professor', 'Assistant Professor'

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='faculty_profile',
        null=True, blank=True,
    )
    staff_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=150)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='faculty_members')
    designation = models.CharField(max_length=30, choices=Designation.choices, default=Designation.ASSISTANT)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['staff_id']
        verbose_name_plural = 'Faculty'

    def __str__(self):
        return f'{self.staff_id} — {self.name}'
