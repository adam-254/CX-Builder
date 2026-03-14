import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNotification } from '../contexts/NotificationContext'
import { updateDocument } from '../services/firestoreService'
import Sidebar from '../components/Sidebar'
import Preview from '../components/Preview'
import Modal from '../components/Modal'
import PageSectionManager from '../components/PageSectionManager'
import ExperienceModal from '../components/modals/ExperienceModal'
import EducationModal from '../components/modals/EducationModal'
import SkillsModal from '../components/modals/SkillsModal'
import InterestsModal from '../components/modals/InterestsModal'
import VolunteerModal from '../components/modals/VolunteerModal'
import ProjectModal from '../components/modals/ProjectModal'
import CertificationModal from '../components/modals/CertificationModal'
import LanguageModal from '../components/modals/LanguageModal'
import ReferenceModal from '../components/modals/ReferenceModal'
import './ResumeEditor.css'

function ResumeEditor({ document, onNavigate, onClose }) {
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
    summary: '',
    experience: [],
    education: [],
    skills: [],
    interests: [],
    volunteer: [],
    projects: [],
    certifications: [],
    languages: [],
    references: []
  })
  
  const [template, setTemplate] = useState('modern')
  const [activeModal, setActiveModal] = useState(null)
  const [editingIndex, setEditingIndex] = useState(null)
  const [showSectionManager, setShowSectionManager] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false) // Start with sidebar closed
  const [pages, setPages] = useState([
    { 
      id: 1, 
      sections: ['header', 'summary', 'experience', 'education', 'skills']
    }
  ])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Load document data on mount
  useEffect(() => {
    if (document) {
      console.log('ResumeEditor: Loading document:', document)
      
      setFormData({
        documentTitle: document.documentTitle || document.name || '',
        professionalTitle: document.professionalTitle || '',
        fullName: document.fullName || '',
        email: document.email || '',
        phone: document.phone || '',
        linkedin: document.linkedin || '',
        website: document.website || '',
        summary: document.summary || '',
        experience: Array.isArray(document.experience) ? document.experience : [],
        education: Array.isArray(document.education) ? document.education : [],
        skills: Array.isArray(document.skills) ? document.skills : [],
        interests: Array.isArray(document.interests) ? document.interests : [],
        volunteer: Array.isArray(document.volunteer) ? document.volunteer : [],
        projects: Array.isArray(document.projects) ? document.projects : [],
        certifications: Array.isArray(document.certifications) ? document.certifications : [],
        languages: Array.isArray(document.languages) ? document.languages : [],
        references: Array.isArray(document.references) ? document.references : []
      })
      
      setTemplate(document.template || 'modern')
      setPages(document.pages || [{ 
        id: 1, 
        sections: ['header', 'summary', 'experience', 'education', 'skills']
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
        type: 'resume',
        template,
        pages,
        ...formData,
        updatedAt: new Date()
      }

      if (currentUser) {
        await updateDocument(document.id, documentData)
        showSuccess('Resume saved successfully!')
      } else {
        // Update localStorage for non-authenticated users
        const saved = JSON.parse(localStorage.getItem('resume_documents') || '[]')
        const index = saved.findIndex(doc => doc.id === document.id)
        if (index !== -1) {
          saved[index] = { ...saved[index], ...documentData }
          localStorage.setItem('resume_documents', JSON.stringify(saved))
          showSuccess('Resume saved locally!')
        }
      }
      
      setHasUnsavedChanges(false)
      
      // Dispatch event to refresh history
      window.dispatchEvent(new CustomEvent('documentSaved'))
      
    } catch (error) {
      console.error('Error saving document:', error)
      showError('Failed to save resume. Please try again.')
    }
  }

  const handleOpenModal = (modalType, index = null) => {
    setActiveModal(modalType)
    setEditingIndex(index)
  }

  const handleCloseModal = () => {
    setActiveModal(null)
    setEditingIndex(null)
  }

  const handleSaveData = (section, data) => {
    if (editingIndex !== null) {
      const updatedArray = [...formData[section]]
      updatedArray[editingIndex] = data
      setFormData({
        ...formData,
        [section]: updatedArray
      })
    } else {
      setFormData({
        ...formData,
        [section]: [...formData[section], data]
      })
    }
  }

  const getEditData = (section) => {
    if (editingIndex !== null && formData[section]) {
      return formData[section][editingIndex]
    }
    return null
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

  const renderModal = () => {
    const modalProps = {
      onClose: handleCloseModal
    }

    switch (activeModal) {
      case 'experience':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title={editingIndex !== null ? "Edit Experience" : "Add Experience"}>
            <ExperienceModal {...modalProps} onSave={(data) => handleSaveData('experience', data)} initialData={getEditData('experience')} />
          </Modal>
        )
      case 'education':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title={editingIndex !== null ? "Edit Education" : "Add Education"}>
            <EducationModal {...modalProps} onSave={(data) => handleSaveData('education', data)} initialData={getEditData('education')} />
          </Modal>
        )
      case 'skills':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title={editingIndex !== null ? "Edit Skills" : "Add Skills"}>
            <SkillsModal {...modalProps} onSave={(data) => handleSaveData('skills', data)} initialData={getEditData('skills')} />
          </Modal>
        )
      case 'interests':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title={editingIndex !== null ? "Edit Interests" : "Add Interests"}>
            <InterestsModal {...modalProps} onSave={(data) => handleSaveData('interests', data)} initialData={getEditData('interests')} />
          </Modal>
        )
      case 'volunteer':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title={editingIndex !== null ? "Edit Volunteer Experience" : "Add Volunteer Experience"}>
            <VolunteerModal {...modalProps} onSave={(data) => handleSaveData('volunteer', data)} initialData={getEditData('volunteer')} />
          </Modal>
        )
      case 'project':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title={editingIndex !== null ? "Edit Project" : "Add Project"}>
            <ProjectModal {...modalProps} onSave={(data) => handleSaveData('projects', data)} initialData={getEditData('projects')} />
          </Modal>
        )
      case 'certification':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title={editingIndex !== null ? "Edit Certification" : "Add Certification"}>
            <CertificationModal {...modalProps} onSave={(data) => handleSaveData('certifications', data)} initialData={getEditData('certifications')} />
          </Modal>
        )
      case 'language':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title={editingIndex !== null ? "Edit Language" : "Add Language"}>
            <LanguageModal {...modalProps} onSave={(data) => handleSaveData('languages', data)} initialData={getEditData('languages')} />
          </Modal>
        )
      case 'reference':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title={editingIndex !== null ? "Edit Reference" : "Add Reference"}>
            <ReferenceModal {...modalProps} onSave={(data) => handleSaveData('references', data)} initialData={getEditData('references')} />
          </Modal>
        )
      default:
        return null
    }
  }

  return (
    <div className="resume-editor">
      <div className="editor-header">
        <div className="editor-title">
          <button className="btn-back" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <h1>Edit Resume</h1>
            <p>{document?.name || 'Untitled Resume'}</p>
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
          docType="resume"
          setDocType={() => {}} // Resume editor only handles resumes
          onOpenModal={handleOpenModal}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <Preview
          formData={formData}
          template={template}
          docType="resume"
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
      {renderModal()}
    </div>
  )
}

export default ResumeEditor