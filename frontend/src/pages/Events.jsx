import React from 'react'
import { CalendarDays, MapPin } from 'lucide-react'
import { PageHeader, Badge } from '../components/Common.jsx'
import { events, notices } from '../services/sampleData.js'

export default function Events() {
  return (
    <div>
      <PageHeader title="Events & Notices" subtitle="Everything happening across campus, in one place." />

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-4">
          <h2 className="font-display font-semibold text-campus-navy mb-3">Upcoming Events</h2>
          <ul className="space-y-4">
            {events.map((e) => (
              <li key={e.id} className="flex gap-3">
                <div className="w-11 h-11 rounded-lg bg-blue-50 text-campus-blue flex items-center justify-center shrink-0">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-campus-ink">{e.name}</p>
                  <p className="text-xs text-campus-slate flex items-center gap-1 mt-0.5">
                    {e.date} · <MapPin size={12} /> {e.venue}
                  </p>
                  <Badge tone="blue">{e.category}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-4">
          <h2 className="font-display font-semibold text-campus-navy mb-3">Campus Notices</h2>
          <ul className="divide-y divide-[#EEF0F5]">
            {notices.map((n) => (
              <li key={n.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-campus-ink">{n.title}</p>
                  <p className="text-xs text-campus-slate mt-0.5">{n.date}</p>
                </div>
                <Badge tone="gold">{n.category}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
