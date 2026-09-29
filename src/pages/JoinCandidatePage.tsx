import React from 'react'
import { JoinCandidateHero } from '../components/join-candidate/JoinCandidateHero'
import { CandidateRegistrationForm } from '../components/join-candidate/CandidateRegistrationForm'
import { WhatHappensNext } from '../components/join-candidate/WhatHappensNext'
import { TrustedByJobSeekers } from '../components/join-candidate/TrustedByJobSeekers'
import { Footer } from '../components/Footer'

export const JoinCandidatePage: React.FC = () => {
  return (
    <div className="join-candidate-page-root">
      {/* 1. Candidate Hero Header */}
      <JoinCandidateHero />

      {/* 2. Benefits + Candidate Registration Form with Resume Upload */}
      <CandidateRegistrationForm />

      {/* 3. Transparent Process Pipeline */}
      <WhatHappensNext />

      {/* 4. Trust Badges & Guarantees */}
      <TrustedByJobSeekers />

      {/* 5. Dark Footer matching overall branding */}
      <Footer variant="dark" />
    </div>
  )
}
