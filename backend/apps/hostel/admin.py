from django.contrib import admin

from .models import Complaint, Room


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('room_number', 'block', 'capacity')


@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('room', 'student', 'status', 'date')
    list_filter = ('status',)
