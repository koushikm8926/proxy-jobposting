import React, { useState } from 'react'
import { X, CheckCircle2 } from 'lucide-react'

export type ModalType = 'candidate' | 'recruiter' | 'category' | 'info' | null

interface ModalProps {
  type: ModalType
  categoryName?: string
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ type, categoryName, onClose }) => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roleOrTitle: '',
    experienceOrCompany: ''
  })

  if (!type) return null

  const isCandidate = type === 'candidate'
  const isRecruiter = type === 'recruiter'
  const isCategory = type === 'category'
  const isInfo = type === 'info'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="modal-success">
            <CheckCircle2 size={54} color="#10b981" />
            <h3 className="modal-title" style={{ marginTop: '16px' }}>Thank you!</h3>
            <p className="modal-desc">
              Your details have been received. Our Bengaluru talent advisory team will reach out shortly.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
              style={{ marginTop: '24px', width: '100%' }}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div>
            <div className="modal-header">
              <span className="section-kicker">
                {isCandidate ? 'CANDIDATE ONBOARDING' : isRecruiter ? 'RECRUITER REGISTRATION' : isCategory ? 'CATEGORY EXPLORER' : 'OUR FOCUS'}
              </span>
              <h3 className="modal-title">
                {isCandidate
                  ? 'Join as Candidate'
                  : isRecruiter
                  ? 'Register as Recruiter'
                  : isCategory
                  ? `${categoryName || 'Job'} Opportunities`
                  : 'Starting from Bengaluru, Growing Across India'}
              </h3>
              <p className="modal-desc">
                {isCandidate
                  ? 'Discover verified roles, build your digital profile, and get connected with top companies.'
                  : isRecruiter
                  ? 'Access pre-verified candidates in Bengaluru and scale your hiring pipeline seamlessly.'
                  : isCategory
                  ? `Explore open positions and specialized hiring for ${categoryName || 'this sector'}.`
                  : 'Proxy is pioneering an ethical, technology-first hiring ecosystem born in Bengaluru.'}
              </p>
            </div>

            {isCategory || isInfo ? (
              <div style={{ marginTop: '20px' }}>
                <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '14px', color: '#475467', lineHeight: '1.6' }}>
                    {isCategory
                      ? `We have active job requirements and pre-screened talent across ${categoryName || 'various roles'}. Sign up below to get prioritized matching!`
                      : 'Bengaluru is India’s technology and talent capital. Proxy is establishing our ground operations here before scaling across Mumbai, Delhi-NCR, Hyderabad, and Pune.'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    onClick={() => setSubmitted(true)}
                  >
                    Get Early Access
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ flex: 1 }}
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{isCandidate ? 'Desired Role / Specialization' : 'Company Name & Designation'}</label>
                  <input
                    type="text"
                    required
                    placeholder={isCandidate ? 'e.g. Frontend Engineer, Product Manager' : 'e.g. Acme Corp, HR Director'}
                    value={formData.roleOrTitle}
                    onChange={(e) => setFormData({ ...formData, roleOrTitle: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '12px', padding: '12px' }}
                >
                  {isCandidate ? 'Submit Candidate Profile' : 'Register Company Account'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(12, 13, 14, 0.65);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
          background: #ffffff;
          border-radius: 24px;
          max-width: 520px;
          width: 100%;
          padding: 36px 32px;
          position: relative;
          box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.25);
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #71717a;
          background: #f4f4f5;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: #e4e4e7;
          color: #0c0d0e;
        }

        .modal-header {
          margin-bottom: 24px;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .modal-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.5;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 12.5px;
          font-weight: 600;
          color: #374151;
        }

        .form-group input {
          font-family: inherit;
          font-size: 14px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-group input:focus {
          border-color: #0c0d0e;
          box-shadow: 0 0 0 3px rgba(12, 13, 14, 0.08);
        }

        .modal-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px 12px;
        }

        @media (max-width: 600px) {
          .modal-content {
            padding: 24px 20px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
