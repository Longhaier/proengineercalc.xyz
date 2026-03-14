'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BeamLoad() {
  const [load, setLoad] = useState('10')
  const [length, setLength] = useState('6')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const w = parseFloat(load)
    const L = parseFloat(length)
    const maxMoment = w * Math.pow(L, 2) / 8
    const maxDeflection = (w * Math.pow(L * 1000, 3)) / (384 * 200000 * 83333333)
    setResult({ moment: maxMoment.toFixed(1), deflection: maxDeflection.toFixed(2) })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/structure">Structure</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Beam Load Calculator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Uniform Load (kN/m)</label><input type="number" value={load} onChange={(e) => setLoad(e.target.value)} /></div>
            <div className="form-group"><label>Span (m)</label><input type="number" value={length} onChange={(e) => setLength(e.target.value)} /></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>Calculate</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">Max Moment</span><span className="result-value">{result.moment} kN·m</span></div>
                <div className="result-item"><span className="result-label">Deflection</span><span className="result-value">{result.deflection} mm</span></div>
              </div>
            )}
          </div>
          <div className="content-section"><h2>Formula</h2><div className="formula-box">M = wL²/8<br/>δ = wL³/384EI<br/>(Assume 200mm × 400mm beam)</div></div>
          <div className="disclaimer"><strong>Disclaimer:</strong> Reference only.</div>
        </div>
      </main>
      <footer><div className="container"><p>2026 ProEngineerCalc</p></div></footer>
    </>
  )
}
