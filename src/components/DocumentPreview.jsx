import { useRef, useEffect, useState } from 'react';
import './DocumentPreview.css';

// Import all templates
import ModernResume from '../templates/resume/modern';
import MinimalistResume from '../templates/resume/minimalist';
import ExecutiveResume from '../templates/resume/executive';
import CreativeResume from '../templates/resume/creative';
import ProfessionalResume from '../templates/resume/professional';
import CompactResume from '../templates/resume/compact';
import BoldResume from '../templates/resume/bold';
import ElegantResume from '../templates/resume/elegant';
import TechResume from '../templates/resume/tech';
import SpectrumResume from '../templates/resume/spectrum';
import HorizonResume from '../templates/resume/horizon';
import NexusResume from '../templates/resume/nexus';
import PrismResume from '../templates/resume/prism';

import ModernCoverLetter from '../templates/cover-letter/modern';
import MinimalistCoverLetter from '../templates/cover-letter/minimalist';
import ExecutiveCoverLetter from '../templates/cover-letter/executive';
import CreativeCoverLetter from '../templates/cover-letter/creative';
import ProfessionalCoverLetter from '../templates/cover-letter/professional';
import CompactCoverLetter from '../templates/cover-letter/compact';
import BoldCoverLetter from '../templates/cover-letter/bold';
import ElegantCoverLetter from '../templates/cover-letter/elegant';
import TechCoverLetter from '../templates/cover-letter/tech';
import SpectrumCoverLetter from '../templates/cover-letter/spectrum';
import HorizonCoverLetter from '../templates/cover-letter/horizon';
import NexusCoverLetter from '../templates/cover-letter/nexus';
import PrismCoverLetter from '../templates/cover-letter/prism';

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
};

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
};

function DocumentPreview({ document, className = '' }) {
  const previewRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const templates = document.type === 'resume' ? resumeTemplates : coverLetterTemplates;
  const TemplateComponent = templates[document.template] || templates.modern;

  // Default sections for documents that don't have pages defined
  const defaultSections = document.type === 'resume' 
    ? ['header', 'summary', 'experience', 'education', 'skills']
    : ['header', 'recipient', 'content', 'signature'];

  const sectionsToShow = document.pages?.[0]?.sections || defaultSections;

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`document-preview-container ${className}`}>
      <div 
        ref={previewRef}
        className={`document-preview-content ${isLoaded ? 'loaded' : 'loading'}`}
      >
        {!isLoaded ? (
          <div className="preview-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-lines">
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
            <div className="skeleton-section">
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
            </div>
          </div>
        ) : (
          <TemplateComponent 
            data={document} 
            pageNumber={1}
            sectionsToShow={sectionsToShow}
          />
        )}
      </div>
      
      {/* Preview overlay with document info */}
      <div className="preview-overlay">
        <div className="preview-info">
          <span className={`doc-type-badge ${document.type}`}>
            {document.type === 'resume' ? 'Resume' : 'Cover Letter'}
          </span>
          <span className="template-badge">{document.template}</span>
        </div>
      </div>
    </div>
  );
}

export default DocumentPreview;