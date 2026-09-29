import React from 'react'
import { UserCheck, Zap, ShieldCheck, Users } from 'lucide-react'

export const WhyProxy: React.FC = () => {
  const features = [
    {
      icon: <UserCheck size={26} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Trusted Platform',
      description: 'A reliable space for genuine opportunities and relevant talent.'
    },
    {
      icon: <Zap size={26} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Simple & Efficient',
      description: 'Making recruitment easier and faster for everyone.'
    },
    {
      icon: <ShieldCheck size={26} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Technology Driven',
      description: "A modern platform designed for today's hiring needs."
    },
    {
      icon: <Users size={26} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Growing Network',
      description: 'Building a strong ecosystems across India, starting from Bengaluru.'
    }
  ]

  return (
    <section id="why-proxy" className="why-proxy-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-kicker">WHY PROXY</span>
          <h2 className="section-title">A Smarter Way to Build Careers and Teams</h2>
          <p className="section-subtitle">
            Proxy is a recruitment platform designed to make hiring simple, transparent and technology-driven for both candidates and employers.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="features-grid">
          {features.map((item, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-wrapper">
                {item.icon}
              </div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-proxy-section {
          padding: 80px 0;
          background-color: #ffffff;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .feature-card {
          background-color: #f9f9fb;
          border: 1px solid #f0f0f4;
          border-radius: 18px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          background-color: #ffffff;
          border-color: #e4e4e7;
          box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.08);
        }

        .feature-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: transform 0.2s ease;
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1);
        }

        .feature-title {
          font-size: 17px;
          font-weight: 700;
          color: #0c0d0e;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .feature-description {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.55;
        }

        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 600px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
