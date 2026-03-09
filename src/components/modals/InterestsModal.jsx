import { useState, useEffect } from 'react'
import './FormModal.css'

function InterestsModal({ onSave, onClose, initialData }) {
  const [formData, setFormData] = useState({
    interests: ''
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
        <textarea
          placeholder="List your interests (comma separated, e.g., Photography, Hiking, Open Source) *"
          rows="4"
          value={formData.interests}
          onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
          required
        />
      </div>
      <div className="modal-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit">Save Interests</button>
      </div>
    </form>
  )
}

export default InterestsModal
