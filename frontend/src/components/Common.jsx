import React from 'react'

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
      <div>
        <h1 className="font-display text-xl md:text-2xl font-semibold text-campus-navy">{title}</h1>
        {subtitle && <p className="text-sm text-campus-slate mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function StatCard({ label, value, accent = 'blue' }) {
  const accentMap = {
    blue: 'border-l-campus-blue',
    gold: 'border-l-campus-gold',
    green: 'border-l-campus-green',
    red: 'border-l-campus-red',
  }
  return (
    <div className={`card border-l-4 ${accentMap[accent]} p-4`}>
      <p className="text-xs text-campus-slate uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-display font-semibold text-campus-ink mt-1">{value}</p>
    </div>
  )
}

export function Badge({ children, tone = 'blue' }) {
  const toneMap = {
    blue: 'bg-blue-50 text-campus-blue',
    green: 'bg-green-50 text-campus-green',
    red: 'bg-red-50 text-campus-red',
    gold: 'bg-amber-50 text-campus-gold',
    gray: 'bg-gray-100 text-campus-slate',
  }
  return <span className={`badge ${toneMap[tone]}`}>{children}</span>
}

export function EmptyState({ text }) {
  return (
    <div className="text-center py-10 text-sm text-campus-slate">{text}</div>
  )
}
