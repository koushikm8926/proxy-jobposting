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

  return (
    <div className={`proxy-logo-container ${className}`} style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 900,
          fontSize: isLarge ? '32px' : '23px',
          letterSpacing: '-0.03em',
          lineHeight: '1',
          color: isLight ? '#ffffff' : '#0c0d0e',
          display: 'flex',
          alignItems: 'center',
          userSelect: 'none'
        }}
      >
        <span>PRO</span>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <span style={{ color: isLight ? '#ffffff' : '#0c0d0e' }}>X</span>
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isLarge ? '5px' : '4px',
              height: isLarge ? '5px' : '4px',
              backgroundColor: isLight ? '#27272a' : '#d4d4d8',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
        </span>
        <span>Y</span>
      </div>
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: isLarge ? '10px' : '8px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'none',
          color: isLight ? '#a1a1aa' : '#52525b',
          marginTop: isLarge ? '4px' : '3px',
          whiteSpace: 'nowrap'
        }}
      >
        The Desire to Achieve
      </div>
    </div>
  )
}
