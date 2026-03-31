import React, { useState, useEffect, useCallback } from 'react'
import TipCard from './TipCard'
import { cards, SUIT_ICONS, SUIT_ART, SUIT_SVGS } from './cards'

const TOTAL = cards.length

// ─── Arc layout math ──────────────────────────────────────────────────────────
// Cards are placed on a large circle whose center sits below the viewport.
// Each card's X, Y, and rotation are derived from its angle on that arc.
// The result is a natural hand-of-cards fan that scales with count + viewport.

interface ArcLayout {
  x: number     // horizontal offset from viewport center (px)
  y: number     // bottom offset from container baseline (px; negative = dips lower)
  angle: number // card tilt in degrees (matches its arc tangent)
}

function computeArcLayout(vw: number, vh: number, count: number): ArcLayout[] {
  // Larger radius = flatter arc. Scale off viewport height so it looks right on any screen.
  const R = Math.max(vh * 2, 1400)

  // Fan angle: grow with card count (5° each), cap at 72°, scale down on narrow viewports.
  const baseFan = Math.min(count * 5, 72)
  const vwFactor = Math.min(vw / 1100, 1) // full spread at 1100 px+
  const fanAngle = baseFan * Math.max(vwFactor, 0.45)

  return Array.from({ length: count }, (_, i) => {
    const t = count > 1 ? i / (count - 1) : 0.5
    const angleDeg = (t - 0.5) * fanAngle
    const rad = (angleDeg * Math.PI) / 180

    // Circle center is at (0, -R) below container baseline.
    // Card at angle θ: x = R·sin(θ),  y = R·(cos(θ) − 1)
    // y is 0 at center card and becomes negative at edges (they dip slightly).
    const x = R * Math.sin(rad)
    const y = R * (Math.cos(rad) - 1)

    return { x, y, angle: angleDeg }
  })
}

// ─────────────────────────────────────────────────────────────────────────────

const TipDeck: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(TOTAL / 2))
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight })

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  { setActiveIndex(i => Math.max(0, i - 1));          setFlippedIndex(null) }
    else if (e.key === 'ArrowRight') { setActiveIndex(i => Math.min(TOTAL - 1, i + 1)); setFlippedIndex(null) }
    else if (e.key === 'Escape') setFlippedIndex(null)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) { setActiveIndex(index); setFlippedIndex(null) }
    else setFlippedIndex(flippedIndex === index ? null : index)
  }

  const arcLayouts = computeArcLayout(viewport.w, viewport.h, TOTAL)
  const flippedCard = flippedIndex !== null ? cards[flippedIndex] : null

  return (
    <div className="deck-container">
      {flippedCard && (
        <>
          <div className="flip-backdrop" onClick={() => setFlippedIndex(null)} />
          <div className="flip-modal" onClick={() => setFlippedIndex(null)}>
            <div
              className="flip-modal-card"
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${SUIT_ART[flippedCard.suit]})`,
                backgroundSize: 'cover', backgroundPosition: 'center top',
                borderRadius: 16, zIndex: 0,
              }} />
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 16, zIndex: 1,
                background: 'linear-gradient(160deg, rgba(240,220,160,0.93) 0%, rgba(225,205,145,0.95) 100%)',
              }} />
              <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="flip-modal-header">
                  <span
                    className="flip-modal-suit"
                    style={{ display: 'inline-block', width: 22, height: 22, color: '#8B0000' }}
                    dangerouslySetInnerHTML={{ __html: SUIT_SVGS[flippedCard.suit] }}
                    aria-label={SUIT_ICONS[flippedCard.suit]}
                  />
                  <span className="flip-modal-title">{flippedCard.title}</span>
                  <span className="flip-modal-numeral">{flippedCard.numeral}</span>
                </div>
                <div className="card-ornament card-ornament-dark" />
                <p className="flip-modal-body">{flippedCard.body}</p>
                <div className="card-ornament card-ornament-dark" />
                <div className="flip-modal-close">tap anywhere to close · esc</div>
              </div>
            </div>
          </div>
        </>
      )}

      {cards.map((card, i) => {
        const { x, y, angle } = arcLayouts[i]
        // Leftmost card on top of stack; active card floats above all.
        const zIndex = i === activeIndex ? TOTAL + 1 : TOTAL - i

        return (
          <TipCard
            key={card.id}
            card={card}
            isActive={i === activeIndex}
            isFlipped={flippedIndex === i}
            arcX={x}
            arcY={y}
            angle={angle}
            zIndex={zIndex}
            onClick={() => handleCardClick(i)}
          />
        )
      })}
    </div>
  )
}

export default TipDeck
