from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    AdminRegisterView,
    ChangePasswordView,
    DepartmentViewSet,
    LoginView,
    MeView,
    RegisterView,
)

router = DefaultRouter()

router.register(
    'departments',
    DepartmentViewSet,
    basename='department'
)

urlpatterns = [
    path(
        'login/',
        LoginView.as_view(),
        name='login'
    ),

    path(
        'login/refresh/',
        TokenRefreshView.as_view(),
        name='login-refresh'
    ),

    # Student / Faculty registration
    path(
        'register/',
        RegisterView.as_view(),
        name='register'
    ),

    # Admin registration
    path(
        'admin-register/',
        AdminRegisterView.as_view(),
        name='admin-register'
    ),

    path(
        'me/',
        MeView.as_view(),
        name='me'
    ),

    path(
        'change-password/',
        ChangePasswordView.as_view(),
        name='change-password'
    ),
] + router.urls