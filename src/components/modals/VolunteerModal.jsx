import { useState, useEffect } from 'react'
import './FormModal.css'

function VolunteerModal({ onSave, onClose, initialData }) {
  const [formData, setFormData] = useState({
    role: '',
    organization: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
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
      <input
        type="text"
        placeholder="Role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Organization"
        value={formData.organization}
        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
      <div className="date-row">
        <input
          type="month"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />
        <input
          type="month"
          placeholder="End Date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          disabled={formData.current}
        />
      </div>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={formData.current}
          onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
        />
        Currently volunteering here
      </label>
      <textarea
        placeholder="Description"
        rows="4"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <div className="modal-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit">Save</button>
      </div>
    </form>
  )
}

export default VolunteerModal
