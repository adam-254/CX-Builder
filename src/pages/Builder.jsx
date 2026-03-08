import { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Preview from '../components/Preview'
import Modal from '../components/Modal'
import ExperienceModal from '../components/modals/ExperienceModal'
import EducationModal from '../components/modals/EducationModal'
import SkillsModal from '../components/modals/SkillsModal'
import InterestsModal from '../components/modals/InterestsModal'
import VolunteerModal from '../components/modals/VolunteerModal'
import ProjectModal from '../components/modals/ProjectModal'
import CertificationModal from '../components/modals/CertificationModal'
import LanguageModal from '../components/modals/LanguageModal'
import ReferenceModal from '../components/modals/ReferenceModal'
import './Builder.css'

function Builder() {
  const [formData, setFormData] = useState({
    title: '',
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
  const [docType, setDocType] = useState('resume')
  const [activeModal, setActiveModal] = useState(null)

  const handleSave = () => {
    localStorage.setItem('resume_draft', JSON.stringify({ formData, template, docType }))
    alert('Document saved successfully!')
  }

  const handleDownload = () => {
    alert('PDF download functionality - integrate library like jsPDF or react-pdf')
  }

  const handleOpenModal = (modalType) => {
    setActiveModal(modalType)
  }

  const handleCloseModal = () => {
    setActiveModal(null)
  }

  const handleSaveData = (section, data) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], data]
    })
  }

  const renderModal = () => {
    const modalProps = {
      onClose: handleCloseModal
    }

    switch (activeModal) {
      case 'experience':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title="Add Experience">
            <ExperienceModal {...modalProps} onSave={(data) => handleSaveData('experience', data)} />
          </Modal>
        )
      case 'education':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title="Add Education">
            <EducationModal {...modalProps} onSave={(data) => handleSaveData('education', data)} />
          </Modal>
        )
      case 'skills':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title="Add Skills">
            <SkillsModal {...modalProps} onSave={(data) => handleSaveData('skills', data)} />
          </Modal>
        )
      case 'interests':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title="Add Interests">
            <InterestsModal {...modalProps} onSave={(data) => handleSaveData('interests', data)} />
          </Modal>
        )
      case 'volunteer':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title="Add Volunteer Experience">
            <VolunteerModal {...modalProps} onSave={(data) => handleSaveData('volunteer', data)} />
          </Modal>
        )
      case 'project':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title="Add Project">
            <ProjectModal {...modalProps} onSave={(data) => handleSaveData('projects', data)} />
          </Modal>
        )
      case 'certification':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title="Add Certification">
            <CertificationModal {...modalProps} onSave={(data) => handleSaveData('certifications', data)} />
          </Modal>
        )
      case 'language':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title="Add Language">
            <LanguageModal {...modalProps} onSave={(data) => handleSaveData('languages', data)} />
          </Modal>
        )
      case 'reference':
        return (
          <Modal isOpen={true} onClose={handleCloseModal} title="Add Reference">
            <ReferenceModal {...modalProps} onSave={(data) => handleSaveData('references', data)} />
          </Modal>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="builder-content">
        <Sidebar
          formData={formData}
          setFormData={setFormData}
          template={template}
          setTemplate={setTemplate}
          docType={docType}
          setDocType={setDocType}
          onOpenModal={handleOpenModal}
        />
        <Preview
          formData={formData}
          template={template}
          docType={docType}
          onSave={handleSave}
          onDownload={handleDownload}
        />
      </div>
      {renderModal()}
    </>
  )
}

export default Builder
