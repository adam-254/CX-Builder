import { useState } from 'react'
import './FormModal.css'

function SkillsModal({ onSave, onClose }) {
  const [formData, setFormData] = useState({
    category: '',
    skills: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="form-modal">
      <input
        type="text"
        placeholder="Category (e.g., Programming Languages)"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        required
      />
      <textarea
        placeholder="Skills (comma separated)"
        rows="3"
        value={formData.skills}
        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        required
      />
      <div className="modal-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit">Save</button>
      </div>
    </form>
  )
}

export default SkillsModal
