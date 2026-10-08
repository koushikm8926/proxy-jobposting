import React from 'react'
import { Search, MapPin, X, RotateCcw } from 'lucide-react'
import { BENGALURU_LOCALITIES, JOB_CATEGORIES_LIST } from '../../constants/bengaluruJobs'

export interface FilterState {
  keyword: string
  locality: string
  category: string
  experience: string
  workMode: string
}

interface JobFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onReset: () => void
  totalCount: number
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalCount
}) => {
  const isFiltered =
    Boolean(filters.keyword) ||
    filters.locality !== 'All Bengaluru' ||
    filters.category !== 'All Categories' ||
    filters.experience !== 'All Experience' ||
    filters.workMode !== 'All Work Modes'

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)',
        marginBottom: '28px'
      }}
    >
      {/* Top Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <div
          style={{
            flex: '1 1 300px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            border: '1.5px solid #e2e8f0',
            borderRadius: '10px',
            padding: '0 14px',
            gap: '10px'
          }}
        >
          <Search size={18} color="#64748b" />
          <input
            type="text"
            placeholder="Search job title, skills (e.g. CRM, Sales, Excel), or company..."
            value={filters.keyword}
            onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 0',
              border: 'none',
              background: 'none',
              fontSize: '14px',
              outline: 'none',
              color: '#0f172a'
            }}
          />
          {filters.keyword && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, keyword: '' })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Locality Quick Selector */}
        <div
          style={{
            flex: '0 1 240px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            border: '1.5px solid #e2e8f0',
            borderRadius: '10px',
            padding: '0 14px',
            gap: '8px'
          }}
        >
          <MapPin size={18} color="#64748b" />
          <select
            value={filters.locality}
            onChange={(e) => onChange({ ...filters, locality: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 0',
              border: 'none',
              background: 'none',
              fontSize: '14px',
              outline: 'none',
              color: '#0f172a',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {BENGALURU_LOCALITIES.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Second Row: Detailed Facets */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid #f1f5f9'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          {/* Category Facet */}
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: filters.category !== 'All Categories' ? '#0f172a' : '#ffffff',
              color: filters.category !== 'All Categories' ? '#ffffff' : '#475569',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {JOB_CATEGORIES_LIST.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Experience Facet */}
          <select
            value={filters.experience}
            onChange={(e) => onChange({ ...filters, experience: e.target.value })}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: filters.experience !== 'All Experience' ? '#0f172a' : '#ffffff',
              color: filters.experience !== 'All Experience' ? '#ffffff' : '#475569',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <option value="All Experience">All Experience</option>
            <option value="Fresher">Freshers / Entry Level</option>
            <option value="1 - 3">1 - 3 Years</option>
            <option value="3 - 5">3 - 5 Years</option>
          </select>

          {/* Work Mode Facet */}
          <select
            value={filters.workMode}
            onChange={(e) => onChange({ ...filters, workMode: e.target.value })}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: filters.workMode !== 'All Work Modes' ? '#0f172a' : '#ffffff',
              color: filters.workMode !== 'All Work Modes' ? '#ffffff' : '#475569',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <option value="All Work Modes">All Work Modes</option>
            <option value="In-Office">In-Office</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>

          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#fee2e2',
                color: '#b91c1c',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={12} /> Clear Filters
            </button>
          )}
        </div>

        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
          {totalCount} {totalCount === 1 ? 'verified job' : 'verified jobs'} available
        </span>
      </div>
    </div>
  )
}
