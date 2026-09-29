import React from 'react'
import { Logo } from './Logo'
import {
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-brand-col">
            <div style={{ marginBottom: '16px' }}>
              <Logo />
            </div>
            <p className="footer-brand-desc">
              A recruitment platform designed to connect candidates and employers through a simple, trusted and technology-driven experience.
            </p>
            <div className="footer-socials">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-circle"
                aria-label="Proxy LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.05 1.53 1.53 0 0 0 0 3.05m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-circle"
                aria-label="Proxy Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#why-proxy">About</a></li>
              <li><a href="#for-recruiters">Recruiters</a></li>
              <li><a href="#for-candidates">Candidates</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQs</a></li>
            </ul>
          </div>

          {/* Column 3: Job Categories */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Job Categories</h4>
            <ul className="footer-links-list">
              <li><a href="#categories">IT & Software</a></li>
              <li><a href="#categories">Sales & Marketing</a></li>
              <li><a href="#categories">Healthcare</a></li>
              <li><a href="#categories">Manufacturing</a></li>
              <li><a href="#categories">Hospitality & Travel</a></li>
              <li><a href="#categories">View All</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <div className="contact-items">
              <div className="contact-row">
                <Phone size={16} className="contact-icon" />
                <a href="tel:9100729332">9100729332</a>
              </div>
              <div className="contact-row">
                <Mail size={16} className="contact-icon" />
                <a href="mailto:info@proxyservices.in">info@proxyservices.in</a>
              </div>
              <div className="contact-row">
                <Phone size={16} className="contact-icon" />
                <a href="tel:9100723332">9100723332</a>
              </div>
              <div className="contact-row" style={{ alignItems: 'flex-start' }}>
                <MapPin size={18} className="contact-icon" style={{ marginTop: '3px' }} />
                <span className="address-text">
                  No. 224, 3rd Floor, Ranka Junction, 80/3 Vijnapura Village Hobli, Krishnarajapuram R S, Bengaluru, Karnataka, India - 560016.
                </span>
              </div>
            </div>
          </div>

          {/* Column 5: Business Hours */}
          <div className="footer-hours-col">
            <h4 className="footer-col-title">Business Hours</h4>
            <div className="hours-box">
              <Clock size={20} className="hours-icon" />
              <div className="hours-details">
                <span className="hours-days">Mon - Sun</span>
                <span className="hours-time">8:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © 2026 Proxy Services India Private Limited. All rights reserved.
          </p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="#terms">Terms & Conditions</a>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: #ffffff;
          border-top: 1px solid #ebeef2;
          padding-top: 64px;
          padding-bottom: 28px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2.2fr 1fr 1.2fr 2fr 1.4fr;
          gap: 36px;
          margin-bottom: 56px;
        }

        .footer-brand-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.6;
          max-width: 280px;
          margin-bottom: 20px;
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .social-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0c0d0e;
          transition: all 0.2s ease;
        }

        .social-circle:hover {
          background-color: #0c0d0e;
          color: #ffffff;
          border-color: #0c0d0e;
          transform: translateY(-2px);
        }

        .footer-col-title {
          font-size: 14px;
          font-weight: 700;
          color: #0c0d0e;
          margin-bottom: 18px;
          letter-spacing: -0.01em;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links-list a {
          font-size: 13px;
          color: #64748b;
          transition: color 0.15s ease;
        }

        .footer-links-list a:hover {
          color: #0c0d0e;
        }

        .contact-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #64748b;
        }

        .contact-row a {
          color: #64748b;
          transition: color 0.15s ease;
        }

        .contact-row a:hover {
          color: #0c0d0e;
        }

        .contact-icon {
          color: #0c0d0e;
          flex-shrink: 0;
        }

        .address-text {
          font-size: 12.5px;
          line-height: 1.5;
          color: #64748b;
        }

        .hours-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .hours-icon {
          color: #0c0d0e;
          margin-top: 2px;
        }

        .hours-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hours-days {
          font-size: 13px;
          font-weight: 600;
          color: #0c0d0e;
        }

        .hours-time {
          font-size: 12.5px;
          color: #64748b;
        }

        .footer-bottom-bar {
          border-top: 1px solid #f0f0f4;
          padding-top: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12.5px;
          color: #64748b;
        }

        .legal-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .legal-links a {
          color: #64748b;
          transition: color 0.15s ease;
        }

        .legal-links a:hover {
          color: #0c0d0e;
        }

        .divider {
          color: #cbd5e1;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom-bar {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
