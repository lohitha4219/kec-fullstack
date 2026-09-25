from datetime import timedelta

from django.utils import timezone
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from apps.accounts.permissions import IsAdminOrFacultyOrReadOnly

from .models import Book, IssuedBook
from .serializers import BookSerializer, IssuedBookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminOrFacultyOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'author', 'isbn']


class IssuedBookViewSet(viewsets.ModelViewSet):
    """
    POST /api/library/issue/            -> create with {book, student}; decrements Book.available
    POST /api/library/issue/{id}/return_book/ -> marks returned; increments Book.available
    """
    queryset = IssuedBook.objects.select_related('book', 'student')
    serializer_class = IssuedBookSerializer
    permission_classes = [IsAdminOrFacultyOrReadOnly]

    def perform_create(self, serializer):
        book = serializer.validated_data['book']
        if book.available < 1:
            raise ValidationError('No copies of this book are currently available.')
        due_date = timezone.now().date() + timedelta(days=14)
        serializer.save(due_date=due_date)
        book.available -= 1
        book.save(update_fields=['available'])

    @action(detail=True, methods=['post'])
    def return_book(self, request, pk=None):
        issued = self.get_object()
        if issued.status == IssuedBook.Status.RETURNED:
            return Response({'detail': 'Book already returned.'}, status=status.HTTP_400_BAD_REQUEST)
        issued.status = IssuedBook.Status.RETURNED
        issued.return_date = timezone.now().date()
        issued.save()
        issued.book.available += 1
        issued.book.save(update_fields=['available'])
        return Response(IssuedBookSerializer(issued).data)
