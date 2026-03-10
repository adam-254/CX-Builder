# PDF Export Feature

## Overview
The CX-Builder now includes comprehensive PDF export functionality that allows users to download their resumes and cover letters as high-quality PDF files.

## Features

### 🎯 Main Export Functionality
- **Multi-page Support**: Export documents with multiple pages
- **High Quality**: 2x scale rendering for crisp text and graphics
- **A4 Format**: Standard A4 page size (210mm x 297mm)
- **Template Preservation**: Maintains all styling and formatting from templates

### 🔧 Technical Implementation
- **Libraries Used**: 
  - `html2canvas` - Converts HTML elements to canvas
  - `jsPDF` - Generates PDF files from canvas data
- **Export Process**:
  1. Captures each page as high-resolution canvas
  2. Converts canvas to PNG image data
  3. Adds images to PDF document
  4. Downloads the final PDF file

### 📱 User Interface
- **Export Button**: Available in the preview area
- **Loading States**: Shows progress during PDF generation
- **Toast Notifications**: Success/error feedback
- **History Export**: Export saved documents from history page

## Usage

### From Builder Page
1. Create or edit your resume/cover letter
2. Click the "Download PDF" button in the preview area
3. Wait for the PDF generation to complete
4. The PDF will automatically download

### From History Page
1. Navigate to the History page
2. Find the document you want to export
3. Click the PDF download icon (📄) on the document card
4. Note: Currently requires opening the document first for full export

## File Naming
PDFs are automatically named based on:
1. Document title (if set)
2. Full name + document type (e.g., "John_Doe_resume.pdf")
3. Default format (e.g., "my_resume.pdf")

## Browser Compatibility
- ✅ Chrome/Chromium browsers
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Performance Considerations
- **Large Documents**: Multi-page documents may take longer to process
- **Complex Styling**: Templates with many graphics may increase processing time
- **Memory Usage**: Large documents temporarily use more browser memory during export

## Troubleshooting

### Common Issues
1. **Export Fails**: Refresh the page and try again
2. **Poor Quality**: Ensure browser zoom is at 100%
3. **Missing Content**: Check that all sections are properly filled
4. **Slow Export**: Large documents with many pages take more time

### Error Messages
- "Element not found": The preview content isn't available
- "Failed to export PDF": General export error, try refreshing
- "Please open document first": History export requires opening the document

## Future Enhancements
- [ ] Direct export from history without opening document
- [ ] Custom page size options (Letter, Legal, etc.)
- [ ] Batch export multiple documents
- [ ] PDF metadata (author, title, keywords)
- [ ] Print-specific styling optimizations
- [ ] Cloud storage integration

## Code Structure

```
src/
├── utils/
│   └── pdfExport.js          # Main PDF export logic
├── components/
│   ├── PDFExportButton.jsx   # Reusable export button
│   └── PDFExportButton.css   # Button styling
└── pages/
    ├── Builder.jsx           # Integrated export in builder
    └── History.jsx           # Export from saved documents
```

## API Reference

### `exportToPDF(elementId, filename, pages)`
Main export function for multi-page documents.

**Parameters:**
- `elementId` (string): ID of the container element
- `filename` (string): Name for the PDF file
- `pages` (array): Array of page data objects

### `exportSinglePageToPDF(elementSelector, filename)`
Export function for single-page documents.

**Parameters:**
- `elementSelector` (string): CSS selector for the element
- `filename` (string): Name for the PDF file

### `PDFExportButton` Component
Reusable React component for PDF export functionality.

**Props:**
- `formData` (object): Document form data
- `docType` (string): 'resume' or 'cover-letter'
- `pages` (array): Page configuration
- `className` (string): Additional CSS classes
- `disabled` (boolean): Disable the button
- `isHistoryExport` (boolean): Export from history mode
- `documentData` (object): Full document data for history export