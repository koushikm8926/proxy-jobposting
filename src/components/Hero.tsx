import React from 'react'
import { ArrowRight, MapPin } from 'lucide-react'

interface HeroProps {
  onFindJobs: () => void
  onHireTalent: () => void
}

export const Hero: React.FC<HeroProps> = ({ onFindJobs, onHireTalent }) => {
  return (
    <section id="home" className="home-hero-root">
      {/* Subtle organic contour wave in top-left corner */}
      <div className="hero-contour-waves">
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

      <div className="container hero-container">
        {/* Left Side: Content & Actions */}
        <div className="hero-text-block">
          <span className="hero-kicker">THE DESIRE TO ACHIEVE</span>

          <h1 className="hero-main-title">
            <span className="title-brand">PROXY</span>
            <span className="title-tagline">The Desire to Achieve.</span>
          </h1>

          <p className="hero-paragraph">
            Connecting candidates with opportunities and recruiters with the talent they need.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary hero-pill-btn hero-pill-black"
              onClick={onFindJobs}
            >
              <span>Find Jobs</span>
              <ArrowRight size={17} />
            </button>
            <button
              type="button"
              className="btn btn-outline hero-pill-btn hero-pill-outline"
              onClick={onHireTalent}
            >
              <span>Hire Talent</span>
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="hero-launch-badge">
            <div className="launch-pin-wrap">
              <MapPin size={22} className="launch-pin-icon" />
            </div>
            <div className="launch-meta">
              <h4 className="launch-title">Launching in Bengaluru</h4>
              <p className="launch-desc">Building a recruitment ecosystem across India.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Panoramic Integrated Visual of Professionals & Modern Bengaluru */}
        <div className="hero-panoramic-visual">
          <img
            src="/images/home_hero_people_feathered.png"
            alt="Proxy ambitious professionals in modern Bengaluru"
            className="hero-feathered-img"
          />
        </div>
      </div>

      <style>{`
        .home-hero-root {
          position: relative;
          background-color: #ffffff;
          overflow: hidden;
          min-height: 520px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #f4f4f5;
        }

        .hero-contour-waves {
          position: absolute;
          top: 0;
          left: 0;
          width: 380px;
          height: 300px;
          pointer-events: none;
          z-index: 0;
        }

        .contour-svg {
          width: 100%;
          height: 100%;
        }

        .hero-container {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          align-items: center;
          gap: 24px;
          padding-top: 36px;
          padding-bottom: 44px;
          width: 100%;
        }

        /* Left Content */
        .hero-text-block {
          max-width: 520px;
          padding-left: 4px;
        }

        .hero-kicker {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #3f3f46;
          text-transform: uppercase;
          display: block;
          margin-bottom: 8px;
        }

        .hero-main-title {
          display: flex;
          flex-direction: column;
          margin: 0 0 16px;
        }

        .title-brand {
          font-size: 74px;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.95;
          color: #0c0d0e;
        }

        .title-tagline {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #0c0d0e;
          margin-top: 8px;
          line-height: 1.15;
        }

        .hero-paragraph {
          font-size: 16px;
          color: #475467;
          line-height: 1.55;
          margin: 0 0 32px;
          max-width: 440px;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
        }

        .hero-pill-btn {
          height: 48px;
          padding: 0 28px;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-pill-black {
          background-color: #0c0d0e;
          color: #ffffff;
          border: 1px solid #0c0d0e;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
        }

        .hero-pill-black:hover {
          background-color: #27272a;
          transform: translateY(-1.5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
        }

        .hero-pill-outline {
          background-color: #ffffff;
          color: #0c0d0e;
          border: 1.5px solid #0c0d0e;
        }

        .hero-pill-outline:hover {
          background-color: #f4f4f5;
          transform: translateY(-1.5px);
        }

        .hero-launch-badge {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .launch-pin-wrap {
          color: #0c0d0e;
          padding-top: 2px;
          flex-shrink: 0;
        }

        .launch-meta {
          display: flex;
          flex-direction: column;
        }

        .launch-title {
          font-size: 14.5px;
          font-weight: 800;
          color: #0c0d0e;
          margin: 0;
        }

        .launch-desc {
          font-size: 13px;
          color: #64748b;
          margin: 2px 0 0;
        }

        /* Right Panoramic Visual */
        .hero-panoramic-visual {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 100%;
        }

        .hero-feathered-img {
          width: 100%;
          max-width: 580px;
          height: auto;
          max-height: 480px;
          object-fit: contain;
          object-position: right center;
          display: block;
          filter: drop-shadow(0 12px 32px rgba(0, 0, 0, 0.06));
        }

        @media (max-width: 990px) {
          .hero-container {
            grid-template-columns: 1fr;
            padding-top: 24px;
            padding-bottom: 32px;
          }
          .hero-text-block {
            max-width: 100%;
          }
          .title-brand {
            font-size: 54px;
          }
          .title-tagline {
            font-size: 28px;
          }
          .hero-panoramic-visual {
            justify-content: center;
            margin-top: 16px;
          }
          .hero-feathered-img {
            max-width: 100%;
            max-height: 380px;
          }
        }

        @media (max-width: 600px) {
          .title-brand {
            font-size: 44px;
          }
          .title-tagline {
            font-size: 24px;
          }
          .hero-cta-group {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-pill-btn {
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
