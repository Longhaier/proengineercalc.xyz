'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ConcreteMix() {
  const [volume, setVolume] = useState('1')
  const [grade, setGrade] = useState('C30')
  const [result, setResult] = useState<any>(null)

  const ratios: Record<string, number[]> = { C20: [1,2,4], C25: [1,1.5,3], C30: [1,1,2], C35: [1,0.5,2], C40: [1,0.5,1.5] }

  const calculate = () => {
    const v = parseFloat(volume)
    const r = ratios[grade] || [1,1,2]
    const cement = v * r[0] * 350
    const sand = v * r[1] * 350
    const aggregate = v * r[2] * 350
    const water = cement * 0.5
    setResult({ cement: cement.toFixed(0), sand: sand.toFixed(0), aggregate: aggregate.toFixed(0), water: water.toFixed(0) })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/structure">Structure</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Concrete Mix Calculator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Volume (m³)</label><input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} /></div>
            <div className="form-group"><label>Grade</label><select value={grade} onChange={(e) => setGrade(e.target.value)}><option>C20</option><option>C25</option><option>C30</option><option>C35</option><option>C40</option></select></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>Calculate</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">Cement (kg)</span><span className="result-value">{result.cement}</span></div>
                <div className="result-item"><span className="result-label">Sand (kg)</span><span className="result-value">{result.sand}</span></div>
                <div className="result-item"><span className="result-label">Aggregate (kg)</span><span className="result-value">{result.aggregate}</span></div>
                <div className="result-item"><span className="result-label">Water (kg)</span><span className="result-value">{result.water}</span></div>
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
