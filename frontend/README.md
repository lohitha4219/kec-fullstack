# Kuppam Engineering College — Smart Campus Solution (Frontend)

A React.js frontend for the Smart Campus portal, built with Vite, React Router, Tailwind CSS, and Axios.

## Features

- Role-based login/register (Admin, Student, Faculty) with protected routes
- Dashboard with role-specific stats, recent attendance, notices and events
- Student Management (add / edit / delete)
- Faculty Management (directory, admin CRUD)
- Attendance (mark for admin/faculty, view for students)
- Academic Info (notices, results, timetable)
- Library (search catalog, issue tracking)
- Hostel (room allocation, complaint filing)
- Events & Notices
- Profile (update details, change password)
- Fully responsive (mobile, tablet, desktop) with a college-branded sidebar/navbar
- Runs standalone on sample/placeholder data — no backend required for local UI development

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. On first load you'll land on `/login` — demo mode accepts **any email/password** and signs you in as the role you select (Admin / Faculty / Student).

## Connecting to the Django Backend

This frontend is pre-wired to talk to the companion Django REST backend.

1. Copy `.env.example` to `.env` and set your API URL:
   ```
   VITE_API_URL=http://127.0.0.1:8000/api
   ```
2. Update `src/context/AuthContext.jsx`'s `login()` to call `POST /api/auth/login/` and store the returned JWT tokens instead of the mock profile.
3. Replace the sample data imports in each page (`src/services/sampleData.js`) with calls through `src/services/api.js`, e.g.:
   ```js
   import api from '../services/api'
   const { data } = await api.get('/students/')
   ```

## Project Structure

```
frontend/
  public/
  src/
    assets/images/
    components/       Navbar, Sidebar, PrivateRoute, AppLayout, shared UI
    pages/             Login, Dashboard, StudentManagement, FacultyManagement,
                       Attendance, Academics, Library, Hostel, Events, Profile
    services/          api.js (Axios instance), sampleData.js (demo data)
    context/           AuthContext.jsx (role-based auth)
    App.jsx
    main.jsx
  package.json
  tailwind.config.js
```

## Build for Production

```bash
npm run build
npm run preview
```

Output is generated in `dist/`.
