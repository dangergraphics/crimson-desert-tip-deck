import React, { useState, useEffect, useCallback } from 'react'
import TipCard from './TipCard'
import { cards, SUIT_ICONS } from './cards'

const TOTAL = cards.length
const CARD_SPREAD_X = 32 // px between card centers
const ROTATION_PER_CARD = 3 // degrees per position from center

const TipDeck: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(9)
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)

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
      {/* Fullscreen modal when a card is flipped */}
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
        const offsetX = offset * CARD_SPREAD_X
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
