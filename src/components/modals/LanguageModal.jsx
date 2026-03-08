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
      <input
        type="text"
        placeholder="Language"
        value={formData.language}
        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
        required
      />
      <select
        value={formData.proficiency}
        onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
      >
        <option value="Native">Native</option>
        <option value="Fluent">Fluent</option>
        <option value="Advanced">Advanced</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Basic">Basic</option>
      </select>
      <div className="modal-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit">Save</button>
      </div>
    </form>
  )
}

export default LanguageModal
