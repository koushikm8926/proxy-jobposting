import React from 'react'

interface LogoProps {
  className?: string
  variant?: 'dark' | 'light'
  size?: 'normal' | 'large'
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'normal'
}) => {
  const isLight = variant === 'light'
  const isLarge = size === 'large'
  const height = isLarge ? 48 : 40

  return (
    <div
      className={`proxy-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        userSelect: 'none'
      }}
    >
      <img
        src={isLight ? '/logo-white.png' : '/logo.png'}
        alt="ProxHire - India's Ultimate Career Bridge"
        style={{
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          mixBlendMode: isLight ? 'normal' : 'multiply'
        }}
      />
    </div>
  )
}
