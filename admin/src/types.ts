export type UserStatus = 'active' | 'pending' | 'suspended'
export type CompanyStatus = 'active' | 'pending' | 'rejected'

export interface Candidate {
  id: string
  fullName: string
  email: string
  mobileNumber: string
  currentLocation: string
  highestEducation: string
  workExperience: string
  preferredRole: string
  resumeUrl?: string
  registeredAt: Date | string
  status: UserStatus
}

export interface Recruiter {
  id: string
  fullName: string
  email: string
  mobileNumber: string
  companyName: string
  industry: string
  companySize: string
  jobRole: string
  companyWebsite?: string
  hearAboutUs?: string
  registeredAt: Date | string
  status: UserStatus
}

export interface Company {
  id: string
  companyName: string
  industry: string
  companySize: string
  companyWebsite?: string
  recruiterName: string
  recruiterEmail: string
  registeredAt: Date | string
  status: CompanyStatus
  openPositions?: number
}

export type AdminView = 'dashboard' | 'candidates' | 'recruiters' | 'companies'
