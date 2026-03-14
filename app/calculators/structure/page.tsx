import Link from 'next/link'

export default function Structure() {
  const calculators = [
    { slug: 'concrete-mix', title: 'Concrete Mix Calculator', desc: 'Calculate concrete mix proportions' },
    { slug: 'beam-load', title: 'Beam Load Calculator', desc: 'Calculate beam deflection and stress' },
    { slug: 'unit-converter', title: 'Unit Converter', desc: 'Convert between engineering units' },
  ]

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1>
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
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </nav>

      <main className="container">
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0' }}>Structural Engineering Calculators</h1>
        
        <div className="calculator-grid">
          {calculators.map((calc) => (
            <Link key={calc.slug} href={`/calculators/${calc.slug}`} className="calculator-card">
              <h3>{calc.title}</h3>
              <p>{calc.desc}</p>
            </Link>
          ))}
        </div>

        <div className="disclaimer">
          <strong>Disclaimer:</strong> All calculations are for reference only. 
          Do not use these results as the final basis for engineering design.
        </div>
      </main>

      <footer><div className="container"><p>2026 ProEngineerCalc. All rights reserved.</p></div></footer>
    </>
  )
}
