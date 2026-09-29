import React from 'react'
import { Users, Zap, ShieldCheck, TrendingUp } from 'lucide-react'

export const WhyHireThroughProxy: React.FC = () => {
  const cards = [
    {
      icon: <Users size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Relevant Candidates',
      description: 'Connect with candidates who match your industry, role and skill requirements.'
    },
    {
      icon: <Zap size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Faster Hiring',
      description: 'Reduce hiring time with a simple and efficient process.'
    },
    {
      icon: <ShieldCheck size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Verified Profiles',
      description: 'Access genuine and verified candidate information.'
    },
    {
      icon: <TrendingUp size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Build Your Pipeline',
      description: 'Create a long-term talent pipeline for current and future hiring needs.'
    }
  ]

  return (
    <section className="why-hire-section">
      <div className="container">
        <div className="why-hire-grid">
          {/* Left Text */}
          <div className="why-hire-left">
            <span className="section-kicker">WHY HIRE THROUGH PROXY</span>
            <h2 className="why-hire-title">A Smarter Way to Hire</h2>
            <p className="why-hire-desc">
              Proxy helps you discover relevant talent, reduce hiring time, and connect with candidates who match your requirements. Our platform is designed to make recruitment more efficient, transparent and convenient for businesses of all sizes.
            </p>
          </div>

          {/* Right 2x2 Grid */}
          <div className="why-hire-cards-grid">
            {cards.map((item, idx) => (
              <div key={idx} className="why-hire-card">
                <div className="why-hire-icon">{item.icon}</div>
                <h4 className="why-hire-card-title">{item.title}</h4>
                <p className="why-hire-card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .why-hire-section {
          padding: 80px 0;
          background-color: #ffffff;
        }

        .why-hire-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 64px;
          align-items: center;
        }

        .why-hire-left {
          max-width: 480px;
        }

        .why-hire-title {
          font-size: 38px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 12px 0 20px;
        }

        .why-hire-desc {
          font-size: 15px;
          color: #475467;
          line-height: 1.65;
        }

        .why-hire-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .why-hire-card {
          background-color: #f9f9fb;
          border: 1px solid #f0f0f4;
          border-radius: 18px;
          padding: 28px 24px;
          transition: all 0.25s ease;
        }

        .why-hire-card:hover {
          transform: translateY(-3px);
          background-color: #ffffff;
          border-color: #e4e4e7;
          box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.08);
        }

        .why-hire-icon {
          margin-bottom: 14px;
        }

        .why-hire-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #0c0d0e;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .why-hire-card-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.55;
        }

        @media (max-width: 960px) {
          .why-hire-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 560px) {
          .why-hire-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
