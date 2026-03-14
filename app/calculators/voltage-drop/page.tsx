'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function VoltageDrop() {
  const [voltage, setVoltage] = useState('230')
  const [current, setCurrent] = useState('10')
  const [length, setLength] = useState('50')
  const [size, setSize] = useState('2.5')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const V = parseFloat(voltage)
    const I = parseFloat(current)
    const L = parseFloat(length)
    const A = parseFloat(size)
    const R = (0.0175 * L * 2 * 1.2) / A
    const VD = I * R
    const percent = (VD / V) * 100
    setResult({ vd: VD.toFixed(2), percent: percent.toFixed(2), ok: percent <= 3 })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/electrical">Electrical</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Voltage Drop Calculator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Voltage (V)</label><input type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} /></div>
            <div className="form-group"><label>Current (A)</label><input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} /></div>
            <div className="form-group"><label>Length (m)</label><input type="number" value={length} onChange={(e) => setLength(e.target.value)} /></div>
            <div className="form-group"><label>Conductor Size (mm²)</label><select value={size} onChange={(e) => setSize(e.target.value)}><option value="1.5">1.5</option><option value="2.5">2.5</option><option value="4">4</option><option value="6">6</option><option value="10">10</option></select></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>Calculate</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">Voltage Drop</span><span className="result-value">{result.vd} V ({result.percent}%)</span></div>
                <div className="result-item"><span className="result-label">Status</span><span className="result-value" style={{color: result.ok ? 'green' : 'red'}}>{result.ok ? 'OK' : 'High'}</span></div>
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
