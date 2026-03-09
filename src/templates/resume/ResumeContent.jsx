function ResumeContent({ data }) {
  return (
    <>
      {data.summary && (
        <section className="resume-section">
          <h2>Professional Summary</h2>
          <p className="summary-text">{data.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="resume-section work-history">
          <h2>Work History</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="entry">
              <div className="entry-header">
                <div>
                  <h3>{exp.jobTitle}</h3>
                  <p className="company">{exp.company}</p>
                </div>
                <div className="entry-date">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </div>
              </div>
              {exp.location && <p className="location">{exp.location}</p>}
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

      {data.education && data.education.length > 0 && (
        <section className="resume-section education-section">
          <h2>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="entry">
              <div className="entry-header">
                <div>
                  <h3>{edu.degree}</h3>
                  <p className="company">{edu.institution}</p>
                </div>
                <div className="entry-date">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </div>
              </div>
              {edu.location && <p className="location">{edu.location}</p>}
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

      {data.skills && data.skills.length > 0 && (
        <section className="resume-section skills-section">
          <h2>Skills</h2>
          {data.skills.map((skill, index) => (
            <div key={index} className="skill-group">
              <strong>{skill.category}:</strong> {skill.skills}
            </div>
          ))}
        </section>
      )}

      {data.projects && data.projects.length > 0 && (
        <section className="resume-section">
          <h2>Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="entry">
              <div className="entry-header">
                <h3>{project.name}</h3>
                {project.date && <div className="entry-date">{project.date}</div>}
              </div>
              {project.url && <p className="project-url">{project.url}</p>}
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

      {data.certifications && data.certifications.length > 0 && (
        <section className="resume-section certifications-section">
          <h2>Certifications</h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="entry">
              <div className="entry-header">
                <h3>{cert.name}</h3>
                {cert.date && <div className="entry-date">{cert.date}</div>}
              </div>
              <p className="company">{cert.issuer}</p>
              {cert.url && <p className="project-url">{cert.url}</p>}
            </div>
          ))}
        </section>
      )}

      {data.volunteer && data.volunteer.length > 0 && (
        <section className="resume-section">
          <h2>Volunteer Experience</h2>
          {data.volunteer.map((vol, index) => (
            <div key={index} className="entry">
              <div className="entry-header">
                <div>
                  <h3>{vol.role}</h3>
                  <p className="company">{vol.organization}</p>
                </div>
                <div className="entry-date">
                  {vol.startDate} - {vol.current ? 'Present' : vol.endDate}
                </div>
              </div>
              {vol.location && <p className="location">{vol.location}</p>}
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

      {data.languages && data.languages.length > 0 && (
        <section className="resume-section">
          <h2>Languages</h2>
          <div className="languages-list">
            {data.languages.map((lang, index) => (
              <span key={index} className="language-item">
                {lang.language} ({lang.proficiency})
              </span>
            ))}
          </div>
        </section>
      )}

      {data.interests && data.interests.length > 0 && (
        <section className="resume-section">
          <h2>Interests</h2>
          {data.interests.map((interest, index) => (
            <p key={index}>{interest.interests}</p>
          ))}
        </section>
      )}

      {data.references && data.references.length > 0 && (
        <section className="resume-section">
          <h2>References</h2>
          {data.references.some(ref => ref.availableUponRequest) ? (
            <p className="available-upon-request">References available upon request</p>
          ) : (
            data.references.map((ref, index) => (
              <div key={index} className="entry">
                <h3>{ref.name}</h3>
                <p className="company">{ref.position}{ref.company && ` at ${ref.company}`}</p>
                <p className="contact-info">
                  {ref.email && <span>{ref.email}</span>}
                  {ref.phone && <span>{ref.phone}</span>}
                </p>
              </div>
            ))
          )}
        </section>
      )}
    </>
  )
}

export default ResumeContent
