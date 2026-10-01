import React from 'react'
import { ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react'

interface RecruiterHeroProps {
  onRegister: () => void
}

export const RecruiterHero: React.FC<RecruiterHeroProps> = ({ onRegister }) => {
  return (
    <section
      id="recruiter-hero"
      style={{
        position: 'relative',
        paddingTop: '32px',
        paddingBottom: '80px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="rec-hero-grid">
          {/* Left Column */}
          <div className="rec-hero-content">
            <span className="section-kicker" style={{ color: '#52525b', letterSpacing: '0.18em' }}>
              FOR RECRUITERS
            </span>

            <h1 className="rec-hero-heading">
              Find the Right<br />
              Talent, Faster.
            </h1>

            <p className="rec-hero-desc">
              Build your talent pipeline, connect with verified candidates, and simplify your hiring process with ProxHire.
            </p>

            <div className="rec-hero-btn-wrap">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onRegister}
                style={{ padding: '12px 28px', fontSize: '15px' }}
              >
                <span>Register as a Recruiter</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* 3 Horizontal Feature Badges */}
            <div className="rec-hero-badges-row">
              <div className="rec-badge-item">
                <div className="rec-badge-icon">
                  <ShieldCheck size={18} color="#0c0d0e" strokeWidth={2.2} />
                </div>
                <div className="rec-badge-text">
                  <span>Verified</span>
                  <span>Candidates</span>
                </div>
              </div>

              <div className="rec-badge-item">
                <div className="rec-badge-icon">
                  <Zap size={18} color="#0c0d0e" strokeWidth={2.2} />
                </div>
                <div className="rec-badge-text">
                  <span>Simple</span>
                  <span>Process</span>
                </div>
              </div>

              <div className="rec-badge-item">
                <div className="rec-badge-icon">
                  <Users size={18} color="#0c0d0e" strokeWidth={2.2} />
                </div>
                <div className="rec-badge-text">
                  <span>Relevant</span>
                  <span>Talent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="rec-hero-visual-wrap">
            <div className="rec-hero-card">
              <img
                src="/images/recruiter_page_hero.jpg"
                alt="Recruiter finding top talent"
                className="rec-hero-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .rec-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
          min-height: 480px;
        }

        .rec-hero-content {
          max-width: 540px;
        }

        .rec-hero-heading {
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.08;
          color: #0c0d0e;
          margin: 16px 0 20px;
        }

        .rec-hero-desc {
          font-size: 16px;
          color: #475467;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 480px;
        }

        .rec-hero-btn-wrap {
          margin-bottom: 40px;
        }

        .rec-hero-badges-row {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .rec-badge-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .rec-badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rec-badge-text {
          display: flex;
          flex-direction: column;
          font-size: 13px;
          font-weight: 700;
          color: #0c0d0e;
          line-height: 1.25;
        }

        .rec-hero-visual-wrap {
          display: flex;
          justify-content: center;
        }

        .rec-hero-card {
          position: relative;
          width: 100%;
          max-width: 480px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.12);
        }

        .rec-hero-img {
          width: 100%;
          height: 460px;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 960px) {
          .rec-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .rec-hero-heading {
            font-size: 40px;
          }
          .rec-hero-img {
            height: 360px;
          }
        }
      `}</style>
    </section>
  )
}
