import './horizon.css'

function HorizonTemplate({ data, pageNumber, sectionsToShow }) {
  // Generate initials from full name
  const getInitials = (name) => {
    if (!name) return 'YN'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // Format date for ATS compatibility
  const formatDate = (date) => {
    if (!date) return ''
    // Convert to MM/YYYY format for ATS
    const d = new Date(date)
    if (isNaN(d.getTime())) return date // Return original if invalid
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
  }

  // Extract metrics from description text
  const highlightMetrics = (text) => {
    if (!text) return text
    // Highlight numbers, percentages, and currency
    return text.replace(/(\d+%|\$[\d,]+|\d+[kK]?\+?|\d+x)/g, '<span class="metric-highlight">$1</span>')
  }

  // If sectionsToShow is provided, only render those sections
  const showHeader = !sectionsToShow || sectionsToShow.includes('header');
  const showSummary = !sectionsToShow || sectionsToShow.includes('summary');
  const showSkills = !sectionsToShow || sectionsToShow.includes('skills');
  const showExperience = !sectionsToShow || sectionsToShow.includes('experience');
  const showEducation = !sectionsToShow || sectionsToShow.includes('education');

  return (
    <div className="resume-template horizon">
      {/* HEADER */}
      {showHeader && data.fullName && (
        <header className="horizon-header">
          <div className="horizon-header-left">
            <h1 className="horizon-name">
              {data.fullName}
            </h1>
            {data.professionalTitle && <p className="horizon-title">{data.professionalTitle.toUpperCase()}</p>}
            <div className="horizon-contacts">
              <div className="horizon-contact-row">
                {data.phone && (
                  <div className="horizon-contact-item">
                    <span className="horizon-contact-icon">☎</span>
                    <span className="horizon-contact-text">{data.phone}</span>
                  </div>
                )}
                {data.email && (
                  <div className="horizon-contact-item">
                    <span className="horizon-contact-icon">✉</span>
                    <span className="horizon-contact-text">{data.email}</span>
                  </div>
                )}
              </div>
              <div className="horizon-contact-row">
                {data.github && (
                  <div className="horizon-contact-item">
                    <span className="horizon-contact-icon">⚡</span>
                    <span className="horizon-contact-text">{data.github}</span>
                  </div>
                )}
                {data.website && (
                  <div className="horizon-contact-item">
                    <span className="horizon-contact-icon">🌐</span>
                    <span className="horizon-contact-text">{data.website}</span>
                  </div>
                )}
              </div>
              {(data.linkedin || data.location) && (
                <div className="horizon-contact-row">
                  {data.linkedin && (
                    <div className="horizon-contact-item">
                      <span className="horizon-contact-icon">🔗</span>
                      <span className="horizon-contact-text">{data.linkedin}</span>
                    </div>
                  )}
                  {data.location && (
                    <div className="horizon-contact-item">
                      <span className="horizon-contact-icon">📍</span>
                      <span className="horizon-contact-text">{data.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="horizon-avatar">
            <span className="horizon-avatar-initials">{getInitials(data.fullName)}</span>
          </div>
        </header>
      )}

      {/* PROFESSIONAL SUMMARY - ATS Optimized */}
      {showSummary && data.summary && (
        <section className="horizon-section">
          <h2 className="horizon-section-title">PROFESSIONAL SUMMARY</h2>
          <p className="horizon-summary-text">{data.summary}</p>
        </section>
      )}

      {/* CORE COMPETENCIES - ATS Friendly Skills */}
      {showSkills && data.skills && data.skills.length > 0 && (
        <section className="horizon-section">
          <h2 className="horizon-section-title">CORE COMPETENCIES</h2>
          <div className="horizon-skills-grid">
            {data.skills.map((skill, index) => (
              <div key={index} className="horizon-skill-item">
                <span className="horizon-skill-name">{skill.skills || skill.category}</span>
                {skill.level && (
                  <div className="horizon-skill-level">
                    <div className="horizon-skill-bar">
                      <div 
                        className="horizon-skill-fill" 
                        style={{width: `${skill.level || 80}%`}}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROFESSIONAL EXPERIENCE - Enhanced with Metrics */}
      {showExperience && data.experience && data.experience.length > 0 && (
        <section className="horizon-section">
          <h2 className="horizon-section-title">PROFESSIONAL EXPERIENCE</h2>
          <div className="horizon-timeline">
            {data.experience.map((job, idx) => (
              <div className="horizon-timeline-item" key={idx}>
                <div className="horizon-timeline-left">
                  <span className="horizon-date">
                    {formatDate(job.startDate)} - {job.current ? 'Present' : formatDate(job.endDate)}
                  </span>
                  {job.location && <span className="horizon-job-location">{job.location}</span>}
                </div>
                <div className="horizon-timeline-dot" />
                <div className="horizon-timeline-right">
                  <div className="horizon-job-header">
                    <h3 className="horizon-job-title">{job.jobTitle}</h3>
                    {job.current && <span className="horizon-current-badge">CURRENT</span>}
                  </div>
                  <p className="horizon-company">{job.company}</p>
                  {job.description && (
                    <ul className="horizon-bullets">
                      {job.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li 
                          key={i} 
                          dangerouslySetInnerHTML={{
                            __html: highlightMetrics(line.trim())
                          }}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION & CREDENTIALS */}
      {showEducation && data.education && data.education.length > 0 && (
        <section className="horizon-section">
          <h2 className="horizon-section-title">EDUCATION & CREDENTIALS</h2>
          <div className="horizon-timeline">
            {data.education.map((edu, idx) => (
              <div className="horizon-timeline-item" key={idx}>
                <div className="horizon-timeline-left">
                  <span className="horizon-date">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </span>
                  {edu.location && <span className="horizon-job-location">{edu.location}</span>}
                </div>
                <div className="horizon-timeline-dot" />
                <div className="horizon-timeline-right">
                  <h3 className="horizon-job-title">{edu.degree}</h3>
                  <p className="horizon-company">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="horizon-gpa">GPA: <span className="metric-highlight">{edu.gpa}</span></p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS & LICENSES */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="horizon-section">
          <h2 className="horizon-section-title">CERTIFICATIONS & LICENSES</h2>
          <div className="horizon-cert-grid">
            {data.certifications.map((cert, idx) => (
              <div className="horizon-cert-item" key={idx}>
                <h4 className="horizon-cert-name">{cert.name}</h4>
                <p className="horizon-cert-issuer">{cert.issuer}</p>
                {cert.date && <span className="horizon-cert-date">{formatDate(cert.date)}</span>}
                {cert.url && <span className="horizon-cert-badge">VERIFIED</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* KEY PROJECTS */}
      {data.projects && data.projects.length > 0 && (
        <section className="horizon-section">
          <h2 className="horizon-section-title">KEY PROJECTS</h2>
          <div className="horizon-timeline">
            {data.projects.map((project, idx) => (
              <div className="horizon-timeline-item" key={idx}>
                <div className="horizon-timeline-left">
                  {project.date && <span className="horizon-date">{formatDate(project.date)}</span>}
                </div>
                <div className="horizon-timeline-dot" />
                <div className="horizon-timeline-right">
                  <div className="horizon-project-header">
                    <h3 className="horizon-job-title">{project.name}</h3>
                    {project.url && <span className="horizon-project-link">🔗 LIVE</span>}
                  </div>
                  {project.description && (
                    <ul className="horizon-bullets">
                      {project.description.split('\n').filter(line => line.trim()).map((line, i) => (
                        <li 
                          key={i} 
                          dangerouslySetInnerHTML={{
                            __html: highlightMetrics(line.trim())
                          }}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ADDITIONAL QUALIFICATIONS */}
      <div className="horizon-additional-section">
        {/* LANGUAGES */}
        {data.languages && data.languages.length > 0 && (
          <div className="horizon-additional-item">
            <h3 className="horizon-additional-title">LANGUAGES</h3>
            <div className="horizon-languages-list">
              {data.languages.map((lang, index) => (
                <span key={index} className="horizon-language-item">
                  {lang.language} <span className="horizon-proficiency">({lang.proficiency})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* INTERESTS */}
        {data.interests && data.interests.length > 0 && (
          <div className="horizon-additional-item">
            <h3 className="horizon-additional-title">PROFESSIONAL INTERESTS</h3>
            <p className="horizon-interests-text">
              {data.interests.map((interest, index) => interest.interests).join(' • ')}
            </p>
          </div>
        )}
      </div>

      {/* REFERENCES */}
      {data.references && data.references.length > 0 && (
        <section className="horizon-section">
          <h2 className="horizon-section-title">PROFESSIONAL REFERENCES</h2>
          {data.references.some(ref => ref.availableUponRequest) ? (
            <p className="horizon-summary-text">Available upon request</p>
          ) : (
            <div className="horizon-references-grid">
              {data.references.map((ref, idx) => (
                <div className="horizon-reference-item" key={idx}>
                  <h4 className="horizon-reference-name">{ref.name}</h4>
                  <p className="horizon-reference-title">{ref.position}</p>
                  <p className="horizon-reference-company">{ref.company}</p>
                  <div className="horizon-reference-contact">
                    {ref.email && <span>✉ {ref.email}</span>}
                    {ref.phone && <span>☎ {ref.phone}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default HorizonTemplate