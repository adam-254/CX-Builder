import './compact.css'

function CompactCoverLetter({ data }) {
  const formatDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  // Extract name and contact info
  const fullName = data.fullName || 'Your Name';

  return (
    <div className="compact-cover">

      {/* Top-right wave SVG */}
      <svg className="compact-cover__wave-top" viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="210" cy="-10" rx="155" ry="130" fill="#4e2d6b" opacity="0.55" />
        <ellipse cx="230" cy="20" rx="130" ry="105" fill="#3b2050" opacity="0.75" />
        <ellipse cx="200" cy="-30" rx="110" ry="90" fill="#6b3f8a" opacity="0.35" />
      </svg>

      {/* Bottom-left wave SVG */}
      <svg className="compact-cover__wave-bottom" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="-10" cy="195" rx="145" ry="120" fill="#4e2d6b" opacity="0.55" />
        <ellipse cx="-30" cy="175" rx="120" ry="100" fill="#3b2050" opacity="0.75" />
        <ellipse cx="20" cy="210" rx="100" ry="85" fill="#6b3f8a" opacity="0.35" />
      </svg>

      {/* Main body */}
      <div className="compact-cover__body">

        {/* Sender */}
        <p className="compact-cover__sender-name">{fullName.toUpperCase()}</p>
        

        {/* Date */}
        <p className="compact-cover__date">{formatDate()}</p>

        {/* Recipient Information */}
        {(data.recipientName || data.companyName) && (
          <div className="compact-cover__recipient">
            {data.recipientName && <div className="compact-cover__recipient-name">{data.recipientName}</div>}
            {data.positionTitle && <div className="compact-cover__recipient-title">{data.positionTitle}</div>}
            {data.companyName && <div className="compact-cover__company-name">{data.companyName}</div>}
            {data.companyAddress && (
              <div className="compact-cover__company-address">
                {data.companyAddress.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Subject Line */}
        {data.subject && (
          <div className="compact-cover__subject">
            <strong>Re: {data.subject}</strong>
          </div>
        )}

        {/* Salutation */}
        <p className="compact-cover__salutation">{data.salutation || 'Dear Hiring Manager,'}</p>

        {/* Body paragraphs */}
        <div className="compact-cover__paragraphs">
          {data.summary ? (
            data.summary.split('\n\n').map((paragraph, index) => (
              <p key={index} className="compact-cover__paragraph">{paragraph}</p>
            ))
          ) : (
            <>
              <p className="compact-cover__paragraph">
                I am writing to express my strong interest in the position at your company. With my background and experience, I believe I have the skills and qualifications necessary to excel in this role.
              </p>
              <p className="compact-cover__paragraph">
                In my current position, I have had the opportunity to develop and execute successful projects across various areas. I have also contributed to strategic development and worked closely with cross-functional teams to ensure successful execution.
              </p>
              <p className="compact-cover__paragraph">
                I am excited about the opportunity to bring my skills and experience to your organization and contribute to the success of your team. Thank you for considering my application. I look forward to the opportunity to discuss my qualifications further.
              </p>
            </>
          )}
        </div>

        {/* Closing */}
        <p className="compact-cover__closing">{data.closing || 'Sincerely,'}</p>

        {/* Signature */}
        <div className="compact-cover__signature-section">
          {data.signatureStyle && data.signatureStyle !== 'none' ? (
            <div className={`signature signature-${data.signatureStyle}`}>
              {fullName}
            </div>
          ) : (
            <div className="signature signature-cursive">
              {fullName}
            </div>
          )}
        </div>
      </div>

      {/* Footer contact info */}
      <div className="compact-cover__footer">
        <div className="compact-cover__contact">

          {/* Phone */}
          {data.phone && (
            <div className="compact-cover__contact-item">
              <span>{data.phone}</span>
              <span className="compact-cover__contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
              </span>
            </div>
          )}

          {/* Email */}
          {data.email && (
            <div className="compact-cover__contact-item">
              <span>{data.email}</span>
              <span className="compact-cover__contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </span>
            </div>
          )}

          {/* Website */}
          {data.website && (
            <div className="compact-cover__contact-item">
              <span>{data.website}</span>
              <span className="compact-cover__contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </span>
            </div>
          )}

          {/* LinkedIn */}
          {data.linkedin && (
            <div className="compact-cover__contact-item">
              <span>{data.linkedin}</span>
              <span className="compact-cover__contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </span>
            </div>
          )}

          {/* GitHub */}
          {data.github && (
            <div className="compact-cover__contact-item">
              <span>{data.github}</span>
              <span className="compact-cover__contact-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </span>
            </div>
          )}

        </div>
      </div>

    </div>
  )
}

export default CompactCoverLetter