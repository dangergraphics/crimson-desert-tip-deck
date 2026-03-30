import TipDeck from './TipDeck'
import './styles.css'
import './holo.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src="/assets/logo.png" alt="Crimson Desert" className="app-logo" />
        <span className="app-subtitle">Tip Deck</span>
      </header>
      <TipDeck />
      <div className="nav-hint">← → arrow keys to navigate · click active card to flip</div>
    </div>
  )
}

export default App
