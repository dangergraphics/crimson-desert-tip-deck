import React from 'react'
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

const TipCard: React.FC<TipCardProps> = ({
  card,
  isActive,
  isFlipped,
  rotation,
  offsetX,
  zIndex,
  onClick,
}) => {
  const wrapperStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transformOrigin: 'bottom center',
    transform: `
      translateX(calc(-50% + ${offsetX}px))
      rotate(${rotation}deg)
      translateY(${isActive ? -50 : 0}px)
      scale(${isActive ? 1.08 : 1})
    `,
    zIndex,
    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer',
  }

  const cardStyle: React.CSSProperties = {
    width: 220,
    height: 320,
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s ease',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    filter: isActive
      ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.9)) drop-shadow(0 0 20px rgba(201,168,76,0.25))'
      : 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
  }

  const suitIcon = SUIT_ICONS[card.suit]

  return (
    <div style={wrapperStyle} onClick={onClick}>
      <div style={cardStyle}>
        {/* Front Face */}
        <div className="card-face card-front">
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
  )
}

export default TipCard
