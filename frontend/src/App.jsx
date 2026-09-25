import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute.jsx'
import AppLayout from './components/AppLayout.jsx'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'

import Dashboard from './pages/Dashboard.jsx'
import StudentManagement from './pages/StudentManagement.jsx'
import FacultyManagement from './pages/FacultyManagement.jsx'
import Attendance from './pages/Attendance.jsx'
import Academics from './pages/Academics.jsx'
import Library from './pages/Library.jsx'
import Hostel from './pages/Hostel.jsx'
import Events from './pages/Events.jsx'
import Profile from './pages/Profile.jsx'


function Protected({ children, roles }) {
  return (
    <PrivateRoute roles={roles}>
      <AppLayout>
        {children}
      </AppLayout>
    </PrivateRoute>
  )
}


export default function App() {
  return (
    <Routes>

      {/* =========================
          PUBLIC PAGES
      ========================= */}

      {/* College Home Page */}
      <Route path="/" element={<Home />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />


      {/* =========================
          PROTECTED PAGES
      ========================= */}

      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />

      <Route
        path="/students"
        element={
          <Protected roles={['admin', 'faculty']}>
            <StudentManagement />
          </Protected>
        }
      />

      <Route
        path="/faculty"
        element={
          <Protected>
            <FacultyManagement />
          </Protected>
        }
      />

      <Route
        path="/attendance"
        element={
          <Protected>
            <Attendance />
          </Protected>
        }
      />

      <Route
        path="/academics"
        element={
          <Protected>
            <Academics />
          </Protected>
        }
      />

      <Route
        path="/library"
        element={
          <Protected>
            <Library />
          </Protected>
        }
      />

      <Route
        path="/hostel"
        element={
          <Protected>
            <Hostel />
          </Protected>
        }
      />

      <Route
        path="/events"
        element={
          <Protected>
            <Events />
          </Protected>
        }
      />

      <Route
        path="/profile"
        element={
          <Protected>
            <Profile />
          </Protected>
        }
      />


      {/* =========================
          UNKNOWN URL
      ========================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  )
}