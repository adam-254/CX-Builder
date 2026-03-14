import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './UserProfile.css';

function UserProfile() {
  const { currentUser, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (!currentUser) return null;

  const displayName = currentUser.displayName || currentUser.email;
  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="user-profile">
      <button 
        className="user-profile-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {currentUser.photoURL ? (
          <img 
            src={currentUser.photoURL} 
            alt="Profile" 
            className="user-avatar"
          />
        ) : (
          <div className="user-avatar-placeholder">
            {initials}
          </div>
        )}
        <span className="user-name">{displayName}</span>
        <svg 
          className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </button>

      {showDropdown && (
        <div className="user-dropdown">
          <div className="user-info">
            <div className="user-email">{currentUser.email}</div>
          </div>
          <hr />
          <button 
            className="dropdown-item logout"
            onClick={handleLogout}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;