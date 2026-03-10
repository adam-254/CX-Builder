import './compact.css'

function CompactTemplate({ data }) {
  return (
    <div className="resume-template compact">
      <div className="compact-layout">
        {/* Left Column */}
        <div className="compact-left">
          {(data.fullName || data.professionalTitle) && (
            <div className="compact-header">
              {data.fullName && <h1>{data.fullName}</h1>}
              {data.professionalTitle && <div className="compact-title">{data.professionalTitle}</div>}
            </div>
          )}

          {/* Contact Info */}
          {(data.email || data.phone || data.address || data.city || data.linkedin || data.website) && (
            <div className="compact-section">
              <h2>
                <span className="section-icon">●</span>
                CONTACT
              </h2>
              {data.phone && (
                <div className="compact-contact-item">
                  <span className="contact-icon">📞</span>
                  <span>{data.phone}</span>
                </div>
              )}
              {data.email && (
                <div className="compact-contact-item">
                  <span className="contact-icon">✉</span>
                  <span>{data.email}</span>
                </div>
              )}
              {(data.address || data.city) && (
                <div className="compact-contact-item">
                  <span className="contact-icon">📍</span>
                  <span>
                    {data.address && <>{data.address}</>}
                    {data.address && data.city && <>, </>}
                    {data.city}
                  </span>
                </div>
              )}
              {data.linkedin && (
                <div className="compact-contact-item">
                  <span className="contact-icon">🔗</span>
                  <span>{data.linkedin}</span>
                </div>
              )}
              {data.website && (
                <div className="compact-contact-item">
                  <span className="contact-icon">🌐</span>
                  <span>{data.website}</span>
                </div>
              )}
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div className="compact-section">
              <h2>
                <span className="section-icon">●</span>
                EDUCATION
              </h2>
              {data.education.map((edu, index) => (
                <div key={index} className="compact-entry">
                  <div className="compact-entry-title">{edu.degree}</div>
                  <div className="compact-entry-subtitle">{edu.institution}</div>
                  {(edu.startDate || edu.endDate || edu.current) && (
                    <div className="compact-entry-date">
                      {edu.startDate} {(edu.startDate && (edu.endDate || edu.current)) && '- '}
                      {edu.current ? 'Present' : edu.endDate}
                    </div>
                  )}
                  {edu.description && <div className="compact-entry-desc">{edu.description}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="compact-section">
              <h2>
                <span className="section-icon">●</span>
                SKILLS
              </h2>
              <div className="compact-skills-list">
                {data.skills.map((skill, index) => (
                  <div key={index} className="compact-skill-item">
                    <span className="skill-bullet">▪</span>
                    <span>{typeof skill === 'string' ? skill : skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div className="compact-section">
              <h2>
                <span className="section-icon">●</span>
                LANGUAGES
              </h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="compact-language-item">
                  <span className="language-name">{lang.language}</span>
                  {lang.proficiency && (
                    <span className="language-level"> - {lang.proficiency}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div className="compact-section">
              <h2>
                <span className="section-icon">●</span>
                CERTIFICATIONS
              </h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="compact-entry">
                  <div className="compact-entry-title">{cert.name}</div>
                  <div className="compact-entry-subtitle">{cert.issuer}</div>
                  {cert.date && <div className="compact-entry-date">{cert.date}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Interests */}
          {data.interests && data.interests.length > 0 && (
            <div className="compact-section">
              <h2>
                <span className="section-icon">●</span>
                INTERESTS
              </h2>
              <div className="compact-interests-list">
                {data.interests.map((interest, index) => (
                  <span key={index} className="compact-interest-tag">
                    {interest.interests || interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center Divider with Circles */}
        <div className="compact-divider">
          <div className="divider-circle"></div>
          <div className="divider-circle"></div>
          <div className="divider-circle"></div>
        </div>

        {/* Right Column */}
        <div className="compact-right">
          {/* Profile/Summary */}
          {data.summary && (
            <div className="compact-section">
              <h2>
                <span className="section-icon">●</span>
                PROFILE
              </h2>
              <div className="compact-text">{data.summary}</div>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="compact-section">
              <h2>
                <span className="section-icon">●</span>
                EXPERIENCE
              </h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="compact-entry">
                  <div className="compact-entry-header">
                    <div className="compact-entry-title">{exp.position}</div>
                    {(exp.startDate || exp.endDate || exp.current) && (
                      <div className="compact-entry-date">
                        {exp.startDate} {(exp.startDate && (exp.endDate || exp.current)) && '- '}
                        {exp.current ? 'Present' : exp.endDate}
                      </div>
                    )}
                  </div>
                  <div className="compact-entry-subtitle">{exp.company}</div>
                  {exp.location && <div className="compact-entry-location">{exp.location}</div>}
                  {exp.description && (
                    <div className="compact-text">
                      {exp.description.includes('•') || exp.description.includes('\n') ? (
                        <ul>
                          {exp.description.split(/[•\n]/).filter(item => item.trim()).map((item, i) => (
                            <li key={i}>{item.trim()}</li>
                          ))}
                        </ul>
                      ) : (
                        exp.description
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div className="compact-section">
              <h2>
                <span className="section-icon">●</span>
                PROJECTS
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} className="compact-entry">
                  <div className="compact-entry-title">{project.name}</div>
                  {project.url && (
                    <div className="compact-project-url">🔗 {project.url}</div>
                  )}
                  {project.description && <div className="compact-text">{project.description}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Volunteer */}
          {data.volunteer && data.volunteer.length > 0 && (
            <div className="compact-section">
              <h2>
                <span className="section-icon">●</span>
                VOLUNTEER
              </h2>
              {data.volunteer.map((vol, index) => (
                <div key={index} className="compact-entry">
                  <div className="compact-entry-header">
                    <div className="compact-entry-title">{vol.role}</div>
                    {(vol.startDate || vol.endDate || vol.current) && (
                      <div className="compact-entry-date">
                        {vol.startDate} {(vol.startDate && (vol.endDate || vol.current)) && '- '}
                        {vol.current ? 'Present' : vol.endDate}
                      </div>
                    )}
                  </div>
                  <div className="compact-entry-subtitle">{vol.organization}</div>
                  {vol.description && <div className="compact-text">{vol.description}</div>}
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {data.references && data.references.length > 0 && (
            <div className="compact-section">
              <h2>
                <span className="section-icon">●</span>
                REFERENCES
              </h2>
              {data.references.map((ref, index) => (
                <div key={index} className="compact-entry">
                  <div className="compact-entry-title">{ref.name}</div>
                  <div className="compact-entry-subtitle">
                    {ref.position}{ref.position && ref.company && ' / '}{ref.company}
                  </div>
                  {ref.phone && (
                    <div className="compact-contact-item compact-ref-contact">
                      <span className="contact-icon">📞</span>
                      <span>{ref.phone}</span>
                    </div>
                  )}
                  {ref.email && (
                    <div className="compact-contact-item compact-ref-contact">
                      <span className="contact-icon">✉</span>
                      <span>{ref.email}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompactTemplate
