import React from 'react'
import { ArrowRight } from 'lucide-react'

interface CandidateRegisterCardProps {
  onJoinCandidate: () => void
}

export const CandidateRegisterCard: React.FC<CandidateRegisterCardProps> = ({
  onJoinCandidate
}) => {
  return (
    <section className="cand-register-section">
      <div className="container">
        <div className="cand-register-grid">
          {/* Left: Launch Your Career Journey Visual */}
          <div className="cand-reg-image-wrapper">
            <div className="cand-reg-image-card">
              <img
                src="/images/candidate_journey_hero.png"
                alt="Launch Your Career Journey - Start Your Career"
                className="cand-reg-photo"
              />
            </div>
          </div>

          {/* Right: Content & Action */}
          <div className="cand-reg-content">
            <span className="section-kicker">TAKE THE FIRST STEP</span>
            <h2 className="cand-reg-title">Register as a Candidate</h2>
            <p className="cand-reg-desc">
              Create your profile and let us connect you with relevant opportunities. Our team will get in touch with you when suitable openings are available.
            </p>
            <div className="cand-reg-btn-wrap">
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
          </div>
        </div>
      </div>

      <style>{`
        .cand-register-section {
          padding: 60px 0 90px;
          background-color: #ffffff;
        }

        .cand-register-grid {
          display: grid;
          grid-template-columns: minmax(420px, 1.15fr) minmax(340px, 0.85fr);
          gap: 56px;
          align-items: center;
        }

        .cand-reg-image-wrapper {
          display: flex;
          justify-content: flex-start;
          width: 100%;
        }

        .cand-reg-image-card {
          width: 100%;
          max-width: 620px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05);
          background-color: #0c0d0e;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }

        .cand-reg-image-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 60px -12px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.06);
        }

        .cand-reg-photo {
          width: 100%;
          height: auto;
          aspect-ratio: 1884 / 835;
          object-fit: cover;
          display: block;
        }

        .cand-reg-content {
          max-width: 500px;
        }

        .cand-reg-title {
          font-size: 36px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin: 12px 0 20px;
        }

        .cand-reg-desc {
          font-size: 15px;
          color: #475467;
          line-height: 1.65;
          margin-bottom: 32px;
        }

        @media (max-width: 960px) {
          .cand-register-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .cand-reg-image-wrapper {
            justify-content: center;
          }
          .cand-reg-image-card {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
