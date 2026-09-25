from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from apps.accounts.permissions import IsAdminOrFacultyOrReadOnly

from .models import AttendanceRecord
from .serializers import AttendanceRecordSerializer


class AttendanceViewSet(viewsets.ModelViewSet):
    """
    GET  /api/attendance/?date=2026-09-22&student__department=1   -> list/filter
    POST /api/attendance/                                          -> mark attendance (admin/faculty)

    Students only ever see their own attendance records.
    """
    serializer_class = AttendanceRecordSerializer
    permission_classes = [IsAdminOrFacultyOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['date', 'status', 'student', 'student__department']

    def get_queryset(self):
        qs = AttendanceRecord.objects.select_related('student', 'student__department')
        user = self.request.user
        if user.role == 'student' and hasattr(user, 'student_profile'):
            qs = qs.filter(student=user.student_profile)
        return qs

    def perform_create(self, serializer):
        serializer.save(marked_by=self.request.user)
