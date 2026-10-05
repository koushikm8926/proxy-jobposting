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

      <div className="hero-container-fluid">
        {/* Left Side: Content & Actions */}
        <div className="hero-text-block">
          <span className="hero-kicker">THE DESIRE TO ACHIEVE</span>

          <h1 className="hero-main-title">
            <span className="title-brand">ProxHire</span>
            <span className="title-tagline">India’s Ultimate Career Bridge</span>
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

        {/* Right Side: Panoramic Integrated Visual of Highway Billboard */}
        <div className="hero-panoramic-visual">
          <img
            src="/images/home/hero-banner.png"
            alt="Build Your Career with ProxHire Highway Billboard"
            className="hero-feathered-img"
          />
        </div>
      </div>

      <style>{`
        .home-hero-root {
          position: relative;
          background-color: #ffffff;
          overflow: hidden;
          width: 100%;
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
          animation: floatWave 14s ease-in-out infinite alternate;
          transform-origin: top left;
        }

        .contour-svg {
          width: 100%;
          height: 100%;
        }

        /* Fluid container with ZERO right margin/padding so image touches the right edge */
        .hero-container-fluid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.15fr 1.25fr;
          align-items: center;
          gap: 0;
          width: 100%;
          padding-left: clamp(16px, 5vw, 72px);
          padding-right: 0; /* ZERO gap on the right side */
          box-sizing: border-box;
        }

        /* Left Content */
        .hero-text-block {
          max-width: 580px;
          padding-top: 36px;
          padding-bottom: 44px;
          padding-right: 24px;
        }

        .hero-kicker {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #3f3f46;
          text-transform: uppercase;
          display: block;
          margin-bottom: 8px;
          animation: heroSlideUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.05s;
        }

        .hero-main-title {
          display: flex;
          flex-direction: column;
          margin: 0 0 16px;
          animation: heroSlideUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.15s;
        }

        .title-brand {
          font-size: 74px;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.95;
          color: #0c0d0e;
        }

        .title-tagline {
          font-size: clamp(18px, 2.3vw, 34px);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #0c0d0e;
          margin-top: 8px;
          line-height: 1.2;
          white-space: normal;
        }

        .hero-paragraph {
          font-size: 16px;
          color: #475467;
          line-height: 1.55;
          margin: 0 0 32px;
          max-width: 440px;
          animation: heroSlideUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.25s;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
          animation: heroSlideUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.35s;
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
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-pill-black {
          background-color: #0c0d0e;
          color: #ffffff;
          border: 1px solid #0c0d0e;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
        }

        .hero-pill-black:hover {
          background-color: #27272a;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .hero-pill-outline {
          background-color: #ffffff;
          color: #0c0d0e;
          border: 1.5px solid #0c0d0e;
        }

        .hero-pill-outline:hover {
          background-color: #f4f4f5;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        }

        .hero-launch-badge {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          animation: heroSlideUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.45s;
        }

        .launch-pin-wrap {
          color: #0c0d0e;
          padding-top: 2px;
          flex-shrink: 0;
          animation: pulseSubtle 3.2s ease-in-out infinite;
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

        /* Right Panoramic Visual: 100% Flush to the Right Edge of the Screen */
        .hero-panoramic-visual {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          animation: heroSlideRight 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.12s;
        }

        .hero-feathered-img {
          width: 100%;
          max-width: 100%;
          height: auto;
          max-height: 580px;
          object-fit: cover;
          object-position: right center;
          display: block;
          margin: 0;
          padding: 0;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0.85) 15%, #000000 24%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0.85) 15%, #000000 24%);
        }

        .hero-panoramic-visual:hover .hero-feathered-img {
          transform: scale(1.015);
        }

        @media (max-width: 990px) {
          .hero-container-fluid {
            grid-template-columns: 1fr;
            padding-left: 20px;
            padding-right: 0;
            padding-top: 24px;
            padding-bottom: 32px;
          }
          .hero-text-block {
            max-width: 100%;
            padding-right: 16px;
          }
          .title-brand {
            font-size: 54px;
          }
          .title-tagline {
            font-size: clamp(20px, 3.8vw, 28px);
            white-space: normal;
          }
          .hero-panoramic-visual {
            justify-content: center;
            margin-top: 16px;
          }
          .hero-feathered-img {
            max-width: 100%;
            max-height: 380px;
            -webkit-mask-image: none;
            mask-image: none;
          }
        }

        @media (max-width: 600px) {
          .home-hero-root {
            min-height: auto;
          }
          .hero-text-block {
            padding-top: 28px;
            padding-bottom: 24px;
            padding-right: 20px;
          }
          .hero-container-fluid {
            padding-left: 16px;
            padding-top: 0;
            padding-bottom: 0;
          }
          .title-brand {
            font-size: 42px;
          }
          .title-tagline {
            font-size: clamp(16px, 5.5vw, 22px);
            white-space: normal;
          }
          .hero-paragraph {
            font-size: 14.5px;
            margin-bottom: 24px;
          }
          .hero-cta-group {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            margin-bottom: 24px;
          }
          .hero-pill-btn {
            justify-content: center;
            width: 100%;
            height: 46px;
            font-size: 14px;
          }
          .hero-feathered-img {
            max-height: 260px;
          }
        }

        @media (max-width: 400px) {
          .title-brand {
            font-size: 36px;
          }
          .title-tagline {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  )
}
