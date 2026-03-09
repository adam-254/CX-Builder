import { useState, useEffect } from 'react'
import './FormModal.css'

function LanguageModal({ onSave, onClose, initialData }) {
  const [formData, setFormData] = useState({
    language: '',
    proficiency: 'Native'
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
          placeholder="Language (e.g., English, Spanish, Mandarin) *"
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <select
          value={formData.proficiency}
          onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
        >
          <option value="Native">Native or Bilingual</option>
          <option value="Fluent">Fluent</option>
          <option value="Advanced">Advanced</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Basic">Basic</option>
        </select>
      </div>
      <div className="modal-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit">Save Language</button>
      </div>
    </form>
  )
}

export default LanguageModal
