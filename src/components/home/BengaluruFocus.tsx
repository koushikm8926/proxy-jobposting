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
                src="/images/common/bengaluru-skyline.png"
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
          width: 100%;
          padding: 0;
          margin: 60px 0 0;
          background-color: #fafafb;
          border-top: 1px solid #e4e7ec;
          border-bottom: 1px solid #e4e7ec;
          overflow: hidden;
          position: relative;
        }

        /* Covers the entire viewport width edge-to-edge */
        .bengaluru-screen-wrapper {
          width: 100%;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        .bengaluru-banner-card {
          width: 100%;
          background-color: #fafafb;
          border: none;
          border-radius: 0;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          position: relative;
          min-height: 480px;
          box-shadow: none;
        }

        .bengaluru-content-col {
          flex: 1.1;
          padding: 72px 48px 72px max(32px, calc((100vw - 1200px) / 2 + 24px));
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

        /* Right Skyline Column spanning to screen edge */
        .bengaluru-skyline-col {
          flex: 1.25;
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
          /* Dual-layer smooth mask gradient for dissolving left edge into full-width background */
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.12) 14%, rgba(0, 0, 0, 0.8) 32%, #000000 48%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.12) 14%, rgba(0, 0, 0, 0.8) 32%, #000000 48%);
        }

        .bengaluru-photo-img {
          width: 100%;
          height: 100%;
          min-height: 480px;
          object-fit: cover;
          object-position: right center;
          display: block;
          transition: transform 0.6s ease;
        }

        .bengaluru-banner-card:hover .bengaluru-photo-img {
          transform: scale(1.03);
        }

        /* Floating City Launch Badge aligned with right content grid */
        .bengaluru-floating-pill {
          position: absolute;
          bottom: 40px;
          right: max(32px, calc((100vw - 1200px) / 2 + 24px));
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
          .bengaluru-content-col {
            padding: 56px 32px;
          }
          .bengaluru-heading {
            font-size: 34px;
          }
          .bengaluru-floating-pill {
            right: 32px;
            bottom: 32px;
          }
        }

        @media (max-width: 960px) {
          .bengaluru-banner-card {
            flex-direction: column;
            min-height: auto;
          }
          .bengaluru-content-col {
            padding: 48px 24px;
          }
          .bengaluru-skyline-col {
            width: 100%;
            height: 300px;
            min-height: 300px;
          }
          .skyline-fade-wrap {
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 22%);
            mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 22%);
          }
          .bengaluru-floating-pill {
            bottom: 20px;
            right: 20px;
            padding: 10px 18px;
          }
        }
      `}</style>
    </section>
  )
}
