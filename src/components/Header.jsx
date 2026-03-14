import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import UserProfile from './UserProfile'
import AuthModal from './auth/AuthModal'
import './Header.css'
import VisitorCounter from './VisitorCounter'

function Header({ onNavigate, currentPage }) {
  const { currentUser } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <header className="header">
      <div className="header-left">
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
        <button 
          className={`btn-secondary ${currentPage === 'downloads' ? 'active' : ''}`}
          onClick={() => onNavigate('downloads')}
        >
          Downloads
        </button>
        
        {currentUser ? (
          <UserProfile />
        ) : (
          <button 
            className="btn-auth"
            onClick={() => setShowAuthModal(true)}
          >
            Sign In
          </button>
        )}
      </div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </header>
  )
}

export default Header
