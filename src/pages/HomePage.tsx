import React from 'react'
import { Hero } from '../components/Hero'
import { WhyProxy } from '../components/WhyProxy'
import { CandidateRecruiterCards } from '../components/CandidateRecruiterCards'
import { JobCategories } from '../components/JobCategories'
import { HowItWorks } from '../components/HowItWorks'
import { BengaluruFocus } from '../components/BengaluruFocus'
import { WhyChooseProxy } from '../components/WhyChooseProxy'
import { CallToAction } from '../components/CallToAction'
import { Footer } from '../components/Footer'

interface HomePageProps {
  onJoinCandidate: () => void
  onHireTalent: () => void
  onSelectCategory: (category: string) => void
  onKnowMore: () => void
}

export const HomePage: React.FC<HomePageProps> = ({
  onJoinCandidate,
  onHireTalent,
  onSelectCategory,
  onKnowMore
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
      <BengaluruFocus
        onKnowMore={onKnowMore}
      />
      <WhyChooseProxy />
      <CallToAction
        onJoinCandidate={onJoinCandidate}
        onRegisterRecruiter={onHireTalent}
      />
      <Footer />
    </div>
  )
}
