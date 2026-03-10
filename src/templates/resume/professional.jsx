import './professional.css'

function ProfessionalTemplate({ data, pageNumber, sectionsToShow }) {
  const showHeader = !sectionsToShow || sectionsToShow.includes('header');
  const showSummary = !sectionsToShow || sectionsToShow.includes('summary');
  const showExperience = !sectionsToShow || sectionsToShow.includes('experience');
  const showProjects = !sectionsToShow || sectionsToShow.includes('projects');
  const showVolunteer = !sectionsToShow || sectionsToShow.includes('volunteer');
  const showReferences = !sectionsToShow || sectionsToShow.includes('references');

  return (
    <div className="resume-template professional">
      {/* Left Column */}
      <div className="professional-left">
        {/* Header */}
        {showHeader && data.fullName && (
          <div className="header-section">
            <h1>{data.fullName}</h1>
            {data.professionalTitle && <div className="job-title">{data.professionalTitle}</div>}
          </div>
        )}

        {/* Profile/Summary */}
        {showSummary && data.summary && (
          <section className="left-section">
            <h2>PROFILE</h2>
            <p className="profile-text">{data.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {showExperience && data.experience && data.experience.length > 0 && (
          <section className="left-section">
            <h2>WORK EXPERIENCE</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-entry">
                <div className="timeline-marker"></div>
                <div className="entry-date-range">
                  {exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}
                </div>
                <div className="entry-location">
                  {exp.company} | {exp.location}
                </div>
                <h3>{exp.jobTitle}</h3>
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
      </div>

      {/* Right Column */}
      <div className="professional-right">
        {/* Contact Info */}
        {showHeader && (
          <section className="right-section contact-section">
            {data.phone && (
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                {data.phone}
              </div>
            )}
            {data.email && (
              <div className="contact-item">
                <span className="contact-icon">✉</span>
                {data.email}
              </div>
            )}
            {data.website && (
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                {data.website}
              </div>
            )}
            {data.linkedin && (
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                {data.linkedin}
              </div>
            )}
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="right-section">
            <h2>EDUCATION</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="education-entry">
                <div className="entry-year">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</div>
                <h3>{edu.institution}</h3>
                <div className="degree-info">{edu.degree}</div>
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

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="right-section">
            <h2>SKILLS</h2>
            <ul className="skills-list">
              {data.skills.map((skill, index) => (
                <li key={index}>{skill.category || skill.skills}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section className="right-section">
            <h2>LANGUAGES</h2>
            {data.languages.map((lang, index) => (
              <div key={index} className="language-entry">
                <div className="language-name">{lang.language}</div>
                <div className="language-level">{lang.proficiency}</div>
              </div>
            ))}
          </section>
        )}

        {/* References */}
        {showReferences && data.references && data.references.length > 0 && (
          <section className="right-section">
            <h2>REFERENCES</h2>
            {data.references.some(ref => ref.availableUponRequest) ? (
              <p className="available-upon-request">Available upon request</p>
            ) : (
              data.references.map((ref, index) => (
                <div key={index} className="reference-entry">
                  <h3>{ref.name}</h3>
                  <div className="reference-position">{ref.position}</div>
                  <div className="reference-company">{ref.company}</div>
                  <div className="reference-contact">
                    {ref.phone && <div>Phone: {ref.phone}</div>}
                    {ref.email && <div>Email: {ref.email}</div>}
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

export default ProfessionalTemplate
