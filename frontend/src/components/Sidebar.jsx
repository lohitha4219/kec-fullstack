import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  BookOpenText,
  BookMarked,
  Building2,
  CalendarDays,
  UserCircle,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const linksByRole = {
  admin: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/students', label: 'Student Management', icon: Users },
    { to: '/faculty', label: 'Faculty Management', icon: GraduationCap },
    { to: '/attendance', label: 'Attendance', icon: ClipboardCheck },
    { to: '/academics', label: 'Academic Info', icon: BookOpenText },
    { to: '/library', label: 'Library', icon: BookMarked },
    { to: '/hostel', label: 'Hostel', icon: Building2 },
    { to: '/events', label: 'Events & Notices', icon: CalendarDays },
    { to: '/profile', label: 'Profile', icon: UserCircle },
  ],
  faculty: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/students', label: 'Students', icon: Users },
    { to: '/attendance', label: 'Attendance', icon: ClipboardCheck },
    { to: '/academics', label: 'Academic Info', icon: BookOpenText },
    { to: '/events', label: 'Events & Notices', icon: CalendarDays },
    { to: '/profile', label: 'Profile', icon: UserCircle },
  ],
  student: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/attendance', label: 'Attendance', icon: ClipboardCheck },
    { to: '/academics', label: 'Academic Info', icon: BookOpenText },
    { to: '/library', label: 'Library', icon: BookMarked },
    { to: '/hostel', label: 'Hostel', icon: Building2 },
    { to: '/events', label: 'Events & Notices', icon: CalendarDays },
    { to: '/profile', label: 'Profile', icon: UserCircle },
  ],
}

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth()
  const links = linksByRole[user?.role] || []

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed md:sticky top-0 md:top-16 left-0 h-screen md:h-[calc(100vh-4rem)] w-64 bg-campus-navy text-white z-40 transform transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-4 md:hidden">
          <span className="font-display font-semibold">Menu</span>
          <button onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="px-3 py-2 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-campus-blue text-white font-medium'
                    : 'text-blue-100/80 hover:bg-white/10'
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
