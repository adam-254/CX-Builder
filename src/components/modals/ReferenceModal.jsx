import { useState, useEffect } from 'react'
import './FormModal.css'

function ReferenceModal({ onSave, onClose, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    email: '',
    phone: '',
    availableUponRequest: false
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

  const handleToggleAvailableUponRequest = () => {
    setFormData({ 
      ...formData, 
      availableUponRequest: !formData.availableUponRequest,
      // Clear fields when toggling to "available upon request"
      ...((!formData.availableUponRequest) && {
        name: '',
        position: '',
        company: '',
        email: '',
        phone: ''
      })
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form-modal">
      <label className="checkbox-label" style={{ marginBottom: '0.5rem' }}>
        <input
          type="checkbox"
          checked={formData.availableUponRequest}
          onChange={handleToggleAvailableUponRequest}
        />
        <span>References available upon request</span>
      </label>

      {!formData.availableUponRequest && (
        <>
          <div className="form-group">
            <input
              type="text"
              placeholder="Reference Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Position/Title *"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company/Organization"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              placeholder="Phone Number (e.g., +1 555-123-4567)"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </>
      )}

      <div className="modal-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit">Save Reference</button>
      </div>
    </form>
  )
}

export default ReferenceModal
