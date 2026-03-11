import './tech.css';

function TechCoverLetter({ data }) {
  const getInitials = (name) => {
    if (!name) return 'YN';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  // Extract first and last name from fullName
  const fullName = data.fullName || 'Your Name';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || 'Your';
  const lastName = nameParts.slice(1).join(' ') || 'Name';

  return (
    <div className="tech-cover-letter">
      {/* ── HEADER ── */}
      <header className="tcl-header">
        <div className="tcl-name">
          {firstName.toUpperCase()}
          <span className="tcl-name-diamond"> ◇ </span>
          {lastName.toUpperCase()}
        </div>
        <div className="tcl-title-badge">{(data.professionalTitle || 'UI/UX DEVELOPER').toUpperCase()}</div>
      </header>

      {/* ── CONTENT ── */}
      <div className="tcl-content">
        {/* Sidebar */}
        <aside className="tcl-sidebar">
          {/* Photo / Initials */}
          <div className="tcl-photo-wrap">
            {data.photo ? (
              <img src={data.photo} alt={fullName} />
            ) : (
              <div className="tcl-initials-circle">{getInitials(fullName)}</div>
            )}
          </div>

          {/* Social links */}
          <ul className="tcl-social-list">
            {data.linkedin && (
              <li className="tcl-social-item">
                <span className="tcl-social-icon">
                  {/* LinkedIn */}
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </span>
                <span className="tcl-social-handle">{data.linkedin}</span>
              </li>
            )}
            {data.github && (
              <li className="tcl-social-item">
                <span className="tcl-social-icon">
                  {/* GitHub */}
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </span>
                <span className="tcl-social-handle">{data.github}</span>
              </li>
            )}
            {data.website && (
              <li className="tcl-social-item">
                <span className="tcl-social-icon">
                  {/* Website */}
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </span>
                <span className="tcl-social-handle">{data.website}</span>
              </li>
            )}
          </ul>

          {/* Contact Information */}
          <div className="tcl-contact-info">
            {data.location && (
              <div className="tcl-contact-item">
                <span className="tcl-contact-icon">📍</span>
                <span className="tcl-contact-text">{data.location}</span>
              </div>
            )}
            {data.phone && (
              <div className="tcl-contact-item">
                <span className="tcl-contact-icon">📞</span>
                <span className="tcl-contact-text">{data.phone}</span>
              </div>
            )}
            {data.email && (
              <div className="tcl-contact-item">
                <span className="tcl-contact-icon">✉️</span>
                <span className="tcl-contact-text">{data.email}</span>
              </div>
            )}
          </div>
        </aside>

        {/* Main letter body */}
        <main className="tcl-main">
          {/* Date */}
          <div className="tcl-date">
            <div>{formatDate()}</div>
          </div>

          {/* Recipient */}
          <div className="tcl-recipient">
            <div className="tcl-recipient-label">To:</div>
            <div>{data.recipientName || 'Hiring Manager'}</div>
            <div>Hiring Manager</div>
            <div>{data.companyName || 'Company Name'}</div>
            {data.positionTitle && <div>{data.positionTitle}</div>}
            {data.companyAddress && (
              <>
                {data.companyAddress.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </>
            )}
          </div>

          {/* Subject Line */}
          {data.subject && (
            <div className="tcl-subject-section">
              <div className="tcl-subject"><strong>Re: {data.subject}</strong></div>
            </div>
          )}

          {/* Salutation */}
          <div className="tcl-salutation">{data.salutation || 'Dear Hiring Manager,'}</div>

          {/* Body paragraphs */}
          <div className="tcl-letter-content">
            {data.summary ? (
              data.summary.split('\n\n').map((paragraph, index) => (
                <p key={index} className="tcl-paragraph">{paragraph}</p>
              ))
            ) : (
              <p className="tcl-paragraph">
                Your cover letter content goes here. This is where you would write about your qualifications, experience, and why you are interested in the position. Make sure to highlight your key achievements and how they align with the company's needs.
              </p>
            )}
          </div>

          {/* Closing + signature */}
          <div className="tcl-closing-section">
            <div className="tcl-closing">{data.closing || 'Sincerely,'}</div>
            <div className="tcl-signature">
              {data.signatureStyle && data.signatureStyle !== 'none' ? (
                <div className={`signature signature-${data.signatureStyle}`}>
                  {fullName}
                </div>
              ) : (
                <div className="tcl-signature-name">{fullName}</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TechCoverLetter;