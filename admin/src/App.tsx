import { useState } from 'react'
import './index.css'
import { Sidebar } from './components/Sidebar'
import { DashboardView } from './views/DashboardView'
import { CandidatesView } from './views/CandidatesView'
import { RecruitersView } from './views/RecruitersView'
import { CompaniesView } from './views/CompaniesView'
import { useAdminData } from './hooks/useAdminData'
import type { AdminView } from './types'

const PAGE_META: Record<AdminView, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of all registrations and activity' },
  candidates: { title: 'Candidates', subtitle: 'All users who registered as job seekers' },
  recruiters: { title: 'Recruiters', subtitle: 'All users who registered to hire talent' },
  companies: { title: 'Companies', subtitle: 'All companies registered through recruiters' },
}

function App() {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard')
  const { candidates, recruiters, companies, loading, isFirebaseConfigured } = useAdminData()

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

export default App
