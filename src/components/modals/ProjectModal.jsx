import { useState, useEffect } from 'react'
import './FormModal.css'

function ProjectModal({ onSave, onClose, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    date: '',
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
      <div className="form-group">
        <input
          type="text"
          placeholder="Project Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="url"
          placeholder="Project URL (e.g., https://github.com/username/project)"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          type="month"
          placeholder="Completion Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Describe the project, technologies used, and your role... *"
          rows="4"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div className="modal-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit">Save Project</button>
      </div>
    </form>
  )
}

export default ProjectModal
