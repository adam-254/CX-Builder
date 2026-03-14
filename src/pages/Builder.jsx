import { useState, useEffect } from 'react'
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
import { exportToPDF } from '../utils/pdfExport'
import './Builder.css'

function Builder({ loadedDocument, onClearDocument }) {
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
    references: [],
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
  const [docType, setDocType] = useState('resume')
  const [activeModal, setActiveModal] = useState(null)
  const [editingIndex, setEditingIndex] = useState(null)
  const [showSectionManager, setShowSectionManager] = useState(false)
  const [isLoadingDocument, setIsLoadingDocument] = useState(false)
  const [pages, setPages] = useState([
    { 
      id: 1, 
      sections: ['header', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'volunteer', 'languages', 'interests', 'references']
    }
  ])

  // Load document data when loadedDocument changes
  useEffect(() => {
    if (loadedDocument && loadedDocument.formData) {
      setIsLoadingDocument(true)
      
      // Force immediate state update
      const newFormData = { ...loadedDocument.formData }
      const newTemplate = loadedDocument.template || 'modern'
      const newDocType = loadedDocument.docType || 'resume'
      const newPages = loadedDocument.pages || [{ 
        id: 1, 
        sections: loadedDocument.docType === 'resume' 
          ? ['header', 'summary', 'experience', 'education', 'skills'] 
          : ['header', 'recipient', 'content', 'signature']
      }]
      
      setFormData(newFormData)
      setTemplate(newTemplate)
      setDocType(newDocType)
      setPages(newPages)
      
      // Use a timeout to ensure all state updates are processed
      setTimeout(() => {
        setIsLoadingDocument(false)
        
        // Clear the loaded document after processing to prevent re-loading
        if (onClearDocument) {
          setTimeout(() => onClearDocument(), 100)
        }
      }, 100)
    }
  }, [loadedDocument])

  const handleSave = () => {
    localStorage.setItem('resume_draft', JSON.stringify({ formData, template, docType, pages }))
    alert('Document saved successfully!')
  }

  const handleDownload = async () => {
    try {
      // Generate filename based on document title or default
      const filename = formData.documentTitle || 
                      (formData.fullName ? `${formData.fullName}_${docType}` : `my_${docType}`)
      
      // Prepare document data for tracking
      const documentForTracking = {
        id: null, // Builder doesn't have saved document ID
        documentTitle: formData.documentTitle,
        name: formData.documentTitle || filename,
        type: docType,
        template: template,
        ...formData,
        pages
      }
      
      // Export to PDF
      await exportToPDF('preview-content', filename, pages, documentForTracking)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download PDF. Please try again.')
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
      // Edit existing entry
      const updatedArray = [...formData[section]]
      updatedArray[editingIndex] = data
      setFormData({
        ...formData,
        [section]: updatedArray
      })
    } else {
      // Add new entry
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
      sections: [] // Empty page - no sections by default
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
    <>
      {isLoadingDocument && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading document...</p>
        </div>
      )}
      <div className="builder-content">
        <Sidebar
          key={`sidebar-${loadedDocument?.id || 'new-sidebar'}`} // Unique key for sidebar
          formData={formData}
          setFormData={setFormData}
          template={template}
          setTemplate={setTemplate}
          docType={docType}
          setDocType={setDocType}
          onOpenModal={handleOpenModal}
        />
        <Preview
          key={`preview-${loadedDocument?.id || 'new-preview'}`} // Unique key for preview
          formData={formData}
          template={template}
          docType={docType}
          onSave={handleSave}
          onDownload={handleDownload}
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
    </>
  )
}

export default Builder