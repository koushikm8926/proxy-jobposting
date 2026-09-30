import { useState } from 'react'
import './index.css'
import { Sidebar } from './components/Sidebar'
import { DashboardView } from './views/DashboardView'
import { CandidatesView } from './views/CandidatesView'
import { useAdminData } from './hooks/useAdminData'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LoginPage } from './pages/LoginPage'
import type { AdminView } from './types'

const PAGE_META: Record<AdminView, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of all registrations and activity' },
  candidates: { title: 'Registration Enquiries', subtitle: 'View candidate and recruiter registration requests.' },
  recruiters: { title: 'Registration Enquiries', subtitle: 'View candidate and recruiter registration requests.' },
  messages: { title: 'Contact Messages', subtitle: 'View inquiries submitted from the Contact Us form.' },
}

// ─── Inner app (only rendered when authenticated) ──────────────────────────
function AdminApp() {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard')
  const { candidates, recruiters, messages, loading, isFirebaseConfigured } = useAdminData()
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
        messageCount={messages.length}
        userEmail={user?.email}
        onSignOut={signOut}
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
          </div>
        </header>

        {/* Page content */}
        <div className="admin-content">
          {currentView === 'dashboard' && (
            <DashboardView
              candidates={candidates}
              recruiters={recruiters}
              isFirebaseConfigured={isFirebaseConfigured}
            />
          )}
          {currentView === 'candidates' && (
            <CandidatesView
              candidates={candidates}
              recruiters={recruiters}
              messages={messages}
              loading={loading}
              initialTab="candidates"
              onNavigate={setCurrentView}
            />
          )}
          {currentView === 'recruiters' && (
            <CandidatesView
              candidates={candidates}
              recruiters={recruiters}
              messages={messages}
              loading={loading}
              initialTab="recruiters"
              onNavigate={setCurrentView}
            />
          )}
          {currentView === 'messages' && (
            <CandidatesView
              candidates={candidates}
              recruiters={recruiters}
              messages={messages}
              loading={loading}
              initialTab="messages"
              onNavigate={setCurrentView}
            />
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
