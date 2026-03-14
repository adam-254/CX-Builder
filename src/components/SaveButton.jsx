import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { saveDocument, updateDocument } from '../services/firestoreService';
import AuthModal from './auth/AuthModal';
import './SaveButton.css';

function SaveButton({ 
  documentData, 
  documentType, 
  documentId = null, 
  onSaveSuccess,
  className = '' 
}) {
  const { currentUser } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [documentName, setDocumentName] = useState('');

  // Pre-fill document name when editing existing document
  useEffect(() => {
    if (documentId && documentData?.name) {
      setDocumentName(documentData.name);
    }
  }, [documentId, documentData?.name]);

  const handleSaveClick = () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setShowSaveModal(true);
  };

  const handleSave = async () => {
    if (!documentName.trim()) {
      showError('Please enter a name for your document');
      return;
    }

    try {
      setSaving(true);
      
      const dataToSave = {
        ...documentData,
        name: documentName.trim(),
        template: documentData.selectedTemplate || documentData.template || 'modern'
      };

      let savedDocumentId;
      
      if (documentId) {
        // Update existing document
        savedDocumentId = await updateDocument(documentId, dataToSave);
        showSuccess(`${documentType === 'resume' ? 'Resume' : 'Cover Letter'} updated successfully!`);
      } else {
        // Create new document
        savedDocumentId = await saveDocument(currentUser.uid, dataToSave, documentType);
        showSuccess(`${documentType === 'resume' ? 'Resume' : 'Cover Letter'} saved successfully!`);
      }

      setShowSaveModal(false);
      setDocumentName('');
      
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('documentSaved', { 
        detail: { documentId: savedDocumentId, documentType, documentName: documentName.trim() }
      }));
      
      if (onSaveSuccess) {
        onSaveSuccess(savedDocumentId);
      }
      
    } catch (error) {
      console.error('Error saving document:', error);
      showError('Failed to save document. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button 
        className={`save-button ${className}`}
        onClick={handleSaveClick}
        disabled={saving}
      >
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
        </svg>
        {saving ? 'Saving...' : (documentId ? 'Update' : 'Save')}
      </button>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* Save Modal */}
      {showSaveModal && (
        <div className="save-modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="save-modal" onClick={(e) => e.stopPropagation()}>
            <div className="save-modal-header">
              <h3>Save {documentType === 'resume' ? 'Resume' : 'Cover Letter'}</h3>
              <button 
                className="save-modal-close"
                onClick={() => setShowSaveModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="save-modal-body">
              <div className="form-group">
                <label htmlFor="documentName">Document Name</label>
                <input
                  type="text"
                  id="documentName"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  placeholder={`Enter ${documentType} name`}
                  autoFocus
                />
              </div>
            </div>
            
            <div className="save-modal-footer">
              <button 
                className="save-modal-button cancel"
                onClick={() => setShowSaveModal(false)}
              >
                Cancel
              </button>
              <button 
                className="save-modal-button save"
                onClick={handleSave}
                disabled={saving || !documentName.trim()}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SaveButton;