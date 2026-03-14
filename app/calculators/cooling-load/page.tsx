'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CoolingLoad() {
  const [area, setArea] = useState('100')
  const [height, setHeight] = useState('3')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const a = parseFloat(area)
    const h = parseFloat(height)
    const volume = a * h
    const watts = volume * 25
    setResult({ volume: volume.toFixed(1), watts: watts.toFixed(0), tons: (watts / 3517).toFixed(2) })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/hvac">HVAC</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Cooling Load Estimator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Floor Area (m²)</label><input type="number" value={area} onChange={(e) => setArea(e.target.value)} /></div>
            <div className="form-group"><label>Ceiling Height (m)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>Calculate</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">Cooling Load</span><span className="result-value">{result.watts} W</span></div>
                <div className="result-item"><span className="result-label">Refrigeration Tons</span><span className="result-value">{result.tons} RT</span></div>
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
