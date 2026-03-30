import React, { useRef, useCallback } from 'react'
import type { TipCard as TipCardType } from './cards'
import { SUIT_ICONS } from './cards'

interface TipCardProps {
  card: TipCardType
  isActive: boolean
  isFlipped: boolean
  rotation: number
  offsetX: number
  zIndex: number
  onClick: () => void
}

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}

const TipCard: React.FC<TipCardProps> = ({
  card,
  isActive,
  isFlipped,
  rotation,
  offsetX,
  zIndex,
  onClick,
}) => {
  const frontRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = frontRef.current
    if (!el || !isActive) return
    const rect = el.getBoundingClientRect()
    const x = clamp((e.clientX - rect.left) / rect.width  * 100, 0, 100)
    const y = clamp((e.clientY - rect.top)  / rect.height * 100, 0, 100)
    const fromCenter = clamp(
      Math.sqrt(Math.pow(y - 50, 2) + Math.pow(x - 50, 2)) / 50, 0, 1
    )
    const rx = clamp((y - 50) / 6, -8, 8)
    const ry = clamp((x - 50) / 4, -12, 12)

    el.style.setProperty('--pointer-x', `${x}%`)
    el.style.setProperty('--pointer-y', `${y}%`)
    el.style.setProperty('--pointer-from-center', `${fromCenter}`)
    el.style.setProperty('--pointer-from-top',    `${y / 100}`)
    el.style.setProperty('--pointer-from-left',   `${x / 100}`)
    el.style.setProperty('--background-x',        `${x}%`)
    el.style.setProperty('--background-y',        `${y}%`)
    el.style.setProperty('--rotate-x',            `${-rx}deg`)
    el.style.setProperty('--rotate-y',            `${ry}deg`)
    el.style.setProperty('--card-opacity',        '1')
  }, [isActive])

  const handleMouseLeave = useCallback(() => {
    const el = frontRef.current
    if (!el) return
    el.style.setProperty('--card-opacity', '0')
    el.style.setProperty('--rotate-x', '0deg')
    el.style.setProperty('--rotate-y', '0deg')
  }, [])

  const wrapperStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: `calc(50% + ${offsetX}px - 110px)`,
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    zIndex,
    cursor: 'pointer',
    filter: isActive
      ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.9)) drop-shadow(0 0 20px rgba(201,168,76,0.25))'
      : 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
  }

  const arcStyle: React.CSSProperties = {
    width: 220,
    height: 320,
    transformOrigin: 'bottom center',
    transform: `rotate(${rotation}deg) translateY(${isActive ? -50 : 0}px) scale(${isActive ? 1.08 : 1})`,
    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  }

  const flipContainerStyle: React.CSSProperties = {
    width: 220,
    height: 320,
  }

  const cardStyle: React.CSSProperties = {
    width: 220,
    height: 320,
    position: 'relative',
    transformStyle: 'preserve-3d' as const,
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  }

  const suitIcon = SUIT_ICONS[card.suit]

  return (
    <div style={wrapperStyle} onClick={onClick}>
      <div style={arcStyle}>
      <div style={flipContainerStyle}>
      <div style={cardStyle}>

        {/* Front Face */}
        <div
          ref={frontRef}
          className={`card-face card-front suit-${card.suit}${isActive ? ' holo-active' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Holographic shine + glare layers */}
          <div className="card-shine" />
          <div className="card-glare" />

          <div className="card-numeral">{card.numeral}</div>
          <div className="card-suit-icon">{suitIcon}</div>
          <div className="card-title">{card.title}</div>
          <div className="card-ornament" />
          <div className="card-subtitle">{card.subtitle}</div>
          <div className="card-corner-tl">{suitIcon}</div>
        </div>

        {/* Back Face */}
        <div className="card-face card-back">
          <div className="card-back-header">
            <span className="card-back-suit">{suitIcon}</span>
            <span className="card-back-title">{card.title}</span>
          </div>
          <div className="card-ornament card-ornament-dark" />
          <div className="card-body-text">{card.body}</div>
          <div className="card-ornament card-ornament-dark" />
          <div className="card-back-numeral">{card.numeral}</div>
        </div>

      </div>
      </div>
      </div>
    </div>
  )
}

export default TipCard
