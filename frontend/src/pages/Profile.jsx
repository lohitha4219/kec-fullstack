import React, { useState } from 'react'
import { PageHeader } from '../components/Common.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function getInitials(user) {
  if (!user) return 'U'

  const firstName = user.first_name?.trim() || ''
  const lastName = user.last_name?.trim() || ''

  // Example: Lohith Kumar → LK
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }

  // Example: Lohith → LO
  if (firstName) {
    return firstName.substring(0, 2).toUpperCase()
  }

  // Fallback to username
  if (user.username) {
    return user.username.substring(0, 2).toUpperCase()
  }

  // Fallback to email
  if (user.email) {
    return user.email.substring(0, 2).toUpperCase()
  }

  return 'U'
}

function getDisplayName(user) {
  if (!user) return 'User'

  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim()

  return fullName || user.username || 'User'
}

export default function Profile() {
  const { user, updateProfile } = useAuth()

  const displayName = getDisplayName(user)
  const initials = getInitials(user)

  const [name, setName] = useState(displayName)
  const [email, setEmail] = useState(user?.email || '')
  const [saved, setSaved] = useState(false)

  const [pwd, setPwd] = useState({
    current: '',
    next: '',
    confirm: '',
  })

  const [pwdMsg, setPwdMsg] = useState('')

  const saveDetails = async (e) => {
    e.preventDefault()

    setSaved(false)

    const nameParts = name.trim().split(/\s+/)

    const first_name = nameParts[0] || ''
    const last_name = nameParts.slice(1).join(' ')

    try {
      await updateProfile({
        first_name,
        last_name,
        email,
      })

      setSaved(true)

      setTimeout(() => {
        setSaved(false)
      }, 2000)
    } catch (error) {
      setSaved(false)
      alert(error.message || 'Unable to update profile.')
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()

    setPwdMsg('')

    if (!pwd.current || !pwd.next || !pwd.confirm) {
      setPwdMsg('Please fill in all password fields.')
      return
    }

    if (pwd.next.length < 6) {
      setPwdMsg('New password must be at least 6 characters.')
      return
    }

    if (pwd.next !== pwd.confirm) {
      setPwdMsg('New passwords do not match.')
      return
    }

    const token = localStorage.getItem('kec_access_token')

    if (!token) {
      setPwdMsg('You are not logged in.')
      return
    }

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/auth/change-password/',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            current_password: pwd.current,
            new_password: pwd.next,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setPwdMsg(
          data.detail || 'Unable to update password.'
        )
        return
      }

      setPwdMsg('Password updated successfully.')

      setPwd({
        current: '',
        next: '',
        confirm: '',
      })
    } catch (error) {
      setPwdMsg(
        'Unable to connect to the server. Please try again.'
      )
    }
  }

  return (
    <div>

      <PageHeader
        title="Profile"
        subtitle="Manage your account details and security."
      />

      <div className="grid lg:grid-cols-2 gap-5">

        {/* =========================
            PROFILE INFORMATION
        ========================== */}
        <div className="card p-5">

          {/* User header */}
          <div className="flex items-center gap-3 mb-5">

            {/* Dynamic Initials */}
            <div className="w-14 h-14 rounded-full bg-campus-blue text-white flex items-center justify-center font-semibold text-lg">
              {initials}
            </div>

            <div>

              <p className="font-medium text-campus-ink">
                {displayName}
              </p>

              <p className="text-xs text-campus-slate capitalize">
                {user?.role || 'Student'} · Kuppam Engineering College
              </p>

            </div>
          </div>

          {/* Profile form */}
          <form onSubmit={saveDetails} className="space-y-3">

            {/* Full Name */}
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

            {/* Email */}
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
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-campus-slate mb-1.5">
                Username
              </label>

              <input
                type="text"
                className="input-field bg-gray-50"
                value={user?.username || ''}
                disabled
              />
            </div>

            {/* Save */}
            <button
              type="submit"
              className="btn-primary"
            >
              Save Changes
            </button>

            {saved && (
              <p className="text-sm text-campus-green">
                Profile updated successfully.
              </p>
            )}

          </form>
        </div>

        {/* =========================
            CHANGE PASSWORD
        ========================== */}
        <div className="card p-5">

          <h2 className="font-display font-semibold text-campus-navy mb-4">
            Change Password
          </h2>

          <form
            onSubmit={changePassword}
            className="space-y-3"
          >

            {/* Current password */}
            <input
              type="password"
              className="input-field"
              placeholder="Current password"
              value={pwd.current}
              onChange={(e) =>
                setPwd({
                  ...pwd,
                  current: e.target.value,
                })
              }
            />

            {/* New password */}
            <input
              type="password"
              className="input-field"
              placeholder="New password"
              value={pwd.next}
              onChange={(e) =>
                setPwd({
                  ...pwd,
                  next: e.target.value,
                })
              }
            />

            {/* Confirm password */}
            <input
              type="password"
              className="input-field"
              placeholder="Confirm new password"
              value={pwd.confirm}
              onChange={(e) =>
                setPwd({
                  ...pwd,
                  confirm: e.target.value,
                })
              }
            />

            {/* Update password */}
            <button
              type="submit"
              className="btn-outline"
            >
              Update Password
            </button>

            {pwdMsg && (
              <p className="text-sm text-campus-slate">
                {pwdMsg}
              </p>
            )}

          </form>
        </div>

      </div>
    </div>
  )
}