import React from 'react'
import { ArrowRight } from 'lucide-react'

interface FAQSplitCardsProps {
  onSelectCandidateFAQs: () => void
  onSelectRecruiterFAQs: () => void
}

export const FAQSplitCards: React.FC<FAQSplitCardsProps> = ({
  onSelectCandidateFAQs,
  onSelectRecruiterFAQs
}) => {
  return (
    <section className="faq-split-cards-section">
      <div className="container">
        <div className="faq-split-grid">
          {/* Card 1: For Candidates */}
          <div className="faq-audience-card">
            <div className="faq-audience-image-box">
              <img
                src="/images/faq/faq-candidate.jpg"
                alt="Candidate with questions"
                className="faq-audience-photo"
              />
            </div>
            <div className="faq-audience-info">
              <h3 className="faq-audience-title">For Candidates</h3>
              <p className="faq-audience-text">
                Have questions about registration, profile creation, or job opportunities?
              </p>
              <div>
                <button
                  type="button"
                  className="btn btn-primary faq-audience-btn"
                  onClick={onSelectCandidateFAQs}
                >
                  <span>View Candidate FAQs</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: For Recruiters */}
          <div className="faq-audience-card">
            <div className="faq-audience-info">
              <h3 className="faq-audience-title">For Recruiters</h3>
              <p className="faq-audience-text">
                Have questions about posting requirements, finding talent, or our hiring process?
              </p>
              <div>
                <button
                  type="button"
                  className="btn btn-primary faq-audience-btn"
                  onClick={onSelectRecruiterFAQs}
                >
                  <span>View Recruiter FAQs</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            <div className="faq-audience-image-box">
              <img
                src="/images/faq/faq-recruiter.jpg"
                alt="Recruiter with questions"
                className="faq-audience-photo"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .faq-split-cards-section {
          padding: 60px 0 80px;
          background-color: #ffffff;
        }

        .faq-split-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        .faq-audience-card {
          background-color: #f9f9fb;
          border: 1px solid #ebeef2;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 24px;
          gap: 24px;
          transition: all 0.25s ease;
        }

        .faq-audience-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.08);
          border-color: #e4e4e7;
          background-color: #ffffff;
        }

        .faq-audience-image-box {
          width: 150px;
          height: 180px;
          border-radius: 18px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .faq-audience-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .faq-audience-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .faq-audience-title {
          font-size: 22px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.015em;
          margin-bottom: 8px;
        }

        .faq-audience-text {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.55;
          margin-bottom: 20px;
        }

        .faq-audience-btn {
          padding: 10px 22px;
          font-size: 13px;
        }

        @media (max-width: 960px) {
          .faq-split-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .faq-audience-card {
            flex-direction: column;
            text-align: center;
          }
          .faq-audience-image-box {
            width: 100%;
            height: 200px;
          }
        }
      `}</style>
    </section>
  )
}
