import React from 'react'
import type { TipCard as TipCardType } from './cards'
import { SUIT_ART, SUIT_SVGS, SUIT_ICONS } from './cards'

interface TipCardProps {
  card: TipCardType
  isActive: boolean
  isFlipped: boolean
  rotation: number
  offsetX: number
  zIndex: number
  onClick: () => void
}

// Per-suit gradient overlays — dark at top/bottom, semi-transparent in middle
// so the art shows through but text is always legible
const SUIT_GRADIENTS: Record<TipCardType['suit'], string> = {
  combat:      'linear-gradient(180deg, rgba(10,2,0,0.82) 0%, rgba(18,5,0,0.45) 38%, rgba(18,5,0,0.55) 62%, rgba(10,2,0,0.92) 100%)',
  exploration: 'linear-gradient(180deg, rgba(0,8,18,0.85) 0%, rgba(0,10,22,0.42) 38%, rgba(0,10,22,0.52) 62%, rgba(0,6,14,0.93) 100%)',
  abyss:       'linear-gradient(180deg, rgba(8,0,18,0.88) 0%, rgba(12,0,25,0.48) 38%, rgba(12,0,25,0.58) 62%, rgba(6,0,14,0.94) 100%)',
  social:      'linear-gradient(180deg, rgba(10,6,0,0.84) 0%, rgba(18,10,0,0.44) 38%, rgba(18,10,0,0.54) 62%, rgba(10,6,0,0.92) 100%)',
}

// Per-suit accent colors for border + text highlights
const SUIT_ACCENTS: Record<TipCardType['suit'], { border: string; text: string; glow: string }> = {
  combat:      { border: '#C9A84C', text: '#C9A84C', glow: 'rgba(201,168,76,0.35)' },
  exploration: { border: '#7ABFCC', text: '#9ED4DC', glow: 'rgba(122,191,204,0.35)' },
  abyss:       { border: '#A070CC', text: '#C090EE', glow: 'rgba(160,112,204,0.40)' },
  social:      { border: '#C9844C', text: '#E0A870', glow: 'rgba(201,132,76,0.35)' },
}

const SuitIcon: React.FC<{ suit: TipCardType['suit']; size: number; color: string }> = ({ suit, size, color }) => (
  <span
    style={{ display: 'inline-block', width: size, height: size, color, flexShrink: 0 }}
    dangerouslySetInnerHTML={{ __html: SUIT_SVGS[suit] }}
    aria-label={SUIT_ICONS[suit]}
  />
)

const TipCard: React.FC<TipCardProps> = ({
  card,
  isActive,
  isFlipped,
  rotation,
  offsetX,
  zIndex,
  onClick,
}) => {
  const accent = SUIT_ACCENTS[card.suit]
  const artUrl = SUIT_ART[card.suit]
  const gradient = SUIT_GRADIENTS[card.suit]

  const wrapperStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: `calc(50% + ${offsetX}px - 110px)`,
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    zIndex,
    cursor: 'pointer',
    filter: isActive
      ? `drop-shadow(0 20px 40px rgba(0,0,0,0.9)) drop-shadow(0 0 20px ${accent.glow})`
      : 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
  }

  const arcStyle: React.CSSProperties = {
    width: 220,
    height: 320,
    transformOrigin: 'bottom center',
    transform: `rotate(${rotation}deg) translateY(${isActive ? -50 : 0}px) scale(${isActive ? 1.08 : 1})`,
    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  }

  const cardStyle: React.CSSProperties = {
    width: 220,
    height: 320,
    position: 'relative',
    transformStyle: 'preserve-3d' as const,
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  }

  return (
    <div style={wrapperStyle} onClick={onClick}>
      <div style={arcStyle}>
        <div style={cardStyle}>

          {/* ── FRONT FACE ── */}
          <div
            className="card-face card-front"
            style={{ border: `1.5px solid ${accent.border}` }}
          >
            {/* Full-bleed art background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 12,
              backgroundImage: `url(${artUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              zIndex: 0,
            }} />
            {/* Gradient overlay for legibility */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 12,
              background: gradient,
              zIndex: 1,
            }} />
            {/* Inner border chrome */}
            <div style={{
              position: 'absolute',
              inset: 6,
              borderRadius: 8,
              border: `1px solid ${accent.border}40`,
              zIndex: 2,
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              inset: 10,
              borderRadius: 6,
              border: `1px solid ${accent.border}18`,
              zIndex: 2,
              pointerEvents: 'none',
            }} />

            {/* Content layer */}
            <div style={{
              position: 'relative',
              zIndex: 3,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '18px 16px',
            }}>
              {/* Top row: corner TL icon + numeral */}
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <SuitIcon suit={card.suit} size={14} color={`${accent.text}66`} />
                <span className="card-numeral" style={{ color: accent.text }}>{card.numeral}</span>
              </div>

              {/* Center suit icon */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SuitIcon suit={card.suit} size={44} color={accent.text} />
              </div>

              {/* Title */}
              <div className="card-title" style={{ color: accent.text }}>{card.title}</div>

              {/* Ornament */}
              <div className="card-ornament" style={{ background: `linear-gradient(90deg, transparent, ${accent.border}60, transparent)` }} />

              {/* Subtitle */}
              <div className="card-subtitle">{card.subtitle}</div>
            </div>
          </div>

          {/* ── BACK FACE (read side) ── */}
          <div
            className="card-face card-back"
            style={{ border: `1.5px solid ${accent.border}` }}
          >
            {/* Art background, darker overlay on back */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 12,
              backgroundImage: `url(${artUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              zIndex: 0,
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 12,
              background: 'linear-gradient(160deg, rgba(240,220,160,0.90) 0%, rgba(230,210,150,0.93) 100%)',
              zIndex: 1,
            }} />
            <div style={{
              position: 'absolute',
              inset: 6,
              borderRadius: 8,
              border: '1px solid rgba(139,0,0,0.25)',
              zIndex: 2,
              pointerEvents: 'none',
            }} />

            {/* Back content */}
            <div style={{
              position: 'relative',
              zIndex: 3,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '18px 16px',
            }}>
              <div className="card-back-header">
                <SuitIcon suit={card.suit} size={18} color="#8B0000" />
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
