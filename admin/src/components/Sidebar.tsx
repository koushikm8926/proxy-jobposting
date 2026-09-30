import React from 'react'
import {
  LayoutDashboard,
  Users,
  Briefcase,
  LogOut
} from 'lucide-react'
import type { AdminView } from '../types'

interface SidebarProps {
  currentView: AdminView
  onNavigate: (view: AdminView) => void
  candidateCount: number
  recruiterCount: number
  userEmail?: string | null
  onSignOut?: () => void
}

const navItems: { id: AdminView; label: string; icon: React.FC<{ size?: number }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'candidates', label: 'Candidates', icon: Users },
  { id: 'recruiters', label: 'Recruiters', icon: Briefcase },
]

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  candidateCount,
  recruiterCount,
  userEmail,
  onSignOut,
}) => {
  const getCounts = (id: AdminView) => {
    if (id === 'candidates') return candidateCount
    if (id === 'recruiters') return recruiterCount
    return null
  }

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">PROXY</div>
        <div className="sidebar-logo-sub">Admin Portal</div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map(({ id, label, icon: Icon }) => {
          const count = getCounts(id)
          return (
            <button
              key={id}
              className={`sidebar-nav-item${currentView === id ? ' active' : ''}`}
              onClick={() => onNavigate(id)}
            >
              <Icon size={18} />
              <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
              {count !== null && (
                <span style={{
                  fontSize: '11px',
                  background: currentView === id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.7)',
                  borderRadius: '999px',
                  padding: '1px 7px',
                  fontWeight: 700,
                }}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom Left Corner: User Info + Log Out Button */}
      <div className="sidebar-footer">
        {userEmail && (
          <div className="sidebar-user-info">
            <div className="sidebar-user-avatar">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div className="sidebar-user-text">
              <span className="sidebar-user-label">Logged in as</span>
              <span className="sidebar-user-email" title={userEmail}>
                {userEmail}
              </span>
            </div>
          </div>
        )}

        {onSignOut && (
          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={onSignOut}
            title="Log out of Admin Portal"
            id="sidebar-signout-btn"
          >
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        )}

        <div className="sidebar-version-tag">
          Proxy · Admin v1.0
        </div>
      </div>
    </aside>
  )
}
