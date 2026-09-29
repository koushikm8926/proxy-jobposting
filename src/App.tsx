import { useState, useEffect } from 'react'
import { Navbar, type NavPage } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { RecruitersPage } from './pages/RecruitersPage'
import { CandidatesPage } from './pages/CandidatesPage'
import { ContactPage } from './pages/ContactPage'
import { Modal, type ModalType } from './components/Modal'

export function App() {
  // Support hash navigation and state, defaulting to 'contact' as just requested
  const [currentPage, setCurrentPage] = useState<NavPage>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#home') return 'home'
      if (hash === '#about') return 'about'
      if (hash === '#recruiters') return 'recruiters'
      if (hash === '#candidates') return 'candidates'
      if (hash === '#contact') return 'contact'
    }
    return 'contact'
  })

  const [modalType, setModalType] = useState<ModalType>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

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
    setModalType('candidate')
  }

  const handleOpenRecruiterModal = () => {
    setModalType('recruiter')
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
