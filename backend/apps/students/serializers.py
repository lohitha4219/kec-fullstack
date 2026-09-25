from rest_framework import serializers

from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    department_code = serializers.CharField(source='department.code', read_only=True)

    class Meta:
        model = Student
        fields = [
            'id', 'roll_number', 'name', 'department', 'department_code',
            'year', 'email', 'phone', 'status', 'created_at',
        ]
