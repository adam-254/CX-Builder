import { useState, useEffect } from 'react'
import './FormModal.css'

function SkillsModal({ onSave, onClose, initialData }) {
  const [formData, setFormData] = useState({
    category: '',
    skills: ''
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
          placeholder="Category (e.g., Programming Languages, Frameworks, Tools) *"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Skills (comma separated, e.g., JavaScript, React, Node.js) *"
          rows="3"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          required
        />
      </div>
      <div className="modal-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit">Save Skills</button>
      </div>
    </form>
  )
}

export default SkillsModal
