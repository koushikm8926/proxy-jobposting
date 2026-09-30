import React, { useState } from 'react'
import { Search, Briefcase } from 'lucide-react'
import type { Recruiter } from '../types'

interface RecruitersViewProps {
  recruiters: Recruiter[]
  loading: boolean
}

export const RecruitersView: React.FC<RecruitersViewProps> = ({ recruiters, loading }) => {
  const [search, setSearch] = useState('')

  const filtered = recruiters.filter(r =>
    r.fullName.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.companyName.toLowerCase().includes(search.toLowerCase()) ||
    r.industry.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (d: Date | string) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="table-card">
      <div className="table-header">
        <div>
          <div className="table-header-title">Registered Recruiters</div>
          <div className="table-header-count">{recruiters.length} total</div>
        </div>
        <div className="search-input-wrap">
          <Search size={16} color="#a1a1aa" />
          <input
            type="text"
            placeholder="Search by name, company, industry…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <span>Loading recruiters…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <Briefcase size={48} />
          <h3>{search ? 'No results found' : 'No recruiters yet'}</h3>
          <p>
            {search
              ? `No recruiters match "${search}".`
              : 'Registered recruiters will appear here once they submit the registration form.'}
          </p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Recruiter</th>
              <th>Contact</th>
              <th>Company</th>
              <th>Industry</th>
              <th>Size</th>
              <th>Role</th>
              <th>Website</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.id}>
                <td style={{ color: '#a1a1aa', fontSize: '12.5px' }}>{i + 1}</td>
                <td>
                  <div className="cell-name">{r.fullName}</div>
                </td>
                <td>
                  <div>{r.email}</div>
                  <div className="cell-meta">{r.mobileNumber}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{r.companyName}</div>
                </td>
                <td>{r.industry || '—'}</td>
                <td>{r.companySize || '—'}</td>
                <td>{r.jobRole || '—'}</td>
                <td>
                  {r.companyWebsite ? (
                    <a
                      href={r.companyWebsite}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#3b82f6', textDecoration: 'underline', fontSize: '13px' }}
                    >
                      Website ↗
                    </a>
                  ) : '—'}
                </td>
                <td style={{ color: '#71717a', fontSize: '12.5px', whiteSpace: 'nowrap' }}>
                  {formatDate(r.registeredAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
