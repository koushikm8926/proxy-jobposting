import React from 'react'
import { GraduationCap, User, Clock, Laptop, Users, TrendingUp } from 'lucide-react'

export const WhoCanApply: React.FC = () => {
  const applicantTypes = [
    {
      icon: <GraduationCap size={24} color="#0c0d0e" />,
      title: 'Freshers & Graduates'
    },
    {
      icon: <User size={24} color="#0c0d0e" />,
      title: 'Experienced Professionals'
    },
    {
      icon: <Clock size={24} color="#0c0d0e" />,
      title: 'Part-Time Jobs'
    },
    {
      icon: <Laptop size={24} color="#0c0d0e" />,
      title: 'Work From Home'
    },
    {
      icon: <Users size={24} color="#0c0d0e" />,
      title: 'Freelance & Gig Jobs'
    },
    {
      icon: <TrendingUp size={24} color="#0c0d0e" />,
      title: 'Mid & Senior Management'
    }
  ]

  return (
    <section className="who-can-apply-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '48px' }}>
          <span className="section-kicker">WHO CAN APPLY?</span>
          <h2 className="section-title">Opportunities for Every Stage of Your Career</h2>
        </div>

        {/* 6 Grid Cards */}
        <div className="applicant-grid">
          {applicantTypes.map((item, idx) => (
            <div key={idx} className="applicant-card">
              <div className="applicant-icon-wrap">
                {item.icon}
              </div>
              <h4 className="applicant-title">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .who-can-apply-section {
          padding: 60px 0 80px;
          background-color: #ffffff;
        }

        .applicant-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }

        .applicant-card {
          background-color: #f9f9fb;
          border: 1px solid #f0f0f4;
          border-radius: 16px;
          padding: 24px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.25s ease;
          min-height: 120px;
          justify-content: center;
        }

        .applicant-card:hover {
          transform: translateY(-3px);
          background-color: #ffffff;
          border-color: #e4e4e7;
          box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.08);
        }

        .applicant-icon-wrap {
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .applicant-card:hover .applicant-icon-wrap {
          transform: scale(1.15);
        }

        .applicant-title {
          font-size: 13px;
          font-weight: 700;
          color: #0c0d0e;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        @media (max-width: 1024px) {
          .applicant-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 560px) {
          .applicant-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>
    </section>
  )
}
