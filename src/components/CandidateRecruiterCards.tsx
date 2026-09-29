import React from 'react'
import { ArrowRight } from 'lucide-react'

interface CandidateRecruiterCardsProps {
  onJoinCandidate: () => void
  onRegisterRecruiter: () => void
}

export const CandidateRecruiterCards: React.FC<CandidateRecruiterCardsProps> = ({
  onJoinCandidate,
  onRegisterRecruiter
}) => {
  return (
    <section className="audience-section">
      <div className="container">
        <div className="audience-grid">
          {/* Card 1: For Candidates */}
          <div id="for-candidates" className="audience-card">
            <div className="audience-content">
              <span className="section-kicker">FOR CANDIDATES</span>
              <h3 className="audience-title">Discover Genuine Opportunities</h3>
              <p className="audience-text">
                Find relevant job opportunities, create your professional profile, and connect with trusted employers through one simple platform.
              </p>
              <div className="audience-btn-wrap">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onJoinCandidate}
                >
                  <span>Join as Candidate</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            <div className="audience-image-box">
              <img
                src="/images/candidate_woman.jpg"
                alt="Candidate discovering opportunities"
                className="audience-img"
              />
            </div>
          </div>

          {/* Card 2: For Recruiters */}
          <div id="for-recruiters" className="audience-card">
            <div className="audience-content">
              <span className="section-kicker">FOR RECRUITERS</span>
              <h3 className="audience-title">Find Relevant Talent Faster</h3>
              <p className="audience-text">
                Build your talent pipeline, connect with verified candidates, and simplify your hiring process.
              </p>
              <div className="audience-btn-wrap">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={onRegisterRecruiter}
                >
                  <span>Register as Recruiter</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            <div className="audience-image-box">
              <img
                src="/images/recruiter_man.jpg"
                alt="Recruiter finding top talent"
                className="audience-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .audience-section {
          padding: 30px 0 80px;
          background-color: #ffffff;
        }

        .audience-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        .audience-card {
          background-color: #f9f9fb;
          border: 1px solid #f0f0f4;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .audience-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 36px -12px rgba(0, 0, 0, 0.08);
          border-color: #e4e4e7;
        }

        .audience-content {
          padding: 36px 28px;
          flex: 1.1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .audience-title {
          font-size: 26px;
          font-weight: 800;
          color: #0c0d0e;
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .audience-text {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .audience-btn-wrap {
          margin-top: auto;
        }

        .audience-image-box {
          flex: 0.9;
          position: relative;
          min-height: 240px;
          overflow: hidden;
        }

        .audience-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s ease;
        }

        .audience-card:hover .audience-img {
          transform: scale(1.04);
        }

        @media (max-width: 960px) {
          .audience-grid {
            grid-template-columns: 1fr;
          }
          .audience-card {
            flex-direction: column;
          }
          .audience-image-box {
            height: 260px;
          }
        }
      `}</style>
    </section>
  )
}
