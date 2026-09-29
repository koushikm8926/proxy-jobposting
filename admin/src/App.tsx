import { useState } from 'react'
import './index.css'
import { Sidebar } from './components/Sidebar'
import { DashboardView } from './views/DashboardView'
import { CandidatesView } from './views/CandidatesView'
import { RecruitersView } from './views/RecruitersView'
import { CompaniesView } from './views/CompaniesView'
import { useAdminData } from './hooks/useAdminData'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LoginPage } from './pages/LoginPage'
import type { AdminView } from './types'
import { LogOut } from 'lucide-react'

const PAGE_META: Record<AdminView, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of all registrations and activity' },
  candidates: { title: 'Candidates', subtitle: 'All users who registered as job seekers' },
  recruiters: { title: 'Recruiters', subtitle: 'All users who registered to hire talent' },
  companies: { title: 'Companies', subtitle: 'All companies registered through recruiters' },
}

// ─── Inner app (only rendered when authenticated) ──────────────────────────
function AdminApp() {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard')
  const { candidates, recruiters, companies, loading, isFirebaseConfigured } = useAdminData()
  const { user, signOut } = useAuth()

  const meta = PAGE_META[currentView]

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        candidateCount={candidates.length}
        recruiterCount={recruiters.length}
        companyCount={companies.length}
      />

      {/* Main content area */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <div>
            <div className="topbar-title">{meta.title}</div>
            <div className="topbar-subtitle">{meta.subtitle}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="topbar-badge">
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: isFirebaseConfigured ? '#22c55e' : '#f59e0b', display: 'inline-block' }} />
              {isFirebaseConfigured ? 'Live data' : 'Mock data'}
            </span>
            {/* Show user email + sign-out button only when Firebase auth is configured */}
            {isFirebaseConfigured && user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: 13, color: '#52525b', fontWeight: 500 }}>{user.email}</span>
                <button
                  id="admin-signout-btn"
                  onClick={signOut}
                  title="Sign out"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#52525b',
                    background: '#f3f4f6',
                    border: '1px solid #e4e4e7',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#e4e4e7')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#f3f4f6')}
                >
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <div className="admin-content">
          {currentView === 'dashboard' && (
            <DashboardView
              candidates={candidates}
              recruiters={recruiters}
              companies={companies}
              isFirebaseConfigured={isFirebaseConfigured}
            />
          )}
          {currentView === 'candidates' && (
            <CandidatesView candidates={candidates} loading={loading} />
          )}
          {currentView === 'recruiters' && (
            <RecruitersView recruiters={recruiters} loading={loading} />
          )}
          {currentView === 'companies' && (
            <CompaniesView companies={companies} loading={loading} />
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Auth gate ─────────────────────────────────────────────────────────────
// When Firebase is not yet configured we skip auth entirely so the UI preview
// (with mock data) still works without credentials.
const IS_FIREBASE_CONFIGURED =
  !import.meta.env.VITE_FIREBASE_API_KEY?.includes('YOUR') &&
  !!import.meta.env.VITE_FIREBASE_PROJECT_ID

function AuthGate() {
  const { user, authLoading } = useAuth()

  // While Firebase checks the persisted session, show a full-screen spinner.
  if (IS_FIREBASE_CONFIGURED && authLoading) {
    return (
      <div className="auth-loading-screen">
        <div className="spinner" />
        <p>Checking session…</p>
      </div>
    )
  }

  // If Firebase is configured but no user is logged in → show login page.
  if (IS_FIREBASE_CONFIGURED && !user) {
    return <LoginPage />
  }

  return <AdminApp />
}

// ─── Root ──────────────────────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  )
}

export default App
