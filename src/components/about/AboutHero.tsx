import React from 'react'
import { ArrowDown } from 'lucide-react'

interface AboutHeroProps {
  onScrollToStory: () => void
}

export const AboutHero: React.FC<AboutHeroProps> = ({ onScrollToStory }) => {
  return (
    <section id="about-hero" className="about-hero-fullwidth-section">
      <div className="about-hero-screen-wrapper">
        <div className="about-hero-banner">
          {/* Left Text Content */}
          <div className="about-hero-content">
            <span className="section-kicker" style={{ color: '#52525b', letterSpacing: '0.18em' }}>
              ABOUT US
            </span>

            <h1 className="about-hero-heading">
              Building a<br />
              Brighter Tomorrow<br />
              Through People
            </h1>

            <p className="about-hero-desc">
              ProxHire is a recruitment platform designed to connect candidates and employers through a simple, trusted and technology-driven hiring experience.
            </p>

            <div>
              <button
                type="button"
                className="btn btn-primary about-hero-btn"
                onClick={onScrollToStory}
              >
                <span>Our Story</span>
                <ArrowDown size={16} />
              </button>
            </div>
          </div>

          {/* Right Visual Spanning to Edge with Smooth Fade */}
          <div className="about-hero-image-wrapper">
            <img
              src="/images/about_hero_professionals_fullwidth.png"
              alt="ProxHire team - Building a Brighter Tomorrow Through People"
              className="about-hero-fullwidth-img"
            />
          </div>
        </div>
      </div>

      <style>{`
        .about-hero-fullwidth-section {
          width: 100%;
          padding: 0;
          margin: 0;
          background-color: #fafafb;
          border-bottom: 1px solid #e4e7ec;
          overflow: hidden;
          position: relative;
        }

        .about-hero-screen-wrapper {
          width: 100%;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        .about-hero-banner {
          width: 100%;
          background-color: #fafafb;
          display: flex;
          align-items: stretch;
          position: relative;
          min-height: 480px;
        }

        .about-hero-content {
          flex: 1.1;
          padding: 72px 48px 72px max(32px, calc((100vw - 1200px) / 2 + 24px));
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          animation: heroSlideUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .about-hero-heading {
          font-size: 52px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.12;
          color: #0c0d0e;
          margin: 14px 0 20px;
        }

        .about-hero-desc {
          font-size: 16px;
          color: #475467;
          line-height: 1.65;
          margin-bottom: 32px;
          max-width: 500px;
        }

        .about-hero-btn {
          height: 48px;
          padding: 0 28px;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-hero-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);
          background-color: #27272a;
        }

        /* Right image spanning 100% to screen edge with smooth mask fade */
        .about-hero-image-wrapper {
          flex: 1.35;
          height: 100%;
          min-height: 480px;
          position: relative;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          overflow: hidden;
          background-color: #fafafb;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.2) 10%, rgba(0, 0, 0, 0.85) 26%, #000000 42%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.2) 10%, rgba(0, 0, 0, 0.85) 26%, #000000 42%);
        }

        .about-hero-fullwidth-img {
          width: 100%;
          height: 100%;
          min-height: 480px;
          object-fit: cover;
          object-position: right center;
          display: block;
          transition: transform 0.6s ease;
        }

        .about-hero-banner:hover .about-hero-fullwidth-img {
          transform: scale(1.02);
        }

        @media (max-width: 1200px) {
          .about-hero-content {
            padding: 56px 32px;
          }
          .about-hero-heading {
            font-size: 42px;
          }
        }

        @media (max-width: 960px) {
          .about-hero-banner {
            flex-direction: column;
            min-height: auto;
          }
          .about-hero-content {
            padding: 48px 24px;
          }
          .about-hero-heading {
            font-size: 36px;
          }
          .about-hero-image-wrapper {
            width: 100%;
            height: 320px;
            min-height: 320px;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 25%);
            mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 25%);
          }
        }
      `}</style>
    </section>
  )
}
