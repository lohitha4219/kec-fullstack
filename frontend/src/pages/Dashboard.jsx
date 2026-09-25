import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { PageHeader, StatCard, Badge } from '../components/Common.jsx'
import { dashboardStats, notices, events, attendanceRecords } from '../services/sampleData.js'

export default function Dashboard() {
  const { user } = useAuth()
  const stats = dashboardStats[user?.role] || dashboardStats.student
  const accents = ['blue', 'gold', 'green', 'red']

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'there'}`}
        subtitle={`Here's what's happening on campus today — ${new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}.`}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} accent={accents[i % accents.length]} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card p-5">
          <h2 className="font-display font-semibold text-campus-navy mb-4">Recent Attendance</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.date}</td>
                  <td>
                    <Badge tone={r.status === 'Present' ? 'green' : r.status === 'Absent' ? 'red' : 'gold'}>
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-5">
          <div className="card p-5">
            <h2 className="font-display font-semibold text-campus-navy mb-3">Latest Notices</h2>
            <ul className="space-y-3">
              {notices.slice(0, 3).map((n) => (
                <li key={n.id} className="text-sm">
                  <p className="text-campus-ink font-medium leading-snug">{n.title}</p>
                  <p className="text-xs text-campus-slate mt-0.5">{n.date} · {n.category}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5">
            <h2 className="font-display font-semibold text-campus-navy mb-3">Upcoming Events</h2>
            <ul className="space-y-3">
              {events.slice(0, 3).map((e) => (
                <li key={e.id} className="text-sm">
                  <p className="text-campus-ink font-medium leading-snug">{e.name}</p>
                  <p className="text-xs text-campus-slate mt-0.5">{e.date} · {e.venue}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
