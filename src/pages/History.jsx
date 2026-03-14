import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNotification } from '../contexts/NotificationContext'
import { getUserDocuments, deleteDocument } from '../services/firestoreService'
import PDFExportButton from '../components/PDFExportButton'
import AuthModal from '../components/auth/AuthModal'
import DocumentPreview from '../components/DocumentPreview'
import '../components/PDFExportButton.css'
import './History.css'

function History({ onNavigate, onLoadDocument, onEditDocument }) {
  const { currentUser } = useAuth()
  const { showSuccess, showError, showWarning, showInfo } = useNotification()
  const [documents, setDocuments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [filter, setFilter] = useState('all') // 'all', 'resume', 'cover-letter'

  useEffect(() => {
    if (currentUser) {
      loadDocuments()
    } else {
      // Load from localStorage for non-authenticated users
      loadLocalDocuments()
    }

    // Listen for document save events
    const handleDocumentSaved = () => {
      if (currentUser) {
        loadDocuments()
      }
    }

    window.addEventListener('documentSaved', handleDocumentSaved)
    
    return () => {
      window.removeEventListener('documentSaved', handleDocumentSaved)
    }
  }, [currentUser])

  const loadDocuments = async () => {
    if (!currentUser) return
    
    try {
      setLoading(true)
      const userDocs = await getUserDocuments(currentUser.uid)
      setDocuments(userDocs)
      
      if (userDocs.length === 0) {
        showInfo('No documents found. Create your first document to get started!', 3000)
      }
    } catch (error) {
      console.error('Error loading documents:', error)
      
      // Provide more specific error messages
      if (error.code === 'failed-precondition' && error.message.includes('index')) {
        showWarning('Setting up database indexes. Documents loaded with basic sorting.', 4000)
        // The service now handles this automatically with fallback
      } else if (error.code === 'permission-denied') {
        showError('Access denied. Please check your authentication.')
      } else if (error.code === 'unavailable') {
        showError('Database temporarily unavailable. Please try again.')
      } else {
        showError('Failed to load documents. Please check your connection and try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const loadLocalDocuments = () => {
    const saved = localStorage.getItem('resume_documents')
    if (saved) {
      setDocuments(JSON.parse(saved))
    }
  }

  const handleDelete = async (doc) => {
    if (!confirm('Are you sure you want to delete this document?')) return

    try {
      if (currentUser) {
        // Delete from Firebase
        await deleteDocument(doc.id)
        setDocuments(prev => prev.filter(d => d.id !== doc.id))
        showSuccess('Document deleted successfully')
      } else {
        // Delete from localStorage
        const updated = documents.filter(d => d.id !== doc.id)
        setDocuments(updated)
        localStorage.setItem('resume_documents', JSON.stringify(updated))
        showSuccess('Document deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting document:', error)
      showError('Failed to delete document. Please try again.')
    }
  }

  const handleLoad = (doc) => {
    console.log('History: Loading document for editing:', doc); // Debug log
    
    // Use the new editor pages instead of the builder
    onEditDocument(doc)
    showSuccess(`Opening ${doc.type === 'resume' ? 'resume' : 'cover letter'} editor: ${doc.documentTitle || doc.name}`)
  }

  const handleAuthRequired = () => {
    setShowAuthModal(true)
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = (doc.documentTitle || doc.name)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filter === 'all' || doc.type === filter
    
    return matchesSearch && matchesFilter
  })

  const formatDate = (timestamp) => {
    let date
    if (timestamp?.toDate) {
      date = timestamp.toDate()
    } else if (timestamp) {
      date = new Date(timestamp)
    } else {
      date = new Date()
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getDocumentStats = () => {
    const resumes = documents.filter(doc => doc.type === 'resume').length
    const coverLetters = documents.filter(doc => doc.type === 'cover-letter').length
    return { resumes, coverLetters, total: documents.length }
  }

  const stats = getDocumentStats()

  return (
    <div className="history-page">
      <div className="history-header">
       
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => onNavigate('downloads')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            View Downloads
          </button>
          <button className="btn-primary" onClick={() => onNavigate('builder')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            New Document
          </button>
        </div>
      </div>

      {!currentUser && (
        <div className="auth-prompt">
          <div className="auth-prompt-content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h3>Sign in to save your documents</h3>
            <p>Create an account to save your resumes and cover letters to the cloud and access them from anywhere.</p>
            <button className="btn-primary" onClick={handleAuthRequired}>
              Sign In / Sign Up
            </button>
          </div>
        </div>
      )}

      <div className="history-controls">
        <div className="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({stats.total})
          </button>
          <button 
            className={`filter-tab ${filter === 'resume' ? 'active' : ''}`}
            onClick={() => setFilter('resume')}
          >
            Resumes ({stats.resumes})
          </button>
          <button 
            className={`filter-tab ${filter === 'cover-letter' ? 'active' : ''}`}
            onClick={() => setFilter('cover-letter')}
          >
            Cover Letters ({stats.coverLetters})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your documents...</p>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
            <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <h2>{searchTerm ? 'No documents found' : 'No saved documents'}</h2>
          <p>{searchTerm ? 'Try a different search term' : 'Create your first document to get started'}</p>
          <button className="btn-primary" onClick={() => onNavigate('builder')}>
            Create Document
          </button>
        </div>
      ) : (
        <div className="documents-grid">
          {filteredDocuments.map(doc => (
            <div key={doc.id} className="document-card">
              <div className="document-preview-section">
                <DocumentPreview document={doc} />
              </div>
              <div className="document-info">
                <h3>{doc.documentTitle || doc.name}</h3>
                <p className="document-meta">
                  {doc.fullName && <span className="author-name">{doc.fullName}</span>}
                  <span className="document-date">{formatDate(doc.updatedAt || doc.createdAt)}</span>
                </p>
                <div className="document-stats">
                  <span className={`doc-type ${doc.type}`}>
                    {doc.type === 'resume' ? 'Resume' : 'Cover Letter'}
                  </span>
                  <span className="template-name">{doc.template || 'modern'}</span>
                </div>
              </div>
              <div className="document-actions">
                <PDFExportButton 
                  formData={doc}
                  docType={doc.type}
                  pages={doc.pages || [{ id: 1, sections: ['header', 'summary', 'experience', 'education', 'skills'] }]}
                  className="btn-icon btn-pdf"
                  title="Download PDF"
                  isHistoryExport={true}
                  documentData={doc}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </PDFExportButton>
                <button className="btn-icon btn-edit" onClick={() => handleLoad(doc)} title="Edit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <button className="btn-icon btn-danger" onClick={() => handleDelete(doc)} title="Delete">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  )
}

export default History
