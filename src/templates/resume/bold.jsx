import './bold.css'

function BoldTemplate({ data, sectionsToShow = [] }) {
  const getInitials = (name) => {
    if (!name) return 'YN'
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const shouldShow = (section) => {
    return sectionsToShow.length === 0 || sectionsToShow.includes(section)
  }

  return (
    <div className="resume-template bold">
      {shouldShow('header') && (
        <div className="bold-header">
          <div className="header-dark-bar">
            <div className="initials-badge">{getInitials(data.fullName)}</div>
          </div>
          <div className="header-content">
            <h1>{data.fullName || 'YOUR NAME'}</h1>
            <p className="title-line">{data.professionalTitle || 'YOUR TITLE HERE'}</p>
          </div>
        </div>
      )}

      <div className="bold-layout">
        <aside className="bold-sidebar">
          {shouldShow('header') && (
            <div className="sidebar-section contact-section">
              <div className="contact-info-bold">
                {data.linkedin && (
                  <div className="contact-item">
                    <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>{data.linkedin}</span>
                  </div>
                )}
                {data.phone && (
                  <div className="contact-item">
                    <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
                    </svg>
                    <span>{data.phone}</span>
                  </div>
                )}
                {data.email && (
                  <div className="contact-item">
                    <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                    </svg>
                    <span>{data.email}</span>
                  </div>
                )}
                {data.website && (
                  <div className="contact-item">
                    <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
                    </svg>
                    <span>{data.website}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {shouldShow('education') && data.education && data.education.length > 0 && (
            <div className="sidebar-section">
              <h2>EDUCATION</h2>
              <div className="gold-divider"></div>
              {data.education.map((edu, index) => (
                <div key={index} className="sidebar-entry education-entry">
                  <div className="education-icon-wrapper">
                    <svg className="education-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                    </svg>
                  </div>
                  <div className="education-content">
                    <div className="sidebar-title">{edu.degree}</div>
                    <div className="sidebar-subtitle">{edu.institution}</div>
                    <div className="sidebar-date">{edu.startDate} - {edu.endDate}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {shouldShow('skills') && data.skills && data.skills.length > 0 && (
            <div className="sidebar-section">
              <h2>PROFESSIONAL SKILLS</h2>
              <div className="gold-divider"></div>
              {data.skills.map((skillGroup, index) => (
                <div key={index} className="skill-group-bold">
                  <div className="skill-category">{skillGroup.category}</div>
                  <div className="skill-list">
                    {skillGroup.skills.split(',').map((skill, i) => (
                      <span key={i} className="skill-tag">{skill.trim()}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {shouldShow('languages') && data.languages && data.languages.length > 0 && (
            <div className="sidebar-section">
              <h2>LANGUAGES</h2>
              <div className="gold-divider"></div>
              {data.languages.map((lang, index) => (
                <div key={index} className="sidebar-entry">
                  <div className="sidebar-title">{lang.language}</div>
                  <div className="sidebar-subtitle">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          )}
        </aside>

        <main className="bold-main">
          {shouldShow('summary') && data.summary && (
            <div className="main-section">
              <h2>PERSONAL PROFILE</h2>
              <div className="gold-divider-main"></div>
              <p className="profile-text">{data.summary}</p>
            </div>
          )}

          {shouldShow('experience') && data.experience && data.experience.length > 0 && (
            <div className="main-section">
              <h2>WORK EXPERIENCE</h2>
              <div className="gold-divider-main"></div>
              {data.experience.map((exp, index) => (
                <div key={index} className="experience-entry">
                  <div className="exp-header">
                    <div className="exp-title">{exp.position} / {exp.company}</div>
                    <div className="exp-date">{exp.startDate} - {exp.endDate} / {exp.location}</div>
                  </div>
                  {exp.description && <p className="exp-description">{exp.description}</p>}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="exp-highlights">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {shouldShow('projects') && data.projects && data.projects.length > 0 && (
            <div className="main-section">
              <h2>PROJECTS</h2>
              <div className="gold-divider-main"></div>
              {data.projects.map((project, index) => (
                <div key={index} className="experience-entry">
                  <div className="exp-header">
                    <div className="exp-title">{project.name}</div>
                    {project.date && <div className="exp-date">{project.date}</div>}
                  </div>
                  {project.description && <p className="exp-description">{project.description}</p>}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="exp-highlights">
                      {project.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {shouldShow('certifications') && data.certifications && data.certifications.length > 0 && (
            <div className="main-section">
              <h2>CERTIFICATIONS</h2>
              <div className="gold-divider-main"></div>
              {data.certifications.map((cert, index) => (
                <div key={index} className="experience-entry">
                  <div className="exp-header">
                    <div className="exp-title">{cert.name}</div>
                    {cert.date && <div className="exp-date">{cert.date}</div>}
                  </div>
                  {cert.issuer && <div className="sidebar-subtitle">{cert.issuer}</div>}
                </div>
              ))}
            </div>
          )}

          {shouldShow('volunteer') && data.volunteer && data.volunteer.length > 0 && (
            <div className="main-section">
              <h2>VOLUNTEER EXPERIENCE</h2>
              <div className="gold-divider-main"></div>
              {data.volunteer.map((vol, index) => (
                <div key={index} className="experience-entry">
                  <div className="exp-header">
                    <div className="exp-title">{vol.role} / {vol.organization}</div>
                    <div className="exp-date">{vol.startDate} - {vol.endDate}</div>
                  </div>
                  {vol.description && <p className="exp-description">{vol.description}</p>}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default BoldTemplate
