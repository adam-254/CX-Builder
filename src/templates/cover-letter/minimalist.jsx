import './minimalist.css'

function MinimalistCoverLetter({ data }) {
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
  
  // Signature generation for minimalist style
  const generateMinimalistSignature = (name, style = 'elegant', variation = 0) => {
    if (!name || name === 'Your Name') return null
    
    const nameParts = name.trim().split(' ').filter(part => part.length > 0)
    if (nameParts.length === 0) return null
    
    const firstInitial = nameParts[0][0].toUpperCase()
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0].toUpperCase() : nameParts[0][1]?.toUpperCase() || 'X'
    
    const seed = name.charCodeAt(0) + variation
    const rotationOffset = (seed % 6) - 3 // -3 to 3 degrees for subtle rotation
    
    // Minimalist signature styles - clean and simple
    const signatures = {
      elegant: [
        {
          type: 'underline',
          firstPos: { x: 15, y: 30, rotation: 0 + rotationOffset },
          lastPos: { x: 45, y: 30, rotation: 0 + rotationOffset },
          underline: `M10,40 Q35,35 60,40`,
          width: 80,
          height: 50
        },
        {
          type: 'simple',
          firstPos: { x: 20, y: 25, rotation: -2 + rotationOffset },
          lastPos: { x: 50, y: 25, rotation: 2 + rotationOffset },
          dot: { x: 65, y: 25 },
          width: 80,
          height: 40
        }
      ],
      modern: [
        {
          type: 'line',
          firstPos: { x: 15, y: 25, rotation: 0 + rotationOffset },
          lastPos: { x: 45, y: 25, rotation: 0 + rotationOffset },
          line: `M10,35 L60,35`,
          width: 75,
          height: 45
        }
      ]
    }
    
    const styleSignatures = signatures[style] || signatures.elegant
    const signatureIndex = (seed + firstInitial.charCodeAt(0)) % styleSignatures.length
    const selectedSignature = styleSignatures[signatureIndex]
    
    return {
      ...selectedSignature,
      firstInitial,
      lastInitial,
      strokeWidth: 1.5,
      fontSize: 20
    }
  }
  
  const signatureType = data.signatureType || 'generated'
  const signatureStyle = data.signatureStyle || 'elegant'
  const signatureVariation = data.signatureVariation || 0
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  
  // Enhanced text processing for better formatting
  const processContent = (text) => {
    if (!text) return []
    
    // Clean up the text first
    text = text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n\s*\n+/g, '\n\n')
      .trim()
    
    // Split by double line breaks for paragraphs
    let paragraphs = text.split(/\n\s*\n/).filter(p => p.trim())
    
    // If no double breaks found, try to intelligently split content
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
    
    // Clean up paragraphs
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
  const defaultContent = `I am writing to express my strong interest in ${positionTitle ? `the ${positionTitle} position` : 'joining your team'}${companyName !== 'Company Name' ? ` at ${companyName}` : ''}. With my background and experience, I believe I would be a valuable addition to your organization.

My skills and experience align well with your requirements, and I am excited about the opportunity to contribute to your company's success. I am particularly drawn to this role because of the opportunity to apply my expertise in a dynamic environment.

I would welcome the opportunity to discuss how my background and enthusiasm can benefit your team. Thank you for your consideration, and I look forward to hearing from you soon.`
  
  const coverLetterBody = data.summary || defaultContent
  const paragraphs = processContent(coverLetterBody)

  return (
    <div className="minimalist-wrapper">
      <div className="minimalist-page">
        
        {/* HEADER */}
        <header className="minimalist-header">
          <div className="minimalist-name-section">
            <h1 className="minimalist-name">{fullName}</h1>
            <div className="minimalist-title-badge">
              {professionalTitle.toUpperCase()}
            </div>
          </div>
          
          {/* CONTACT INFO ROW */}
          <div className="minimalist-contact-row">
            {phone && phone.trim() && (
              <div className="minimalist-contact-item">
                <svg className="minimalist-contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                <span>{phone}</span>
              </div>
            )}
            
            {email && email.trim() && !email.includes('your.email@example.com') && (
              <div className="minimalist-contact-item">
                <svg className="minimalist-contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>{email}</span>
              </div>
            )}
            
            {data.location && data.location.trim() && (
              <div className="minimalist-contact-item">
                <svg className="minimalist-contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{data.location}</span>
              </div>
            )}
            
            {linkedin && linkedin.trim() && !linkedin.includes('linkedin.com/in/yourprofile') && (
              <div className="minimalist-contact-item">
                <svg className="minimalist-contact-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>{linkedin}</span>
              </div>
            )}
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="minimalist-main">
          
          {/* DATE AND RECIPIENT ROW */}
          <div className="minimalist-top-row">
            <div className="minimalist-recipient">
              <p>{recipientName}</p>
              {companyName && companyName !== 'Company Name' && <p>{companyName}</p>}
              {companyAddress && companyAddress.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="minimalist-date">{currentDate}</div>
          </div>

          {/* SUBJECT LINE */}
          {subject && subject.trim() && (
            <div className="minimalist-subject">
              <strong>Re: {subject}</strong>
            </div>
          )}

          {/* SALUTATION */}
          <p className="minimalist-salutation">{salutation}</p>

          {/* BODY PARAGRAPHS */}
          <div className="minimalist-content">
            {paragraphs.map((para, i) => (
              <p key={i} className="minimalist-paragraph">{para}</p>
            ))}
          </div>

          {/* CLOSING AND SIGNATURE */}
          <div className="minimalist-signature-section">
            <p className="minimalist-closing">{closing}</p>

            {/* SIGNATURE */}
            {signatureType === 'generated' ? (
              (() => {
                const signature = generateMinimalistSignature(fullName, signatureStyle, signatureVariation)
                return signature ? (
                  <div className="minimalist-signature generated-signature">
                    <svg 
                      width={signature.width} 
                      height={signature.height} 
                      viewBox={`0 0 ${signature.width} ${signature.height}`}
                      className="signature-svg"
                    >
                      {/* Decorative elements */}
                      {signature.underline && (
                        <path d={signature.underline} stroke="#D97706" strokeWidth={signature.strokeWidth} fill="none" strokeLinecap="round" />
                      )}
                      
                      {signature.line && (
                        <path d={signature.line} stroke="#D97706" strokeWidth={signature.strokeWidth} strokeLinecap="round" />
                      )}
                      
                      {/* Main initials */}
                      <text
                        x={signature.firstPos.x}
                        y={signature.firstPos.y}
                        fontSize={signature.fontSize}
                        fontFamily="'Inter', sans-serif"
                        fontWeight="600"
                        fill="#D97706"
                        transform={`rotate(${signature.firstPos.rotation} ${signature.firstPos.x} ${signature.firstPos.y})`}
                        className="signature-initial"
                      >
                        {signature.firstInitial}
                      </text>
                      
                      <text
                        x={signature.lastPos.x}
                        y={signature.lastPos.y}
                        fontSize={signature.fontSize}
                        fontFamily="'Inter', sans-serif"
                        fontWeight="600"
                        fill="#D97706"
                        transform={`rotate(${signature.lastPos.rotation} ${signature.lastPos.x} ${signature.lastPos.y})`}
                        className="signature-initial"
                      >
                        {signature.lastInitial}
                      </text>
                      
                      {/* Dot accent */}
                      {signature.dot && (
                        <circle
                          cx={signature.dot.x}
                          cy={signature.dot.y}
                          r="1.5"
                          fill="#D97706"
                        />
                      )}
                    </svg>
                  </div>
                ) : (
                  <p className="minimalist-signature text-signature">{fullName}</p>
                )
              })()
            ) : (
              <p className="minimalist-signature text-signature">{fullName}</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MinimalistCoverLetter
