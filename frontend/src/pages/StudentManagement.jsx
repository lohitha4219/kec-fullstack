import React, { useState } from 'react'
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react'
import { PageHeader, Badge } from '../components/Common.jsx'
import { students as initialStudents } from '../services/sampleData.js'

const emptyForm = { id: '', name: '', dept: 'CSE', year: '1st', email: '', phone: '', status: 'Active' }

export default function StudentManagement() {
  const [students, setStudents] = useState(initialStudents)
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.id.toLowerCase().includes(query.toLowerCase())
  )

  const openAdd = () => {
    setForm({ ...emptyForm, id: `S${100 + students.length + 1}` })
    setEditingId(null)
    setModalOpen(true)
  }

  const openEdit = (s) => {
    setForm(s)
    setEditingId(s.id)
    setModalOpen(true)
  }

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (editingId) {
      setStudents((prev) => prev.map((s) => (s.id === editingId ? form : s)))
    } else {
      setStudents((prev) => [...prev, form])
    }
    setModalOpen(false)
  }

  return (
    <div>
      <PageHeader
        title="Student Management"
        subtitle="Add, update and track student records across departments."
        action={
          <button className="btn-primary flex items-center gap-2" onClick={openAdd}>
            <Plus size={16} /> Add Student
          </button>
        }
      />

      <div className="card p-4">
        <div className="flex items-center gap-2 mb-4 max-w-sm">
          <Search size={16} className="text-campus-slate" />
          <input
            className="input-field"
            placeholder="Search by name or ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Dept</th>
                <th>Year</th>
                <th>Email</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.dept}</td>
                  <td>{s.year}</td>
                  <td>{s.email}</td>
                  <td><Badge tone={s.status === 'Active' ? 'green' : 'gray'}>{s.status}</Badge></td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(s)} className="text-campus-blue" aria-label="Edit">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="text-campus-red" aria-label="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-campus-slate py-6">No students found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-campus-navy">
                {editingId ? 'Edit Student' : 'Add Student'}
              </h3>
              <button onClick={() => setModalOpen(false)}><X size={18} className="text-campus-slate" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <input required className="input-field" placeholder="Full name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <select className="input-field" value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })}>
                  {['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE'].map((d) => <option key={d}>{d}</option>)}
                </select>
                <select className="input-field" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}>
                  {['1st', '2nd', '3rd', '4th'].map((y) => <option key={y}>{y}</option>)}
                </select>
              </div>
              <input required type="email" className="input-field" placeholder="Email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="input-field" placeholder="Phone" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <select className="input-field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                {['Active', 'Inactive'].map((s) => <option key={s}>{s}</option>)}
              </select>
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
