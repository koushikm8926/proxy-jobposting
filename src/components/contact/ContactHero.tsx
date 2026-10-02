import React from 'react'

export const ContactHero: React.FC = () => {
  return (
    <section
      id="contact-hero"
      style={{
        position: 'relative',
        paddingTop: '32px',
        paddingBottom: '60px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact-hero-grid">
          {/* Left Column */}
          <div className="contact-hero-content">
            <span className="section-kicker" style={{ color: '#52525b', letterSpacing: '0.18em' }}>
              CONTACT US
            </span>

            <h1 className="contact-hero-heading">
              We're Here<br />
              to Help You
            </h1>

            <p className="contact-hero-desc">
              Have questions or need assistance? Our team is here to help you with candidate registrations, recruiter registrations, or any other queries about ProxHire.
            </p>
          </div>

          {/* Right Column: Global Contact Support Workspace Visual */}
          <div className="contact-hero-visual-wrap">
            <div className="contact-hero-card">
              <img
                src="/images/contact/contact-support-workspace.png"
                alt="ProxHire Global Contact Support Workspace"
                className="contact-hero-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 48px;
          align-items: center;
          min-height: 380px;
        }

        .contact-hero-content {
          max-width: 520px;
        }

        .contact-hero-heading {
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.08;
          color: #0c0d0e;
          margin: 16px 0 20px;
        }

        .contact-hero-desc {
          font-size: 16px;
          color: #475467;
          line-height: 1.6;
          max-width: 480px;
        }

        .contact-hero-visual-wrap {
          display: flex;
          justify-content: center;
        }

        .contact-hero-card {
          position: relative;
          width: 100%;
          max-width: 560px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .contact-hero-img {
          width: 100%;
          height: 350px;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        @media (max-width: 960px) {
          .contact-hero-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .contact-hero-heading {
            font-size: 40px;
          }
          .contact-hero-img {
            height: 260px;
          }
        }
      `}</style>
    </section>
  )
}
