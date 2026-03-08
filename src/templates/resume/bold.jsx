import './bold.css'
import ResumeContent from './ResumeContent'

function BoldTemplate({ data }) {
  return (
    <div className="resume-template bold">
      <div className="resume-header">
        <h1>{data.fullName || 'Your Name'}</h1>
        <div className="contact-info">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
          {data.website && <span>{data.website}</span>}
        </div>
      </div>
      <ResumeContent data={data} />
    </div>
  )
}

export default BoldTemplate
