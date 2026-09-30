import { useState, useEffect, useRef } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import type { Candidate, Recruiter, Company, ContactMessage } from '../types'

// Detect if Firebase is configured (not placeholder)
const IS_FIREBASE_CONFIGURED = !import.meta.env.VITE_FIREBASE_API_KEY?.includes('YOUR')
  && !!import.meta.env.VITE_FIREBASE_PROJECT_ID

// ---------------------
// Mock data for preview when Firebase isn't configured
// ---------------------
const MOCK_MESSAGES: ContactMessage[] = [
  {
    id: 'm1',
    name: 'Rahul Sen',
    email: 'rahul.sen@example.com',
    phone: '+91 98450 12345',
    role: 'Candidate looking for job',
    subject: 'Career Consultation',
    message: 'Hello Proxy team, I have 5 years of experience in Fullstack web development and I am looking for high-impact opportunities in Bengaluru.',
    registeredAt: '2026-09-29T10:15:00.000Z',
    createdAt: '2026-09-29T10:15:00.000Z',
    status: 'new',
  },
  {
    id: 'm2',
    name: 'Meera Deshmukh',
    email: 'meera@novatech.in',
    phone: '+91 99801 54321',
    role: 'Employer / Recruiter',
    subject: 'Hiring Partnership',
    message: 'We are looking to hire 10+ frontend engineers over the next quarter and would like to explore staffing and partnership options with Proxy.',
    registeredAt: '2026-09-28T14:40:00.000Z',
    createdAt: '2026-09-28T14:40:00.000Z',
    status: 'viewed',
  },
]

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    fullName: 'Akhil Reddy',
    email: 'akhilreddy@gmail.com',
    mobileNumber: '+91 98765 43210',
    currentLocation: 'Bangalore, KA',
    highestEducation: 'B.Tech / B.E.',
    workExperience: '3 - 5 Years',
    preferredRole: 'Software Engineer / Developer',
    resumeFileName: 'AkhilReddy_Resume.pdf',
    hasResume: true,
    registeredAt: '2026-09-24T10:30:00.000Z',
    status: 'new',
  },
  {
    id: '2',
    fullName: 'Sneha Varma',
    email: 'sneha.varma@gmail.com',
    mobileNumber: '+91 98765 43211',
    currentLocation: 'Hyderabad, TG',
    highestEducation: 'MCA / BCA / B.Sc (IT)',
    workExperience: '1 - 3 Years',
    preferredRole: 'Frontend / UI Engineer',
    resumeFileName: 'Sneha_Varma_CV.pdf',
    hasResume: true,
    registeredAt: '2026-09-23T16:15:00.000Z',
    status: 'new',
  },
  {
    id: '3',
    fullName: 'Rahul Mehta',
    email: 'rahulmehta@gmail.com',
    mobileNumber: '+91 98765 43212',
    currentLocation: 'Mumbai, MH',
    highestEducation: 'MBA / PGDM',
    workExperience: '5 - 8 Years',
    preferredRole: 'Data Analyst / Data Scientist',
    resumeFileName: 'Rahul_Mehta_Data.pdf',
    hasResume: true,
    registeredAt: '2026-09-22T11:20:00.000Z',
    status: 'viewed',
  },
  {
    id: '4',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    mobileNumber: '+91 98765 43213',
    currentLocation: 'Chennai, TN',
    highestEducation: 'B.Tech / B.E.',
    workExperience: '1 - 3 Years',
    preferredRole: 'Backend / Fullstack Engineer',
    resumeFileName: 'Priya_Sharma_Resume.pdf',
    hasResume: true,
    registeredAt: '2026-09-21T14:45:00.000Z',
    status: 'new',
  },
  {
    id: '5',
    fullName: 'Karan Kapoor',
    email: 'karankapoor@gmail.com',
    mobileNumber: '+91 98765 43214',
    currentLocation: 'Pune, MH',
    highestEducation: 'B.Com / M.Com / Finance',
    workExperience: '3 - 5 Years',
    preferredRole: 'Finance & Accounting',
    resumeFileName: 'Karan_Kapoor_Finance.pdf',
    hasResume: true,
    registeredAt: '2026-09-20T09:10:00.000Z',
    status: 'viewed',
  },
  {
    id: '6',
    fullName: 'Koushik Mondal',
    email: 'koushik.12019976@gmail.com',
    mobileNumber: '7384810162',
    currentLocation: 'Bengaluru / Bangalore',
    highestEducation: 'B.Tech / B.E.',
    workExperience: '1 - 3 Years',
    preferredRole: 'Software Engineer / Developer',
    resumeFileName: 'KoushikResume.pdf',
    hasResume: true,
    registeredAt: '2026-09-29T13:30:00.000Z',
    status: 'new',
  },
]

const MOCK_RECRUITERS: Recruiter[] = [
  {
    id: 'r1',
    fullName: 'Rajesh Verma',
    email: 'rajesh@techstartup.in',
    mobileNumber: '+91 99887 76655',
    companyName: 'TechStartup Pvt Ltd',
    industry: 'IT & Software',
    companySize: '11-50',
    jobRole: 'HR Manager',
    companyWebsite: 'https://techstartup.in',
    hearAboutUs: 'LinkedIn',
    registeredAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    status: 'active',
  },
  {
    id: 'r2',
    fullName: 'Anjali Nair',
    email: 'anjali@globalfin.com',
    mobileNumber: '+91 88776 65544',
    companyName: 'GlobalFin Solutions',
    industry: 'Finance & Banking',
    companySize: '201-500',
    jobRole: 'Talent Acquisition Lead',
    companyWebsite: 'https://globalfin.com',
    hearAboutUs: 'Word of Mouth',
    registeredAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    status: 'pending',
  },
]

const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    companyName: 'TechStartup Pvt Ltd',
    industry: 'IT & Software',
    companySize: '11-50',
    companyWebsite: 'https://techstartup.in',
    recruiterName: 'Rajesh Verma',
    recruiterEmail: 'rajesh@techstartup.in',
    registeredAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    status: 'active',
  },
  {
    id: 'c2',
    companyName: 'GlobalFin Solutions',
    industry: 'Finance & Banking',
    companySize: '201-500',
    companyWebsite: 'https://globalfin.com',
    recruiterName: 'Anjali Nair',
    recruiterEmail: 'anjali@globalfin.com',
    registeredAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    status: 'pending',
  },
]

// ---------------------
// Hook
// ---------------------
export function useAdminData() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [recruiters, setRecruiters] = useState<Recruiter[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  // Tracks how many of the collections have received their first snapshot.
  const resolvedCount = useRef(0)

  useEffect(() => {
    resolvedCount.current = 0

    if (!IS_FIREBASE_CONFIGURED) {
      // Use mock data for preview
      setCandidates(MOCK_CANDIDATES)
      setRecruiters(MOCK_RECRUITERS)
      setCompanies(MOCK_COMPANIES)
      setMessages(MOCK_MESSAGES)
      setLoading(false)
      return
    }

    setLoading(true)
    const unsubs: (() => void)[] = []
    const TOTAL_COLLECTIONS = 3

    const markResolved = () => {
      resolvedCount.current += 1
      if (resolvedCount.current >= TOTAL_COLLECTIONS) {
        setLoading(false)
      }
    }

    // Read any local cached contact messages from localStorage as baseline
    let localMessages: ContactMessage[] = []
    try {
      const stored = localStorage.getItem('proxy_contact_messages')
      if (stored) {
        localMessages = JSON.parse(stored)
      }
    } catch {
      // ignore
    }

    // Listen to candidates collection (stores candidates and contact messages)
    let candidatesFirstSnap = true
    unsubs.push(
      onSnapshot(
        query(collection(db, 'candidates'), orderBy('registeredAt', 'desc')),
        snap => {
          const candidateList: Candidate[] = []
          const messageList: ContactMessage[] = []

          snap.docs.forEach(d => {
            const data = d.data()
            if (data.isResumeChunk) return

            // Check if this document is a Contact Message
            if (data.isContactMessage === true || data.subject || (data.message && data.role)) {
              messageList.push({
                id: d.id,
                name: data.name || data.fullName || 'Anonymous',
                fullName: data.name || data.fullName || 'Anonymous',
                email: data.email || '—',
                phone: data.phone || data.mobileNumber || '—',
                mobileNumber: data.phone || data.mobileNumber || '—',
                role: data.role || '—',
                subject: data.subject || 'General Inquiry',
                message: data.message || '',
                status: data.status || 'new',
                registeredAt: data.registeredAt || data.createdAt || new Date().toISOString(),
                createdAt: data.createdAt || data.registeredAt || new Date().toISOString(),
                isContactMessage: true,
              })
            } else if (data.fullName) {
              candidateList.push({ id: d.id, ...data } as Candidate)
            }
          })

          // Merge any local messages not in Firestore yet
          localMessages.forEach(lm => {
            if (!messageList.some(m => m.id === lm.id || (m.email === lm.email && m.message === lm.message))) {
              messageList.unshift(lm)
            }
          })

          setCandidates(candidateList)
          setMessages(messageList)
          if (candidatesFirstSnap) { candidatesFirstSnap = false; markResolved() }
        }
      )
    )

    // Listen to recruiters collection
    let recruitersFirstSnap = true
    unsubs.push(
      onSnapshot(
        query(collection(db, 'recruiters'), orderBy('registeredAt', 'desc')),
        snap => {
          setRecruiters(snap.docs.map(d => ({ id: d.id, ...d.data() } as Recruiter)))
          if (recruitersFirstSnap) { recruitersFirstSnap = false; markResolved() }
        }
      )
    )

    // Listen to companies collection
    let companiesFirstSnap = true
    unsubs.push(
      onSnapshot(
        query(collection(db, 'companies'), orderBy('registeredAt', 'desc')),
        snap => {
          setCompanies(snap.docs.map(d => ({ id: d.id, ...d.data() } as Company)))
          if (companiesFirstSnap) { companiesFirstSnap = false; markResolved() }
        }
      )
    )

    return () => unsubs.forEach(u => u())
  }, [])

  return { candidates, recruiters, companies, messages, loading, isFirebaseConfigured: IS_FIREBASE_CONFIGURED }
}
