import './executive.css'

function ExecutiveCoverLetter({ data }) {
  // Use available form data fields and provide fallbacks
  const fullName = data.fullName || 'Your Name'
  const professionalTitle = data.professionalTitle || 'Professional Title'
  const phone = data.phone || ''
  const email = data.email || ''
  const linkedin = data.linkedin || ''
  const website = data.website || data.github || ''
  
  // Cover letter specific fields
  const recipientName = data.recipientName || 'Hiring Manager'
  const companyName = data.companyName || 'Company Name'
  const positionTitle = data.positionTitle || ''
  const companyAddress = data.companyAddress || ''
  const subject = data.subject || ''
  const salutation = data.salutation || 'Dear Hiring Manager,'
  const closing = data.closing || 'Sincerely,'
  
  // Executive signature generation - bold and professional
  const generateExecutiveSignature = (name, style = 'executive', variation = 0) => {
    if (!name || name === 'Your Name') return null
    
    const nameParts = name.trim().split(' ').filter(part => part.length > 0)
    if (nameParts.length === 0) return null
    
    const firstInitial = nameParts[0][0].toUpperCase()
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0].toUpperCase() : nameParts[0][1]?.toUpperCase() || 'X'
    
    const seed = name.charCodeAt(0) + variation
    
    // Executive signature styles - bold and authoritative
    const signatures = {
      executive: [
        {
          type: 'bold_underline',
          firstPos: { x: 15, y: 30, rotation: 0 },
          lastPos: { x: 55, y: 30, rotation: 0 },
          boldLine: `M10,40 L90,40`,
          width: 100,
          height: 50
        },
        {
          type: 'power_line',
          firstPos: { x: 20, y: 25, rotation: 0 },
          lastPos: { x: 60, y: 25, rotation: 0 },
          powerLines: `M10,35 L100,35 M10,37 L80,37`,
          width: 110,
          height: 45
        }
      ]
    }
    
    const styleSignatures = signatures[style] || signatures.executive
    const signatureIndex = (seed + firstInitial.charCodeAt(0)) % styleSignatures.length
    const selectedSignature = styleSignatures[signatureIndex]
    
    return {
      ...selectedSignature,
      firstInitial,
      lastInitial,
      strokeWidth: 2.5,
      fontSize: 24
    }
  }
  
  const signatureType = data.signatureType || 'generated'
  const signatureStyle = data.signatureStyle || 'executive'
  const signatureVariation = data.signatureVariation || 0
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  
  // Enhanced text processing for better formatting
  const processContent = (text) => {
    if (!text) return []
    
    text = text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n\s*\n+/g, '\n\n')
      .trim()
    
    let paragraphs = text.split(/\n\s*\n/).filter(p => p.trim())
    
    if (paragraphs.length === 1 && text.length > 200) {
      const sentences = text.split(/(?<=[.!?])\s+/)
      paragraphs = []
      let currentParagraph = ''
      
      sentences.forEach((sentence) => {
        sentence = sentence.trim()
        if (sentence) {
          if (currentParagraph && 
              (currentParagraph.split(/[.!?]/).length >= 3 || 
               currentParagraph.length > 300 ||
               sentence.toLowerCase().startsWith('i would') ||
               sentence.toLowerCase().startsWith('thank you'))) {
            paragraphs.push(currentParagraph.trim())
            currentParagraph = sentence
          } else {
            currentParagraph += (currentParagraph ? ' ' : '') + sentence
          }
        }
      })
      
      if (currentParagraph.trim()) {
        paragraphs.push(currentParagraph.trim())
      }
    }
    
    return paragraphs.map(para => {
      para = para.trim()
      
      if (para) {
        para = para.charAt(0).toUpperCase() + para.slice(1)
      }
      
      if (para && !para.match(/[.!?]$/)) {
        para += '.'
      }
      
      para = para
        .replace(/\s+([,.!?;:])/g, '$1')
        .replace(/([.!?])\s*([A-Z])/g, '$1 $2')
        .replace(/\s+/g, ' ')
      
      return para
    }).filter(para => para.length > 10)
  }

  // Use summary as the main cover letter content, or provide default
  const defaultContent = `I am writing to express my strong interest in ${positionTitle ? `the ${positionTitle} position` : 'joining your team'}${companyName !== 'Company Name' ? ` at ${companyName}` : ''}. With my extensive background and proven track record, I am confident I would be a valuable addition to your organization.

My experience and leadership skills align perfectly with your requirements, and I am excited about the opportunity to drive results and contribute to your company's continued success. I am particularly drawn to this role because of the opportunity to leverage my expertise in a challenging and dynamic environment.

I would welcome the opportunity to discuss how my background and strategic vision can benefit your organization. Thank you for your consideration, and I look forward to hearing from you soon.`
  
  const coverLetterBody = data.summary || defaultContent
  const paragraphs = processContent(coverLetterBody)

  return (
    <div className="executive-wrapper">
      <div className="executive-page">
        
        {/* GRADIENT HEADER */}
        <header className="executive-header">
          <div className="executive-header-content">
            <div className="executive-name-section">
              <h1 className="executive-name">{fullName.toUpperCase()}</h1>
              <p className="executive-title">{professionalTitle}</p>
            </div>
            
            {/* CONTACT GRID WITH ICONS */}
            <div className="executive-contact-grid">
              {phone && phone.trim() && (
                <div className="executive-contact-item">
                  <div className="executive-contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                    </svg>
                  </div>
                  <div className="executive-contact-content">
                    <div className="executive-contact-label">Phone</div>
                    <div className="executive-contact-value">{phone}</div>
                  </div>
                </div>
              )}
              
              {data.location && data.location.trim() && (
                <div className="executive-contact-item">
                  <div className="executive-contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div className="executive-contact-content">
                    <div className="executive-contact-label">Address</div>
                    <div className="executive-contact-value">{data.location}</div>
                  </div>
                </div>
              )}
              
              {email && email.trim() && !email.includes('your.email@example.com') && (
                <div className="executive-contact-item">
                  <div className="executive-contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div className="executive-contact-content">
                    <div className="executive-contact-label">Email</div>
                    <div className="executive-contact-value">{email}</div>
                  </div>
                </div>
              )}
              
              {linkedin && linkedin.trim() && !linkedin.includes('linkedin.com/in/yourprofile') && (
                <div className="executive-contact-item">
                  <div className="executive-contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </div>
                  <div className="executive-contact-content">
                    <div className="executive-contact-label">LinkedIn</div>
                    <div className="executive-contact-value">{linkedin}</div>
                  </div>
                </div>
              )}
              
              {website && website.trim() && !website.includes('yourwebsite.com') && (
                <div className="executive-contact-item">
                  <div className="executive-contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <div className="executive-contact-content">
                    <div className="executive-contact-label">Website</div>
                    <div className="executive-contact-value">{website}</div>
                  </div>
                </div>
              )}
              
              {data.github && data.github.trim() && !website?.includes(data.github) && (
                <div className="executive-contact-item">
                  <div className="executive-contact-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div className="executive-contact-content">
                    <div className="executive-contact-label">GitHub</div>
                    <div className="executive-contact-value">{data.github}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="executive-main">
          
          {/* RECIPIENT INFO */}
          <div className="executive-recipient-section">
            <div className="executive-recipient">
              <p>{recipientName}</p>
              <p>{companyName}</p>
              {positionTitle && <p>{positionTitle}</p>}
              {companyAddress && (
                <>
                  {companyAddress.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* DATE */}
          <div className="executive-date-section">
            <p className="executive-date">{currentDate}</p>
          </div>

          {/* SUBJECT LINE */}
          {subject && subject.trim() && (
            <div className="executive-subject-section">
              <p className="executive-subject"><strong>Re: {subject}</strong></p>
            </div>
          )}

          {/* SALUTATION */}
          <p className="executive-salutation">{salutation}</p>

          {/* BODY PARAGRAPHS */}
          <div className="executive-content">
            {paragraphs.map((para, i) => (
              <p key={i} className="executive-paragraph">{para}</p>
            ))}
          </div>

          {/* CLOSING AND SIGNATURE */}
          <div className="executive-signature-section">
            <p className="executive-closing">{closing}</p>

            {/* SIGNATURE */}
            {signatureType === 'generated' ? (
              (() => {
                const signature = generateExecutiveSignature(fullName, signatureStyle, signatureVariation)
                return signature ? (
                  <div className="executive-signature generated-signature">
                    <svg 
                      width={signature.width} 
                      height={signature.height} 
                      viewBox={`0 0 ${signature.width} ${signature.height}`}
                      className="signature-svg"
                    >
                      {/* Bold decorative elements */}
                      {signature.boldLine && (
                        <path d={signature.boldLine} stroke="#1f2937" strokeWidth={signature.strokeWidth} strokeLinecap="round" />
                      )}
                      
                      {signature.powerLines && (
                        <path d={signature.powerLines} stroke="#1f2937" strokeWidth={signature.strokeWidth} strokeLinecap="round" />
                      )}
                      
                      {/* Main initials */}
                      <text
                        x={signature.firstPos.x}
                        y={signature.firstPos.y}
                        fontSize={signature.fontSize}
                        fontFamily="'Arial Black', sans-serif"
                        fontWeight="900"
                        fill="#1f2937"
                        className="signature-initial"
                      >
                        {signature.firstInitial}
                      </text>
                      
                      <text
                        x={signature.lastPos.x}
                        y={signature.lastPos.y}
                        fontSize={signature.fontSize}
                        fontFamily="'Arial Black', sans-serif"
                        fontWeight="900"
                        fill="#1f2937"
                        className="signature-initial"
                      >
                        {signature.lastInitial}
                      </text>
                    </svg>
                  </div>
                ) : (
                  <p className="executive-signature text-signature">{fullName.toUpperCase()}</p>
                )
              })()
            ) : (
              <p className="executive-signature text-signature">{fullName.toUpperCase()}</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ExecutiveCoverLetter
