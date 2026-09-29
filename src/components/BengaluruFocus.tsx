import React from 'react'
import { ArrowRight, MapPin } from 'lucide-react'

interface BengaluruFocusProps {
  onKnowMore: () => void
}

export const BengaluruFocus: React.FC<BengaluruFocusProps> = ({ onKnowMore }) => {
  return (
    <section className="bengaluru-section">
      <div className="container">
        <div className="bengaluru-banner">
          {/* Left Text Content */}
          <div className="bengaluru-content">
            <span className="section-kicker">OUR FOCUS</span>
            <h2 className="bengaluru-title">
              Starting from Bengaluru,<br />Growing Across India
            </h2>
            <p className="bengaluru-description">
              We are building a trusted recruitment ecosystem in Bengaluru with a long-term vision to expand across India, connecting more candidates and employers every day.
            </p>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onKnowMore}
                style={{ padding: '12px 28px' }}
              >
                <span>Know More</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Skyline Image & Badge */}
          <div className="bengaluru-image-container">
            <img
              src="/images/bengaluru_buildings.jpg"
              alt="Bengaluru Modern Skyline"
              className="bengaluru-skyline-img"
            />
            {/* Overlay Gradient on left edge for seamless blend */}
            <div className="skyline-edge-gradient"></div>

            {/* Floating City Badge */}
            <div className="city-launch-badge">
              <div className="city-pin-icon">
                <MapPin size={22} color="#0c0d0e" />
              </div>
              <div className="city-badge-text">
                <span className="city-badge-title">Bengaluru</span>
                <span className="city-badge-sub">Our Launch City</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bengaluru-section {
          padding: 40px 0 80px;
          background-color: #ffffff;
        }

        .bengaluru-banner {
          background: linear-gradient(135deg, #f8f9fa 0%, #edf0f5 100%);
          border: 1px solid #e4e7ec;
          border-radius: 28px;
          overflow: hidden;
          display: flex;
          align-items: center;
          position: relative;
          min-height: 380px;
          box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.06);
        }

        .bengaluru-content {
          flex: 1.1;
          padding: 56px 48px;
          z-index: 2;
        }

        .bengaluru-title {
          font-size: 34px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .bengaluru-description {
          font-size: 15px;
          color: #475467;
          line-height: 1.6;
          max-width: 480px;
          margin-bottom: 28px;
        }

        .bengaluru-image-container {
          flex: 1;
          height: 100%;
          min-height: 380px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          overflow: hidden;
        }

        .bengaluru-skyline-img {
          width: 100%;
          height: 100%;
          min-height: 380px;
          object-fit: cover;
          object-position: center;
        }

        .skyline-edge-gradient {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 90px;
          background: linear-gradient(to right, #edf0f5, transparent);
          pointer-events: none;
        }

        .city-launch-badge {
          position: absolute;
          bottom: 36px;
          right: 36px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(228, 231, 236, 0.9);
          border-radius: 18px;
          padding: 12px 22px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
          z-index: 3;
        }

        .city-pin-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .city-badge-text {
          display: flex;
          flex-direction: column;
        }

        .city-badge-title {
          font-size: 16px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.01em;
        }

        .city-badge-sub {
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
        }

        @media (max-width: 960px) {
          .bengaluru-banner {
            flex-direction: column;
          }
          .bengaluru-content {
            padding: 40px 24px 32px;
          }
          .bengaluru-title {
            font-size: 28px;
          }
          .bengaluru-image-container {
            width: 100%;
            height: 260px;
            min-height: 260px;
          }
          .skyline-edge-gradient {
            display: none;
          }
          .city-launch-badge {
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </section>
  )
}
