import React, { useState } from 'react'
import { Search, BookMarked } from 'lucide-react'
import { PageHeader, Badge } from '../components/Common.jsx'
import { books as initialBooks, issuedBooks } from '../services/sampleData.js'

export default function Library() {
  const [books, setBooks] = useState(initialBooks)
  const [query, setQuery] = useState('')

  const filtered = books.filter(
    (b) => b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase())
  )

  const handleIssue = (id) => {
    setBooks((prev) => prev.map((b) => (b.id === id && b.available > 0 ? { ...b, available: b.available - 1 } : b)))
  }

  return (
    <div>
      <PageHeader title="Library" subtitle="Search the catalog, and track book issues & returns." />

      <div className="card p-4 mb-5">
        <div className="flex items-center gap-2 max-w-sm mb-4">
          <Search size={16} className="text-campus-slate" />
          <input className="input-field" placeholder="Search by title or author" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Title</th><th>Author</th><th>Copies</th><th>Available</th><th></th></tr></thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td className="flex items-center gap-2"><BookMarked size={14} className="text-campus-blue" />{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.copies}</td>
                  <td><Badge tone={b.available > 0 ? 'green' : 'red'}>{b.available} left</Badge></td>
                  <td>
                    <button
                      disabled={b.available === 0}
                      onClick={() => handleIssue(b.id)}
                      className="btn-outline text-xs py-1.5 disabled:opacity-40"
                    >
                      Issue
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-4">
        <h2 className="font-display font-semibold text-campus-navy mb-3">Currently Issued</h2>
        <table className="data-table">
          <thead><tr><th>Title</th><th>Student</th><th>Issue Date</th><th>Due Date</th><th>Status</th></tr></thead>
          <tbody>
            {issuedBooks.map((r, i) => (
              <tr key={i}>
                <td>{r.title}</td><td>{r.studentId}</td><td>{r.issueDate}</td><td>{r.dueDate}</td>
                <td><Badge tone={r.status === 'Overdue' ? 'red' : 'blue'}>{r.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
