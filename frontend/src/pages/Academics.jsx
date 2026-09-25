import React, { useState } from 'react'
import { PageHeader, Badge } from '../components/Common.jsx'
import { notices, results, timetable } from '../services/sampleData.js'

const tabs = ['Notices', 'Results', 'Timetable']

export default function Academics() {
  const [tab, setTab] = useState('Notices')

  return (
    <div>
      <PageHeader title="Academic Info" subtitle="Notices, results and your weekly timetable." />

      <div className="flex gap-2 mb-5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm rounded-lg font-medium ${
              tab === t ? 'bg-campus-blue text-white' : 'bg-white border border-[#D7DCE6] text-campus-slate'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Notices' && (
        <div className="card p-4 divide-y divide-[#EEF0F5]">
          {notices.map((n) => (
            <div key={n.id} className="py-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-campus-ink">{n.title}</p>
                <p className="text-xs text-campus-slate mt-0.5">{n.date}</p>
              </div>
              <Badge tone="blue">{n.category}</Badge>
            </div>
          ))}
        </div>
      )}

      {tab === 'Results' && (
        <div className="card p-4 overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr><th>Subject</th><th>Internal (30)</th><th>External (70)</th><th>Total</th><th>Grade</th></tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.subject}>
                  <td>{r.subject}</td><td>{r.internal}</td><td>{r.external}</td><td>{r.total}</td>
                  <td><Badge tone={r.grade.startsWith('A') ? 'green' : 'gold'}>{r.grade}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'Timetable' && (
        <div className="card p-4 overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Day</th>
                {['1', '2', '3', 'Break', '4', '5', '6'].map((h) => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {timetable.map((row) => (
                <tr key={row.day}>
                  <td className="font-medium">{row.day}</td>
                  {row.slots.map((s, i) => <td key={i}>{s}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
