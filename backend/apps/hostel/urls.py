from rest_framework.routers import DefaultRouter

from .views import ComplaintViewSet, RoomViewSet

router = DefaultRouter()
router.register('rooms', RoomViewSet, basename='room')
router.register('complaints', ComplaintViewSet, basename='complaint')

urlpatterns = router.urls
