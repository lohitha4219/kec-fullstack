from django.db import models


class Event(models.Model):
    class Category(models.TextChoices):
        FEST = 'Fest', 'Fest'
        WORKSHOP = 'Workshop', 'Workshop'
        SPORTS = 'Sports', 'Sports'
        SEMINAR = 'Seminar', 'Seminar'
        OTHER = 'Other', 'Other'

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date = models.DateField()
    venue = models.CharField(max_length=150)
    category = models.CharField(max_length=20, choices=Category.choices, default=Category.OTHER)

    class Meta:
        ordering = ['date']

    def __str__(self):
        return self.name
