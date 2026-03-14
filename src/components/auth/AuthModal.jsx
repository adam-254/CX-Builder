import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSwitchMode = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 150);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
      setIsLogin(true); // Reset to login when closing
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={handleClose}>
      <div 
        className={`auth-modal ${isAnimating ? 'animating' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background decoration */}
        <div className="auth-modal-bg">
          <div className="auth-bg-circle circle-1"></div>
          <div className="auth-bg-circle circle-2"></div>
          <div className="auth-bg-circle circle-3"></div>
        </div>

        {/* Close button */}
        <button className="auth-modal-close" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Modal content */}
        <div className="auth-modal-content">
          {/* Header with logo */}
          <div className="auth-modal-header">
            <div className="auth-logo">
              <img src="/CX_logo.png" alt="CX Builder" />
              <span>CX Builder</span>
            </div>
          </div>

          {/* Auth forms */}
          <div className="auth-forms-container">
            {isLogin ? (
              <Login 
                onSwitchToSignup={handleSwitchMode}
                onClose={onClose}
              />
            ) : (
              <Signup 
                onSwitchToLogin={handleSwitchMode}
                onClose={onClose}
              />
            )}
          </div>

          {/* Footer */}
          <div className="auth-modal-footer">
            <p>Secure authentication powered by Firebase</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;