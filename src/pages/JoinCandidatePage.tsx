import React from 'react'
import { CandidateRegistrationReview } from '../components/join-candidate/CandidateRegistrationReview'

interface JoinCandidatePageProps {
  onNavigateDashboard?: () => void
}

export const JoinCandidatePage: React.FC<JoinCandidatePageProps> = ({ onNavigateDashboard }) => {
  return (
    <div className="join-candidate-page-root">
      <CandidateRegistrationReview
        onGoToDashboard={() => {
          if (onNavigateDashboard) {
            onNavigateDashboard()
          } else {
            window.location.hash = '#candidate-dashboard'
          }
        }}
      />
    </div>
  )
}

