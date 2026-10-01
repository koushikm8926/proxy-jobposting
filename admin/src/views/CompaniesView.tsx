import React, { useState } from 'react'
import { Search, Building2 } from 'lucide-react'
import type { Company } from '../types'

interface CompaniesViewProps {
  companies: Company[]
  loading: boolean
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({ companies, loading }) => {
  const [search, setSearch] = useState('')

  const filtered = companies.filter(c =>
    c.companyName.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase()) ||
    c.recruiterName.toLowerCase().includes(search.toLowerCase()) ||
    c.recruiterEmail.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (d: Date | string) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="table-card">
      <div className="table-header">
        <div>
          <div className="table-header-title">Registered Companies</div>
          <div className="table-header-count">{companies.length} total</div>
        </div>
        <div className="search-input-wrap">
          <Search size={16} color="#a1a1aa" />
          <input
            type="text"
            placeholder="Search by company, industry…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <span>Loading companies…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <Building2 size={48} />
          <h3>{search ? 'No results found' : 'No companies yet'}</h3>
          <p>
            {search
              ? `No companies match "${search}".`
              : 'Companies registered by recruiters will appear here.'}
          </p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Industry</th>
              <th>Size</th>
              <th>Primary Recruiter</th>
              <th>Website</th>
              <th>Status</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id}>
                <td style={{ color: '#a1a1aa', fontSize: '12.5px' }}>{i + 1}</td>
                <td>
                  <div className="cell-name">{c.companyName}</div>
                </td>
                <td>{c.industry || '—'}</td>
                <td>{c.companySize || '—'}</td>
                <td>
                  <div>{c.recruiterName}</div>
                  <div className="cell-meta">{c.recruiterEmail}</div>
                </td>
                <td>
                  {c.companyWebsite ? (
                    <a
                      href={c.companyWebsite}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#3b82f6', textDecoration: 'underline', fontSize: '13px' }}
                    >
                      Visit ↗
                    </a>
                  ) : '—'}
                </td>
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
