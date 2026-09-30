import React from 'react'
import { MapPin } from 'lucide-react'

export const CandidateBengaluruBanner: React.FC = () => {
  return (
    <section className="cand-banner-section">
      <div className="cand-screen-wrapper">
        <div className="cand-city-banner">
          {/* Left Text */}
          <div className="cand-city-content">
            <div className="cand-city-pin-badge">
              <MapPin size={24} color="#0c0d0e" strokeWidth={2.4} />
            </div>
            <div className="cand-city-text-block">
              <span className="cand-city-kicker">Starting from</span>
              <h2 className="cand-city-title">Bengaluru, Growing Across India.</h2>
              <p className="cand-city-sub">
                We are currently building our network of candidates and employers across India.
              </p>
            </div>
          </div>

          {/* Right Skyline & City Badge */}
          <div className="cand-city-image-wrapper">
            <img
              src="/images/bengaluru_skyline_new.png"
              alt="Bengaluru Skyline City"
              className="cand-city-skyline"
            />

            {/* Launch City Badge */}
            <div className="cand-launch-badge floating-badge-animated">
              <div className="cand-launch-pin">
                <MapPin size={20} color="#0c0d0e" strokeWidth={2.4} />
              </div>
              <div className="cand-launch-text">
                <span className="cand-launch-name">Bengaluru</span>
                <span className="cand-launch-sub">Our Launch City</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cand-banner-section {
          width: 100%;
          padding: 0;
          margin: 40px 0 60px;
          background-color: #fafafb;
          border-top: 1px solid #e4e7ec;
          border-bottom: 1px solid #e4e7ec;
          overflow: hidden;
          position: relative;
        }

        /* Covers the entire viewport width edge-to-edge */
        .cand-screen-wrapper {
          width: 100%;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        .cand-city-banner {
          width: 100%;
          background-color: #fafafb;
          border: none;
          border-radius: 0;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          position: relative;
          min-height: 360px;
          box-shadow: none;
        }

        /* Aligned to standard 1200px container boundary on the left */
        .cand-city-content {
          flex: 1.1;
          padding: 60px 48px 60px max(32px, calc((100vw - 1200px) / 2 + 24px));
          display: flex;
          align-items: center;
          gap: 22px;
          z-index: 2;
        }

        .cand-city-pin-badge {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #f4f4f5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .cand-city-text-block {
          display: flex;
          flex-direction: column;
        }

        .cand-city-kicker {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #52525b;
          margin-bottom: 6px;
        }

        .cand-city-title {
          font-size: 32px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.025em;
          line-height: 1.18;
          margin-bottom: 10px;
        }

        .cand-city-sub {
          font-size: 15px;
          color: #475467;
          line-height: 1.6;
          max-width: 480px;
          margin: 0;
        }

        /* Right Skyline Column spanning to screen edge */
        .cand-city-image-wrapper {
          flex: 1.25;
          height: 100%;
          min-height: 360px;
          position: relative;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          overflow: hidden;
          background-color: #fafafb;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.14) 14%, rgba(0, 0, 0, 0.8) 32%, #000000 48%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.14) 14%, rgba(0, 0, 0, 0.8) 32%, #000000 48%);
        }

        .cand-city-skyline {
          width: 100%;
          height: 100%;
          min-height: 360px;
          object-fit: cover;
          object-position: right center;
          display: block;
          transition: transform 0.6s ease;
        }

        .cand-city-banner:hover .cand-city-skyline {
          transform: scale(1.03);
        }

        /* Launch City Badge */
        .cand-launch-badge {
          position: absolute;
          bottom: 32px;
          right: max(32px, calc((100vw - 1200px) / 2 + 24px));
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(228, 231, 236, 0.9);
          border-radius: 18px;
          padding: 12px 22px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 14px 32px -6px rgba(0, 0, 0, 0.12);
          z-index: 3;
          transition: transform 0.25s ease;
        }

        .cand-launch-badge:hover {
          transform: translateY(-2px);
        }

        .cand-launch-pin {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #f4f4f5;
        }

        .cand-launch-text {
          display: flex;
          flex-direction: column;
        }

        .cand-launch-name {
          font-size: 15.5px;
          font-weight: 800;
          color: #0c0d0e;
          line-height: 1.2;
        }

        .cand-launch-sub {
          font-size: 12px;
          font-weight: 600;
          color: #71717a;
        }

        @media (max-width: 1200px) {
          .cand-city-content {
            padding: 48px 32px;
          }
          .cand-city-title {
            font-size: 28px;
          }
          .cand-launch-badge {
            right: 32px;
            bottom: 24px;
          }
        }

        @media (max-width: 900px) {
          .cand-city-banner {
            flex-direction: column;
            min-height: auto;
          }
          .cand-city-content {
            padding: 36px 20px;
          }
          .cand-city-image-wrapper {
            width: 100%;
            height: 260px;
            min-height: 260px;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 1) 22%);
            mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 1) 22%);
          }
          .cand-launch-badge {
            bottom: 18px;
            right: 18px;
            padding: 10px 16px;
          }
        }
      `}</style>
    </section>
  )
}
