import { useState } from 'react'
import './FormModal.css'

function InterestsModal({ onSave, onClose }) {
  const [formData, setFormData] = useState({
    interests: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="form-modal">
      <textarea
        placeholder="Interests (comma separated)"
        rows="4"
        value={formData.interests}
        onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
        required
      />
      <div className="modal-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit">Save</button>
      </div>
    </form>
  )
}

export default InterestsModal
