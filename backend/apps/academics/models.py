from django.db import models

from apps.accounts.models import Department
from apps.students.models import Student


class Notice(models.Model):
    class Category(models.TextChoices):
        ACADEMICS = 'Academics', 'Academics'
        EVENTS = 'Events', 'Events'
        LIBRARY = 'Library', 'Library'
        HOSTEL = 'Hostel', 'Hostel'
        GENERAL = 'General', 'General'

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=Category.choices, default=Category.GENERAL)
    date = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.title


class Result(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='results')
    subject = models.CharField(max_length=100)
    internal_marks = models.PositiveIntegerField()
    external_marks = models.PositiveIntegerField()
    grade = models.CharField(max_length=3)

    @property
    def total(self):
        return self.internal_marks + self.external_marks

    def __str__(self):
        return f'{self.student.roll_number} — {self.subject}'


class TimetableEntry(models.Model):
    DAYS = [
        ('Monday', 'Monday'), ('Tuesday', 'Tuesday'), ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'), ('Friday', 'Friday'), ('Saturday', 'Saturday'),
    ]

    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='timetable_entries')
    year = models.CharField(max_length=5)
    day = models.CharField(max_length=10, choices=DAYS)
    period = models.PositiveSmallIntegerField(help_text='Period number, 1-7')
    subject = models.CharField(max_length=100)

    class Meta:
        ordering = ['day', 'period']
        unique_together = ['department', 'year', 'day', 'period']

    def __str__(self):
        return f'{self.department.code} {self.year} — {self.day} P{self.period}: {self.subject}'
