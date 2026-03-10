import { useState } from 'react'
import { exportToPDF, exportDocumentFromHistory } from '../utils/pdfExport'

function PDFExportButton({ 
  formData, 
  docType = 'resume', 
  pages = [], 
  className = '', 
  children,
  disabled = false,
  isHistoryExport = false,
  documentData = null
}) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    if (disabled || isExporting) return
    
    setIsExporting(true)
    
    try {
      if (isHistoryExport && documentData) {
        // Export from history data
        await exportDocumentFromHistory(documentData)
      } else {
        // Export from current preview
        const filename = formData?.documentTitle || 
                        (formData?.fullName ? `${formData.fullName}_${docType}` : `my_${docType}`)
        
        await exportToPDF('preview-content', filename, pages)
      }
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button 
      className={`pdf-export-btn ${className} ${isExporting ? 'exporting' : ''}`}
      onClick={handleExport}
      disabled={disabled || isExporting}
      title={isExporting ? 'Generating PDF...' : 'Download as PDF'}
    >
      {isExporting ? (
        <>
          <div className="spinner-small"></div>
          <span>Generating...</span>
        </>
      ) : (
        children || (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Download PDF</span>
          </>
        )
      )}
    </button>
  )
}

export default PDFExportButton