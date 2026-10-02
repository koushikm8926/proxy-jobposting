/**
 * Application Image Asset Registry
 * Centralized paths for all image assets used across ProxHire.
 */
export const IMAGES = {
  brand: {
    logo: '/logo.png',
    logoWhite: '/logo-white.png',
    favicon: '/favicon.svg',
  },
  common: {
    bengaluruSkyline: '/images/common/bengaluru-skyline.png',
  },
  home: {
    heroBanner: '/images/home/hero-banner.png',
    candidateCard: '/images/home/candidate-card.png',
    recruiterCard: '/images/home/recruiter-card.png',
    bengaluruSkyline: '/images/common/bengaluru-skyline.png',
  },
  about: {
    hero: '/images/about/about-hero.png',
    ourStory: '/images/about/our-story.png',
    founder: '/images/about/founder.jpeg',
    coFounder: '/images/about/co-founder.jpeg',
    bengaluruSkyline: '/images/common/bengaluru-skyline.png',
  },
  candidates: {
    hero: '/images/candidates/candidate-hero.png',
    registerCard: '/images/candidates/candidate-journey.png',
    joinHero: '/images/candidates/join-hero.jpg',
    bengaluruSkyline: '/images/common/bengaluru-skyline.png',
  },
  recruiters: {
    hero: '/images/recruiters/recruiter-hero.png',
    needs: '/images/recruiters/recruiter-needs.jpg',
    registerHero: '/images/recruiters/recruiter-register.jpg',
  },
  contact: {
    hero: '/images/contact/contact-hero.jpg',
    officeMap: '/images/contact/office-map.jpg',
  },
  faq: {
    hero: '/images/faq/faq-hero.jpg',
    candidate: '/images/faq/faq-candidate.jpg',
    recruiter: '/images/faq/faq-recruiter.jpg',
  },
} as const

export type ImageAssets = typeof IMAGES
