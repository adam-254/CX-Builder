import { useState, useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import Builder from './pages/Builder'
import History from './pages/History'
import Downloads from './pages/Downloads'
import ResumeEditor from './pages/ResumeEditor'
import CoverLetterEditor from './pages/CoverLetterEditor'
import Header from './components/Header'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('builder')
  const [loadedDocument, setLoadedDocument] = useState(null)
  const [editingDocument, setEditingDocument] = useState(null)

  // Track page navigation for analytics
  useEffect(() => {
    // Track page view when component mounts or page changes
    const trackPageView = () => {
      const totalPageViews = parseInt(localStorage.getItem('totalPageViews') || '0') + 1
      localStorage.setItem('totalPageViews', totalPageViews.toString())
      
      // Dispatch custom event to notify VisitorCounter
      window.dispatchEvent(new CustomEvent('pageViewUpdate', { 
        detail: { totalViews: totalPageViews, page: currentPage }
      }))
    }

    trackPageView()
  }, [currentPage])

  // Global download tracking - works regardless of current page
  useEffect(() => {
    console.log('App: Setting up global download tracking listener') // Debug log
    
    const handleDocumentDownloaded = (event) => {
      console.log('App: Global download event received:', event.detail) // Debug log
      const { documentData, filename, downloadedAt } = event.detail
      
      // Create download record
      const downloadRecord = {
        id: `download_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        originalDocumentId: documentData.id || null,
        documentTitle: documentData.documentTitle,
        name: documentData.documentTitle || documentData.name || filename || 'Untitled Document',
        filename: filename,
        type: documentData.type || (filename.includes('resume') ? 'resume' : 'cover-letter'),
        template: documentData.template || 'modern',
        downloadedAt: downloadedAt || new Date().toISOString(),
        fullName: documentData.fullName || '',
        professionalTitle: documentData.professionalTitle || '',
        email: documentData.email || '',
        phone: documentData.phone || '',
        summary: documentData.summary || '',
        experience: documentData.experience || [],
        education: documentData.education || [],
        skills: documentData.skills || [],
        recipientName: documentData.recipientName || '',
        companyName: documentData.companyName || '',
        content: documentData.content || '',
        pages: documentData.pages || []
      }

      console.log('App: Created download record:', downloadRecord) // Debug log

      // Save to localStorage
      const currentDownloads = JSON.parse(localStorage.getItem('download_history') || '[]')
      const updatedDownloads = [downloadRecord, ...currentDownloads]
      const limitedDownloads = updatedDownloads.slice(0, 50)
      
      localStorage.setItem('download_history', JSON.stringify(limitedDownloads))
      console.log('App: Saved download to localStorage, total downloads:', limitedDownloads.length) // Debug log
      
      // Dispatch event to notify Downloads page if it's mounted
      window.dispatchEvent(new CustomEvent('downloadHistoryUpdated', {
        detail: { downloads: limitedDownloads }
      }))
    }

    window.addEventListener('documentDownloaded', handleDocumentDownloaded)
    console.log('App: Global download listener added') // Debug log
    
    return () => {
      console.log('App: Removing global download listener') // Debug log
      window.removeEventListener('documentDownloaded', handleDocumentDownloaded)
    }
  }, [])

  const handleNavigate = (page) => {
    setCurrentPage(page)
    if (page === 'builder' && !loadedDocument) {
      // Reset to new document
      setLoadedDocument(null)
    }
  }

  const handleLoadDocument = (doc) => {
    console.log('App: Loading document:', doc); // Debug log
    setLoadedDocument(doc)
    // Force a re-render by updating the key
    setCurrentPage('builder')
  }

  const handleEditDocument = (doc) => {
    console.log('App: Editing document:', doc); // Debug log
    setEditingDocument(doc)
    if (doc.type === 'resume') {
      setCurrentPage('resume-editor')
    } else if (doc.type === 'cover-letter') {
      setCurrentPage('cover-letter-editor')
    }
  }

  const handleCloseEditor = () => {
    setEditingDocument(null)
    setCurrentPage('history')
  }

  return (
    <AuthProvider>
      <NotificationProvider>
        <div className="app">
          {!['resume-editor', 'cover-letter-editor'].includes(currentPage) && (
            <Header 
              onNavigate={handleNavigate} 
              currentPage={currentPage}
            />
          )}
          {currentPage === 'builder' ? (
            <Builder 
              key={loadedDocument?.id || 'new-builder'} // Force re-render when document changes
              loadedDocument={loadedDocument}
              onClearDocument={() => setLoadedDocument(null)}
            />
          ) : currentPage === 'resume-editor' ? (
            <ResumeEditor 
              document={editingDocument}
              onNavigate={handleNavigate}
              onClose={handleCloseEditor}
            />
          ) : currentPage === 'cover-letter-editor' ? (
            <CoverLetterEditor 
              document={editingDocument}
              onNavigate={handleNavigate}
              onClose={handleCloseEditor}
            />
          ) : currentPage === 'downloads' ? (
            <Downloads 
              onNavigate={handleNavigate}
              onEditDocument={handleEditDocument}
            />
          ) : (
            <History 
              onNavigate={handleNavigate}
              onLoadDocument={handleLoadDocument}
              onEditDocument={handleEditDocument}
            />
          )}
        </div>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
