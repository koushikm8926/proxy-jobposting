import React from 'react'
import { CheckCircle, Layers, Award, Users } from 'lucide-react'

export const TrustedByJobSeekers: React.FC = () => {
  const trustItems = [
    {
      icon: CheckCircle,
      title: 'Genuine Opportunities',
      subtitle: 'Only verified and active job openings'
    },
    {
      icon: Layers,
      title: 'Wide Range of Industries',
      subtitle: 'From entry-level to leadership roles'
    },
    {
      icon: Award,
      title: 'Career Support',
      subtitle: 'Guidance throughout your job search'
    },
    {
      icon: Users,
      title: 'Growing Network',
      subtitle: 'Trusted by candidates across India'
    }
  ]

  return (
    <section id="trusted-by-seekers" style={{ padding: '60px 0', backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-kicker">PROVEN TRACK RECORD</span>
          <h3
            style={{
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#0c0d0e',
              margin: '8px 0 0'
            }}
          >
            Trusted by Job Seekers
          </h3>
        </div>

        <div className="trust-seekers-grid">
          {trustItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="trust-seeker-item">
                <div className="trust-seeker-icon-wrap">
                  <Icon size={24} color="#0c0d0e" strokeWidth={2} />
                </div>
                <div className="trust-seeker-content">
                  <h4 className="trust-seeker-title">{item.title}</h4>
                  <p className="trust-seeker-subtitle">{item.subtitle}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .trust-seekers-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .trust-seeker-item {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .trust-seeker-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        }

        .trust-seeker-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .trust-seeker-title {
          font-size: 15px;
          font-weight: 700;
          color: #0c0d0e;
          margin: 0 0 3px;
        }

        .trust-seeker-subtitle {
          font-size: 12.5px;
          color: #64748b;
          margin: 0;
          line-height: 1.4;
        }

        @media (max-width: 960px) {
          .trust-seekers-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 600px) {
          .trust-seekers-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
