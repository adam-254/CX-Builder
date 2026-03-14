import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNotification } from '../contexts/NotificationContext'
import { updateDocument } from '../services/firestoreService'
import Sidebar from '../components/Sidebar'
import Preview from '../components/Preview'
import Modal from '../components/Modal'
import PageSectionManager from '../components/PageSectionManager'
import './CoverLetterEditor.css'

function CoverLetterEditor({ document, onNavigate, onClose }) {
  const { currentUser } = useAuth()
  const { showSuccess, showError } = useNotification()
  
  const [formData, setFormData] = useState({
    documentTitle: '',
    professionalTitle: '',
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    // Cover letter specific fields
    recipientName: '',
    recipientTitle: '',
    companyName: '',
    companyAddress: '',
    date: '',
    subject: '',
    salutation: 'Dear Hiring Manager,',
    content: '',
    closing: 'Sincerely,',
    signature: '',
    signatureStyle: 'simple'
  })
  
  const [template, setTemplate] = useState('modern')
  const [showSectionManager, setShowSectionManager] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false) // Start with sidebar closed
  const [pages, setPages] = useState([
    { 
      id: 1, 
      sections: ['header', 'recipient', 'content', 'signature']
    }
  ])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Load document data on mount
  useEffect(() => {
    if (document) {
      setFormData({
        documentTitle: document.documentTitle || document.name || '',
        professionalTitle: document.professionalTitle || '',
        fullName: document.fullName || '',
        email: document.email || '',
        phone: document.phone || '',
        linkedin: document.linkedin || '',
        website: document.website || '',
        recipientName: document.recipientName || '',
        recipientTitle: document.recipientTitle || '',
        companyName: document.companyName || '',
        companyAddress: document.companyAddress || '',
        date: document.date || '',
        subject: document.subject || '',
        salutation: document.salutation || 'Dear Hiring Manager,',
        content: document.content || '',
        closing: document.closing || 'Sincerely,',
        signature: document.signature || '',
        signatureStyle: document.signatureStyle || 'simple'
      })
      
      setTemplate(document.template || 'modern')
      setPages(document.pages || [{ 
        id: 1, 
        sections: ['header', 'recipient', 'content', 'signature']
      }])
    }
  }, [document])

  // Track changes
  useEffect(() => {
    setHasUnsavedChanges(true)
  }, [formData, template, pages])

  const handleSave = async () => {
    if (!document?.id) {
      showError('Document ID not found')
      return
    }

    try {
      const documentData = {
        name: formData.documentTitle || document.name,
        type: 'cover-letter',
        template,
        pages,
        ...formData,
        updatedAt: new Date()
      }

      if (currentUser) {
        await updateDocument(document.id, documentData)
        showSuccess('Cover letter saved successfully!')
      } else {
        // Update localStorage for non-authenticated users
        const saved = JSON.parse(localStorage.getItem('resume_documents') || '[]')
        const index = saved.findIndex(doc => doc.id === document.id)
        if (index !== -1) {
          saved[index] = { ...saved[index], ...documentData }
          localStorage.setItem('resume_documents', JSON.stringify(saved))
          showSuccess('Cover letter saved locally!')
        }
      }
      
      setHasUnsavedChanges(false)
      
      // Dispatch event to refresh history
      window.dispatchEvent(new CustomEvent('documentSaved'))
      
    } catch (error) {
      console.error('Error saving document:', error)
      showError('Failed to save cover letter. Please try again.')
    }
  }

  const handleAddPage = () => {
    const newPage = {
      id: Date.now(),
      sections: []
    }
    setPages([...pages, newPage])
  }

  const handleDeletePage = (pageId) => {
    if (pages.length > 1) {
      setPages(pages.filter(page => page.id !== pageId))
    }
  }

  const handleUpdatePageSections = (pageId, sections) => {
    setPages(pages.map(page => 
      page.id === pageId ? { ...page, sections } : page
    ))
  }

  const handleClose = () => {
    if (hasUnsavedChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        onClose()
      }
    } else {
      onClose()
    }
  }

  return (
    <div className="cover-letter-editor">
      <div className="editor-header">
        <div className="editor-title">
          <button className="btn-back" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <h1>Edit Cover Letter</h1>
            <p>{document?.name || 'Untitled Cover Letter'}</p>
          </div>
        </div>
        <div className="editor-actions">
          <button 
            className="btn-toggle-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Edit
          </button>
          <button 
            className={`btn-save ${hasUnsavedChanges ? 'has-changes' : ''}`}
            onClick={handleSave}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2"/>
              <polyline points="17 21v-8H7v8" stroke="currentColor" strokeWidth="2"/>
              <polyline points="7 3v5h8" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {hasUnsavedChanges ? 'Save Changes' : 'Saved'}
          </button>
        </div>
      </div>

      <div className="editor-content">
        <Sidebar
          formData={formData}
          setFormData={setFormData}
          template={template}
          setTemplate={setTemplate}
          docType="cover-letter"
          setDocType={() => {}} // Cover letter editor only handles cover letters
          onOpenModal={() => {}} // Cover letters don't use modals for data entry
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <Preview
          formData={formData}
          template={template}
          docType="cover-letter"
          onSave={handleSave}
          documentId={document?.id}
          isEditorMode={true}
          pages={pages}
          onAddPage={handleAddPage}
          onDeletePage={handleDeletePage}
          onManageSections={() => setShowSectionManager(true)}
        />
      </div>

      {showSectionManager && (
        <>
          <div className="modal-overlay" onClick={() => setShowSectionManager(false)} />
          <PageSectionManager
            pages={pages}
            onUpdatePageSections={handleUpdatePageSections}
            onClose={() => setShowSectionManager(false)}
          />
        </>
      )}
    </div>
  )
}

export default CoverLetterEditor