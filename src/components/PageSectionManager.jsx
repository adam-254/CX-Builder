import { useState } from 'react'
import './PageSectionManager.css'

function PageSectionManager({ pages, onUpdatePageSections, onClose }) {
  const [selectedPage, setSelectedPage] = useState(0)

  const allSections = [
    { id: 'header', label: 'Header (Name & Contact)' },
    { id: 'summary', label: 'Professional Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'volunteer', label: 'Volunteer Experience' },
    { id: 'languages', label: 'Languages' },
    { id: 'interests', label: 'Interests' },
    { id: 'references', label: 'References' }
  ]

  const currentSections = pages[selectedPage]?.sections || ['header', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'volunteer', 'languages', 'interests', 'references']

  const toggleSection = (sectionId) => {
    const newSections = currentSections.includes(sectionId)
      ? currentSections.filter(s => s !== sectionId)
      : [...currentSections, sectionId]
    
    onUpdatePageSections(pages[selectedPage].id, newSections)
  }

  return (
    <div className="page-section-manager">
      <div className="manager-header">
        <h3>Manage Page Sections</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="page-tabs">
        {pages.map((page, index) => (
          <button
            key={page.id}
            className={`page-tab ${selectedPage === index ? 'active' : ''}`}
            onClick={() => setSelectedPage(index)}
          >
            Page {index + 1}
          </button>
        ))}
      </div>

      <div className="sections-list">
        <p className="helper-text">Select which sections to show on Page {selectedPage + 1}</p>
        {allSections.map(section => (
          <label key={section.id} className="section-checkbox">
            <input
              type="checkbox"
              checked={currentSections.includes(section.id)}
              onChange={() => toggleSection(section.id)}
            />
            <span>{section.label}</span>
          </label>
        ))}
      </div>

      <div className="manager-footer">
        <span className="section-count">
          <strong>{currentSections.length}</strong> section{currentSections.length !== 1 ? 's' : ''} selected
        </span>
        <button className="btn-done" onClick={onClose}>Done</button>
      </div>
    </div>
  )
}

export default PageSectionManager
