import React from 'react'
import { ArrowRight } from 'lucide-react'

interface RecruiterBannerCTAProps {
  onRegister: () => void
}

export const RecruiterBannerCTA: React.FC<RecruiterBannerCTAProps> = ({ onRegister }) => {
  return (
    <section className="rec-cta-section">
      <div className="container">
        <div className="rec-cta-box">
          {/* Left Text */}
          <div className="rec-cta-content">
            <span className="section-kicker">READY TO HIRE?</span>
            <h2 className="rec-cta-title">Register as a Recruiter Today</h2>
            <p className="rec-cta-desc">
              Take the first step towards building your dream team. Share your company details and our team will get in touch with you.
            </p>
          </div>

          {/* Right Action Button */}
          <div className="rec-cta-action">
            <button
              type="button"
              className="btn btn-primary rec-cta-btn"
              onClick={onRegister}
            >
              <span>Register as a Recruiter</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .rec-cta-section {
          padding: 30px 0 70px;
          background-color: #ffffff;
        }

        .rec-cta-box {
          background: linear-gradient(135deg, #f9f9fb 0%, #f1f2f6 100%);
          border: 1px solid #e4e7ec;
          border-radius: 24px;
          padding: 44px 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          position: relative;
          overflow: hidden;
        }

        .rec-cta-content {
          max-width: 580px;
        }

        .rec-cta-title {
          font-size: 28px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.02em;
          line-height: 1.25;
          margin-bottom: 10px;
        }

        .rec-cta-desc {
          font-size: 14.5px;
          color: #475467;
          line-height: 1.6;
        }

        .rec-cta-action {
          flex-shrink: 0;
        }

        .rec-cta-btn {
          padding: 12px 28px;
          font-size: 14.5px;
        }

        @media (max-width: 900px) {
          .rec-cta-box {
            flex-direction: column;
            align-items: flex-start;
            padding: 32px 24px;
          }
          .rec-cta-btn {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </section>
  )
}
