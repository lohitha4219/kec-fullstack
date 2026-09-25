from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from apps.accounts.permissions import IsAdminOrFacultyOrReadOnly

from .models import Event
from .serializers import EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrFacultyOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']
