import React, { useState, useMemo, useEffect, useRef } from 'react'
import {
  Calendar,
  ChevronDown,
  X,
  FileText,
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Target,
  Building2,
  Globe,
  Search,
  Clock
} from 'lucide-react'
import type { Candidate, Recruiter, AdminView, ContactMessage } from '../types'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

interface CandidatesViewProps {
  candidates: Candidate[]
  recruiters?: Recruiter[]
  messages?: ContactMessage[]
  loading: boolean
  initialTab?: 'candidates' | 'recruiters' | 'messages'
  onNavigate?: (view: AdminView) => void
}

export type DateRangePreset = 'all' | 'today' | 'yesterday' | '7days' | '30days' | 'this_month' | 'custom'

// Helper: Format date as "24 Sep 2026 10:30 AM" matching the screenshot
export function formatRegisteredOn(d: any): string {
  if (!d) return '—'
  let date: Date
  if (typeof d?.toDate === 'function') {
    date = d.toDate()
  } else if (d?.seconds) {
    date = new Date(d.seconds * 1000)
  } else {
    date = new Date(d)
  }
  if (isNaN(date.getTime())) return '—'

  const day = date.getDate()
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  const strMinutes = minutes < 10 ? '0' + minutes : minutes
  const strHours = hours < 10 ? '0' + hours : hours

  return `${day} ${month} ${year} ${strHours}:${strMinutes} ${ampm}`
}

// Helper: Parse any date representation into standard Date object
function parseDate(d: any): Date | null {
  if (!d) return null
  let date: Date
  if (typeof d?.toDate === 'function') {
    date = d.toDate()
  } else if (d?.seconds) {
    date = new Date(d.seconds * 1000)
  } else {
    date = new Date(d)
  }
  return isNaN(date.getTime()) ? null : date
}

// Helper: Check if record date falls within preset range
function isWithinDateRange(
  dateVal: any,
  preset: DateRangePreset,
  customStart?: string,
  customEnd?: string
): boolean {
  if (preset === 'all') return true
  const date = parseDate(dateVal)
  if (!date) return false

  const now = new Date()
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
  const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)

  const todayStart = startOfDay(now)
  const todayEnd = endOfDay(now)

  switch (preset) {
    case 'today':
      return date >= todayStart && date <= todayEnd
    case 'yesterday': {
      const yStart = new Date(todayStart)
      yStart.setDate(yStart.getDate() - 1)
      const yEnd = new Date(todayEnd)
      yEnd.setDate(yEnd.getDate() - 1)
      return date >= yStart && date <= yEnd
    }
    case '7days': {
      const past7 = new Date(todayStart)
      past7.setDate(past7.getDate() - 6)
      return date >= past7 && date <= todayEnd
    }
    case '30days': {
      const past30 = new Date(todayStart)
      past30.setDate(past30.getDate() - 29)
      return date >= past30 && date <= todayEnd
    }
    case 'this_month': {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
      return date >= monthStart && date <= todayEnd
    }
    case 'custom': {
      if (!customStart && !customEnd) return true
      const start = customStart ? startOfDay(new Date(customStart)) : new Date(0)
      const end = customEnd ? endOfDay(new Date(customEnd)) : new Date(8640000000000000)
      return date >= start && date <= end
    }
    default:
      return true
  }
}

// Helper: Convert Base64 data URL to Blob and trigger native browser file download
function downloadBlobOrDataUrl(dataUrl: string, fileName: string) {
  try {
    if (dataUrl.startsWith('data:')) {
      const parts = dataUrl.split(',')
      const mimeMatch = parts[0].match(/:(.*?);/)
      const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream'
      const base64Data = parts[1] || ''
      const bstr = atob(base64Data)
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const blob = new Blob([u8arr], { type: mime })
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(blobUrl)
      }, 1000)
      return
    }
  } catch (err) {
    console.warn('Blob conversion failed, using direct data link', err)
  }

  const link = document.createElement('a')
  link.href = dataUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Fallback: Generate a clean, printable HTML document export if no resume file was uploaded
function downloadProfileFallback(candidate: Candidate) {
  const registeredStr = formatRegisteredOn(candidate.registeredAt)
  const resumeHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${candidate.fullName} - Resume</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      padding: 48px;
      color: #0f172a;
      max-width: 820px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 24px;
      margin-bottom: 28px;
    }
    h1 {
      font-size: 32px;
      font-weight: 800;
      margin: 0 0 6px;
      color: #0c0d0e;
    }
    .role {
      font-size: 18px;
      color: #2563eb;
      font-weight: 600;
      margin: 0 0 16px;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      font-size: 14px;
      color: #475569;
    }
    .contact-item strong {
      color: #1e293b;
    }
    .section {
      margin-bottom: 28px;
    }
    .section-title {
      font-size: 15px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 14px;
    }
    .detail-row {
      display: flex;
      margin-bottom: 10px;
      font-size: 14.5px;
    }
    .detail-label {
      width: 200px;
      font-weight: 600;
      color: #475569;
      flex-shrink: 0;
    }
    .detail-val {
      color: #0f172a;
    }
    .footer {
      margin-top: 48px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #94a3b8;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${candidate.fullName}</h1>
    <div class="role">${candidate.preferredRole || 'Candidate Profile'}</div>
    <div class="contact-grid">
      <div class="contact-item"><strong>Email:</strong> ${candidate.email}</div>
      <div class="contact-item"><strong>Mobile:</strong> ${candidate.mobileNumber}</div>
      <div class="contact-item"><strong>Location:</strong> ${candidate.currentLocation || 'Not specified'}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Professional Qualifications</div>
    <div class="detail-row">
      <div class="detail-label">Target Role / Industry:</div>
      <div class="detail-val"><strong>${candidate.preferredRole || '—'}</strong></div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Highest Education:</div>
      <div class="detail-val">${candidate.highestEducation || '—'}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Work Experience:</div>
      <div class="detail-val">${candidate.workExperience || '—'}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Registered On:</div>
      <div class="detail-val">${registeredStr}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Verification & Source</div>
    <p style="font-size: 13.5px; color: #475569; margin: 0;">
      Registered via Proxy Career Portal Candidate Pool. Verified by Proxy Talent Acquisition specialist.
    </p>
  </div>

  <div class="footer">
    Proxy Recruitment Platform · Official Candidate Profile Export · ${new Date().toLocaleDateString('en-IN')}
  </div>
</body>
</html>`

  const blob = new Blob([resumeHtml], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${candidate.fullName.replace(/\s+/g, '_')}_Profile.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// Helper: Download candidate resume to user's local machine
export async function downloadCandidateResume(
  candidate: Candidate,
  onLoading?: (loading: boolean) => void
) {
  if (onLoading) onLoading(true)
  try {
    const fileName = candidate.resumeFileName || `${candidate.fullName.replace(/\s+/g, '_')}_Resume.pdf`

    // 1. Direct Base64 Data URL on candidate object
    let dataUrl: string | undefined | null = candidate.resumeDataUrl

    // 2. Query chunked resume data from Firestore if not directly attached
    if (!dataUrl && candidate.email) {
      try {
        const cleanEmail = candidate.email.toLowerCase().trim()
        const q = query(
          collection(db, 'candidates'),
          where('isResumeChunk', '==', true),
          where('candidateEmail', '==', cleanEmail)
        )
        const snap = await getDocs(q)
        if (!snap.empty) {
          const chunks = snap.docs
            .map(d => d.data())
            .sort((a, b) => (a.chunkIndex ?? 0) - (b.chunkIndex ?? 0))
          dataUrl = chunks.map(c => c.data).join('')
        }
      } catch (err) {
        console.warn('Could not query resume chunks from Firestore', err)
      }
    }

    // 3. Fallback to localStorage (for development preview)
    if (!dataUrl && typeof window !== 'undefined' && candidate.email) {
      dataUrl = localStorage.getItem('resume_' + candidate.email.toLowerCase().trim())
    }

    if (dataUrl) {
      downloadBlobOrDataUrl(dataUrl, fileName)
      return
    }

    // 4. Web URL if provided
    if (candidate.resumeUrl) {
      const link = document.createElement('a')
      link.href = candidate.resumeUrl
      link.target = '_blank'
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return
    }

    // 5. Fallback: Generate a clean, printable HTML document export if no resume was uploaded
    downloadProfileFallback(candidate)
  } finally {
    if (onLoading) onLoading(false)
  }
}

export const CandidatesView: React.FC<CandidatesViewProps> = ({
  candidates,
  recruiters = [],
  messages = [],
  loading,
  initialTab = 'candidates',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'candidates' | 'recruiters' | 'messages'>(initialTab)
  const [search, setSearch] = useState('')

  // Date Range Filter States
  const [datePreset, setDatePreset] = useState<DateRangePreset>('all')
  const [customStart, setCustomStart] = useState('')
  const [customEnd, setCustomEnd] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Viewed states (track IDs marked as viewed)
  const [viewedIds, setViewedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('admin_viewed_ids') || '["3", "5"]')
    } catch {
      return ['3', '5']
    }
  })

  // Selected candidate / recruiter / message for details modal
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [downloadingResume, setDownloadingResume] = useState(false)

  // Sync tab if initialTab changes
  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDatePicker(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  // Filter candidates by search & date range
  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchesSearch =
        c.fullName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.mobileNumber.toLowerCase().includes(search.toLowerCase()) ||
        (c.currentLocation && c.currentLocation.toLowerCase().includes(search.toLowerCase())) ||
        (c.preferredRole && c.preferredRole.toLowerCase().includes(search.toLowerCase()))

      const matchesDate = isWithinDateRange(c.registeredAt, datePreset, customStart, customEnd)
      return matchesSearch && matchesDate
    })
  }, [candidates, search, datePreset, customStart, customEnd])

  // Filter recruiters by search & date range
  const filteredRecruiters = useMemo(() => {
    return recruiters.filter(r => {
      const matchesSearch =
        r.fullName.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.mobileNumber.toLowerCase().includes(search.toLowerCase()) ||
        r.companyName.toLowerCase().includes(search.toLowerCase())

      const matchesDate = isWithinDateRange(r.registeredAt, datePreset, customStart, customEnd)
      return matchesSearch && matchesDate
    })
  }, [recruiters, search, datePreset, customStart, customEnd])

  // Filter contact messages by search & date range
  const filteredMessages = useMemo(() => {
    return messages.filter(m => {
      const q = search.toLowerCase()
      const matchesSearch =
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.fullName && m.fullName.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q)) ||
        (m.phone && m.phone.toLowerCase().includes(q)) ||
        (m.mobileNumber && m.mobileNumber.toLowerCase().includes(q)) ||
        (m.role && m.role.toLowerCase().includes(q)) ||
        (m.subject && m.subject.toLowerCase().includes(q)) ||
        (m.message && m.message.toLowerCase().includes(q))

      const matchesDate = isWithinDateRange(m.registeredAt || m.createdAt, datePreset, customStart, customEnd)
      return matchesSearch && matchesDate
    })
  }, [messages, search, datePreset, customStart, customEnd])

  // Handler: Click View on Message
  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    if (!viewedIds.includes(message.id)) {
      const updated = [...viewedIds, message.id]
      setViewedIds(updated)
      try {
        localStorage.setItem('admin_viewed_ids', JSON.stringify(updated))
      } catch {
        // ignore
      }
    }
  }

  // Handler: Click View on Candidate
  const handleViewCandidate = async (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    if (!viewedIds.includes(candidate.id)) {
      const updated = [...viewedIds, candidate.id]
      setViewedIds(updated)
      try {
        localStorage.setItem('admin_viewed_ids', JSON.stringify(updated))
      } catch {
        // ignore
      }
    }

    // If candidate has resume chunks in Firestore, prefetch and populate resumeDataUrl
    if (!candidate.resumeDataUrl && candidate.email) {
      try {
        const cleanEmail = candidate.email.toLowerCase().trim()
        const q = query(
          collection(db, 'candidates'),
          where('isResumeChunk', '==', true),
          where('candidateEmail', '==', cleanEmail)
        )
        const snap = await getDocs(q)
        if (!snap.empty) {
          const chunks = snap.docs
            .map(d => d.data())
            .sort((a, b) => (a.chunkIndex ?? 0) - (b.chunkIndex ?? 0))
          const fullDataUrl = chunks.map(c => c.data).join('')
          setSelectedCandidate(prev => prev && prev.id === candidate.id ? { ...prev, resumeDataUrl: fullDataUrl } : prev)
        }
      } catch (err) {
        console.warn('Prefetch resume chunks note:', err)
      }
    }
  }

  // Handler: Click View on Recruiter
  const handleViewRecruiter = (recruiter: Recruiter) => {
    setSelectedRecruiter(recruiter)
    if (!viewedIds.includes(recruiter.id)) {
      const updated = [...viewedIds, recruiter.id]
      setViewedIds(updated)
      try {
        localStorage.setItem('admin_viewed_ids', JSON.stringify(updated))
      } catch {
        // ignore
      }
    }
  }

  // Preset labels map
  const presetLabels: Record<DateRangePreset, string> = {
    all: 'Select Date Range',
    today: 'Today',
    yesterday: 'Yesterday',
    '7days': 'Last 7 Days',
    '30days': 'Last 30 Days',
    this_month: 'This Month',
    custom: customStart && customEnd ? `${customStart} to ${customEnd}` : 'Custom Range',
  }

  return (
    <div className="registration-enquiries-page">
      {/* ================= TOP CARD ================= */}
      <div className="enquiries-card">
        {/* Header row */}
        <div className="enquiries-header">
          <div>
            <h2 className="enquiries-title">Registration Enquiries</h2>
            <p className="enquiries-subtitle">
              View candidate and recruiter registration requests.
            </p>
          </div>

          {/* Date Range Selector Dropdown */}
          <div className="date-picker-wrap" ref={dropdownRef}>
            <button
              type="button"
              className={`date-picker-btn ${datePreset !== 'all' ? 'active-filter' : ''}`}
              onClick={() => setShowDatePicker(prev => !prev)}
            >
              <Calendar size={16} color={datePreset !== 'all' ? '#0c0d0e' : '#475569'} />
              <span>{presetLabels[datePreset]}</span>
              <ChevronDown size={15} color="#64748b" />
            </button>

            {datePreset !== 'all' && (
              <button
                type="button"
                className="clear-date-btn"
                title="Reset Date Filter"
                onClick={() => {
                  setDatePreset('all')
                  setCustomStart('')
                  setCustomEnd('')
                }}
              >
                <X size={14} />
              </button>
            )}

            {/* Dropdown Menu */}
            {showDatePicker && (
              <div className="date-picker-dropdown">
                <div className="preset-list">
                  <button
                    type="button"
                    className={`preset-btn ${datePreset === 'all' ? 'selected' : ''}`}
                    onClick={() => {
                      setDatePreset('all')
                      setShowDatePicker(false)
                    }}
                  >
                    All Time
                  </button>
                  <button
                    type="button"
                    className={`preset-btn ${datePreset === 'today' ? 'selected' : ''}`}
                    onClick={() => {
                      setDatePreset('today')
                      setShowDatePicker(false)
                    }}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    className={`preset-btn ${datePreset === 'yesterday' ? 'selected' : ''}`}
                    onClick={() => {
                      setDatePreset('yesterday')
                      setShowDatePicker(false)
                    }}
                  >
                    Yesterday
                  </button>
                  <button
                    type="button"
                    className={`preset-btn ${datePreset === '7days' ? 'selected' : ''}`}
                    onClick={() => {
                      setDatePreset('7days')
                      setShowDatePicker(false)
                    }}
                  >
                    Last 7 Days
                  </button>
                  <button
                    type="button"
                    className={`preset-btn ${datePreset === '30days' ? 'selected' : ''}`}
                    onClick={() => {
                      setDatePreset('30days')
                      setShowDatePicker(false)
                    }}
                  >
                    Last 30 Days
                  </button>
                  <button
                    type="button"
                    className={`preset-btn ${datePreset === 'this_month' ? 'selected' : ''}`}
                    onClick={() => {
                      setDatePreset('this_month')
                      setShowDatePicker(false)
                    }}
                  >
                    This Month
                  </button>
                </div>

                <div className="custom-range-box">
                  <div className="custom-range-title">Custom Date Range</div>
                  <div className="custom-inputs">
                    <input
                      type="date"
                      value={customStart}
                      onChange={e => setCustomStart(e.target.value)}
                      className="custom-date-input"
                    />
                    <span style={{ color: '#94a3b8' }}>to</span>
                    <input
                      type="date"
                      value={customEnd}
                      onChange={e => setCustomEnd(e.target.value)}
                      className="custom-date-input"
                    />
                  </div>
                  <button
                    type="button"
                    className="apply-custom-btn"
                    onClick={() => {
                      if (customStart || customEnd) {
                        setDatePreset('custom')
                      }
                      setShowDatePicker(false)
                    }}
                  >
                    Apply Range
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="enquiries-controls">
          <div className="tab-pill-group">
            <button
              type="button"
              className={`tab-pill ${activeTab === 'candidates' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('candidates')
                if (onNavigate) onNavigate('candidates')
              }}
            >
              Candidates ({candidates.length})
            </button>
            <button
              type="button"
              className={`tab-pill ${activeTab === 'recruiters' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('recruiters')
                if (onNavigate) onNavigate('recruiters')
              }}
            >
              Recruiters ({recruiters.length})
            </button>
            <button
              type="button"
              className={`tab-pill ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('messages')
                if (onNavigate) onNavigate('messages')
              }}
            >
              Messages ({messages.length})
            </button>
          </div>

          <div className="search-wrap">
            <Search size={15} color="#94a3b8" />
            <input
              type="text"
              placeholder={
                activeTab === 'candidates'
                  ? 'Search candidates by name, role, email…'
                  : activeTab === 'recruiters'
                  ? 'Search recruiters by name, company…'
                  : 'Search messages by name, email, subject, phone…'
              }
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0 4px' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* ================= CANDIDATES TAB ================= */}
        {activeTab === 'candidates' && (
          <div className="table-responsive">
            {loading ? (
              <div className="loading-state">
                <div className="spinner" />
                <span>Loading candidates…</span>
              </div>
            ) : filteredCandidates.length === 0 ? (
              <div className="empty-state">
                <h3>No candidates found</h3>
                <p>
                  {search || datePreset !== 'all'
                    ? 'No candidates match your current search or date filter.'
                    : 'Registered candidates will appear here once submitted.'}
                </p>
                {(search || datePreset !== 'all') && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setSearch('')
                      setDatePreset('all')
                    }}
                    style={{ marginTop: '12px', fontSize: '13px' }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <table className="enquiries-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Location</th>
                    <th>Registered On</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center', width: '90px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((c, idx) => {
                    const isViewed = viewedIds.includes(c.id) || c.status === 'viewed'
                    return (
                      <tr key={c.id}>
                        <td className="cell-num">{idx + 1}</td>
                        <td className="cell-name-bold">{c.fullName}</td>
                        <td className="cell-email">{c.email}</td>
                        <td className="cell-mobile">{c.mobileNumber}</td>
                        <td className="cell-location">{c.currentLocation || '—'}</td>
                        <td className="cell-date">{formatRegisteredOn(c.registeredAt)}</td>
                        <td>
                          {isViewed ? (
                            <span className="status-pill status-viewed">
                              <span className="status-dot dot-viewed" />
                              Viewed
                            </span>
                          ) : (
                            <span className="status-pill status-new">
                              <span className="status-dot dot-new" />
                              New
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn-action-view"
                            onClick={() => handleViewCandidate(c)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ================= RECRUITERS TAB ================= */}
        {activeTab === 'recruiters' && (
          <div className="table-responsive">
            {loading ? (
              <div className="loading-state">
                <div className="spinner" />
                <span>Loading recruiters…</span>
              </div>
            ) : filteredRecruiters.length === 0 ? (
              <div className="empty-state">
                <h3>No recruiters found</h3>
                <p>
                  {search || datePreset !== 'all'
                    ? 'No recruiters match your current search or date filter.'
                    : 'Registered recruiters will appear here once submitted.'}
                </p>
                {(search || datePreset !== 'all') && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setSearch('')
                      setDatePreset('all')
                    }}
                    style={{ marginTop: '12px', fontSize: '13px' }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <table className="enquiries-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Company</th>
                    <th>Registered On</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center', width: '90px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecruiters.map((r, idx) => {
                    const isViewed = viewedIds.includes(r.id) || r.status === 'viewed'
                    return (
                      <tr key={r.id}>
                        <td className="cell-num">{idx + 1}</td>
                        <td className="cell-name-bold">{r.fullName}</td>
                        <td className="cell-email">{r.email}</td>
                        <td className="cell-mobile">{r.mobileNumber}</td>
                        <td className="cell-location">
                          <strong>{r.companyName}</strong>
                          {r.industry && <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>{r.industry}</span>}
                        </td>
                        <td className="cell-date">{formatRegisteredOn(r.registeredAt)}</td>
                        <td>
                          {isViewed ? (
                            <span className="status-pill status-viewed">
                              <span className="status-dot dot-viewed" />
                              Viewed
                            </span>
                          ) : (
                            <span className="status-pill status-new">
                              <span className="status-dot dot-new" />
                              New
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn-action-view"
                            onClick={() => handleViewRecruiter(r)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ================= MESSAGES TAB ================= */}
        {activeTab === 'messages' && (
          <div className="table-responsive">
            {loading ? (
              <div className="loading-state">
                <div className="spinner" />
                <span>Loading messages…</span>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="empty-state">
                <h3>No messages found</h3>
                <p>
                  {search || datePreset !== 'all'
                    ? 'No messages match your current search or date filter.'
                    : 'Contact inquiries submitted by users will appear here.'}
                </p>
                {(search || datePreset !== 'all') && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setSearch('')
                      setDatePreset('all')
                    }}
                    style={{ marginTop: '12px', fontSize: '13px' }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <table className="enquiries-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>I am a</th>
                    <th>Subject</th>
                    <th>Received On</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center', width: '90px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map((m, idx) => {
                    const isViewed = viewedIds.includes(m.id) || m.status === 'viewed'
                    return (
                      <tr key={m.id}>
                        <td className="cell-num">{idx + 1}</td>
                        <td className="cell-name-bold">{m.name || m.fullName}</td>
                        <td className="cell-email">{m.email}</td>
                        <td className="cell-mobile">{m.phone || m.mobileNumber}</td>
                        <td>
                          <span style={{
                            fontSize: '12px',
                            padding: '3px 8px',
                            background: '#f1f5f9',
                            color: '#334155',
                            borderRadius: '6px',
                            fontWeight: 500,
                            display: 'inline-block'
                          }}>
                            {m.role || 'General'}
                          </span>
                        </td>
                        <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600 }}>
                          {m.subject || '—'}
                        </td>
                        <td className="cell-date">{formatRegisteredOn(m.registeredAt || m.createdAt)}</td>
                        <td>
                          {isViewed ? (
                            <span className="status-pill status-viewed">
                              <span className="status-dot dot-viewed" />
                              Viewed
                            </span>
                          ) : (
                            <span className="status-pill status-new">
                              <span className="status-dot dot-new" />
                              New
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="btn-action-view"
                            onClick={() => handleViewMessage(m)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* ================= CANDIDATE DETAILS MODAL ================= */}
      {selectedCandidate && (
        <div className="details-modal-overlay" onClick={() => setSelectedCandidate(null)}>
          <div
            className="details-modal-card"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="details-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="candidate-avatar">
                  {selectedCandidate.fullName
                    .split(' ')
                    .map(n => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase() || 'CA'}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 className="modal-candidate-name">{selectedCandidate.fullName}</h3>
                    <span className="status-pill status-viewed">
                      <span className="status-dot dot-viewed" />
                      Viewed
                    </span>
                  </div>
                  <p className="modal-candidate-role">
                    {selectedCandidate.preferredRole || 'Candidate Registration'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedCandidate(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="details-modal-body">
              {/* Profile Details Grid */}
              <div className="details-grid">
                <div className="detail-field">
                  <div className="field-title">
                    <Mail size={14} color="#64748b" />
                    <span>Email Address</span>
                  </div>
                  <a href={`mailto:${selectedCandidate.email}`} className="field-value link">
                    {selectedCandidate.email}
                  </a>
                </div>

                <div className="detail-field">
                  <div className="field-title">
                    <Phone size={14} color="#64748b" />
                    <span>Mobile Number</span>
                  </div>
                  <a href={`tel:${selectedCandidate.mobileNumber}`} className="field-value link">
                    {selectedCandidate.mobileNumber}
                  </a>
                </div>

                <div className="detail-field">
                  <div className="field-title">
                    <MapPin size={14} color="#64748b" />
                    <span>Location</span>
                  </div>
                  <div className="field-value">
                    {selectedCandidate.currentLocation || 'Not provided'}
                  </div>
                </div>

                <div className="detail-field">
                  <div className="field-title">
                    <GraduationCap size={14} color="#64748b" />
                    <span>Highest Education</span>
                  </div>
                  <div className="field-value">
                    {selectedCandidate.highestEducation || 'Not provided'}
                  </div>
                </div>

                <div className="detail-field">
                  <div className="field-title">
                    <Briefcase size={14} color="#64748b" />
                    <span>Work Experience</span>
                  </div>
                  <div className="field-value">
                    {selectedCandidate.workExperience || 'Not provided'}
                  </div>
                </div>

                <div className="detail-field">
                  <div className="field-title">
                    <Target size={14} color="#64748b" />
                    <span>Target Job Role</span>
                  </div>
                  <div className="field-value">
                    {selectedCandidate.preferredRole || 'Not provided'}
                  </div>
                </div>

                <div className="detail-field full-width">
                  <div className="field-title">
                    <Clock size={14} color="#64748b" />
                    <span>Registered On</span>
                  </div>
                  <div className="field-value">
                    {formatRegisteredOn(selectedCandidate.registeredAt)}
                  </div>
                </div>
              </div>

              {/* Resume Section */}
              <div className="resume-section-card">
                <div className="resume-card-left">
                  <div className="resume-icon-badge">
                    <FileText size={22} color="#0c0d0e" />
                  </div>
                  <div>
                    <h4 className="resume-file-title">
                      {selectedCandidate.resumeFileName || `${selectedCandidate.fullName.replace(/\s+/g, '_')}_Resume.pdf`}
                    </h4>
                    <span className="resume-file-meta">
                      {selectedCandidate.hasResume || selectedCandidate.resumeFileName
                        ? 'Candidate Resume Document'
                        : 'Auto-generated Candidate Profile Document'}
                    </span>
                  </div>
                </div>

                <div className="resume-card-actions">
                  <button
                    type="button"
                    className="btn-download-resume"
                    disabled={downloadingResume}
                    onClick={() => downloadCandidateResume(selectedCandidate, setDownloadingResume)}
                    title="Download candidate's uploaded resume directly to your computer"
                  >
                    <Download size={15} />
                    <span>{downloadingResume ? 'Downloading…' : 'Download Resume'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="details-modal-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedCandidate(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={downloadingResume}
                onClick={() => downloadCandidateResume(selectedCandidate, setDownloadingResume)}
              >
                <Download size={15} />
                <span>{downloadingResume ? 'Downloading…' : 'Download Resume'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RECRUITER DETAILS MODAL ================= */}
      {selectedRecruiter && (
        <div className="details-modal-overlay" onClick={() => setSelectedRecruiter(null)}>
          <div
            className="details-modal-card"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="details-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="candidate-avatar recruiter-avatar">
                  <Building2 size={22} color="#0c0d0e" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 className="modal-candidate-name">{selectedRecruiter.fullName}</h3>
                    <span className="status-pill status-viewed">
                      <span className="status-dot dot-viewed" />
                      Viewed
                    </span>
                  </div>
                  <p className="modal-candidate-role">
                    {selectedRecruiter.jobRole || 'Hiring Manager'} · {selectedRecruiter.companyName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedRecruiter(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="details-modal-body">
              <div className="details-grid">
                <div className="detail-field">
                  <div className="field-title">
                    <Mail size={14} color="#64748b" />
                    <span>Official Email</span>
                  </div>
                  <a href={`mailto:${selectedRecruiter.email}`} className="field-value link">
                    {selectedRecruiter.email}
                  </a>
                </div>

                <div className="detail-field">
                  <div className="field-title">
                    <Phone size={14} color="#64748b" />
                    <span>Mobile Number</span>
                  </div>
                  <a href={`tel:${selectedRecruiter.mobileNumber}`} className="field-value link">
                    {selectedRecruiter.mobileNumber}
                  </a>
                </div>

                <div className="detail-field">
                  <div className="field-title">
                    <Building2 size={14} color="#64748b" />
                    <span>Company Name</span>
                  </div>
                  <div className="field-value">
                    <strong>{selectedRecruiter.companyName}</strong>
                  </div>
                </div>

                <div className="detail-field">
                  <div className="field-title">
                    <Briefcase size={14} color="#64748b" />
                    <span>Industry &amp; Size</span>
                  </div>
                  <div className="field-value">
                    {selectedRecruiter.industry || 'Enterprise'} ({selectedRecruiter.companySize || 'Growing'} employees)
                  </div>
                </div>

                {selectedRecruiter.companyWebsite && (
                  <div className="detail-field">
                    <div className="field-title">
                      <Globe size={14} color="#64748b" />
                      <span>Company Website</span>
                    </div>
                    <a
                      href={selectedRecruiter.companyWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="field-value link"
                    >
                      {selectedRecruiter.companyWebsite}
                    </a>
                  </div>
                )}

                <div className="detail-field">
                  <div className="field-title">
                    <Clock size={14} color="#64748b" />
                    <span>Registered On</span>
                  </div>
                  <div className="field-value">
                    {formatRegisteredOn(selectedRecruiter.registeredAt)}
                  </div>
                </div>
              </div>
            </div>

            <div className="details-modal-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedRecruiter(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTACT MESSAGE DETAILS MODAL ================= */}
      {selectedMessage && (
        <div className="details-modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div
            className="details-modal-card"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="details-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className="candidate-avatar" style={{ background: '#2563eb', color: '#ffffff' }}>
                  {(selectedMessage.name || selectedMessage.fullName || 'M')
                    .split(' ')
                    .map(n => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 className="modal-candidate-name">{selectedMessage.name || selectedMessage.fullName}</h3>
                    <span className="status-pill status-viewed">
                      <span className="status-dot dot-viewed" />
                      Contact Inquiry
                    </span>
                  </div>
                  <p className="modal-candidate-role">
                    Role: <strong>{selectedMessage.role || 'Not specified'}</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedMessage(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="details-modal-body">
              {/* Sender Details Grid */}
              <div className="details-grid">
                <div className="detail-field">
                  <div className="field-title">
                    <Mail size={14} color="#64748b" />
                    <span>Email Address</span>
                  </div>
                  <a href={`mailto:${selectedMessage.email}`} className="field-value link">
                    {selectedMessage.email}
                  </a>
                </div>

                <div className="detail-field">
                  <div className="field-title">
                    <Phone size={14} color="#64748b" />
                    <span>Mobile Number</span>
                  </div>
                  <a href={`tel:${selectedMessage.phone || selectedMessage.mobileNumber}`} className="field-value link">
                    {selectedMessage.phone || selectedMessage.mobileNumber}
                  </a>
                </div>

                <div className="detail-field">
                  <div className="field-title">
                    <Target size={14} color="#64748b" />
                    <span>Category / I am a</span>
                  </div>
                  <div className="field-value">
                    <strong>{selectedMessage.role || 'General Inquiry'}</strong>
                  </div>
                </div>

                <div className="detail-field">
                  <div className="field-title">
                    <Clock size={14} color="#64748b" />
                    <span>Received On</span>
                  </div>
                  <div className="field-value">
                    {formatRegisteredOn(selectedMessage.registeredAt || selectedMessage.createdAt)}
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div style={{ marginTop: '20px' }}>
                <div className="field-title" style={{ marginBottom: '6px' }}>
                  <FileText size={14} color="#64748b" />
                  <span>Subject</span>
                </div>
                <div style={{
                  padding: '10px 14px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontWeight: 700,
                  color: '#0f172a',
                  fontSize: '15px'
                }}>
                  {selectedMessage.subject || 'General Inquiry'}
                </div>
              </div>

              {/* Message */}
              <div style={{ marginTop: '16px' }}>
                <div className="field-title" style={{ marginBottom: '6px' }}>
                  <Mail size={14} color="#64748b" />
                  <span>Message</span>
                </div>
                <div style={{
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '16px 18px',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#1e293b',
                  whiteSpace: 'pre-wrap',
                  minHeight: '110px'
                }}>
                  {selectedMessage.message || 'No message content provided.'}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="details-modal-footer">
              <a
                href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent('Re: ' + (selectedMessage.subject || 'Your Inquiry to Proxy'))}`}
                className="btn-download-resume"
                style={{ background: '#2563eb', color: '#fff', textDecoration: 'none' }}
              >
                <Mail size={15} />
                <span>Reply via Email</span>
              </a>
              <a
                href={`tel:${selectedMessage.phone || selectedMessage.mobileNumber}`}
                className="btn btn-outline"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Phone size={15} />
                <span>Call</span>
              </a>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedMessage(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= COMPONENT STYLES ================= */}
      <style>{`
        .registration-enquiries-page {
          width: 100%;
        }

        .enquiries-card {
          background-color: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 16px;
          padding: 26px 30px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04);
        }

        .enquiries-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .enquiries-title {
          font-size: 24px;
          font-weight: 800;
          color: #0c0d0e;
          margin: 0 0 6px;
          letter-spacing: -0.4px;
        }

        .enquiries-subtitle {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        /* Date Picker Dropdown */
        .date-picker-wrap {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .date-picker-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          color: #334155;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: inherit;
        }

        .date-picker-btn:hover {
          background-color: #f8fafc;
          border-color: #cbd5e1;
        }

        .date-picker-btn.active-filter {
          border-color: #0c0d0e;
          font-weight: 600;
          color: #0c0d0e;
        }

        .clear-date-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
          transition: all 0.15s ease;
        }

        .clear-date-btn:hover {
          background: #fee2e2;
          color: #dc2626;
          border-color: #fecaca;
        }

        .date-picker-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 270px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          z-index: 100;
          padding: 8px;
          animation: dropFade 0.15s ease;
        }

        @keyframes dropFade {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .preset-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .preset-btn {
          width: 100%;
          text-align: left;
          padding: 7px 10px;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-size: 13px;
          color: #334155;
          cursor: pointer;
          transition: background 0.15s;
          font-family: inherit;
        }

        .preset-btn:hover {
          background-color: #f1f5f9;
        }

        .preset-btn.selected {
          background-color: #0c0d0e;
          color: #ffffff;
          font-weight: 600;
        }

        .custom-range-box {
          border-top: 1px solid #f1f5f9;
          margin-top: 8px;
          padding-top: 8px;
        }

        .custom-range-title {
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
          padding-left: 4px;
        }

        .custom-inputs {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
        }

        .custom-date-input {
          flex: 1;
          font-size: 11.5px;
          padding: 4px 6px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          outline: none;
          font-family: inherit;
        }

        .apply-custom-btn {
          width: 100%;
          padding: 6px;
          border-radius: 6px;
          border: none;
          background-color: #0c0d0e;
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s;
        }

        .apply-custom-btn:hover {
          opacity: 0.9;
        }

        /* Controls row: Tabs and Search */
        .enquiries-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }

        .tab-pill-group {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .tab-pill {
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          color: #0c0d0e;
          font-family: inherit;
        }

        .tab-pill:hover {
          background-color: #f8fafc;
        }

        .tab-pill.active {
          background-color: #0c0d0e;
          color: #ffffff;
          border-color: #0c0d0e;
        }

        .search-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          min-width: 260px;
        }

        .search-input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 13px;
          color: #0c0d0e;
          width: 100%;
          font-family: inherit;
        }

        /* Table */
        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .enquiries-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 13.5px;
        }

        .enquiries-table th {
          padding: 12px 14px;
          text-align: left;
          font-size: 12.5px;
          font-weight: 600;
          color: #0c0d0e;
          border-bottom: 1px solid #f1f5f9;
          white-space: nowrap;
          background: #fafafa;
        }

        .enquiries-table th:first-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        .enquiries-table th:last-child {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }

        .enquiries-table td {
          padding: 16px 14px;
          border-bottom: 1px solid #f8fafc;
          color: #334155;
          vertical-align: middle;
        }

        .enquiries-table tr:hover td {
          background-color: #fafbfc;
        }

        .cell-num {
          color: #94a3b8;
          font-size: 13px;
        }

        .cell-name-bold {
          font-weight: 700;
          color: #0c0d0e;
          white-space: nowrap;
        }

        .cell-email {
          color: #334155;
          word-break: break-all;
        }

        .cell-mobile {
          color: #334155;
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }

        .cell-location {
          color: #334155;
          white-space: nowrap;
        }

        .cell-date {
          color: #334155;
          white-space: nowrap;
          font-size: 13px;
          font-variant-numeric: tabular-nums;
        }

        /* Status Pills matching screenshot */
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 11px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .status-new {
          background-color: #ecfdf5;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }

        .dot-new {
          background-color: #16a34a;
        }

        .status-viewed {
          background-color: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
        }

        .dot-viewed {
          background-color: #2563eb;
        }

        /* Action View Button */
        .btn-action-view {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 18px;
          border-radius: 999px;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          color: #0c0d0e;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: inherit;
        }

        .btn-action-view:hover {
          background-color: #0c0d0e;
          color: #ffffff;
          border-color: #0c0d0e;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Modal Details Styles */
        .details-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalOverlayIn 0.2s ease forwards;
        }

        @keyframes modalOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .details-modal-card {
          background: #ffffff;
          border-radius: 20px;
          max-width: 620px;
          width: 100%;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          animation: modalCardIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          display: flex;
          flex-direction: column;
          max-height: 90vh;
        }

        @keyframes modalCardIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .details-modal-header {
          padding: 22px 26px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
        }

        .candidate-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #0c0d0e;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
          flex-shrink: 0;
        }

        .recruiter-avatar {
          background: #f1f5f9;
        }

        .modal-candidate-name {
          font-size: 18px;
          font-weight: 800;
          color: #0c0d0e;
          margin: 0;
        }

        .modal-candidate-role {
          font-size: 13px;
          color: #64748b;
          margin: 2px 0 0;
        }

        .modal-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }

        .modal-close-btn:hover {
          background: #f1f5f9;
          color: #0c0d0e;
        }

        .details-modal-body {
          padding: 24px 26px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .detail-field {
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 10px;
          padding: 12px 14px;
        }

        .detail-field.full-width {
          grid-column: 1 / -1;
        }

        .field-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 4px;
        }

        .field-value {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          word-break: break-all;
        }

        .field-value.link {
          color: #2563eb;
          text-decoration: none;
        }

        .field-value.link:hover {
          text-decoration: underline;
        }

        /* Resume Section Card */
        .resume-section-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
        }

        .resume-card-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .resume-icon-badge {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .resume-file-title {
          font-size: 14px;
          font-weight: 700;
          color: #0c0d0e;
          margin: 0 0 2px;
        }

        .resume-file-meta {
          font-size: 12px;
          color: #64748b;
        }

        .resume-card-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-download-resume {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background-color: #0c0d0e;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
          font-family: inherit;
        }

        .btn-download-resume:hover {
          background-color: #27272a;
        }

        .details-modal-footer {
          padding: 16px 26px;
          border-top: 1px solid #f1f5f9;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }

        @media (max-width: 768px) {
          .enquiries-card {
            padding: 18px 16px;
          }
          .details-grid {
            grid-template-columns: 1fr;
          }
          .resume-section-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .btn-download-resume {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}
