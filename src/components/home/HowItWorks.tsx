import React from 'react'
import {
  Lock,
  ShieldCheck,
  Database,
  Search,
  FileText,
  Fingerprint,
  UserCheck,
  Handshake,
  Building2,
  ChevronRight
} from 'lucide-react'
import { IMAGES } from '../../constants/images'

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Register & De-Duplicate',
      description:
        'Candidates register and complete identity verification. Our system checks for duplicate profiles before onboarding.',
      pills: [
        { label: 'Candidate Registration', icon: <FileText size={15} /> },
        { label: 'Identity Verification', icon: <Fingerprint size={15} /> },
        { label: 'Unique Profile', icon: <UserCheck size={15} /> }
      ]
    },
    {
      num: '02',
      title: 'Consent & Pre-BGV',
      description:
        'Candidates provide explicit digital consent before applicable verification checks are initiated through authorized integrations.',
      pills: [
        { label: 'Explicit Consent', icon: <Lock size={15} /> },
        { label: 'Verification Checks', icon: <FileText size={15} /> },
        { label: 'Verified Data', icon: <ShieldCheck size={15} /> }
      ],
      integrations: ['DigiLocker', 'e-Courts', 'EPFO / UAN']
    },
    {
      num: '03',
      title: 'Discover & Hire',
      description:
        'Recruiters access structured, verified candidate profiles, match via AI skill scores, shortlist candidates and move forward with hiring.',
      pills: [
        { label: 'Search Verified Talent', icon: <Search size={15} /> },
        { label: 'Shortlist Profiles', icon: <FileText size={15} /> },
        { label: 'Hire with Confidence', icon: <Handshake size={15} /> }
      ]
    }
  ]

  const trustGuarantees = [
    {
      icon: <Lock size={18} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Candidate Consent First',
      desc: 'Verification only with explicit consent.'
    },
    {
      icon: <ShieldCheck size={18} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Privacy Focused',
      desc: 'Built with DPDP-aligned principles.'
    },
    {
      icon: <Database size={18} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Secure Data Handling',
      desc: 'Authorized API integrations.'
    },
    {
      icon: <Search size={18} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Trusted Verification Integrations',
      desc: '(DigiLocker, e-Courts, EPFO / UAN)'
    }
  ]

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container" style={{ maxWidth: '1440px' }}>
        {/* Main Section Header */}
        <div className="hiw-section-header">
          <span className="hiw-kicker">── HOW IT WORKS ──</span>
          <h2 className="hiw-main-title">
            From Registration to <span className="gold-text">Verified Hiring.</span>
          </h2>
          <p className="hiw-subtitle">
            A structured verification-first journey designed to create greater confidence for both
            candidates and recruiters.
          </p>
        </div>

        {/* Unified 3D Stage with Cards Integrated Inside Over the Highway Track */}
        <div className="hiw-unified-stage-card">
          {/* Smooth Fade Overlays for seamless edge blending */}
          <div className="hiw-stage-edge-fade hiw-fade-left" />
          <div className="hiw-stage-edge-fade hiw-fade-right" />
          <div className="hiw-stage-edge-fade hiw-fade-top" />

          {/* Background 3D Track Render */}
          <img
            src={IMAGES.home.verifiedJourneyTrack}
            alt="3D Verified Journey Highway Track with Metallic X marks"
            className="hiw-stage-bg-image"
          />

          {/* Cards Overlay placed directly inside the 3D scene */}
          <div className="hiw-cards-overlay-grid">
            {steps.map((step, idx) => (
              <div key={idx} className={`hiw-integrated-card hiw-card-${idx + 1}`}>
                <div className="hiw-card-top-row">
                  <span className="hiw-step-badge">{step.num} ──</span>
                  <h3 className="hiw-card-heading">{step.title}</h3>
                </div>
                <p className="hiw-card-paragraph">{step.description}</p>

                {/* Sub-steps flow */}
                <div className="hiw-pills-flow">
                  {step.pills.map((pill, pIdx) => (
                    <React.Fragment key={pIdx}>
                      <div className="hiw-pill-item">
                        <span className="hiw-pill-ico">{pill.icon}</span>
                        <span className="hiw-pill-txt">{pill.label}</span>
                      </div>
                      {pIdx < step.pills.length - 1 && (
                        <ChevronRight size={13} className="hiw-pill-chevron" />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Integration Badges */}
                {step.integrations && (
                  <div className="hiw-chips-row">
                    {step.integrations.map((item, iIdx) => (
                      <span key={iIdx} className="hiw-chip-item">
                        <Building2 size={12} />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Connecting Stems from Cards to Road Pins */}
          <div className="hiw-stem-connector stem-col-1" />
          <div className="hiw-stem-connector stem-col-2" />
          <div className="hiw-stem-connector stem-col-3" />

          {/* Gold Glowing Waypoint Pins on the 3D Road */}
          <div className="hiw-waypoint-pin pin-col-1">
            <span className="hiw-waypoint-num">01</span>
          </div>
          <div className="hiw-waypoint-pin pin-col-2">
            <span className="hiw-waypoint-num">02</span>
          </div>
          <div className="hiw-waypoint-pin pin-col-3">
            <span className="hiw-waypoint-num">03</span>
          </div>
        </div>

        {/* Bottom Trust & Compliance Bar */}
        <div className="hiw-trust-bar">
          {trustGuarantees.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="hiw-trust-item">
                <div className="hiw-trust-icon">{item.icon}</div>
                <div className="hiw-trust-info">
                  <h4 className="hiw-trust-heading">{item.title}</h4>
                  <p className="hiw-trust-desc">{item.desc}</p>
                </div>
              </div>
              {idx < trustGuarantees.length - 1 && <div className="hiw-trust-divider" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .how-it-works-section {
          padding: 40px 0 64px;
          background-color: #ffffff;
          position: relative;
        }

        .hiw-section-header {
          text-align: center;
          margin-bottom: 36px;
          padding: 0 16px;
        }

        .hiw-kicker {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #52525b;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 8px;
        }

        .hiw-main-title {
          font-size: 46px;
          font-weight: 800;
          letter-spacing: -0.035em;
          color: #0c0d0e;
          line-height: 1.15;
          margin: 6px 0 14px;
        }

        .gold-text {
          color: #b88e38;
          background: linear-gradient(135deg, #a67c2e 0%, #c49a45 50%, #996e25 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hiw-subtitle {
          font-size: 16px;
          color: #52525b;
          line-height: 1.6;
          margin: 0 auto;
          max-width: 780px;
        }

        /* Unified 3D Stage Card */
        .hiw-unified-stage-card {
          position: relative;
          width: 100%;
          max-width: 1380px;
          margin: 0 auto 36px;
          border-radius: 28px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(234, 236, 240, 0.5);
          box-shadow: 0 20px 50px -15px rgba(12, 13, 14, 0.05);
          min-height: 640px;
        }

        .hiw-stage-bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center bottom;
          pointer-events: none;
          z-index: 1;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.15) 2%,
            rgba(0, 0, 0, 0.8) 6.5%,
            #000000 12%,
            #000000 88%,
            rgba(0, 0, 0, 0.8) 93.5%,
            rgba(0, 0, 0, 0.15) 98%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.15) 2%,
            rgba(0, 0, 0, 0.8) 6.5%,
            #000000 12%,
            #000000 88%,
            rgba(0, 0, 0, 0.8) 93.5%,
            rgba(0, 0, 0, 0.15) 98%,
            transparent 100%
          );
        }

        /* Smooth Edge Fade Overlays */
        .hiw-stage-edge-fade {
          position: absolute;
          pointer-events: none;
          z-index: 2;
        }

        .hiw-fade-left {
          top: 0;
          left: 0;
          bottom: 0;
          width: 130px;
          background: linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0.75) 40%, rgba(255, 255, 255, 0) 100%);
        }

        .hiw-fade-right {
          top: 0;
          right: 0;
          bottom: 0;
          width: 130px;
          background: linear-gradient(to left, #ffffff 0%, rgba(255, 255, 255, 0.75) 40%, rgba(255, 255, 255, 0) 100%);
        }

        .hiw-fade-top {
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
        }

        /* Cards Overlay placed directly inside the 3D Stage */
        .hiw-cards-overlay-grid {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 32px 11% 0;
          box-sizing: border-box;
        }

        .hiw-integrated-card {
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(228, 231, 236, 0.9);
          border-radius: 20px;
          padding: 24px 20px;
          box-shadow: 0 8px 24px rgba(12, 13, 14, 0.04);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .hiw-integrated-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(12, 13, 14, 0.09);
          border-color: rgba(184, 142, 56, 0.5);
        }

        .hiw-card-top-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 8px;
        }

        .hiw-step-badge {
          font-size: 20px;
          font-weight: 800;
          color: #b88e38;
          letter-spacing: -0.02em;
        }

        .hiw-card-heading {
          font-size: 18px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.015em;
          margin: 0;
        }

        .hiw-card-paragraph {
          font-size: 13.5px;
          line-height: 1.55;
          color: #475467;
          margin: 0 0 16px;
          min-height: 60px;
        }

        /* Flow Pills */
        .hiw-pills-flow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8fafc;
          border: 1px solid #edf2f7;
          border-radius: 12px;
          padding: 8px 10px;
          margin-top: auto;
        }

        .hiw-pill-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 5px;
          flex: 1;
        }

        .hiw-pill-ico {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0c0d0e;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
        }

        .hiw-pill-txt {
          font-size: 10.5px;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.2;
        }

        .hiw-pill-chevron {
          color: #94a3b8;
          flex-shrink: 0;
          margin: 0 2px;
        }

        /* Chips row */
        .hiw-chips-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hiw-chip-item {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 11px;
          font-weight: 700;
          color: #334155;
        }

        /* Connecting vertical stems */
        .hiw-stem-connector {
          position: absolute;
          width: 2px;
          height: 48px;
          background: linear-gradient(to bottom, rgba(184, 142, 56, 0.7), rgba(184, 142, 56, 0.2));
          z-index: 2;
          pointer-events: none;
        }

        .stem-col-1 {
          left: 24.5%;
          bottom: 27%;
        }

        .stem-col-2 {
          left: 50%;
          bottom: 26%;
        }

        .stem-col-3 {
          left: 75.5%;
          bottom: 27%;
        }

        /* Glowing Waypoint Pins */
        .hiw-waypoint-pin {
          position: absolute;
          z-index: 4;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .pin-col-1 {
          left: 19.5%;
          bottom: 18%;
        }

        .pin-col-2 {
          left: 50.1%;
          bottom: 16%;
        }

        .pin-col-3 {
          left: 80.6%;
          bottom: 18%;
        }

        .hiw-waypoint-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ffd782, #b88e38 70%, #7d5b19);
          color: #0c0d0e;
          font-size: 13px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(184, 142, 56, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.8);
          border: 2px solid #ffffff;
        }

        /* Bottom Trust Bar */
        .hiw-trust-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 28px;
          background: #f8fafc;
          border: 1px solid #eaecf0;
          border-radius: 18px;
          flex-wrap: wrap;
          gap: 16px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
        }

        .hiw-trust-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hiw-trust-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #ffffff;
          border: 1px solid #e4e7ec;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hiw-trust-info {
          display: flex;
          flex-direction: column;
        }

        .hiw-trust-heading {
          font-size: 13.5px;
          font-weight: 700;
          color: #0c0d0e;
          margin: 0;
        }

        .hiw-trust-desc {
          font-size: 12px;
          color: #64748b;
          margin: 2px 0 0;
        }

        .hiw-trust-divider {
          width: 1px;
          height: 28px;
          background: #cbd5e1;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .hiw-unified-stage-card {
            min-height: auto;
            background: #f8fafc;
          }
          .hiw-stage-bg-image {
            position: relative;
            height: 280px;
            object-fit: cover;
          }
          .hiw-cards-overlay-grid {
            grid-template-columns: 1fr;
            padding: 24px 16px;
          }
          .hiw-stem-connector,
          .hiw-waypoint-pin {
            display: none;
          }
          .hiw-card-paragraph {
            min-height: auto;
          }
          .hiw-trust-divider {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .hiw-main-title {
            font-size: 32px;
          }
          .hiw-trust-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  )
}
