import React from 'react'
import { ShieldCheck, Users, TrendingUp } from 'lucide-react'

export const ReliablePartner: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Genuine & Verified Connections'
    },
    {
      icon: <Users size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Focused on Quality Talent'
    },
    {
      icon: <TrendingUp size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'A Stronger Hiring Ecosystem'
    }
  ]

  return (
    <section className="reliable-partner-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <span className="section-kicker">TRUST AT THE CORE</span>
          <h2 className="section-title">A Reliable Recruitment Partner</h2>
        </div>

        {/* 3 Pillars Row */}
        <div className="partner-pillars-grid">
          {pillars.map((item, idx) => (
            <div key={idx} className="partner-pillar-card">
              <div className="partner-pillar-icon">
                {item.icon}
              </div>
              <h4 className="partner-pillar-title">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .reliable-partner-section {
          padding: 60px 0 70px;
          background-color: #ffffff;
        }

        .partner-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          max-width: 980px;
          margin: 0 auto;
        }

        .partner-pillar-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px 16px;
        }

        .partner-pillar-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: #f4f4f7;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .partner-pillar-card:hover .partner-pillar-icon {
          transform: translateY(-2px);
          background-color: #0c0d0e;
        }

        .partner-pillar-card:hover .partner-pillar-icon svg {
          stroke: #ffffff;
        }

        .partner-pillar-title {
          font-size: 15px;
          font-weight: 700;
          color: #0c0d0e;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        @media (max-width: 768px) {
          .partner-pillars-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  )
}
