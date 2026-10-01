import React from 'react'
import { FileEdit, Database, PhoneCall, ArrowRight } from 'lucide-react'

export const WhatHappensNext: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Submit Your Details',
      desc: 'Fill out the registration form with your basic details, experience, and upload your resume.',
      icon: FileEdit
    },
    {
      num: '02',
      title: 'Details Saved',
      desc: 'Our talent team reviews and verifies your profile, matching your skillset with active job openings.',
      icon: Database
    },
    {
      num: '03',
      title: 'Get a Call from Our Team',
      desc: 'When a matching opportunity arises, we contact you directly with interview details and next steps.',
      icon: PhoneCall
    }
  ]

  return (
    <section id="what-happens-next" style={{ padding: '72px 0 80px', backgroundColor: '#ffffff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }}>
          <span className="section-kicker">TRANSPARENT PROCESS</span>
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#0c0d0e',
              margin: '10px 0 14px'
            }}
          >
            What Happens Next?
          </h2>
          <p style={{ fontSize: '15.5px', color: '#52525b', lineHeight: 1.6, margin: 0 }}>
            Here is what you can expect after submitting your registration with ProxHire.
          </p>
        </div>

        <div className="next-steps-grid">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="next-step-card">
                <div className="next-step-top">
                  <div className="next-step-badge">{step.num}</div>
                  <div className="next-step-icon-wrap">
                    <Icon size={22} color="#0c0d0e" />
                  </div>
                </div>

                <h3 className="next-step-title">{step.title}</h3>
                <p className="next-step-desc">{step.desc}</p>

                {idx < steps.length - 1 && (
                  <div className="next-step-arrow-connector">
                    <ArrowRight size={20} color="#cbd5e1" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .next-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          position: relative;
        }

        .next-step-card {
          background-color: #fafafa;
          border: 1px solid #e4e4e7;
          border-radius: 20px;
          padding: 32px 28px;
          position: relative;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .next-step-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.05);
          background-color: #ffffff;
        }

        .next-step-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .next-step-badge {
          font-size: 13px;
          font-weight: 800;
          color: #71717a;
          letter-spacing: 0.05em;
          background-color: #f4f4f5;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .next-step-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .next-step-title {
          font-size: 19px;
          font-weight: 700;
          color: #0c0d0e;
          margin: 0 0 10px;
          letter-spacing: -0.015em;
        }

        .next-step-desc {
          font-size: 14px;
          color: #52525b;
          line-height: 1.6;
          margin: 0;
        }

        .next-step-arrow-connector {
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 960px) {
          .next-steps-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .next-step-arrow-connector {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
