import React from 'react'

export const AboutJourney: React.FC = () => {
  return (
    <section className="about-journey-section">
      <div className="container">
        <div className="journey-banner">
          {/* Left Text */}
          <div className="journey-content">
            <span className="section-kicker">OUR JOURNEY</span>
            <h2 className="journey-title">
              Starting from Bengaluru,<br />Growing Across India
            </h2>
            <p className="journey-description">
              Proxy is currently focused on building our network of candidates, recruiters and employers across India. We are starting from Bengaluru with a long-term vision to expand nationwide and create a stronger, more connected recruitment ecosystem.
            </p>
          </div>

          {/* Right Skyline Image */}
          <div className="journey-image-wrapper">
            <img
              src="/images/about_journey_buildings.jpg"
              alt="Bengaluru Skyline Growth"
              className="journey-skyline-img"
            />
            <div className="journey-gradient-mask"></div>
          </div>
        </div>
      </div>

      <style>{`
        .about-journey-section {
          padding: 40px 0 80px;
          background-color: #ffffff;
        }

        .journey-banner {
          background: linear-gradient(135deg, #f8f9fa 0%, #edf0f5 100%);
          border: 1px solid #e4e7ec;
          border-radius: 28px;
          overflow: hidden;
          display: flex;
          align-items: center;
          position: relative;
          min-height: 340px;
          box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.06);
        }

        .journey-content {
          flex: 1.1;
          padding: 56px 48px;
          z-index: 2;
        }

        .journey-title {
          font-size: 34px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .journey-description {
          font-size: 15px;
          color: #475467;
          line-height: 1.65;
          max-width: 480px;
        }

        .journey-image-wrapper {
          flex: 1;
          height: 100%;
          min-height: 340px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          overflow: hidden;
        }

        .journey-skyline-img {
          width: 100%;
          height: 100%;
          min-height: 340px;
          object-fit: cover;
          object-position: center;
        }

        .journey-gradient-mask {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 90px;
          background: linear-gradient(to right, #edf0f5, transparent);
          pointer-events: none;
        }

        @media (max-width: 960px) {
          .journey-banner {
            flex-direction: column;
          }
          .journey-content {
            padding: 40px 24px 32px;
          }
          .journey-title {
            font-size: 28px;
          }
          .journey-image-wrapper {
            width: 100%;
            height: 240px;
            min-height: 240px;
          }
          .journey-gradient-mask {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
