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
          {/* Left: Male Candidate Photo */}
          <div className="cand-reg-image-wrapper">
            <div className="cand-reg-image-card">
              <img
                src="/images/candidate_male_laptop.jpg"
                alt="Candidate preparing for career opportunity"
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
          padding: 40px 0 80px;
          background-color: #ffffff;
        }

        .cand-register-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 60px;
          align-items: center;
        }

        .cand-reg-image-wrapper {
          display: flex;
          justify-content: center;
        }

        .cand-reg-image-card {
          width: 100%;
          max-width: 480px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.1);
          border: 1px solid #f0f0f4;
        }

        .cand-reg-photo {
          width: 100%;
          height: 100%;
          max-height: 420px;
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
        }
      `}</style>
    </section>
  )
}
