import React, { useState } from 'react'
import { PageHeader, Badge } from '../components/Common.jsx'
import { attendanceRecords, students } from '../services/sampleData.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Attendance() {
  const { user } = useAuth()
  const [records, setRecords] = useState(attendanceRecords)
  const [date, setDate] = useState('2026-09-22')

  const canMark = user?.role === 'admin' || user?.role === 'faculty'

  const setStatus = (id, status) => {
    setRecords((prev) => {
      const exists = prev.find((r) => r.id === id && r.date === date)
      if (exists) return prev.map((r) => (r.id === id && r.date === date ? { ...r, status } : r))
      const student = students.find((s) => s.id === id)
      return [...prev, { id, name: student?.name || id, date, status }]
    })
  }

  const visible = canMark
    ? students.map((s) => {
        const r = records.find((rec) => rec.id === s.id && rec.date === date)
        return { id: s.id, name: s.name, status: r?.status || 'Not Marked' }
      })
    : records.filter((r) => r.name === user?.name || r.id === 'S101') // demo: student sees their own row

  return (
    <div>
      <PageHeader
        title="Attendance"
        subtitle={canMark ? 'Mark daily attendance for your class.' : 'Your attendance history.'}
        action={
          <input type="date" className="input-field w-auto" value={date} onChange={(e) => setDate(e.target.value)} />
        }
      />

      <div className="card p-4 overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Status</th>
              {canMark && <th>Mark</th>}
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>
                  <Badge tone={r.status === 'Present' ? 'green' : r.status === 'Absent' ? 'red' : r.status === 'Late' ? 'gold' : 'gray'}>
                    {r.status}
                  </Badge>
                </td>
                {canMark && (
                  <td>
                    <div className="flex gap-2">
                      {['Present', 'Absent', 'Late'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatus(r.id, s)}
                          className={`text-xs px-2.5 py-1 rounded-md border ${
                            r.status === s ? 'bg-campus-blue text-white border-campus-blue' : 'border-[#D7DCE6] text-campus-slate'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
