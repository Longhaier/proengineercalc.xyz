'use client'

import Link from 'next/link'

export default function CalculatorPage({ title, description }: { title: string, description: string }) {
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
          <Link href="/calculators/hvac">HVAC</Link>
          <Link href="/calculators/electrical">Electrical</Link>
          <Link href="/calculators/fluid">Fluid</Link>
          <Link href="/calculators/structure">Structure</Link>
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

          <div className="content-section">
            <h2>Formula and Principles</h2>
            <p>Content coming soon...</p>
          </div>

          <div className="content-section">
            <h2>User Guide</h2>
            <p>Content coming soon...</p>
          </div>

          <div className="content-section">
            <h2>FAQ</h2>
            <p>Content coming soon...</p>
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
