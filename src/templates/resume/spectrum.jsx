import './spectrum-resume.css'

function SpectrumTemplate({ data, pageNumber, sectionsToShow }) {
  // If sectionsToShow is provided, only render those sections
  const filteredData = sectionsToShow ? {
    ...data,
    summary: sectionsToShow.includes('summary') ? data.summary : '',
    experience: sectionsToShow.includes('experience') ? data.experience : [],
    education: sectionsToShow.includes('education') ? data.education : [],
    skills: sectionsToShow.includes('skills') ? data.skills : [],
    projects: sectionsToShow.includes('projects') ? data.projects : [],
    certifications: sectionsToShow.includes('certifications') ? data.certifications : [],
    volunteer: sectionsToShow.includes('volunteer') ? data.volunteer : [],
    languages: sectionsToShow.includes('languages') ? data.languages : [],
    interests: sectionsToShow.includes('interests') ? data.interests : [],
    references: sectionsToShow.includes('references') ? data.references : []
  } : data;

  const showHeader = !sectionsToShow || sectionsToShow.includes('header');

  const getInitials = (name) => {
    if (!name) return 'MN';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="resume-template spectrum">
      {/* Left Sidebar */}
      <div className="spectrum-sidebar">
        {/* Profile Photo */}
        {showHeader && (
          <div className="profile-section">
            <div className="profile-photo">
              <span className="initials">{getInitials(filteredData.fullName)}</span>
            </div>
          </div>
        )}

        {/* My Contact Section */}
        <div className="sidebar-section">
          <div className="section-header">
            <span className="section-icon">👤</span>
            <h3>My Contact</h3>
          </div>
          <div className="contact-list">
            {filteredData.location && (
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span className="contact-text">{filteredData.location}</span>
              </div>
            )}
            {filteredData.phone && (
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span className="contact-text">{filteredData.phone}</span>
              </div>
            )}
            {filteredData.website && (
              <div className="contact-item">
                <span className="contact-icon">💻</span>
                <span className="contact-text">{filteredData.website}</span>
              </div>
            )}
            {filteredData.email && (
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span className="contact-text">{filteredData.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* My Skills Section */}
        {filteredData.skills && filteredData.skills.length > 0 && (
          <div className="sidebar-section">
            <div className="section-header">
              <span className="section-icon">⚙️</span>
              <h3>My Skills</h3>
            </div>
            <div className="skills-list">
              {filteredData.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-name">{skill.name || skill}</span>
                  <div className="skill-bar-container">
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: `${skill.level || 85}%`}}></div>
                    </div>
                    <div className="skill-handle"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <div className="spectrum-content">
        {/* Header with Name and Title */}
        {showHeader && filteredData.fullName && (
          <div className="content-header">
            <div className="name-section">
              <h1 className="full-name">{filteredData.fullName}</h1>
              {filteredData.title && <p className="job-title">{filteredData.title}</p>}
            </div>
          </div>
        )}

        {/* About Me / Summary */}
        {filteredData.summary && (
          <div className="content-section">
            <div className="content-section-header">
              <span className="header-icon">👤</span>
              <h2>About Me</h2>
            </div>
            <div className="about-content">
              <p>{filteredData.summary}</p>
            </div>
          </div>
        )}

        {/* Education Background */}
        {filteredData.education && filteredData.education.length > 0 && (
          <div className="content-section">
            <div className="content-section-header">
              <span className="header-icon">🎓</span>
              <h2>Education Background</h2>
            </div>
            <div className="education-list">
              {filteredData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-main">
                    <div className="education-info">
                      <h3>{edu.degree}</h3>
                      <div className="education-details">
                        <span className="education-years">{edu.startDate} - {edu.endDate}</span>
                        <span className="education-institution">{edu.institution}</span>
                      </div>
                      <p className="education-description">
                        {edu.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {filteredData.experience && filteredData.experience.length > 0 && (
          <div className="content-section">
            <div className="content-section-header">
              <span className="header-icon">💼</span>
              <h2>Work Experience</h2>
            </div>
            <div className="experience-list">
              {filteredData.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-main">
                    <div className="experience-info">
                      <h3>{exp.position}</h3>
                      <div className="experience-details">
                        <span className="experience-years">{exp.startDate} - {exp.endDate || 'Present'}</span>
                        <span className="experience-company">{exp.company}</span>
                      </div>
                      <p className="experience-description">
                        {exp.description ? 
                          exp.description.split('\n')[0] || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet' :
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {filteredData.references && filteredData.references.length > 0 && (
          <div className="content-section">
            <div className="content-section-header">
              <span className="header-icon">👥</span>
              <h2>References</h2>
            </div>
            <div className="references-grid">
              {filteredData.references.map((ref, index) => (
                <div key={index} className="reference-item">
                  <h4>{ref.name}</h4>
                  <p className="ref-position">{ref.position}</p>
                  <p className="ref-company">{ref.company}</p>
                  {ref.phone && <p className="ref-contact">📞 {ref.phone}</p>}
                  {ref.email && <p className="ref-contact">✉️ {ref.email}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="decorative-elements">
          <div className="decoration decoration-1"></div>
          <div className="decoration decoration-2"></div>
          <div className="decoration decoration-3"></div>
        </div>
      </div>
    </div>
  )
}

export default SpectrumTemplate