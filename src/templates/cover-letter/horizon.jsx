import './horizon.css';

function HorizonCoverLetter({ data }) {
  const getInitials = (name) => {
    if (!name) return 'YN';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  // Extract name parts for display
  const fullName = data.fullName || 'Your Name';

  return (
    <div className="horizon-cover-letter">
      <div className="horizon-paper">

        {/* ── Header ── */}
        <header className="horizon-header">
          <div className="horizon-photo-wrapper">
            {data.photo ? (
              <img src={data.photo} alt={fullName} />
            ) : (
              <div className="horizon-photo-placeholder">{getInitials(fullName)}</div>
            )}
          </div>

          <div className="horizon-name-block">
            <h1 className="horizon-name">{fullName.toUpperCase()}</h1>
            <p className="horizon-title">{(data.professionalTitle || 'Professional Title').toUpperCase()}</p>
          </div>
        </header>

        {/* ── Contact bar ── */}
        <div className="horizon-contact-bar">
          {data.phone && (
            <div className="horizon-contact-item">
              <div className="horizon-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div className="horizon-contact-content">
                <span className="horizon-contact-label">Phone</span>
                <span className="horizon-contact-value">{data.phone}</span>
              </div>
            </div>
          )}
          {data.email && (
            <div className="horizon-contact-item">
              <div className="horizon-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              </div>
              <div className="horizon-contact-content">
                <span className="horizon-contact-label">Email</span>
                <span className="horizon-contact-value">{data.email}</span>
              </div>
            </div>
          )}
          {data.location && (
            <div className="horizon-contact-item">
              <div className="horizon-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="horizon-contact-content">
                <span className="horizon-contact-label">Address</span>
                <span className="horizon-contact-value">{data.location}</span>
              </div>
            </div>
          )}
          {data.website && (
            <div className="horizon-contact-item">
              <div className="horizon-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
              </div>
              <div className="horizon-contact-content">
                <span className="horizon-contact-label">Website</span>
                <span className="horizon-contact-value">{data.website}</span>
              </div>
            </div>
          )}
          {data.linkedin && (
            <div className="horizon-contact-item">
              <div className="horizon-contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="horizon-contact-content">
                <span className="horizon-contact-label">LinkedIn</span>
                <span className="horizon-contact-value">{data.linkedin}</span>
              </div>
            </div>
          )}
          {data.github && (
            <div className="horizon-contact-item">
              <div className="horizon-contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div className="horizon-contact-content">
                <span className="horizon-contact-label">GitHub</span>
                <span className="horizon-contact-value">{data.github}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="horizon-body">

          {/* Date */}
          <p className="horizon-date">{formatDate()}</p>

          {/* Recipient */}
          <div className="horizon-recipient">
            <p className="horizon-recipient-name">{data.recipientName || 'Hiring Manager'}</p>
            <div className="horizon-recipient-address">
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
            <div className="horizon-subject">
              <strong>Re: {data.subject}</strong>
            </div>
          )}

          {/* Salutation */}
          <p className="horizon-salutation">{data.salutation || 'Dear Hiring Manager,'}</p>

          {/* Letter Content */}
          <div className="horizon-letter-content">
            {data.summary ? (
              data.summary.split('\n\n').map((paragraph, index) => (
                <p key={index} className="horizon-paragraph">{paragraph}</p>
              ))
            ) : (
              <>
                <p className="horizon-paragraph">
                  The first paragraph should contain a self-introduction. Write who you are, where your expertise lies, where you found the job posting (or who referred you), and why you want to apply.
                </p>
                <p className="horizon-paragraph">
                  The second paragraph should respond directly to the job description. Describe how your relevant experiences, skills, and abilities help you meet the company's needs. To make that easier, you can (and should) literally include words and phrases from the job description here.
                </p>
                <ul className="horizon-bullets">
                  <li>You can also include a bulleted list of your accomplishments</li>
                  <li>Make sure you quantify (add numbers to) these bullet points</li>
                  <li>A cover letter with numbers is 100% better than one without</li>
                </ul>
                <p className="horizon-paragraph">
                  To go the extra mile, research the company and try to find out what they are doing — and why — given the current state of their industry. Explain how you can fit into that framework, and help push the company forward and achieve any goals you suspect they have.
                </p>
                <p className="horizon-paragraph">
                  The final paragraph is the "call to action" portion of your cover letter. Inform the hiring manager that you'd love to get interviewed. Give them your contact information. Tell them you'll reach out again next week if you don't hear back. Thank them for their time.
                </p>
              </>
            )}
          </div>

          {/* Closing */}
          <div className="horizon-closing">
            <p className="horizon-closing-word">{data.closing || 'Sincerely,'}</p>
            <div className="horizon-signature-section">
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

export default HorizonCoverLetter;