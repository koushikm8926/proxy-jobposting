import React from 'react'
import { RecruiterHero } from '../components/recruiters/RecruiterHero'
import { WhyHireThroughProxy } from '../components/recruiters/WhyHireThroughProxy'
import { RecruiterProcess } from '../components/recruiters/RecruiterProcess'
import { ModernRecruitmentNeeds } from '../components/recruiters/ModernRecruitmentNeeds'
import { RecruiterBannerCTA } from '../components/recruiters/RecruiterBannerCTA'
import { ReliablePartner } from '../components/recruiters/ReliablePartner'
import { NeedSupport } from '../components/recruiters/NeedSupport'
import { Footer } from '../components/Footer'

interface RecruitersPageProps {
  onRegisterRecruiter: () => void
}

export const RecruitersPage: React.FC<RecruitersPageProps> = ({ onRegisterRecruiter }) => {
  return (
    <div className="recruiters-page animate-fade-in">
      {/* 1. Recruiter Hero */}
      <RecruiterHero onRegister={onRegisterRecruiter} />

      {/* 2. Why Hire Through ProxHire */}
      <WhyHireThroughProxy />

      {/* 3. Recruiter Process (4 steps) */}
      <RecruiterProcess />

      {/* 4. Modern Recruitment Needs */}
      <ModernRecruitmentNeeds />

      {/* 5. Banner CTA: Register as a Recruiter Today */}
      <RecruiterBannerCTA onRegister={onRegisterRecruiter} />

      {/* 6. Reliable Recruitment Partner (3 pillars) */}
      <ReliablePartner />

      {/* 7. Need Support Help Card */}
      <NeedSupport />

      {/* 8. Full Footer */}
      <Footer />
    </div>
  )
}
