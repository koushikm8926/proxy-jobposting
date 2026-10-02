import React from 'react'

interface LogoProps {
  className?: string
  variant?: 'dark' | 'light'
  size?: 'normal' | 'large' | 'xl'
  height?: number | string
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'normal',
  height
}) => {
  const isLight = variant === 'light'
  const isLarge = size === 'large'
  const isXLarge = size === 'xl'

  const defaultHeight = isXLarge ? 54 : isLarge ? 48 : 40
  const computedHeight = height !== undefined
    ? (typeof height === 'number' ? `${height}px` : height)
    : `${defaultHeight}px`

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
          height: computedHeight,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          mixBlendMode: isLight ? 'normal' : 'multiply'
        }}
      />
    </div>
  )
}
