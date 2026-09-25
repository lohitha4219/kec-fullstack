from django.contrib import admin

from .models import Notice, Result, TimetableEntry


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date')
    list_filter = ('category',)


@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'internal_marks', 'external_marks', 'grade')


@admin.register(TimetableEntry)
class TimetableEntryAdmin(admin.ModelAdmin):
    list_display = ('department', 'year', 'day', 'period', 'subject')
    list_filter = ('department', 'year', 'day')
