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
              src="/images/bengaluru_skyline_new.png"
              alt="Bengaluru Skyline City"
              className="cand-city-skyline"
            />

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
          background-color: #fafafb;
          border: 1px solid #e4e7ec;
          border-radius: 28px;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          position: relative;
          min-height: 280px;
          box-shadow: 0 12px 36px -10px rgba(0, 0, 0, 0.06);
        }

        .cand-city-content {
          flex: 1.1;
          padding: 48px 48px;
          display: flex;
          align-items: center;
          gap: 20px;
          z-index: 2;
        }

        .cand-city-pin-badge {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #f4f4f5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
          font-size: 30px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.025em;
          line-height: 1.18;
          margin-bottom: 10px;
        }

        .cand-city-sub {
          font-size: 14.5px;
          color: #475467;
          line-height: 1.6;
          max-width: 460px;
        }

        .cand-city-image-wrapper {
          flex: 1.15;
          height: 100%;
          min-height: 280px;
          position: relative;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          overflow: hidden;
          background-color: #fafafb;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 14%, rgba(0, 0, 0, 0.85) 32%, #000000 50%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 14%, rgba(0, 0, 0, 0.85) 32%, #000000 50%);
        }

        .cand-city-skyline {
          width: 100%;
          height: 100%;
          min-height: 260px;
          object-fit: cover;
          object-position: right center;
          display: block;
          transition: transform 0.6s ease;
        }

        .cand-city-banner:hover .cand-city-skyline {
          transform: scale(1.03);
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
