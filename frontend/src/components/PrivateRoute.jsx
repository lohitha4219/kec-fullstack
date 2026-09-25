import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function PrivateRoute({ children, roles }) {
  const { user, loading } = useAuth()

  if (loading) return null

  // Not logged in → Home page
  if (!user) {
    return <Navigate to="/" replace />
  }

  // Logged in but role is not allowed
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}