import React, { useState } from 'react'
import { Search, Users } from 'lucide-react'
import type { Candidate } from '../types'

interface CandidatesViewProps {
  candidates: Candidate[]
  loading: boolean
}

export const CandidatesView: React.FC<CandidatesViewProps> = ({ candidates, loading }) => {
  const [search, setSearch] = useState('')

  const filtered = candidates.filter(c =>
    c.fullName.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.preferredRole?.toLowerCase().includes(search.toLowerCase()) ||
    c.currentLocation?.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (d: Date | string) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="table-card">
      <div className="table-header">
        <div>
          <div className="table-header-title">Registered Candidates</div>
          <div className="table-header-count">{candidates.length} total</div>
        </div>
        <div className="search-input-wrap">
          <Search size={16} color="#a1a1aa" />
          <input
            type="text"
            placeholder="Search by name, email, role…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <span>Loading candidates…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <Users size={48} />
          <h3>{search ? 'No results found' : 'No candidates yet'}</h3>
          <p>
            {search
              ? `No candidates match "${search}". Try a different search term.`
              : 'Registered candidates will appear here once they submit the form.'}
          </p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Education</th>
              <th>Experience</th>
              <th>Preferred Role</th>
              <th>Status</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id}>
                <td style={{ color: '#a1a1aa', fontSize: '12.5px' }}>{i + 1}</td>
                <td>
                  <div className="cell-name">{c.fullName}</div>
                </td>
                <td>
                  <div>{c.email}</div>
                  <div className="cell-meta">{c.mobileNumber}</div>
                </td>
                <td>{c.currentLocation || '—'}</td>
                <td>{c.highestEducation || '—'}</td>
                <td>{c.workExperience || '—'}</td>
                <td>{c.preferredRole || '—'}</td>
                <td>
                  <span className={`status-badge ${c.status}`}>{c.status}</span>
                </td>
                <td style={{ color: '#71717a', fontSize: '12.5px', whiteSpace: 'nowrap' }}>
                  {formatDate(c.registeredAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
