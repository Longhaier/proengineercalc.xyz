'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DuctVelocity() {
  const [flowRate, setFlowRate] = useState('1000')
  const [diameter, setDiameter] = useState('300')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const Q = parseFloat(flowRate) / 3600
    const d = parseFloat(diameter) / 1000
    const A = Math.PI * Math.pow(d / 2, 2)
    const V = Q / A
    setResult({ velocity: V.toFixed(2), velocityFPM: (V * 196.85).toFixed(0) })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/hvac">HVAC</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Duct Velocity Calculator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Airflow (m³/h)</label><input type="number" value={flowRate} onChange={(e) => setFlowRate(e.target.value)} /></div>
            <div className="form-group"><label>Diameter (mm)</label><input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} /></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>Calculate</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">Velocity</span><span className="result-value">{result.velocity} m/s</span></div>
                <div className="result-item"><span className="result-label">Velocity</span><span className="result-value">{result.velocityFPM} fpm</span></div>
              </div>
            )}
          </div>
          <div className="content-section"><h2>Formula</h2><div className="formula-box">V = Q / A<br/>Q = m³/s, A = πd²/4</div></div>
          <div className="disclaimer"><strong>Disclaimer:</strong> Reference only.</div>
        </div>
      </main>
      <footer><div className="container"><p>2026 ProEngineerCalc</p></div></footer>
    </>
  )
}
