import React, { useState } from 'react'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import { ShieldCheck } from 'lucide-react'

// ─── Whitelist ─────────────────────────────────────────────────────────────
// Only this email is allowed to access the admin portal.
const ALLOWED_EMAIL = 'proxyapplicationcode@gmail.com'

// ─── Google "G" SVG logo ────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.2C9.5 37.4 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4 5.7l6.2 5.2C41.2 36.1 44 30.5 44 24c0-1.2-.1-2.4-.4-3.5z"/>
  </svg>
)

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleSignIn = async () => {
    setError(null)
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const email = result.user.email ?? ''

      // ── Whitelist check ─────────────────────────────────────────────────
      if (email.toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) {
        // Immediately sign the unauthorized user back out
        await signOut(auth)
        setError(`Access denied. Only ${ALLOWED_EMAIL} is permitted to access this portal.`)
        return
      }
      // AuthContext detects the user change and unmounts this page ✅
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ''
      if (msg.includes('popup-closed-by-user') || msg.includes('cancelled-popup-request')) {
        // User closed the popup — no error needed
      } else if (msg.includes('network-request-failed')) {
        setError('Network error. Check your connection and try again.')
      } else if (msg.includes('popup-blocked')) {
        setError('Popup was blocked by your browser. Please allow popups for this site.')
      } else {
        setError('Sign-in failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo-icon">
            <ShieldCheck size={28} color="#ffffff" />
          </div>
          <div className="login-logo-text">
            <div className="login-brand">PROXY</div>
            <div className="login-brand-sub">Admin Portal</div>
          </div>
        </div>

        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">
          Sign in with your authorised Google account to continue.
        </p>

        {/* Error banner */}
        {error && (
          <div className="login-error" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {/* Google sign-in button */}
        <button
          id="admin-google-signin-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="google-signin-btn"
        >
          {loading ? (
            <>
              <span className="login-spinner" />
              Signing in…
            </>
          ) : (
            <>
              <GoogleIcon />
              Continue with Google
            </>
          )}
        </button>

        <p className="login-footer">
          Access is restricted to authorised administrators only.<br />
          Only <strong>{ALLOWED_EMAIL}</strong> may sign in.
        </p>
      </div>
    </div>
  )
}
