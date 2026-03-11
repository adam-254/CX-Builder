import './Sidebar.css'

function Sidebar({ formData, setFormData, template, setTemplate, docType, setDocType, onOpenModal, isOpen, onClose }) {
  const templates = [
    'Modern', 'Minimalist', 'Executive', 'Creative', 'Professional', 
    'Compact', 'Bold', 'Elegant', 'Tech', 'Spectrum', 'Horizon', 'Nexus', 'Prism'
  ]

  // Delete handler for removing entries
  const handleDeleteEntry = (section, index) => {
    const updatedData = { ...formData }
    if (updatedData[section] && updatedData[section].length > index) {
      updatedData[section].splice(index, 1)
      setFormData(updatedData)
    }
  }

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
          value={formData.documentTitle}
          onChange={(e) => setFormData({ ...formData, documentTitle: e.target.value })}
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
          value={formData.professionalTitle || ''}
          onChange={(e) => setFormData({ ...formData, professionalTitle: e.target.value })}
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
        <input
          type="url"
          placeholder="GitHub (optional)"
          value={formData.github || ''}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
        />
        {docType === 'cover-letter' && (
          <input
            type="text"
            placeholder="Location (optional)"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        )}
        <textarea
          placeholder={docType === 'cover-letter' ? 'Cover Letter Content\n\nTip: Press Enter twice to create new paragraphs. Write naturally - formatting will be applied automatically.' : 'Professional Summary'}
          rows={docType === 'cover-letter' ? '10' : '4'}
          value={formData.summary || ''}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          style={docType === 'cover-letter' ? {
            lineHeight: '1.6',
            fontSize: '14px',
            fontFamily: 'inherit'
          } : {}}
        />
      </section>

      {docType === 'cover-letter' && (
        <>
          <section className="section">
            <h3>Recipient Information</h3>
            <input
              type="text"
              placeholder="Hiring Manager Name (optional)"
              value={formData.recipientName || ''}
              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Company Name"
              value={formData.companyName || ''}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Position Title"
              value={formData.positionTitle || ''}
              onChange={(e) => setFormData({ ...formData, positionTitle: e.target.value })}
            />
            <textarea
              placeholder="Company Address (optional)"
              rows="3"
              value={formData.companyAddress || ''}
              onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
            />
          </section>

          <section className="section">
            <h3>Letter Details</h3>
            <input
              type="text"
              placeholder="Subject Line (e.g., Application for Software Developer Position)"
              value={formData.subject || ''}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
            <input
              type="text"
              placeholder="Salutation (e.g., Dear Hiring Manager)"
              value={formData.salutation || 'Dear Hiring Manager,'}
              onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
            />
            <input
              type="text"
              placeholder="Closing (e.g., Sincerely)"
              value={formData.closing || 'Sincerely,'}
              onChange={(e) => setFormData({ ...formData, closing: e.target.value })}
            />
          </section>

          <section className="section">
            <h3>Signature Style</h3>
            <div className="signature-options">
              <label>
                <input
                  type="radio"
                  name="signatureType"
                  value="generated"
                  checked={(formData.signatureType || 'generated') === 'generated'}
                  onChange={(e) => setFormData({ ...formData, signatureType: e.target.value })}
                />
                Generated Signature
              </label>
              <label>
                <input
                  type="radio"
                  name="signatureType"
                  value="text"
                  checked={formData.signatureType === 'text'}
                  onChange={(e) => setFormData({ ...formData, signatureType: e.target.value })}
                />
                Text Only
              </label>
            </div>
            
            {(formData.signatureType || 'generated') === 'generated' && (
              <div className="signature-styles">
                <label htmlFor="signatureStyle">Signature Style:</label>
                <select
                  id="signatureStyle"
                  value={formData.signatureStyle || 'elegant'}
                  onChange={(e) => setFormData({ ...formData, signatureStyle: e.target.value })}
                >
                  <option value="elegant">Elegant Script</option>
                  <option value="modern">Modern Cursive</option>
                  <option value="classic">Classic Handwriting</option>
                  <option value="bold">Bold Signature</option>
                  <option value="minimal">Minimal Style</option>
                </select>
                <button 
                  type="button" 
                  className="generate-signature-btn"
                  onClick={() => {
                    // Generate a new signature variation
                    const timestamp = Date.now()
                    setFormData({ ...formData, signatureVariation: timestamp })
                  }}
                >
                  Generate New Variation
                </button>
              </div>
            )}
            
            <div style={{ 
              fontSize: '12px', 
              color: '#666', 
              marginTop: '8px',
              padding: '8px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              lineHeight: '1.4'
            }}>
              <strong>Formatting Tips:</strong><br/>
              • Subject line should be clear and specific<br/>
              • Press Enter twice to create new paragraphs<br/>
              • Write naturally - proper spacing will be applied<br/>
              • Aim for 3-4 paragraphs total
            </div>
          </section>
        </>
      )}

      {docType === 'resume' && (
        <>

      <section className="section">
        <h3>Experience</h3>
        {formData.experience && formData.experience.map((exp, index) => (
          <div key={index} className="entry-item">
            <div className="entry-item-content">
              <strong>{exp.jobTitle}</strong>
              <span className="entry-item-sub">{exp.company}</span>
            </div>
            <div className="entry-item-actions">
              <button className="edit-btn" onClick={() => onOpenModal('experience', index)} title="Edit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="delete-btn" onClick={() => handleDeleteEntry('experience', index)} title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
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
            <div className="entry-item-actions">
              <button className="edit-btn" onClick={() => onOpenModal('education', index)} title="Edit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="delete-btn" onClick={() => handleDeleteEntry('education', index)} title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
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
            <div className="entry-item-actions">
              <button className="edit-btn" onClick={() => onOpenModal('skills', index)} title="Edit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="delete-btn" onClick={() => handleDeleteEntry('skills', index)} title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
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
            <div className="entry-item-actions">
              <button className="edit-btn" onClick={() => onOpenModal('interests', index)} title="Edit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="delete-btn" onClick={() => handleDeleteEntry('interests', index)} title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
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
            <div className="entry-item-actions">
              <button className="edit-btn" onClick={() => onOpenModal('volunteer', index)} title="Edit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="delete-btn" onClick={() => handleDeleteEntry('volunteer', index)} title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
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
            <div className="entry-item-actions">
              <button className="edit-btn" onClick={() => onOpenModal('project', index)} title="Edit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="delete-btn" onClick={() => handleDeleteEntry('projects', index)} title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
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
            <div className="entry-item-actions">
              <button className="edit-btn" onClick={() => onOpenModal('certification', index)} title="Edit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="delete-btn" onClick={() => handleDeleteEntry('certifications', index)} title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
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
            <div className="entry-item-actions">
              <button className="edit-btn" onClick={() => onOpenModal('language', index)} title="Edit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="delete-btn" onClick={() => handleDeleteEntry('languages', index)} title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
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
            <div className="entry-item-actions">
              <button className="edit-btn" onClick={() => onOpenModal('reference', index)} title="Edit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="delete-btn" onClick={() => handleDeleteEntry('references', index)} title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
        <button className="add-section-btn" onClick={() => onOpenModal('reference')}>
          + Add Reference
        </button>
      </section>
        </>
      )}
      </aside>
    </>
  )
}

export default Sidebar
