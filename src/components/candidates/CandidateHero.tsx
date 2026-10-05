import React from 'react'
import { ArrowRight, ShieldCheck, Briefcase, TrendingUp } from 'lucide-react'

interface CandidateHeroProps {
  onJoinCandidate: () => void
}

export const CandidateHero: React.FC<CandidateHeroProps> = ({ onJoinCandidate }) => {
  return (
    <section id="candidate-hero" className="cand-hero-root">
      {/* Subtle organic contour wave in top-left corner like Home Hero */}
      <div className="cand-contour-waves">
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="contour-svg"
        >
          <path
            d="M-50 40C60 40 120 90 140 160C160 230 220 270 320 270"
            stroke="rgba(0, 0, 0, 0.04)"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <path
            d="M-80 120C40 120 90 160 110 220C130 280 190 320 280 320"
            stroke="rgba(0, 0, 0, 0.025)"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="cand-container-fluid">
        {/* Left Side: Content & Actions */}
        <div className="cand-text-block">
          <span className="cand-kicker">FOR CANDIDATES</span>

          <h1 className="cand-main-title">
            Your Next<br />
            Opportunity<br />
            Starts Here.
          </h1>

          <p className="cand-paragraph">
            Find genuine job opportunities, create your professional profile, and connect with trusted employers through one simple platform.
          </p>

          <div className="cand-cta-group">
            <button
              type="button"
              className="btn btn-primary cand-pill-btn cand-pill-black"
              onClick={onJoinCandidate}
            >
              <span>Join as a Candidate</span>
              <ArrowRight size={17} />
            </button>
          </div>

          {/* 3 Horizontal Badges */}
          <div className="cand-badges-row">
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

        {/* Right Side: Panoramic Integrated Visual spanning to right screen edge */}
        <div className="cand-panoramic-visual">
          <img
            src="/images/candidates/candidate-hero.png"
            alt="ProxHire Candidate Career Dashboard Journey"
            className="cand-feathered-img"
          />
        </div>
      </div>

      <style>{`
        .cand-hero-root {
          position: relative;
          background-color: #ffffff;
          overflow: hidden;
          width: 100%;
          min-height: 520px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #f4f4f5;
        }

        .cand-contour-waves {
          position: absolute;
          top: 0;
          left: 0;
          width: 380px;
          height: 300px;
          pointer-events: none;
          z-index: 0;
          transform-origin: top left;
        }

        .contour-svg {
          width: 100%;
          height: 100%;
        }

        /* Fluid container with ZERO right margin/padding so visual touches right edge */
        .cand-container-fluid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.05fr 1.25fr;
          align-items: center;
          gap: 0;
          width: 100%;
          padding-left: clamp(16px, 5vw, 72px);
          padding-right: 0;
          box-sizing: border-box;
        }

        /* Left Content */
        .cand-text-block {
          max-width: 520px;
          padding-top: 40px;
          padding-bottom: 48px;
          padding-right: 32px;
        }

        .cand-kicker {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #52525b;
          text-transform: uppercase;
          display: block;
          margin-bottom: 12px;
        }

        .cand-main-title {
          font-size: 58px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.08;
          color: #0c0d0e;
          margin: 0 0 20px;
        }

        .cand-paragraph {
          font-size: 16px;
          color: #475467;
          line-height: 1.6;
          margin: 0 0 32px;
          max-width: 460px;
        }

        .cand-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
        }

        .cand-pill-btn {
          height: 48px;
          padding: 0 28px;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cand-pill-black {
          background-color: #0c0d0e;
          color: #ffffff;
          border: 1px solid #0c0d0e;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
        }

        .cand-pill-black:hover {
          background-color: #27272a;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        /* 3 Badges Row */
        .cand-badges-row {
          display: flex;
          align-items: center;
          gap: 28px;
          padding-top: 8px;
          border-top: 1px solid #f4f4f6;
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

        /* Right Panoramic Visual: 100% Flush to the Right Edge of the Screen with Smooth Fade */
        .cand-panoramic-visual {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          height: 100%;
          min-height: 520px;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #ffffff;
        }

        .cand-feathered-img {
          width: 100%;
          height: 100%;
          min-height: 520px;
          max-height: 580px;
          object-fit: cover;
          object-position: center;
          display: block;
          margin: 0;
          padding: 0;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0.85) 16%, #000000 26%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0.85) 16%, #000000 26%);
        }

        .cand-panoramic-visual:hover .cand-feathered-img {
          transform: scale(1.02);
        }

        @media (max-width: 990px) {
          .cand-hero-root {
            min-height: auto;
          }
          .cand-container-fluid {
            grid-template-columns: 1fr;
            padding-left: 20px;
            padding-right: 0;
            padding-top: 24px;
            padding-bottom: 0;
          }
          .cand-text-block {
            max-width: 100%;
            padding-right: 20px;
            padding-bottom: 32px;
          }
          .cand-main-title {
            font-size: 42px;
          }
          .cand-panoramic-visual {
            justify-content: center;
            min-height: 320px;
          }
          .cand-feathered-img {
            min-height: 320px;
            max-height: 380px;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 20%);
            mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 20%);
          }
        }

        @media (max-width: 600px) {
          .cand-main-title {
            font-size: 34px;
          }
          .cand-paragraph {
            font-size: 14.5px;
            margin-bottom: 24px;
          }
          .cand-badges-row {
            flex-wrap: wrap;
            gap: 16px;
          }
          .cand-pill-btn {
            width: 100%;
            justify-content: center;
          }
          .cand-text-block {
            padding-left: 0;
            padding-right: 16px;
          }
          .cand-feathered-img {
            min-height: 260px;
            max-height: 300px;
          }
          .cand-panoramic-visual {
            min-height: 260px;
          }
        }

        @media (max-width: 400px) {
          .cand-main-title {
            font-size: 30px;
          }
          .cand-badges-row {
            gap: 12px;
          }
          .cand-badge-text {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  )
}
