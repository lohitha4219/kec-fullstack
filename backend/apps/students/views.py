from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets

from apps.accounts.permissions import IsAdminOrFacultyOrReadOnly

from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    """
    CRUD for student records.
    - Admin & Faculty: full access.
    - Any authenticated user: read-only.
    """
    queryset = Student.objects.select_related('department').all()
    serializer_class = StudentSerializer
    permission_classes = [IsAdminOrFacultyOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['department', 'year', 'status']
    search_fields = ['name', 'roll_number', 'email']
