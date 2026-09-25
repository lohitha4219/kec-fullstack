import React, { useState } from 'react'
import { PageHeader, Badge } from '../components/Common.jsx'
import { hostelRooms, hostelComplaints as initialComplaints } from '../services/sampleData.js'

export default function Hostel() {
  const [complaints, setComplaints] = useState(initialComplaints)
  const [issue, setIssue] = useState('')
  const [room, setRoom] = useState(hostelRooms[0].room)

  const submitComplaint = (e) => {
    e.preventDefault()
    if (!issue.trim()) return
    setComplaints((prev) => [
      { id: prev.length + 1, room, issue, status: 'Pending', date: new Date().toISOString().slice(0, 10) },
      ...prev,
    ])
    setIssue('')
  }

  return (
    <div>
      <PageHeader title="Hostel" subtitle="Room allocation overview and complaint tracking." />

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-4">
          <h2 className="font-display font-semibold text-campus-navy mb-3">Room Allocation</h2>
          <table className="data-table">
            <thead><tr><th>Room</th><th>Block</th><th>Occupancy</th><th>Occupants</th></tr></thead>
            <tbody>
              {hostelRooms.map((r) => (
                <tr key={r.room}>
                  <td>{r.room}</td>
                  <td>{r.block}</td>
                  <td>
                    <Badge tone={r.occupied === r.capacity ? 'red' : r.occupied === 0 ? 'gray' : 'green'}>
                      {r.occupied}/{r.capacity}
                    </Badge>
                  </td>
                  <td className="text-xs">{r.occupants.join(', ') || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-5">
          <div className="card p-4">
            <h2 className="font-display font-semibold text-campus-navy mb-3">File a Complaint</h2>
            <form onSubmit={submitComplaint} className="space-y-3">
              <select className="input-field" value={room} onChange={(e) => setRoom(e.target.value)}>
                {hostelRooms.map((r) => <option key={r.room}>{r.room}</option>)}
              </select>
              <textarea
                className="input-field"
                rows={3}
                placeholder="Describe the issue"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
              />
              <button type="submit" className="btn-primary w-full">Submit Complaint</button>
            </form>
          </div>

          <div className="card p-4">
            <h2 className="font-display font-semibold text-campus-navy mb-3">Complaint Status</h2>
            <ul className="space-y-3">
              {complaints.map((c) => (
                <li key={c.id} className="text-sm flex items-start justify-between gap-2">
                  <div>
                    <p className="text-campus-ink">{c.issue}</p>
                    <p className="text-xs text-campus-slate mt-0.5">{c.room} · {c.date}</p>
                  </div>
                  <Badge tone={c.status === 'Resolved' ? 'green' : 'gold'}>{c.status}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
