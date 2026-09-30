import React, { useState } from 'react'
import { MapPin, Headphones, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { db } from '../../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export const ContactFormAndOffice: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // 1. Write to Firestore candidates collection tagged with isContactMessage: true
      await addDoc(collection(db, 'candidates'), {
        isContactMessage: true,
        name: formData.name.trim(),
        fullName: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        mobileNumber: formData.phone.trim(),
        role: formData.role,
        subject: formData.subject,
        message: formData.message.trim(),
        status: 'new',
        registeredAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      })

      // 2. Dual backup in companies collection
      try {
        await addDoc(collection(db, 'companies'), {
          isContactMessage: true,
          name: formData.name.trim(),
          fullName: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          mobileNumber: formData.phone.trim(),
          role: formData.role,
          subject: formData.subject,
          message: formData.message.trim(),
          status: 'new',
          registeredAt: serverTimestamp(),
        })
      } catch {
        // secondary backup note
      }

      // 3. LocalStorage backup for offline/local development preview
      try {
        const local = JSON.parse(localStorage.getItem('proxy_contact_messages') || '[]')
        local.unshift({
          id: 'local_' + Date.now(),
          ...formData,
          registeredAt: new Date().toISOString(),
          status: 'new',
          isContactMessage: true
        })
        localStorage.setItem('proxy_contact_messages', JSON.stringify(local))
      } catch {
        // storage quota
      }

      setSubmitted(true)
    } catch (err: any) {
      console.error('Contact message submission failed:', err)
      setSubmitError('Failed to send your message. Please check your network and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-form-office-section">
      <div className="container">
        <div className="contact-main-grid">
          {/* Left Column: Contact Form */}
          <div className="contact-form-card">
            <span className="section-kicker">SEND US A MESSAGE</span>
            <h2 className="contact-form-title">Get in Touch</h2>
            <p className="contact-form-subtitle">
              Fill out the form below and our team will get back to you shortly.
            </p>

            {submitted ? (
              <div className="form-success-message">
                <CheckCircle2 size={48} color="#10b981" />
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you for reaching out to Proxy. One of our Bengaluru team members will get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', phone: '', role: '', subject: '', message: '' })
                  }}
                  style={{ marginTop: '16px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-interactive-form">
                <div className="form-two-cols">
                  <div className="input-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label>Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-two-cols">
                  <div className="input-group">
                    <label>Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label>I am a *</label>
                    <select
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="" disabled>Select an option</option>
                      <option value="Candidate">Candidate</option>
                      <option value="Recruiter">Recruiter / Employer</option>
                      <option value="Partner">Business Partner</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label>Subject *</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="Candidate Registration">Candidate Registration</option>
                    <option value="Recruiter Hiring Needs">Recruiter Hiring Needs</option>
                    <option value="Partnership Inquiry">Partnership Inquiry</option>
                    <option value="General Support">General Support</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Message *</label>
                  <textarea
                    required
                    maxLength={500}
                    rows={4}
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <span className="char-count">{formData.message.length}/500</span>
                </div>

                {submitError && (
                  <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#fef2f2', color: '#b91c1c', fontSize: '13px', border: '1px solid #fecaca', marginBottom: '14px' }}>
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary submit-btn-full"
                >
                  <span>{isSubmitting ? 'Sending Message…' : 'Send Message'}</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Office Card & Map */}
          <div className="office-info-card">
            <span className="section-kicker">Our Office</span>
            <h3 className="office-title">
              Proxy Services India Private Limited<br />(Proxy Hire)
            </h3>

            <div className="office-address-row">
              <MapPin size={22} className="office-map-pin" />
              <p className="office-address-text">
                No. 224, 3rd Floor, Ranka Junction, 80/3 Vijnapura Village Hobli,<br />
                Krishnarajapuram R S, Bangalore North, Bengaluru, Karnataka, India - 560016.
              </p>
            </div>

            {/* Map Visual */}
            <div className="office-map-container">
              <img
                src="/images/office_location_map.jpg"
                alt="Map showing Proxy Services India Private Limited at Krishnarajapura Bengaluru"
                className="office-map-img"
              />
            </div>

            {/* Support Team & Business Hours info */}
            <div className="office-bottom-meta">
              <div className="meta-info-item">
                <div className="meta-icon-circle">
                  <Headphones size={20} color="#0c0d0e" />
                </div>
                <div className="meta-text">
                  <h4 className="meta-title">Our Support Team</h4>
                  <p className="meta-desc">
                    Our team is available from 8 AM to 9 PM, every day to assist you with any queries related to candidate or recruiter registration, or general information about Proxy.
                  </p>
                </div>
              </div>

              <div className="meta-info-item">
                <div className="meta-icon-circle">
                  <Clock size={20} color="#0c0d0e" />
                </div>
                <div className="meta-text">
                  <h4 className="meta-title">Business Hours</h4>
                  <p className="meta-desc">
                    <strong>Mon – Sun</strong><br />
                    8:00 AM – 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-form-office-section {
          padding: 20px 0 80px;
          background-color: #ffffff;
        }

        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          align-items: stretch;
        }

        /* Form Card */
        .contact-form-card {
          background-color: #ffffff;
          border: 1px solid #ebeef2;
          border-radius: 24px;
          padding: 40px 36px;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.04);
        }

        .contact-form-title {
          font-size: 32px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.025em;
          line-height: 1.2;
          margin: 6px 0 10px;
        }

        .contact-form-subtitle {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 28px;
        }

        .contact-interactive-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-two-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
        }

        .input-group label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }

        .input-group input,
        .input-group select,
        .input-group textarea {
          font-family: inherit;
          font-size: 14px;
          padding: 11px 14px;
          border-radius: 12px;
          border: 1px solid #d4d4d8;
          outline: none;
          background-color: #ffffff;
          color: #0c0d0e;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .input-group input:focus,
        .input-group select:focus,
        .input-group textarea:focus {
          border-color: #0c0d0e;
          box-shadow: 0 0 0 3px rgba(12, 13, 14, 0.08);
        }

        .char-count {
          font-size: 11.5px;
          color: #9ca3af;
          text-align: right;
          margin-top: 2px;
        }

        .submit-btn-full {
          width: 100%;
          padding: 13px;
          font-size: 15px;
          margin-top: 8px;
        }

        .form-success-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 48px 16px;
          gap: 12px;
        }

        .form-success-message h3 {
          font-size: 20px;
          font-weight: 800;
          color: #0c0d0e;
        }

        .form-success-message p {
          font-size: 14px;
          color: #64748b;
          max-width: 360px;
          line-height: 1.55;
        }

        /* Office Card */
        .office-info-card {
          background-color: #ffffff;
          border: 1px solid #ebeef2;
          border-radius: 24px;
          padding: 40px 36px;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
        }

        .office-title {
          font-size: 22px;
          font-weight: 800;
          color: #0c0d0e;
          letter-spacing: -0.015em;
          line-height: 1.3;
          margin: 6px 0 16px;
        }

        .office-address-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 20px;
        }

        .office-map-pin {
          color: #0c0d0e;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .office-address-text {
          font-size: 13.5px;
          color: #475467;
          line-height: 1.55;
        }

        .office-map-container {
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 24px;
          border: 1px solid #e4e7ec;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .office-map-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .office-bottom-meta {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid #f0f0f4;
        }

        .meta-info-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .meta-icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f4f4f7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .meta-text {
          display: flex;
          flex-direction: column;
        }

        .meta-title {
          font-size: 14px;
          font-weight: 700;
          color: #0c0d0e;
          margin-bottom: 4px;
        }

        .meta-desc {
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.45;
        }

        @media (max-width: 960px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
          }
          .office-bottom-meta {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .contact-form-card,
          .office-info-card {
            padding: 28px 20px;
          }
          .form-two-cols {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
