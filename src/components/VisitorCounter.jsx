import { useState, useEffect } from 'react'
import './VisitorCounter.css'

function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    // Initialize visitor count
    const initializeVisitorCount = () => {
      const today = new Date().toDateString()
      const lastVisit = localStorage.getItem('lastVisit')
      const currentCount = parseInt(localStorage.getItem('visitorCount') || '0')
      
      // Reset count daily or increment if new session
      if (lastVisit !== today) {
        localStorage.setItem('visitorCount', '1')
        localStorage.setItem('lastVisit', today)
        setVisitorCount(1)
      } else {
        // Check if this is a new session (no sessionStorage entry)
        if (!sessionStorage.getItem('currentSession')) {
          const newCount = currentCount + 1
          localStorage.setItem('visitorCount', newCount.toString())
          sessionStorage.setItem('currentSession', 'true')
          setVisitorCount(newCount)
        } else {
          setVisitorCount(currentCount)
        }
      }
    }

    // Simulate live updates (optional - adds some dynamism)
    const simulateLiveUpdates = () => {
      const interval = setInterval(() => {
        // Small chance to increment (simulating other visitors)
        if (Math.random() < 0.15) { // 15% chance every 25 seconds
          setVisitorCount(prev => {
            const newCount = prev + Math.floor(Math.random() * 2) + 1
            localStorage.setItem('visitorCount', newCount.toString())
            return newCount
          })
        }
      }, 25000) // Every 25 seconds

      return interval
    }

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    initializeVisitorCount()
    const interval = simulateLiveUpdates()

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      clearInterval(interval)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className="visitor-counter-btn">
      <div className="visitor-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path 
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" 
            fill="currentColor"
          />
        </svg>
        <div className={`live-dot ${isOnline ? 'online' : 'offline'}`}></div>
      </div>
      <div className="visitor-info">
        <span className="visitor-number">{visitorCount.toLocaleString()}</span>
        <span className="visitor-label">Live</span>
      </div>
    </div>
  )
}

export default VisitorCounter