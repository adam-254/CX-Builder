import './Sidebar.css'

function Sidebar({ formData, setFormData, template, setTemplate, docType, setDocType, onOpenModal }) {
  const templates = [
    'Modern', 'Minimalist', 'Executive', 'Creative', 'Professional', 
    'Compact', 'Bold', 'Elegant', 'Tech', 'Spectrum', 'Horizon', 'Nexus', 'Prism'
  ]

  return (
    <aside className="sidebar">
      <section className="section">
        <h3>TEMPLATES</h3>
        <div className="template-grid">
          {templates.map(t => (
            <button
              key={t}
              className={`template-btn ${template === t.toLowerCase() ? 'active' : ''}`}
              onClick={() => setTemplate(t.toLowerCase())}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="template-desc">
          Creative design with diagonal gradient line separators and vibrant colors
        </p>
      </section>

      <section className="section">
        <h3>Document Type</h3>
        <div className="toggle-group">
          <button
            className={`toggle-btn ${docType === 'resume' ? 'active' : ''}`}
            onClick={() => setDocType('resume')}
          >
            Resume
          </button>
          <button
            className={`toggle-btn ${docType === 'cover-letter' ? 'active' : ''}`}
            onClick={() => setDocType('cover-letter')}
          >
            Cover Letter
          </button>
        </div>
      </section>

      <section className="section">
        <h3>Document Title</h3>
        <input
          type="text"
          placeholder="e.g., My Resume 2024"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </section>

      <section className="section">
        <h3>Personal Information</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone || ''}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          type="url"
          placeholder="LinkedIn (optional)"
          value={formData.linkedin || ''}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
        />
        <input
          type="url"
          placeholder="Website (optional)"
          value={formData.website || ''}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
        <textarea
          placeholder="Professional Summary"
          rows="4"
          value={formData.summary || ''}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
        />
      </section>

      <section className="section">
        <h3>Experience</h3>
        <button className="add-section-btn" onClick={() => onOpenModal('experience')}>
          + Add Experience
        </button>
      </section>

      <section className="section">
        <h3>Education</h3>
        <button className="add-section-btn" onClick={() => onOpenModal('education')}>
          + Add Education
        </button>
      </section>

      <section className="section">
        <h3>Skills</h3>
        <button className="add-section-btn" onClick={() => onOpenModal('skills')}>
          + Add Skills
        </button>
      </section>

      <section className="section">
        <h3>Interests</h3>
        <button className="add-section-btn" onClick={() => onOpenModal('interests')}>
          + Add Interests
        </button>
      </section>

      <section className="section">
        <h3>Volunteer Experience</h3>
        <button className="add-section-btn" onClick={() => onOpenModal('volunteer')}>
          + Add Volunteer Experience
        </button>
      </section>

      <section className="section">
        <h3>Projects/Portfolios</h3>
        <button className="add-section-btn" onClick={() => onOpenModal('project')}>
          + Add Project
        </button>
      </section>

      <section className="section">
        <h3>Certifications</h3>
        <button className="add-section-btn" onClick={() => onOpenModal('certification')}>
          + Add Certification
        </button>
      </section>

      <section className="section">
        <h3>Languages</h3>
        <button className="add-section-btn" onClick={() => onOpenModal('language')}>
          + Add Language
        </button>
      </section>

      <section className="section">
        <h3>References</h3>
        <button className="add-section-btn" onClick={() => onOpenModal('reference')}>
          + Add Reference
        </button>
      </section>
    </aside>
  )
}

export default Sidebar
