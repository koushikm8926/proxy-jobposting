import React from 'react'
import { Cog, Users, Clock, TrendingUp } from 'lucide-react'

export const ModernRecruitmentNeeds: React.FC = () => {
  const points = [
    {
      icon: <Cog size={20} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Wide Range of Talent',
      description: 'Access candidates across multiple industries and experience levels.'
    },
    {
      icon: <Users size={20} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Trusted Platform',
      description: 'A reliable and transparent recruitment ecosystem.'
    },
    {
      icon: <Clock size={20} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Dedicated Support',
      description: 'Our team is here to assist you throughout your hiring journey.'
    },
    {
      icon: <TrendingUp size={20} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Growing Network',
      description: 'Starting from Bengaluru, expanding across India.'
    }
  ]

  return (
    <section className="modern-needs-section">
      <div className="container">
        <div className="modern-needs-grid">
          {/* Left: Professional Working Image */}
          <div className="needs-image-wrapper">
            <div className="needs-image-card">
              <img
                src="/images/recruiter_feature_woman.jpg"
                alt="Modern recruitment professional in office"
                className="needs-photo"
              />
            </div>
          </div>

          {/* Right: Content & 4 Features */}
          <div className="needs-content">
            <span className="section-kicker">WHY CHOOSE PROXHIRE</span>
            <h2 className="needs-title">Designed for Modern Recruitment Needs</h2>

            <div className="needs-points-list">
              {points.map((p, idx) => (
                <div key={idx} className="needs-point-row">
                  <div className="needs-point-icon">
                    {p.icon}
                  </div>
                  <div className="needs-point-text">
                    <h4 className="needs-point-title">{p.title}</h4>
                    <p className="needs-point-desc">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modern-needs-section {
          padding: 80px 0;
          background-color: #ffffff;
        }

        .modern-needs-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 60px;
          align-items: center;
        }

        .needs-image-wrapper {
          display: flex;
          justify-content: center;
        }

        .needs-image-card {
          width: 100%;
          max-width: 480px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.1);
          border: 1px solid #f0f0f4;
        }

        .needs-photo {
          width: 100%;
          height: 100%;
          max-height: 460px;
          object-fit: cover;
          display: block;
        }

        .needs-content {
          max-width: 520px;
        }

        .needs-title {
          font-size: 36px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin: 12px 0 32px;
        }

        .needs-points-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .needs-point-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .needs-point-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #f4f4f7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .needs-point-row:hover .needs-point-icon {
          transform: scale(1.1);
          background-color: #0c0d0e;
        }

        .needs-point-row:hover .needs-point-icon svg {
          stroke: #ffffff;
        }

        .needs-point-title {
          font-size: 16px;
          font-weight: 700;
          color: #0c0d0e;
          letter-spacing: -0.01em;
          margin-bottom: 4px;
        }

        .needs-point-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.55;
        }

        @media (max-width: 960px) {
          .modern-needs-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </section>
  )
}
