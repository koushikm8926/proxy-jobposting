import React, { useState } from 'react'
import {
  Users,
  Zap,
  Shield,
  User,
  Mail,
  Building2,
  Briefcase,
  Lock,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Megaphone,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import { db } from '../../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

interface RecruiterRegisterSectionProps {
  onLoginClick?: () => void
}

export const RecruiterRegisterSection: React.FC<RecruiterRegisterSectionProps> = ({ onLoginClick }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
    mobileNumber: '',
    companyName: '',
    industry: '',
    companySize: '',
    jobRole: '',
    password: '',
    confirmPassword: '',
    companyWebsite: '',
    hearAboutUs: '',
    agreeTerms: true
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const recruiterData = {
        fullName:         formData.fullName.trim(),
        email:            formData.email.trim().toLowerCase(),
        mobileNumber:     `${formData.countryCode} ${formData.mobileNumber.trim()}`,
        companyName:      formData.companyName.trim(),
        industry:         formData.industry,
        companySize:      formData.companySize,
        jobRole:          formData.jobRole.trim(),
        companyWebsite:   formData.companyWebsite.trim() || null,
        hearAboutUs:      formData.hearAboutUs || null,
        status:           'pending',
        registeredAt:     serverTimestamp(),
      }
      // Write to recruiters collection
      await addDoc(collection(db, 'recruiters'), recruiterData)
      // Also write to companies collection so admin Companies view is populated
      await addDoc(collection(db, 'companies'), {
        companyName:    formData.companyName.trim(),
        industry:       formData.industry,
        companySize:    formData.companySize,
        companyWebsite: formData.companyWebsite.trim() || null,
        recruiterName:  formData.fullName.trim(),
        recruiterEmail: formData.email.trim().toLowerCase(),
        status:         'pending',
        registeredAt:   serverTimestamp(),
      })
      setIsSubmitted(true)
    } catch (err) {
      console.error('Firestore write failed:', err)
      setSubmitError('Something went wrong. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setFormData({
      fullName: '',
      email: '',
      countryCode: '+91',
      mobileNumber: '',
      companyName: '',
      industry: '',
      companySize: '',
      jobRole: '',
      password: '',
      confirmPassword: '',
      companyWebsite: '',
      hearAboutUs: '',
      agreeTerms: true
    })
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginSuccess(true)
    setTimeout(() => {
      setShowLoginModal(false)
      setLoginSuccess(false)
      setLoginEmail('')
      setLoginPassword('')
    }, 1500)
  }

  const features = [
    {
      icon: Users,
      title: 'Access to Verified Talent',
      desc: 'Connect with pre-screened and trusted candidates.'
    },
    {
      icon: Zap,
      title: 'Save Time & Effort',
      desc: 'Streamline your hiring process with our advanced tools.'
    },
    {
      icon: Shield,
      title: 'Build Stronger Teams',
      desc: 'Find the right talent for long-term growth and success.'
    }
  ]

  return (
    <section className="recruiter-reg-page-section">
      {/* Background concentric ambient watermark circle */}
      <div className="ambient-circle" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="recruiter-reg-grid">
          {/* ================= LEFT COLUMN ================= */}
          <div className="recruiter-left-col">
            <span className="section-kicker">RECRUITER REGISTRATION</span>
            <h1 className="recruiter-headline">
              Find the Right<br />
              Talent, Faster.
            </h1>
            <p className="recruiter-subtext">
              Create your recruiter account and connect with skilled professionals who match your business needs. Hire smarter, not harder.
            </p>

            {/* 3 Value bullets */}
            <div className="recruiter-feature-list">
              {features.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="recruiter-feature-row">
                    <div className="recruiter-feature-icon-pill">
                      <Icon size={19} color="#ffffff" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="recruiter-feature-title">{item.title}</h3>
                      <p className="recruiter-feature-desc">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Handwritten Quote Motif */}
            <div className="recruiter-quote-motif">
              <span className="recruiter-handwritten-text">
                Better Hires<br />
                Build Stronger<br />
                Businesses
              </span>
              <svg
                width="140"
                height="18"
                viewBox="0 0 140 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="motif-underline"
              >
                <path
                  d="M3 13C38 3 85 4 137 15"
                  stroke="#0c0d0e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Recruiter Photo matching visual */}
            <div className="recruiter-photo-container">
              <img
                src="/images/recruiter_register_man.jpg"
                alt="Executive recruiter at modern workstation"
                className="recruiter-photo-img"
              />
            </div>
          </div>

          {/* ================= RIGHT COLUMN (FORM CARD) ================= */}
          <div className="recruiter-right-col">
            <div className="recruiter-form-card">
              {isSubmitted ? (
                <div className="recruiter-success-view">
                  <div className="success-badge-icon">
                    <CheckCircle2 size={48} color="#16a34a" />
                  </div>
                  <h3 className="success-card-title">Registration Submitted!</h3>
                  <p className="success-card-desc">
                    Thank you, <strong>{formData.fullName || 'Hiring Partner'}</strong>! Your recruiter profile for <strong>{formData.companyName || 'your enterprise'}</strong> has been initiated.
                  </p>

                  <div className="success-summary-box">
                    <div className="summary-line">
                      <span>Official Email:</span>
                      <strong>{formData.email}</strong>
                    </div>
                    <div className="summary-line">
                      <span>Mobile Number:</span>
                      <strong>{formData.countryCode} {formData.mobileNumber}</strong>
                    </div>
                    <div className="summary-line">
                      <span>Designation:</span>
                      <strong>{formData.jobRole || 'Hiring Manager'}</strong>
                    </div>
                    <div className="summary-line">
                      <span>Industry:</span>
                      <strong>{formData.industry || 'Enterprise'}</strong>
                    </div>
                  </div>

                  <p className="success-hint">
                    A dedicated Proxy account manager will verify your corporate credentials and contact you within 2 business hours to activate your talent pipeline.
                  </p>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleReset}
                    style={{ width: '100%', height: '48px', fontSize: '15px' }}
                  >
                    Register Another Account
                  </button>
                </div>
              ) : (
                <>
                  <div className="card-top-header">
                    <span className="card-kicker">CREATE YOUR ACCOUNT</span>
                    <h2 className="card-title">Recruiter Registration</h2>
                    <p className="card-subtitle">
                      Fill in your details to get started. It only takes a few minutes.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="reg-form-fields">
                    {/* Row 1: Full Name + Email Address */}
                    <div className="fields-grid-2">
                      <div className="field-group">
                        <label className="field-label" htmlFor="rec-fullName">
                          Full Name <span className="req-star">*</span>
                        </label>
                        <div className="input-with-icon">
                          <User size={18} className="field-icon" />
                          <input
                            type="text"
                            id="rec-fullName"
                            name="fullName"
                            required
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="text-input"
                          />
                        </div>
                      </div>

                      <div className="field-group">
                        <label className="field-label" htmlFor="rec-email">
                          Email Address <span className="req-star">*</span>
                        </label>
                        <div className="input-with-icon">
                          <Mail size={18} className="field-icon" />
                          <input
                            type="email"
                            id="rec-email"
                            name="email"
                            required
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="text-input"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Mobile Number + Company Name */}
                    <div className="fields-grid-2">
                      <div className="field-group">
                        <label className="field-label" htmlFor="rec-mobile">
                          Mobile Number <span className="req-star">*</span>
                        </label>
                        <div className="phone-input-combo">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleInputChange}
                            className="country-select"
                            aria-label="Country Code"
                          >
                            <option value="+91">+91</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+65">+65</option>
                            <option value="+971">+971</option>
                          </select>
                          <input
                            type="tel"
                            id="rec-mobile"
                            name="mobileNumber"
                            required
                            placeholder="Enter your mobile number"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            className="phone-input"
                          />
                        </div>
                      </div>

                      <div className="field-group">
                        <label className="field-label" htmlFor="rec-company">
                          Company Name <span className="req-star">*</span>
                        </label>
                        <div className="input-with-icon">
                          <Building2 size={18} className="field-icon" />
                          <input
                            type="text"
                            id="rec-company"
                            name="companyName"
                            required
                            placeholder="Enter your company name"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="text-input"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Industry + Company Size */}
                    <div className="fields-grid-2">
                      <div className="field-group">
                        <label className="field-label" htmlFor="rec-industry">
                          Industry <span className="req-star">*</span>
                        </label>
                        <div className="input-with-icon select-wrapper">
                          <Briefcase size={18} className="field-icon" />
                          <select
                            id="rec-industry"
                            name="industry"
                            required
                            value={formData.industry}
                            onChange={handleInputChange}
                            className="text-input select-input"
                          >
                            <option value="">Select industry</option>
                            <option value="IT & Software Services">IT & Software Services</option>
                            <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                            <option value="BFSI (Banking & Financial)">BFSI (Banking & Financial)</option>
                            <option value="Manufacturing & Engineering">Manufacturing & Engineering</option>
                            <option value="Sales, Retail & E-commerce">Sales, Retail & E-commerce</option>
                            <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                            <option value="Hospitality & Tourism">Hospitality & Tourism</option>
                            <option value="Education & EdTech">Education & EdTech</option>
                            <option value="Other Industry">Other Industry</option>
                          </select>
                        </div>
                      </div>

                      <div className="field-group">
                        <label className="field-label" htmlFor="rec-companySize">
                          Company Size <span className="req-star">*</span>
                        </label>
                        <div className="input-with-icon select-wrapper">
                          <Users size={18} className="field-icon" />
                          <select
                            id="rec-companySize"
                            name="companySize"
                            required
                            value={formData.companySize}
                            onChange={handleInputChange}
                            className="text-input select-input"
                          >
                            <option value="">Select company size</option>
                            <option value="1-10 employees (Seed / Startup)">1-10 employees (Startup)</option>
                            <option value="11-50 employees (Growing)">11-50 employees</option>
                            <option value="51-200 employees (Mid-size)">51-200 employees</option>
                            <option value="201-500 employees (Established)">201-500 employees</option>
                            <option value="500+ employees (Enterprise)">500+ employees (Enterprise)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Job Role / Designation */}
                    <div className="field-group">
                      <label className="field-label" htmlFor="rec-role">
                        Job Role / Designation <span className="req-star">*</span>
                      </label>
                      <div className="input-with-icon">
                        <Briefcase size={18} className="field-icon" />
                        <input
                          type="text"
                          id="rec-role"
                          name="jobRole"
                          required
                          placeholder="e.g. HR Manager, Hiring Manager"
                          value={formData.jobRole}
                          onChange={handleInputChange}
                          className="text-input"
                        />
                      </div>
                    </div>

                    {/* Row 5: Password + Confirm Password */}
                    <div className="fields-grid-2">
                      <div className="field-group">
                        <label className="field-label" htmlFor="rec-password">
                          Password <span className="req-star">*</span>
                        </label>
                        <div className="input-with-icon pass-wrap">
                          <Lock size={18} className="field-icon" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="rec-password"
                            name="password"
                            required
                            placeholder="Minimum 8 characters"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="text-input"
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="toggle-pass-btn"
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="field-group">
                        <label className="field-label" htmlFor="rec-confirmPass">
                          Confirm Password <span className="req-star">*</span>
                        </label>
                        <div className="input-with-icon pass-wrap">
                          <Lock size={18} className="field-icon" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="rec-confirmPass"
                            name="confirmPassword"
                            required
                            placeholder="Re-enter password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="text-input"
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="toggle-pass-btn"
                            aria-label="Toggle confirm password visibility"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Row 6: Company Website (Optional) */}
                    <div className="field-group">
                      <label className="field-label" htmlFor="rec-website">
                        Company Website <span style={{ color: '#71717a', fontWeight: 400 }}>(Optional)</span>
                      </label>
                      <div className="input-with-icon">
                        <LinkIcon size={18} className="field-icon" />
                        <input
                          type="url"
                          id="rec-website"
                          name="companyWebsite"
                          placeholder="https://www.yourcompany.com"
                          value={formData.companyWebsite}
                          onChange={handleInputChange}
                          className="text-input"
                        />
                      </div>
                    </div>

                    {/* Row 7: How did you hear about us? */}
                    <div className="field-group">
                      <label className="field-label" htmlFor="rec-hear">
                        How did you hear about us? <span className="req-star">*</span>
                      </label>
                      <div className="input-with-icon select-wrapper">
                        <Megaphone size={18} className="field-icon" />
                        <select
                          id="rec-hear"
                          name="hearAboutUs"
                          required
                          value={formData.hearAboutUs}
                          onChange={handleInputChange}
                          className="text-input select-input"
                        >
                          <option value="">Select option</option>
                          <option value="Google Search">Google Search</option>
                          <option value="LinkedIn / Social Media">LinkedIn / Social Media</option>
                          <option value="Professional Referral / Colleague">Professional Referral / Colleague</option>
                          <option value="Job Board / Industry Forum">Job Board / Industry Forum</option>
                          <option value="Event or Conference">Event or Conference</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="checkbox-line">
                      <input
                        type="checkbox"
                        id="rec-agree"
                        checked={formData.agreeTerms}
                        onChange={handleCheckboxChange}
                        required
                        className="custom-checkbox"
                      />
                      <label htmlFor="rec-agree" className="checkbox-text">
                        I agree to the <a href="#contact" className="legal-link">Terms &amp; Conditions</a> and <a href="#contact" className="legal-link">Privacy Policy</a>.
                      </label>
                    </div>

                    {/* Submit Error */}
                    {submitError && (
                      <div style={{
                        padding: '10px 14px',
                        background: '#fee2e2',
                        border: '1px solid #fecaca',
                        borderRadius: 10,
                        fontSize: 13,
                        color: '#dc2626',
                        fontWeight: 500,
                        marginBottom: 4,
                      }}>
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary submit-pill-btn"
                    >
                      <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
                      <ArrowRight size={18} />
                    </button>
                  </form>

                  {/* OR Divider */}
                  <div className="or-divider">
                    <span className="or-line" />
                    <span className="or-text">OR</span>
                    <span className="or-line" />
                  </div>

                  {/* Already a member card */}
                  <div className="already-member-card">
                    <div className="member-left">
                      <div className="shield-icon-pill">
                        <Shield size={20} color="#0c0d0e" />
                      </div>
                      <div>
                        <h4 className="member-title">Already a member?</h4>
                        <p className="member-desc">Log in to your recruiter account.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (onLoginClick) {
                          onLoginClick()
                        } else {
                          setShowLoginModal(true)
                        }
                      }}
                      className="btn btn-outline member-login-btn"
                    >
                      Login
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inline Recruiter Login Modal */}
      {showLoginModal && (
        <div className="login-modal-backdrop" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#f4f4f5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Shield size={24} color="#0c0d0e" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0c0d0e', margin: 0 }}>
                Recruiter Portal Login
              </h3>
              <p style={{ fontSize: '13.5px', color: '#71717a', margin: '4px 0 0' }}>
                Access your candidate pipeline &amp; job listings
              </p>
            </div>

            {loginSuccess ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <CheckCircle2 size={40} color="#16a34a" style={{ margin: '0 auto 10px' }} />
                <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#0c0d0e', margin: '0 0 4px' }}>
                  Welcome back!
                </h4>
                <p style={{ fontSize: '13px', color: '#52525b', margin: 0 }}>
                  Redirecting to your Recruiter Dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#18181b', display: 'block', marginBottom: '4px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="recruiter@company.com"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="text-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#18181b', display: 'block', marginBottom: '4px' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="text-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#52525b' }}>
                    <input type="checkbox" defaultChecked /> Remember me
                  </label>
                  <a href="#contact" style={{ color: '#0c0d0e', textDecoration: 'underline' }}>Forgot password?</a>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', height: '44px', marginTop: '6px' }}
                >
                  Log In to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  style={{ fontSize: '13px', color: '#71717a', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center' }}
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        .recruiter-reg-page-section {
          position: relative;
          padding: 48px 0 80px;
          background-color: #ffffff;
          overflow: hidden;
        }

        .ambient-circle {
          position: absolute;
          top: 80px;
          left: 360px;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          border: 1px solid rgba(228, 228, 231, 0.45);
          pointer-events: none;
          z-index: 0;
        }

        .ambient-circle::after {
          content: '';
          position: absolute;
          inset: 60px;
          border-radius: 50%;
          border: 1px solid rgba(228, 228, 231, 0.25);
        }

        .recruiter-reg-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 64px;
          align-items: flex-start;
        }

        /* Left Column */
        .recruiter-left-col {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .recruiter-headline {
          font-size: 52px;
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.08;
          color: #0c0d0e;
          margin: 14px 0 16px;
        }

        .recruiter-subtext {
          font-size: 15.5px;
          color: #475467;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 440px;
        }

        .recruiter-feature-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 36px;
        }

        .recruiter-feature-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .recruiter-feature-icon-pill {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: #0c0d0e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
        }

        .recruiter-feature-title {
          font-size: 15.5px;
          font-weight: 700;
          color: #0c0d0e;
          margin: 0 0 3px;
        }

        .recruiter-feature-desc {
          font-size: 13.5px;
          color: #52525b;
          margin: 0;
          line-height: 1.4;
        }

        /* Handwritten Quote Motif */
        .recruiter-quote-motif {
          position: relative;
          margin-bottom: 14px;
          padding-left: 6px;
        }

        .recruiter-handwritten-text {
          font-family: 'Caveat', cursive;
          font-size: 32px;
          font-weight: 700;
          line-height: 1.05;
          color: #0c0d0e;
          display: inline-block;
          transform: rotate(-3deg);
        }

        .motif-underline {
          display: block;
          margin-top: 4px;
          transform: rotate(-3deg);
        }

        /* Photo container */
        .recruiter-photo-container {
          position: relative;
          width: 100%;
          max-width: 460px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.12);
        }

        .recruiter-photo-img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* Right Column Form Card */
        .recruiter-form-card {
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 24px;
          padding: 40px 36px;
          box-shadow: 0 16px 40px -12px rgba(0, 0, 0, 0.08);
        }

        .card-top-header {
          margin-bottom: 28px;
        }

        .card-kicker {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #71717a;
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;
        }

        .card-title {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #0c0d0e;
          margin: 0 0 8px;
        }

        .card-subtitle {
          font-size: 14px;
          color: #52525b;
          margin: 0;
        }

        .reg-form-fields {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .fields-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          font-size: 13px;
          font-weight: 600;
          color: #18181b;
        }

        .req-star {
          color: #e11d48;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          color: #71717a;
          pointer-events: none;
        }

        .text-input {
          width: 100%;
          height: 44px;
          padding: 0 14px 0 42px;
          border-radius: 10px;
          border: 1px solid #d4d4d8;
          font-size: 13.5px;
          color: #0c0d0e;
          background-color: #ffffff;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          outline: none;
          box-sizing: border-box;
        }

        .text-input:focus {
          border-color: #0c0d0e;
          box-shadow: 0 0 0 3px rgba(12, 13, 14, 0.08);
        }

        .select-wrapper::after {
          content: '⌵';
          position: absolute;
          right: 14px;
          font-size: 12px;
          color: #71717a;
          pointer-events: none;
        }

        .select-input {
          appearance: none;
          cursor: pointer;
        }

        .phone-input-combo {
          display: flex;
          gap: 8px;
        }

        .country-select {
          height: 44px;
          padding: 0 10px;
          border-radius: 10px;
          border: 1px solid #d4d4d8;
          font-size: 13.5px;
          font-weight: 600;
          color: #0c0d0e;
          background-color: #fafafa;
          cursor: pointer;
          outline: none;
          flex-shrink: 0;
        }

        .phone-input {
          flex: 1;
          height: 44px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid #d4d4d8;
          font-size: 13.5px;
          color: #0c0d0e;
          background-color: #ffffff;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .phone-input:focus {
          border-color: #0c0d0e;
        }

        .pass-wrap .text-input {
          padding-right: 38px;
        }

        .toggle-pass-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #71717a;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        .toggle-pass-btn:hover {
          color: #0c0d0e;
        }

        .checkbox-line {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 4px;
        }

        .custom-checkbox {
          width: 16px;
          height: 16px;
          margin-top: 2px;
          accent-color: #0c0d0e;
          cursor: pointer;
        }

        .checkbox-text {
          font-size: 12.5px;
          color: #52525b;
          line-height: 1.4;
          cursor: pointer;
        }

        .legal-link {
          color: #0c0d0e;
          text-decoration: underline;
        }

        .submit-pill-btn {
          width: 100%;
          height: 48px;
          font-size: 15px;
          font-weight: 600;
          justify-content: center;
          margin-top: 8px;
          border-radius: var(--radius-pill);
        }

        /* OR Divider */
        .or-divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 22px 0 18px;
        }

        .or-line {
          flex: 1;
          height: 1px;
          background-color: #e4e4e7;
        }

        .or-text {
          font-size: 11px;
          font-weight: 700;
          color: #71717a;
          letter-spacing: 0.08em;
        }

        /* Already Member */
        .already-member-card {
          background-color: #fafafa;
          border: 1px solid #e4e4e7;
          border-radius: 14px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .member-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .shield-icon-pill {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .member-title {
          font-size: 14px;
          font-weight: 700;
          color: #0c0d0e;
          margin: 0 0 2px;
        }

        .member-desc {
          font-size: 12px;
          color: #71717a;
          margin: 0;
        }

        .member-login-btn {
          font-size: 13px;
          padding: 7px 20px;
          border-radius: var(--radius-pill);
        }

        /* Success view */
        .recruiter-success-view {
          text-align: center;
          padding: 24px 8px;
        }

        .success-badge-icon {
          margin-bottom: 16px;
        }

        .success-card-title {
          font-size: 26px;
          font-weight: 800;
          color: #0c0d0e;
          margin: 0 0 8px;
        }

        .success-card-desc {
          font-size: 14px;
          color: #52525b;
          margin: 0 0 24px;
          line-height: 1.5;
        }

        .success-summary-box {
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

        .summary-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-line span {
          color: #64748b;
        }

        .success-hint {
          font-size: 13px;
          color: #475467;
          line-height: 1.5;
          margin: 0 0 20px;
        }

        /* Login Modal Backdrop */
        .login-modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(12, 13, 14, 0.6);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .login-modal-box {
          background-color: #ffffff;
          border-radius: 20px;
          padding: 32px 28px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.2);
          animation: popIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 960px) {
          .recruiter-reg-grid {
            grid-template-columns: 1fr;
            gap: 44px;
          }
          .recruiter-headline {
            font-size: 38px;
          }
          .recruiter-form-card {
            padding: 28px 20px;
          }
          .fields-grid-2 {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
      `}</style>
    </section>
  )
}
