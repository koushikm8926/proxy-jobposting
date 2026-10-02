import { useState, useEffect } from 'react'
import { Navbar, type NavPage, Modal, type ModalType } from './components'
import {
  HomePage,
  AboutPage,
  RecruitersPage,
  CandidatesPage,
  ContactPage,
  FAQPage,
  JoinCandidatePage,
  RecruiterRegisterPage
} from './pages'
import { useScrollReveal } from './hooks/useScrollReveal'

export function App() {
  // Support hash navigation and state, defaulting to 'register-recruiter' for current screen
  const [currentPage, setCurrentPage] = useState<NavPage>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#home') return 'home'
      if (hash === '#about') return 'about'
      if (hash === '#recruiters') return 'recruiters'
      if (hash === '#candidates') return 'candidates'
      if (hash === '#contact') return 'contact'
      if (hash === '#faq' || hash === '#faqs') return 'faq'
      if (hash === '#join-candidate' || hash === '#join') return 'join-candidate'
      if (hash === '#register-recruiter' || hash === '#recruiter-registration' || hash === '#hire-talent') return 'register-recruiter'
    }
    return 'home'
  })

  const [modalType, setModalType] = useState<ModalType>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // Trigger GPU-accelerated scroll animations dynamically on page change
  useScrollReveal(currentPage)

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#home') {
        setCurrentPage('home')
      } else if (hash === '#about' || hash === '#about-us' || hash === '#our-story') {
        setCurrentPage('about')
      } else if (hash === '#recruiters' || hash === '#for-recruiters') {
        setCurrentPage('recruiters')
      } else if (hash === '#candidates' || hash === '#for-candidates') {
        setCurrentPage('candidates')
      } else if (hash === '#contact' || hash === '#contact-us') {
        setCurrentPage('contact')
      } else if (hash === '#faq' || hash === '#faqs') {
        setCurrentPage('faq')
      } else if (hash === '#join-candidate' || hash === '#join') {
        setCurrentPage('join-candidate')
      } else if (hash === '#register-recruiter' || hash === '#recruiter-registration' || hash === '#hire-talent') {
        setCurrentPage('register-recruiter')
      }
    }

    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handlePageChange = (page: NavPage) => {
    setCurrentPage(page)
    window.location.hash = page
  }

  const handleOpenCandidateModal = () => {
    handlePageChange('join-candidate')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenRecruiterModal = () => {
    handlePageChange('register-recruiter')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenCategoryModal = (catName: string) => {
    setSelectedCategory(catName)
    setModalType('category')
  }

  const handleOpenInfoModal = () => {
    setModalType('info')
  }

  const handleCloseModal = () => {
    setModalType(null)
    setSelectedCategory('')
  }

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'categories' || sectionId === 'how-it-works' || sectionId === 'for-candidates') {
      if (currentPage !== 'home' && currentPage !== 'candidates') {
        setCurrentPage('candidates')
      }
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="proxy-app-root">
      {/* 1. Header with active tab underline & instant switching */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onJoinCandidate={handleOpenCandidateModal}
        onHireTalent={handleOpenRecruiterModal}
        onNavigateSection={handleNavigateSection}
      />

      {/* 2. Main Page Render */}
      <main>
        {currentPage === 'home' && (
          <HomePage
            onJoinCandidate={handleOpenCandidateModal}
            onHireTalent={handleOpenRecruiterModal}
            onSelectCategory={handleOpenCategoryModal}
            onKnowMore={handleOpenInfoModal}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onJoinCandidate={handleOpenCandidateModal}
            onRegisterRecruiter={handleOpenRecruiterModal}
          />
        )}
        {currentPage === 'recruiters' && (
          <RecruitersPage
            onRegisterRecruiter={handleOpenRecruiterModal}
          />
        )}
        {currentPage === 'candidates' && (
          <CandidatesPage
            onJoinCandidate={handleOpenCandidateModal}
            onSelectCategory={handleOpenCategoryModal}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage />
        )}
        {currentPage === 'faq' && (
          <FAQPage
            onContactClick={() => handlePageChange('contact')}
          />
        )}
        {currentPage === 'join-candidate' && (
          <JoinCandidatePage />
        )}
        {currentPage === 'register-recruiter' && (
          <RecruiterRegisterPage />
        )}
      </main>

      {/* 3. Interactive Modal Dialog */}
      <Modal
        type={modalType}
        categoryName={selectedCategory}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default App
