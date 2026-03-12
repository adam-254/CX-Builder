import './nexus.css';

function NexusCoverLetter({ data }) {
  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  // Extract name parts for display
  const fullName = data.fullName || 'Your Name';
  
  // Smart name breaking - try to break at a natural point
  const nameParts = fullName.trim().split(' ');
  let nameLine1, nameLine2;
  
  if (nameParts.length <= 2) {
    // Short names stay on one line
    nameLine1 = fullName;
    nameLine2 = '';
  } else if (nameParts.length === 3) {
    // Three names: first name on line 1, last two on line 2
    nameLine1 = nameParts[0];
    nameLine2 = nameParts.slice(1).join(' ');
  } else {
    // Four or more names: split roughly in half
    const midpoint = Math.ceil(nameParts.length / 2);
    nameLine1 = nameParts.slice(0, midpoint).join(' ');
    nameLine2 = nameParts.slice(midpoint).join(' ');
  }

  return (
    <div className="nexus-cover-letter">
      <div className="nexus-paper">

        {/* ── Header ── */}
        <header className="nexus-header">
          <h1 className="nexus-name">
            {nameLine1.toUpperCase()}
            {nameLine2 && <><br />{nameLine2.toUpperCase()}</>}
          </h1>

          <div className="nexus-contact-list">
            {/* Email */}
            {data.email && (
              <div className="nexus-contact-item">
                <div className="nexus-contact-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="2,4 12,13 22,4" />
                  </svg>
                </div>
                <span className="nexus-contact-value">{data.email}</span>
              </div>
            )}

            {/* Phone */}
            {data.phone && (
              <div className="nexus-contact-item">
                <div className="nexus-contact-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <span className="nexus-contact-value">{data.phone}</span>
              </div>
            )}

            {/* Location */}
            {data.location && (
              <div className="nexus-contact-item">
                <div className="nexus-contact-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span className="nexus-contact-value">{data.location}</span>
              </div>
            )}

            {/* Website */}
            {data.website && (
              <div className="nexus-contact-item">
                <div className="nexus-contact-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <ellipse cx="12" cy="12" rx="4" ry="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                  </svg>
                </div>
                <span className="nexus-contact-value">{data.website}</span>
              </div>
            )}

            {/* LinkedIn */}
            {data.linkedin && (
              <div className="nexus-contact-item">
                <div className="nexus-contact-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span className="nexus-contact-value">{data.linkedin}</span>
              </div>
            )}

            {/* GitHub */}
            {data.github && (
              <div className="nexus-contact-item">
                <div className="nexus-contact-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span className="nexus-contact-value">{data.github}</span>
              </div>
            )}
          </div>
        </header>

        {/* ── Gray divider ── */}
        <div className="nexus-divider" />

        {/* ── Body ── */}
        <div className="nexus-body">

          {/* Date */}
          <div className="nexus-date-section">
            <p className="nexus-date">{formatDate()}</p>
          </div>

          {/* Recipient Information */}
          <div className="nexus-recipient-section">
            <p className="nexus-recipient-name">{data.recipientName || 'Hiring Manager'}</p>
            <div className="nexus-recipient-details">
              {data.companyName && <div>{data.companyName}</div>}
              {data.positionTitle && <div>{data.positionTitle}</div>}
              {data.companyAddress && (
                <>
                  {data.companyAddress.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Subject Line */}
          {data.subject && (
            <div className="nexus-subject">
              <strong>Re: {data.subject}</strong>
            </div>
          )}

          {/* Salutation */}
          <p className="nexus-salutation">{data.salutation || 'Dear Hiring Manager,'}</p>

          {/* Letter Content */}
          <div className="nexus-letter-content">
            {data.summary ? (
              data.summary.split('\n\n').map((paragraph, index) => (
                <p key={index} className="nexus-paragraph">{paragraph}</p>
              ))
            ) : (
              <>
                <p className="nexus-paragraph">
                  I am writing to express my strong interest in the position at your company. With my background and experience, I believe I have the skills and qualifications necessary to excel in this role.
                </p>
                <p className="nexus-paragraph">
                  In my current position, I have had the opportunity to develop and execute successful projects across various areas. I have also contributed to strategic development and worked closely with cross-functional teams to ensure successful execution.
                </p>
                <p className="nexus-paragraph">
                  I am excited about the opportunity to bring my skills and experience to your organization and contribute to the success of your team. Thank you for considering my application. I look forward to the opportunity to discuss my qualifications further.
                </p>
              </>
            )}
          </div>

          {/* Closing + Signature */}
          <div className="nexus-closing">
            <p className="nexus-closing-word">{data.closing || 'Best Regards,'}</p>
            <div className="nexus-signature-section">
              {data.signatureStyle && data.signatureStyle !== 'none' ? (
                <div className={`signature signature-${data.signatureStyle}`}>
                  {fullName}
                </div>
              ) : (
                <div className="signature signature-professional">
                  {fullName}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NexusCoverLetter;