import React, { useState } from 'react'
import { Briefcase, TrendingUp, UserCheck, ShieldCheck, CheckCircle2, Upload, FileText, X, ArrowRight, Sparkles } from 'lucide-react'

export const CandidateRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    currentLocation: '',
    highestEducation: '',
    workExperience: '',
    preferredRole: '',
    agreeTerms: true
  })

  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 700)
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      currentLocation: '',
      highestEducation: '',
      workExperience: '',
      preferredRole: '',
      agreeTerms: true
    })
    setResumeFile(null)
  }

  const benefits = [
    {
      icon: Briefcase,
      title: 'Access to Verified Employers',
      desc: 'Connect with genuine, pre-screened companies offering transparent roles and verified pay scales.'
    },
    {
      icon: TrendingUp,
      title: 'Opportunities Across Industries',
      desc: 'Roles spanning Tech, Engineering, Healthcare, BFSI, Sales, and Corporate Functions.'
    },
    {
      icon: UserCheck,
      title: 'Simple & Hassle-Free Process',
      desc: 'Fill your profile once. Our recruitment team matches you directly with relevant hiring managers.'
    },
    {
      icon: ShieldCheck,
      title: 'Career Growth Support',
      desc: 'Guidance and interview scheduling support from our team until you receive your offer letter.'
    }
  ]

  return (
    <section id="candidate-form-section" style={{ padding: '60px 0 80px', backgroundColor: '#fafafb' }}>
      <div className="container">
        <div className="candidate-reg-grid">
          {/* Left Column: Why Join Proxy Benefits */}
          <div className="candidate-benefits-col">
            <span className="section-kicker">WHY JOIN PROXY?</span>
            <h2 className="candidate-benefits-title">
              More Opportunities.<br />
              <span style={{ color: '#52525b' }}>A Brighter Tomorrow.</span>
            </h2>
            <p className="candidate-benefits-subtitle">
              We eliminate fake job postings, recruiter ghosting, and endless portals. When you register with Proxy, our dedicated recruiters champion your profile to companies that value your talent.
            </p>

            <div className="candidate-benefit-cards">
              {benefits.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="candidate-benefit-item">
                    <div className="candidate-benefit-icon-wrap">
                      <Icon size={22} color="#0c0d0e" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="candidate-benefit-item-title">{item.title}</h3>
                      <p className="candidate-benefit-item-desc">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Zero Cost Guarantee Pill Card */}
            <div className="candidate-zero-cost-card">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div className="zero-cost-badge">
                  <Sparkles size={20} color="#0c0d0e" />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0c0d0e', margin: 0 }}>
                    100% Free for All Job Seekers
                  </h4>
                  <p style={{ fontSize: '13px', color: '#52525b', margin: '4px 0 0', lineHeight: 1.4 }}>
                    Proxy never charges candidates any fee for registration, matching, or placement interviews.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form Card */}
          <div className="candidate-form-card-wrap">
            <div className="candidate-form-card">
              {isSubmitted ? (
                <div className="candidate-success-box">
                  <div className="success-icon-badge">
                    <CheckCircle2 size={44} color="#16a34a" />
                  </div>
                  <h3 className="success-heading">Registration Submitted!</h3>
                  <p className="success-subheading">
                    Thank you, <strong>{formData.fullName || 'Candidate'}</strong>! Your profile has been successfully saved in our candidate pool.
                  </p>
                  <div className="success-details-list">
                    <div className="success-detail-row">
                      <span>Mobile:</span>
                      <strong>{formData.mobileNumber || '+91 91007 29332'}</strong>
                    </div>
                    <div className="success-detail-row">
                      <span>Email:</span>
                      <strong>{formData.email || 'candidate@domain.com'}</strong>
                    </div>
                    <div className="success-detail-row">
                      <span>Target Role:</span>
                      <strong>{formData.preferredRole || 'Relevant Industry Openings'}</strong>
                    </div>
                    {resumeFile && (
                      <div className="success-detail-row">
                        <span>Attached Resume:</span>
                        <strong>{resumeFile.name}</strong>
                      </div>
                    )}
                  </div>

                  <p className="success-next-note">
                    A Proxy talent acquisition specialist will review your credentials and call you when a verified opening matches your profile.
                  </p>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleReset}
                    style={{ width: '100%', marginTop: '16px' }}
                  >
                    Submit Another Profile
                  </button>
                </div>
              ) : (
                <>
                  <div className="candidate-form-header">
                    <h3 className="candidate-form-title">Create Your Profile</h3>
                    <p className="candidate-form-desc">
                      Share your basic details and our team will get in touch with you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="candidate-form-body">
                    {/* Row 1: Full Name */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="fullName">
                        Full Name <span style={{ color: '#e11d48' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    {/* Row 2: Phone + Email */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="mobileNumber">
                          Mobile Number <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          id="mobileNumber"
                          name="mobileNumber"
                          required
                          placeholder="e.g. 9876543210"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="email">
                          Email Address <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="e.g. john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Row 3: Current Location + Highest Education */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="currentLocation">
                          Current Location <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <select
                          id="currentLocation"
                          name="currentLocation"
                          required
                          value={formData.currentLocation}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="">Select Location</option>
                          <option value="Bengaluru / Bangalore">Bengaluru / Bangalore</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Chennai">Chennai</option>
                          <option value="Pune">Pune</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Delhi NCR">Delhi NCR</option>
                          <option value="Kolkata">Kolkata</option>
                          <option value="Other Location">Other Location</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="highestEducation">
                          Highest Education <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <select
                          id="highestEducation"
                          name="highestEducation"
                          required
                          value={formData.highestEducation}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="">Select Education</option>
                          <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                          <option value="MCA / BCA / B.Sc (IT)">MCA / BCA / B.Sc (IT)</option>
                          <option value="MBA / PGDM">MBA / PGDM</option>
                          <option value="B.Com / M.Com / Finance">B.Com / M.Com / Finance</option>
                          <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                          <option value="Any Graduate / Post Graduate">Any Graduate / Post Graduate</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Work Experience + Preferred Role */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label" htmlFor="workExperience">
                          Work Experience <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <select
                          id="workExperience"
                          name="workExperience"
                          required
                          value={formData.workExperience}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="">Select Experience</option>
                          <option value="Fresher / Entry Level (0-1 yrs)">Fresher / Entry Level (0-1 yrs)</option>
                          <option value="1 - 3 Years">1 - 3 Years</option>
                          <option value="3 - 5 Years">3 - 5 Years</option>
                          <option value="5 - 8 Years">5 - 8 Years</option>
                          <option value="8+ Years (Senior / Lead)">8+ Years (Senior / Lead)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="preferredRole">
                          Preferred Job Role / Industry <span style={{ color: '#e11d48' }}>*</span>
                        </label>
                        <select
                          id="preferredRole"
                          name="preferredRole"
                          required
                          value={formData.preferredRole}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="">Select Preferred Role</option>
                          <option value="Software Engineer / Developer">Software Engineer / Developer</option>
                          <option value="Frontend / UI Engineer">Frontend / UI Engineer</option>
                          <option value="Backend / Fullstack Engineer">Backend / Fullstack Engineer</option>
                          <option value="Data Analyst / Data Scientist">Data Analyst / Data Scientist</option>
                          <option value="Business Development / Sales">Business Development / Sales</option>
                          <option value="HR & Talent Acquisition">HR & Talent Acquisition</option>
                          <option value="Finance & Accounting">Finance & Accounting</option>
                          <option value="Operations & Logistics">Operations & Logistics</option>
                          <option value="Customer Experience / Support">Customer Experience / Support</option>
                          <option value="Mechanical / Core Engineering">Mechanical / Core Engineering</option>
                        </select>
                      </div>
                    </div>

                    {/* Resume Upload Dropzone */}
                    <div className="form-group">
                      <label className="form-label">
                        Upload Resume <span style={{ color: '#71717a', fontWeight: 400 }}>(Optional)</span>
                      </label>
                      <div
                        className={`resume-dropzone ${dragActive ? 'drag-active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          id="resume-file-input"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        {resumeFile ? (
                          <div className="resume-selected-box">
                            <FileText size={28} color="#0c0d0e" />
                            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                              <p className="resume-selected-name">{resumeFile.name}</p>
                              <span className="resume-selected-size">
                                {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setResumeFile(null)}
                              className="resume-remove-btn"
                              aria-label="Remove resume"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <label htmlFor="resume-file-input" className="resume-dropzone-inner">
                            <Upload size={24} color="#71717a" />
                            <p className="dropzone-text">
                              <strong>Click to upload</strong> or drag and drop
                            </p>
                            <span className="dropzone-subtext">PDF, DOC or DOCX (Max 5 MB)</span>
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Checkbox */}
                    <div className="form-checkbox-group">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleCheckboxChange}
                        required
                        className="form-checkbox"
                      />
                      <label htmlFor="agreeTerms" className="form-checkbox-label">
                        I agree to the <a href="#contact" style={{ textDecoration: 'underline', color: '#0c0d0e' }}>Terms &amp; Conditions</a> and <a href="#contact" style={{ textDecoration: 'underline', color: '#0c0d0e' }}>Privacy Policy</a>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary candidate-submit-btn"
                    >
                      <span>{isSubmitting ? 'Submitting Details...' : 'Submit Registration'}</span>
                      <ArrowRight size={18} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .candidate-reg-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 56px;
          align-items: flex-start;
        }

        .candidate-benefits-col {
          padding-top: 8px;
        }

        .candidate-benefits-title {
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.18;
          color: #0c0d0e;
          margin: 12px 0 16px;
        }

        .candidate-benefits-subtitle {
          font-size: 15px;
          color: #475467;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .candidate-benefit-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .candidate-benefit-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .candidate-benefit-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .candidate-benefit-item-title {
          font-size: 16px;
          font-weight: 700;
          color: #0c0d0e;
          margin: 0 0 4px;
        }

        .candidate-benefit-item-desc {
          font-size: 13.5px;
          color: #52525b;
          line-height: 1.5;
          margin: 0;
        }

        .candidate-zero-cost-card {
          margin-top: 36px;
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 16px;
          padding: 18px 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .zero-cost-badge {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f4f4f5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Form Card */
        .candidate-form-card {
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 24px;
          padding: 36px 32px;
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.08);
        }

        .candidate-form-header {
          margin-bottom: 24px;
          border-bottom: 1px solid #f4f4f5;
          padding-bottom: 16px;
        }

        .candidate-form-title {
          font-size: 24px;
          font-weight: 800;
          color: #0c0d0e;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }

        .candidate-form-desc {
          font-size: 14px;
          color: #52525b;
          margin: 0;
        }

        .candidate-form-body {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: #18181b;
        }

        .form-input, .form-select {
          width: 100%;
          height: 44px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid #d4d4d8;
          font-size: 14px;
          color: #0c0d0e;
          background-color: #ffffff;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          outline: none;
          box-sizing: border-box;
        }

        .form-input:focus, .form-select:focus {
          border-color: #0c0d0e;
          box-shadow: 0 0 0 3px rgba(12, 13, 14, 0.08);
        }

        /* Dropzone */
        .resume-dropzone {
          border: 1.5px dashed #cbd5e1;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          background-color: #fafafa;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .resume-dropzone:hover, .resume-dropzone.drag-active {
          border-color: #0c0d0e;
          background-color: #f4f4f5;
        }

        .resume-dropzone-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          margin: 0;
        }

        .dropzone-text {
          font-size: 13px;
          color: #18181b;
          margin: 0;
        }

        .dropzone-subtext {
          font-size: 11.5px;
          color: #71717a;
        }

        .resume-selected-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 8px;
        }

        .resume-selected-name {
          font-size: 13px;
          font-weight: 600;
          color: #0c0d0e;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .resume-selected-size {
          font-size: 11px;
          color: #71717a;
        }

        .resume-remove-btn {
          padding: 4px;
          color: #71717a;
          border-radius: 4px;
          cursor: pointer;
        }

        .resume-remove-btn:hover {
          color: #e11d48;
          background-color: #fef2f2;
        }

        .form-checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 4px;
        }

        .form-checkbox {
          width: 16px;
          height: 16px;
          margin-top: 2px;
          accent-color: #0c0d0e;
          cursor: pointer;
        }

        .form-checkbox-label {
          font-size: 12.5px;
          color: #52525b;
          line-height: 1.4;
          cursor: pointer;
        }

        .candidate-submit-btn {
          width: 100%;
          height: 48px;
          font-size: 15px;
          font-weight: 600;
          justify-content: center;
          margin-top: 8px;
        }

        /* Success box */
        .candidate-success-box {
          text-align: center;
          padding: 20px 8px;
        }

        .success-icon-badge {
          margin-bottom: 16px;
        }

        .success-heading {
          font-size: 24px;
          font-weight: 800;
          color: #0c0d0e;
          margin: 0 0 8px;
        }

        .success-subheading {
          font-size: 14px;
          color: #52525b;
          margin: 0 0 24px;
          line-height: 1.5;
        }

        .success-details-list {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 20px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 13.5px;
          margin-bottom: 20px;
        }

        .success-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .success-detail-row span {
          color: #64748b;
        }

        .success-next-note {
          font-size: 13px;
          color: #475467;
          line-height: 1.5;
          margin: 0 0 16px;
        }

        @media (max-width: 960px) {
          .candidate-reg-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .candidate-benefits-title {
            font-size: 32px;
          }
          .candidate-form-card {
            padding: 28px 20px;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
      `}</style>
    </section>
  )
}
