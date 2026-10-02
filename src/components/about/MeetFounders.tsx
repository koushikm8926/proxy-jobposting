import React from 'react'

export const MeetFounders: React.FC = () => {
  const founders = [
    {
      name: 'Renati Venkata Vineela',
      role: 'Founder & Director',
      company: 'ProxHire Services India Pvt. Ltd.',
      bio: 'Building ProxHire with a vision to make recruitment simpler, more accessible and technology-driven for candidates and employers.',
      image: '/images/about/founder.jpeg',
      alt: 'Renati Venkata Vineela - Founder & Director'
    },
    {
      name: 'Chiranjeevi Sai Lakshmi Narasimha Varma',
      role: 'Co-Founder & Director',
      company: 'ProxHire Services India Pvt. Ltd.',
      bio: 'Working alongside the founding team to build ProxHire into a trusted, technology-driven recruitment platform that connects candidates with employers and simplifies the hiring journey.',
      image: '/images/about/co-founder.jpeg',
      alt: 'Chiranjeevi Sai Lakshmi Narasimha Varma - Co-Founder & Director'
    }
  ]

  return (
    <section className="founders-section">
      <div className="container">
        {/* Header */}
        <div className="founders-header">
          <div>
            <span className="section-kicker">MEET OUR FOUNDERS</span>
            <h2 className="founders-title">The People Behind ProxHire</h2>
          </div>
          <p className="founders-header-note">
            A strong vision and a shared commitment to build a better recruitment ecosystem.
          </p>
        </div>

        {/* Founders Cards */}
        <div className="founders-grid">
          {founders.map((f, idx) => (
            <div key={idx} className="founder-card">
              <div className="founder-image-box">
                <img src={f.image} alt={f.alt} className="founder-photo" />
              </div>
              <div className="founder-info">
                <h3 className="founder-name">{f.name}</h3>
                <div className="founder-role-box">
                  <span className="founder-designation">{f.role}</span>
                  <span className="founder-company">{f.company}</span>
                </div>
                <p className="founder-bio">{f.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .founders-section {
          padding: 80px 0;
          background-color: #ffffff;
        }

        .founders-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 48px;
        }

        .founders-title {
          font-size: 34px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin-top: 8px;
        }

        .founders-header-note {
          font-size: 14.5px;
          color: #64748b;
          max-width: 360px;
          line-height: 1.5;
          text-align: right;
        }

        .founders-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .founder-card {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          padding: 24px;
          border-radius: 20px;
          border: 1px solid #f0f0f4;
          background-color: #ffffff;
          transition: all 0.25s ease;
        }

        .founder-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.08);
          border-color: #e4e4e7;
        }

        .founder-image-box {
          width: 140px;
          height: 175px;
          border-radius: 16px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .founder-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .founder-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .founder-name {
          font-size: 19px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.015em;
          line-height: 1.25;
          margin-bottom: 6px;
        }

        .founder-role-box {
          display: flex;
          flex-direction: column;
          margin-bottom: 14px;
        }

        .founder-designation {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }

        .founder-company {
          font-size: 12.5px;
          color: #64748b;
        }

        .founder-bio {
          font-size: 13.5px;
          color: #475467;
          line-height: 1.6;
        }

        @media (max-width: 960px) {
          .founders-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .founders-header-note {
            text-align: left;
            max-width: 100%;
          }
          .founders-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .founder-card {
            flex-direction: column;
          }
          .founder-image-box {
            width: 100%;
            height: 220px;
          }
        }
      `}</style>
    </section>
  )
}
