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
      {showHeader && data.fullName && (
        <div className="resume-header">
          <div className="accent-line"></div>
          <h1>{data.fullName}</h1>
          <div className="contact-info">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.linkedin && <span>{data.linkedin}</span>}
            {data.website && <span>{data.website}</span>}
          </div>
        </div>
      )}
      <ResumeContent data={filteredData} />
    </div>
  )
}

export default ModernTemplate
