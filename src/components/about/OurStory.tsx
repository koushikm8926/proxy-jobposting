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

          {/* Right Visual Placement */}
          <div className="story-image-wrap">
            <div className="story-image-card">
              <img
                src="/images/candidate_recruiter_network.png"
                alt="ProxHire Candidate-Recruiter Network Ecosystem"
                className="story-network-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .our-story-section {
          padding: 84px 0;
          background-color: #ffffff;
        }

        .our-story-grid {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 56px;
          align-items: stretch;
        }

        .story-content {
          max-width: 580px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .story-title {
          font-size: 38px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.03em;
          line-height: 1.18;
          margin: 8px 0 24px;
        }

        .story-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .story-paragraphs p {
          font-size: 15.5px;
          color: #475467;
          line-height: 1.68;
        }

        .story-paragraphs strong {
          color: #0c0d0e;
          font-weight: 600;
        }

        /* Right Image Placement Design */
        .story-image-wrap {
          display: flex;
          align-items: stretch;
          width: 100%;
        }

        .story-image-card {
          width: 100%;
          min-height: 480px;
          border-radius: 24px;
          overflow: hidden;
          background-color: #fafafb;
          border: 1px solid #eaebf0;
          box-shadow: 
            0 20px 40px -12px rgba(12, 13, 14, 0.08),
            0 1px 3px 0 rgba(12, 13, 14, 0.04);
          display: flex;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .story-image-card:hover {
          transform: translateY(-3px);
          box-shadow: 
            0 28px 56px -14px rgba(12, 13, 14, 0.12),
            0 2px 6px 0 rgba(12, 13, 14, 0.04);
        }

        .story-network-img {
          width: 100%;
          height: 100%;
          min-height: 480px;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        @media (max-width: 960px) {
          .our-story-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .story-content {
            max-width: 100%;
          }
          .story-image-card,
          .story-network-img {
            min-height: 340px;
            height: 360px;
          }
        }
      `}</style>
    </section>
  )
}
