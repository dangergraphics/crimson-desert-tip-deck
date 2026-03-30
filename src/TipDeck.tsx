import React, { useState, useEffect, useCallback } from 'react'
import TipCard from './TipCard'
import { cards, SUIT_ICONS } from './cards'

const TOTAL = cards.length
const ROTATION_PER_CARD = 3 // degrees per position from center
const CARD_WIDTH = 220
// How much of the viewport width the fan should occupy (leave some margin)
const FAN_FILL = 0.92

function getSpread(viewportWidth: number) {
  // Spread cards so the full fan fills FAN_FILL of the viewport
  // Total fan width = (TOTAL - 1) * spread + CARD_WIDTH
  // Solve: spread = (viewportWidth * FAN_FILL - CARD_WIDTH) / (TOTAL - 1)
  const spread = (viewportWidth * FAN_FILL - CARD_WIDTH) / (TOTAL - 1)
  // Clamp: don't overlap too much on small screens, don't spread too wide
  return Math.max(16, Math.min(spread, 80))
}

const TipDeck: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(9)
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [cardSpread, setCardSpread] = useState(() => getSpread(window.innerWidth))

  useEffect(() => {
    const handleResize = () => setCardSpread(getSpread(window.innerWidth))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((i) => Math.max(0, i - 1))
        setFlippedIndex(null)
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((i) => Math.min(TOTAL - 1, i + 1))
        setFlippedIndex(null)
      } else if (e.key === 'Escape') {
        setFlippedIndex(null)
      }
    },
    []
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
      setFlippedIndex(null)
    } else {
      setFlippedIndex(flippedIndex === index ? null : index)
    }
  }

  const flippedCard = flippedIndex !== null ? cards[flippedIndex] : null

  return (
    <div className="deck-container">
      {flippedCard && (
        <>
          <div className="flip-backdrop" onClick={() => setFlippedIndex(null)} />
          <div className="flip-modal" onClick={() => setFlippedIndex(null)}>
            <div className="flip-modal-card" onClick={e => e.stopPropagation()}>
              <div className="flip-modal-header">
                <span className="flip-modal-suit">{SUIT_ICONS[flippedCard.suit]}</span>
                <span className="flip-modal-title">{flippedCard.title}</span>
                <span className="flip-modal-numeral">{flippedCard.numeral}</span>
              </div>
              <div className="card-ornament card-ornament-dark" />
              <p className="flip-modal-body">{flippedCard.body}</p>
              <div className="card-ornament card-ornament-dark" />
              <div className="flip-modal-close">tap anywhere to close · esc</div>
            </div>
          </div>
        </>
      )}

      {cards.map((card, i) => {
        const offset = i - activeIndex
        const rotation = offset * ROTATION_PER_CARD
        const offsetX = offset * cardSpread
        const zIndex = TOTAL - Math.abs(offset)

        return (
          <TipCard
            key={card.id}
            card={card}
            isActive={i === activeIndex}
            isFlipped={flippedIndex === i}
            rotation={rotation}
            offsetX={offsetX}
            zIndex={zIndex}
            onClick={() => handleCardClick(i)}
          />
        )
      })}
    </div>
  )
}

export default TipDeck
