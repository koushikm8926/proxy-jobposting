import React from 'react'
import {
  X,
  ShieldCheck,
  Bookmark,
  ArrowRight
} from 'lucide-react'
import type { JobListing } from '../../types/user'

interface JobDetailsModalProps {
  job: JobListing | null
  isOpen: boolean
  isSaved?: boolean
  onClose: () => void
  onToggleSave?: (jobId: string) => void
  onApply: (job: JobListing) => void
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  isOpen,
  isSaved = false,
  onClose,
  onToggleSave,
  onApply
}) => {
  if (!isOpen || !job) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          border: '1px solid #e2e8f0'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '24px 28px 20px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            backgroundColor: '#ffffff',
            zIndex: 10
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}
              >
                {job.category}
              </span>
              <span
                style={{
                  backgroundColor: '#dcfce7',
                  color: '#166534',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ShieldCheck size={13} /> Verified Employer ✓
              </span>
              {job.isFeatured && (
                <span
                  style={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  Featured
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
              {job.title}
            </h2>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#475569', margin: 0 }}>
              {job.companyName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#f1f5f9',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px' }}>
          {/* PRD Page 8: Basic Information Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              padding: '16px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              marginBottom: '24px'
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                LOCATION
              </span>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '4px 0 0' }}>
                {job.location}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                SALARY RANGE
              </span>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '4px 0 0' }}>
                {job.salary}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                EXPERIENCE
              </span>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '4px 0 0' }}>
                {job.experience}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                WORK MODE & TYPE
              </span>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '4px 0 0' }}>
                {job.workMode} • {job.jobType}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                VACANCIES
              </span>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '4px 0 0' }}>
                {job.vacancies} Positions
              </p>
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                BGV RECOGNITION
              </span>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#16a34a', margin: '4px 0 0' }}>
                100% Verified Only
              </p>
            </div>
          </div>

          {/* PRD Page 8: Job Description */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              About the Role
            </h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#334155', margin: 0 }}>
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Key Responsibilities
              </h4>
              <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#334155', whiteSpace: 'pre-line' }}>
                {job.responsibilities}
              </div>
            </div>
          )}

          {/* Required Skills */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
              Required Skills & Competencies
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {job.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: '13px',
                    padding: '6px 12px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '8px',
                    color: '#0f172a',
                    fontWeight: 600
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* PRD Page 9 Action Footer: [APPLY NOW] & [SAVE JOB] */}
        <div
          style={{
            padding: '20px 28px',
            borderTop: '1px solid #f1f5f9',
            backgroundColor: '#ffffff',
            position: 'sticky',
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <button
            type="button"
            onClick={() => onToggleSave?.(job.id)}
            style={{
              padding: '12px 20px',
              borderRadius: '10px',
              border: '1.5px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: isSaved ? '#0f172a' : '#475569',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Bookmark size={16} fill={isSaved ? '#0f172a' : 'none'} />
            {isSaved ? 'Saved Job' : 'Save Job'}
          </button>

          <button
            type="button"
            onClick={() => onApply(job)}
            style={{
              flex: 1,
              backgroundColor: '#0f172a',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
            }}
          >
            Apply Now <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
