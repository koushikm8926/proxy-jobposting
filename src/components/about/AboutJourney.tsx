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
              src="/images/bengaluru_skyline_new.png"
              alt="Bengaluru Skyline Growth"
              className="journey-skyline-img"
            />
          </div>
        </div>
      </div>

      <style>{`
        .about-journey-section {
          padding: 40px 0 80px;
          background-color: #ffffff;
        }

        .journey-banner {
          background-color: #fafafb;
          border: 1px solid #e4e7ec;
          border-radius: 28px;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          position: relative;
          min-height: 360px;
          box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.06);
        }

        .journey-content {
          flex: 1.1;
          padding: 56px 48px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
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
          flex: 1.15;
          height: 100%;
          min-height: 360px;
          position: relative;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          overflow: hidden;
          background-color: #fafafb;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 14%, rgba(0, 0, 0, 0.8) 32%, #000000 48%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 14%, rgba(0, 0, 0, 0.8) 32%, #000000 48%);
        }

        .journey-skyline-img {
          width: 100%;
          height: 100%;
          min-height: 360px;
          object-fit: cover;
          object-position: right center;
          display: block;
          transition: transform 0.5s ease;
        }

        .journey-banner:hover .journey-skyline-img {
          transform: scale(1.03);
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
            height: 260px;
            min-height: 260px;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 25%);
            mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 25%);
          }
        }
      `}</style>
    </section>
  )
}
