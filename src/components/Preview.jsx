import './Preview.css'
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

function Preview({ formData, template, docType, onSave, onDownload }) {
  const templates = docType === 'resume' ? resumeTemplates : coverLetterTemplates
  const TemplateComponent = templates[template] || templates.modern

  return (
    <main className="preview-area">
      <div className="preview-header">
        <h3>Preview</h3>
        <div className="preview-actions">
          <button className="btn-save" onClick={onSave}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Save
          </button>
          <button className="btn-download" onClick={onDownload}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Download PDF
          </button>
        </div>
      </div>
      <div className="preview-content">
        <TemplateComponent data={formData} />
      </div>
    </main>
  )
}

export default Preview
