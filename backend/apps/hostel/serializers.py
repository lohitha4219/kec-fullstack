from rest_framework import serializers

from .models import Complaint, Room


class RoomSerializer(serializers.ModelSerializer):
    occupied = serializers.ReadOnlyField()
    occupant_names = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = ['id', 'room_number', 'block', 'capacity', 'occupied', 'occupants', 'occupant_names']

    def get_occupant_names(self, obj):
        return [s.name for s in obj.occupants.all()]


class ComplaintSerializer(serializers.ModelSerializer):
    room_number = serializers.CharField(source='room.room_number', read_only=True)
    student_name = serializers.CharField(source='student.name', read_only=True)

    class Meta:
        model = Complaint
        fields = ['id', 'room', 'room_number', 'student', 'student_name', 'issue', 'status', 'date']
