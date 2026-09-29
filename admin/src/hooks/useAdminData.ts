import { useState, useEffect, useRef } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import type { Candidate, Recruiter, Company } from '../types'

// Detect if Firebase is configured (not placeholder)
const IS_FIREBASE_CONFIGURED = !import.meta.env.VITE_FIREBASE_API_KEY?.includes('YOUR')
  && !!import.meta.env.VITE_FIREBASE_PROJECT_ID

// ---------------------
// Mock data for preview when Firebase isn't configured
// ---------------------
const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    mobileNumber: '+91 98765 43210',
    currentLocation: 'Bengaluru',
    highestEducation: 'B.Tech',
    workExperience: '2-4 years',
    preferredRole: 'Software Developer',
    registeredAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    status: 'active',
  },
  {
    id: '2',
    fullName: 'Arun Kumar',
    email: 'arun.kumar@example.com',
    mobileNumber: '+91 87654 32109',
    currentLocation: 'Bengaluru',
    highestEducation: 'MBA',
    workExperience: '0-1 year',
    preferredRole: 'Marketing Executive',
    registeredAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    status: 'pending',
  },
  {
    id: '3',
    fullName: 'Meena Rao',
    email: 'meena.rao@example.com',
    mobileNumber: '+91 76543 21098',
    currentLocation: 'Mysuru',
    highestEducation: 'B.Com',
    workExperience: '5-10 years',
    preferredRole: 'Finance Analyst',
    registeredAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    status: 'active',
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
  const [loading, setLoading] = useState(true)

  // Tracks how many of the 3 collections have received their first snapshot.
  // Only when all 3 have fired do we set loading=false.
  const resolvedCount = useRef(0)

  useEffect(() => {
    resolvedCount.current = 0

    if (!IS_FIREBASE_CONFIGURED) {
      // Use mock data for preview
      setCandidates(MOCK_CANDIDATES)
      setRecruiters(MOCK_RECRUITERS)
      setCompanies(MOCK_COMPANIES)
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

    // Listen to candidates collection
    let candidatesFirstSnap = true
    unsubs.push(
      onSnapshot(
        query(collection(db, 'candidates'), orderBy('registeredAt', 'desc')),
        snap => {
          setCandidates(snap.docs.map(d => ({ id: d.id, ...d.data() } as Candidate)))
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

    // Listen to companies collection (derived from recruiters, or separate collection)
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

  return { candidates, recruiters, companies, loading, isFirebaseConfigured: IS_FIREBASE_CONFIGURED }
}
