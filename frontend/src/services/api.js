import axios from 'axios'

// Base URL of the Django REST backend. Override with VITE_API_URL in a .env file.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT access token (once the backend is connected) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kec_access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api

/*
  Example real endpoints this frontend is built to call once the Django
  backend (see the companion backend prompt) is running:

  POST   /api/auth/login/
  POST   /api/auth/register/
  GET    /api/students/
  POST   /api/students/
  PUT    /api/students/:id/
  DELETE /api/students/:id/
  GET    /api/faculty/
  GET    /api/attendance/?date=&class=
  POST   /api/attendance/
  GET    /api/academics/notices/
  GET    /api/academics/results/
  GET    /api/library/books/
  POST   /api/library/issue/
  GET    /api/hostel/rooms/
  POST   /api/hostel/complaints/
  GET    /api/events/
*/
