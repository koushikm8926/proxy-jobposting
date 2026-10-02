import React from 'react'
import {
  Hero,
  WhyProxy,
  CandidateRecruiterCards,
  JobCategories,
  HowItWorks,
  WhyChooseProxy,
  CallToAction
} from '../components/home'
import { Footer } from '../components/Footer'

interface HomePageProps {
  onJoinCandidate: () => void
  onHireTalent: () => void
  onSelectCategory: (category: string) => void
  onKnowMore?: () => void
}

export const HomePage: React.FC<HomePageProps> = ({
  onJoinCandidate,
  onHireTalent,
  onSelectCategory,
}) => {
  return (
    <div className="home-page animate-fade-in">
      <Hero
        onFindJobs={onJoinCandidate}
        onHireTalent={onHireTalent}
      />
      <WhyProxy />
      <CandidateRecruiterCards
        onJoinCandidate={onJoinCandidate}
        onRegisterRecruiter={onHireTalent}
      />
      <JobCategories
        onSelectCategory={onSelectCategory}
      />
      <HowItWorks />
      <WhyChooseProxy />
      <CallToAction
        onJoinCandidate={onJoinCandidate}
        onRegisterRecruiter={onHireTalent}
      />
      <Footer />
    </div>
  )
}
