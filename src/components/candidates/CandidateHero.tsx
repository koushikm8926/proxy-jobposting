import React from 'react'
import { ArrowRight, ShieldCheck, Briefcase, TrendingUp } from 'lucide-react'

interface CandidateHeroProps {
  onJoinCandidate: () => void
}

export const CandidateHero: React.FC<CandidateHeroProps> = ({ onJoinCandidate }) => {
  return (
    <section
      id="candidate-hero"
      style={{
        position: 'relative',
        paddingTop: '32px',
        paddingBottom: '80px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="cand-hero-grid">
          {/* Left Column */}
          <div className="cand-hero-content">
            <span className="section-kicker" style={{ color: '#52525b', letterSpacing: '0.18em' }}>
              FOR CANDIDATES
            </span>

            <h1 className="cand-hero-heading">
              Your Next<br />
              Opportunity<br />
              Starts Here.
            </h1>

            <p className="cand-hero-desc">
              Find genuine job opportunities, create your professional profile, and connect with trusted employers through one simple platform.
            </p>

            <div className="cand-hero-btn-wrap">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onJoinCandidate}
                style={{ padding: '12px 28px', fontSize: '15px' }}
              >
                <span>Join as a Candidate</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* 3 Horizontal Badges */}
            <div className="cand-hero-badges-row">
              <div className="cand-badge-item">
                <div className="cand-badge-icon">
                  <ShieldCheck size={18} color="#0c0d0e" strokeWidth={2.2} />
                </div>
                <div className="cand-badge-text">
                  <span>Verified</span>
                  <span>Employers</span>
                </div>
              </div>

              <div className="cand-badge-item">
                <div className="cand-badge-icon">
                  <Briefcase size={18} color="#0c0d0e" strokeWidth={2.2} />
                </div>
                <div className="cand-badge-text">
                  <span>Genuine</span>
                  <span>Opportunities</span>
                </div>
              </div>

              <div className="cand-badge-item">
                <div className="cand-badge-icon">
                  <TrendingUp size={18} color="#0c0d0e" strokeWidth={2.2} />
                </div>
                <div className="cand-badge-text">
                  <span>Career</span>
                  <span>Growth</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="cand-hero-visual-wrap">
            <div className="cand-hero-card">
              <img
                src="/images/candidate_page_hero.jpg"
                alt="Candidate aspiring for opportunities"
                className="cand-hero-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cand-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
          min-height: 480px;
        }

        .cand-hero-content {
          max-width: 540px;
        }

        .cand-hero-heading {
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.08;
          color: #0c0d0e;
          margin: 16px 0 20px;
        }

        .cand-hero-desc {
          font-size: 16px;
          color: #475467;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 480px;
        }

        .cand-hero-btn-wrap {
          margin-bottom: 40px;
        }

        .cand-hero-badges-row {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .cand-badge-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cand-badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cand-badge-text {
          display: flex;
          flex-direction: column;
          font-size: 13px;
          font-weight: 700;
          color: #0c0d0e;
          line-height: 1.25;
        }

        .cand-hero-visual-wrap {
          display: flex;
          justify-content: center;
        }

        .cand-hero-card {
          position: relative;
          width: 100%;
          max-width: 480px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.12);
        }

        .cand-hero-img {
          width: 100%;
          height: 460px;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 960px) {
          .cand-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .cand-hero-heading {
            font-size: 40px;
          }
          .cand-hero-img {
            height: 360px;
          }
        }
      `}</style>
    </section>
  )
}
