import './creative.css'

function CreativeCoverLetter({ data }) {
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
  
  // Generate initials from full name
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
  const generateCreativeSignature = (name, style = 'creative', variation = 0) => {
    if (!name || name === 'Your Name') return null
    
    const nameParts = name.trim().split(' ').filter(part => part.length > 0)
    if (nameParts.length === 0) return null
    
    const firstInitial = nameParts[0][0].toUpperCase()
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0].toUpperCase() : nameParts[0][1]?.toUpperCase() || 'X'
    
    const seed = name.charCodeAt(0) + variation
    
    // Creative signature styles - artistic and flowing
    const signatures = {
      creative: [
        {
          type: 'flowing_script',
          firstPos: { x: 10, y: 25, rotation: -5 },
          lastPos: { x: 60, y: 30, rotation: 5 },
          decorativeLine: `M5,35 Q30,20 55,35 Q80,50 105,35`,
          width: 110,
          height: 50
        },
        {
          type: 'artistic_flourish',
          firstPos: { x: 15, y: 30, rotation: 0 },
          lastPos: { x: 65, y: 30, rotation: 0 },
          flourish: `M10,40 C20,25 40,45 60,30 C80,15 100,35 110,40`,
          width: 120,
          height: 55
        }
      ]
    }
    
    const styleSignatures = signatures[style] || signatures.creative
    const signatureIndex = (seed + firstInitial.charCodeAt(0)) % styleSignatures.length
    const selectedSignature = styleSignatures[signatureIndex]
    
    return {
      ...selectedSignature,
      firstInitial,
      lastInitial,
      strokeWidth: 2,
      fontSize: 22
    }
  }
  
  const signatureType = data.signatureType || 'generated'
  const signatureStyle = data.signatureStyle || 'creative'
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
  const defaultContent = `I would like to offer my services as a Business Administrator in your company as I'm confident that I meet all the requirements that you are looking for in your hire as listed in your company's website.

As for my educational background and experiences, I completed a 2 year business management course in community college and for some hands on experience, applied to work in small and medium companies for both voluntary and paid internship positions. I worked as an intern for almost 2 years in 4 different companies and when I was confident about my abilities, started looking for permanent positions. It has been 5 years ever since my first job and in the process, I have had the opportunity to learn ample.

As an individual, I am a self driven and self motivated person, always on the lookout for new challenges and experiences as well as opportunities to expand my reach and goals. I work well under pressure, adaptable to changing work environments, flexible and a quick learner, which of all other skills makes me a perfect match for the post.

Looking forward to your email should I be selected following the preliminary screening process. Please leave me a message if you require anything specific, otherwise, I have listed all necessary details in the resume attached. Thank you for taking the time to go through my application.`
  
  const coverLetterBody = data.summary || defaultContent
  const paragraphs = processContent(coverLetterBody)

  return (
    <div className="creative-wrapper">
      <div className="creative-page">
        
        {/* TOP CURVED DOME */}
        <div className="creative-dome">
          
          {/* PROFILE INITIALS SECTION */}
          <div className="creative-initials-section">
            <div className="creative-initials-container">
              <div className="creative-initials-text">{userInitials}</div>
            </div>
          </div>

          {/* CONTACT SECTION */}
          <div className="creative-contact-section">
            <h3 className="creative-contact-title">Contact</h3>
            
            {phone && phone.trim() && (
              <div className="creative-contact-item">
                <div className="creative-contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                  </svg>
                </div>
                <span className="creative-contact-text">{phone}</span>
              </div>
            )}
            
            {email && email.trim() && !email.includes('your.email@example.com') && (
              <div className="creative-contact-item">
                <div className="creative-contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <span className="creative-contact-text">{email}</span>
              </div>
            )}
            
            {location && location.trim() && (
              <div className="creative-contact-item">
                <div className="creative-contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <span className="creative-contact-text">{location}</span>
              </div>
            )}
            
            {linkedin && linkedin.trim() && !linkedin.includes('linkedin.com/in/yourprofile') && (
              <div className="creative-contact-item">
                <div className="creative-contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </div>
                <span className="creative-contact-text">{linkedin}</span>
              </div>
            )}
            
            {website && website.trim() && !website.includes('yourwebsite.com') && (
              <div className="creative-contact-item">
                <div className="creative-contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <span className="creative-contact-text">{website}</span>
              </div>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="creative-main">
          
          {/* HEADER SECTION */}
          <header className="creative-header">
            <h1 className="creative-name">{fullName.toUpperCase()}</h1>
            <div className="creative-divider"></div>
            <p className="creative-document-type">{professionalTitle.toUpperCase()}</p>
          </header>

          {/* RECIPIENT INFO */}
          <div className="creative-recipient-section">
            <div className="creative-date">
              <p>{currentDate}</p>
            </div>
            <div className="creative-recipient">
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
            <div className="creative-subject-section">
              <p className="creative-subject"><strong>Re: {subject}</strong></p>
            </div>
          )}

          {/* SALUTATION */}
          <p className="creative-salutation">{salutation}</p>

          {/* BODY PARAGRAPHS */}
          <div className="creative-content">
            {paragraphs.map((para, i) => (
              <p key={i} className="creative-paragraph">{para}</p>
            ))}
          </div>

          {/* CLOSING AND SIGNATURE */}
          <div className="creative-signature-section">
            <p className="creative-closing">{closing}</p>

            {/* SIGNATURE */}
            {signatureType === 'generated' ? (
              (() => {
                const signature = generateCreativeSignature(fullName, signatureStyle, signatureVariation)
                return signature ? (
                  <div className="creative-signature generated-signature">
                    <svg 
                      width={signature.width} 
                      height={signature.height} 
                      viewBox={`0 0 ${signature.width} ${signature.height}`}
                      className="signature-svg"
                    >
                      {/* Decorative elements */}
                      {signature.decorativeLine && (
                        <path d={signature.decorativeLine} stroke="#FF7A7A" strokeWidth={signature.strokeWidth} strokeLinecap="round" fill="none" />
                      )}
                      
                      {signature.flourish && (
                        <path d={signature.flourish} stroke="#FF7A7A" strokeWidth={signature.strokeWidth} strokeLinecap="round" fill="none" />
                      )}
                      
                      {/* Main initials */}
                      <text
                        x={signature.firstPos.x}
                        y={signature.firstPos.y}
                        fontSize={signature.fontSize}
                        fontFamily="'Dancing Script', cursive"
                        fontWeight="600"
                        fill="#333"
                        className="signature-initial"
                        transform={`rotate(${signature.firstPos.rotation} ${signature.firstPos.x} ${signature.firstPos.y})`}
                      >
                        {signature.firstInitial}
                      </text>
                      
                      <text
                        x={signature.lastPos.x}
                        y={signature.lastPos.y}
                        fontSize={signature.fontSize}
                        fontFamily="'Dancing Script', cursive"
                        fontWeight="600"
                        fill="#333"
                        className="signature-initial"
                        transform={`rotate(${signature.lastPos.rotation} ${signature.lastPos.x} ${signature.lastPos.y})`}
                      >
                        {signature.lastInitial}
                      </text>
                    </svg>
                  </div>
                ) : (
                  <p className="creative-signature text-signature">{fullName}</p>
                )
              })()
            ) : (
              <p className="creative-signature text-signature">{fullName}</p>
            )}
            
            <p className="creative-printed-name">{fullName}</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreativeCoverLetter