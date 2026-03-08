import './compact.css'

function CompactCoverLetter({ data }) {
  return (
    <div className="cover-letter-template compact">
      <div className="letter-header">
        <h1>{data.fullName || 'Your Name'}</h1>
        {data.email && <span className="email">{data.email}</span>}
      </div>
      <div className="letter-body">
        <p className="date">{new Date().toLocaleDateString()}</p>
        <p>Dear Hiring Manager,</p>
        <p>Letter content goes here...</p>
      </div>
    </div>
  )
}

export default CompactCoverLetter
