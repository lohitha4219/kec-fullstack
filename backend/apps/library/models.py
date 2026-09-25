from datetime import timedelta

from django.db import models
from django.utils import timezone

from apps.students.models import Student


class Book(models.Model):
    isbn = models.CharField(max_length=20, unique=True, blank=True)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=150)
    copies = models.PositiveIntegerField(default=1)
    available = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.title


class IssuedBook(models.Model):
    class Status(models.TextChoices):
        ISSUED = 'Issued', 'Issued'
        RETURNED = 'Returned', 'Returned'
        OVERDUE = 'Overdue', 'Overdue'

    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='issues')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='issued_books')
    issue_date = models.DateField(auto_now_add=True)
    due_date = models.DateField()
    return_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.ISSUED)

    def save(self, *args, **kwargs):
        if not self.due_date:
            self.due_date = timezone.now().date() + timedelta(days=14)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.book.title} -> {self.student.roll_number} ({self.status})'
