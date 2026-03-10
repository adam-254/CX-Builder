import './tech.css'

function TechTemplate({ data, pageNumber, sectionsToShow }) {
  // Generate initials from full name
  const getInitials = (name) => {
    if (!name) return 'YN';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Helper to check if section should be shown
  const shouldShow = (section) => {
    return !sectionsToShow || sectionsToShow.length === 0 || sectionsToShow.includes(section);
  };

  return (
    <div className="resume-template tech">
      <div className="tech-layout">
        {/* Left Column */}
        <div className="tech-left-column">
          {/* Header with Profile */}
          {shouldShow('header') && (
            <div className="tech-header">
              <div className="tech-profile-initials">
                {getInitials(data.fullName)}
              </div>
              <div className="tech-header-content">
                <h1>{data.fullName || 'Your Name'}</h1>
                <div className="tech-title">{data.professionalTitle || data.title || 'Professional Title'}</div>
                {shouldShow('summary') && data.summary && (
                  <p className="tech-summary">{data.summary}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Separator Line */}
          {shouldShow('header') && <div className="tech-separator"></div>}

          {/* Work Experience */}
          {shouldShow('experience') && data.experience && data.experience.length > 0 && (
            <div className="tech-section">
              <h2>
                <svg className="tech-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                WORK EXPERIENCE
              </h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="tech-entry">
                  <h3>{exp.position}</h3>
                  <div className="tech-company">
                    {exp.company}
                    {exp.website && (
                      <svg className="tech-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    )}
                  </div>
                  <div className="tech-date">{exp.startDate} - {exp.endDate || 'Present'}</div>
                  {exp.description && (
                    <ul className="tech-description-list">
                      {exp.description.split('\n').filter(item => item.trim()).map((item, i) => (
                        <li key={i}>{item.trim().replace(/^[•\-]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {shouldShow('education') && data.education && data.education.length > 0 && (
            <div className="tech-section">
              <h2>
                <svg className="tech-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                EDUCATION
              </h2>
              {data.education.map((edu, index) => (
                <div key={index} className="tech-entry">
                  <h3>{edu.degree}</h3>
                  <div className="tech-company">{edu.institution}</div>
                  <div className="tech-date">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {shouldShow('projects') && data.projects && data.projects.length > 0 && (
            <div className="tech-section">
              <h2>
                <svg className="tech-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                PROJECTS
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} className="tech-entry">
                  <h3>{project.name}</h3>
                  {project.url && <div className="tech-company">{project.url}</div>}
                  {project.date && <div className="tech-date">{project.date}</div>}
                  {project.description && (
                    <ul className="tech-description-list">
                      {project.description.split('\n').filter(item => item.trim()).map((item, i) => (
                        <li key={i}>{item.trim().replace(/^[•\-]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {shouldShow('certifications') && data.certifications && data.certifications.length > 0 && (
            <div className="tech-section">
              <h2>
                <svg className="tech-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                CERTIFICATIONS
              </h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="tech-entry">
                  <h3>{cert.name}</h3>
                  <div className="tech-company">{cert.issuer}</div>
                  {cert.date && <div className="tech-date">{cert.date}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Volunteer */}
          {shouldShow('volunteer') && data.volunteer && data.volunteer.length > 0 && (
            <div className="tech-section">
              <h2>
                <svg className="tech-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                VOLUNTEER EXPERIENCE
              </h2>
              {data.volunteer.map((vol, index) => (
                <div key={index} className="tech-entry">
                  <h3>{vol.role}</h3>
                  <div className="tech-company">{vol.organization}</div>
                  <div className="tech-date">{vol.startDate} - {vol.endDate || 'Present'}</div>
                  {vol.description && (
                    <ul className="tech-description-list">
                      {vol.description.split('\n').filter(item => item.trim()).map((item, i) => (
                        <li key={i}>{item.trim().replace(/^[•\-]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="tech-sidebar">
          {/* Decorative Circle */}
          <div className="tech-sidebar-circle"></div>
          
          {/* Contact Info */}
          {shouldShow('header') && (
            <div className="tech-sidebar-section tech-contact-section">
              {data.email && (
                <div className="tech-contact-item">
                  <div className="tech-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <span>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="tech-contact-item">
                  <div className="tech-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <span>{data.phone}</span>
                </div>
              )}
              {data.location && (
                <div className="tech-contact-item">
                  <div className="tech-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <span>{data.location}</span>
                </div>
              )}
              {data.linkedin && (
                <div className="tech-contact-item">
                  <div className="tech-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <span>{data.linkedin}</span>
                </div>
              )}
              {data.website && (
                <div className="tech-contact-item">
                  <div className="tech-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                  <span>{data.website}</span>
                </div>
              )}
              {data.github && (
                <div className="tech-contact-item">
                  <div className="tech-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </div>
                  <span>{data.github}</span>
                </div>
              )}
            </div>
          )}

          {/* Skills */}
          {shouldShow('skills') && data.skills && data.skills.length > 0 && (
            <div className="tech-sidebar-section">
              <h2>
                <svg className="tech-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                SKILLS
              </h2>
              {data.skills.map((skillGroup, index) => (
                <div key={index} className="tech-skill-group">
                  <div className="tech-skill-category">{skillGroup.category}</div>
                  <div className="tech-skill-list">{skillGroup.skills}</div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {shouldShow('languages') && data.languages && data.languages.length > 0 && (
            <div className="tech-sidebar-section">
              <h2>
                <svg className="tech-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                LANGUAGES
              </h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="tech-language-item">
                  <div className="tech-language-name">{lang.language}</div>
                  <div className="tech-language-level">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          )}

          {/* Interests */}
          {shouldShow('interests') && data.interests && data.interests.length > 0 && (
            <div className="tech-sidebar-section">
              <h2>
                <svg className="tech-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                INTERESTS
              </h2>
              {data.interests.map((interest, index) => (
                <div key={index} className="tech-interest-item">
                  <svg className="tech-interest-icon" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span>{interest.interest || interest}</span>
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {shouldShow('references') && data.references && data.references.length > 0 && (
            <div className="tech-sidebar-section">
              <h2>
                <svg className="tech-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                REFERENCES
              </h2>
              {data.references.some(ref => ref.availableUponRequest) ? (
                <p className="tech-references-text">Available upon request</p>
              ) : (
                data.references.map((ref, index) => (
                  <div key={index} className="tech-reference-item">
                    <div className="tech-reference-name">{ref.name}</div>
                    <div className="tech-reference-position">{ref.position}</div>
                    {ref.company && <div className="tech-reference-company">{ref.company}</div>}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TechTemplate
