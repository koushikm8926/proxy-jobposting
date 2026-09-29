import React from 'react'
import { User, Users, Rocket } from 'lucide-react'

export const WhyChooseProxy: React.FC = () => {
  const pillars = [
    {
      icon: <User size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'For Candidates',
      description: 'Genuine opportunities, trusted employers and a simpler way to build your career.'
    },
    {
      icon: <Users size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'For Recruiters',
      description: 'Relevant talent, efficient hiring and a stronger talent pipeline for your business.'
    },
    {
      icon: <Rocket size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'For the Future',
      description: 'A more transparent and technology-driven recruitment ecosystem across India.'
    }
  ]

  return (
    <section className="why-choose-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-kicker">WHY CHOOSE PROXY</span>
          <h2 className="section-title">Built for People. Designed for Growth.</h2>
        </div>

        {/* 3 Columns */}
        <div className="pillars-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card">
              <div className="pillar-icon-circle">
                {pillar.icon}
              </div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-choose-section {
          padding: 80px 0 60px;
          background-color: #ffffff;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1040px;
          margin: 0 auto;
        }

        .pillar-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 32px 24px;
          border-radius: 20px;
          transition: transform 0.25s ease;
        }

        .pillar-card:hover {
          transform: translateY(-4px);
        }

        .pillar-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: #f4f4f7;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: all 0.2s ease;
        }

        .pillar-card:hover .pillar-icon-circle {
          background-color: #0c0d0e;
          color: #ffffff;
        }

        .pillar-card:hover .pillar-icon-circle svg {
          stroke: #ffffff;
        }

        .pillar-title {
          font-size: 18px;
          font-weight: 700;
          color: #0c0d0e;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .pillar-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  )
}
