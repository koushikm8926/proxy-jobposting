import React from 'react'
import { ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react'

interface RecruiterHeroProps {
  onRegister: () => void
}

export const RecruiterHero: React.FC<RecruiterHeroProps> = ({ onRegister }) => {
  return (
    <section id="recruiter-hero" className="rec-hero-root">
      {/* Subtle organic contour wave in top-left corner */}
      <div className="rec-contour-waves">
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

      <div className="rec-container-fluid">
        {/* Left Side: Content & Actions */}
        <div className="rec-text-block">
          <span className="rec-kicker">FOR RECRUITERS</span>

          <h1 className="rec-main-title">
            Find the Right<br />
            Talent, Faster.
          </h1>

          <p className="rec-paragraph">
            Build your talent pipeline, connect with verified candidates, and simplify your hiring process with ProxHire.
          </p>

          <div className="rec-cta-group">
            <button
              type="button"
              className="btn btn-primary rec-pill-btn rec-pill-black"
              onClick={onRegister}
            >
              <span>Register as a Recruiter</span>
              <ArrowRight size={17} />
            </button>
          </div>

          {/* 3 Horizontal Feature Badges */}
          <div className="rec-badges-row">
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

        {/* Right Side: Panoramic Integrated Visual spanning to right screen edge */}
        <div className="rec-panoramic-visual">
          <img
            src="/images/recruiters/recruiter-hero.png"
            alt="ProxHire Recruiter Talent Matching Dashboard"
            className="rec-feathered-img"
          />
        </div>
      </div>

      <style>{`
        .rec-hero-root {
          position: relative;
          background-color: #ffffff;
          overflow: hidden;
          width: 100%;
          min-height: 520px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #f4f4f5;
        }

        .rec-contour-waves {
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
        .rec-container-fluid {
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
        .rec-text-block {
          max-width: 520px;
          padding-top: 40px;
          padding-bottom: 48px;
          padding-right: 32px;
        }

        .rec-kicker {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #52525b;
          text-transform: uppercase;
          display: block;
          margin-bottom: 12px;
        }

        .rec-main-title {
          font-size: 58px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.08;
          color: #0c0d0e;
          margin: 0 0 20px;
        }

        .rec-paragraph {
          font-size: 16px;
          color: #475467;
          line-height: 1.6;
          margin: 0 0 32px;
          max-width: 460px;
        }

        .rec-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
        }

        .rec-pill-btn {
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

        .rec-pill-black {
          background-color: #0c0d0e;
          color: #ffffff;
          border: 1px solid #0c0d0e;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
        }

        .rec-pill-black:hover {
          background-color: #27272a;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        /* 3 Badges Row */
        .rec-badges-row {
          display: flex;
          align-items: center;
          gap: 28px;
          padding-top: 8px;
          border-top: 1px solid #f4f4f6;
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

        /* Right Panoramic Visual: 100% Flush to the Right Edge of the Screen with Smooth Fade */
        .rec-panoramic-visual {
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

        .rec-feathered-img {
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

        .rec-panoramic-visual:hover .rec-feathered-img {
          transform: scale(1.02);
        }

        @media (max-width: 990px) {
          .rec-hero-root {
            min-height: auto;
          }
          .rec-container-fluid {
            grid-template-columns: 1fr;
            padding-left: 20px;
            padding-right: 0;
            padding-top: 24px;
            padding-bottom: 0;
          }
          .rec-text-block {
            max-width: 100%;
            padding-right: 20px;
            padding-bottom: 32px;
          }
          .rec-main-title {
            font-size: 42px;
          }
          .rec-panoramic-visual {
            justify-content: center;
            min-height: 320px;
          }
          .rec-feathered-img {
            min-height: 320px;
            max-height: 380px;
            -webkit-mask-image: none;
            mask-image: none;
          }
        }

        @media (max-width: 600px) {
          .rec-main-title {
            font-size: 34px;
          }
          .rec-paragraph {
            font-size: 14.5px;
          }
          .rec-badges-row {
            flex-wrap: wrap;
            gap: 16px;
          }
          .rec-pill-btn {
            width: 100%;
            justify-content: center;
          }
          .rec-text-block {
            padding-right: 16px;
          }
          .rec-feathered-img {
            min-height: 260px;
            max-height: 300px;
          }
          .rec-panoramic-visual {
            min-height: 260px;
          }
        }

        @media (max-width: 400px) {
          .rec-main-title {
            font-size: 30px;
          }
        }
      `}</style>
    </section>
  )
}
