import React from 'react'
import { FileText, ShieldCheck, FileCheck, Briefcase, ArrowRight } from 'lucide-react'

export const CandidateHowItWorks: React.FC = () => {
  const steps = [
    {
      num: '1. Register',
      icon: <FileText size={22} color="#0c0d0e" />,
      desc: 'Share your basic details through a simple registration form.'
    },
    {
      num: '2. Get Verified',
      icon: <ShieldCheck size={22} color="#0c0d0e" />,
      desc: 'We verify your information to ensure a trustworthy experience.'
    },
    {
      num: '3. Complete Profile',
      icon: <FileCheck size={22} color="#0c0d0e" />,
      desc: 'Create your professional profile and highlight your skills and experience.'
    },
    {
      num: '4. Get Opportunities',
      icon: <Briefcase size={22} color="#0c0d0e" />,
      desc: 'Our team will connect you with relevant job opportunities.'
    },
  ]

  return (
    <section className="cand-process-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-kicker">HOW IT WORKS</span>
          <h2 className="section-title">A Simple Journey to Your Next Opportunity</h2>
          <p className="section-subtitle">
            Get started in just a few simple steps.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="cand-steps-row">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="cand-step-card">
                <div className="cand-step-icon-wrap">
                  {step.icon}
                </div>
                <h4 className="cand-step-num">{step.num}</h4>
                <p className="cand-step-desc">{step.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="cand-step-arrow">
                  <ArrowRight size={18} color="#9ca3af" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .cand-process-section {
          padding: 80px 0;
          background-color: #ffffff;
        }

        .cand-steps-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          max-width: 1040px;
          margin: 0 auto;
        }

        .cand-step-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 210px;
          flex: 1;
        }

        .cand-step-icon-wrap {
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

        .cand-step-card:hover .cand-step-icon-wrap {
          transform: translateY(-2px);
          background-color: #0c0d0e;
        }

        .cand-step-card:hover .cand-step-icon-wrap svg {
          stroke: #ffffff;
        }

        .cand-step-num {
          font-size: 15px;
          font-weight: 700;
          color: #0c0d0e;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .cand-step-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.55;
        }

        .cand-step-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 16px;
          flex-shrink: 0;
        }

        @media (max-width: 820px) {
          .cand-steps-row {
            flex-direction: column;
            align-items: center;
            gap: 24px;
          }
          .cand-step-card {
            max-width: 320px;
          }
          .cand-step-arrow {
            transform: rotate(90deg);
            padding: 0;
          }
        }
      `}</style>
    </section>
  )
}
