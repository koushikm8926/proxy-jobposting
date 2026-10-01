import React from 'react'
import { AboutHero } from '../components/about/AboutHero'
import { OurStory } from '../components/about/OurStory'
import { VisionMission } from '../components/about/VisionMission'
import { WhatMakesProxyDifferent } from '../components/about/WhatMakesProxyDifferent'
import { MeetFounders } from '../components/about/MeetFounders'
import { CallToAction } from '../components/CallToAction'
import { Footer } from '../components/Footer'

interface AboutPageProps {
  onJoinCandidate: () => void
  onRegisterRecruiter: () => void
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onJoinCandidate,
  onRegisterRecruiter
}) => {
  const handleScrollToStory = () => {
    const el = document.getElementById('our-story')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="about-page animate-fade-in">
      {/* 1. About Hero Section */}
      <AboutHero onScrollToStory={handleScrollToStory} />

      {/* 2. Our Story Section */}
      <OurStory />

      {/* 3. Vision & Mission Cards */}
      <VisionMission />

      {/* 4. What Makes ProxHire Different */}
      <WhatMakesProxyDifferent />

      {/* 5. Meet Our Founders */}
      <MeetFounders />

      {/* 6. CTA Banner */}
      <CallToAction
        onJoinCandidate={onJoinCandidate}
        onRegisterRecruiter={onRegisterRecruiter}
      />

      {/* 7. Footer */}
      <Footer />
    </div>
  )
}
