'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Illuminance() {
  const [length, setLength] = useState('10')
  const [width, setWidth] = useState('8')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const l = parseFloat(length)
    const w = parseFloat(width)
    const area = l * w
    const lux = 500
    const lumens = lux * area
    setResult({ area: area.toFixed(1), lux, lumens: lumens.toFixed(0), fixtures: Math.ceil(lumens / 3000) })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/electrical">Electrical</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Illuminance Calculator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Room Length (m)</label><input type="number" value={length} onChange={(e) => setLength(e.target.value)} /></div>
            <div className="form-group"><label>Room Width (m)</label><input type="number" value={width} onChange={(e) => setWidth(e.target.value)} /></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>Calculate</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">Area</span><span className="result-value">{result.area} m²</span></div>
                <div className="result-item"><span className="result-label">Light Needed</span><span className="result-value">{result.lumens} lumens</span></div>
              </div>
            )}
          </div>
          <div className="disclaimer"><strong>Disclaimer:</strong> Reference only.</div>
        </div>
      </main>
      <footer><div className="container"><p>2026 ProEngineerCalc</p></div></footer>
    </>
  )
}
