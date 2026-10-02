import React from 'react'
import { ArrowRight } from 'lucide-react'

interface CallToActionProps {
  onJoinCandidate: () => void
  onRegisterRecruiter: () => void
}

export const CallToAction: React.FC<CallToActionProps> = ({
  onJoinCandidate,
  onRegisterRecruiter
}) => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box reveal-scale">
          {/* Left Text */}
          <div className="cta-text-wrapper">
            <span className="section-kicker">BE A PART OF PROXHIRE</span>
            <h2 className="cta-heading">Let's Build Better Opportunities Together</h2>
            <p className="cta-sub">
              Whether you are looking for your next opportunity or the right talent for your team, ProxHire is here to support your journey.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="cta-buttons">
            <button
              type="button"
              className="btn btn-primary cta-btn"
              onClick={onJoinCandidate}
            >
              <span>Join as Candidate</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="btn btn-outline cta-btn"
              onClick={onRegisterRecruiter}
            >
              <span>Register as Recruiter</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .cta-section {
          padding: 10px 0 80px;
          background-color: #ffffff;
        }

        .cta-box {
          background-color: #f3f4f6;
          border-radius: 24px;
          padding: 48px 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .cta-text-wrapper {
          max-width: 580px;
        }

        .cta-heading {
          font-size: 28px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.02em;
          line-height: 1.25;
          margin-bottom: 12px;
        }

        .cta-sub {
          font-size: 14.5px;
          color: #475467;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .cta-btn {
          padding: 12px 26px;
          font-size: 14px;
        }

        @media (max-width: 960px) {
          .cta-section {
            padding: 10px 0 60px;
          }
          .cta-box {
            flex-direction: column;
            align-items: flex-start;
            padding: 36px 28px;
          }
          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }
          .cta-btn {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </section>
  )
}
