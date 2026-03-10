import { useEffect, useRef, useState } from 'react'
import './Preview.css'
import PDFExportButton from './PDFExportButton'
import './PDFExportButton.css'
import ModernResume from '../templates/resume/modern'
import MinimalistResume from '../templates/resume/minimalist'
import ExecutiveResume from '../templates/resume/executive'
import CreativeResume from '../templates/resume/creative'
import ProfessionalResume from '../templates/resume/professional'
import CompactResume from '../templates/resume/compact'
import BoldResume from '../templates/resume/bold'
import ElegantResume from '../templates/resume/elegant'
import TechResume from '../templates/resume/tech'
import SpectrumResume from '../templates/resume/spectrum'
import HorizonResume from '../templates/resume/horizon'
import NexusResume from '../templates/resume/nexus'
import PrismResume from '../templates/resume/prism'

import ModernCoverLetter from '../templates/cover-letter/modern'
import MinimalistCoverLetter from '../templates/cover-letter/minimalist'
import ExecutiveCoverLetter from '../templates/cover-letter/executive'
import CreativeCoverLetter from '../templates/cover-letter/creative'
import ProfessionalCoverLetter from '../templates/cover-letter/professional'
import CompactCoverLetter from '../templates/cover-letter/compact'
import BoldCoverLetter from '../templates/cover-letter/bold'
import ElegantCoverLetter from '../templates/cover-letter/elegant'
import TechCoverLetter from '../templates/cover-letter/tech'
import SpectrumCoverLetter from '../templates/cover-letter/spectrum'
import HorizonCoverLetter from '../templates/cover-letter/horizon'
import NexusCoverLetter from '../templates/cover-letter/nexus'
import PrismCoverLetter from '../templates/cover-letter/prism'

const resumeTemplates = {
  modern: ModernResume,
  minimalist: MinimalistResume,
  executive: ExecutiveResume,
  creative: CreativeResume,
  professional: ProfessionalResume,
  compact: CompactResume,
  bold: BoldResume,
  elegant: ElegantResume,
  tech: TechResume,
  spectrum: SpectrumResume,
  horizon: HorizonResume,
  nexus: NexusResume,
  prism: PrismResume
}

const coverLetterTemplates = {
  modern: ModernCoverLetter,
  minimalist: MinimalistCoverLetter,
  executive: ExecutiveCoverLetter,
  creative: CreativeCoverLetter,
  professional: ProfessionalCoverLetter,
  compact: CompactCoverLetter,
  bold: BoldCoverLetter,
  elegant: ElegantCoverLetter,
  tech: TechCoverLetter,
  spectrum: SpectrumCoverLetter,
  horizon: HorizonCoverLetter,
  nexus: NexusCoverLetter,
  prism: PrismCoverLetter
}

function Preview({ formData, template, docType, onSave, onDownload, pages, onAddPage, onDeletePage, onUpdatePage, onManageSections }) {
  const templates = docType === 'resume' ? resumeTemplates : coverLetterTemplates
  const TemplateComponent = templates[template] || templates.modern
  const pageRefs = useRef([])
  const [overflowPages, setOverflowPages] = useState([])

  useEffect(() => {
    // Check for overflow on each page
    const checkOverflow = () => {
      // 11 inches at 96 DPI = 1056px
      const MAX_HEIGHT = 11 * 96
      const newOverflowPages = []

      pageRefs.current.forEach((ref, index) => {
        if (ref) {
          // Get the actual content height
          const contentHeight = ref.scrollHeight
          const clientHeight = ref.clientHeight
          
          // Check if content is scrollable (overflow exists)
          // Only flag if scrollHeight significantly exceeds the visible area
          if (contentHeight > clientHeight && contentHeight > MAX_HEIGHT + 50) {
            newOverflowPages.push(index)
          }
        }
      })

      setOverflowPages(newOverflowPages)
    }

    // Check after render and when content changes
    const timer = setTimeout(checkOverflow, 100)
    return () => clearTimeout(timer)
  }, [formData, pages, template])

  return (
    <main className="preview-area">
      <div className="preview-header">
        <h3>Preview</h3>
        <div className="preview-actions">
          <button className="btn-manage" onClick={onManageSections}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Manage Sections</span>
          </button>
          <button className="btn-save" onClick={onSave}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Save</span>
          </button>
          <PDFExportButton 
            formData={formData}
            docType={docType}
            pages={pages}
            className="btn-download"
          />
        </div>
      </div>
      <div className="preview-content" id="preview-content">
        <div className="pages-container">
          {pages.map((page, index) => (
            <div key={page.id} className="page-wrapper">
              {pages.length > 1 && (
                <button 
                  className="btn-delete-page" 
                  onClick={() => onDeletePage(page.id)}
                  title="Delete this page"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              )}
              {overflowPages.includes(index) && (
                <div className="overflow-warning">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Content exceeds page height! Move some sections to another page.</span>
                </div>
              )}
              <div 
                ref={el => pageRefs.current[index] = el}
                className={`page-content ${overflowPages.includes(index) ? 'overflow' : ''}`}
              >
                <TemplateComponent 
                  data={formData} 
                  pageNumber={index + 1}
                  sectionsToShow={page.sections}
                />
              </div>
              <div className="page-number">Page {index + 1} of {pages.length}</div>
            </div>
          ))}
          <button className="btn-add-page" onClick={onAddPage}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Page
          </button>
        </div>
      </div>
    </main>
  )
}

export default Preview
