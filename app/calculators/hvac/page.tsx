import Link from 'next/link'

export default function HVAC() {
  const calculators = [
    { slug: 'dewpoint', title: 'Dew Point Calculator', desc: 'Calculate dew point temperature from altitude, temperature, and humidity' },
    { slug: 'psychrometric', title: 'Psychrometric Calculator', desc: 'Calculate enthalpy, humidity ratio, and other air properties' },
    { slug: 'duct-velocity', title: 'Duct Velocity Calculator', desc: 'Calculate air velocity in rectangular and round ducts' },
    { slug: 'cooling-load', title: 'Cooling Load Estimator', desc: 'Estimate building cooling load quickly' },
    { slug: 'pump-head', title: 'Pump Head Calculator', desc: 'Calculate required pump head for HVAC systems' },
  ]

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1>
          <p className="tagline">Professional Engineering Calculator Toolbox</p>
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
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0' }}>HVAC & Refrigeration Calculators</h1>
        
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
