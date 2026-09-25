from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.accounts.urls')),
    path('api/students/', include('apps.students.urls')),
    path('api/faculty/', include('apps.faculty.urls')),
    path('api/attendance/', include('apps.attendance.urls')),
    path('api/academics/', include('apps.academics.urls')),
    path('api/library/', include('apps.library.urls')),
    path('api/hostel/', include('apps.hostel.urls')),
    path('api/events/', include('apps.events.urls')),
]
