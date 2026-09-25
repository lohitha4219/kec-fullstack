from django.db import models

from apps.students.models import Student


class Room(models.Model):
    room_number = models.CharField(max_length=10, unique=True)
    block = models.CharField(max_length=50)
    capacity = models.PositiveIntegerField(default=2)
    occupants = models.ManyToManyField(Student, blank=True, related_name='hostel_rooms')

    @property
    def occupied(self):
        return self.occupants.count()

    def __str__(self):
        return f'{self.room_number} ({self.block})'


class Complaint(models.Model):
    class Status(models.TextChoices):
        PENDING = 'Pending', 'Pending'
        RESOLVED = 'Resolved', 'Resolved'

    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='complaints')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='complaints')
    issue = models.TextField()
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    date = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f'{self.room.room_number} — {self.issue[:30]}'
