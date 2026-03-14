'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Reynolds() {
  const [velocity, setVelocity] = useState('2')
  const [diameter, setDiameter] = useState('100')
  const [nu, setNu] = useState('1e-6')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const v = parseFloat(velocity)
    const d = parseFloat(diameter) / 1000
    const viscosity = parseFloat(nu)
    const Re = (v * d) / viscosity
    setResult({ re: Re.toFixed(0), flow: Re < 2000 ? 'Laminar' : Re > 4000 ? 'Turbulent' : 'Transient' })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/fluid">Fluid</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Reynolds Number Calculator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Velocity (m/s)</label><input type="number" value={velocity} onChange={(e) => setVelocity(e.target.value)} /></div>
            <div className="form-group"><label>Pipe Diameter (mm)</label><input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} /></div>
            <div className="form-group"><label>Kinematic Viscosity (m²/s)</label><input type="number" value={nu} onChange={(e) => setNu(e.target.value)} /></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>Calculate</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">Reynolds Number</span><span className="result-value">{result.re}</span></div>
                <div className="result-item"><span className="result-label">Flow Type</span><span className="result-value">{result.flow}</span></div>
              </div>
            )}
          </div>
          <div className="content-section"><h2>Formula</h2><div className="formula-box">Re = VD / ν<br/>Re &lt; 2000: Laminar<br/>Re &gt; 4000: Turbulent</div></div>
          <div className="disclaimer"><strong>Disclaimer:</strong> Reference only.</div>
        </div>
      </main>
      <footer><div className="container"><p>2026 ProEngineerCalc</p></div></footer>
    </>
  )
}
