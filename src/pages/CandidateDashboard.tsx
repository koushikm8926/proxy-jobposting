import React, { useState, useMemo } from 'react'
import {
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  Calendar,
  User,
  BarChart2,
  Bell,
  Settings,
  Crown,
  ArrowRight,
  MapPin,
  ChevronDown,
  MoreHorizontal,
  ChevronRight,
  Check,
  CheckCircle2,
  XCircle,
  Briefcase,
  MessageSquare,
  Star,
  Lightbulb,
  Mail,
  Zap,
  Sliders,
  MailCheck,
  HelpCircle,
  Megaphone,
  X,
  LogOut,
  Menu
} from 'lucide-react'
import { CompanyLogo } from '../components/common/CompanyLogo'
import { useAuth } from '../context/AuthContext'
import { CandidateOverviewTab } from '../components/dashboard/CandidateOverviewTab'
import { CandidateJobsTab } from '../components/dashboard/CandidateJobsTab'
import { CandidateSavedJobsTab } from '../components/dashboard/CandidateSavedJobsTab'
import { CandidateInterviewsTab } from '../components/dashboard/CandidateInterviewsTab'
import { CandidateProfileTab } from '../components/dashboard/CandidateProfileTab'
import { CandidateSkillsTab } from '../components/dashboard/CandidateSkillsTab'
import { CandidateSettingsTab } from '../components/dashboard/CandidateSettingsTab'

interface CandidateDashboardProps {
  onBrowseJobs?: () => void
}

type DashboardSidebarTab =
  | 'dashboard'
  | 'jobs'
  | 'applications'
  | 'saved'
  | 'interviews'
  | 'profile'
  | 'skills'
  | 'notifications'
  | 'settings'

type ApplicationFilter = 'ALL' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW' | 'OFFERED' | 'REJECTED'
type NotificationFilter = 'ALL' | 'UPDATES' | 'INTERVIEWS' | 'ALERTS' | 'MESSAGES' | 'PROFILE'

export const CandidateDashboard: React.FC<CandidateDashboardProps> = () => {
  const { logout } = useAuth()

  // Sidebar navigation state: defaults to 'dashboard' (or 'applications')
  const [activeSidebarTab, setActiveSidebarTab] = useState<DashboardSidebarTab>('dashboard')

  // Mobile drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  // Top header search query
  const [topSearchQuery, setTopSearchQuery] = useState('')

  // User profile dropdown toggle
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  // Saved jobs IDs shared across tabs
  const [savedJobIds, setSavedJobIds] = useState<string[]>([
    'job-swiggy-fe',
    'job-google-swe',
    'job-adobe-pe',
    'job-amazon-hr'
  ])

  const handleSaveJob = (jobId: string) => {
    setSavedJobIds(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    )
  }

  const handleRemoveSavedJob = (jobId: string) => {
    setSavedJobIds(prev => prev.filter(id => id !== jobId))
  }

  // ================= APPLICATIONS STATE =================
  const [appFilter, setAppFilter] = useState<ApplicationFilter>('ALL')
  const [appSearchQuery, setAppSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [sortBy, setSortBy] = useState('Latest Applied')

  // Modal detail states
  const [activeModalApp, setActiveModalApp] = useState<any | null>(null)
  const [activeModalType, setActiveModalType] = useState<'details' | 'feedback' | 'offer' | null>(null)

  // 5 exact application items from Job Applications Dashboard.png
  const applications = [
    {
      id: 'app-adobe',
      role: 'Product Engineer',
      company: 'Adobe',
      logoName: 'adobe',
      location: 'Bangalore, Karnataka',
      type: 'Full-time',
      experience: '2 - 5 Years',
      appliedDate: '08 Oct 2026',
      status: 'UNDER_REVIEW' as const,
      statusLabel: 'Under Review',
      statusTheme: { bg: '#e0f2fe', text: '#0284c7' },
      currentStage: 2, // 1: Applied, 2: Screening, 3: Interview, 4: Offer
      details: {
        salary: '₹24,00,000 - ₹32,00,000 / year',
        department: 'Creative Cloud Core Engineering',
        jobId: 'ADB-99412',
        notes: 'Resume successfully passed initial automated screening. Under technical hiring manager review.'
      }
    },
    {
      id: 'app-google',
      role: 'Software Engineer',
      company: 'Google',
      logoName: 'google',
      location: 'Hyderabad, Telangana',
      type: 'Full-time',
      experience: '1 - 4 Years',
      appliedDate: '05 Oct 2026',
      status: 'SHORTLISTED' as const,
      statusLabel: 'Shortlisted',
      statusTheme: { bg: '#dcfce7', text: '#16a34a' },
      details: {
        salary: '₹28,00,000 - ₹38,00,000 / year',
        department: 'Search & Assistant Platform',
        jobId: 'GOOG-88410',
        notes: 'Profile shortlisted for technical coding interview round. Recruiter will coordinate slots.'
      }
    },
    {
      id: 'app-swiggy',
      role: 'Frontend Developer',
      company: 'Swiggy',
      logoName: 'swiggy',
      location: 'Bangalore, Karnataka',
      type: 'Full-time',
      experience: '2 - 6 Years',
      appliedDate: '28 Sep 2026',
      status: 'INTERVIEW' as const,
      statusLabel: 'Interview Scheduled',
      statusTheme: { bg: '#f3e8ff', text: '#7e22ce' },
      interviewInfo: 'Interview on 12 Oct 2026 • 10:00 AM',
      details: {
        salary: '₹20,00,000 - ₹26,00,000 / year',
        department: 'Consumer Apps Experience Team',
        jobId: 'SWIG-54219',
        notes: 'Google Meet link sent to your registered email. Topic: Advanced React & Web Performance.'
      }
    },
    {
      id: 'app-microsoft',
      role: 'Product Designer',
      company: 'Microsoft',
      logoName: 'microsoft',
      location: 'Bangalore, Karnataka',
      type: 'Full-time',
      experience: '3 - 6 Years',
      appliedDate: '24 Sep 2026',
      status: 'REJECTED' as const,
      statusLabel: 'Rejected',
      statusTheme: { bg: '#fee2e2', text: '#dc2626' },
      feedbackNotice: 'Not a match at this time. Keep exploring!',
      details: {
        feedback: 'We were impressed with your portfolio, but opted for candidates with specialized Fluent 2 enterprise design systems experience. We encourage you to apply for future design openings.'
      }
    },
    {
      id: 'app-zoho',
      role: 'Backend Developer',
      company: 'Zoho',
      logoName: 'zoho',
      location: 'Chennai, Tamil Nadu',
      type: 'Full-time',
      experience: '1 - 3 Years',
      appliedDate: '18 Sep 2026',
      status: 'OFFERED' as const,
      statusLabel: 'Offered',
      statusTheme: { bg: '#d1fae5', text: '#059669' },
      offerNotice: 'Congratulations! Offer letter will be shared soon.',
      details: {
        salary: '₹14,50,000 / year CTC + Annual Bonus',
        joiningDate: '01 Nov 2026',
        location: 'Zoho Estancia Campus, Chennai',
        notes: 'Official digital offer document is prepared. Click View Offer to preview details.'
      }
    }
  ]

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // Status filter
      if (appFilter !== 'ALL' && app.status !== appFilter) {
        return false
      }
      // Location filter
      if (selectedLocation !== 'All Locations' && !app.location.includes(selectedLocation)) {
        return false
      }
      // Text search
      if (appSearchQuery.trim()) {
        const q = appSearchQuery.toLowerCase()
        const matchesRole = app.role.toLowerCase().includes(q)
        const matchesCompany = app.company.toLowerCase().includes(q)
        const matchesLoc = app.location.toLowerCase().includes(q)
        if (!matchesRole && !matchesCompany && !matchesLoc) return false
      }
      return true
    })
  }, [applications, appFilter, selectedLocation, appSearchQuery])

  // ================= NOTIFICATIONS STATE =================
  const [notifFilter, setNotifFilter] = useState<NotificationFilter>('ALL')
  const [unreadCount, setUnreadCount] = useState(3)

  // 7 exact notifications from Modern Job Portal Notifications Dashboard.png
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 'notif-1',
      title: 'Application Shortlisted',
      desc: 'Your application for Software Engineer has been shortlisted.',
      company: 'Google',
      role: 'Software Engineer',
      badge: 'Shortlisted',
      badgeBg: '#dcfce7',
      badgeText: '#16a34a',
      time: '10 Oct 2026, 11:30 AM',
      isUnread: true,
      category: 'UPDATES' as const,
      iconType: 'check'
    },
    {
      id: 'notif-2',
      title: 'Interview Scheduled',
      desc: 'You have been scheduled for an interview for Frontend Developer.',
      company: 'Amazon',
      role: 'Frontend Developer',
      badge: 'Interview',
      badgeBg: '#f3e8ff',
      badgeText: '#7e22ce',
      time: '09 Oct 2026, 05:45 PM',
      isUnread: true,
      category: 'INTERVIEWS' as const,
      iconType: 'calendar'
    },
    {
      id: 'notif-3',
      title: 'Application Not Selected',
      desc: 'Thank you for applying. We have decided to move forward with other candidates.',
      company: 'Microsoft',
      role: 'Product Designer',
      badge: 'Not Selected',
      badgeBg: '#fee2e2',
      badgeText: '#dc2626',
      time: '06 Oct 2026, 02:20 PM',
      isUnread: true,
      category: 'UPDATES' as const,
      iconType: 'cross'
    },
    {
      id: 'notif-4',
      title: 'New Job Alert',
      desc: 'A new job matching your preferences has been posted.',
      company: 'Swiggy',
      role: 'Backend Developer',
      badge: 'New',
      badgeBg: '#fef3c7',
      badgeText: '#b45309',
      time: '05 Oct 2026, 10:15 AM',
      isUnread: false,
      category: 'ALERTS' as const,
      iconType: 'briefcase'
    },
    {
      id: 'notif-5',
      title: 'Message from Recruiter',
      desc: 'You have received a message from the hiring team.',
      company: 'Zoho',
      role: 'Software Engineer',
      badge: 'Message',
      badgeBg: '#e0f2fe',
      badgeText: '#0284c7',
      time: '04 Oct 2026, 07:40 PM',
      isUnread: false,
      category: 'MESSAGES' as const,
      iconType: 'message'
    },
    {
      id: 'notif-6',
      title: 'Application Viewed',
      desc: 'Your application has been viewed by the recruiter.',
      company: 'Flipkart',
      role: 'Full Stack Developer',
      badge: 'Viewed',
      badgeBg: '#e0f2fe',
      badgeText: '#0284c7',
      time: '03 Oct 2026, 12:10 PM',
      isUnread: false,
      category: 'UPDATES' as const,
      iconType: 'star'
    },
    {
      id: 'notif-7',
      title: 'Profile Suggestion',
      desc: 'Complete your skills section to get 3x more relevant job recommendations.',
      company: '',
      role: '',
      badge: '',
      badgeBg: '',
      badgeText: '',
      time: '02 Oct 2026, 09:00 AM',
      isUnread: false,
      category: 'PROFILE' as const,
      iconType: 'bulb'
    }
  ])

  // Notification settings switches
  const [notifSettings, setNotifSettings] = useState({
    appUpdates: true,
    interviews: true,
    jobAlerts: true,
    messages: true,
    profileUpdates: true,
    marketingUpdates: false
  })

  const handleMarkAllNotificationsAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, isUnread: false })))
    setUnreadCount(0)
  }

  const filteredNotifications = useMemo(() => {
    if (notifFilter === 'ALL') return notificationsList
    return notificationsList.filter(n => n.category === notifFilter)
  }, [notificationsList, notifFilter])

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
      className="candidate-dashboard-layout"
    >
      {/* ================= 1. DARK LEFT SIDEBAR ================= */}
      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          className="dashboard-mobile-overlay"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      {/* ================= 1. DARK LEFT SIDEBAR ================= */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#090d16',
          color: '#ffffff',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 16px',
          borderRight: '1px solid #1e2433',
          minHeight: '100vh'
        }}
        className={`dashboard-dark-sidebar ${mobileDrawerOpen ? 'mobile-open' : ''}`}
      >
        <div>
          {/* Logo and Mobile Close */}
          <div
            style={{
              padding: '0 8px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                window.location.hash = '#home'
              }}
            >
              <img
                src="/logo-white.png"
                alt="proXHire"
                style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
              />
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              className="mobile-sidebar-close-btn"
              onClick={() => setMobileDrawerOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {/* Dashboard */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarTab('dashboard')
                setMobileDrawerOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'dashboard' ? '#ffffff' : 'transparent',
                color: activeSidebarTab === 'dashboard' ? '#090d16' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'dashboard' ? 700 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            {/* Find Jobs */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarTab('jobs')
                setMobileDrawerOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'jobs' ? '#ffffff' : 'transparent',
                color: activeSidebarTab === 'jobs' ? '#090d16' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'jobs' ? 700 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <Search size={18} />
              <span>Find Jobs</span>
            </button>

            {/* My Applications (Active in design) */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarTab('applications')
                setMobileDrawerOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'applications' ? '#ffffff' : 'transparent',
                color: activeSidebarTab === 'applications' ? '#090d16' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'applications' ? 700 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <FileText size={18} />
              <span>My Applications</span>
            </button>

            {/* Saved Jobs */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarTab('saved')
                setMobileDrawerOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'saved' ? '#ffffff' : 'transparent',
                color: activeSidebarTab === 'saved' ? '#090d16' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'saved' ? 700 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <Bookmark size={18} />
              <span>Saved Jobs</span>
            </button>

            {/* Interview Calls */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarTab('interviews')
                setMobileDrawerOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'interviews' ? '#ffffff' : 'transparent',
                color: activeSidebarTab === 'interviews' ? '#090d16' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'interviews' ? 700 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <Calendar size={18} />
              <span>Interview Calls</span>
            </button>

            {/* Profile */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarTab('profile')
                setMobileDrawerOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'profile' ? '#ffffff' : 'transparent',
                color: activeSidebarTab === 'profile' ? '#090d16' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'profile' ? 700 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <User size={18} />
              <span>Profile</span>
            </button>

            {/* Skill Assessment */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarTab('skills')
                setMobileDrawerOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'skills' ? '#ffffff' : 'transparent',
                color: activeSidebarTab === 'skills' ? '#090d16' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'skills' ? 700 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <BarChart2 size={18} />
              <span>Skill Assessment</span>
            </button>

            {/* Notifications (with red badge 3) */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarTab('notifications')
                setMobileDrawerOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'notifications' ? '#ffffff' : 'transparent',
                color: activeSidebarTab === 'notifications' ? '#090d16' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'notifications' ? 700 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Bell size={18} />
                <span>Notifications</span>
              </div>
              {unreadCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={() => {
                setActiveSidebarTab('settings')
                setMobileDrawerOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: activeSidebarTab === 'settings' ? '#ffffff' : 'transparent',
                color: activeSidebarTab === 'settings' ? '#090d16' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSidebarTab === 'settings' ? 700 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom "Upgrade Your Profile" Card */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '18px 16px',
            marginTop: '24px'
          }}
        >
          <div style={{ color: '#f59e0b', marginBottom: '8px' }}>
            <Crown size={22} fill="#f59e0b" />
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
            Upgrade Your Profile
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.4, marginBottom: '14px' }}>
            Increase your chances of getting noticed by top companies.
          </div>
          <button
            type="button"
            onClick={() => setActiveSidebarTab('profile')}
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              color: '#090d16',
              padding: '9px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            Complete Profile
            <ArrowRight size={13} />
          </button>
        </div>
      </aside>

      {/* ================= 2. MAIN CONTENT AREA ================= */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header Bar */}
        <header
          style={{
            height: '70px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 40
          }}
        >
          {/* Mobile hamburger menu toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => setMobileDrawerOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#0f172a',
                cursor: 'pointer',
                padding: '6px'
              }}
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>

            {/* Top Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }} className="header-search-wrapper">
              <Search
                size={17}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }}
              />
              <input
                type="text"
                placeholder="Search for jobs, companies or skills..."
                value={topSearchQuery}
                onChange={(e) => setTopSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 40px',
                  borderRadius: '9999px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  fontSize: '13px',
                  color: '#0f172a',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Right User Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Bell with red count */}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('notifications')}
              style={{
                position: 'relative',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Notifications"
            >
              <Bell size={21} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #ffffff'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1.5px solid #e2e8f0',
                    flexShrink: 0
                  }}
                >
                  <img
                    src="/images/sree_nandini_avatar_hd.png"
                    alt="Sree Nandini"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    Sree Nandini
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Candidate
                  </div>
                </div>
                <ChevronDown size={15} color="#64748b" />
              </div>

              {profileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '48px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    width: '180px',
                    padding: '6px',
                    zIndex: 50
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarTab('profile')
                      setProfileDropdownOpen(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#0f172a',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <User size={14} /> View Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSidebarTab('settings')
                      setProfileDropdownOpen(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#0f172a',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Settings size={14} /> Account Settings
                  </button>
                  <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '4px 0' }} />
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false)
                      if (logout) logout()
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#dc2626',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Horizontal Tabs Navigation */}
        <div className="mobile-tab-scroll-bar">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'jobs', label: 'Jobs', icon: Search },
            { id: 'applications', label: 'Applications (18)', icon: FileText },
            { id: 'saved', label: `Saved (${savedJobIds.length})`, icon: Bookmark },
            { id: 'interviews', label: 'Interviews (3)', icon: Calendar },
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'skills', label: 'Skills', icon: BarChart2 },
            { id: 'notifications', label: `Alerts (${unreadCount})`, icon: Bell },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => {
            const Icon = item.icon
            const isActive = activeSidebarTab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSidebarTab(item.id as DashboardSidebarTab)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? '#0f172a' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#475569',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Main Body Content based on Active Tab */}
        <main style={{ padding: '32px', flex: 1 }}>
          {/* ================= VIEW 1: MY APPLICATIONS ================= */}
          {activeSidebarTab === 'applications' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 340px',
                gap: '28px',
                alignItems: 'start'
              }}
              className="dashboard-two-column-grid"
            >
              {/* Left Column: Applications List */}
              <div>
                {/* Header Title */}
                <div style={{ marginBottom: '24px' }}>
                  <h1
                    style={{
                      fontSize: '28px',
                      fontWeight: 800,
                      color: '#0f172a',
                      letterSpacing: '-0.02em',
                      margin: '0 0 6px 0'
                    }}
                  >
                    My Applications
                  </h1>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                    Track the status of your job applications and stay updated.
                  </p>
                </div>

                {/* Filter Pills */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginBottom: '22px'
                  }}
                >
                  {[
                    { label: 'All (18)', value: 'ALL' },
                    { label: 'Under Review (5)', value: 'UNDER_REVIEW' },
                    { label: 'Shortlisted (4)', value: 'SHORTLISTED' },
                    { label: 'Interview Scheduled (3)', value: 'INTERVIEW' },
                    { label: 'Offered (1)', value: 'OFFERED' },
                    { label: 'Rejected (5)', value: 'REJECTED' }
                  ].map((filterItem) => {
                    const isActive = appFilter === filterItem.value
                    return (
                      <button
                        key={filterItem.value}
                        type="button"
                        onClick={() => setAppFilter(filterItem.value as ApplicationFilter)}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '9999px',
                          fontSize: '13px',
                          fontWeight: isActive ? 700 : 500,
                          backgroundColor: isActive ? '#0f172a' : '#ffffff',
                          color: isActive ? '#ffffff' : '#475569',
                          border: isActive ? '1px solid #0f172a' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {filterItem.label}
                      </button>
                    )
                  })}
                </div>

                {/* Search & Location Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px',
                    flexWrap: 'wrap'
                  }}
                >
                  {/* Search input */}
                  <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                    <Search
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94a3b8'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Search by job title, company or location..."
                      value={appSearchQuery}
                      onChange={(e) => setAppSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 38px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff',
                        fontSize: '13px',
                        color: '#0f172a',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Location Filter Dropdown */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '9px 14px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 500
                      }}
                    >
                      <MapPin size={15} color="#64748b" />
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          fontSize: '13px',
                          color: '#0f172a',
                          outline: 'none',
                          cursor: 'pointer',
                          fontWeight: 500
                        }}
                      >
                        <option value="All Locations">All Locations</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Chennai">Chennai</option>
                      </select>
                    </div>
                  </div>

                  {/* Sort By Dropdown */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: '#64748b'
                    }}
                  >
                    <span>Sort by</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{
                        padding: '9px 14px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#ffffff',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 600,
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Latest Applied">Latest Applied</option>
                      <option value="Company">Company</option>
                      <option value="Status">Status</option>
                    </select>
                  </div>
                </div>

                {/* Applications List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        padding: '24px',
                        transition: 'box-shadow 0.15s ease'
                      }}
                    >
                      {/* Top Header of Card */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '16px'
                        }}
                      >
                        {/* Company Logo + Titles */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <CompanyLogo name={app.logoName} size={46} />
                          <div>
                            <h3
                              style={{
                                fontSize: '17px',
                                fontWeight: 800,
                                color: '#0f172a',
                                margin: '0 0 2px 0'
                              }}
                            >
                              {app.role}
                            </h3>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                              {app.company}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '12px',
                                color: '#64748b',
                                marginTop: '6px',
                                flexWrap: 'wrap'
                              }}
                            >
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={13} /> {app.location}
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Calendar size={13} /> {app.type}
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Briefcase size={13} /> {app.experience}
                              </span>
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                              Applied on {app.appliedDate}
                            </div>
                          </div>
                        </div>

                        {/* Status Badge + More Options */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <span
                            style={{
                              backgroundColor: app.statusTheme.bg,
                              color: app.statusTheme.text,
                              fontSize: '12px',
                              fontWeight: 700,
                              padding: '5px 14px',
                              borderRadius: '9999px'
                            }}
                          >
                            {app.statusLabel}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveModalApp(app)
                              setActiveModalType('details')
                            }}
                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                          >
                            <MoreHorizontal size={18} />
                          </button>
                          <ChevronRight size={18} color="#94a3b8" />
                        </div>
                      </div>

                      {/* Card Specific Status Bodies */}
                      {/* 1. Adobe: Under Review Stepper */}
                      {app.id === 'app-adobe' && (
                        <div
                          style={{
                            marginTop: '20px',
                            paddingTop: '16px',
                            borderTop: '1px solid #f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            maxWidth: '420px',
                            margin: '20px auto 0'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            {/* Applied */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div
                                style={{
                                  width: '22px',
                                  height: '22px',
                                  borderRadius: '50%',
                                  backgroundColor: '#2563eb',
                                  color: '#fff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <Check size={13} strokeWidth={3} />
                              </div>
                              <span style={{ fontSize: '11px', color: '#0f172a', fontWeight: 600, marginTop: '4px' }}>
                                Applied
                              </span>
                            </div>

                            <div style={{ flex: 1, height: '2px', backgroundColor: '#2563eb', margin: '0 4px 16px' }} />

                            {/* Screening (Active) */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div
                                style={{
                                  width: '22px',
                                  height: '22px',
                                  borderRadius: '50%',
                                  backgroundColor: '#2563eb',
                                  color: '#fff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
                              </div>
                              <span style={{ fontSize: '11px', color: '#0f172a', fontWeight: 700, marginTop: '4px' }}>
                                Screening
                              </span>
                            </div>

                            <div style={{ flex: 1, height: '2px', backgroundColor: '#cbd5e1', margin: '0 4px 16px' }} />

                            {/* Interview */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div
                                style={{
                                  width: '22px',
                                  height: '22px',
                                  borderRadius: '50%',
                                  backgroundColor: '#cbd5e1'
                                }}
                              />
                              <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                                Interview
                              </span>
                            </div>

                            <div style={{ flex: 1, height: '2px', backgroundColor: '#cbd5e1', margin: '0 4px 16px' }} />

                            {/* Offer */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div
                                style={{
                                  width: '22px',
                                  height: '22px',
                                  borderRadius: '50%',
                                  backgroundColor: '#cbd5e1'
                                }}
                              />
                              <span style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                                Offer
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. Google: Shortlisted -> View Details button */}
                      {app.id === 'app-google' && (
                        <div
                          style={{
                            marginTop: '16px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModalApp(app)
                              setActiveModalType('details')
                            }}
                            style={{
                              padding: '8px 20px',
                              borderRadius: '10px',
                              border: '1.5px solid #0f172a',
                              backgroundColor: '#ffffff',
                              color: '#0f172a',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      )}

                      {/* 3. Swiggy: Interview Scheduled box + View Details */}
                      {app.id === 'app-swiggy' && (
                        <div
                          style={{
                            marginTop: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '12px'
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: '#eff6ff',
                              border: '1px solid #dbeafe',
                              borderRadius: '8px',
                              padding: '8px 14px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '13px',
                              fontWeight: 600,
                              color: '#1e40af'
                            }}
                          >
                            <Calendar size={15} color="#2563eb" />
                            {app.interviewInfo}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModalApp(app)
                              setActiveModalType('details')
                            }}
                            style={{
                              padding: '8px 20px',
                              borderRadius: '10px',
                              border: '1.5px solid #0f172a',
                              backgroundColor: '#ffffff',
                              color: '#0f172a',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      )}

                      {/* 4. Microsoft: Rejected notice + View Feedback */}
                      {app.id === 'app-microsoft' && (
                        <div
                          style={{
                            marginTop: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '12px'
                          }}
                        >
                          <div style={{ fontSize: '13px', color: '#64748b' }}>
                            {app.feedbackNotice}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModalApp(app)
                              setActiveModalType('feedback')
                            }}
                            style={{
                              padding: '8px 20px',
                              borderRadius: '10px',
                              border: '1.5px solid #0f172a',
                              backgroundColor: '#ffffff',
                              color: '#0f172a',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            View Feedback
                          </button>
                        </div>
                      )}

                      {/* 5. Zoho: Offered notice + View Offer */}
                      {app.id === 'app-zoho' && (
                        <div
                          style={{
                            marginTop: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '12px'
                          }}
                        >
                          <div style={{ fontSize: '13px', color: '#64748b' }}>
                            {app.offerNotice}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModalApp(app)
                              setActiveModalType('offer')
                            }}
                            style={{
                              padding: '8px 20px',
                              borderRadius: '10px',
                              border: '1.5px solid #0f172a',
                              backgroundColor: '#ffffff',
                              color: '#0f172a',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            View Offer
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Sidebar Statistics & Activities */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* 1. Application Overview (Donut Chart) */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '24px'
                  }}
                >
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 800,
                      color: '#0f172a',
                      margin: '0 0 20px 0'
                    }}
                  >
                    Application Overview
                  </h3>

                  {/* Donut Chart SVG */}
                  <div
                    style={{
                      position: 'relative',
                      width: '160px',
                      height: '160px',
                      margin: '0 auto 24px'
                    }}
                  >
                    <svg viewBox="0 0 100 100" width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
                      {/* Background circle */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="12" />

                      {/* Blue arc (Under Review: 5 / 18 = 27.7%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="12"
                        strokeDasharray="66 238"
                        strokeDashoffset="0"
                      />

                      {/* Green arc (Shortlisted: 4 / 18 = 22.2%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="12"
                        strokeDasharray="53 238"
                        strokeDashoffset="-66"
                      />

                      {/* Purple arc (Interview Scheduled: 3 / 18 = 16.6%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#7e22ce"
                        strokeWidth="12"
                        strokeDasharray="40 238"
                        strokeDashoffset="-119"
                      />

                      {/* Emerald arc (Offered: 1 / 18 = 5.5%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="12"
                        strokeDasharray="14 238"
                        strokeDashoffset="-159"
                      />

                      {/* Red arc (Rejected: 5 / 18 = 27.7%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="12"
                        strokeDasharray="65 238"
                        strokeDashoffset="-173"
                      />
                    </svg>

                    {/* Center text */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                      }}
                    >
                      <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                        18
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                        Applications
                      </span>
                    </div>
                  </div>

                  {/* Legend list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
                        Under Review
                      </span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>5</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
                        Shortlisted
                      </span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>4</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#7e22ce' }} />
                        Interview Scheduled
                      </span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>3</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#059669' }} />
                        Offered
                      </span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>1</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                        Rejected
                      </span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>5</span>
                    </div>
                  </div>
                </div>

                {/* 2. Recent Activity Timeline */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '24px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '18px'
                    }}
                  >
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Recent Activity
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveSidebarTab('notifications')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0f172a',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      View All <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Timeline Items */}
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {/* Connecting line */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '6px',
                        top: '8px',
                        bottom: '8px',
                        width: '2px',
                        backgroundColor: '#e2e8f0',
                        zIndex: 0
                      }}
                    />

                    {/* Timeline 1 */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative', zIndex: 1 }}>
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: '#2563eb',
                          border: '3px solid #ffffff',
                          boxShadow: '0 0 0 1px #2563eb',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}
                      />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                          Application Submitted
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          Product Engineer at Adobe
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                          08 Oct 2026, 11:20 AM
                        </div>
                      </div>
                    </div>

                    {/* Timeline 2 */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative', zIndex: 1 }}>
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: '#16a34a',
                          border: '3px solid #ffffff',
                          boxShadow: '0 0 0 1px #16a34a',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}
                      />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                          Shortlisted
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          Software Engineer at Google
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                          05 Oct 2026, 04:15 PM
                        </div>
                      </div>
                    </div>

                    {/* Timeline 3 */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative', zIndex: 1 }}>
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: '#7e22ce',
                          border: '3px solid #ffffff',
                          boxShadow: '0 0 0 1px #7e22ce',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}
                      />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                          Interview Scheduled
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          Frontend Developer at Swiggy
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                          28 Sep 2026, 10:30 AM
                        </div>
                      </div>
                    </div>

                    {/* Timeline 4 */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', position: 'relative', zIndex: 1 }}>
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: '#ef4444',
                          border: '3px solid #ffffff',
                          boxShadow: '0 0 0 1px #ef4444',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}
                      />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                          Application Rejected
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          Product Designer at Microsoft
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                          24 Sep 2026, 02:10 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Keep Applying! Card */}
                <div
                  style={{
                    backgroundColor: '#f0f7ff',
                    borderRadius: '16px',
                    border: '1px solid #dbeafe',
                    padding: '24px'
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 2px 6px rgba(37,99,235,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2563eb',
                      marginBottom: '14px'
                    }}
                  >
                    <Lightbulb size={22} />
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                    Keep Applying!
                  </h4>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '0 0 18px 0' }}>
                    You've applied to <strong>18</strong> jobs. Complete your profile and take skill assessments to get more interviews.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveSidebarTab('profile')}
                    style={{
                      width: '100%',
                      backgroundColor: '#0c0d12',
                      color: '#ffffff',
                      padding: '10px 16px',
                      borderRadius: '9999px',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    Improve Profile
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: NOTIFICATIONS ================= */}
          {activeSidebarTab === 'notifications' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 340px',
                gap: '28px',
                alignItems: 'start'
              }}
              className="dashboard-two-column-grid"
            >
              {/* Left Column: Notifications List */}
              <div>
                {/* Header Title */}
                <div style={{ marginBottom: '24px' }}>
                  <h1
                    style={{
                      fontSize: '28px',
                      fontWeight: 800,
                      color: '#0f172a',
                      letterSpacing: '-0.02em',
                      margin: '0 0 6px 0'
                    }}
                  >
                    Notifications
                  </h1>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                    Stay updated with important updates about your job applications and opportunities.
                  </p>
                </div>

                {/* Filter Pills + Mark All as Read */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '22px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {[
                      { label: 'All (12)', value: 'ALL' },
                      { label: 'Application Updates (5)', value: 'UPDATES' },
                      { label: 'Interview Calls (2)', value: 'INTERVIEWS' },
                      { label: 'Job Alerts (3)', value: 'ALERTS' },
                      { label: 'Messages (1)', value: 'MESSAGES' },
                      { label: 'Profile (1)', value: 'PROFILE' }
                    ].map((pill) => {
                      const isActive = notifFilter === pill.value
                      return (
                        <button
                          key={pill.value}
                          type="button"
                          onClick={() => setNotifFilter(pill.value as NotificationFilter)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '9999px',
                            fontSize: '13px',
                            fontWeight: isActive ? 700 : 500,
                            backgroundColor: isActive ? '#0f172a' : '#ffffff',
                            color: isActive ? '#ffffff' : '#475569',
                            border: isActive ? '1px solid #0f172a' : '1px solid #e2e8f0',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {pill.label}
                        </button>
                      )
                    })}
                  </div>

                  {/* Mark All as Read */}
                  <button
                    type="button"
                    onClick={handleMarkAllNotificationsAsRead}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'none',
                      border: 'none',
                      color: '#0f172a',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      padding: '4px 8px'
                    }}
                  >
                    <Mail size={15} />
                    <span>Mark All as Read</span>
                  </button>
                </div>

                {/* Notifications List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {filteredNotifications.map((notif) => {
                    const renderIcon = () => {
                      switch (notif.iconType) {
                        case 'check':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <CheckCircle2 size={20} strokeWidth={2.5} />
                            </div>
                          )
                        case 'calendar':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Calendar size={20} strokeWidth={2.2} />
                            </div>
                          )
                        case 'cross':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <XCircle size={20} strokeWidth={2.2} />
                            </div>
                          )
                        case 'briefcase':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Briefcase size={20} strokeWidth={2.2} />
                            </div>
                          )
                        case 'message':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#7e22ce', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <MessageSquare size={20} strokeWidth={2.2} />
                            </div>
                          )
                        case 'star':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#ccfbf1', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Star size={20} strokeWidth={2.2} />
                            </div>
                          )
                        case 'bulb':
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Lightbulb size={20} strokeWidth={2.2} />
                            </div>
                          )
                        default:
                          return (
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#f1f5f9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Bell size={20} />
                            </div>
                          )
                      }
                    }

                    return (
                      <div
                        key={notif.id}
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          border: '1px solid #e2e8f0',
                          padding: '18px 22px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          transition: 'background-color 0.15s ease'
                        }}
                      >
                        {/* Left Details */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1, minWidth: 0 }}>
                          {renderIcon()}

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                                {notif.title}
                              </span>
                              {notif.badge && (
                                <span
                                  style={{
                                    backgroundColor: notif.badgeBg,
                                    color: notif.badgeText,
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    padding: '2px 8px',
                                    borderRadius: '9999px'
                                  }}
                                >
                                  {notif.badge}
                                </span>
                              )}
                            </div>

                            <div style={{ fontSize: '13px', color: '#475569', marginTop: '3px', lineHeight: 1.4 }}>
                              {notif.desc}
                            </div>

                            {notif.company && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                                <CompanyLogo name={notif.company} size={18} />
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                                  {notif.role} • {notif.company}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Timestamp & Unread Dot */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                            {notif.time}
                          </span>

                          {/* Unread blue dot or read gray dot */}
                          <div
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: notif.isUnread ? '#2563eb' : '#cbd5e1'
                            }}
                          />

                          <button
                            type="button"
                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                          >
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right Column: Settings & Quick Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* 1. Notification Settings Toggles */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '24px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <Settings size={18} color="#0f172a" />
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Notification Settings
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Item 1 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FileText size={17} color="#64748b" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Application Updates</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Status changes on your applications</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifSettings.appUpdates}
                        onChange={(e) => setNotifSettings({ ...notifSettings, appUpdates: e.target.checked })}
                        style={{ width: '38px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                      />
                    </div>

                    {/* Item 2 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Calendar size={17} color="#64748b" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Interview Calls</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Interview schedules and updates</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifSettings.interviews}
                        onChange={(e) => setNotifSettings({ ...notifSettings, interviews: e.target.checked })}
                        style={{ width: '38px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                      />
                    </div>

                    {/* Item 3 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Bell size={17} color="#64748b" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Job Alerts</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>New jobs matching your preferences</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifSettings.jobAlerts}
                        onChange={(e) => setNotifSettings({ ...notifSettings, jobAlerts: e.target.checked })}
                        style={{ width: '38px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                      />
                    </div>

                    {/* Item 4 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MessageSquare size={17} color="#64748b" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Messages</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Messages from recruiters</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifSettings.messages}
                        onChange={(e) => setNotifSettings({ ...notifSettings, messages: e.target.checked })}
                        style={{ width: '38px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                      />
                    </div>

                    {/* Item 5 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <User size={17} color="#64748b" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Profile Updates</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Tips and recommendations</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifSettings.profileUpdates}
                        onChange={(e) => setNotifSettings({ ...notifSettings, profileUpdates: e.target.checked })}
                        style={{ width: '38px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                      />
                    </div>

                    {/* Item 6 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Megaphone size={17} color="#64748b" />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Marketing Updates</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>Career tips and platform updates</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifSettings.marketingUpdates}
                        onChange={(e) => setNotifSettings({ ...notifSettings, marketingUpdates: e.target.checked })}
                        style={{ width: '38px', height: '22px', accentColor: '#2563eb', cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Quick Actions */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '24px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                    <Zap size={18} color="#2563eb" />
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Quick Actions
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={handleMarkAllNotificationsAsRead}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 600,
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Mail size={16} color="#64748b" />
                        Mark All as Read
                      </div>
                      <ChevronRight size={16} color="#94a3b8" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveSidebarTab('settings')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 600,
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Sliders size={16} color="#64748b" />
                        Notification Preferences
                      </div>
                      <ChevronRight size={16} color="#94a3b8" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveSidebarTab('settings')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 600,
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MailCheck size={16} color="#64748b" />
                        Manage Email Preferences
                      </div>
                      <ChevronRight size={16} color="#94a3b8" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        window.location.hash = '#contact'
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#0f172a',
                        fontWeight: 600,
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <HelpCircle size={16} color="#64748b" />
                        Help &amp; Support
                      </div>
                      <ChevronRight size={16} color="#94a3b8" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW: DASHBOARD OVERVIEW ================= */}
          {activeSidebarTab === 'dashboard' && (
            <CandidateOverviewTab
              onNavigateTab={(tab) => setActiveSidebarTab(tab)}
              onSaveJob={handleSaveJob}
              savedJobIds={savedJobIds}
            />
          )}

          {/* ================= VIEW: JOBS ================= */}
          {activeSidebarTab === 'jobs' && (
            <CandidateJobsTab
              onSaveJob={handleSaveJob}
              savedJobIds={savedJobIds}
              onApplicationSubmit={() => {}}
            />
          )}

          {/* ================= VIEW: SAVED JOBS ================= */}
          {activeSidebarTab === 'saved' && (
            <CandidateSavedJobsTab
              onNavigateTab={(tab) => setActiveSidebarTab(tab)}
              savedJobIds={savedJobIds}
              onRemoveSavedJob={handleRemoveSavedJob}
            />
          )}

          {/* ================= VIEW: INTERVIEW CALLS ================= */}
          {activeSidebarTab === 'interviews' && (
            <CandidateInterviewsTab
              onNavigateTab={(tab) => setActiveSidebarTab(tab)}
              onOpenOfferModal={(app) => {
                setActiveModalApp(app)
                setActiveModalType('offer')
              }}
              onOpenFeedbackModal={(app) => {
                setActiveModalApp(app)
                setActiveModalType('feedback')
              }}
            />
          )}

          {/* ================= VIEW: PROFILE ================= */}
          {activeSidebarTab === 'profile' && (
            <CandidateProfileTab />
          )}

          {/* ================= VIEW: SKILLS ================= */}
          {activeSidebarTab === 'skills' && (
            <CandidateSkillsTab />
          )}

          {/* ================= VIEW: SETTINGS ================= */}
          {activeSidebarTab === 'settings' && (
            <CandidateSettingsTab />
          )}
        </main>
      </div>

      {/* ================= INTERACTIVE MODALS ================= */}
      {/* 1. Job Details Modal */}
      {activeModalType === 'details' && activeModalApp && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              padding: '30px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveModalApp(null)
                setActiveModalType(null)
              }}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <CompanyLogo name={activeModalApp.logoName} size={48} />
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>
                  {activeModalApp.role}
                </h3>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
                  {activeModalApp.company} • {activeModalApp.location}
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Application Status:</span>
                <span style={{ fontWeight: 700, color: activeModalApp.statusTheme.text }}>{activeModalApp.statusLabel}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Expected Salary:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{activeModalApp.details?.salary || 'Competitive'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Department:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{activeModalApp.details?.department || 'Engineering'}</span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
              {activeModalApp.details?.notes}
            </p>

            <button
              type="button"
              onClick={() => {
                setActiveModalApp(null)
                setActiveModalType(null)
              }}
              style={{
                width: '100%',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 2. Feedback Modal */}
      {activeModalType === 'feedback' && activeModalApp && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              padding: '30px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveModalApp(null)
                setActiveModalType(null)
              }}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              Application Feedback
            </h3>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
              {activeModalApp.role} at {activeModalApp.company}
            </div>

            <div style={{ backgroundColor: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '12px', padding: '16px', color: '#9f1239', fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
              {activeModalApp.details?.feedback}
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveModalApp(null)
                setActiveModalType(null)
              }}
              style={{
                width: '100%',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* 3. Offer Modal */}
      {activeModalType === 'offer' && activeModalApp && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '540px',
              width: '100%',
              padding: '30px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveModalApp(null)
                setActiveModalType(null)
              }}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
                Job Offer from {activeModalApp.company}!
              </h3>
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                Position: {activeModalApp.role}
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Compensation:</span>
                <span style={{ fontWeight: 800, color: '#16a34a' }}>{activeModalApp.details?.salary}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Joining Date:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{activeModalApp.details?.joiningDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#64748b' }}>Location:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{activeModalApp.details?.location}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => {
                  setActiveModalApp(null)
                  setActiveModalType(null)
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Offer accepted! The onboarding coordinator will reach out via email.')
                  setActiveModalApp(null)
                  setActiveModalType(null)
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#16a34a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Accept Offer Letter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Layout Styles */}
      <style>{`
        .mobile-hamburger-btn {
          display: none;
        }
        .mobile-sidebar-close-btn {
          display: none;
        }
        .mobile-tab-scroll-bar {
          display: none;
        }
        @media (max-width: 1080px) {
          .dashboard-two-column-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 850px) {
          .candidate-dashboard-layout {
            flex-direction: column !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
          .mobile-sidebar-close-btn {
            display: block !important;
          }
          .mobile-tab-scroll-bar {
            display: flex !important;
            overflow-x: auto;
            white-space: nowrap;
            padding: 10px 16px;
            gap: 8px;
            background-color: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            position: sticky;
            top: 60px;
            z-index: 30;
            -webkit-overflow-scrolling: touch;
          }
          .mobile-tab-scroll-bar::-webkit-scrollbar {
            display: none;
          }
          .dashboard-dark-sidebar {
            display: none !important;
          }
          .dashboard-dark-sidebar.mobile-open {
            display: flex !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            bottom: 0 !important;
            z-index: 200 !important;
            width: 280px !important;
            max-width: 85vw !important;
            box-shadow: 10px 0 30px rgba(0,0,0,0.5) !important;
          }
          .dashboard-mobile-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 199;
          }
          main {
            padding: 16px !important;
          }
          header {
            padding: 0 16px !important;
            height: 60px !important;
          }
          .header-search-wrapper {
            max-width: 220px !important;
          }
        }
      `}</style>
    </div>
  )
}
