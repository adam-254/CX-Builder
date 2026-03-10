import { useState, useEffect } from 'react'
import PDFExportButton from '../components/PDFExportButton'
import '../components/PDFExportButton.css'
import './History.css'

function History({ onNavigate, onLoadDocument }) {
  const [documents, setDocuments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = () => {
    const saved = localStorage.getItem('resume_documents')
    if (saved) {
      setDocuments(JSON.parse(saved))
    }
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this document?')) {
      const updated = documents.filter(doc => doc.id !== id)
      setDocuments(updated)
      localStorage.setItem('resume_documents', JSON.stringify(updated))
    }
  }

  const handleLoad = (doc) => {
    onLoadDocument(doc)
    onNavigate('builder')
  }

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.formData.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>Document History</h1>
        <button className="btn-primary" onClick={() => onNavigate('builder')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New Document
        </button>
      </div>

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

      {filteredDocuments.length === 0 ? (
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
              <div className="document-preview">
                <div className={`preview-badge ${doc.docType}`}>
                  {doc.docType === 'resume' ? 'Resume' : 'Cover Letter'}
                </div>
                <div className="preview-template">{doc.template}</div>
              </div>
              <div className="document-info">
                <h3>{doc.name}</h3>
                <p className="document-meta">
                  {doc.formData.fullName && <span>{doc.formData.fullName}</span>}
                  <span className="document-date">{formatDate(doc.savedAt)}</span>
                </p>
              </div>
              <div className="document-actions">
                <PDFExportButton 
                  formData={doc.formData}
                  docType={doc.docType}
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
                <button className="btn-icon" onClick={() => handleLoad(doc)} title="Edit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <button className="btn-icon btn-danger" onClick={() => handleDelete(doc.id)} title="Delete">
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

export default History
