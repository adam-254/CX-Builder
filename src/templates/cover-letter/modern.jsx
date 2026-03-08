import './modern.css'

function ModernCoverLetter({ data }) {
  return (
    <div className="cover-letter-template modern">
      <div className="letter-header">
        <div className="accent-line"></div>
        <h1>{data.fullName || 'Your Name'}</h1>
        {data.email && <p className="email">{data.email}</p>}
      </div>
      <div className="letter-body">
        <p className="date">{new Date().toLocaleDateString()}</p>
        <p>Dear Hiring Manager,</p>
        <p>Letter content goes here...</p>
      </div>
    </div>
  )
}

export default ModernCoverLetter
