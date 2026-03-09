import './executive.css'

function ExecutiveTemplate({ data, pageNumber, sectionsToShow }) {
  const showHeader = !sectionsToShow || sectionsToShow.includes('header');
  const showSummary = !sectionsToShow || sectionsToShow.includes('summary');
  const showExperience = !sectionsToShow || sectionsToShow.includes('experience');
  const showProjects = !sectionsToShow || sectionsToShow.includes('projects');
  const showVolunteer = !sectionsToShow || sectionsToShow.includes('volunteer');
  const showLanguages = !sectionsToShow || sectionsToShow.includes('languages');
  const showInterests = !sectionsToShow || sectionsToShow.includes('interests');
  const showReferences = !sectionsToShow || sectionsToShow.includes('references');

  return (
    <div className="resume-template executive">
      {/* Header - Full Width */}
      {showHeader && data.fullName && (
        <div className="executive-header">
          <h1>{data.fullName}</h1>
          {data.title && <div className="job-title">{data.title}</div>}
        </div>
      )}
      
      {/* Left Sidebar */}
      <div className="executive-sidebar">
        {/* Contact Info */}
        {showHeader && (
          <div className="sidebar-section">
            {data.email && (
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="contact-text">{data.email}</div>
              </div>
            )}
            {data.phone && (
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="contact-text">{data.phone}</div>
              </div>
            )}
            {data.linkedin && (
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="contact-text">{data.linkedin}</div>
              </div>
            )}
            {data.website && (
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="contact-text">{data.website}</div>
              </div>
            )}
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="sidebar-section">
            <h2>SKILLS</h2>
            {data.skills.map((skill, index) => (
              <div key={index} className="sidebar-item">
                {skill.category || skill.skills}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="sidebar-section">
            <h2>EDUCATION</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="sidebar-entry">
                <div className="sidebar-title">{edu.degree}</div>
                <div className="sidebar-subtitle">{edu.institution}</div>
                <div className="sidebar-date">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="sidebar-section">
            <h2>CERTIFICATIONS</h2>
            {data.certifications.map((cert, index) => (
              <div key={index} className="sidebar-entry">
                <div className="sidebar-title">{cert.name}</div>
                <div className="sidebar-subtitle">{cert.issuer}</div>
                {cert.date && <div className="sidebar-date">{cert.date}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div className="executive-main">
        {/* Summary */}
        {showSummary && data.summary && (
          <section className="main-section">
            <h2>SUMMARY</h2>
            <p className="summary-text">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {showExperience && data.experience && data.experience.length > 0 && (
          <section className="main-section">
            <h2>PROFESSIONAL EXPERIENCE</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="entry">
                <div className="entry-header">
                  <div>
                    <h3>{exp.jobTitle}</h3>
                    <div className="company">{exp.company}</div>
                  </div>
                  <div className="entry-date">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.location && <div className="location">{exp.location}</div>}
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

        {/* Projects */}
        {showProjects && data.projects && data.projects.length > 0 && (
          <section className="main-section">
            <h2>PROJECTS</h2>
            {data.projects.map((project, index) => (
              <div key={index} className="entry">
                <div className="entry-header">
                  <h3>{project.name}</h3>
                  {project.date && <div className="entry-date">{project.date}</div>}
                </div>
                {project.url && <div className="project-url">{project.url}</div>}
                {project.description && (
                  <ul className="description-list">
                    {project.description.split('\n').filter(line => line.trim()).map((line, i) => (
                      <li key={i}>{line.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Volunteer */}
        {showVolunteer && data.volunteer && data.volunteer.length > 0 && (
          <section className="main-section">
            <h2>VOLUNTEER EXPERIENCE</h2>
            {data.volunteer.map((vol, index) => (
              <div key={index} className="entry">
                <div className="entry-header">
                  <div>
                    <h3>{vol.role}</h3>
                    <div className="company">{vol.organization}</div>
                  </div>
                  <div className="entry-date">
                    {vol.startDate} - {vol.current ? 'Present' : vol.endDate}
                  </div>
                </div>
                {vol.location && <div className="location">{vol.location}</div>}
                {vol.description && (
                  <ul className="description-list">
                    {vol.description.split('\n').filter(line => line.trim()).map((line, i) => (
                      <li key={i}>{line.trim()}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Languages */}
        {showLanguages && data.languages && data.languages.length > 0 && (
          <section className="main-section">
            <h2>LANGUAGES</h2>
            <div className="languages-list">
              {data.languages.map((lang, index) => (
                <span key={index} className="language-item">
                  {lang.language} ({lang.proficiency})
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Interests */}
        {showInterests && data.interests && data.interests.length > 0 && (
          <section className="main-section">
            <h2>INTERESTS</h2>
            {data.interests.map((interest, index) => (
              <p key={index}>{interest.interests}</p>
            ))}
          </section>
        )}

        {/* References */}
        {showReferences && data.references && data.references.length > 0 && (
          <section className="main-section">
            <h2>REFERENCES</h2>
            {data.references.some(ref => ref.availableUponRequest) ? (
              <p className="available-upon-request">References available upon request</p>
            ) : (
              data.references.map((ref, index) => (
                <div key={index} className="entry">
                  <h3>{ref.name}</h3>
                  <div className="company">{ref.position}{ref.company && ` at ${ref.company}`}</div>
                  <div>
                    {ref.email && <span>{ref.email}</span>}
                    {ref.phone && <span> • {ref.phone}</span>}
                  </div>
                </div>
              ))
            )}
          </section>
        )}
      </div>
    </div>
  )
}

export default ExecutiveTemplate
