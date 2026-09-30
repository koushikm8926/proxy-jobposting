import React from 'react'
import { User, Users, Rocket } from 'lucide-react'

export const WhyChooseProxy: React.FC = () => {
  const pillars = [
    {
      icon: <User size={34} color="#0c0d0e" strokeWidth={2.8} />,
      title: 'For Candidates',
      description: 'Genuine opportunities, trusted employers and a simpler way to build your career.'
    },
    {
      icon: <Users size={36} color="#0c0d0e" strokeWidth={2.8} />,
      title: 'For Recruiters',
      description: 'Relevant talent, efficient hiring and a stronger talent pipeline for your business.'
    },
    {
      icon: <Rocket size={34} color="#0c0d0e" strokeWidth={2.8} />,
      title: 'For the Future',
      description: 'A more transparent and technology-driven recruitment ecosystem across India.'
    }
  ]

  return (
    <section className="why-choose-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span className="section-kicker" style={{ color: '#52525b', letterSpacing: '0.18em', fontWeight: 800 }}>
            WHY CHOOSE PROXY
          </span>
          <h2 className="why-choose-title">
            Built for People. Designed for Growth.
          </h2>
        </div>

        {/* 3 Large & Bold Columns Grid */}
        <div className="pillars-grid-large">
          {pillars.map((pillar, idx) => (
            <div key={idx} className={`pillar-card-bold reveal-on-scroll delay-${(idx + 1) * 100}`}>
              <div className="pillar-icon-circle-large">
                {pillar.icon}
              </div>
              <h3 className="pillar-title-large">{pillar.title}</h3>
              <p className="pillar-desc-bold">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-choose-section {
          padding: 24px 0 20px;
          background-color: #ffffff;
        }

        .why-choose-title {
          font-size: 42px;
          font-weight: 800;
          letter-spacing: -0.035em;
          color: #0c0d0e;
          margin: 12px 0 0;
          line-height: 1.15;
        }

        .pillars-grid-large {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 36px;
          max-width: 1140px;
          margin: 0 auto;
        }

        .pillar-card-bold {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px 20px;
          border-radius: 24px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pillar-card-bold:hover {
          transform: translateY(-5px);
        }

        .pillar-card-bold:hover .pillar-icon-circle-large {
          transform: scale(1.1) translateY(-2px);
        }

        .pillar-icon-circle-large {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          background-color: #f4f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .pillar-card-bold:hover .pillar-icon-circle-large {
          background-color: #ffffff;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          transform: scale(1.08);
        }

        .pillar-title-large {
          font-size: 24px;
          font-weight: 800;
          color: #0c0d0e;
          margin: 0 0 14px;
          letter-spacing: -0.02em;
        }

        .pillar-desc-bold {
          font-size: 15px;
          font-weight: 600;
          color: #52525b;
          line-height: 1.6;
          max-width: 320px;
          margin: 0 auto;
        }

        @media (max-width: 960px) {
          .why-choose-section {
            padding: 24px 0 20px;
          }
          .why-choose-title {
            font-size: 34px;
          }
          .pillars-grid-large {
            grid-template-columns: 1fr;
            gap: 28px;
            max-width: 480px;
          }
          .pillar-card-bold {
            padding: 16px;
          }
        }
      `}</style>
    </section>
  )
}
