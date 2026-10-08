import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  type User,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  type ConfirmationResult,
  type ApplicationVerifier,
  updateProfile
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore'
import { auth, db } from '../firebase'
import type { UserRole, CandidateAccount, RecruiterAccount } from '../types/user'

interface AuthContextType {
  user: User | null
  userRole: UserRole | null
  candidateProfile: CandidateAccount | null
  recruiterProfile: RecruiterAccount | null
  loading: boolean
  sendPhoneOtp: (phoneNumber: string, appVerifier: ApplicationVerifier) => Promise<ConfirmationResult>
  verifyPhoneOtp: (
    confirmationResult: ConfirmationResult,
    otp: string,
    role: UserRole,
    extraData?: { fullName?: string; companyName?: string }
  ) => Promise<void>
  loginWithEmail: (email: string, pass: string) => Promise<void>
  registerWithEmail: (
    email: string,
    pass: string,
    role: UserRole,
    extraData: { fullName: string; mobileNumber: string; companyName?: string; location?: string }
  ) => Promise<void>
  logout: () => Promise<void>
  refreshProfiles: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [candidateProfile, setCandidateProfile] = useState<CandidateAccount | null>(null)
  const [recruiterProfile, setRecruiterProfile] = useState<RecruiterAccount | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchUserProfile = async (currentUser: User) => {
    try {
      // 1. Try reading user mapping from 'users' collection
      const userDocRef = doc(db, 'users', currentUser.uid)
      const userDocSnap = await getDoc(userDocRef)

      let role: UserRole = 'candidate'
      if (userDocSnap.exists()) {
        const udata = userDocSnap.data()
        role = (udata.role as UserRole) || 'candidate'
        setUserRole(role)
      }

      // 2. Load role-specific profile
      if (role === 'recruiter') {
        const rQuery = query(collection(db, 'recruiters'), where('uid', '==', currentUser.uid))
        const rSnap = await getDocs(rQuery)
        if (!rSnap.empty) {
          const docData = rSnap.docs[0].data()
          setRecruiterProfile({ id: rSnap.docs[0].id, ...docData } as RecruiterAccount)
        } else {
          // Fallback search by email
          if (currentUser.email) {
            const rEmailQuery = query(collection(db, 'recruiters'), where('email', '==', currentUser.email))
            const rEmailSnap = await getDocs(rEmailQuery)
            if (!rEmailSnap.empty) {
              const docData = rEmailSnap.docs[0].data()
              setRecruiterProfile({ id: rEmailSnap.docs[0].id, ...docData } as RecruiterAccount)
              setUserRole('recruiter')
            }
          }
        }
      } else {
        // Candidate
        const cQuery = query(collection(db, 'candidates'), where('uid', '==', currentUser.uid))
        const cSnap = await getDocs(cQuery)
        if (!cSnap.empty) {
          const docData = cSnap.docs[0].data()
          setCandidateProfile({ id: cSnap.docs[0].id, ...docData } as CandidateAccount)
          setUserRole('candidate')
        } else {
          // Fallback search by email or phone
          if (currentUser.email) {
            const cEmailQuery = query(collection(db, 'candidates'), where('email', '==', currentUser.email))
            const cEmailSnap = await getDocs(cEmailQuery)
            if (!cEmailSnap.empty) {
              const docData = cEmailSnap.docs[0].data()
              setCandidateProfile({ id: cEmailSnap.docs[0].id, ...docData } as CandidateAccount)
              setUserRole('candidate')
            }
          }
        }
      }
    } catch (err) {
      console.error('Error fetching user profile from Firestore:', err)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        await fetchUserProfile(currentUser)
      } else {
        setUserRole(null)
        setCandidateProfile(null)
        setRecruiterProfile(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const refreshProfiles = async () => {
    if (user) {
      await fetchUserProfile(user)
    }
  }

  // 1. Send SMS OTP
  const sendPhoneOtp = async (phoneNumber: string, appVerifier: ApplicationVerifier): Promise<ConfirmationResult> => {
    return await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  }

  // 2. Confirm Phone OTP
  const verifyPhoneOtp = async (
    confirmationResult: ConfirmationResult,
    otp: string,
    role: UserRole,
    extraData?: { fullName?: string; companyName?: string }
  ): Promise<void> => {
    const userCredential = await confirmationResult.confirm(otp)
    const firebaseUser = userCredential.user

    // Register / update in 'users' collection
    await setDoc(
      doc(db, 'users', firebaseUser.uid),
      {
        uid: firebaseUser.uid,
        mobileNumber: firebaseUser.phoneNumber || '',
        role,
        lastLogin: serverTimestamp()
      },
      { merge: true }
    )

    setUserRole(role)

    // Ensure candidate or recruiter profile exists
    if (role === 'candidate') {
      const candRef = doc(db, 'candidates', firebaseUser.uid)
      const candSnap = await getDoc(candRef)
      if (!candSnap.exists()) {
        const newCandidate: Partial<CandidateAccount> = {
          uid: firebaseUser.uid,
          fullName: extraData?.fullName || 'Candidate',
          mobileNumber: firebaseUser.phoneNumber || '',
          email: '',
          currentLocation: 'Bengaluru',
          highestEducation: 'Graduate',
          workExperience: '1 - 3 Years',
          preferredRole: 'Customer Support',
          bgvStatus: 'BASIC_VERIFIED', // Phone verified activates Tier 1 BGV!
          registeredAt: serverTimestamp()
        }
        await setDoc(candRef, newCandidate)
        setCandidateProfile({ id: firebaseUser.uid, ...newCandidate } as CandidateAccount)
      } else {
        setCandidateProfile({ id: candSnap.id, ...candSnap.data() } as CandidateAccount)
      }
    } else {
      // Recruiter
      const recRef = doc(db, 'recruiters', firebaseUser.uid)
      const recSnap = await getDoc(recRef)
      if (!recSnap.exists()) {
        const newRecruiter: Partial<RecruiterAccount> = {
          uid: firebaseUser.uid,
          fullName: extraData?.fullName || 'Recruiter',
          companyName: extraData?.companyName || 'My Company',
          mobileNumber: firebaseUser.phoneNumber || '',
          email: '',
          industry: 'IT & Services',
          companySize: '11-50 employees',
          jobRole: 'HR Manager',
          verificationStatus: 'PENDING',
          registeredAt: serverTimestamp()
        }
        await setDoc(recRef, newRecruiter)
        setRecruiterProfile({ id: firebaseUser.uid, ...newRecruiter } as RecruiterAccount)
      } else {
        setRecruiterProfile({ id: recSnap.id, ...recSnap.data() } as RecruiterAccount)
      }
    }
  }

  // 3. Email Login
  const loginWithEmail = async (email: string, pass: string): Promise<void> => {
    const cred = await signInWithEmailAndPassword(auth, email, pass)
    await fetchUserProfile(cred.user)
  }

  // 4. Email Registration
  const registerWithEmail = async (
    email: string,
    pass: string,
    role: UserRole,
    extraData: { fullName: string; mobileNumber: string; companyName?: string; location?: string }
  ): Promise<void> => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass)
    const firebaseUser = cred.user

    await updateProfile(firebaseUser, { displayName: extraData.fullName })

    // Save in 'users' collection
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      mobileNumber: extraData.mobileNumber,
      role,
      createdAt: serverTimestamp()
    })

    setUserRole(role)

    if (role === 'candidate') {
      const candidateData: Partial<CandidateAccount> = {
        uid: firebaseUser.uid,
        fullName: extraData.fullName,
        email,
        mobileNumber: extraData.mobileNumber,
        currentLocation: extraData.location || 'Bengaluru',
        highestEducation: 'Graduate',
        workExperience: '1 - 3 Years',
        preferredRole: 'Customer Support',
        bgvStatus: 'BASIC_VERIFIED', // Email registered
        registeredAt: serverTimestamp()
      }
      await setDoc(doc(db, 'candidates', firebaseUser.uid), candidateData)
      setCandidateProfile({ id: firebaseUser.uid, ...candidateData } as CandidateAccount)
    } else {
      const recruiterData: Partial<RecruiterAccount> = {
        uid: firebaseUser.uid,
        fullName: extraData.fullName,
        email,
        mobileNumber: extraData.mobileNumber,
        companyName: extraData.companyName || 'Hiring Enterprise',
        industry: 'IT & Services',
        companySize: '11-50 employees',
        jobRole: 'Talent Acquisition',
        verificationStatus: 'PENDING',
        registeredAt: serverTimestamp()
      }
      await setDoc(doc(db, 'recruiters', firebaseUser.uid), recruiterData)
      setRecruiterProfile({ id: firebaseUser.uid, ...recruiterData } as RecruiterAccount)
    }
  }

  // 5. Logout
  const logout = async (): Promise<void> => {
    await signOut(auth)
    setUser(null)
    setUserRole(null)
    setCandidateProfile(null)
    setRecruiterProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        candidateProfile,
        recruiterProfile,
        loading,
        sendPhoneOtp,
        verifyPhoneOtp,
        loginWithEmail,
        registerWithEmail,
        logout,
        refreshProfiles
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
