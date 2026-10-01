import React from 'react'

export const OurStory: React.FC = () => {
  return (
    <section id="our-story" className="our-story-section">
      <div className="container">
        <div className="our-story-grid">
          {/* Left Text Narrative */}
          <div className="story-content">
            <span className="section-kicker">OUR STORY</span>
            <h2 className="story-title">A Simple Vision for a Better Hiring Journey</h2>
            
            <div className="story-paragraphs">
              <p>
                ProxHire was started with a simple vision: to make the hiring journey easier, more transparent and accessible for both candidates and employers.
              </p>
              <p>
                We saw that candidates often struggle to <strong>discover relevant opportunities</strong> and present their skills effectively, while employers spend significant time searching for suitable talent.
              </p>
              <p>
                ProxHire is being built to bring both sides together on one platform.
              </p>
              <p>
                Our goal is to create a <strong>trusted recruitment ecosystem where candidates can build their professional profiles</strong>, discover opportunities and connect with employers, while recruiters can find relevant talent and manage their hiring more efficiently.
              </p>
              <p>
                Starting from Bengaluru, ProxHire is being developed with a long-term vision to expand across India and make recruitment more technology-driven, accessible and efficient.
              </p>
            </div>
          </div>

          {/* Right Office Image */}
          <div className="story-image-wrap">
            <div className="story-image-card">
              <img
                src="/images/about_office.jpg"
                alt="ProxHire corporate office in Bengaluru"
                className="story-office-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .our-story-section {
          padding: 80px 0;
          background-color: #ffffff;
        }

        .our-story-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          align-items: center;
        }

        .story-content {
          max-width: 600px;
        }

        .story-title {
          font-size: 36px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .story-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .story-paragraphs p {
          font-size: 15px;
          color: #475467;
          line-height: 1.65;
        }

        .story-paragraphs strong {
          color: #0c0d0e;
          font-weight: 600;
        }

        .story-image-wrap {
          display: flex;
          justify-content: center;
        }

        .story-image-card {
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
          border: 1px solid #f0f0f4;
        }

        .story-office-img {
          width: 100%;
          height: 100%;
          max-height: 520px;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 960px) {
          .our-story-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </section>
  )
}
