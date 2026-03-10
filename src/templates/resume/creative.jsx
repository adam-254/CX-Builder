import './creative.css'

function CreativeTemplate({ data, pageNumber, sectionsToShow }) {
  const showHeader = !sectionsToShow || sectionsToShow.includes('header');
  const showSummary = !sectionsToShow || sectionsToShow.includes('summary');
  const showExperience = !sectionsToShow || sectionsToShow.includes('experience');
  const showProjects = !sectionsToShow || sectionsToShow.includes('projects');
  const showVolunteer = !sectionsToShow || sectionsToShow.includes('volunteer');
  const showLanguages = !sectionsToShow || sectionsToShow.includes('languages');
  const showInterests = !sectionsToShow || sectionsToShow.includes('interests');
  const showReferences = !sectionsToShow || sectionsToShow.includes('references');

  return (
    <div className="resume-template creative">
      {/* Left Dark Side */}
      <div className="creative-left">
        {/* Professional Experience */}
        {showExperience && data.experience && data.experience.length > 0 && (
          <section className="left-section">
            <h2>Professional Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="left-entry">
                <div className="entry-marker"></div>
                <h3>{exp.jobTitle}</h3>
                <div className="company-info">{exp.company}</div>
                <div className="date-location">
                  {exp.location && <span>{exp.location} | </span>}
                  {exp.startDate} - {exp.current ? 'Current' : exp.endDate}
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
        {data.education && data.education.length > 0 && (
          <section className="left-section">
            <h2>Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="left-entry">
                <div className="entry-marker"></div>
                <h3>{edu.degree}</h3>
                <div className="company-info">{edu.institution}</div>
                <div className="date-location">
                  {edu.location && <span>{edu.location} | </span>}
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="left-section">
            <h2>Certifications</h2>
            {data.certifications.map((cert, index) => (
              <div key={index} className="cert-item">
                <div className="cert-marker"></div>
                <div>{cert.name}, {cert.issuer}, {cert.date}</div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Right Bright Side */}
      <div className="creative-right">
        {/* Profile Photo Placeholder & Name */}
        {showHeader && data.fullName && (
          <div className="profile-section">
            <div className="profile-photo">
              {data.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <h1>{data.fullName}</h1>
            {data.professionalTitle && <div className="job-title">{data.professionalTitle}</div>}
          </div>
        )}

        {/* Contact Info */}
        {showHeader && (
          <div className="contact-section">
            {data.email && <div className="contact-item">{data.email}</div>}
            {data.phone && <div className="contact-item">{data.phone}</div>}
            {data.linkedin && <div className="contact-item">{data.linkedin}</div>}
            {data.website && <div className="contact-item">WWW: {data.website}</div>}
          </div>
        )}

        {/* Summary */}
        {showSummary && data.summary && (
          <div className="summary-section">
            <p>{data.summary}</p>
          </div>
        )}

        {/* Key Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="right-section">
            <h2>Key Skills</h2>
            {data.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-dots">
                  <span className="dot filled"></span>
                  <span className="dot filled"></span>
                  <span className="dot filled"></span>
                  <span className="dot filled"></span>
                  <span className="dot"></span>
                </div>
                <div className="skill-name">{skill.category || skill.skills}</div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {showProjects && data.projects && data.projects.length > 0 && (
          <section className="right-section">
            <h2>Projects</h2>
            {data.projects.map((project, index) => (
              <div key={index} className="right-entry">
                <h3>{project.name}</h3>
                {project.url && <div className="project-url">{project.url}</div>}
                {project.description && <p>{project.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Languages */}
        {showLanguages && data.languages && data.languages.length > 0 && (
          <section className="right-section">
            <h2>Languages</h2>
            {data.languages.map((lang, index) => (
              <div key={index} className="language-item">
                {lang.language} - {lang.proficiency}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default CreativeTemplate
