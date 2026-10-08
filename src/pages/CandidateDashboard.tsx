import React, { useState, useEffect } from 'react'
import {
  User,
  Briefcase,
  MapPin,
  ShieldCheck,
  Search,
  Sparkles
} from 'lucide-react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import type { JobApplication, JobListing } from '../types/user'

interface CandidateDashboardProps {
  onBrowseJobs?: () => void
}

export const CandidateDashboard: React.FC<CandidateDashboardProps> = ({ onBrowseJobs }) => {
  const { user, candidateProfile, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'applications' | 'recommended' | 'saved' | 'profile'>('applications')
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)

  // Demo recommended jobs based on PRD Page 7
  const recommendedJobs: Partial<JobListing>[] = [
    {
      id: 'rec-1',
      title: 'Customer Support Executive',
      companyName: 'Zepto Express Ops',
      location: 'Koramangala, Bengaluru',
      salary: '₹18,000 – ₹25,000 / month',
      experience: '0 - 2 Years',
      jobType: 'Full-time',
      workMode: 'In-Office',
      category: 'Customer Support'
    },
    {
      id: 'rec-2',
      title: 'Sales & Business Development Associate',
      companyName: 'FinGrow Microfinance',
      location: 'HSR Layout, Bengaluru',
      salary: '₹20,000 – ₹30,000 / month',
      experience: '1 - 3 Years',
      jobType: 'Full-time',
      workMode: 'In-Office',
      category: 'Sales & BD'
    },
    {
      id: 'rec-3',
      title: 'IT Helpdesk Specialist',
      companyName: 'CloudOps Bengaluru',
      location: 'Whitefield, Bengaluru',
      salary: '₹25,000 – ₹35,000 / month',
      experience: '1 - 4 Years',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      category: 'IT Support'
    }
  ]

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return
      setLoading(true)
      try {
        const q = query(
          collection(db, 'applications'),
          where('candidateId', '==', user.uid)
        )
        const snap = await getDocs(q)
        const apps: JobApplication[] = []
        snap.forEach((doc) => {
          apps.push({ id: doc.id, ...doc.data() } as JobApplication)
        })
        setApplications(apps)
      } catch (err) {
        console.error('Error fetching candidate applications:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [user])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return { label: 'Applied', color: '#2563eb', bg: '#eff6ff' }
      case 'UNDER_REVIEW':
        return { label: 'Under Review', color: '#d97706', bg: '#fef3c7' }
      case 'SHORTLISTED':
        return { label: 'Shortlisted', color: '#059669', bg: '#ecfdf5' }
      case 'INTERVIEW':
        return { label: 'Interview Scheduled', color: '#7c3aed', bg: '#f5f3ff' }
      case 'HIRED':
        return { label: 'Selected / Hired 🎉', color: '#15803d', bg: '#dcfce7' }
      case 'REJECTED':
        return { label: 'Not Selected', color: '#dc2626', bg: '#fef2f2' }
      default:
        return { label: status, color: '#4b5563', bg: '#f3f4f6' }
    }
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '90vh', padding: '40px 16px' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        {/* Top Header Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '28px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            marginBottom: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 700
              }}
            >
              {candidateProfile?.fullName?.charAt(0) || user?.email?.charAt(0) || 'C'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Welcome, {candidateProfile?.fullName || 'Candidate'}!
                </h1>
                <span
                  style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ShieldCheck size={14} /> Basic BGV Verified
                </span>
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                {candidateProfile?.preferredRole || 'Job Seeker'} • {candidateProfile?.currentLocation || 'Bengaluru, Karnataka'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={onBrowseJobs}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '11px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Search size={16} /> Search Bengaluru Jobs
            </button>
            <button
              type="button"
              onClick={logout}
              style={{
                padding: '11px 18px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '14px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '2px solid #e2e8f0',
            marginBottom: '28px',
            overflowX: 'auto'
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('applications')}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              fontSize: '15px',
              fontWeight: activeTab === 'applications' ? 700 : 500,
              color: activeTab === 'applications' ? '#0f172a' : '#64748b',
              borderBottom: activeTab === 'applications' ? '2px solid #0f172a' : '2px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Briefcase size={16} />
            My Applications ({applications.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('recommended')}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              fontSize: '15px',
              fontWeight: activeTab === 'recommended' ? 700 : 500,
              color: activeTab === 'recommended' ? '#0f172a' : '#64748b',
              borderBottom: activeTab === 'recommended' ? '2px solid #0f172a' : '2px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={16} />
            Recommended Jobs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              fontSize: '15px',
              fontWeight: activeTab === 'profile' ? 700 : 500,
              color: activeTab === 'profile' ? '#0f172a' : '#64748b',
              borderBottom: activeTab === 'profile' ? '2px solid #0f172a' : '2px solid transparent',
              cursor: 'pointer',
              marginBottom: '-2px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <User size={16} />
            My Profile & BGV
          </button>
        </div>

        {/* TAB 1: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
                Loading your applications...
              </div>
            ) : applications.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '48px 24px',
                  textAlign: 'center',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#64748b'
                  }}
                >
                  <Briefcase size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  No Applications Submitted Yet
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '400px', margin: '0 auto 24px' }}>
                  You haven't applied to any job openings yet. Explore verified listings in Bengaluru and apply with 1 click!
                </p>
                <button
                  type="button"
                  onClick={onBrowseJobs}
                  style={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Browse Available Jobs
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {applications.map((app) => {
                  const badge = getStatusBadge(app.status)
                  return (
                    <div
                      key={app.id}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '14px',
                        padding: '24px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span
                            style={{
                              backgroundColor: badge.bg,
                              color: badge.color,
                              fontSize: '12px',
                              fontWeight: 700,
                              padding: '3px 10px',
                              borderRadius: '20px'
                            }}
                          >
                            {badge.label}
                          </span>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                            Applied on {app.appliedAt ? new Date(app.appliedAt?.toDate ? app.appliedAt.toDate() : app.appliedAt).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
                          {app.jobTitle}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{app.companyName}</span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={14} /> {app.location}
                          </span>
                        </p>
                      </div>

                      {/* Visual Pipeline Progress */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'HIRED'].map((step, idx) => {
                          const stages = ['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'HIRED']
                          const currentIdx = stages.indexOf(app.status)
                          const isDone = currentIdx >= idx
                          return (
                            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <div
                                style={{
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  backgroundColor: isDone ? '#10b981' : '#e2e8f0'
                                }}
                                title={step}
                              />
                              {idx < 4 && (
                                <div
                                  style={{
                                    width: '16px',
                                    height: '2px',
                                    backgroundColor: isDone && currentIdx > idx ? '#10b981' : '#e2e8f0'
                                  }}
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RECOMMENDED JOBS (PRD Page 7) */}
        {activeTab === 'recommended' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  padding: '24px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span
                      style={{
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {job.category}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#16a34a' }}>
                      Verified Employer ✓
                    </span>
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    {job.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#475569', marginBottom: '12px' }}>{job.companyName}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} /> {job.location}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#0f172a' }}>
                      <span>💰</span> {job.salary}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={onBrowseJobs}
                    style={{
                      flex: 1,
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      border: 'none',
                      padding: '9px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    View Details & Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: PROFILE & BGV */}
        {activeTab === 'profile' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Candidate Credentials & BGV</h2>
                <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                  Employers see your verified credentials directly when you apply.
                </p>
              </div>
              <div
                style={{
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  color: '#047857',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '13px'
                }}
              >
                <ShieldCheck size={18} /> Tier 1 Basic BGV Verified
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>FULL NAME</span>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                  {candidateProfile?.fullName || 'Not specified'}
                </p>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>CONTACT NUMBER</span>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                  {candidateProfile?.mobileNumber || user?.phoneNumber || 'Verified Phone'}
                </p>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>CURRENT CITY</span>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                  {candidateProfile?.currentLocation || 'Bengaluru, Karnataka'}
                </p>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>WORK EXPERIENCE</span>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                  {candidateProfile?.workExperience || '1 - 3 Years'}
                </p>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>HIGHEST EDUCATION</span>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                  {candidateProfile?.highestEducation || 'Graduate'}
                </p>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>PREFERRED ROLE</span>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                  {candidateProfile?.preferredRole || 'Customer Support'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
