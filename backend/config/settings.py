"""
Django settings for the Kuppam Engineering College — Smart Campus backend.
"""

import os
from datetime import timedelta
from pathlib import Path

import dj_database_url
from dotenv import load_dotenv


# ---------------------------------------------------------------------
# BASE CONFIGURATION
# ---------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


# ---------------------------------------------------------------------
# SECURITY
# ---------------------------------------------------------------------

SECRET_KEY = os.environ.get(
    "SECRET_KEY",
    "django-insecure-change-this-in-production",
)

DEBUG = os.environ.get("DEBUG", "False").lower() == "true"


ALLOWED_HOSTS = [
    host.strip()
    for host in os.environ.get(
        "ALLOWED_HOSTS",
        "localhost,127.0.0.1",
    ).split(",")
    if host.strip()
]


# Render automatically provides this variable after deployment.
render_host = os.environ.get("RENDER_EXTERNAL_HOSTNAME")

if render_host and render_host not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append(render_host)


# ---------------------------------------------------------------------
# APPLICATIONS
# ---------------------------------------------------------------------

INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "django_filters",

    # Local apps
    "apps.accounts",
    "apps.students",
    "apps.faculty",
    "apps.attendance",
    "apps.academics",
    "apps.library",
    "apps.hostel",
    "apps.events",
    "apps.core",
]


# ---------------------------------------------------------------------
# MIDDLEWARE
# ---------------------------------------------------------------------

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# ---------------------------------------------------------------------
# URL / WSGI
# ---------------------------------------------------------------------

ROOT_URLCONF = "config.urls"

WSGI_APPLICATION = "config.wsgi.application"


# ---------------------------------------------------------------------
# TEMPLATES
# ---------------------------------------------------------------------

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# ---------------------------------------------------------------------
# DATABASE
# ---------------------------------------------------------------------
#
# LOCAL:
#     Uses SQLite -> backend/db.sqlite3
#
# RENDER:
#     Uses PostgreSQL through DATABASE_URL
#
# MYSQL:
#     Uses MySQL when DB_ENGINE=mysql
#
# IMPORTANT:
#     DATABASE_URL must be configured in Render Environment Variables.
#
# ---------------------------------------------------------------------

DB_ENGINE = os.environ.get("DB_ENGINE", "").lower()
DATABASE_URL = os.environ.get("DATABASE_URL")


if DB_ENGINE == "mysql":

    # -------------------------------------------------------------
    # MYSQL
    # -------------------------------------------------------------

    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.mysql",
            "NAME": os.environ.get(
                "DB_NAME",
                "smart_campus",
            ),
            "USER": os.environ.get(
                "DB_USER",
                "root",
            ),
            "PASSWORD": os.environ.get(
                "DB_PASSWORD",
                "",
            ),
            "HOST": os.environ.get(
                "DB_HOST",
                "localhost",
            ),
            "PORT": os.environ.get(
                "DB_PORT",
                "3306",
            ),
            "OPTIONS": {
                "charset": "utf8mb4",
            },
        }
    }


elif DATABASE_URL:

    # -------------------------------------------------------------
    # POSTGRESQL
    # -------------------------------------------------------------
    #
    # Used on Render.
    #
    # DATABASE_URL example:
    #
    # postgresql://username:password@hostname:5432/database
    #
    # The real value is stored in Render Environment Variables.
    #

    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            ssl_require=True,
        )
    }


else:

    # -------------------------------------------------------------
    # SQLITE
    # -------------------------------------------------------------
    #
    # Used during local development.
    #

    SQLITE_DB_PATH = os.environ.get(
        "SQLITE_DB_PATH",
        str(BASE_DIR / "db.sqlite3"),
    )

    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": SQLITE_DB_PATH,
        }
    }


# ---------------------------------------------------------------------
# CUSTOM USER MODEL
# ---------------------------------------------------------------------

AUTH_USER_MODEL = "accounts.User"


# ---------------------------------------------------------------------
# PASSWORD VALIDATION
# ---------------------------------------------------------------------

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME":
            "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME":
            "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME":
            "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME":
            "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# ---------------------------------------------------------------------
# INTERNATIONALIZATION
# ---------------------------------------------------------------------

LANGUAGE_CODE = "en-us"

TIME_ZONE = os.environ.get(
    "TIME_ZONE",
    "Asia/Kolkata",
)

USE_I18N = True

USE_TZ = True


# ---------------------------------------------------------------------
# STATIC FILES
# ---------------------------------------------------------------------

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"


# ---------------------------------------------------------------------
# DEFAULT PRIMARY KEY
# ---------------------------------------------------------------------

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ---------------------------------------------------------------------
# DJANGO REST FRAMEWORK / JWT
# ---------------------------------------------------------------------

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),

    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),

    "DEFAULT_FILTER_BACKENDS": (
        "django_filters.rest_framework.DjangoFilterBackend",
    ),

    "DEFAULT_PAGINATION_CLASS":
        "rest_framework.pagination.PageNumberPagination",

    "PAGE_SIZE": 20,
}


# ---------------------------------------------------------------------
# SIMPLE JWT
# ---------------------------------------------------------------------

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=8),

    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),

    "ROTATE_REFRESH_TOKENS": True,

    "AUTH_HEADER_TYPES": (
        "Bearer",
    ),
}


# ---------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------

CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "CORS_ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if origin.strip()
]

CORS_ALLOW_CREDENTIALS = True


# ---------------------------------------------------------------------
# CSRF
# ---------------------------------------------------------------------

CSRF_TRUSTED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get(
        "CSRF_TRUSTED_ORIGINS",
        "",
    ).split(",")
    if origin.strip()
]


# ---------------------------------------------------------------------
# PRODUCTION SECURITY
# ---------------------------------------------------------------------

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = (
        "HTTP_X_FORWARDED_PROTO",
        "https",
    )

    SESSION_COOKIE_SECURE = True

    CSRF_COOKIE_SECURE = True


# ---------------------------------------------------------------------
# END OF SETTINGS
# ---------------------------------------------------------------------