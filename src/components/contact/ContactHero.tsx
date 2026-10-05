import React from 'react'
import { ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react'

interface ContactHeroProps {
  onScrollToForm?: () => void
}

export const ContactHero: React.FC<ContactHeroProps> = ({ onScrollToForm }) => {
  const handleScrollToForm = () => {
    if (onScrollToForm) {
      onScrollToForm()
    } else {
      const el = document.getElementById('contact-form-section')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="contact-hero" className="contact-hero-root">
      {/* Subtle organic contour wave in top-left corner */}
      <div className="contact-contour-waves">
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="contour-svg"
        >
          <path
            d="M-50 40C60 40 120 90 140 160C160 230 220 270 320 270"
            stroke="rgba(0, 0, 0, 0.04)"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <path
            d="M-80 120C40 120 90 160 110 220C130 280 190 320 280 320"
            stroke="rgba(0, 0, 0, 0.025)"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="contact-container-fluid">
        {/* Left Side: Content & Actions */}
        <div className="contact-text-block">
          <span className="contact-kicker">CONTACT US</span>

          <h1 className="contact-main-title">
            We're Here<br />
            to Help You.
          </h1>

          <p className="contact-paragraph">
            Have questions or need assistance? Connect with our dedicated support team for candidate registrations, recruiter inquiries, or any platform assistance.
          </p>

          <div className="contact-cta-group">
            <button
              type="button"
              className="btn btn-primary contact-pill-btn contact-pill-black"
              onClick={handleScrollToForm}
            >
              <span>Get in Touch</span>
              <ArrowRight size={17} />
            </button>
          </div>

          {/* 3 Horizontal Badges */}
          <div className="contact-badges-row">
            <div className="contact-badge-item">
              <div className="contact-badge-icon">
                <Clock size={18} color="#0c0d0e" strokeWidth={2.2} />
              </div>
              <div className="contact-badge-text">
                <span>Fast</span>
                <span>Response</span>
              </div>
            </div>

            <div className="contact-badge-item">
              <div className="contact-badge-icon">
                <ShieldCheck size={18} color="#0c0d0e" strokeWidth={2.2} />
              </div>
              <div className="contact-badge-text">
                <span>Dedicated</span>
                <span>Support</span>
              </div>
            </div>

            <div className="contact-badge-item">
              <div className="contact-badge-icon">
                <MapPin size={18} color="#0c0d0e" strokeWidth={2.2} />
              </div>
              <div className="contact-badge-text">
                <span>Bengaluru</span>
                <span>Headquarters</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Panoramic Integrated Visual spanning to right screen edge */}
        <div className="contact-panoramic-visual">
          <img
            src="/images/contact/contact-support-workspace.png"
            alt="ProxHire Global Contact Support Workspace"
            className="contact-feathered-img"
          />
        </div>
      </div>

      <style>{`
        .contact-hero-root {
          position: relative;
          background-color: #ffffff;
          overflow: hidden;
          width: 100%;
          min-height: 520px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #f4f4f5;
        }

        .contact-contour-waves {
          position: absolute;
          top: 0;
          left: 0;
          width: 380px;
          height: 300px;
          pointer-events: none;
          z-index: 0;
          transform-origin: top left;
        }

        .contour-svg {
          width: 100%;
          height: 100%;
        }

        /* Fluid container with ZERO right margin/padding so visual touches right edge */
        .contact-container-fluid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.05fr 1.25fr;
          align-items: center;
          gap: 0;
          width: 100%;
          padding-left: clamp(16px, 5vw, 72px);
          padding-right: 0;
          box-sizing: border-box;
        }

        /* Left Content */
        .contact-text-block {
          max-width: 520px;
          padding-top: 40px;
          padding-bottom: 48px;
          padding-right: 32px;
        }

        .contact-kicker {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #52525b;
          text-transform: uppercase;
          display: block;
          margin-bottom: 12px;
        }

        .contact-main-title {
          font-size: 58px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.08;
          color: #0c0d0e;
          margin: 0 0 20px;
        }

        .contact-paragraph {
          font-size: 16px;
          color: #475467;
          line-height: 1.6;
          margin: 0 0 32px;
          max-width: 460px;
        }

        .contact-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
        }

        .contact-pill-btn {
          height: 48px;
          padding: 0 28px;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-pill-black {
          background-color: #0c0d0e;
          color: #ffffff;
          border: 1px solid #0c0d0e;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
        }

        .contact-pill-black:hover {
          background-color: #27272a;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        /* 3 Badges Row */
        .contact-badges-row {
          display: flex;
          align-items: center;
          gap: 28px;
          padding-top: 8px;
          border-top: 1px solid #f4f4f6;
        }

        .contact-badge-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .contact-badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-badge-text {
          display: flex;
          flex-direction: column;
          font-size: 13px;
          font-weight: 700;
          color: #0c0d0e;
          line-height: 1.25;
        }

        /* Right Panoramic Visual: 100% Flush to the Right Edge of the Screen with Smooth Fade */
        .contact-panoramic-visual {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          height: 100%;
          min-height: 520px;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #ffffff;
        }

        .contact-feathered-img {
          width: 100%;
          height: 100%;
          min-height: 520px;
          max-height: 580px;
          object-fit: cover;
          object-position: center;
          display: block;
          margin: 0;
          padding: 0;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0.85) 16%, #000000 26%);
          mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.15) 5%, rgba(0, 0, 0, 0.85) 16%, #000000 26%);
        }

        .contact-panoramic-visual:hover .contact-feathered-img {
          transform: scale(1.02);
        }

        @media (max-width: 990px) {
          .contact-hero-root {
            min-height: auto;
          }
          .contact-container-fluid {
            grid-template-columns: 1fr;
            padding-left: 20px;
            padding-right: 0;
            padding-top: 24px;
            padding-bottom: 0;
          }
          .contact-text-block {
            max-width: 100%;
            padding-right: 20px;
            padding-bottom: 32px;
          }
          .contact-main-title {
            font-size: 42px;
          }
          .contact-panoramic-visual {
            justify-content: center;
            min-height: 320px;
          }
          .contact-feathered-img {
            min-height: 320px;
            max-height: 380px;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 20%);
            mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 20%);
          }
        }

        @media (max-width: 600px) {
          .contact-main-title {
            font-size: 34px;
          }
          .contact-paragraph {
            font-size: 14.5px;
          }
          .contact-badges-row {
            flex-wrap: wrap;
            gap: 16px;
          }
          .contact-pill-btn {
            width: 100%;
            justify-content: center;
          }
          .contact-text-block {
            padding-right: 16px;
          }
          .contact-feathered-img {
            min-height: 260px;
            max-height: 300px;
          }
          .contact-panoramic-visual {
            min-height: 260px;
          }
        }

        @media (max-width: 400px) {
          .contact-main-title {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  )
}
