import React from 'react'

export const JoinCandidateHero: React.FC = () => {
  return (
    <section
      id="join-candidate-hero"
      style={{
        position: 'relative',
        paddingTop: '32px',
        paddingBottom: '50px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="join-hero-grid">
          {/* Left Text */}
          <div className="join-hero-content">
            <span className="section-kicker" style={{ color: '#52525b', letterSpacing: '0.18em' }}>
              JOIN AS CANDIDATE
            </span>

            <h1 className="join-hero-heading">
              Take the Next Step<br />
              in Your Career
            </h1>

            <p className="join-hero-desc">
              Create your profile and let us connect you with genuine job opportunities from trusted employers.
            </p>
          </div>

          {/* Right Visual */}
          <div className="join-hero-visual-wrap">
            <div className="join-hero-card">
              <img
                src="/images/join_candidate_hero.jpg"
                alt="Candidate aspiring for next career step"
                className="join-hero-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .join-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
          min-height: 360px;
        }

        .join-hero-content {
          max-width: 540px;
        }

        .join-hero-heading {
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.08;
          color: #0c0d0e;
          margin: 16px 0 20px;
        }

        .join-hero-desc {
          font-size: 16px;
          color: #475467;
          line-height: 1.6;
          max-width: 480px;
        }

        .join-hero-visual-wrap {
          display: flex;
          justify-content: center;
        }

        .join-hero-card {
          position: relative;
          width: 100%;
          max-width: 520px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.12);
        }

        .join-hero-img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 960px) {
          .join-hero-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .join-hero-heading {
            font-size: 40px;
          }
          .join-hero-img {
            height: 240px;
          }
        }
      `}</style>
    </section>
  )
}
