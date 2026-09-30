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
    // Safety timeout: if Firebase never responds (e.g. missing env vars on Vercel),
    // resolve authLoading after 5 s so we don't show a permanent blank screen.
    const timeout = setTimeout(() => setAuthLoading(false), 5000)

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      clearTimeout(timeout)
      if (firebaseUser && firebaseUser.email?.toLowerCase() !== 'proxyapplicationcode@gmail.com'.toLowerCase()) {
        await fbSignOut(auth)
        setUser(null)
        setAuthLoading(false)
        return
      }
      setUser(firebaseUser)
      setAuthLoading(false)
    })
    return () => { unsub(); clearTimeout(timeout) }
  }, [])

  const signOut = () => fbSignOut(auth)

  return (
    <AuthContext.Provider value={{ user, authLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
