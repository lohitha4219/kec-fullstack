from rest_framework import serializers

from .models import Notice, Result, TimetableEntry


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = ['id', 'title', 'description', 'category', 'date']


class ResultSerializer(serializers.ModelSerializer):
    total = serializers.ReadOnlyField()
    student_name = serializers.CharField(source='student.name', read_only=True)

    class Meta:
        model = Result
        fields = ['id', 'student', 'student_name', 'subject', 'internal_marks', 'external_marks', 'total', 'grade']


class TimetableEntrySerializer(serializers.ModelSerializer):
    department_code = serializers.CharField(source='department.code', read_only=True)

    class Meta:
        model = TimetableEntry
        fields = ['id', 'department', 'department_code', 'year', 'day', 'period', 'subject']
