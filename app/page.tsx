import Link from 'next/link'

const calculators = {
  hvac: [
    { slug: 'dewpoint', title: 'Dew Point Calculator', desc: 'Calculate dew point temperature from altitude, temperature, and humidity' },
    { slug: 'psychrometric', title: 'Psychrometric Calculator', desc: 'Calculate enthalpy, humidity ratio, and other air properties' },
    { slug: 'duct-velocity', title: 'Duct Velocity Calculator', desc: 'Calculate air velocity in rectangular and round ducts' },
    { slug: 'cooling-load', title: 'Cooling Load Estimator', desc: 'Estimate building cooling load quickly' },
    { slug: 'pump-head', title: 'Pump Head Calculator', desc: 'Calculate required pump head for HVAC systems' },
  ],
  electrical: [
    { slug: 'power', title: 'Power Calculator', desc: 'Calculate power, current, voltage from any two inputs' },
    { slug: 'voltage-drop', title: 'Voltage Drop Calculator', desc: 'Calculate voltage drop in electrical conductors' },
    { slug: 'cable-ampacity', title: 'Cable Ampacity Calculator', desc: 'Calculate cable current carrying capacity' },
    { slug: 'illuminance', title: 'Illuminance Calculator', desc: 'Calculate lighting levels for indoor spaces' },
    { slug: 'battery-capacity', title: 'Battery Capacity Calculator', desc: 'Calculate battery size for backup power' },
  ],
  fluid: [
    { slug: 'pipe-pressure', title: 'Pipe Pressure Loss', desc: 'Calculate pressure drop in pipe systems' },
    { slug: 'flow-conversion', title: 'Flow Rate Converter', desc: 'Convert between GPM, L/s, m³/h' },
    { slug: 'reynolds', title: 'Reynolds Number Calculator', desc: 'Calculate Reynolds number for pipe flow' },
  ],
  structure: [
    { slug: 'concrete-mix', title: 'Concrete Mix Calculator', desc: 'Calculate concrete mix proportions' },
    { slug: 'beam-load', title: 'Beam Load Calculator', desc: 'Calculate beam deflection and stress' },
    { slug: 'unit-converter', title: 'Unit Converter', desc: 'Convert between engineering units' },
  ],
}

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <h1 className="logo">
            <Link href="/">🔧 ProEngineerCalc</Link>
          </h1>
          <p className="tagline">Professional Engineering Calculator Toolbox</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="active">🏠 Home</Link>
          <Link href="/calculators/hvac">🌡️ HVAC</Link>
          <Link href="/calculators/electrical">⚡ Electrical</Link>
          <Link href="/calculators/fluid">💧 Fluid</Link>
          <Link href="/calculators/structure">🏗️ Structure</Link>
          <Link href="/terms">📄 Terms</Link>
          <Link href="/privacy">🔒 Privacy</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container">
        {/* HVAC Section */}
        <section className="category-section">
          <h2 className="category-title">🌡️ HVAC & Refrigeration</h2>
          <div className="calculator-grid">
            {calculators.hvac.map((calc) => (
              <Link 
                key={calc.slug} 
                href={`/calculators/${calc.slug}`}
                className="calculator-card"
              >
                <h3>{calc.title}</h3>
                <p>{calc.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Electrical Section */}
        <section className="category-section">
          <h2 className="category-title">⚡ Electrical Engineering</h2>
          <div className="calculator-grid">
            {calculators.electrical.map((calc) => (
              <Link 
                key={calc.slug} 
                href={`/calculators/${calc.slug}`}
                className="calculator-card"
              >
                <h3>{calc.title}</h3>
                <p>{calc.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Fluid Section */}
        <section className="category-section">
          <h2 className="category-title">💧 Fluid Mechanics</h2>
          <div className="calculator-grid">
            {calculators.fluid.map((calc) => (
              <Link 
                key={calc.slug} 
                href={`/calculators/${calc.slug}`}
                className="calculator-card"
              >
                <h3>{calc.title}</h3>
                <p>{calc.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Structure Section */}
        <section className="category-section">
          <h2 className="category-title">🏗️ Structural Engineering</h2>
          <div className="calculator-grid">
            {calculators.structure.map((calc) => (
              <Link 
                key={calc.slug} 
                href={`/calculators/${calc.slug}`}
                className="calculator-card"
              >
                <h3>{calc.title}</h3>
                <p>{calc.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="disclaimer">
          <strong>⚠️ Disclaimer:</strong> All calculations on this website are for reference only. 
          Do not use these results as the final basis for engineering design or construction. 
          Please consult a licensed professional engineer for actual engineering decisions.
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>© 2026 ProEngineerCalc. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
