import { useState, useEffect } from 'react'
import { useNotification } from '../contexts/NotificationContext'
import DocumentPreview from '../components/DocumentPreview'
import './Downloads.css'

function Downloads({ onNavigate, onEditDocument }) {
  const { showSuccess, showError, showInfo } = useNotification()
  const [downloads, setDownloads] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadDownloads()
    
    const handleDownloadHistoryUpdated = (event) => {
      const { downloads } = event.detail
      setDownloads(downloads)
    }

    window.addEventListener('downloadHistoryUpdated', handleDownloadHistoryUpdated)
    
    return () => {
      window.removeEventListener('downloadHistoryUpdated', handleDownloadHistoryUpdated)
    }
  }, [])

  const loadDownloads = () => {
    const saved = localStorage.getItem('download_history')
    
    if (saved) {
      const downloadHistory = JSON.parse(saved)
      setDownloads(downloadHistory)
    }
  }

  const handleDelete = (download) => {
    if (!confirm('Are you sure you want to remove this download record?')) return

    try {
      const updated = downloads.filter(d => d.id !== download.id)
      setDownloads(updated)
      localStorage.setItem('download_history', JSON.stringify(updated))
      showSuccess('Download record removed successfully')
    } catch (error) {
      console.error('Error deleting download record:', error)
      showError('Failed to remove download record. Please try again.')
    }
  }

  const handleEdit = (download) => {
    // Create a document object that matches the expected format for editors
    const documentForEditor = {
      id: download.originalDocumentId || download.id,
      name: download.documentTitle || download.name,
      documentTitle: download.documentTitle,
      type: download.type,
      template: download.template,
      // Flatten the data structure - editors expect data at top level, not in formData
      fullName: download.fullName,
      professionalTitle: download.professionalTitle,
      email: download.email,
      phone: download.phone,
      linkedin: download.linkedin || '',
      website: download.website || '',
      summary: download.summary,
      experience: download.experience || [],
      education: download.education || [],
      skills: download.skills || [],
      interests: download.interests || [],
      volunteer: download.volunteer || [],
      projects: download.projects || [],
      certifications: download.certifications || [],
      languages: download.languages || [],
      references: download.references || [],
      // Cover letter specific fields
      recipientName: download.recipientName,
      recipientTitle: download.recipientTitle,
      companyName: download.companyName,
      companyAddress: download.companyAddress,
      date: download.date,
      subject: download.subject,
      salutation: download.salutation,
      content: download.content,
      closing: download.closing,
      signature: download.signature,
      signatureStyle: download.signatureStyle,
      pages: download.pages || [{ 
        id: 1, 
        sections: download.type === 'resume' 
          ? ['header', 'summary', 'experience', 'education', 'skills'] 
          : ['header', 'recipient', 'content', 'signature']
      }],
      createdAt: download.downloadedAt,
      updatedAt: download.downloadedAt
    }
    
    // Call the onEditDocument callback to navigate to the appropriate editor
    onEditDocument(documentForEditor)
    showSuccess(`Opening ${download.type === 'resume' ? 'resume' : 'cover letter'} editor: ${download.documentTitle || download.name}`)
  }

  const filteredDownloads = downloads.filter(download => {
    const matchesSearch = (download.documentTitle || download.name)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         download.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         download.filename?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filter === 'all' || download.type === filter
    
    return matchesSearch && matchesFilter
  })

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getDownloadStats = () => {
    const resumes = downloads.filter(download => download.type === 'resume').length
    const coverLetters = downloads.filter(download => download.type === 'cover-letter').length
    return { resumes, coverLetters, total: downloads.length }
  }

  const stats = getDownloadStats()

  return (
    <div className="downloads-page">
      <div className="downloads-header">
       
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => onNavigate('history')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Back to History
          </button>
          <button className="btn-primary" onClick={() => onNavigate('builder')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            New Document
          </button>
        </div>
      </div>

      <div className="downloads-controls">
        <div className="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search downloads..."
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

      {filteredDownloads.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <h2>{searchTerm ? 'No downloads found' : 'No downloads yet'}</h2>
          <p>{searchTerm ? 'Try a different search term' : 'Download your first document to see it here'}</p>
          <button className="btn-primary" onClick={() => onNavigate('builder')}>
            Create Document
          </button>
        </div>
      ) : (
        <div className="documents-grid">
          {filteredDownloads.map(download => (
            <div key={download.id} className="document-card">
              <div className="document-preview-section">
                <DocumentPreview document={download} />
              </div>
              <div className="document-info">
                <h3>{download.documentTitle || download.name}</h3>
                <p className="document-meta">
                  {download.fullName && <span className="author-name">{download.fullName}</span>}
                  <span className="document-date">{formatDate(download.downloadedAt)}</span>
                </p>
                <div className="document-stats">
                  <span className={`doc-type ${download.type}`}>
                    {download.type === 'resume' ? 'Resume' : 'Cover Letter'}
                  </span>
                  <span className="template-name">{download.template || 'modern'}</span>
                  <span className="download-badge">Downloaded</span>
                </div>
              </div>
              <div className="document-actions">
                <button 
                  className="btn-icon btn-edit" 
                  onClick={() => handleEdit(download)} 
                  title="Edit Original"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <button 
                  className="btn-icon btn-danger" 
                  onClick={() => handleDelete(download)} 
                  title="Remove Record"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Downloads