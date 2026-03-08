import './elegant.css'

function ElegantCoverLetter({ data }) {
  return (
    <div className="cover-letter-template elegant">
      <div className="letter-header">
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

export default ElegantCoverLetter
