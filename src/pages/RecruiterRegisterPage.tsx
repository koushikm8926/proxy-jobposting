import React from 'react'
import { RecruiterRegisterSection } from '../components/recruiter-register/RecruiterRegisterSection'
import { Footer } from '../components/Footer'

interface RecruiterRegisterPageProps {
  onLoginClick?: () => void
}

export const RecruiterRegisterPage: React.FC<RecruiterRegisterPageProps> = ({ onLoginClick }) => {
  return (
    <div className="recruiter-register-page-root">
      {/* 1. Recruiter Registration Section with Left Value Narrative & Right Form */}
      <RecruiterRegisterSection onLoginClick={onLoginClick} />

      {/* 2. Light Theme Footer matching ChatGPT Image Sep 28, 2026, 10_57_45 PM.png */}
      <Footer variant="light" />
    </div>
  )
}
