import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, ChevronDown, LogOut, Menu, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

function getInitials(user) {
  if (!user) return 'U'

  const firstName = user.first_name?.trim() || ''
  const lastName = user.last_name?.trim() || ''

  // First name + last name
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }

  // Only first name
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

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const initials = getInitials(user)
  const displayName = getDisplayName(user)

  return (
    <header className="h-16 bg-white border-b border-[#E7EAF2] flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">

      {/* Left side */}
      <div className="flex items-center gap-3">

        {/* Mobile menu */}
        <button
          className="md:hidden text-campus-slate"
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>

        {/* College Logo */}
        <div className="flex items-center gap-3">

          <img
            src="/logo.jfif"
            alt="Kuppam Engineering College Logo"
            className="w-10 h-10 rounded-md object-cover"
          />

          <div className="hidden sm:block leading-tight">
            <p className="font-display font-semibold text-campus-navy text-sm">
              Kuppam Engineering College
            </p>

            <p className="text-xs text-campus-slate">
              Smart Campus Portal
            </p>
          </div>

        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <button
          className="relative text-campus-slate hover:text-campus-navy"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-campus-red rounded-full" />
        </button>

        {/* User menu */}
        <div className="relative">

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 pl-2 border-l border-[#E7EAF2]"
          >

            {/* Dynamic initials */}
            <div className="w-8 h-8 rounded-full bg-campus-blue text-white text-xs font-semibold flex items-center justify-center">
              {initials}
            </div>

            {/* User information */}
            <div className="hidden md:block text-left leading-tight">
              <p className="text-sm font-medium text-campus-ink">
                {displayName}
              </p>

              <p className="text-xs text-campus-slate capitalize">
                {user?.role || 'Student'}
              </p>
            </div>

            <ChevronDown
              size={16}
              className="text-campus-slate"
            />

          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 card shadow-lg py-1 z-40">

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-campus-ink hover:bg-campus-mist"
              >
                <User size={15} />
                Profile
              </Link>

              <button
                onClick={() => {
                  setMenuOpen(false)
                  logout()
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-campus-red hover:bg-campus-mist"
              >
                <LogOut size={15} />
                Logout
              </button>

            </div>
          )}

        </div>
      </div>
    </header>
  )
}