import React from 'react'
import { ArrowRight, MapPin } from 'lucide-react'

interface BengaluruFocusProps {
  onKnowMore: () => void
}

export const BengaluruFocus: React.FC<BengaluruFocusProps> = ({ onKnowMore }) => {
  return (
    <section className="bengaluru-fullwidth-section">
      <div className="bengaluru-screen-wrapper">
        <div className="bengaluru-banner-card reveal-on-scroll">
          {/* Left Text Content */}
          <div className="bengaluru-content-col reveal-left delay-100">
            <span className="bengaluru-kicker">OUR FOCUS</span>
            <h2 className="bengaluru-heading">
              Starting from Bengaluru,<br />
              Growing Across India
            </h2>
            <p className="bengaluru-paragraph">
              We are building a trusted recruitment ecosystem in Bengaluru with a long-term vision to expand across India, connecting more candidates and employers every day.
            </p>
            <div>
              <button
                type="button"
                className="btn btn-primary bengaluru-btn"
                onClick={onKnowMore}
              >
                <span>Know More</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Skyline Column: Ultra Smooth Edge Fade & Crisp Floating Badge */}
          <div className="bengaluru-skyline-col reveal-right delay-200">
            <div className="skyline-fade-wrap">
              <img
                src="/images/bengaluru_skyline_new.png"
                alt="Modern Bengaluru City Corporate Skyline"
                className="bengaluru-photo-img"
              />
            </div>

            {/* Single Crisp Floating City Launch Badge */}
            <div className="bengaluru-floating-pill floating-badge-animated">
              <div className="pill-pin-circle">
                <MapPin size={22} color="#0c0d0e" strokeWidth={2.4} />
              </div>
              <div className="pill-text-meta">
                <span className="pill-city-name">Bengaluru</span>
                <span className="pill-city-tag">Our Launch City</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bengaluru-fullwidth-section {
          padding: 40px 0 80px;
          background-color: #ffffff;
          width: 100%;
          overflow: hidden;
        }

        /* Covers the actual width of the screen with symmetric edge padding */
        .bengaluru-screen-wrapper {
          width: 100%;
          padding: 0 32px;
          box-sizing: border-box;
        }

        .bengaluru-banner-card {
          width: 100%;
          background-color: #fafafb;
          border: 1px solid #e4e7ec;
          border-radius: 28px;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          position: relative;
          min-height: 420px;
          box-shadow: 0 12px 36px -10px rgba(0, 0, 0, 0.06);
        }

        .bengaluru-content-col {
          flex: 1.1;
          padding: 64px 56px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .bengaluru-kicker {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #52525b;
          text-transform: uppercase;
          display: block;
          margin-bottom: 12px;
        }

        .bengaluru-heading {
          font-size: 42px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.035em;
          line-height: 1.12;
          margin: 0 0 18px;
        }

        .bengaluru-paragraph {
          font-size: 15.5px;
          color: #475467;
          line-height: 1.6;
          max-width: 520px;
          margin: 0 0 32px;
        }

        .bengaluru-btn {
          height: 48px;
          padding: 0 28px;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bengaluru-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);
          background-color: #27272a;
        }

        /* Right Skyline Column with Smooth Fade */
        .bengaluru-skyline-col {
          flex: 1.15;
          position: relative;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          overflow: hidden;
          background-color: #fafafb;
        }

        .skyline-fade-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          /* Dual-layer smooth mask gradient for dissolving left edge into card background */
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 16%, rgba(0, 0, 0, 0.8) 36%, #000000 52%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 16%, rgba(0, 0, 0, 0.8) 36%, #000000 52%);
        }

        .bengaluru-photo-img {
          width: 100%;
          height: 100%;
          min-height: 420px;
          object-fit: cover;
          object-position: right center;
          display: block;
          transition: transform 0.6s ease;
        }

        .bengaluru-banner-card:hover .bengaluru-photo-img {
          transform: scale(1.03);
        }

        /* Floating City Launch Badge */
        .bengaluru-floating-pill {
          position: absolute;
          bottom: 40px;
          right: 48px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(228, 231, 236, 0.9);
          border-radius: 20px;
          padding: 13px 26px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 16px 36px -6px rgba(0, 0, 0, 0.14);
          z-index: 3;
          transition: transform 0.25s ease;
        }

        .bengaluru-floating-pill:hover {
          transform: translateY(-2px);
        }

        .pill-pin-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: #f4f4f5;
        }

        .pill-text-meta {
          display: flex;
          flex-direction: column;
        }

        .pill-city-name {
          font-size: 16.5px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .pill-city-tag {
          font-size: 12.5px;
          font-weight: 600;
          color: #71717a;
        }

        @media (max-width: 1200px) {
          .bengaluru-screen-wrapper {
            padding: 0 20px;
          }
          .bengaluru-content-col {
            padding: 48px 36px;
          }
          .bengaluru-heading {
            font-size: 34px;
          }
        }

        @media (max-width: 960px) {
          .bengaluru-banner-card {
            flex-direction: column;
            min-height: auto;
          }
          .bengaluru-skyline-col {
            width: 100%;
            height: 280px;
            min-height: 280px;
          }
          .skyline-fade-wrap {
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 25%);
            mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 25%);
          }
          .bengaluru-floating-pill {
            bottom: 24px;
            right: 24px;
            padding: 10px 20px;
          }
        }
      `}</style>
    </section>
  )
}
