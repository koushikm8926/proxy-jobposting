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
    <section className="audience-section-fluid">
      <div className="audience-fluid-container">
        <div className="audience-grid-equal">
          {/* ================= Card 1: For Candidates ================= */}
          <div id="for-candidates" className="audience-card-split reveal-left">
            <div className="audience-card-content">
              <span className="audience-kicker">FOR CANDIDATES</span>
              <h3 className="audience-title">
                Discover Genuine<br />
                Opportunities
              </h3>
              <p className="audience-desc">
                Find relevant job opportunities, create your professional profile, and connect with trusted employers through one simple platform.
              </p>
              <div className="audience-btn-wrap">
                <button
                  type="button"
                  className="btn btn-primary audience-pill-btn audience-pill-black"
                  onClick={onJoinCandidate}
                >
                  <span>Join as Candidate</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="audience-image-container">
              <div className="image-fade-mask">
                <img
                  src="/images/home/candidate-card.png"
                  alt="Candidate discovering genuine job opportunities"
                  className="audience-feathered-photo"
                />
              </div>
            </div>
          </div>

          {/* ================= Card 2: For Recruiters ================= */}
          <div id="for-recruiters" className="audience-card-split reveal-right delay-150">
            <div className="audience-card-content">
              <span className="audience-kicker">FOR RECRUITERS</span>
              <h3 className="audience-title">
                Find Relevant<br />
                Talent Faster
              </h3>
              <p className="audience-desc">
                Build your talent pipeline, connect with verified candidates, and simplify your hiring process.
              </p>
              <div className="audience-btn-wrap">
                <button
                  type="button"
                  className="btn btn-outline audience-pill-btn audience-pill-outline"
                  onClick={onRegisterRecruiter}
                >
                  <span>Register as Recruiter</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="audience-image-container">
              <div className="image-fade-mask">
                <img
                  src="/images/home/recruiter-card.png"
                  alt="Recruiter connecting with verified talent"
                  className="audience-feathered-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .audience-section-fluid {
          padding: 10px 0 24px;
          background-color: #ffffff;
          width: 100%;
          box-sizing: border-box;
        }

        /* Covers the whole width of the screen equally */
        .audience-fluid-container {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 40px;
          box-sizing: border-box;
        }

        .audience-grid-equal {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          width: 100%;
          box-sizing: border-box;
        }

        .audience-card-split {
          position: relative;
          background-color: #fafafb;
          border: 1px solid #e5e7eb;
          border-radius: 28px;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          min-height: 290px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
        }

        .audience-card-split:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 36px -12px rgba(0, 0, 0, 0.08);
          border-color: #d4d4d8;
        }

        /* Content block on the left */
        .audience-card-content {
          flex: 1.15;
          padding: 40px 20px 40px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 2;
          position: relative;
        }

        .audience-kicker {
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #52525b;
          text-transform: uppercase;
          display: block;
          margin-bottom: 8px;
        }

        .audience-title {
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.15;
          color: #0c0d0e;
          margin: 0 0 14px;
        }

        .audience-desc {
          font-size: 14px;
          color: #52525b;
          line-height: 1.55;
          margin: 0 0 28px;
          max-width: 340px;
        }

        .audience-btn-wrap {
          margin-top: auto;
        }

        .audience-pill-btn {
          height: 46px;
          padding: 0 24px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .audience-pill-black {
          background-color: #0c0d0e;
          color: #ffffff;
          border: 1px solid #0c0d0e;
        }

        .audience-pill-black:hover {
          background-color: #27272a;
          transform: translateY(-1.5px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .audience-pill-outline {
          background-color: #ffffff;
          color: #0c0d0e;
          border: 1.5px solid #0c0d0e;
        }

        .audience-pill-outline:hover {
          background-color: #f4f4f5;
          transform: translateY(-1.5px);
        }

        /* Image block on the right with smooth left fade */
        .audience-image-container {
          flex: 0.95;
          position: relative;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          overflow: hidden;
        }

        .image-fade-mask {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          /* Dual smooth dissolving mask gradient */
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 12%, rgba(0, 0, 0, 0.75) 26%, #000000 42%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 12%, rgba(0, 0, 0, 0.75) 26%, #000000 42%);
        }

        .audience-feathered-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right center;
          display: block;
          transition: transform 0.4s ease;
        }

        .audience-card-split:hover .audience-feathered-photo {
          transform: scale(1.03);
        }

        @media (max-width: 1100px) {
          .audience-fluid-container {
            padding: 0 24px;
          }
          .audience-card-content {
            padding: 32px 16px 32px 28px;
          }
          .audience-title {
            font-size: 26px;
          }
        }

        @media (max-width: 900px) {
          .audience-section-fluid {
            padding: 10px 0 20px;
          }
          .audience-grid-equal {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .audience-card-split {
            min-height: auto;
          }
          .audience-title {
            font-size: 24px;
          }
          .audience-feathered-photo {
            max-height: 260px;
          }
        }

        @media (max-width: 580px) {
          .audience-fluid-container {
            padding: 0 16px;
          }
          .audience-card-split {
            flex-direction: column;
          }
          .audience-card-content {
            padding: 28px 20px;
          }
          .audience-image-container {
            width: 100%;
            height: 220px;
          }
          .image-fade-mask {
            -webkit-mask-image: none;
            mask-image: none;
          }
          .audience-feathered-photo {
            object-position: center top;
          }
        }
      `}</style>
    </section>
  )
}
