import { useState, useEffect } from 'react'
import './FormModal.css'

function CertificationModal({ onSave, onClose, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    url: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="form-modal">
      <div className="form-group">
        <input
          type="text"
          placeholder="Certification Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Issuing Organization *"
          value={formData.issuer}
          onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="month"
          placeholder="Date Obtained"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="url"
          placeholder="Credential URL (e.g., verification link)"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        />
      </div>
      <div className="modal-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit">Save Certification</button>
      </div>
    </form>
  )
}

export default CertificationModal
