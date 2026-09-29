import React from 'react'
import { Briefcase, Zap, TrendingUp, Users } from 'lucide-react'

export const WhyChooseProxyCareer: React.FC = () => {
  const cards = [
    {
      icon: <Briefcase size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Genuine Opportunities',
      description: 'Discover real job opportunities from verified employers.'
    },
    {
      icon: <Zap size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Simple & Easy',
      description: 'A hassle-free registration process to get started.'
    },
    {
      icon: <TrendingUp size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Career Growth',
      description: 'Opportunities across industries and experience levels.'
    },
    {
      icon: <Users size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Trusted Platform',
      description: 'A reliable and transparent recruitment ecosystem.'
    }
  ]

  return (
    <section className="why-career-section">
      <div className="container">
        <div className="why-career-grid">
          {/* Left Text */}
          <div className="why-career-left">
            <span className="section-kicker">WHY CHOOSE PROXY</span>
            <h2 className="why-career-title">A Better Way for Your Career</h2>
            <p className="why-career-desc">
              Proxy connects you with relevant job opportunities across industries, helping you take the next step in your career with confidence.
            </p>
          </div>

          {/* Right 2x2 Grid */}
          <div className="why-career-cards-grid">
            {cards.map((item, idx) => (
              <div key={idx} className="why-career-card">
                <div className="why-career-icon">{item.icon}</div>
                <h4 className="why-career-card-title">{item.title}</h4>
                <p className="why-career-card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .why-career-section {
          padding: 80px 0;
          background-color: #ffffff;
        }

        .why-career-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 64px;
          align-items: center;
        }

        .why-career-left {
          max-width: 480px;
        }

        .why-career-title {
          font-size: 38px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 12px 0 20px;
        }

        .why-career-desc {
          font-size: 15px;
          color: #475467;
          line-height: 1.65;
        }

        .why-career-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .why-career-card {
          background-color: #f9f9fb;
          border: 1px solid #f0f0f4;
          border-radius: 18px;
          padding: 28px 24px;
          transition: all 0.25s ease;
        }

        .why-career-card:hover {
          transform: translateY(-3px);
          background-color: #ffffff;
          border-color: #e4e4e7;
          box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.08);
        }

        .why-career-icon {
          margin-bottom: 14px;
        }

        .why-career-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #0c0d0e;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .why-career-card-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.55;
        }

        @media (max-width: 960px) {
          .why-career-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 560px) {
          .why-career-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
