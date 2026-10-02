import React from 'react'
import {
  ArrowRight,
  FileCheck2,
  ShieldCheck,
  Users,
  Target,
  Lock,
  Database,
  Search
} from 'lucide-react'
import { IMAGES } from '../../constants/images'

interface PreVerifiedHiringProps {
  onRegisterRecruiter?: () => void
}

export const PreVerifiedHiring: React.FC<PreVerifiedHiringProps> = ({
  onRegisterRecruiter
}) => {
  const features = [
    {
      icon: <FileCheck2 size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'De-Duplicated Profiles',
      description:
        'Multi-factor identity resolution helps identify and prevent duplicate candidate accounts.'
    },
    {
      icon: <ShieldCheck size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Pre-BGV Screening',
      description:
        'Candidate-authorized verification workflows can support identity, employment and relevant background checks.'
    },
    {
      icon: <Users size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Verified Talent Pool',
      description:
        'Recruiters can discover candidates with clearly displayed verification status and profile information.'
    },
    {
      icon: <Target size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Smarter Candidate Matching',
      description:
        'AI skill-based matching helps recruiters find the right talent faster and reduces the risk of offer drop-offs due to verification delays.'
    }
  ]

  const trustPillars = [
    {
      icon: <Lock size={18} color="#0c0d0e" strokeWidth={2.2} />,
      text: 'Explicit Candidate Consent'
    },
    {
      icon: <ShieldCheck size={18} color="#0c0d0e" strokeWidth={2.2} />,
      text: 'DPDP Act Aligned'
    },
    {
      icon: <Database size={18} color="#0c0d0e" strokeWidth={2.2} />,
      text: 'Secure Data Handling'
    },
    {
      icon: <Search size={18} color="#0c0d0e" strokeWidth={2.2} />,
      text: 'Trusted Verification Integrations (DigiLocker, e-Courts, EPFO / UAN)'
    }
  ]

  return (
    <section id="verified-hiring" className="verified-hiring-section">
      <div className="container" style={{ maxWidth: '1440px' }}>
        {/* Main Content & Visual Grid */}
        <div className="verified-hero-grid">
          {/* Left Column: Heading, Subtitle & Single CTA Button */}
          <div className="verified-left-col">
            <span className="verified-kicker">── VERIFIED HIRING</span>

            <h2 className="verified-headline">
              Hire <span className="gold-text">Pre-Verified</span> Talent with{' '}
              <span className="gold-text">Zero Duplicate Profiles.</span>
            </h2>

            <p className="verified-subtext">
              Access a cleaner talent pool built around identity verification, candidate consent
              and pre-BGV screening — helping recruiters spend less time validating profiles and
              more time hiring.
            </p>

            {/* Single CTA Button without Request a Demo */}
            <div className="verified-action-row">
              <button
                type="button"
                className="btn-recruiter-cta"
                onClick={onRegisterRecruiter}
              >
                <span>Register as a Recruiter</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Architectural Visual */}
          <div className="verified-right-col">
            <div className="visual-card-frame">
              <img
                src={IMAGES.home.preVerifiedTalentShowcase}
                alt="ProxHire Verified Candidate Screening with DigiLocker, e-Courts, EPFO"
                className="visual-card-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="verified-features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="verified-feature-card">
              <div className="feature-icon-wrapper">{feature.icon}</div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Trust & Compliance Bar */}
        <div className="verified-trust-bar">
          {trustPillars.map((pillar, idx) => (
            <React.Fragment key={idx}>
              <div className="trust-pillar-item">
                <span className="trust-pillar-icon">{pillar.icon}</span>
                <span className="trust-pillar-text">{pillar.text}</span>
              </div>
              {idx < trustPillars.length - 1 && <div className="trust-pillar-sep" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .verified-hiring-section {
          padding: 60px 0 72px;
          background-color: #ffffff;
          border-top: 1px solid #f1f3f5;
        }

        .verified-hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
          margin-bottom: 56px;
          padding: 0 12px;
          box-sizing: border-box;
        }

        .verified-left-col {
          display: flex;
          flex-direction: column;
          max-width: 620px;
        }

        .verified-kicker {
          font-size: 12.5px;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #52525b;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .verified-headline {
          font-size: 48px;
          font-weight: 800;
          letter-spacing: -0.035em;
          color: #0c0d0e;
          line-height: 1.15;
          margin: 0 0 20px;
        }

        .gold-text {
          color: #b88e38;
          background: linear-gradient(135deg, #a67c2e 0%, #c49a45 50%, #996e25 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .verified-subtext {
          font-size: 16px;
          line-height: 1.65;
          color: #475467;
          margin: 0 0 32px;
        }

        .verified-action-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 0;
        }

        .btn-recruiter-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #0c0d0e;
          color: #ffffff;
          padding: 14px 28px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 700;
          border: 1px solid #0c0d0e;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(12, 13, 14, 0.12);
        }

        .btn-recruiter-cta:hover {
          background: #27272a;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(12, 13, 14, 0.18);
        }


        /* Right Column Visual Frame */
        .verified-right-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .visual-card-frame {
          width: 100%;
          max-width: 580px;
          border-radius: 24px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #eaecf0;
          box-shadow: 0 20px 48px -12px rgba(12, 13, 14, 0.08);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .visual-card-frame:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 60px -12px rgba(12, 13, 14, 0.14);
        }

        .visual-card-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* 4 Feature Pillars Grid */
        .verified-features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 48px;
          padding: 0 12px;
          box-sizing: border-box;
        }

        .verified-feature-card {
          background: #ffffff;
          border: 1px solid #eaecf0;
          border-radius: 18px;
          padding: 28px 24px;
          transition: all 0.25s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
        }

        .verified-feature-card:hover {
          border-color: #d0d5dd;
          box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.06);
          transform: translateY(-2px);
        }

        .feature-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #edf2f7;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .feature-card-title {
          font-size: 18px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.015em;
          margin: 0 0 10px;
        }

        .feature-card-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: #475467;
          margin: 0;
        }

        /* Bottom Trust & Compliance Bar */
        .verified-trust-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px;
          background: #f8fafc;
          border-radius: 16px;
          border: 1px solid #eaecf0;
          margin: 0 12px;
          box-sizing: border-box;
          flex-wrap: wrap;
          gap: 16px;
        }

        .trust-pillar-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .trust-pillar-icon {
          display: flex;
          align-items: center;
          color: #0c0d0e;
        }

        .trust-pillar-text {
          font-size: 13px;
          font-weight: 700;
          color: #334155;
          letter-spacing: -0.01em;
        }

        .trust-pillar-sep {
          width: 1px;
          height: 20px;
          background: #cbd5e1;
        }

        /* Responsive */
        @media (max-width: 1080px) {
          .verified-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .verified-left-col {
            max-width: 100%;
          }
          .visual-card-frame {
            max-width: 100%;
          }
          .verified-features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .trust-pillar-sep {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .verified-headline {
            font-size: 34px;
          }
          .verified-features-grid {
            grid-template-columns: 1fr;
          }
          .verified-trust-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  )
}
