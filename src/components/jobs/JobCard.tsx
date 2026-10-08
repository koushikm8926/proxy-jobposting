import React from 'react'
import {
  MapPin,
  Briefcase,
  Building2,
  Bookmark,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react'
import type { JobListing } from '../../types/user'

interface JobCardProps {
  job: JobListing
  isSaved?: boolean
  onToggleSave?: (jobId: string) => void
  onSelect: (job: JobListing) => void
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved = false,
  onToggleSave,
  onSelect
}) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: job.isFeatured ? '1.5px solid #0f172a' : '1px solid #e2e8f0',
        padding: '24px',
        boxShadow: job.isFeatured
          ? '0 10px 25px -5px rgba(15, 23, 42, 0.08)'
          : '0 2px 4px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}
      onClick={() => onSelect(job)}
    >
      <div>
        {/* Top Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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
            {job.isFeatured && (
              <span
                style={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Sparkles size={11} /> Featured
              </span>
            )}
            <span
              style={{
                color: '#16a34a',
                fontSize: '11px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <ShieldCheck size={13} /> Verified Employer ✓
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleSave?.(job.id)
            }}
            title={isSaved ? 'Saved to bookmarks' : 'Save job'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isSaved ? '#0f172a' : '#94a3b8',
              padding: '4px'
            }}
          >
            <Bookmark size={18} fill={isSaved ? '#0f172a' : 'none'} />
          </button>
        </div>

        {/* Job Title & Company */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 6px',
            lineHeight: 1.3
          }}
        >
          {job.title}
        </h3>
        <p
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#475569',
            margin: '0 0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Building2 size={15} color="#64748b" /> {job.companyName}
        </p>

        {/* Highlights Pill Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            marginBottom: '16px',
            fontSize: '13px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
            <MapPin size={14} color="#64748b" />
            <span style={{ fontWeight: 600 }}>{job.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f172a', fontWeight: 700 }}>
            <span>💰</span>
            <span>{job.salary}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
            <Briefcase size={14} color="#64748b" />
            <span>{job.experience}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569' }}>
            <Clock size={14} color="#64748b" />
            <span>{job.workMode} • {job.jobType}</span>
          </div>
        </div>

        {/* Skills Tag Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {job.requiredSkills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              style={{
                fontSize: '12px',
                padding: '3px 8px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                color: '#475569',
                fontWeight: 500
              }}
            >
              {skill}
            </span>
          ))}
          {job.requiredSkills.length > 3 && (
            <span style={{ fontSize: '11px', color: '#94a3b8', alignSelf: 'center' }}>
              +{job.requiredSkills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer Card Row */}
      <div
        style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span style={{ fontSize: '12px', color: '#64748b' }}>
          {job.vacancies} {job.vacancies === 1 ? 'opening' : 'openings'} • {job.applicantCount || 0} applicants
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(job)
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          View & Apply <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
