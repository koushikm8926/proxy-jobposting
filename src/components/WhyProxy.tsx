import React from 'react'

export const WhyProxy: React.FC = () => {
  const features = [
    {
      // 1. Solid person with thick checkmark
      icon: (
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Head */}
          <circle cx="9.5" cy="5.5" r="3.5" fill="#0c0d0e" />
          {/* Torso */}
          <path
            d="M2.5 18C2.5 14.2 5.6 12 9.5 12C11.8 12 13.9 12.8 15.1 14.2C14.2 15.3 13.7 16.6 13.6 18H2.5Z"
            fill="#0c0d0e"
          />
          {/* Bold Checkmark */}
          <path
            d="M14.5 15.5L17.2 18.2L22.5 12.8"
            stroke="#0c0d0e"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Trusted Platform',
      description: 'A reliable space for genuine opportunities and relevant talent.'
    },
    {
      // 2. Bold solid lightning bolt
      icon: (
        <svg width="40" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.5 1.5L3.5 13.5H11.5L9.5 22.5L20.5 10H12.5L14 1.5H13.5Z"
            fill="#0c0d0e"
            stroke="#0c0d0e"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Simple & Efficient',
      description: 'Making recruitment easier and faster for everyone.'
    },
    {
      // 3. Bold security shield with checkerboard contrast
      icon: (
        <svg width="44" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer Shield Shell */}
          <path
            d="M12 2L4 5.5V11.5C4 16.8 7.5 21.2 12 22.5C16.5 21.2 20 16.8 20 11.5V5.5L12 2Z"
            fill="#0c0d0e"
            stroke="#0c0d0e"
            strokeWidth="1.5"
          />
          {/* Top-Right Quadrant (White) */}
          <path
            d="M12 3.8V12H18.5C18.5 7.6 16.2 4.8 12 3.8Z"
            fill="#ffffff"
          />
          {/* Bottom-Left Quadrant (White) */}
          <path
            d="M5.5 12H12V20.8C7.8 19.2 5.5 15.8 5.5 12Z"
            fill="#ffffff"
          />
        </svg>
      ),
      title: 'Technology Driven',
      description: "A modern platform designed for today's hiring needs."
    },
    {
      // 4. Bold solid 3-person team network
      icon: (
        <svg width="48" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Center Leader */}
          <circle cx="12" cy="6.5" r="3.2" fill="#0c0d0e" />
          <path
            d="M7.2 18.2C7.2 14.8 9.3 13 12 13C14.7 13 16.8 14.8 16.8 18.2V19.2H7.2V18.2Z"
            fill="#0c0d0e"
          />
          {/* Left Peer */}
          <circle cx="5" cy="8.5" r="2.6" fill="#0c0d0e" />
          <path
            d="M1.2 18.2C1.2 15.8 2.8 14.5 4.8 14.5C5.8 14.5 6.7 14.9 7.4 15.6C7.3 16.4 7.2 17.3 7.2 18.2H1.2Z"
            fill="#0c0d0e"
          />
          {/* Right Peer */}
          <circle cx="19" cy="8.5" r="2.6" fill="#0c0d0e" />
          <path
            d="M22.8 18.2C22.8 15.8 21.2 14.5 19.2 14.5C18.2 14.5 17.3 14.9 16.6 15.6C16.7 16.4 16.8 17.3 16.8 18.2H22.8Z"
            fill="#0c0d0e"
          />
        </svg>
      ),
      title: 'Growing Network',
      description: 'Building a strong ecosystems across India, starting from Bengaluru.'
    }
  ]

  return (
    <section id="why-proxy" className="why-proxy-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-kicker" style={{ color: '#52525b', letterSpacing: '0.18em', fontWeight: 800 }}>
            WHY PROXY
          </span>
          <h2 className="why-proxy-title">
            A Smarter Way to Build Careers and Teams
          </h2>
          <p className="why-proxy-subtitle">
            Proxy is a recruitment platform designed to make hiring simple, transparent and technology-driven for both candidates and employers.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="features-grid">
          {features.map((item, idx) => (
            <div key={idx} className={`feature-card reveal-on-scroll delay-${(idx + 1) * 100}`}>
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
          padding: 84px 0 90px;
          background-color: #ffffff;
        }

        .why-proxy-title {
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #0c0d0e;
          margin: 12px 0 14px;
          line-height: 1.18;
        }

        .why-proxy-subtitle {
          font-size: 16px;
          font-weight: 500;
          color: #52525b;
          line-height: 1.6;
          max-width: 680px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .feature-card {
          background-color: #fafafb;
          border: 1px solid #f0f0f4;
          border-radius: 22px;
          padding: 42px 26px 38px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
        }

        .feature-card:hover {
          transform: translateY(-6px);
          background-color: #ffffff;
          border-color: #e4e4e7;
          box-shadow: 0 18px 38px -8px rgba(0, 0, 0, 0.09);
        }

        .feature-card:hover .feature-icon-wrapper svg {
          transform: scale(1.1) translateY(-3px);
        }

        .feature-icon-wrapper {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: transform 0.25s ease;
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1);
        }

        .feature-title {
          font-size: 20px;
          font-weight: 800;
          color: #0c0d0e;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
        }

        .feature-description {
          font-size: 14.5px;
          font-weight: 600;
          color: #52525b;
          line-height: 1.55;
          margin: 0;
          max-width: 250px;
        }

        @media (max-width: 1040px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .why-proxy-title {
            font-size: 32px;
          }
        }

        @media (max-width: 600px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
          .why-proxy-title {
            font-size: 28px;
          }
          .feature-card {
            padding: 32px 20px;
          }
        }
      `}</style>
    </section>
  )
}
