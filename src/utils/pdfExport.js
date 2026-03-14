import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * Export resume/cover letter to PDF
 * @param {string} elementId - ID of the element to export
 * @param {string} filename - Name of the PDF file
 * @param {Array} pages - Array of page data
 * @param {Object} documentData - Document data for tracking
 */
export const exportToPDF = async (elementId, filename = 'document', pages = [], documentData = null) => {
  try {
    // Show loading state
    const loadingToast = showLoadingToast()
    
    // Get all page elements
    const pageElements = document.querySelectorAll('.page-content')
    
    if (pageElements.length === 0) {
      throw new Error('No pages found to export')
    }

    // Create PDF document with compression
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true // Enable PDF compression
    })

    // A4 dimensions in mm
    const pageWidth = 210
    const pageHeight = 297

    for (let i = 0; i < pageElements.length; i++) {
      const pageElement = pageElements[i]
      
      // Temporarily modify styles for better PDF rendering
      const originalStyles = prepareElementForPDF(pageElement)
      
      try {
        // Capture the page as canvas with optimized settings
        const canvas = await html2canvas(pageElement, {
          scale: 1.5, // Reduced from 2 for smaller file size
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: pageElement.scrollWidth,
          height: pageElement.scrollHeight,
          windowWidth: 1200,
          windowHeight: 1600,
          logging: false, // Disable logging for performance
          imageTimeout: 15000,
          removeContainer: true
        })

        // Calculate dimensions to fit A4
        const imgWidth = pageWidth
        const imgHeight = (canvas.height * pageWidth) / canvas.width
        
        // Add new page if not the first page
        if (i > 0) {
          pdf.addPage()
        }
        
        // Convert to JPEG with compression for smaller file size
        const imgData = canvas.toDataURL('image/jpeg', 0.85) // 85% quality JPEG
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight))
        
      } finally {
        // Restore original styles
        restoreElementStyles(pageElement, originalStyles)
      }
    }

    // Save the PDF
    pdf.save(`${filename}.pdf`)
    
    // Track the download
    if (documentData) {
      const downloadEvent = new CustomEvent('documentDownloaded', {
        detail: {
          documentData: documentData,
          filename: `${filename}.pdf`,
          downloadedAt: new Date().toISOString()
        }
      })
      window.dispatchEvent(downloadEvent)
    }
    
    // Hide loading state
    hideLoadingToast(loadingToast)
    
    // Show success message
    showSuccessToast('PDF exported successfully!')
    
  } catch (error) {
    console.error('Error exporting PDF:', error)
    showErrorToast('Failed to export PDF. Please try again.')
  }
}

/**
 * Prepare element for PDF rendering by adjusting styles
 */
const prepareElementForPDF = (element) => {
  const originalStyles = {
    transform: element.style.transform,
    boxShadow: element.style.boxShadow,
    overflow: element.style.overflow
  }
  
  // Remove transforms and shadows that might interfere with rendering
  element.style.transform = 'none'
  element.style.boxShadow = 'none'
  element.style.overflow = 'visible'
  
  return originalStyles
}

/**
 * Restore original element styles
 */
const restoreElementStyles = (element, originalStyles) => {
  element.style.transform = originalStyles.transform || ''
  element.style.boxShadow = originalStyles.boxShadow || ''
  element.style.overflow = originalStyles.overflow || ''
}

/**
 * Show loading toast notification
 */
const showLoadingToast = () => {
  const toast = document.createElement('div')
  toast.className = 'pdf-toast loading'
  toast.innerHTML = `
    <div class="toast-content">
      <div class="spinner"></div>
      <span>Generating PDF...</span>
    </div>
  `
  document.body.appendChild(toast)
  
  // Add styles if not already present
  if (!document.querySelector('#pdf-toast-styles')) {
    const styles = document.createElement('style')
    styles.id = 'pdf-toast-styles'
    styles.textContent = `
      .pdf-toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 16px 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        transition: all 0.3s ease;
      }
      
      .pdf-toast.loading {
        border-left: 4px solid #007bff;
      }
      
      .pdf-toast.success {
        border-left: 4px solid #28a745;
      }
      
      .pdf-toast.error {
        border-left: 4px solid #dc3545;
      }
      
      .toast-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
    document.head.appendChild(styles)
  }
  
  return toast
}

/**
 * Hide loading toast
 */
const hideLoadingToast = (toast) => {
  if (toast && toast.parentNode) {
    toast.parentNode.removeChild(toast)
  }
}

/**
 * Show success toast
 */
const showSuccessToast = (message) => {
  const toast = document.createElement('div')
  toast.className = 'pdf-toast success'
  toast.innerHTML = `
    <div class="toast-content">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22,4 12,14.01 9,11.01"></polyline>
      </svg>
      <span>${message}</span>
    </div>
  `
  document.body.appendChild(toast)
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)
    }
  }, 3000)
}

/**
 * Show error toast
 */
const showErrorToast = (message) => {
  const toast = document.createElement('div')
  toast.className = 'pdf-toast error'
  toast.innerHTML = `
    <div class="toast-content">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc3545" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      <span>${message}</span>
    </div>
  `
  document.body.appendChild(toast)
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)
    }
  }, 4000)
}

/**
 * Export resume/cover letter to PDF from history (without preview)
 * @param {Object} formData - The form data
 * @param {string} template - Template name
 * @param {string} docType - Document type (resume/cover letter)
 * @param {Array} pages - Array of page data
 * @param {string} filename - Name of the PDF file
 */
export const exportFromHistoryToPDF = async (formData, template, docType, pages = [], filename = 'document') => {
  try {
    // Show loading state
    const loadingToast = showLoadingToast()
    
    // Create a temporary preview container
    const tempContainer = document.createElement('div')
    tempContainer.style.position = 'absolute'
    tempContainer.style.top = '-9999px'
    tempContainer.style.left = '-9999px'
    tempContainer.style.width = '8.5in'
    tempContainer.style.background = 'white'
    tempContainer.style.fontFamily = 'Arial, sans-serif'
    tempContainer.id = 'temp-pdf-container'
    
    document.body.appendChild(tempContainer)
    
    // Dynamically import and render the template
    const templateModule = await import(`../templates/${docType}/${template}.jsx`)
    const TemplateComponent = templateModule.default
    
    // Create React element and render it
    const React = await import('react')
    const ReactDOM = await import('react-dom/client')
    
    const root = ReactDOM.createRoot(tempContainer)
    
    // Create PDF document with compression
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true // Enable PDF compression
    })

    const pageWidth = 210
    const pageHeight = 297

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]
      
      // Render the template for this page
      root.render(
        React.createElement(TemplateComponent, {
          data: formData,
          pageNumber: i + 1,
          sectionsToShow: page.sections
        })
      )
      
      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 500))
      
      try {
        // Capture the page as canvas with optimized settings
        const canvas = await html2canvas(tempContainer, {
          scale: 1.5, // Reduced for smaller file size
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: tempContainer.scrollWidth,
          height: tempContainer.scrollHeight,
          logging: false,
          imageTimeout: 15000,
          removeContainer: true
        })

        // Calculate dimensions to fit A4
        const imgWidth = pageWidth
        const imgHeight = (canvas.height * pageWidth) / canvas.width
        
        // Add new page if not the first page
        if (i > 0) {
          pdf.addPage()
        }
        
        // Convert to JPEG with compression
        const imgData = canvas.toDataURL('image/jpeg', 0.85)
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight))
        
      } catch (error) {
        console.error('Error rendering page:', error)
      }
    }

    // Clean up
    root.unmount()
    document.body.removeChild(tempContainer)

    // Save the PDF
    pdf.save(`${filename}.pdf`)
    
    // Hide loading state
    hideLoadingToast(loadingToast)
    
    // Show success message
    showSuccessToast('PDF exported successfully!')
    
  } catch (error) {
    console.error('Error exporting PDF from history:', error)
    showErrorToast('Failed to export PDF. Please try again.')
    
    // Clean up on error
    const tempContainer = document.getElementById('temp-pdf-container')
    if (tempContainer) {
      document.body.removeChild(tempContainer)
    }
  }
}
/**
 * Export single page to PDF (for quick exports)
 */
export const exportSinglePageToPDF = async (elementSelector, filename = 'document') => {
  try {
    const element = document.querySelector(elementSelector)
    if (!element) {
      throw new Error('Element not found')
    }
    
    const loadingToast = showLoadingToast()
    
    const originalStyles = prepareElementForPDF(element)
    
    try {
      const canvas = await html2canvas(element, {
        scale: 1.5, // Reduced for smaller file size
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
        removeContainer: true
      })
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true // Enable PDF compression
      })
      
      const pageWidth = 210
      const imgWidth = pageWidth
      const imgHeight = (canvas.height * pageWidth) / canvas.width
      
      // Use JPEG with compression
      const imgData = canvas.toDataURL('image/jpeg', 0.85)
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight)
      pdf.save(`${filename}.pdf`)
      
      hideLoadingToast(loadingToast)
      showSuccessToast('PDF exported successfully!')
      
    } finally {
      restoreElementStyles(element, originalStyles)
    }
    
  } catch (error) {
    console.error('Error exporting PDF:', error)
    showErrorToast('Failed to export PDF. Please try again.')
  }
}

/**
 * Export document from history data by creating temporary preview
 */
export const exportDocumentFromHistory = async (documentData) => {
  try {
    const { formData, template, docType, pages } = documentData
    const filename = formData?.documentTitle || 
                    (formData?.fullName ? `${formData.fullName}_${docType}` : `my_${docType}`)
    
    showLoadingToast()
    
    // For now, show a message that the user should open the document first
    // In a full implementation, we would create a temporary preview
    showErrorToast('Please open the document in the builder first, then export from there.')
    
  } catch (error) {
    console.error('Export from history failed:', error)
    showErrorToast('Failed to export PDF. Please open the document first.')
  }
}