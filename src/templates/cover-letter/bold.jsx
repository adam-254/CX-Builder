import './bold.css'

function BoldCoverLetter({ data }) {
  // Use available form data fields and provide fallbacks
  const fullName = data.fullName || 'Your Name'
  const professionalTitle = data.professionalTitle || 'Professional Title'
  const phone = data.phone || ''
  const email = data.email || ''
  const linkedin = data.linkedin || ''
  const website = data.website || data.github || ''
  const location = data.location || ''
  
  // Cover letter specific fields
  const recipientName = data.recipientName || 'Hiring Manager'
  const companyName = data.companyName || 'Company Name'
  const positionTitle = data.positionTitle || ''
  const companyAddress = data.companyAddress || ''
  const subject = data.subject || ''
  const salutation = data.salutation || 'Dear Hiring Manager,'
  const closing = data.closing || 'Sincerely,'
  
  // Generate initials from full name for photo placeholder
  const generateInitials = (name) => {
    if (!name || name === 'Your Name') return 'YN'
    
    const nameParts = name.trim().split(' ').filter(part => part.length > 0)
    if (nameParts.length === 0) return 'YN'
    if (nameParts.length === 1) return nameParts[0].substring(0, 2).toUpperCase()
    
    const firstInitial = nameParts[0][0].toUpperCase()
    const lastInitial = nameParts[nameParts.length - 1][0].toUpperCase()
    
    return firstInitial + lastInitial
  }

  const userInitials = generateInitials(fullName)
  
  // Bold signature generation - strong and impactful
  const generateBoldSignature = (name, style = 'bold', variation = 0) => {
    if (!name || name === 'Your Name') return null
    
    const nameParts = name.trim().split(' ').filter(part => part.length > 0)
    if (nameParts.length === 0) return null
    
    const firstInitial = nameParts[0][0].toUpperCase()
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0].toUpperCase() : nameParts[0][1]?.toUpperCase() || 'X'
    
    const seed = name.charCodeAt(0) + variation
    
    // Bold signature styles - strong and impactful
    const signatures = {
      bold: [
        {
          type: 'strong_underline',
          firstPos: { x: 15, y: 30, rotation: -2 },
          lastPos: { x: 65, y: 28, rotation: 2 },
          boldLine: `M10,40 L100,38`,
          width: 110,
          height: 50
        },
        {
          type: 'power_stroke',
          firstPos: { x: 20, y: 25, rotation: 0 },
          lastPos: { x: 70, y: 25, rotation: 0 },
          powerStroke: `M15,35 Q50,20 85,35`,
          width: 100,
          height: 45
        }
      ]
    }
    
    const styleSignatures = signatures[style] || signatures.bold
    const signatureIndex = (seed + firstInitial.charCodeAt(0)) % styleSignatures.length
    const selectedSignature = styleSignatures[signatureIndex]
    
    return {
      ...selectedSignature,
      firstInitial,
      lastInitial,
      strokeWidth: 3,
      fontSize: 26
    }
  }
  
  const signatureType = data.signatureType || 'generated'
  const signatureStyle = data.signatureStyle || 'bold'
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
  const defaultContent = `I am writing to express my interest in ${positionTitle ? `the ${positionTitle} position` : 'this position'}${companyName !== 'Company Name' ? ` at ${companyName}` : ''}. When I read the job description, I was excited to apply since I have visited the facility and am highly impressed by the care ${companyName !== 'Company Name' ? companyName : 'your organization'} provides to the chronically ill and disabled youth of the community. I believe the job duties listed align well with my skills. You need someone who is highly organized and effective and who can remain positive and pleasant under strict deadlines. I believe my experience and education serves me well for this role.

In my previous capacity as a Staff Accountant at River Tech, I accurately maintained multiple ledgers within Quickbooks while self-managing multiple projects and learning new concepts regularly under deadlines. I was responsible for compiling the company's financial statements for the purposes of providing it to the auditor. I acted as the liaison between the external audit team and the internal accounting department.

Having worked on many teams and as a people-oriented person, I am very enthusiastic about the possibility to work with a diverse team while managing sole responsibilities as an Accountant. I welcome the opportunity to discuss how my qualifications would be an asset to ${companyName !== 'Company Name' ? companyName + "'s" : 'your'} continued success. My resume is enclosed for your reference.

Thank you for considering my application. I look forward to the possibility of joining your team and helping ${companyName !== 'Company Name' ? companyName : 'your organization'} continue to grow and succeed.`
  
  const coverLetterBody = data.summary || defaultContent
  const paragraphs = processContent(coverLetterBody)

  return (
    <div className="bold-wrapper">
      <div className="bold-page">
        
        {/* HEADER SECTION */}
        <header className="bold-header">
          
          {/* PROFILE PHOTO SECTION */}
          <div className="bold-photo-section">
            <div className="bold-photo-container">
              <div className="bold-photo-placeholder">
                <span className="bold-initials">{userInitials}</span>
              </div>
            </div>
          </div>
          
          {/* NAME AND TITLE SECTION */}
          <div className="bold-name-section">
            <h1 className="bold-name">{fullName.toUpperCase()}</h1>
            <p className="bold-title">{professionalTitle.toUpperCase()}</p>
          </div>
        </header>

        {/* CONTACT BAR */}
        <div className="bold-contact-bar">
          {location && location.trim() && (
            <div className="bold-contact-item">
              <div className="bold-contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span className="bold-contact-text">{location}</span>
            </div>
          )}
          
          {phone && phone.trim() && (
            <div className="bold-contact-item">
              <div className="bold-contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
              </div>
              <span className="bold-contact-text">{phone}</span>
            </div>
          )}
          
          {email && email.trim() && !email.includes('your.email@example.com') && (
            <div className="bold-contact-item">
              <div className="bold-contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <span className="bold-contact-text">{email}</span>
            </div>
          )}
          
          {linkedin && linkedin.trim() && !linkedin.includes('linkedin.com/in/yourprofile') && (
            <div className="bold-contact-item">
              <div className="bold-contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </div>
              <span className="bold-contact-text">{linkedin}</span>
            </div>
          )}
          
          {website && website.trim() && !website.includes('yourwebsite.com') && (
            <div className="bold-contact-item">
              <div className="bold-contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span className="bold-contact-text">{website}</span>
            </div>
          )}
        </div>

        {/* MAIN CONTENT */}
        <main className="bold-main">
          
          {/* DATE */}
          <div className="bold-date-section">
            <p className="bold-date">{currentDate}</p>
          </div>
          
          {/* RECIPIENT INFO */}
          <div className="bold-recipient-section">
            <div className="bold-recipient">
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

          {/* SUBJECT LINE */}
          {subject && (
            <div className="bold-subject-section">
              <p className="bold-subject"><strong>Re: {subject}</strong></p>
            </div>
          )}

          {/* SALUTATION */}
          <div className="bold-salutation-section">
            <p className="bold-salutation">{salutation}</p>
          </div>

          {/* BODY PARAGRAPHS */}
          <div className="bold-content">
            {paragraphs.map((para, i) => (
              <p key={i} className="bold-paragraph">{para}</p>
            ))}
          </div>

          {/* CLOSING AND SIGNATURE */}
          <div className="bold-signature-section">
            <p className="bold-closing">{closing}</p>

            {/* SIGNATURE */}
            {signatureType === 'generated' ? (
              (() => {
                const signature = generateBoldSignature(fullName, signatureStyle, signatureVariation)
                return signature ? (
                  <div className="bold-signature generated-signature">
                    <svg 
                      width={signature.width} 
                      height={signature.height} 
                      viewBox={`0 0 ${signature.width} ${signature.height}`}
                      className="signature-svg"
                    >
                      {/* Bold decorative elements */}
                      {signature.boldLine && (
                        <path d={signature.boldLine} stroke="#2C3E50" strokeWidth={signature.strokeWidth} strokeLinecap="round" />
                      )}
                      
                      {signature.powerStroke && (
                        <path d={signature.powerStroke} stroke="#2C3E50" strokeWidth={signature.strokeWidth} strokeLinecap="round" fill="none" />
                      )}
                      
                      {/* Main initials */}
                      <text
                        x={signature.firstPos.x}
                        y={signature.firstPos.y}
                        fontSize={signature.fontSize}
                        fontFamily="'Times New Roman', serif"
                        fontWeight="600"
                        fill="#2C3E50"
                        className="signature-initial"
                        transform={`rotate(${signature.firstPos.rotation} ${signature.firstPos.x} ${signature.firstPos.y})`}
                      >
                        {signature.firstInitial}
                      </text>
                      
                      <text
                        x={signature.lastPos.x}
                        y={signature.lastPos.y}
                        fontSize={signature.fontSize}
                        fontFamily="'Times New Roman', serif"
                        fontWeight="600"
                        fill="#2C3E50"
                        className="signature-initial"
                        transform={`rotate(${signature.lastPos.rotation} ${signature.lastPos.x} ${signature.lastPos.y})`}
                      >
                        {signature.lastInitial}
                      </text>
                    </svg>
                  </div>
                ) : (
                  <p className="bold-signature text-signature">{fullName}</p>
                )
              })()
            ) : (
              <p className="bold-signature text-signature">{fullName}</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default BoldCoverLetter