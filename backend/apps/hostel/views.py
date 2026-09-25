from rest_framework.permissions import IsAuthenticated

from apps.accounts.permissions import IsAdminOrReadOnly

from rest_framework import viewsets

from .models import Complaint, Room
from .serializers import ComplaintSerializer, RoomSerializer


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.prefetch_related('occupants').all()
    serializer_class = RoomSerializer
    permission_classes = [IsAdminOrReadOnly]


class ComplaintViewSet(viewsets.ModelViewSet):
    """
    Any authenticated user (typically a student) can file a complaint.
    Only admin/faculty can update its status; everyone can view.
    """
    queryset = Complaint.objects.select_related('room', 'student')
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ('update', 'partial_update', 'destroy'):
            from apps.accounts.permissions import IsAdminOrFaculty
            return [IsAdminOrFaculty()]
        return super().get_permissions()
