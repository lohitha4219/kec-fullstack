from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets

from apps.accounts.permissions import IsAdminOrReadOnly

from .models import Faculty
from .serializers import FacultySerializer


class FacultyViewSet(viewsets.ModelViewSet):
    """
    CRUD for faculty directory.
    - Admin: full access.
    - Any authenticated user (including faculty & students): read-only.
    """
    queryset = Faculty.objects.select_related('department').all()
    serializer_class = FacultySerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['department', 'designation']
    search_fields = ['name', 'staff_id', 'email']
