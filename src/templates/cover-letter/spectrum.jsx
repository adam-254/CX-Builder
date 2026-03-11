import './spectrum.css';

function SpectrumCoverLetter({ data }) {
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
    <div className="spectrum-cover">

      {/* ══════════ HEADER ══════════ */}
      <header className="spectrum-header">

        <svg
          className="spectrum-header-svg"
          viewBox="0 0 794 270"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/*
            Layer 1 – lighter blue accent peek strip on the right.
            Visible as a thin curved strip behind the main wave, right side only.
          */}
          <path
            d="
              M 460 0
              L 794 0
              L 794 110
              C 700 130, 580 120, 460 80
              Z
            "
            fill="#3355cc"
            opacity="0.55"
          />

          {/*
            Layer 2 – main dark navy wave.

            Shape description:
            • Top-left corner → full top edge → top-right corner
            • Right side drops to y=85
            • Sweeping curve: goes from right side (794,85),
              arcs inward (concave from below) reaching its lowest point
              around x=320 y=195, then rises back up to x=0 y=55
            • Left edge back to top-left

            This produces the "wave that dips down in the middle-left"
            with the circle photo sitting over the dip.
          */}
          <path
            d="
              M 0 0
              L 794 0
              L 794 85
              C 680 88, 560 100, 440 125
              C 340 148, 220 200, 80 165
              L 0 148
              Z
            "
            fill="#1a3a8f"
          />
        </svg>

        {/* Circle photo — overlaps the bottom of the wave */}
        <div className="spectrum-photo-wrap">
          {data.photo ? (
            <img src={data.photo} alt={fullName} />
          ) : (
            <div className="spectrum-photo-placeholder">{getInitials(fullName)}</div>
          )}
        </div>

        {/* Name + contacts — on the white area, right of photo */}
        <div className="spectrum-identity">
          <h1 className="spectrum-name">{fullName.toUpperCase()}</h1>
          <div className="spectrum-professional-title">
            {(data.professionalTitle || 'Professional Title').toUpperCase()}
          </div>
          <div className="spectrum-divider" />
          <div className="spectrum-contacts">

            {data.phone && (
              <div className="spectrum-contact-row">
                <span>{data.phone}</span>
                <div className="spectrum-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
              </div>
            )}

            {data.email && (
              <div className="spectrum-contact-row">
                <span>{data.email}</span>
                <div className="spectrum-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M2 7l10 7 10-7"/>
                  </svg>
                </div>
              </div>
            )}

            {data.location && (
              <div className="spectrum-contact-row">
                <span>{data.location}</span>
                <div className="spectrum-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
              </div>
            )}

            {data.linkedin && (
              <div className="spectrum-contact-row">
                <span>{data.linkedin}</span>
                <div className="spectrum-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </div>
            )}

            {data.github && (
              <div className="spectrum-contact-row">
                <span>{data.github}</span>
                <div className="spectrum-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
              </div>
            )}

            {data.website && (
              <div className="spectrum-contact-row">
                <span>{data.website}</span>
                <div className="spectrum-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                  </svg>
                </div>
              </div>
            )}

          </div>
        </div>
      </header>

      {/* ══════════ BODY ══════════ */}
      <main className="spectrum-body">
        {/* Date positioned at upper left */}
        <div className="spectrum-date-section">
          <span className="spectrum-date">{formatDate()}</span>
        </div>

        <div className="spectrum-meta">
          <div className="spectrum-recipient-section">
            <div>{data.recipientName || 'Hiring Manager'}</div>
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
          <div className="spectrum-subject">
            <strong>Re: {data.subject}</strong>
          </div>
        )}

        {/* Salutation */}
        <div className="spectrum-salutation">
          {data.salutation || 'Dear Hiring Manager,'}
        </div>

        <div className="spectrum-letter">
          {data.summary ? (
            data.summary.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            <p>Your cover letter content goes here. This is where you would write about your qualifications, experience, and why you are interested in the position. Make sure to highlight your key achievements and how they align with the company's needs.</p>
          )}
        </div>

        <div className="spectrum-closing">
          <p>{data.closing || 'Sincerely,'}</p>
          <div className="spectrum-signature">
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
          <p className="spectrum-signatory">{fullName}</p>
        </div>

      </main>

      {/* ══════════ FOOTER WAVE ══════════ */}
      <div className="spectrum-footer-wave">
        <svg viewBox="0 0 794 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0 65 C200 25, 400 55, 600 48 C700 44, 750 50, 794 42 L794 110 L0 110 Z"
            fill="#3355cc"
            opacity="0.5"
          />
          <path
            d="M0 80 C180 44, 380 72, 580 65 C690 61, 745 66, 794 58 L794 110 L0 110 Z"
            fill="#1a3a8f"
          />
        </svg>
      </div>

    </div>
  );
}

export default SpectrumCoverLetter;
