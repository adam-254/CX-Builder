import './prism.css'

function PrismCoverLetter({ data }) {
  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  // Extract name and contact info
  const fullName = data.fullName || 'Your Name';
  const professionalTitle = data.professionalTitle || 'Your Professional Title';

  const getInitials = (name) => {
    if (!name) return 'YN';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const initials = getInitials(fullName);

  /* ── inline SVG icons (stroke-based) ── */
  const IconEmail = () => (
    <svg className="prism-contact-icon" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )

  const IconPhone = () => (
    <svg className="prism-contact-icon" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.75-1.75a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )

  const IconPin = () => (
    <svg className="prism-contact-icon" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )

  const IconWeb = () => (
    <svg className="prism-contact-icon" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )

  const IconLinkedIn = () => (
    <svg className="prism-contact-icon" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )

  const IconGitHub = () => (
    <svg className="prism-contact-icon" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  )

  return (
    <div className="prism-cover-letter">

      {/* ══════════════ LEFT SIDEBAR ══════════════ */}
      <aside className="prism-sidebar">

        {/* Dark corner triangles */}
        <div className="prism-triangle-top" />
        <div className="prism-triangle-bottom" />

        {/* Profile photo — sits above the top triangle */}
        <div className="prism-photo-wrap">
          <div className="prism-photo-placeholder">{initials}</div>
        </div>

        {/* Contact details */}
        <div className="prism-contact">
          {data.email && (
            <div className="prism-contact-item">
              <IconEmail />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="prism-contact-item">
              <IconPhone />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="prism-contact-item">
              <IconPin />
              <span>{data.location}</span>
            </div>
          )}
          {data.website && (
            <div className="prism-contact-item">
              <IconWeb />
              <span>{data.website}</span>
            </div>
          )}
          {data.linkedin && (
            <div className="prism-contact-item">
              <IconLinkedIn />
              <span>{data.linkedin}</span>
            </div>
          )}
          {data.github && (
            <div className="prism-contact-item">
              <IconGitHub />
              <span>{data.github}</span>
            </div>
          )}
        </div>

        {/* Thin horizontal rule */}
        <div className="prism-divider" />

        {/* TO block */}
        <div className="prism-to">
          <div className="prism-to__label">To</div>

          {data.recipientName && (
            <div className="prism-to__recipient-name">{data.recipientName}</div>
          )}
          {data.positionTitle && (
            <div className="prism-to__recipient-title">{data.positionTitle}</div>
          )}
          {data.companyName && (
            <div className="prism-to__company-name">{data.companyName}</div>
          )}
          {data.companyAddress && (
            <div className="prism-to__company-address">{data.companyAddress}</div>
          )}

          <div className="prism-to__date-label">Date</div>
          <div className="prism-to__date-value">{formatDate()}</div>
        </div>

      </aside>

      {/* ══════════════ RIGHT MAIN PANEL ══════════════ */}
      <main className="prism-main">

        {/* Name + job title — top of right panel, vertically aligned with photo */}
        <header className="prism-header">
          <h1 className="prism-name">{fullName.toUpperCase()}</h1>
          <p className="prism-job-title">{professionalTitle.toUpperCase()}</p>
        </header>

        {/* "COVER LETTER ——————————" */}
        <div className="prism-section-heading">
          <span className="prism-section-heading__text">Cover Letter</span>
          <span className="prism-section-heading__line" />
        </div>

        {/* Subject Line */}
        {data.subject && (
          <div className="prism-subject">
            <strong>Re: {data.subject}</strong>
          </div>
        )}

        {/* Salutation */}
        <p className="prism-salutation">{data.salutation || 'Dear Hiring Manager,'}</p>

        {/* Body */}
        <div className="prism-letter-body">
          {data.summary ? (
            data.summary.split('\n\n').map((paragraph, index) => (
              <p key={index} className="prism-letter-para">{paragraph}</p>
            ))
          ) : (
            <>
              <p className="prism-letter-para">
                I am writing to express my strong interest in the position at your company. With my background and experience, I believe I have the skills and qualifications necessary to excel in this role.
              </p>
              <p className="prism-letter-para">
                In my current position, I have had the opportunity to develop and execute successful projects across various areas. I have also contributed to strategic development and worked closely with cross-functional teams to ensure successful execution.
              </p>
              <p className="prism-letter-para">
                I am excited about the opportunity to bring my skills and experience to your organization and contribute to the success of your team. Thank you for considering my application. I look forward to the opportunity to discuss my qualifications further.
              </p>
            </>
          )}
        </div>

        {/* Closing + signature */}
        <div className="prism-closing">
          <p className="prism-closing__phrase">{data.closing || 'Sincerely,'}</p>
          
          {/* Signature */}
          <div className="prism-signature-section">
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

      </main>
    </div>
  )
}

export default PrismCoverLetter