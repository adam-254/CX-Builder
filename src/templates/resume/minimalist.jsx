import './minimalist.css'
import ResumeContent from './ResumeContent'

function MinimalistTemplate({ data, pageNumber, sectionsToShow }) {
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

  return (
    <div className="resume-template minimalist">
      {showHeader && data.fullName && (
        <div className="resume-header">
          <div className="header-left">
            <div className="initials-box">
              {data.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="header-info">
              <h1>{data.fullName}</h1>
              {data.title && <div className="job-title">{data.title}</div>}
            </div>
          </div>
        </div>
      )}
      
      {showHeader && (
        <>
          {data.summary && (
            <div className="personal-info-section">
              <p className="summary-text">{data.summary}</p>
            </div>
          )}
          
          <div className="contact-section">
            <h2>PERSONAL INFO</h2>
            <div className="contact-grid">
              {data.email && (
                <div className="contact-item">
                  <div className="contact-label">EMAIL</div>
                  <div className="contact-value">{data.email}</div>
                </div>
              )}
              {data.phone && (
                <div className="contact-item">
                  <div className="contact-label">PHONE</div>
                  <div className="contact-value">{data.phone}</div>
                </div>
              )}
              {data.linkedin && (
                <div className="contact-item">
                  <div className="contact-label">LINKEDIN</div>
                  <div className="contact-value">{data.linkedin}</div>
                </div>
              )}
              {data.website && (
                <div className="contact-item">
                  <div className="contact-label">WEBSITE</div>
                  <div className="contact-value">{data.website}</div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      
      <ResumeContent data={filteredData} />
    </div>
  )
}

export default MinimalistTemplate
