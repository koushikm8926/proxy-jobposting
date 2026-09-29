import React from 'react'
import {
  UserPlus,
  FileText,
  ShieldCheck,
  Briefcase,
  Building2,
  Users,
  CheckCircle2,
  ChevronRight
} from 'lucide-react'

export const HowItWorks: React.FC = () => {
  const candidateSteps = [
    { icon: <UserPlus size={22} />, title: 'Register' },
    { icon: <FileText size={22} />, title: 'Create Profile' },
    { icon: <ShieldCheck size={22} />, title: 'Get Verified' },
    { icon: <Briefcase size={22} />, title: 'Connect with Employers' },
  ]

  const recruiterSteps = [
    { icon: <Building2 size={22} />, title: 'Register Company' },
    { icon: <ShieldCheck size={22} />, title: 'Get Verified' },
    { icon: <Users size={22} />, title: 'Find Relevant Talent' },
    { icon: <CheckCircle2 size={22} />, title: 'Hire Faster' },
  ]

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-kicker">HOW PROXY WORKS</span>
          <h2 className="section-title">A Simple Journey for a Brighter Future</h2>
          <p className="section-subtitle">
            A seamless process for both candidates and recruiters.
          </p>
        </div>

        {/* Dual Workflow Container */}
        <div className="workflows-wrapper">
          {/* Candidates Track */}
          <div className="track-container">
            <h3 className="track-title">For Candidates</h3>
            <div className="steps-flow">
              {candidateSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="step-node">
                    <div className="step-icon-circle">
                      {step.icon}
                    </div>
                    <span className="step-label">{step.title}</span>
                  </div>
                  {idx < candidateSteps.length - 1 && (
                    <div className="step-connector">
                      <div className="connector-line"></div>
                      <ChevronRight size={14} className="connector-arrow" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Recruiters Track */}
          <div className="track-container">
            <h3 className="track-title">For Recruiters</h3>
            <div className="steps-flow">
              {recruiterSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="step-node">
                    <div className="step-icon-circle">
                      {step.icon}
                    </div>
                    <span className="step-label">{step.title}</span>
                  </div>
                  {idx < recruiterSteps.length - 1 && (
                    <div className="step-connector">
                      <div className="connector-line"></div>
                      <ChevronRight size={14} className="connector-arrow" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .how-it-works-section {
          padding: 80px 0;
          background-color: #ffffff;
        }

        .workflows-wrapper {
          display: flex;
          flex-direction: column;
          gap: 56px;
          max-width: 980px;
          margin: 0 auto;
        }

        .track-container {
          display: flex;
          flex-direction: column;
        }

        .track-title {
          font-size: 18px;
          font-weight: 700;
          color: #0c0d0e;
          margin-bottom: 28px;
        }

        .steps-flow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .step-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          width: 130px;
          flex-shrink: 0;
        }

        .step-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #f4f4f7;
          color: #0c0d0e;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .step-node:hover .step-icon-circle {
          background-color: #0c0d0e;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .step-label {
          font-size: 13px;
          font-weight: 600;
          color: #18181b;
          line-height: 1.35;
        }

        .step-connector {
          flex: 1;
          display: flex;
          align-items: center;
          position: relative;
          padding: 0 10px;
          margin-bottom: 24px;
        }

        .connector-line {
          width: 100%;
          height: 1px;
          border-top: 1.5px dashed #d1d5db;
        }

        .connector-arrow {
          position: absolute;
          right: 4px;
          color: #9ca3af;
        }

        @media (max-width: 768px) {
          .steps-flow {
            flex-direction: column;
            gap: 20px;
          }
          .step-connector {
            transform: rotate(90deg);
            width: 30px;
            margin: 0;
          }
        }
      `}</style>
    </section>
  )
}
