import React from 'react'
import { ArrowRight, MapPin, Users } from 'lucide-react'

interface HeroProps {
  onFindJobs: () => void
  onHireTalent: () => void
}

export const Hero: React.FC<HeroProps> = ({ onFindJobs, onHireTalent }) => {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        paddingTop: '32px',
        paddingBottom: '80px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
      }}
    >
      {/* Subtle background ambient curved wave */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(240, 242, 245, 0.7) 0%, transparent 60%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid">
          {/* Left Column: Hero Text & Actions */}
          <div className="hero-content">
            <span className="section-kicker" style={{ color: '#52525b', letterSpacing: '0.18em' }}>
              THE DESIRE TO ACHIEVE
            </span>

            <h1 className="hero-heading">
              <span className="brand-bold">PROXY</span>
              <span className="brand-tagline">The Desire to Achieve.</span>
            </h1>

            <p className="hero-desc">
              Connecting candidates with opportunities and recruiters with the talent they need.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-primary btn-hero"
                onClick={onFindJobs}
              >
                <span>Find Jobs</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="btn btn-outline btn-hero"
                onClick={onHireTalent}
              >
                <span>Hire Talent</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Launching in Bengaluru Badge */}
            <div className="launch-badge">
              <div className="launch-icon-wrapper">
                <MapPin size={18} className="launch-icon" />
              </div>
              <div className="launch-text">
                <span className="launch-title">Launching in Bengaluru</span>
                <span className="launch-subtitle">Building a recruitment ecosystem across India.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Floating Badges */}
          <div className="hero-visual-wrapper">
            <div className="hero-image-card">
              <img
                src="/images/hero_professionals.jpg"
                alt="Proxy corporate professionals in Bengaluru"
                className="hero-img"
              />

              {/* Handwritten Floating Text on top-right */}
              <div className="hero-handwritten-badge">
                <span className="hw-line">People</span>
                <span className="hw-line">Opportunities</span>
                <span className="hw-line">Growth</span>
                <span className="hw-line">Together</span>
              </div>

              {/* Frosted Dark Floating Pill Badge at bottom */}
              <div className="hero-floating-glass-card">
                <div className="glass-icon-circle">
                  <Users size={18} color="#ffffff" />
                </div>
                <div className="glass-text">
                  A trusted recruitment platform for a brighter tomorrow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          min-height: 520px;
        }

        .hero-content {
          max-width: 520px;
        }

        .hero-heading {
          margin: 12px 0 20px;
          display: flex;
          flex-direction: column;
        }

        .brand-bold {
          font-size: 64px;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.95;
          color: #0c0d0e;
        }

        .brand-tagline {
          font-size: 28px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #18181b;
          margin-top: 8px;
        }

        .hero-desc {
          font-size: 16px;
          color: #475467;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
        }

        .btn-hero {
          padding: 12px 28px;
          font-size: 15px;
        }

        .launch-badge {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .launch-icon-wrapper {
          color: #0c0d0e;
          padding-top: 2px;
        }

        .launch-text {
          display: flex;
          flex-direction: column;
        }

        .launch-title {
          font-size: 14px;
          font-weight: 700;
          color: #0c0d0e;
        }

        .launch-subtitle {
          font-size: 13px;
          color: #64748b;
          margin-top: 2px;
        }

        /* Right Visual */
        .hero-visual-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .hero-image-card {
          position: relative;
          width: 100%;
          max-width: 520px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.12);
        }

        .hero-img {
          width: 100%;
          height: 480px;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-image-card:hover .hero-img {
          transform: scale(1.02);
        }

        /* Handwritten script accent */
        .hero-handwritten-badge {
          position: absolute;
          top: 28px;
          right: 28px;
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
        }

        .hero-floating-glass-card {
          position: absolute;
          bottom: 24px;
          left: 20px;
          right: 20px;
          background: rgba(30, 41, 59, 0.88);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25);
        }

        .glass-icon-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .glass-text {
          font-size: 13px;
          font-weight: 500;
          color: #ffffff;
          letter-spacing: -0.01em;
          line-height: 1.4;
        }

        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-content {
            max-width: 100%;
          }
          .brand-bold {
            font-size: 48px;
          }
          .brand-tagline {
            font-size: 24px;
          }
          .hero-img {
            height: 380px;
          }
        }
      `}</style>
    </section>
  )
}
