from rest_framework import serializers

from .models import Faculty


class FacultySerializer(serializers.ModelSerializer):
    department_code = serializers.CharField(source='department.code', read_only=True)

    class Meta:
        model = Faculty
        fields = [
            'id', 'staff_id', 'name', 'department', 'department_code',
            'designation', 'email', 'phone', 'created_at',
        ]
