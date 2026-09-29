import React from 'react'
import { Search } from 'lucide-react'

interface FAQHeroProps {
  searchQuery: string
  onSearchChange: (q: string) => void
}

export const FAQHero: React.FC<FAQHeroProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <section
      id="faq-hero"
      style={{
        position: 'relative',
        paddingTop: '32px',
        paddingBottom: '50px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="faq-hero-grid">
          {/* Left Column */}
          <div className="faq-hero-content">
            <span className="section-kicker" style={{ color: '#52525b', letterSpacing: '0.18em' }}>
              FREQUENTLY ASKED QUESTIONS
            </span>

            <h1 className="faq-hero-heading">
              Find Answers<br />
              to Your Questions
            </h1>

            <p className="faq-hero-desc">
              Everything you need to know about Proxy, our registration process, how it works, and what to expect next.
            </p>

            {/* Search Box */}
            <div className="faq-search-box">
              <Search size={18} className="faq-search-icon" />
              <input
                type="text"
                placeholder="Search your question here..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="faq-search-input"
              />
            </div>
          </div>

          {/* Right Column: Visual with Script */}
          <div className="faq-hero-visual-wrap">
            <div className="faq-hero-card">
              <img
                src="/images/faq_hero_woman.jpg"
                alt="Proxy customer seeking answers"
                className="faq-hero-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .faq-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
          min-height: 400px;
        }

        .faq-hero-content {
          max-width: 540px;
        }

        .faq-hero-heading {
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.08;
          color: #0c0d0e;
          margin: 16px 0 20px;
        }

        .faq-hero-desc {
          font-size: 16px;
          color: #475467;
          line-height: 1.6;
          margin-bottom: 28px;
          max-width: 480px;
        }

        .faq-search-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: #ffffff;
          border: 1px solid #d4d4d8;
          border-radius: 9999px;
          padding: 12px 20px;
          max-width: 460px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .faq-search-box:focus-within {
          border-color: #0c0d0e;
          box-shadow: 0 0 0 3px rgba(12, 13, 14, 0.08);
        }

        .faq-search-icon {
          color: #71717a;
          flex-shrink: 0;
        }

        .faq-search-input {
          border: none;
          outline: none;
          width: 100%;
          font-family: inherit;
          font-size: 14.5px;
          color: #0c0d0e;
          background: transparent;
        }

        .faq-hero-visual-wrap {
          display: flex;
          justify-content: center;
        }

        .faq-hero-card {
          position: relative;
          width: 100%;
          max-width: 480px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.12);
        }

        .faq-hero-img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 960px) {
          .faq-hero-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .faq-hero-heading {
            font-size: 40px;
          }
          .faq-hero-img {
            height: 280px;
          }
        }
      `}</style>
    </section>
  )
}
