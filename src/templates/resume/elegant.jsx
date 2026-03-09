import './elegant.css'

function ElegantTemplate({ data, pageNumber, sectionsToShow }) {
  const showHeader = !sectionsToShow || sectionsToShow.includes('header');
  const showSummary = !sectionsToShow || sectionsToShow.includes('summary');
  const showExperience = !sectionsToShow || sectionsToShow.includes('experience');
  const showEducation = !sectionsToShow || sectionsToShow.includes('education');
  const showProjects = !sectionsToShow || sectionsToShow.includes('projects');
  const showVolunteer = !sectionsToShow || sectionsToShow.includes('volunteer');
  const showReferences = !sectionsToShow || sectionsToShow.includes('references');

  return (
    <div className="resume-template elegant">
      {/* Left Sidebar */}
      <div className="elegant-sidebar">
        {/* Profile Photo */}
        {showHeader && data.fullName && (
          <div className="profile-photo">
            {data.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="sidebar-section">
            <h2>
              <span className="section-icon">◆</span>
              SKILLS
            </h2>
            {data.skills.map((skill, index) => (
              <div key={index} className="skill-badge">
                {skill.category || skill.skills}
              </div>
            ))}
          </section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section className="sidebar-section">
            <h2>
              <span className="section-icon">◆</span>
              LANGUAGES
            </h2>
            {data.languages.map((lang, index) => (
              <div key={index} className="language-entry">
                <div className="language-name">{lang.language}</div>
                <div className="language-level">{lang.proficiency}</div>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="sidebar-section">
            <h2>
              <span className="section-icon">◆</span>
              CERTIFICATES
            </h2>
            {data.certifications.map((cert, index) => (
              <div key={index} className="cert-entry">
                <div className="cert-name">{cert.name} ({cert.date})</div>
                <div className="cert-issuer">{cert.issuer}</div>
              </div>
            ))}
          </section>
        )}

        {/* Honor Awards */}
        {data.interests && data.interests.length > 0 && (
          <section className="sidebar-section">
            <h2>
              <span className="section-icon">◆</span>
              INTERESTS
            </h2>
            {data.interests.map((interest, index) => (
              <div key={index} className="interest-item">
                <span className="interest-icon">👤</span>
                {interest.interests}
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Right Main Content */}
      <div className="elegant-main">
        {/* Header */}
        {showHeader && data.fullName && (
          <div className="main-header">
            <h1>{data.fullName}</h1>
            {data.title && <div className="job-title">{data.title}</div>}
            
            {/* Summary */}
            {showSummary && data.summary && (
              <p className="summary-text">{data.summary}</p>
            )}

            {/* Contact Info */}
            <div className="contact-grid">
              {data.email && (
                <div className="contact-item">
                  <span className="contact-icon">✉</span>
                  {data.email}
                </div>
              )}
              {data.phone && (
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  {data.phone}
                </div>
              )}
              {data.linkedin && (
                <div className="contact-item">
                  <span className="contact-icon">🔗</span>
                  {data.linkedin}
                </div>
              )}
              {data.website && (
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  {data.website}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {showExperience && data.experience && data.experience.length > 0 && (
          <section className="main-section">
            <h2>
              <span className="section-icon">◆</span>
              WORK EXPERIENCE
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-entry">
                <div className="entry-header">
                  <div>
                    <h3>{exp.jobTitle}</h3>
                    <div className="company">{exp.company}</div>
                  </div>
                  <div className="entry-meta">
                    <div className="entry-date">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                    {exp.location && <div className="entry-location">{exp.location}</div>}
                  </div>
                </div>
                {exp.description && (
                  <ul className="description-list">
                    {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                      <li key={i}>{line.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {showEducation && data.education && data.education.length > 0 && (
          <section className="main-section">
            <h2>
              <span className="section-icon">◆</span>
              EDUCATION
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="education-entry">
                <div className="entry-header">
                  <div>
                    <h3>{edu.degree}</h3>
                    <div className="company">{edu.institution}</div>
                  </div>
                  <div className="entry-date">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </div>
                </div>
                {edu.description && (
                  <ul className="description-list">
                    {edu.description.split('\n').filter(line => line.trim()).map((line, i) => (
                      <li key={i}>{line.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {showProjects && data.projects && data.projects.length > 0 && (
          <section className="main-section">
            <h2>
              <span className="section-icon">◆</span>
              PROJECTS
            </h2>
            {data.projects.map((project, index) => (
              <div key={index} className="project-entry">
                <h3>{project.name}</h3>
                {project.url && <div className="project-url">{project.url}</div>}
                {project.description && <p>{project.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default ElegantTemplate
