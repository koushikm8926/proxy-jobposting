export type UserRole = 'candidate' | 'recruiter' | 'admin'

export type BGVStatus = 'UNVERIFIED' | 'BASIC_VERIFIED' | 'KYC_VERIFIED' | 'REJECTED'

export type EmployerVerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'MORE_INFO_REQUIRED'

export type ApplicationStage =
  | 'APPLIED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'INTERVIEW'
  | 'SELECTED'
  | 'HIRED'
  | 'REJECTED'
  | 'WITHDRAWN'

export interface UserProfile {
  uid: string
  email: string
  mobileNumber?: string
  role: UserRole
  displayName?: string
  createdAt?: any
}

export interface CandidateAccount {
  id: string
  uid: string
  fullName: string
  email: string
  mobileNumber: string
  currentLocation: string
  highestEducation: string
  workExperience: string
  preferredRole: string
  currentSalary?: string
  expectedSalary?: string
  noticePeriod?: string
  skills?: string[]
  resumeFileName?: string
  resumeUrl?: string
  resumeFileType?: string
  bgvStatus: BGVStatus
  registeredAt?: any
}

export interface RecruiterAccount {
  id: string
  uid: string
  fullName: string
  email: string
  mobileNumber: string
  companyName: string
  industry: string
  companySize: string
  jobRole: string
  companyWebsite?: string
  verificationStatus: EmployerVerificationStatus
  registeredAt?: any
}

export interface JobListing {
  id: string
  companyId: string
  companyName: string
  recruiterId: string
  recruiterName: string
  title: string
  category: string
  vacancies: number
  description: string
  responsibilities?: string
  requiredSkills: string[]
  experience: string
  salary: string
  location: string
  workMode: 'In-Office' | 'Hybrid' | 'Remote'
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'PUBLISHED' | 'PAUSED' | 'CLOSED'
  isFeatured?: boolean
  isPremium?: boolean
  postedAt?: any
  applicantCount?: number
}

export interface JobApplication {
  id: string
  jobId: string
  jobTitle: string
  companyName: string
  location: string
  salary: string
  candidateId: string
  candidateName: string
  candidateEmail: string
  candidateMobile: string
  candidateExperience: string
  candidateLocation: string
  candidateSkills: string[]
  resumeUrl?: string
  resumeFileName?: string
  bgvStatus: BGVStatus
  status: ApplicationStage
  appliedAt: any
  updatedAt?: any
  feedbackNotes?: string
}
