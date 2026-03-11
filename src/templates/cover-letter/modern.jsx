import './modern.css'

function ModernCoverLetter({ data }) {
  // Use available form data fields and provide fallbacks
  const fullName = data.fullName || 'Your Name'
  const professionalTitle = data.professionalTitle || 'Professional Title'
  const phone = data.phone || 'Your Phone'
  const email = data.email || 'your.email@example.com'
  const linkedin = data.linkedin || 'linkedin.com/in/yourprofile'
  const website = data.website || data.github || 'yourwebsite.com'
  
  // Cover letter specific fields
  const recipientName = data.recipientName || 'Hiring Manager'
  const companyName = data.companyName || 'Company Name'
  const positionTitle = data.positionTitle || ''
  const companyAddress = data.companyAddress || ''
  const subject = data.subject || ''
  const salutation = data.salutation || 'Dear Hiring Manager,'
  const closing = data.closing || 'Sincerely,'
  
  // Ultra-creative signature generation using initials and artistic elements
  const generateCreativeSignature = (name, style = 'elegant', variation = 0) => {
    if (!name || name === 'Your Name') return null
    
    const nameParts = name.trim().split(' ').filter(part => part.length > 0)
    if (nameParts.length === 0) return null
    
    const firstInitial = nameParts[0][0].toUpperCase()
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0].toUpperCase() : nameParts[0][1]?.toUpperCase() || 'X'
    
    const seed = name.charCodeAt(0) + variation
    const rotationOffset = (seed % 10) - 5 // -5 to 5 degrees
    
    const signatures = {
      elegant: [
        // Overlapping initials with flowing underline
        {
          type: 'overlapping',
          firstPos: { x: 20, y: 35, rotation: -15 + rotationOffset },
          lastPos: { x: 35, y: 40, rotation: 10 + rotationOffset },
          underline: `M10,50 Q50,45 90,50 Q130,55 170,50`,
          flourish: `M15,25 Q25,15 35,25 Q45,35 55,25`
        },
        // Initials connected by elegant curve
        {
          type: 'connected',
          firstPos: { x: 15, y: 30, rotation: -10 + rotationOffset },
          lastPos: { x: 80, y: 35, rotation: 15 + rotationOffset },
          connector: `M35,35 Q50,20 65,35`,
          flourish: `M10,45 Q30,55 50,45 Q70,35 90,45`
        },
        // Stacked initials with side flourish
        {
          type: 'stacked',
          firstPos: { x: 25, y: 25, rotation: 0 + rotationOffset },
          lastPos: { x: 25, y: 45, rotation: 0 + rotationOffset },
          sideFlourish: `M50,20 Q70,30 90,20 Q110,35 130,25`,
          underline: `M15,55 Q40,50 65,55`
        }
      ],
      modern: [
        // Angular geometric design
        {
          type: 'geometric',
          firstPos: { x: 20, y: 30, rotation: -20 + rotationOffset },
          lastPos: { x: 60, y: 40, rotation: 20 + rotationOffset },
          geometric: `M10,45 L30,35 L50,45 L70,35 L90,45`,
          accent: `M15,25 L25,15 L35,25`
        },
        // Initials with diagonal strike
        {
          type: 'strike',
          firstPos: { x: 15, y: 35, rotation: -5 + rotationOffset },
          lastPos: { x: 55, y: 35, rotation: 5 + rotationOffset },
          strike: `M5,25 L85,50`,
          dots: [{ x: 90, y: 30 }, { x: 95, y: 35 }]
        },
        // Boxed initials with modern lines
        {
          type: 'boxed',
          firstPos: { x: 20, y: 30, rotation: 0 + rotationOffset },
          lastPos: { x: 50, y: 30, rotation: 0 + rotationOffset },
          box: `M10,15 L70,15 L70,45 L10,45 Z`,
          accent: `M75,20 L95,20 M75,25 L90,25 M75,30 L85,30`
        }
      ],
      classic: [
        // Victorian-style with ornate flourishes
        {
          type: 'victorian',
          firstPos: { x: 25, y: 35, rotation: -8 + rotationOffset },
          lastPos: { x: 55, y: 35, rotation: 8 + rotationOffset },
          ornament: `M10,20 Q20,10 30,20 Q40,30 50,20 Q60,10 70,20 Q80,30 90,20`,
          baseFlourish: `M15,50 Q40,45 65,50 Q90,55 115,50`
        },
        // Calligraphy style with swashes
        {
          type: 'calligraphy',
          firstPos: { x: 20, y: 30, rotation: -12 + rotationOffset },
          lastPos: { x: 70, y: 40, rotation: 18 + rotationOffset },
          swash: `M10,45 Q30,25 50,45 Q70,25 90,45 Q110,25 130,45`,
          accent: `M15,15 Q25,5 35,15`
        }
      ],
      bold: [
        // Strong block letters with power lines
        {
          type: 'power',
          firstPos: { x: 20, y: 35, rotation: 0 + rotationOffset },
          lastPos: { x: 60, y: 35, rotation: 0 + rotationOffset },
          powerLines: `M10,25 L90,25 M10,45 L90,45`,
          emphasis: `M95,30 L105,30 M95,35 L105,35 M95,40 L105,40`
        },
        // Initials with bold underline and dots
        {
          type: 'executive',
          firstPos: { x: 15, y: 30, rotation: -3 + rotationOffset },
          lastPos: { x: 55, y: 30, rotation: 3 + rotationOffset },
          boldLine: `M5,45 L85,45`,
          dots: [{ x: 90, y: 30 }, { x: 95, y: 30 }, { x: 100, y: 30 }]
        }
      ],
      minimal: [
        // Clean initials with subtle line
        {
          type: 'clean',
          firstPos: { x: 20, y: 35, rotation: 0 + rotationOffset },
          lastPos: { x: 50, y: 35, rotation: 0 + rotationOffset },
          subtleLine: `M10,45 L70,45`,
          dot: { x: 75, y: 35 }
        },
        // Spaced initials with connecting arc
        {
          type: 'arc',
          firstPos: { x: 15, y: 35, rotation: 0 + rotationOffset },
          lastPos: { x: 65, y: 35, rotation: 0 + rotationOffset },
          arc: `M25,40 Q40,25 55,40`,
          minimalist: true
        }
      ]
    }
    
    const styleSignatures = signatures[style] || signatures.elegant
    const signatureIndex = (seed + firstInitial.charCodeAt(0) + lastInitial.charCodeAt(0)) % styleSignatures.length
    const selectedSignature = styleSignatures[signatureIndex]
    
    return {
      ...selectedSignature,
      firstInitial,
      lastInitial,
      width: 120,
      height: 70,
      strokeWidth: style === 'bold' ? 3 : style === 'minimal' ? 1.5 : 2,
      fontSize: style === 'bold' ? 28 : style === 'minimal' ? 20 : 24
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
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n\s*\n\s*\n+/g, '\n\n') // Replace multiple line breaks with double breaks
      .trim()
    
    // Split by double line breaks for paragraphs
    let paragraphs = text.split(/\n\s*\n/).filter(p => p.trim())
    
    // If no double breaks found, try to intelligently split content
    if (paragraphs.length === 1 && text.length > 200) {
      const sentences = text.split(/(?<=[.!?])\s+/)
      paragraphs = []
      let currentParagraph = ''
      
      sentences.forEach((sentence, index) => {
        sentence = sentence.trim()
        if (sentence) {
          // Start new paragraph every 2-3 sentences or when paragraph gets long
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
    
    // Clean up paragraphs and ensure proper formatting
    return paragraphs.map(para => {
      para = para.trim()
      
      // Capitalize first letter
      if (para) {
        para = para.charAt(0).toUpperCase() + para.slice(1)
      }
      
      // Ensure paragraph ends with proper punctuation
      if (para && !para.match(/[.!?]$/)) {
        para += '.'
      }
      
      // Fix common spacing issues around punctuation
      para = para
        .replace(/\s+([,.!?;:])/g, '$1') // Remove space before punctuation
        .replace(/([.!?])\s*([A-Z])/g, '$1 $2') // Ensure space after sentence endings
        .replace(/\s+/g, ' ') // Clean up multiple spaces
      
      return para
    }).filter(para => para.length > 10) // Filter out very short paragraphs
  }

  // Use summary as the main cover letter content, or provide default
  const defaultContent = `I am writing to express my strong interest in ${positionTitle ? `the ${positionTitle} position` : 'joining your team'}${companyName !== 'Company Name' ? ` at ${companyName}` : ''}. With my background and experience, I believe I would be a valuable addition to your organization.

My skills and experience align well with your requirements, and I am excited about the opportunity to contribute to your company's success. I am particularly drawn to this role because of the opportunity to apply my expertise in a dynamic environment.

I would welcome the opportunity to discuss how my background and enthusiasm can benefit your team. Thank you for your consideration, and I look forward to hearing from you soon.`

  const coverLetterBody = data.summary || defaultContent
  
  // Process the content for better formatting
  const paragraphs = processContent(coverLetterBody)

  return (
    <div className="coverletter-wrapper">
      <div className="coverletter-page">

        {/* TOP ACCENT BAR */}
        <div className="coverletter-top-bar" />

        {/* HEADER */}
        <header className="coverletter-header">
          <h1 className="coverletter-name">{fullName}</h1>
          <p className="coverletter-pro-title">{professionalTitle.toUpperCase()}</p>
        </header>

        {/* BODY: sidebar + main content */}
        <div className="coverletter-body">

          {/* LEFT SIDEBAR */}
          <aside className="coverletter-sidebar">
            <div className="coverletter-sidebar-inner">
              {phone && phone.trim() && (
                <div className="coverletter-contact-item">
                  <span className="coverletter-contact-icon phone-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                    </svg>
                  </span>
                  <span>{phone}</span>
                </div>
              )}
              
              {email && email.trim() && !email.includes('your.email@example.com') && (
                <div className="coverletter-contact-item">
                  <span className="coverletter-contact-icon email-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </span>
                  <span>{email}</span>
                </div>
              )}
              
              {data.location && data.location.trim() && (
                <div className="coverletter-contact-item">
                  <span className="coverletter-contact-icon location-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </span>
                  <span>{data.location}</span>
                </div>
              )}
              
              {linkedin && linkedin.trim() && !linkedin.includes('linkedin.com/in/yourprofile') && (
                <div className="coverletter-contact-item">
                  <span className="coverletter-contact-icon linkedin-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </span>
                  <span>{linkedin}</span>
                </div>
              )}
              
              {website && website.trim() && !website.includes('yourwebsite.com') && (
                <div className="coverletter-contact-item">
                  <span className="coverletter-contact-icon website-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </span>
                  <span>{website}</span>
                </div>
              )}
              
              {data.github && data.github.trim() && !website?.includes(data.github) && (
                <div className="coverletter-contact-item">
                  <span className="coverletter-contact-icon website-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </span>
                  <span>{data.github}</span>
                </div>
              )}
            </div>
            {/* RIGHT ACCENT BAR on sidebar */}
            <div className="coverletter-sidebar-bar" />
          </aside>

          {/* MAIN LETTER CONTENT */}
          <main className="coverletter-main">
            <div className="coverletter-content">
              <div className="coverletter-body-content">
                {/* Recipient + Date */}
                <div className="coverletter-recipient-row">
                  <div className="coverletter-recipient">
                    <p>{recipientName}</p>
                    {positionTitle && <p>{positionTitle}</p>}
                    <p>{companyName}</p>
                    {companyAddress && companyAddress.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  <div className="coverletter-date">{currentDate}</div>
                </div>

                {/* Subject Line */}
                {subject && subject.trim() && (
                  <div className="coverletter-subject">
                    <strong>Re: {subject}</strong>
                  </div>
                )}

                {/* Salutation */}
                <p className="coverletter-salutation">{salutation}</p>

                {/* Body paragraphs */}
                <div className="coverletter-paragraphs">
                  {paragraphs.map((para, i) => (
                    <p key={i} className="coverletter-para">{para}</p>
                  ))}
                </div>
              </div>

              {/* Signature Section - Always at bottom */}
              <div className="coverletter-signature-section">
                {/* Closing */}
                <p className="coverletter-closing">{closing}</p>

                {/* Signature */}
                {signatureType === 'generated' ? (
                  (() => {
                    const signature = generateCreativeSignature(fullName, signatureStyle, signatureVariation)
                    return signature ? (
                      <div className="coverletter-signature generated-signature">
                        <svg 
                          width={signature.width} 
                          height={signature.height} 
                          viewBox={`0 0 ${signature.width} ${signature.height}`}
                          className="signature-svg"
                        >
                          {/* Render based on signature type */}
                          
                          {/* Background elements first */}
                          {signature.box && (
                            <path d={signature.box} stroke="#1a1a2e" strokeWidth="1" fill="none" opacity="0.3" />
                          )}
                          
                          {signature.powerLines && (
                            <path d={signature.powerLines} stroke="#1a1a2e" strokeWidth={signature.strokeWidth} strokeLinecap="round" />
                          )}
                          
                          {/* Decorative elements */}
                          {signature.underline && (
                            <path d={signature.underline} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 0.8} fill="none" strokeLinecap="round" />
                          )}
                          
                          {signature.connector && (
                            <path d={signature.connector} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 0.6} fill="none" strokeLinecap="round" />
                          )}
                          
                          {signature.strike && (
                            <path d={signature.strike} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 1.2} strokeLinecap="round" />
                          )}
                          
                          {signature.geometric && (
                            <path d={signature.geometric} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 0.7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          )}
                          
                          {signature.ornament && (
                            <path d={signature.ornament} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 0.5} fill="none" strokeLinecap="round" />
                          )}
                          
                          {signature.swash && (
                            <path d={signature.swash} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 0.6} fill="none" strokeLinecap="round" />
                          )}
                          
                          {signature.flourish && (
                            <path d={signature.flourish} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 0.7} fill="none" strokeLinecap="round" />
                          )}
                          
                          {signature.sideFlourish && (
                            <path d={signature.sideFlourish} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 0.6} fill="none" strokeLinecap="round" />
                          )}
                          
                          {signature.baseFlourish && (
                            <path d={signature.baseFlourish} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 0.7} fill="none" strokeLinecap="round" />
                          )}
                          
                          {signature.boldLine && (
                            <path d={signature.boldLine} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 1.5} strokeLinecap="round" />
                          )}
                          
                          {signature.subtleLine && (
                            <path d={signature.subtleLine} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 0.5} strokeLinecap="round" />
                          )}
                          
                          {signature.arc && (
                            <path d={signature.arc} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 0.4} fill="none" strokeLinecap="round" />
                          )}
                          
                          {signature.accent && (
                            <path d={signature.accent} stroke="#1a1a2e" strokeWidth={signature.strokeWidth * 0.8} strokeLinecap="round" />
                          )}
                          
                          {signature.emphasis && (
                            <path d={signature.emphasis} stroke="#1a1a2e" strokeWidth={signature.strokeWidth} strokeLinecap="round" />
                          )}
                          
                          {/* Main initials */}
                          <text
                            x={signature.firstPos.x}
                            y={signature.firstPos.y}
                            fontSize={signature.fontSize}
                            fontFamily="'Crimson Text', serif"
                            fontWeight="600"
                            fontStyle="italic"
                            fill="#1a1a2e"
                            transform={`rotate(${signature.firstPos.rotation} ${signature.firstPos.x} ${signature.firstPos.y})`}
                            className="signature-initial"
                          >
                            {signature.firstInitial}
                          </text>
                          
                          <text
                            x={signature.lastPos.x}
                            y={signature.lastPos.y}
                            fontSize={signature.fontSize}
                            fontFamily="'Crimson Text', serif"
                            fontWeight="600"
                            fontStyle="italic"
                            fill="#1a1a2e"
                            transform={`rotate(${signature.lastPos.rotation} ${signature.lastPos.x} ${signature.lastPos.y})`}
                            className="signature-initial"
                          >
                            {signature.lastInitial}
                          </text>
                          
                          {/* Dots and accents */}
                          {signature.dots && signature.dots.map((dot, index) => (
                            <circle
                              key={index}
                              cx={dot.x}
                              cy={dot.y}
                              r="1.5"
                              fill="#1a1a2e"
                            />
                          ))}
                          
                          {signature.dot && (
                            <circle
                              cx={signature.dot.x}
                              cy={signature.dot.y}
                              r="1"
                              fill="#1a1a2e"
                            />
                          )}
                        </svg>
                      </div>
                    ) : (
                      <p className="coverletter-signature text-signature">{fullName}</p>
                    )
                  })()
                ) : (
                  <p className="coverletter-signature text-signature">{fullName}</p>
                )}
              </div>
            </div>
          </main>
        </div>

        
      </div>
    </div>
  )
}

export default ModernCoverLetter