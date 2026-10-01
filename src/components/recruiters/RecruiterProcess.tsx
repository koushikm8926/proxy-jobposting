import React from 'react'
import { FileText, ShieldCheck, Users, Search, ArrowRight } from 'lucide-react'

export const RecruiterProcess: React.FC = () => {
  const steps = [
    {
      num: '1. Register',
      icon: <FileText size={22} color="#0c0d0e" />,
      desc: 'Share your company details through a simple registration form.'
    },
    {
      num: '2. Get Verified',
      icon: <ShieldCheck size={22} color="#0c0d0e" />,
      desc: 'Our team verifies your details for a trusted experience.'
    },
    {
      num: '3. Share Requirements',
      icon: <Users size={22} color="#0c0d0e" />,
      desc: 'Let us know your hiring needs, roles and preferences.'
    },
    {
      num: '4. Get Relevant Talent',
      icon: <Search size={22} color="#0c0d0e" />,
      desc: 'We connect you with suitable and verified candidates.'
    },
  ]

  return (
    <section className="rec-process-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-kicker">HOW IT WORKS</span>
          <h2 className="section-title">A Simple Recruitment Process</h2>
          <p className="section-subtitle">
            From registration to connecting with candidates, ProxHire makes hiring simple and efficient.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="rec-steps-row">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="rec-step-card">
                <div className="rec-step-icon-wrap">
                  {step.icon}
                </div>
                <h4 className="rec-step-num">{step.num}</h4>
                <p className="rec-step-desc">{step.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="rec-step-arrow">
                  <ArrowRight size={18} color="#9ca3af" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .rec-process-section {
          padding: 80px 0;
          background-color: #ffffff;
        }

        .rec-steps-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          max-width: 1040px;
          margin: 0 auto;
        }

        .rec-step-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 210px;
          flex: 1;
        }

        .rec-step-icon-wrap {
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

        .rec-step-card:hover .rec-step-icon-wrap {
          transform: translateY(-2px);
          background-color: #0c0d0e;
        }

        .rec-step-card:hover .rec-step-icon-wrap svg {
          stroke: #ffffff;
        }

        .rec-step-num {
          font-size: 15px;
          font-weight: 700;
          color: #0c0d0e;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .rec-step-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.55;
        }

        .rec-step-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 16px;
          flex-shrink: 0;
        }

        @media (max-width: 820px) {
          .rec-steps-row {
            flex-direction: column;
            align-items: center;
            gap: 24px;
          }
          .rec-step-card {
            max-width: 320px;
          }
          .rec-step-arrow {
            transform: rotate(90deg);
            padding: 0;
          }
        }
      `}</style>
    </section>
  )
}
