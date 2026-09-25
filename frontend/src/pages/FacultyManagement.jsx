import React, { useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { PageHeader } from '../components/Common.jsx'
import { faculty as initialFaculty } from '../services/sampleData.js'
import { useAuth } from '../context/AuthContext.jsx'

const emptyForm = { id: '', name: '', dept: 'CSE', designation: 'Assistant Professor', email: '', phone: '' }

export default function FacultyManagement() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const [list, setList] = useState(initialFaculty)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const openAdd = () => {
    setForm({ ...emptyForm, id: `F${200 + list.length + 1}` })
    setEditingId(null)
    setModalOpen(true)
  }
  const openEdit = (f) => { setForm(f); setEditingId(f.id); setModalOpen(true) }
  const handleDelete = (id) => setList((prev) => prev.filter((f) => f.id !== id))
  const handleSave = (e) => {
    e.preventDefault()
    if (editingId) setList((prev) => prev.map((f) => (f.id === editingId ? form : f)))
    else setList((prev) => [...prev, form])
    setModalOpen(false)
  }

  return (
    <div>
      <PageHeader
        title="Faculty Management"
        subtitle="Department staff directory and assignments."
        action={isAdmin && (
          <button className="btn-primary flex items-center gap-2" onClick={openAdd}>
            <Plus size={16} /> Add Faculty
          </button>
        )}
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((f) => (
          <div key={f.id} className="card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-campus-navy text-campus-gold flex items-center justify-center text-sm font-semibold">
                  {f.name.split(' ').slice(-1)[0][0]}
                </div>
                <div>
                  <p className="font-medium text-campus-ink text-sm">{f.name}</p>
                  <p className="text-xs text-campus-slate">{f.designation}</p>
                </div>
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <button onClick={() => openEdit(f)} className="text-campus-blue"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(f.id)} className="text-campus-red"><Trash2 size={14} /></button>
                </div>
              )}
            </div>
            <div className="mt-3 text-xs text-campus-slate space-y-1">
              <p>Dept: <span className="text-campus-ink">{f.dept}</span></p>
              <p>{f.email}</p>
              <p>{f.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-campus-navy">{editingId ? 'Edit Faculty' : 'Add Faculty'}</h3>
              <button onClick={() => setModalOpen(false)}><X size={18} className="text-campus-slate" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <input required className="input-field" placeholder="Full name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <select className="input-field" value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })}>
                  {['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE'].map((d) => <option key={d}>{d}</option>)}
                </select>
                <select className="input-field" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })}>
                  {['Professor', 'Associate Professor', 'Assistant Professor'].map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <input required type="email" className="input-field" placeholder="Email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="input-field" placeholder="Phone" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <div className="flex gap-2 pt-2">
                <button type="button" className="btn-outline flex-1" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary flex-1">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
