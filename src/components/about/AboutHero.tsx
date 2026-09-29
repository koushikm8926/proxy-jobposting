import React from 'react'
import { ArrowDown } from 'lucide-react'

interface AboutHeroProps {
  onScrollToStory: () => void
}

export const AboutHero: React.FC<AboutHeroProps> = ({ onScrollToStory }) => {
  return (
    <section
      id="about-hero"
      style={{
        position: 'relative',
        paddingTop: '32px',
        paddingBottom: '80px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="about-hero-grid">
          {/* Left Text Content */}
          <div className="about-hero-content">
            <span className="section-kicker" style={{ color: '#52525b', letterSpacing: '0.18em' }}>
              ABOUT US
            </span>

            <h1 className="about-hero-heading">
              Building a<br />
              Brighter Tomorrow<br />
              Through People
            </h1>

            <p className="about-hero-desc">
              Proxy is a recruitment platform designed to connect candidates and employers through a simple, trusted and technology-driven hiring experience.
            </p>

            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onScrollToStory}
                style={{ padding: '12px 28px', fontSize: '15px' }}
              >
                <span>Our Story</span>
                <ArrowDown size={16} />
              </button>
            </div>
          </div>

          {/* Right Visual with Script text */}
          <div className="about-hero-visual-wrapper">
            <div className="about-hero-card">
              <img
                src="/images/hero_professionals.jpg"
                alt="Proxy founders and corporate team"
                className="about-hero-img"
              />

              {/* Handwritten script badge on top-right */}
              <div className="about-handwritten-badge">
                <span className="hw-line">People</span>
                <span className="hw-line">Opportunities</span>
                <span className="hw-line">Growth</span>
                <span className="hw-line">Together</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
          min-height: 480px;
        }

        .about-hero-content {
          max-width: 540px;
          animation: heroSlideUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .about-hero-heading {
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.08;
          color: #0c0d0e;
          margin: 16px 0 24px;
        }

        .about-hero-desc {
          font-size: 16px;
          color: #475467;
          line-height: 1.6;
          margin-bottom: 36px;
          max-width: 480px;
        }

        .about-hero-visual-wrapper {
          display: flex;
          justify-content: center;
          animation: heroSlideRight 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.15s;
        }

        .about-hero-card {
          position: relative;
          width: 100%;
          max-width: 480px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.12);
        }

        .about-hero-img {
          width: 100%;
          height: 460px;
          object-fit: cover;
          object-position: center top;
        }

        .about-handwritten-badge {
          position: absolute;
          top: 24px;
          right: 24px;
          font-family: var(--font-script);
          font-size: 24px;
          line-height: 1.15;
          color: #1f2937;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
          pointer-events: none;
          transform: rotate(3deg);
          animation: floatBadgeSlow 4s ease-in-out infinite;
        }

        @media (max-width: 960px) {
          .about-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .about-hero-heading {
            font-size: 40px;
          }
          .about-hero-img {
            height: 360px;
          }
        }
      `}</style>
    </section>
  )
}
