from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from apps.accounts.permissions import IsAdminOrFacultyOrReadOnly, IsAdminOrReadOnly

from .models import Notice, Result, TimetableEntry
from .serializers import NoticeSerializer, ResultSerializer, TimetableEntrySerializer


class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer
    permission_classes = [IsAdminOrFacultyOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']


class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.select_related('student')
    serializer_class = ResultSerializer
    permission_classes = [IsAdminOrFacultyOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['student', 'subject']

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        if user.role == 'student' and hasattr(user, 'student_profile'):
            qs = qs.filter(student=user.student_profile)
        return qs


class TimetableEntryViewSet(viewsets.ModelViewSet):
    queryset = TimetableEntry.objects.select_related('department')
    serializer_class = TimetableEntrySerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['department', 'year', 'day']
