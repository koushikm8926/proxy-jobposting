import React, { useState, type FormEvent } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { ShieldCheck, Eye, EyeOff, LogIn } from 'lucide-react'

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // AuthContext will detect the user change and unmount this page automatically
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed.'
      // Map Firebase error codes to human-friendly messages
      if (msg.includes('invalid-credential') || msg.includes('wrong-password') || msg.includes('user-not-found')) {
        setError('Incorrect email or password. Please try again.')
      } else if (msg.includes('too-many-requests')) {
        setError('Too many failed attempts. Please wait a moment and try again.')
      } else if (msg.includes('network-request-failed')) {
        setError('Network error. Check your connection and try again.')
      } else {
        setError('Login failed. Please check your credentials.')
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
        <p className="login-subtitle">Sign in to your admin account to continue.</p>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* Email */}
          <div className="login-field">
            <label htmlFor="admin-email" className="login-label">Email address</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              className="login-input"
              placeholder="you@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="login-field">
            <label htmlFor="admin-password" className="login-label">Password</label>
            <div className="login-input-wrap">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="login-input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
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

          <button
            id="admin-login-submit"
            type="submit"
            className="login-btn"
            disabled={loading || !email || !password}
          >
            {loading ? (
              <>
                <span className="login-spinner" />
                Signing in…
              </>
            ) : (
              <>
                <LogIn size={16} />
                Sign in
              </>
            )}
          </button>
        </form>

        <p className="login-footer">Access is restricted to authorised administrators only.</p>
      </div>
    </div>
  )
}
