import React, { useState } from 'react'
import { FAQHero } from '../components/faq/FAQHero'
import { FAQCategoriesFilter, type FAQCategory } from '../components/faq/FAQCategoriesFilter'
import { FAQAccordionList } from '../components/faq/FAQAccordionList'
import { FAQSidebar } from '../components/faq/FAQSidebar'
import { FAQSplitCards } from '../components/faq/FAQSplitCards'
import { Footer } from '../components/Footer'

interface FAQPageProps {
  onContactClick: () => void
}

export const FAQPage: React.FC<FAQPageProps> = ({ onContactClick }) => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('general')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSelectCandidateFAQs = () => {
    setActiveCategory('candidates')
    setSearchQuery('')
    window.scrollTo({ top: 380, behavior: 'smooth' })
  }

  const handleSelectRecruiterFAQs = () => {
    setActiveCategory('recruiters')
    setSearchQuery('')
    window.scrollTo({ top: 380, behavior: 'smooth' })
  }

  return (
    <div className="faq-page animate-fade-in">
      {/* 1. Hero with Real-Time Search Input */}
      <FAQHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Category Filter Pills */}
      <FAQCategoriesFilter
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat)
          setSearchQuery('')
        }}
      />

      {/* 3. Main FAQ Grid (Accordions on Left, Quick Contact on Right) */}
      <section className="faq-main-body-section">
        <div className="container">
          <div className="faq-body-grid">
            <div className="faq-main-col">
              <FAQAccordionList
                activeCategory={activeCategory}
                searchQuery={searchQuery}
              />
            </div>
            <div className="faq-sidebar-col">
              <FAQSidebar onContactClick={onContactClick} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Split Cards (Candidate FAQs / Recruiter FAQs) */}
      <FAQSplitCards
        onSelectCandidateFAQs={handleSelectCandidateFAQs}
        onSelectRecruiterFAQs={handleSelectRecruiterFAQs}
      />

      {/* 5. Footer */}
      <Footer variant="dark" />

      <style>{`
        .faq-main-body-section {
          padding-bottom: 20px;
          background-color: #ffffff;
        }

        .faq-body-grid {
          display: grid;
          grid-template-columns: 1.55fr 0.95fr;
          gap: 48px;
          align-items: flex-start;
        }

        @media (max-width: 960px) {
          .faq-body-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </div>
  )
}
