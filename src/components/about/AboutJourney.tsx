import React from 'react'

export const AboutJourney: React.FC = () => {
  return (
    <section className="about-journey-section">
      <div className="journey-screen-wrapper">
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

          {/* Right Skyline Image - Spans 100% to screen edge */}
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
          width: 100%;
          padding: 0;
          margin: 60px 0;
          background-color: #fafafb;
          border-top: 1px solid #e4e7ec;
          border-bottom: 1px solid #e4e7ec;
          overflow: hidden;
          position: relative;
        }

        /* Covers the entire viewport width edge-to-edge */
        .journey-screen-wrapper {
          width: 100%;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        .journey-banner {
          width: 100%;
          background-color: #fafafb;
          border: none;
          border-radius: 0;
          overflow: hidden;
          display: flex;
          align-items: stretch;
          position: relative;
          min-height: 440px;
          box-shadow: none;
        }

        /* Anchored to standard 1200px container boundary on the left */
        .journey-content {
          flex: 1.1;
          padding: 68px 48px 68px max(32px, calc((100vw - 1200px) / 2 + 24px));
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .journey-title {
          font-size: 38px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.03em;
          line-height: 1.16;
          margin: 10px 0 16px;
        }

        .journey-description {
          font-size: 15.5px;
          color: #475467;
          line-height: 1.65;
          max-width: 520px;
          margin: 0;
        }

        /* Right Skyline Column spanning all the way to right screen edge */
        .journey-image-wrapper {
          flex: 1.25;
          height: 100%;
          min-height: 440px;
          position: relative;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          overflow: hidden;
          background-color: #fafafb;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.14) 14%, rgba(0, 0, 0, 0.8) 32%, #000000 48%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.14) 14%, rgba(0, 0, 0, 0.8) 32%, #000000 48%);
        }

        .journey-skyline-img {
          width: 100%;
          height: 100%;
          min-height: 440px;
          object-fit: cover;
          object-position: right center;
          display: block;
          transition: transform 0.5s ease;
        }

        .journey-banner:hover .journey-skyline-img {
          transform: scale(1.03);
        }

        @media (max-width: 1200px) {
          .journey-content {
            padding: 56px 32px;
          }
          .journey-title {
            font-size: 34px;
          }
        }

        @media (max-width: 960px) {
          .journey-banner {
            flex-direction: column;
            min-height: auto;
          }
          .journey-content {
            padding: 44px 24px;
          }
          .journey-title {
            font-size: 28px;
          }
          .journey-image-wrapper {
            width: 100%;
            height: 280px;
            min-height: 280px;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 22%);
            mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 22%);
          }
        }
      `}</style>
    </section>
  )
}
