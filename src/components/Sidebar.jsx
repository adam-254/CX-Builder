import './Sidebar.css'

function Sidebar({ formData, setFormData, template, setTemplate, docType, setDocType, onOpenModal, isOpen, onClose }) {
  const templates = [
    'Modern', 'Minimalist', 'Executive', 'Creative', 'Professional', 
    'Compact', 'Bold', 'Elegant', 'Tech', 'Spectrum', 'Horizon', 'Nexus', 'Prism'
  ]

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="sidebar-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
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
          type="text"
          placeholder="Professional Title (e.g., Project Manager)"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
        {formData.experience && formData.experience.map((exp, index) => (
          <div key={index} className="entry-item">
            <div className="entry-item-content">
              <strong>{exp.jobTitle}</strong>
              <span className="entry-item-sub">{exp.company}</span>
            </div>
            <button className="edit-btn" onClick={() => onOpenModal('experience', index)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        ))}
        <button className="add-section-btn" onClick={() => onOpenModal('experience')}>
          + Add Experience
        </button>
      </section>

      <section className="section">
        <h3>Education</h3>
        {formData.education && formData.education.map((edu, index) => (
          <div key={index} className="entry-item">
            <div className="entry-item-content">
              <strong>{edu.degree}</strong>
              <span className="entry-item-sub">{edu.institution}</span>
            </div>
            <button className="edit-btn" onClick={() => onOpenModal('education', index)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        ))}
        <button className="add-section-btn" onClick={() => onOpenModal('education')}>
          + Add Education
        </button>
      </section>

      <section className="section">
        <h3>Skills</h3>
        {formData.skills && formData.skills.map((skill, index) => (
          <div key={index} className="entry-item">
            <div className="entry-item-content">
              <strong>{skill.category}</strong>
            </div>
            <button className="edit-btn" onClick={() => onOpenModal('skills', index)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        ))}
        <button className="add-section-btn" onClick={() => onOpenModal('skills')}>
          + Add Skills
        </button>
      </section>

      <section className="section">
        <h3>Interests</h3>
        {formData.interests && formData.interests.map((interest, index) => (
          <div key={index} className="entry-item">
            <div className="entry-item-content">
              <span>{interest.interests}</span>
            </div>
            <button className="edit-btn" onClick={() => onOpenModal('interests', index)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        ))}
        <button className="add-section-btn" onClick={() => onOpenModal('interests')}>
          + Add Interests
        </button>
      </section>

      <section className="section">
        <h3>Volunteer Experience</h3>
        {formData.volunteer && formData.volunteer.map((vol, index) => (
          <div key={index} className="entry-item">
            <div className="entry-item-content">
              <strong>{vol.role}</strong>
              <span className="entry-item-sub">{vol.organization}</span>
            </div>
            <button className="edit-btn" onClick={() => onOpenModal('volunteer', index)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        ))}
        <button className="add-section-btn" onClick={() => onOpenModal('volunteer')}>
          + Add Volunteer Experience
        </button>
      </section>

      <section className="section">
        <h3>Projects/Portfolios</h3>
        {formData.projects && formData.projects.map((project, index) => (
          <div key={index} className="entry-item">
            <div className="entry-item-content">
              <strong>{project.name}</strong>
            </div>
            <button className="edit-btn" onClick={() => onOpenModal('project', index)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        ))}
        <button className="add-section-btn" onClick={() => onOpenModal('project')}>
          + Add Project
        </button>
      </section>

      <section className="section">
        <h3>Certifications</h3>
        {formData.certifications && formData.certifications.map((cert, index) => (
          <div key={index} className="entry-item">
            <div className="entry-item-content">
              <strong>{cert.name}</strong>
              <span className="entry-item-sub">{cert.issuer}</span>
            </div>
            <button className="edit-btn" onClick={() => onOpenModal('certification', index)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        ))}
        <button className="add-section-btn" onClick={() => onOpenModal('certification')}>
          + Add Certification
        </button>
      </section>

      <section className="section">
        <h3>Languages</h3>
        {formData.languages && formData.languages.map((lang, index) => (
          <div key={index} className="entry-item">
            <div className="entry-item-content">
              <strong>{lang.language}</strong>
              <span className="entry-item-sub">{lang.proficiency}</span>
            </div>
            <button className="edit-btn" onClick={() => onOpenModal('language', index)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        ))}
        <button className="add-section-btn" onClick={() => onOpenModal('language')}>
          + Add Language
        </button>
      </section>

      <section className="section">
        <h3>References</h3>
        {formData.references && formData.references.map((ref, index) => (
          <div key={index} className="entry-item">
            <div className="entry-item-content">
              {ref.availableUponRequest ? (
                <strong>Available upon request</strong>
              ) : (
                <>
                  <strong>{ref.name}</strong>
                  <span className="entry-item-sub">{ref.position}</span>
                </>
              )}
            </div>
            <button className="edit-btn" onClick={() => onOpenModal('reference', index)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        ))}
        <button className="add-section-btn" onClick={() => onOpenModal('reference')}>
          + Add Reference
        </button>
      </section>
      </aside>
    </>
  )
}

export default Sidebar
