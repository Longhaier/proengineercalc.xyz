'use client'

import Link from 'next/link'

export default function CalculatorPage(props: any) {
  const title = props.title || 'Calculator'
  const description = props.description || 'Calculator description'

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <h1 className="logo">
            <Link href="/">ProEngineerCalc</Link>
          </h1>
          <p className="tagline">Professional Engineering Calculator Tools</p>
        </div>
      </header>

      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/">Home</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </nav>

      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>
            {title}
          </h1>
          
          <div className="calculator-form">
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
              {description}
            </p>
            <p style={{ color: 'var(--text-light)' }}>
              This calculator is coming soon. Check back later!
            </p>
          </div>

          <div className="disclaimer">
            <strong>Disclaimer:</strong> All calculations are for reference only. 
            Do not use these results as the final basis for engineering design. 
            Consult a licensed professional engineer for actual installations.
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>2026 ProEngineerCalc. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
