import React, { useState, useEffect } from 'react'
import { Logo } from './Logo'
import { Menu, X, ArrowRight } from 'lucide-react'

export type NavPage = 'home' | 'about' | 'recruiters' | 'candidates' | 'contact'

interface NavbarProps {
  currentPage: NavPage
  onPageChange: (page: NavPage) => void
  onJoinCandidate: () => void
  onHireTalent: () => void
  onNavigateSection?: (sectionId: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  onJoinCandidate,
  onHireTalent,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', id: 'home', isPage: true },
    { name: 'About', id: 'about', isPage: true },
    { name: 'Recruiters', id: 'recruiters', isPage: true },
    { name: 'Candidates', id: 'candidates', isPage: true },
    { name: 'Contact', id: 'contact', isPage: true },
    { name: 'FAQs', id: 'faq', isPage: false },
  ]

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false)
    if (link.isPage) {
      onPageChange(link.id as NavPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      if (onNavigateSection) {
        onNavigateSection(link.id)
      }
    }
  }

  return (
    <header
      className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.96)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid #f0f0f3' : '1px solid transparent',
        transition: 'all 0.25s ease'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px'
        }}
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => {
            onPageChange('home')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          style={{ display: 'inline-flex', cursor: 'pointer', textAlign: 'left' }}
          aria-label="Proxy Home"
        >
          <Logo />
        </button>

        {/* Desktop Navigation Links */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}
        >
          {navLinks.map((link) => {
            const isActive = link.isPage && currentPage === link.id
            return (
              <button
                key={link.name}
                type="button"
                onClick={() => handleLinkClick(link)}
                style={{
                  fontSize: '14px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#0c0d0e' : '#475467',
                  position: 'relative',
                  padding: '6px 2px',
                  transition: 'color 0.15s ease',
                  borderBottom: isActive ? '2px solid #0c0d0e' : '2px solid transparent'
                }}
                className="nav-link-item"
              >
                {link.name}
              </button>
            )
          })}
        </nav>

        {/* Action Buttons */}
        <div
          className="desktop-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <button
            type="button"
            className="btn btn-outline"
            onClick={onJoinCandidate}
            style={{ fontSize: '13px', padding: '9px 18px' }}
          >
            Join as Candidate
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onHireTalent}
            style={{ fontSize: '13px', padding: '9px 18px' }}
          >
            Hire Talent
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            padding: '8px',
            color: '#18181b',
            borderRadius: '6px'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: 'absolute',
            top: '76px',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e4e4e7',
            padding: '24px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {navLinks.map((link) => {
            const isActive = link.isPage && currentPage === link.id
            return (
              <button
                key={link.name}
                type="button"
                onClick={() => handleLinkClick(link)}
                style={{
                  fontSize: '16px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#0c0d0e' : '#18181b',
                  padding: '10px 0',
                  textAlign: 'left',
                  borderBottom: '1px solid #f4f4f5',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{link.name}</span>
                {isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0c0d0e' }} />}
              </button>
            )
          })}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setMobileMenuOpen(false)
                onJoinCandidate()
              }}
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>Join as Candidate</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setMobileMenuOpen(false)
                onHireTalent()
              }}
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>Hire Talent</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nav-link-item:hover {
          color: #0c0d0e !important;
        }
        @media (max-width: 900px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  )
}
