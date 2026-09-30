import React from 'react'
import type { Candidate, Recruiter } from '../types'
import { Users, Briefcase } from 'lucide-react'

interface DashboardViewProps {
  candidates: Candidate[]
  recruiters: Recruiter[]
  isFirebaseConfigured: boolean
}

const StatCard: React.FC<{
  label: string
  value: number
  icon: React.ReactNode
  iconBg: string
}> = ({ label, value, icon, iconBg }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ backgroundColor: iconBg }}>
      {icon}
    </div>
    <div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value.toLocaleString()}</div>
    </div>
  </div>
)

export const DashboardView: React.FC<DashboardViewProps> = ({
  candidates,
  recruiters,
  isFirebaseConfigured,
}) => {
  // Recent 5 of each
  const recentCandidates = [...candidates]
    .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
    .slice(0, 5)

  const recentRecruiters = [...recruiters]
    .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
    .slice(0, 5)

  const formatDate = (d: Date | string) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div>
      {!isFirebaseConfigured && (
        <div className="firebase-warning">
          <span className="firebase-warning-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </span>
          <div>
            <strong>Firebase not configured yet</strong>
            <p>
              Open <code>admin/src/firebase.ts</code> and replace the placeholder values with your Firebase project credentials.
              Data below is sample mock data for UI preview.
            </p>
          </div>
        </div>
      )}

      {/* Stat Cards - Only Total Candidates and Total Recruiters */}
      <div className="stat-grid">
        <StatCard
          label="Total Candidates"
          value={candidates.length}
          icon={<Users size={22} color="#3b82f6" />}
          iconBg="#dbeafe"
        />
        <StatCard
          label="Total Recruiters"
          value={recruiters.length}
          icon={<Briefcase size={22} color="#8b5cf6" />}
          iconBg="#ede9fe"
        />
      </div>

      {/* Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Recent Candidates */}
        <div className="table-card">
          <div className="table-header">
            <div>
              <div className="table-header-title">Recent Candidates</div>
              <div className="table-header-count">{candidates.length} total registered</div>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentCandidates.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '40px', color: '#a1a1aa' }}>
                    No candidates yet
                  </td>
                </tr>
              ) : (
                recentCandidates.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="cell-name">{c.fullName}</div>
                      <div className="cell-meta">{c.email}</div>
                    </td>
                    <td>{c.preferredRole || '—'}</td>
                    <td style={{ color: '#71717a', fontSize: '12.5px' }}>
                      {formatDate(c.registeredAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Recruiters */}
        <div className="table-card">
          <div className="table-header">
            <div>
              <div className="table-header-title">Recent Recruiters</div>
              <div className="table-header-count">{recruiters.length} total registered</div>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentRecruiters.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '40px', color: '#a1a1aa' }}>
                    No recruiters yet
                  </td>
                </tr>
              ) : (
                recentRecruiters.map(r => (
                  <tr key={r.id}>
                    <td>
                      <div className="cell-name">{r.fullName}</div>
                      <div className="cell-meta">{r.email}</div>
                    </td>
                    <td>{r.companyName}</td>
                    <td style={{ color: '#71717a', fontSize: '12.5px' }}>
                      {formatDate(r.registeredAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
