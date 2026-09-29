import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../firebase'

interface AuthContextValue {
  user: User | null
  /** true while the initial auth check is in flight */
  authLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  authLoading: true,
  signOut: async () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setAuthLoading(false)
    })
    return unsub
  }, [])

  const signOut = () => fbSignOut(auth)

  return (
    <AuthContext.Provider value={{ user, authLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
