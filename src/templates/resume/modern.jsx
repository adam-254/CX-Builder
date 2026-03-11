import './modern.css'
import ResumeContent from './ResumeContent'

function ModernTemplate({ data, pageNumber, sectionsToShow }) {
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
    <div className="resume-template modern">
      <div className="decorative-circle decorative-circle-1"></div>
      <div className="decorative-circle decorative-circle-2"></div>
      {showHeader && data.fullName && (
        <div className="resume-header">
          <div className="header-top">
            <div className="title-line"></div>
            {data.professionalTitle && <div className="job-title">{data.professionalTitle}</div>}
          </div>
          <h1>{data.fullName}</h1>
          <div className="contact-info">
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
            {data.github && (
              <div className="contact-item">
                <div className="contact-label">GITHUB</div>
                <div className="contact-value">{data.github}</div>
              </div>
            )}
          </div>
        </div>
      )}
      <ResumeContent data={filteredData} />
    </div>
  )
}

export default ModernTemplate
