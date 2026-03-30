import TipDeck from './TipDeck'
import './styles.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <span className="app-title">CRIMSON DESERT</span>
        <span className="app-subtitle">Tip Deck</span>
      </header>
      <TipDeck />
      <div className="nav-hint">← → arrow keys to navigate · click active card to flip</div>
    </div>
  )
}

export default App
