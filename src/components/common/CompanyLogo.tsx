import React from 'react'

export type CompanyName = 'adobe' | 'google' | 'swiggy' | 'microsoft' | 'zoho' | 'amazon' | 'flipkart'

interface CompanyLogoProps {
  name: CompanyName | string
  size?: number
  className?: string
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ name, size = 38, className = '' }) => {
  const norm = name.toLowerCase().trim()

  const containerStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    border: '1px solid #f1f5f9',
    overflow: 'hidden',
    flexShrink: 0
  }

  if (norm.includes('adobe')) {
    return (
      <div style={containerStyle} className={className}>
        <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none">
          <path fill="#FA0F00" d="M13.96 22H9.98l3.18-8.15L15.9 22h-1.94zm5.02 0l-5.06-13.06L18.98 2H24v20h-5.02zM0 2h5.02l5.06 13.06L5.02 22H0V2z" />
        </svg>
      </div>
    )
  }

  if (norm.includes('google')) {
    return (
      <div style={containerStyle} className={className}>
        <svg width={size * 0.68} height={size * 0.68} viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
        </svg>
      </div>
    )
  }

  if (norm.includes('swiggy')) {
    return (
      <div style={containerStyle} className={className}>
        <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32">
          <rect width="32" height="32" rx="7" fill="#FC8019" />
          <path fill="#FFFFFF" d="M16 5.5C11.3 5.5 7.5 9.3 7.5 14c0 6.6 8.5 12.5 8.5 12.5s8.5-5.9 8.5-12.5c0-4.7-3.8-8.5-8.5-8.5zm0 11.5c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
        </svg>
      </div>
    )
  }

  if (norm.includes('microsoft')) {
    return (
      <div style={containerStyle} className={className}>
        <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24">
          <rect x="1" y="1" width="10" height="10" fill="#F25022" />
          <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
          <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
          <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
        </svg>
      </div>
    )
  }

  if (norm.includes('zoho')) {
    return (
      <div style={containerStyle} className={className}>
        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
          <span style={{ backgroundColor: '#E42528', color: '#fff', fontWeight: 800, fontSize: '10px', padding: '1px 3px', borderRadius: '3px' }}>Z</span>
          <span style={{ backgroundColor: '#2E9E44', color: '#fff', fontWeight: 800, fontSize: '10px', padding: '1px 3px', borderRadius: '3px' }}>O</span>
          <span style={{ backgroundColor: '#1C75BC', color: '#fff', fontWeight: 800, fontSize: '10px', padding: '1px 3px', borderRadius: '3px' }}>H</span>
          <span style={{ backgroundColor: '#F9A01B', color: '#fff', fontWeight: 800, fontSize: '10px', padding: '1px 3px', borderRadius: '3px' }}>O</span>
        </div>
      </div>
    )
  }

  if (norm.includes('amazon')) {
    return (
      <div style={containerStyle} className={className}>
        <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 24 24">
          <path fill="#232F3E" d="M12.9 14.5c-1.3 0-2.4-.8-2.4-2.2 0-1.5 1.1-2.3 2.4-2.3 1.3 0 2.2.8 2.2 2.3 0 1.4-.9 2.2-2.2 2.2zM19 16.5l-2.4-.2c-.3-.7-.6-1.5-.7-2.3-1 1.7-2.7 2.6-4.6 2.6-2.9 0-5.1-1.9-5.1-4.8 0-3.3 2.6-5.1 6.5-5.1h1.5v-.5c0-1.4-1-2.2-2.6-2.2-1.2 0-2.3.4-3.2 1.1l-1.3-1.6C8.5 2.4 10.3 1.8 12.3 1.8c3.4 0 5.3 1.7 5.3 4.8v6.7c0 1.2.3 2.3.8 3.2h.6z" />
          <path fill="#FF9900" d="M21 17.5c-4 3.2-10 4-15 1.3-.2-.1-.2-.4 0-.5 3.3-1.8 7.3-2.3 11.2-1.2.6.2 3.1.2 3.8.4z" />
        </svg>
      </div>
    )
  }

  if (norm.includes('flipkart')) {
    return (
      <div style={containerStyle} className={className}>
        <svg width={size * 0.75} height={size * 0.75} viewBox="0 0 32 32">
          <rect width="32" height="32" rx="7" fill="#2874F0" />
          <path fill="#FFE500" d="M19 7h-7l-1 8h5l-3 10 9-11h-5l2-7z" />
        </svg>
      </div>
    )
  }

  if (norm.includes('phonepe')) {
    return (
      <div style={containerStyle} className={className}>
        <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="15" fill="#6739B7" />
          <text x="16" y="21" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">पे</text>
        </svg>
      </div>
    )
  }

  if (norm.includes('apple')) {
    return (
      <div style={containerStyle} className={className}>
        <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="#000000">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.66-1.07 1.73-.93 2.76 1.01.08 2.02-.51 2.63-1.26z" />
        </svg>
      </div>
    )
  }

  if (norm.includes('inmobi')) {
    return (
      <div style={containerStyle} className={className}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#0052cc', letterSpacing: '-0.5px' }}>
          in<span style={{ color: '#00b4d8' }}>Mobi</span>
        </div>
      </div>
    )
  }

  // Fallback icon
  return (
    <div style={containerStyle} className={className}>
      <span style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a' }}>
        {name.substring(0, 2).toUpperCase()}
      </span>
    </div>
  )
}
