import React from 'react'
import { Eye, Target } from 'lucide-react'

export const VisionMission: React.FC = () => {
  return (
    <section className="vision-mission-section">
      <div className="container">
        <div className="vm-grid">
          {/* Vision Card */}
          <div className="vm-card">
            <div className="vm-icon-box">
              <Eye size={24} color="#0c0d0e" strokeWidth={2.2} />
            </div>
            <div className="vm-content">
              <span className="section-kicker">OUR VISION</span>
              <h3 className="vm-title">To Build a Trusted Recruitment Ecosystem</h3>
              <p className="vm-text">
                To build a trusted, technology-driven recruitment ecosystem that connects talent with the right opportunities and helps employers find the right people efficiently — starting in Bengaluru and expanding across India.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="vm-card">
            <div className="vm-icon-box">
              <Target size={24} color="#0c0d0e" strokeWidth={2.2} />
            </div>
            <div className="vm-content">
              <span className="section-kicker">OUR MISSION</span>
              <h3 className="vm-title">To Simplify the Hiring Journey</h3>
              <p className="vm-text">
                At ProxHire, our mission is to simplify the hiring journey by connecting candidates with relevant career opportunities and helping employers find the right talent through a trusted, transparent, and technology-driven platform. We are committed to making recruitment more accessible, efficient, and convenient for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .vision-mission-section {
          padding: 30px 0 70px;
          background-color: #ffffff;
        }

        .vm-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        .vm-card {
          background-color: #f9f9fb;
          border: 1px solid #f0f0f4;
          border-radius: 20px;
          padding: 36px 32px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          transition: all 0.25s ease;
        }

        .vm-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.08);
          border-color: #e4e4e7;
          background-color: #ffffff;
        }

        .vm-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .vm-content {
          display: flex;
          flex-direction: column;
        }

        .vm-title {
          font-size: 22px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .vm-text {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .vm-grid {
            grid-template-columns: 1fr;
          }
          .vm-card {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  )
}
