'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UnitConverter() {
  const [value, setValue] = useState('1')
  const [category, setCategory] = useState('length')
  const [from, setFrom] = useState('m')
  const [result, setResult] = useState<any>(null)

  const units: Record<string, Record<string, number>> = {
    length: { m: 1, cm: 100, mm: 1000, km: 0.001, inch: 39.37, ft: 3.281, yard: 1.094 },
    mass: { kg: 1, g: 1000, tonne: 0.001, lb: 2.205, oz: 35.274 },
    pressure: { bar: 1, kPa: 100, psi: 14.5, atm: 0.987, MPa: 0.1 },
    temperature: { C: 1, F: 1 }
  }

  const calculate = () => {
    const v = parseFloat(value)
    if (category === 'temperature') {
      const celsius = from === 'C' ? v : (v - 32) * 5/9
      setResult({ C: celsius.toFixed(2), F: (celsius * 9/5 + 32).toFixed(2) })
    } else {
      const base = v / (units[category]?.[from] || 1)
      const r: any = {}
      Object.entries(units[category] || {}).forEach(([u, f]) => { r[u] = (base * f).toFixed(4) })
      setResult(r)
    }
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/structure">Structure</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Unit Converter</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Value</label><input type="number" value={value} onChange={(e) => setValue(e.target.value)} /></div>
            <div className="form-group"><label>Category</label><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="length">Length</option><option value="mass">Mass</option><option value="pressure">Pressure</option><option value="temperature">Temperature</option></select></div>
            <div className="form-group"><label>From</label><select value={from} onChange={(e) => setFrom(e.target.value)}>{Object.keys(units[category] || {}).map(u => <option key={u} value={u}>{u}</option>)}</select></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>Convert</button>
            {result && (
              <div className="result-group">
                {Object.entries(result).map(([k, v]) => <div key={k} className="result-item"><span className="result-label">{k}</span><span className="result-value">{String(v)}</span></div>)}
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
