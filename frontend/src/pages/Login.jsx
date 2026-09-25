import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'faculty', label: 'Faculty' },
  { value: 'student', label: 'Student' },
]

export default function Login() {
  const [mode, setMode] = useState('login')
  const [role, setRole] = useState('student')

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    // =========================
    // LOGIN VALIDATION
    // =========================
    if (mode === 'login') {
      if (!username || !password) {
        setError('Please enter your username and password.')
        return
      }
    }

    // =========================
    // REGISTER VALIDATION
    // =========================
    if (mode === 'register') {
      if (!username || !email || !password || !name) {
        setError('Please fill in all required fields.')
        return
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters.')
        return
      }

      // Do not allow public Admin registration
      if (role === 'admin') {
        setError(
          'Admin accounts cannot be created through public registration.'
        )
        return
      }
    }

    setSubmitting(true)

    try {
      // =========================
      // LOGIN
      // =========================
      if (mode === 'login') {
        const loggedInUser = await login({
          username,
          password,
        })

        // Check the role stored in Django
        if (loggedInUser.role !== role) {
          // Remove the login because selected role is incorrect
          localStorage.removeItem('kec_access_token')
          localStorage.removeItem('kec_refresh_token')
          localStorage.removeItem('kec_smart_campus_user')

          setError(
            `This account is registered as ${loggedInUser.role}. Please select ${loggedInUser.role} to continue.`
          )

          return
        }

        // Correct role → dashboard
        navigate('/dashboard')
      }

      // =========================
      // REGISTER
      // =========================
      else {
        const nameParts = name.trim().split(/\s+/)

        const first_name = nameParts[0] || ''
        const last_name = nameParts.slice(1).join(' ')

        await register({
          username,
          email,
          password,
          first_name,
          last_name,
          role,
          phone,
        })

        navigate('/dashboard')
      }
    } catch (err) {
      setError(
        err.message ||
          'Unable to login. Please check your credentials.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-campus-navy flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        {/* =========================
            COLLEGE BRAND
        ========================== */}
        <div className="flex flex-col items-center mb-6 text-white">

          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-3">
            <GraduationCap
              className="text-campus-gold"
              size={28}
            />
          </div>

          <h1 className="font-display text-xl font-semibold text-center">
            Kuppam Engineering College
          </h1>

          <p className="text-sm text-blue-100/70">
            Smart Campus Portal
          </p>

        </div>

        {/* =========================
            LOGIN CARD
        ========================== */}
        <div className="card p-6">

          {/* Login / Register */}
          <div className="flex mb-5 bg-campus-mist rounded-lg p-1">

            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                mode === 'login'
                  ? 'bg-white shadow-sm text-campus-navy'
                  : 'text-campus-slate'
              }`}
              onClick={() => {
                setMode('login')
                setError('')
              }}
            >
              Login
            </button>

            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                mode === 'register'
                  ? 'bg-white shadow-sm text-campus-navy'
                  : 'text-campus-slate'
              }`}
              onClick={() => {
                setMode('register')
                setError('')
              }}
            >
              Register
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* =========================
                ROLE
            ========================== */}
            <div>

              <label className="block text-xs font-medium text-campus-slate mb-1.5">
                {mode === 'login'
                  ? 'Login as'
                  : 'Register as'}
              </label>

              <div className="grid grid-cols-3 gap-2">

                {roles.map((r) => (
                  <button
                    type="button"
                    key={r.value}
                    onClick={() => {
                      setRole(r.value)
                      setError('')
                    }}
                    className={`py-2 text-sm rounded-lg border transition ${
                      role === r.value
                        ? 'border-campus-blue bg-blue-50 text-campus-blue font-medium'
                        : 'border-[#D7DCE6] text-campus-slate'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}

              </div>
            </div>

            {/* =========================
                FULL NAME - REGISTER
            ========================== */}
            {mode === 'register' && (
              <div>

                <label className="block text-xs font-medium text-campus-slate mb-1.5">
                  Full Name
                </label>

                <input
                  type="text"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />

              </div>
            )}

            {/* =========================
                USERNAME
            ========================== */}
            <div>

              <label className="block text-xs font-medium text-campus-slate mb-1.5">
                Username
              </label>

              <input
                type="text"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={
                  role === 'admin'
                    ? 'Enter admin username'
                    : role === 'faculty'
                      ? 'Enter faculty username'
                      : 'Enter student username'
                }
                autoComplete="username"
              />

            </div>

            {/* =========================
                EMAIL - REGISTER
            ========================== */}
            {mode === 'register' && (
              <div>

                <label className="block text-xs font-medium text-campus-slate mb-1.5">
                  Email
                </label>

                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                />

              </div>
            )}

            {/* =========================
                PHONE - REGISTER
            ========================== */}
            {mode === 'register' && (
              <div>

                <label className="block text-xs font-medium text-campus-slate mb-1.5">
                  Phone
                </label>

                <input
                  type="tel"
                  className="input-field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                />

              </div>
            )}

            {/* =========================
                PASSWORD
            ========================== */}
            <div>

              <label className="block text-xs font-medium text-campus-slate mb-1.5">
                Password
              </label>

              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={
                  mode === 'login'
                    ? 'current-password'
                    : 'new-password'
                }
              />

            </div>

            {/* =========================
                ERROR
            ========================== */}
            {error && (
              <div className="text-sm text-campus-red bg-red-50 border border-red-100 rounded-lg p-3">
                {error}
              </div>
            )}

            {/* =========================
                SUBMIT
            ========================== */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting
                ? 'Please wait...'
                : mode === 'login'
                  ? 'Sign In'
                  : 'Create Account'}
            </button>

          </form>

          {/* =========================
              FOOTER MESSAGE
          ========================== */}
          <p className="text-xs text-center text-campus-slate mt-4">
            {mode === 'login'
              ? 'Use your own campus username and password for your selected role.'
              : 'Create a separate campus account for your role.'}
          </p>

        </div>
      </div>
    </div>
  )
}