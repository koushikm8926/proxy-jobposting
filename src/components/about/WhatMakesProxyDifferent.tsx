import React from 'react'
import { ShieldCheck, Users, Zap, TrendingUp } from 'lucide-react'

export const WhatMakesProxyDifferent: React.FC = () => {
  const differentiators = [
    {
      icon: <ShieldCheck size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Trust & Transparency',
      description: 'Genuine opportunities and verified connections.'
    },
    {
      icon: <Users size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'People First Approach',
      description: 'Focused on candidates and employers.'
    },
    {
      icon: <Zap size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Efficient Hiring',
      description: 'Technology-driven for faster and better results.'
    },
    {
      icon: <TrendingUp size={24} color="#0c0d0e" strokeWidth={2.2} />,
      title: 'Growing Ecosystem',
      description: 'Starting from Bengaluru, expanding across India.'
    }
  ]

  return (
    <section className="different-section">
      <div className="container">
        <div className="different-grid">
          {/* Left Column: Heading & Philosophy */}
          <div className="different-left">
            <span className="section-kicker">WHAT MAKES PROXY DIFFERENT</span>
            <h2 className="different-title">Trust at the Core of Recruitment</h2>
            <p className="different-desc">
              At Proxy, we believe recruitment should be simple, transparent and trustworthy. Our focus is on creating genuine opportunities for candidates and helping employers connect with relevant talent through a technology-driven platform.
            </p>
          </div>

          {/* Right Column: 2x2 Feature Grid */}
          <div className="different-pillars-grid">
            {differentiators.map((item, idx) => (
              <div key={idx} className="diff-pillar-item">
                <div className="diff-icon-box">
                  {item.icon}
                </div>
                <h4 className="diff-pillar-title">{item.title}</h4>
                <p className="diff-pillar-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .different-section {
          padding: 80px 0;
          background-color: #ffffff;
        }

        .different-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .different-left {
          max-width: 480px;
        }

        .different-title {
          font-size: 36px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin: 12px 0 20px;
        }

        .different-desc {
          font-size: 15px;
          color: #475467;
          line-height: 1.65;
        }

        .different-pillars-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px 28px;
        }

        .diff-pillar-item {
          display: flex;
          flex-direction: column;
        }

        .diff-icon-box {
          margin-bottom: 12px;
          color: #0c0d0e;
        }

        .diff-pillar-title {
          font-size: 16px;
          font-weight: 700;
          color: #0c0d0e;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .diff-pillar-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .different-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 540px) {
          .different-pillars-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  )
}
