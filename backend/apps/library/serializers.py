from rest_framework import serializers

from .models import Book, IssuedBook


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'isbn', 'title', 'author', 'copies', 'available']


class IssuedBookSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)
    student_name = serializers.CharField(source='student.name', read_only=True)

    class Meta:
        model = IssuedBook
        fields = [
            'id', 'book', 'book_title', 'student', 'student_name',
            'issue_date', 'due_date', 'return_date', 'status',
        ]
        read_only_fields = ['issue_date', 'due_date', 'return_date', 'status']
