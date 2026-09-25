from rest_framework.routers import DefaultRouter

from .views import NoticeViewSet, ResultViewSet, TimetableEntryViewSet

router = DefaultRouter()
router.register('notices', NoticeViewSet, basename='notice')
router.register('results', ResultViewSet, basename='result')
router.register('timetable', TimetableEntryViewSet, basename='timetable')

urlpatterns = router.urls
