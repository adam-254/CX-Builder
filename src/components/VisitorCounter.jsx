import { useState, useEffect } from 'react'
import './VisitorCounter.css'

function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0)
  const [pageViews, setPageViews] = useState(0)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showPageViews, setShowPageViews] = useState(false)

  useEffect(() => {
    // Track page visits and unique visitors
    const trackVisit = () => {
      // Get or initialize total page views (all time)
      const totalPageViews = parseInt(localStorage.getItem('totalPageViews') || '0') + 1
      localStorage.setItem('totalPageViews', totalPageViews.toString())
      setPageViews(totalPageViews)

      // Track unique visitors (daily reset)
      const today = new Date().toDateString()
      const lastVisitDate = localStorage.getItem('lastVisitDate')
      const uniqueVisitors = parseInt(localStorage.getItem('uniqueVisitors') || '0')

      if (lastVisitDate !== today) {
        // New day - reset unique visitors and count this as visitor #1
        localStorage.setItem('uniqueVisitors', '1')
        localStorage.setItem('lastVisitDate', today)
        setVisitorCount(1)
      } else {
        // Same day - check if this is a new session
        const sessionKey = `session_${today}`
        if (!sessionStorage.getItem(sessionKey)) {
          // New session - increment unique visitors
          const newUniqueVisitors = uniqueVisitors + 1
          localStorage.setItem('uniqueVisitors', newUniqueVisitors.toString())
          sessionStorage.setItem(sessionKey, 'true')
          setVisitorCount(newUniqueVisitors)
        } else {
          // Returning in same session - don't increment unique visitors
          setVisitorCount(uniqueVisitors)
        }
      }
    }

    // Handle page view updates from navigation
    const handlePageViewUpdate = (event) => {
      setPageViews(event.detail.totalViews)
    }

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Handle visibility change (tab focus/blur)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Tab became visible - refresh counts
        const currentPageViews = parseInt(localStorage.getItem('totalPageViews') || '0')
        const currentVisitors = parseInt(localStorage.getItem('uniqueVisitors') || '0')
        setPageViews(currentPageViews)
        setVisitorCount(currentVisitors)
      }
    }

    // Initialize tracking
    trackVisit()

    // Set up event listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('pageViewUpdate', handlePageViewUpdate)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Toggle between showing visitors and page views every 4 seconds
    const toggleInterval = setInterval(() => {
      setShowPageViews(prev => !prev)
    }, 4000)

    return () => {
      clearInterval(toggleInterval)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('pageViewUpdate', handlePageViewUpdate)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <div className="visitor-counter-btn">
      <div className="visitor-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          {showPageViews ? (
            // Eye icon for page views
            <path 
              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" 
              fill="currentColor"
            />
          ) : (
            // User icon for visitors
            <path 
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" 
              fill="currentColor"
            />
          )}
        </svg>
        <div className={`live-dot ${isOnline ? 'online' : 'offline'}`}></div>
      </div>
      <div className="visitor-info">
        <span className="visitor-number">
          {showPageViews ? pageViews.toLocaleString() : visitorCount.toLocaleString()}
        </span>
        <span className="visitor-label">
          {showPageViews ? 'Views' : 'Visitors'}
        </span>
      </div>
    </div>
  )
}

export default VisitorCounter