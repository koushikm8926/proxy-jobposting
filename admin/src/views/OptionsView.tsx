import React, { useState, useMemo } from 'react'
import {
  GraduationCap,
  Target,
  Briefcase,
  MapPin,
  Building2,
  Users,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  Sparkles
} from 'lucide-react'
import { useAdminFormOptions } from '../hooks/useAdminFormOptions'
import type { FormOptions } from '../types'

type OptionCategoryKey = keyof Omit<FormOptions, 'updatedAt'>

interface CategoryMeta {
  key: OptionCategoryKey
  title: string
  targetGroup: 'candidate' | 'recruiter'
  icon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties; color?: string }>
  description: string
  placeholder: string
  exampleText: string
}

const CATEGORIES: CategoryMeta[] = [
  {
    key: 'highestEducation',
    title: 'Candidate: Highest Education',
    targetGroup: 'candidate',
    icon: GraduationCap,
    description: 'Degrees and education qualifications available on the Candidate Registration form.',
    placeholder: 'e.g. M.Tech / M.S. or Ph.D',
    exampleText: 'Used by candidates to specify their highest degree.'
  },
  {
    key: 'preferredRole',
    title: 'Candidate: Preferred Job Role / Industry',
    targetGroup: 'candidate',
    icon: Target,
    description: 'Target job roles and industry tracks candidates can choose when joining.',
    placeholder: 'e.g. DevOps Engineer / SRE',
    exampleText: 'Categorizes candidates into relevant hiring pipelines.'
  },
  {
    key: 'workExperience',
    title: 'Candidate: Work Experience',
    targetGroup: 'candidate',
    icon: Briefcase,
    description: 'Experience tiers available in the candidate registration dropdown.',
    placeholder: 'e.g. 10+ Years (Leadership)',
    exampleText: 'Helps recruiters filter candidates by seniority.'
  },
  {
    key: 'currentLocation',
    title: 'Candidate: Location',
    targetGroup: 'candidate',
    icon: MapPin,
    description: 'Metropolitan cities and regions available for candidate location selection.',
    placeholder: 'e.g. Ahmedabad / Gujarat',
    exampleText: 'Allows matching candidates with regional job openings.'
  },
  {
    key: 'industry',
    title: 'Recruiter & Company: Industry',
    targetGroup: 'recruiter',
    icon: Building2,
    description: 'Industry sectors that recruiters and employers select when posting or registering.',
    placeholder: 'e.g. Fintech & Insurtech',
    exampleText: 'Displayed in Recruiter Registration and Company profiles.'
  },
  {
    key: 'companySize',
    title: 'Recruiter & Company: Company Size',
    targetGroup: 'recruiter',
    icon: Users,
    description: 'Employee headcount ranges available for hiring organizations.',
    placeholder: 'e.g. 1000+ employees (Global Enterprise)',
    exampleText: 'Used to filter and segment recruiter organizations.'
  }
]

export const OptionsView: React.FC = () => {
  const {
    options,
    loading,
    saving,
    statusMessage,
    updateCategory,
    resetToDefaults
  } = useAdminFormOptions()

  const [activeTab, setActiveTab] = useState<'all' | 'candidate' | 'recruiter'>('all')
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<OptionCategoryKey>('highestEducation')
  const [newItemValue, setNewItemValue] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<{ category: OptionCategoryKey; index: number; text: string } | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [actionNotice, setActionNotice] = useState<string | null>(null)

  const currentCategory = useMemo(() => {
    return CATEGORIES.find(c => c.key === selectedCategoryKey) || CATEGORIES[0]
  }, [selectedCategoryKey])

  const currentItems = useMemo(() => {
    return options[selectedCategoryKey] || []
  }, [options, selectedCategoryKey])

  const filteredItems = useMemo(() => {
    if (!searchFilter.trim()) return currentItems
    const q = searchFilter.toLowerCase().trim()
    return currentItems.filter(item => item.toLowerCase().includes(q))
  }, [currentItems, searchFilter])

  const notifyAction = (msg: string) => {
    setActionNotice(msg)
    setTimeout(() => {
      setActionNotice(null)
    }, 3000)
  }

  // Handle adding new item
  const handleAddItem = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const trimmed = newItemValue.trim()
    if (!trimmed) return

    if (currentItems.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      alert(`"${trimmed}" already exists in this category.`)
      return
    }

    const updated = [...currentItems, trimmed]
    updateCategory(selectedCategoryKey, updated)
    setNewItemValue('')
    notifyAction(`Added "${trimmed}" to ${currentCategory.title}`)
  }

  // Handle saving inline edit
  const handleSaveEdit = (index: number) => {
    const trimmed = editingValue.trim()
    if (!trimmed) return

    // If duplicate check (excluding itself)
    if (currentItems.some((item, i) => i !== index && item.toLowerCase() === trimmed.toLowerCase())) {
      alert(`"${trimmed}" already exists in this category.`)
      return
    }

    const updated = [...currentItems]
    updated[index] = trimmed
    updateCategory(selectedCategoryKey, updated)
    setEditingIndex(null)
    setEditingValue('')
    notifyAction(`Updated option to "${trimmed}"`)
  }

  // Handle deleting item
  const handleDeleteItem = (index: number) => {
    const itemToDelete = currentItems[index]
    const updated = currentItems.filter((_, i) => i !== index)
    updateCategory(selectedCategoryKey, updated)
    setDeleteConfirm(null)
    notifyAction(`Removed "${itemToDelete}"`)
  }

  // Move item up
  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const updated = [...currentItems]
    const temp = updated[index]
    updated[index] = updated[index - 1]
    updated[index - 1] = temp
    updateCategory(selectedCategoryKey, updated)
  }

  // Move item down
  const handleMoveDown = (index: number) => {
    if (index >= currentItems.length - 1) return
    const updated = [...currentItems]
    const temp = updated[index]
    updated[index] = updated[index + 1]
    updated[index + 1] = temp
    updateCategory(selectedCategoryKey, updated)
  }

  // Reset all to default confirmation
  const handleConfirmReset = async () => {
    setShowResetConfirm(false)
    await resetToDefaults()
    notifyAction('Reset all fields to system presets!')
  }

  const filteredCategories = useMemo(() => {
    if (activeTab === 'all') return CATEGORIES
    return CATEGORIES.filter(c => c.targetGroup === activeTab)
  }, [activeTab])

  if (loading) {
    return (
      <div className="options-view-loading">
        <div className="options-spinner" />
        <p>Loading field configuration…</p>
      </div>
    )
  }

  return (
    <div className="options-view-container">
      {/* Top Banner Alert / Notice */}
      {actionNotice && (
        <div className="options-notice-toast">
          <CheckCircle2 size={16} />
          <span>{actionNotice}</span>
        </div>
      )}

      {statusMessage && (
        <div className={`options-status-banner ${statusMessage.type}`}>
          {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Header Card */}
      <div className="options-header-card">
        <div className="header-info">
          <div className="header-icon-wrap">
            <Sliders size={24} color="#0c0d0e" />
          </div>
          <div>
            <h2 className="header-title">Portal Field & Dropdown Management</h2>
            <p className="header-desc">
              Control the dropdown selections for candidate qualifications, experience, location, and recruiter industry fields. Changes take effect on the registration forms immediately.
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="options-reset-btn"
            onClick={() => setShowResetConfirm(true)}
            title="Reset all categories to original defaults"
          >
            <RotateCcw size={15} />
            <span>Reset to Defaults</span>
          </button>
        </div>
      </div>

      {/* Target Group Filter Tabs */}
      <div className="options-tab-bar">
        <div className="tab-pills">
          <button
            type="button"
            className={`tab-pill ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Fields (6)
          </button>
          <button
            type="button"
            className={`tab-pill ${activeTab === 'candidate' ? 'active' : ''}`}
            onClick={() => setActiveTab('candidate')}
          >
            Candidate Fields (4)
          </button>
          <button
            type="button"
            className={`tab-pill ${activeTab === 'recruiter' ? 'active' : ''}`}
            onClick={() => setActiveTab('recruiter')}
          >
            Recruiter & Company Fields (2)
          </button>
        </div>

        <div className="live-sync-indicator">
          <span className={`sync-dot ${saving ? 'syncing' : 'synced'}`} />
          <span>{saving ? 'Syncing to Cloud…' : 'Live Sync Active'}</span>
        </div>
      </div>

      {/* Two-Column Layout: Left Category Selector, Right Options Manager */}
      <div className="options-grid-layout">
        {/* Left Column: Category List */}
        <div className="categories-sidebar-card">
          <h3 className="section-label">Field Categories</h3>
          <div className="category-btn-list">
            {filteredCategories.map(cat => {
              const Icon = cat.icon
              const isSelected = cat.key === selectedCategoryKey
              const count = (options[cat.key] || []).length

              return (
                <button
                  key={cat.key}
                  type="button"
                  className={`category-item-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategoryKey(cat.key)
                    setEditingIndex(null)
                    setSearchFilter('')
                  }}
                >
                  <div className="cat-icon-box">
                    <Icon size={18} />
                  </div>
                  <div className="cat-text-box">
                    <div className="cat-title">{cat.title.replace(/^(Candidate|Recruiter & Company): /, '')}</div>
                    <div className="cat-meta-tag">{cat.targetGroup === 'candidate' ? 'Candidate' : 'Recruiter'}</div>
                  </div>
                  <span className="cat-count-badge">{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column: Selected Category Manager */}
        <div className="options-manager-card">
          {/* Header for Current Category */}
          <div className="manager-header">
            <div className="manager-title-row">
              <div className="manager-icon-badge">
                <currentCategory.icon size={22} color="#0c0d0e" />
              </div>
              <div>
                <h3 className="manager-title">{currentCategory.title}</h3>
                <p className="manager-desc">{currentCategory.description}</p>
              </div>
            </div>

            <div className="manager-stat-badge">
              <strong>{currentItems.length}</strong> total options
            </div>
          </div>

          {/* Add Option Form */}
          <form className="add-option-form" onSubmit={handleAddItem}>
            <div className="add-input-wrap">
              <input
                type="text"
                className="add-option-input"
                placeholder={currentCategory.placeholder}
                value={newItemValue}
                onChange={e => setNewItemValue(e.target.value)}
                maxLength={80}
              />
              <button
                type="submit"
                className="add-option-btn"
                disabled={!newItemValue.trim() || saving}
              >
                <Plus size={16} />
                <span>Add Option</span>
              </button>
            </div>
            <span className="add-hint">
              <Sparkles size={13} /> {currentCategory.exampleText}
            </span>
          </form>

          {/* Search / Filter within this list if > 4 items */}
          {currentItems.length > 4 && (
            <div className="options-search-bar">
              <input
                type="text"
                placeholder={`Search among ${currentItems.length} ${currentCategory.title.toLowerCase()} options…`}
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="options-search-input"
              />
              {searchFilter && (
                <button
                  type="button"
                  onClick={() => setSearchFilter('')}
                  className="search-clear-btn"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {/* Options List */}
          <div className="options-list-wrapper">
            {filteredItems.length === 0 ? (
              <div className="options-empty-state">
                <p>No options found{searchFilter ? ` matching "${searchFilter}"` : ''}.</p>
                {searchFilter && (
                  <button
                    type="button"
                    className="reset-search-btn"
                    onClick={() => setSearchFilter('')}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <div className="options-items-list">
                {filteredItems.map((item) => {
                  const originalIndex = currentItems.indexOf(item)
                  const isEditing = editingIndex === originalIndex

                  return (
                    <div key={`${item}-${originalIndex}`} className={`option-item-row ${isEditing ? 'is-editing' : ''}`}>
                      <div className="item-order-badge">
                        #{originalIndex + 1 < 10 ? `0${originalIndex + 1}` : originalIndex + 1}
                      </div>

                      {isEditing ? (
                        <div className="item-edit-inline">
                          <input
                            type="text"
                            className="edit-inline-input"
                            value={editingValue}
                            onChange={e => setEditingValue(e.target.value)}
                            autoFocus
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleSaveEdit(originalIndex)
                              if (e.key === 'Escape') setEditingIndex(null)
                            }}
                          />
                          <button
                            type="button"
                            className="edit-save-btn"
                            onClick={() => handleSaveEdit(originalIndex)}
                            title="Save"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            type="button"
                            className="edit-cancel-btn"
                            onClick={() => setEditingIndex(null)}
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="item-content-text">
                          <span className="item-label">{item}</span>
                        </div>
                      )}

                      {!isEditing && (
                        <div className="item-actions">
                          {/* Reorder Buttons */}
                          <div className="reorder-group">
                            <button
                              type="button"
                              className="reorder-btn"
                              disabled={originalIndex === 0}
                              onClick={() => handleMoveUp(originalIndex)}
                              title="Move Up"
                              aria-label="Move Up"
                            >
                              <ChevronUp size={14} />
                            </button>
                            <button
                              type="button"
                              className="reorder-btn"
                              disabled={originalIndex === currentItems.length - 1}
                              onClick={() => handleMoveDown(originalIndex)}
                              title="Move Down"
                              aria-label="Move Down"
                            >
                              <ChevronDown size={14} />
                            </button>
                          </div>

                          {/* Edit Button */}
                          <button
                            type="button"
                            className="item-btn edit-btn"
                            onClick={() => {
                              setEditingIndex(originalIndex)
                              setEditingValue(item)
                            }}
                            title="Rename Option"
                          >
                            <Edit2 size={14} />
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            className="item-btn delete-btn"
                            onClick={() => setDeleteConfirm({
                              category: selectedCategoryKey,
                              index: originalIndex,
                              text: item
                            })}
                            title="Delete Option"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Interactive Live Preview Box */}
          <div className="live-preview-box">
            <div className="preview-header">
              <Eye size={16} color="#0c0d0e" />
              <span>Live Form Dropdown Preview</span>
            </div>
            <p className="preview-sub">
              This preview matches what visitors see on the public registration portal:
            </p>
            <div className="preview-field">
              <label className="preview-label">{currentCategory.title} *</label>
              <select className="preview-select" defaultValue="">
                <option value="">Select {currentCategory.title.replace(/^(Candidate|Recruiter & Company): /, '')}</option>
                {currentItems.map((opt, idx) => (
                  <option key={`${opt}-${idx}`} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-backdrop-overlay">
          <div className="confirm-modal-box">
            <div className="confirm-modal-icon delete-icon">
              <Trash2 size={24} color="#e11d48" />
            </div>
            <h4 className="confirm-modal-title">Delete Option?</h4>
            <p className="confirm-modal-desc">
              Are you sure you want to remove <strong>"{deleteConfirm.text}"</strong> from {currentCategory.title}?
              Existing candidates with this selection will not be altered, but new registrations will no longer see this option.
            </p>
            <div className="confirm-modal-actions">
              <button
                type="button"
                className="confirm-cancel-btn"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirm-delete-btn"
                onClick={() => handleDeleteItem(deleteConfirm.index)}
              >
                Delete Option
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-backdrop-overlay">
          <div className="confirm-modal-box">
            <div className="confirm-modal-icon reset-icon">
              <RotateCcw size={24} color="#f59e0b" />
            </div>
            <h4 className="confirm-modal-title">Reset to Default Options?</h4>
            <p className="confirm-modal-desc">
              This will reset all candidate and recruiter field options back to the original default lists. Any custom options you added will be overwritten.
            </p>
            <div className="confirm-modal-actions">
              <button
                type="button"
                className="confirm-cancel-btn"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirm-reset-btn"
                onClick={handleConfirmReset}
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
