import './elegant.css';

function ElegantCoverLetter({ data }) {
  const getInitials = (name) => {
    if (!name) return 'YN';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  // Split name into first + last for styling
  const fullName = data.fullName || 'Your Name';
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <div className="elegant-cover-letter">
      {/* ── HEADER ── */}
      <header className="ecl-header">
        {/* Photo / Initials */}
        <div className="ecl-photo-block">
          {data.photo ? (
            <img src={data.photo} alt={fullName} />
          ) : (
            <div className="ecl-initials-avatar">{getInitials(fullName)}</div>
          )}
        </div>

        {/* Name + Title */}
        <div className="ecl-name-block">
          <div className="ecl-name">
            {firstName.toUpperCase()} <strong>{lastName.toUpperCase()}</strong>
          </div>
          <div className="ecl-job-title">{(data.professionalTitle || 'Professional Title').toUpperCase()}</div>
        </div>

        {/* Contact Sidebar */}
        <aside className="ecl-contact-sidebar">
          {data.phone && (
            <div className="ecl-contact-item">
              <span className="ecl-contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
              </span>
              <span className="ecl-contact-text">{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="ecl-contact-item">
              <span className="ecl-contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </span>
              <span className="ecl-contact-text">{data.location}</span>
            </div>
          )}
          {data.email && (
            <div className="ecl-contact-item">
              <span className="ecl-contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </span>
              <span className="ecl-contact-text">{data.email}</span>
            </div>
          )}
          {data.website && (
            <div className="ecl-contact-item">
              <span className="ecl-contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </span>
              <span className="ecl-contact-text">{data.website}</span>
            </div>
          )}
          {data.linkedin && (
            <div className="ecl-contact-item">
              <span className="ecl-contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </span>
              <span className="ecl-contact-text">{data.linkedin}</span>
            </div>
          )}
          {data.github && (
            <div className="ecl-contact-item">
              <span className="ecl-contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </span>
              <span className="ecl-contact-text">{data.github}</span>
            </div>
          )}
        </aside>
      </header>

      {/* ── BODY ── */}
      <main className="ecl-body">
        {/* Recipient */}
        <div className="ecl-recipient">
          <div>{formatDate()}</div>
          <div>&nbsp;</div>
          <div>{data.recipientName || 'Hiring Manager'}</div>
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
          <div className="ecl-subject">
            <strong>Re: {data.subject}</strong>
          </div>
        )}

        {/* Salutation */}
        <div className="ecl-salutation">
          {data.salutation || 'Dear Hiring Manager,'}
        </div>

        {/* Letter Content */}
        <div className="ecl-paragraph">
          {data.summary ? (
            data.summary.split('\n\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '15px', lineHeight: '1.7' }}>
                {paragraph}
              </p>
            ))
          ) : (
            <p>Your cover letter content goes here. This is where you would write about your qualifications, experience, and why you are interested in the position. Make sure to highlight your key achievements and how they align with the company's needs.</p>
          )}
        </div>

        {/* Closing */}
        <div className="ecl-closing">{data.closing || 'Sincerely,'}</div>
        <div className="ecl-signature">
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
      </main>
    </div>
  );
}

export default ElegantCoverLetter;