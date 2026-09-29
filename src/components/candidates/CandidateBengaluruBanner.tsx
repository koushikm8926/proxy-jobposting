import React from 'react'
import { MapPin } from 'lucide-react'

export const CandidateBengaluruBanner: React.FC = () => {
  return (
    <section className="cand-banner-section">
      <div className="container">
        <div className="cand-city-banner">
          {/* Left Text */}
          <div className="cand-city-content">
            <div className="cand-city-pin-badge">
              <MapPin size={24} color="#0c0d0e" />
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
              src="/images/candidate_banner_buildings.jpg"
              alt="Bengaluru Skyline City"
              className="cand-city-skyline"
            />
            <div className="cand-city-mask"></div>

            {/* Launch City Badge */}
            <div className="cand-launch-badge">
              <div className="cand-launch-pin">
                <MapPin size={20} color="#0c0d0e" />
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
          padding: 20px 0 60px;
          background-color: #ffffff;
        }

        .cand-city-banner {
          background: linear-gradient(135deg, #18191c 0%, #2b2e38 100%);
          border-radius: 28px;
          overflow: hidden;
          display: flex;
          align-items: center;
          position: relative;
          min-height: 260px;
          box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.15);
        }

        .cand-city-content {
          flex: 1.1;
          padding: 44px 48px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          z-index: 2;
        }

        .cand-city-pin-badge {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .cand-city-text-block {
          display: flex;
          flex-direction: column;
        }

        .cand-city-kicker {
          font-size: 14px;
          font-weight: 500;
          color: #d1d5db;
          margin-bottom: 4px;
        }

        .cand-city-title {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 10px;
        }

        .cand-city-sub {
          font-size: 13.5px;
          color: #9ca3af;
          line-height: 1.55;
          max-width: 440px;
        }

        .cand-city-image-wrapper {
          flex: 1;
          height: 100%;
          min-height: 260px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          overflow: hidden;
        }

        .cand-city-skyline {
          width: 100%;
          height: 100%;
          min-height: 260px;
          object-fit: cover;
          object-position: center;
        }

        .cand-city-mask {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 90px;
          background: linear-gradient(to right, #2b2e38, transparent);
          pointer-events: none;
        }

        .cand-launch-badge {
          position: absolute;
          bottom: 24px;
          right: 28px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
          z-index: 3;
        }

        .cand-launch-pin {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cand-launch-text {
          display: flex;
          flex-direction: column;
        }

        .cand-launch-name {
          font-size: 15px;
          font-weight: 800;
          color: #0c0d0e;
        }

        .cand-launch-sub {
          font-size: 11.5px;
          font-weight: 500;
          color: #64748b;
        }

        @media (max-width: 900px) {
          .cand-city-banner {
            flex-direction: column;
          }
          .cand-city-content {
            padding: 32px 24px;
          }
          .cand-city-image-wrapper {
            width: 100%;
            height: 200px;
            min-height: 200px;
          }
          .cand-city-mask {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
