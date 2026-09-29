import React from 'react'
import { Sparkles, User, Users, FileText, ShieldCheck, Headphones } from 'lucide-react'

export type FAQCategory =
  | 'general'
  | 'candidates'
  | 'recruiters'
  | 'registration'
  | 'privacy'
  | 'support'

interface FAQCategoriesFilterProps {
  activeCategory: FAQCategory
  onSelectCategory: (cat: FAQCategory) => void
}

export const FAQCategoriesFilter: React.FC<FAQCategoriesFilterProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  const categories: { id: FAQCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'general', label: 'General', icon: <Sparkles size={16} /> },
    { id: 'candidates', label: 'For Candidates', icon: <User size={16} /> },
    { id: 'recruiters', label: 'For Recruiters', icon: <Users size={16} /> },
    { id: 'registration', label: 'Registration', icon: <FileText size={16} /> },
    { id: 'privacy', label: 'Data & Privacy', icon: <ShieldCheck size={16} /> },
    { id: 'support', label: 'Support', icon: <Headphones size={16} /> },
  ]

  return (
    <section className="faq-categories-section">
      <div className="container">
        <div className="faq-tabs-row">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                className={`faq-tab-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span className="faq-tab-icon">{cat.icon}</span>
                <span className="faq-tab-label">{cat.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <style>{`
        .faq-categories-section {
          padding: 10px 0 40px;
          background-color: #ffffff;
        }

        .faq-tabs-row {
          display: flex;
          align-items: center;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 8px;
          scrollbar-width: none;
        }

        .faq-tabs-row::-webkit-scrollbar {
          display: none;
        }

        .faq-tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 9999px;
          font-size: 13.5px;
          font-weight: 600;
          background-color: #f4f4f7;
          color: #374151;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          white-space: nowrap;
          cursor: pointer;
        }

        .faq-tab-pill:hover {
          background-color: #e4e4e7;
          color: #0c0d0e;
        }

        .faq-tab-pill.active {
          background-color: #0c0d0e;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .faq-tab-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  )
}
