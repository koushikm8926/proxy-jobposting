import React from 'react'
import { CandidateHero } from '../components/candidates/CandidateHero'
import { WhyChooseProxyCareer } from '../components/candidates/WhyChooseProxyCareer'
import { CandidateBengaluruBanner } from '../components/candidates/CandidateBengaluruBanner'
import { JobCategories } from '../components/JobCategories'
import { CandidateHowItWorks } from '../components/candidates/CandidateHowItWorks'
import { CandidateRegisterCard } from '../components/candidates/CandidateRegisterCard'
import { WhoCanApply } from '../components/candidates/WhoCanApply'
import { Footer } from '../components/Footer'

interface CandidatesPageProps {
  onJoinCandidate: () => void
  onSelectCategory?: (category: string) => void
}

export const CandidatesPage: React.FC<CandidatesPageProps> = ({
  onJoinCandidate,
  onSelectCategory
}) => {
  return (
    <div className="candidates-page animate-fade-in">
      {/* 1. Candidate Hero */}
      <CandidateHero onJoinCandidate={onJoinCandidate} />

      {/* 2. Why Choose Proxy for Career */}
      <WhyChooseProxyCareer />

      {/* 3. Bengaluru Launch Dark Banner */}
      <CandidateBengaluruBanner />

      {/* 4. 12 Job Categories Grid */}
      <JobCategories onSelectCategory={onSelectCategory} />

      {/* 5. How It Works - 4 Steps for Candidates */}
      <CandidateHowItWorks />

      {/* 6. Take The First Step: Register Card */}
      <CandidateRegisterCard onJoinCandidate={onJoinCandidate} />

      {/* 7. Who Can Apply - 6 Career Stages */}
      <WhoCanApply />

      {/* 8. Full Footer */}
      <Footer />
    </div>
  )
}
