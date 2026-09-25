from rest_framework import serializers

from .models import AttendanceRecord


class AttendanceRecordSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)
    roll_number = serializers.CharField(source='student.roll_number', read_only=True)

    class Meta:
        model = AttendanceRecord
        fields = ['id', 'student', 'roll_number', 'student_name', 'date', 'status', 'marked_by', 'created_at']
        read_only_fields = ['marked_by']
