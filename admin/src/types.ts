export type UserStatus = 'active' | 'pending' | 'suspended' | 'new' | 'viewed'
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
  hasResume?: boolean
  resumeFileName?: string
  resumeFileType?: string
  resumeFileSize?: number
  resumeChunkCount?: number
  resumeUrl?: string
  resumeDataUrl?: string
  registeredAt: any
  status?: UserStatus
  viewed?: boolean
  isResumeChunk?: boolean
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
  registeredAt: any
  status?: UserStatus
  viewed?: boolean
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

export interface ContactMessage {
  id: string
  name: string
  fullName?: string
  email: string
  phone: string
  mobileNumber?: string
  role: string
  subject: string
  message: string
  status?: UserStatus
  viewed?: boolean
  registeredAt: any
  createdAt?: any
  isContactMessage?: boolean
}

export type AdminView = 'dashboard' | 'candidates' | 'recruiters' | 'messages' | 'options'

export interface FormOptions {
  highestEducation: string[]
  preferredRole: string[]
  workExperience: string[]
  currentLocation: string[]
  industry: string[]
  companySize: string[]
  updatedAt?: any
}

export const DEFAULT_FORM_OPTIONS: FormOptions = {
  highestEducation: [
    'B.Tech / B.E.',
    'MCA / BCA / B.Sc (IT)',
    'MBA / PGDM',
    'B.Com / M.Com / Finance',
    'Diploma / Polytechnic',
    'Any Graduate / Post Graduate',
    'Other'
  ],
  preferredRole: [
    'Software Engineer / Developer',
    'Frontend / UI Engineer',
    'Backend / Fullstack Engineer',
    'Data Analyst / Data Scientist',
    'Business Development / Sales',
    'HR & Talent Acquisition',
    'Finance & Accounting',
    'Operations & Logistics',
    'Customer Experience / Support',
    'Mechanical / Core Engineering'
  ],
  workExperience: [
    'Fresher / Entry Level (0-1 yrs)',
    '1 - 3 Years',
    '3 - 5 Years',
    '5 - 8 Years',
    '8+ Years (Senior / Lead)'
  ],
  currentLocation: [
    'Bengaluru / Bangalore',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Mumbai',
    'Delhi NCR',
    'Kolkata',
    'Other Location'
  ],
  industry: [
    'IT & Software Services',
    'Healthcare & Life Sciences',
    'BFSI (Banking & Financial)',
    'Manufacturing & Engineering',
    'Sales, Retail & E-commerce',
    'Logistics & Supply Chain',
    'Hospitality & Tourism',
    'Education & EdTech',
    'Other Industry'
  ],
  companySize: [
    '1-10 employees (Startup)',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees (Enterprise)'
  ]
}

