from django.contrib import admin

from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'name', 'department', 'year', 'status')
    list_filter = ('department', 'year', 'status')
    search_fields = ('name', 'roll_number', 'email')
