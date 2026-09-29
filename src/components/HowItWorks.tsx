import React from 'react'

export const HowItWorks: React.FC = () => {
  const candidateSteps = [
    {
      title: 'Register',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#0c0d0e" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="7" r="4" />
          <path d="M2 19c0-3.3 3.6-6 8-6s8 2.7 8 6v1H2v-1z" />
          <path d="M19 8v6m-3-3h6" stroke="#0c0d0e" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'Create Profile',
      icon: (
        <svg width="24" height="26" viewBox="0 0 24 24" fill="#0c0d0e" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2H6ZM13 3.5V9H18.5L13 3.5ZM8 12C7.45 12 7 12.45 7 13C7 13.55 7.45 14 8 14H16C16.55 14 17 13.55 17 13C17 12.45 16.55 12 16 12H8ZM8 16C7.45 16 7 16.45 7 17C7 17.55 7.45 18 8 18H14C14.55 18 15 17.55 15 17C15 16.45 14.55 16 14 16H8Z"
          />
        </svg>
      )
    },
    {
      title: 'Get Verified',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L4 5.5V11.5C4 16.8 7.5 21.2 12 22.5C16.5 21.2 20 16.8 20 11.5V5.5L12 2Z"
            fill="#0c0d0e"
            stroke="#0c0d0e"
            strokeWidth="1.2"
          />
          <path d="M12 3.8V12H18.5C18.5 7.6 16.2 4.8 12 3.8Z" fill="#ffffff" />
          <path d="M5.5 12H12V20.8C7.8 19.2 5.5 15.8 5.5 12Z" fill="#ffffff" />
        </svg>
      )
    },
    {
      title: 'Connect with Employers',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#0c0d0e" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 3C8.45 3 8 3.45 8 4V6H4C2.9 6 2 6.9 2 8V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6H16V4C16 3.45 15.55 3 15 3H9ZM10 5H14V6H10V5ZM20 10H4V8H20V10ZM11 12H13V14H11V12Z" />
        </svg>
      )
    }
  ]

  const recruiterSteps = [
    {
      title: 'Register Company',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#0c0d0e" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 21V3C4 2.45 4.45 2 5 2H13C13.55 2 14 2.45 14 3V8H19C19.55 8 20 8.45 20 9V21H22V23H2V21H4ZM6 5V7H8V5H6ZM10 5V7H12V5H10ZM6 9V11H8V9H6ZM10 9V11H12V9H10ZM6 13V15H8V13H6ZM10 13V15H12V13H10ZM16 11V13H18V11H16ZM16 15V17H18V15H16ZM16 19V21H18V19H16ZM6 17V19H8V17H6ZM10 17V19H12V17H10Z" />
        </svg>
      )
    },
    {
      title: 'Get Verified',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L4 5.5V11.5C4 16.8 7.5 21.2 12 22.5C16.5 21.2 20 16.8 20 11.5V5.5L12 2Z"
            fill="#0c0d0e"
            stroke="#0c0d0e"
            strokeWidth="1.2"
          />
          <path d="M12 3.8V12H18.5C18.5 7.6 16.2 4.8 12 3.8Z" fill="#ffffff" />
          <path d="M5.5 12H12V20.8C7.8 19.2 5.5 15.8 5.5 12Z" fill="#ffffff" />
        </svg>
      )
    },
    {
      title: 'Find Relevant Talent',
      icon: (
        <svg width="28" height="26" viewBox="0 0 24 24" fill="#0c0d0e" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="7" r="3.2" />
          <path d="M7.5 19c0-2.8 2-4.5 4.5-4.5s4.5 1.7 4.5 4.5v1H7.5v-1z" />
          <circle cx="5" cy="9" r="2.2" />
          <path d="M1.5 19c0-2 1.5-3.3 3.5-3.3 1 0 1.8.4 2.4 1-.3.7-.4 1.5-.4 2.3H1.5z" />
          <circle cx="19" cy="9" r="2.2" />
          <path d="M22.5 19c0-2-1.5-3.3-3.5-3.3-1 0-1.8.4-2.4 1 .3.7.4 1.5.4 2.3H22.5z" />
        </svg>
      )
    },
    {
      title: 'Hire Faster',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#0c0d0e" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10.5 16.2L6.8 12.5L8.2 11.1L10.5 13.4L15.8 8.1L17.2 9.5L10.5 16.2Z"
          />
        </svg>
      )
    }
  ]

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container" style={{ maxWidth: '1440px' }}>
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span className="section-kicker" style={{ color: '#52525b', letterSpacing: '0.18em', fontWeight: 800 }}>
            HOW PROXY WORKS
          </span>
          <h2 className="how-it-works-title">
            A Simple Journey for a Brighter Future
          </h2>
          <p className="how-it-works-subtitle">
            A seamless process for both candidates and recruiters.
          </p>
        </div>

        {/* Single-Line Side-by-Side Workflows with Middle Vertical Separation Line */}
        <div className="workflows-unified-grid">
          {/* ================= Left Track: For Candidates ================= */}
          <div className="track-side">
            <h3 className="track-header-title">For Candidates</h3>
            <div className="track-steps-row">
              {candidateSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="track-step-node">
                    <div className="track-icon-circle">
                      {step.icon}
                    </div>
                    <span className="track-step-label">{step.title}</span>
                  </div>
                  {idx < candidateSteps.length - 1 && (
                    <div className="track-connector-arrow">
                      <div className="dashed-line" />
                      <div className="arrow-head">›</div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ================= Middle Vertical Separation Line ================= */}
          <div className="workflows-vertical-divider" />

          {/* ================= Right Track: For Recruiters ================= */}
          <div className="track-side">
            <h3 className="track-header-title">For Recruiters</h3>
            <div className="track-steps-row">
              {recruiterSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="track-step-node">
                    <div className="track-icon-circle">
                      {step.icon}
                    </div>
                    <span className="track-step-label">{step.title}</span>
                  </div>
                  {idx < recruiterSteps.length - 1 && (
                    <div className="track-connector-arrow">
                      <div className="dashed-line" />
                      <div className="arrow-head">›</div>
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
          padding: 80px 0 90px;
          background-color: #ffffff;
        }

        .how-it-works-title {
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #0c0d0e;
          margin: 12px 0 14px;
        }

        .how-it-works-subtitle {
          font-size: 16px;
          font-weight: 500;
          color: #52525b;
          line-height: 1.6;
          margin: 0 auto;
        }

        /* Single line layout placing both tracks side-by-side with divider in middle */
        .workflows-unified-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: flex-start;
          gap: 36px;
          width: 100%;
          padding: 0 12px;
          box-sizing: border-box;
        }

        .track-side {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .track-header-title {
          font-size: 20px;
          font-weight: 800;
          color: #0c0d0e;
          margin: 0 0 28px 4px;
          letter-spacing: -0.015em;
        }

        .track-steps-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
        }

        .track-step-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          width: 88px;
          flex-shrink: 0;
        }

        .track-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: #f4f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .track-step-node:hover .track-icon-circle {
          transform: translateY(-2px);
          background-color: #ffffff;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
        }

        .track-step-label {
          font-size: 13px;
          font-weight: 700;
          color: #0c0d0e;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        /* Connector with dashed line + arrow head */
        .track-connector-arrow {
          flex: 1;
          display: flex;
          align-items: center;
          position: relative;
          padding: 0 6px;
          margin-top: 25px;
          min-width: 24px;
        }

        .dashed-line {
          width: 100%;
          height: 1px;
          border-top: 1.5px dashed #cbd5e1;
        }

        .arrow-head {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-56%);
          font-size: 16px;
          color: #94a3b8;
          font-weight: bold;
          line-height: 1;
        }

        /* Middle vertical separation line */
        .workflows-vertical-divider {
          width: 1.5px;
          background-color: #e4e4e7;
          align-self: stretch;
          min-height: 150px;
          margin: 6px 12px 0;
        }

        @media (max-width: 1100px) {
          .workflows-unified-grid {
            grid-template-columns: 1fr;
            gap: 44px;
          }
          .workflows-vertical-divider {
            display: none;
          }
          .track-steps-row {
            justify-content: space-around;
          }
        }

        @media (max-width: 640px) {
          .track-steps-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 12px;
          }
          .track-step-node {
            width: 100%;
          }
          .track-connector-arrow {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
