# Kuppam Engineering College — Smart Campus Solution (Backend)

A Django + Django REST Framework backend powering the Smart Campus portal, with JWT authentication, role-based access (Admin / Faculty / Student), and full CRUD APIs for every module the React frontend needs.

## Tech Stack

- Django 5 + Django REST Framework
- JWT auth via `djangorestframework-simplejwt`
- SQLite by default, switchable to MySQL via `.env`
- `django-cors-headers` for the React (Vite) frontend
- `django-filter` for query filtering on list endpoints

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt

cp .env.example .env            # edit as needed (defaults work out of the box)

python manage.py migrate
python manage.py seed_data      # loads sample data matching the frontend demo
python manage.py runserver
```

The API is now running at `http://127.0.0.1:8000/api/`. Django admin is at `http://127.0.0.1:8000/admin/`.

### Demo accounts (created by `seed_data`)

| Role    | Username | Password       |
|---------|----------|----------------|
| Admin   | `admin`  | `Admin@12345`   |
| Faculty | `f201`   | `faculty12345` |
| Student | `s101`   | `student12345` |

## Project Structure

```
backend/
  manage.py
  requirements.txt
  .env.example
  config/
    settings.py       Django settings (JWT, CORS, DB switch)
    urls.py            Root URL routing
    wsgi.py / asgi.py
  apps/
    accounts/          Custom User (role field), Department, auth endpoints
    students/          Student model + CRUD API
    faculty/            Faculty model + CRUD API
    attendance/         AttendanceRecord model + mark/view API
    academics/          Notice, Result, TimetableEntry models + APIs
    library/            Book, IssuedBook models + issue/return API
    hostel/             Room, Complaint models + API
    events/             Event model + CRUD API
    core/               Cross-cutting management commands (seed_data)
```

## Authentication

JWT-based. All endpoints except `login`/`register` require `Authorization: Bearer <access_token>`.

| Endpoint                          | Method | Description                                   |
|-----------------------------------|--------|------------------------------------------------|
| `/api/auth/register/`             | POST   | Create a new user account                      |
| `/api/auth/login/`                | POST   | `{username, password}` → `{access, refresh, user}` |
| `/api/auth/login/refresh/`        | POST   | `{refresh}` → new `access` token               |
| `/api/auth/me/`                   | GET/PUT| View or update the logged-in user's profile    |
| `/api/auth/change-password/`      | POST   | `{current_password, new_password}`             |
| `/api/auth/departments/`          | GET/POST/... | Department directory (admin writes)      |

## Role-based access

- **Admin** — full access everywhere.
- **Faculty** — manage students, attendance, notices, results, events, library, and view faculty directory; cannot manage faculty records or departments/timetable.
- **Student** — read-only on most endpoints; can view only their own attendance & results, and file hostel complaints.

## API Endpoints

| Module      | Base path                  | Notes                                             |
|-------------|-----------------------------|----------------------------------------------------|
| Students    | `/api/students/`            | Search: `?search=`, Filter: `?department=&year=&status=` |
| Faculty     | `/api/faculty/`              | Search: `?search=`, Filter: `?department=&designation=` |
| Attendance  | `/api/attendance/`           | Filter: `?date=&status=&student=&student__department=` |
| Notices     | `/api/academics/notices/`    | Filter: `?category=`                               |
| Results     | `/api/academics/results/`    | Filter: `?student=&subject=`                       |
| Timetable   | `/api/academics/timetable/`  | Filter: `?department=&year=&day=`                  |
| Books       | `/api/library/books/`        | Search: `?search=`                                 |
| Issued Books| `/api/library/issue/`        | `POST` to issue; `POST /{id}/return_book/` to return |
| Rooms       | `/api/hostel/rooms/`         | Admin manages; all roles can view                  |
| Complaints  | `/api/hostel/complaints/`    | Any authenticated user can file; admin/faculty resolve |
| Events      | `/api/events/`               | Filter: `?category=`                               |

All list endpoints are paginated (`?page=`) and standard DRF ModelViewSets, so each also supports `GET` (list/retrieve), `POST` (create), `PUT`/`PATCH` (update), and `DELETE`.

## Switching to MySQL

Set in `.env`:
```
DB_ENGINE=mysql
DB_NAME=smart_campus
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=3306
```
Then uncomment `mysqlclient` in `requirements.txt`, `pip install -r requirements.txt` again, and re-run `python manage.py migrate`.

## Connecting the React Frontend

The frontend's `src/services/api.js` reads `VITE_API_URL` (default `http://127.0.0.1:8000/api`) — no changes needed here as long as both run on their default ports. CORS is pre-configured to allow `http://localhost:5173`.
