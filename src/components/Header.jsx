import './Header.css'
import VisitorCounter from './VisitorCounter'

function Header({ onMenuToggle, onNavigate, currentPage }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <img src="/CX_logo.png" alt="CX Logo" className="logo" />
        <h1>CX Builder</h1>
      </div>
      <div className="header-right">
        <VisitorCounter />
        <button 
          className={`btn-primary ${currentPage === 'builder' ? 'active' : ''}`}
          onClick={() => onNavigate('builder')}
        >
          Builder
        </button>
        <button 
          className={`btn-secondary ${currentPage === 'history' ? 'active' : ''}`}
          onClick={() => onNavigate('history')}
        >
          History
        </button>
      </div>
    </header>
  )
}

export default Header
