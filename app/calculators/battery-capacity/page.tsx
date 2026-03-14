'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BatteryCapacity() {
  const [power, setPower] = useState('1000')
  const [hours, setHours] = useState('4')
  const [voltage, setVoltage] = useState('48')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const P = parseFloat(power)
    const h = parseFloat(hours)
    const V = parseFloat(voltage)
    const Wh = P * h
    const Ah = Wh / V
    setResult({ wh: Wh.toFixed(0), ah: Ah.toFixed(1) })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/electrical">Electrical</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Battery Capacity Calculator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Load Power (W)</label><input type="number" value={power} onChange={(e) => setPower(e.target.value)} /></div>
            <div className="form-group"><label>Backup Hours</label><input type="number" value={hours} onChange={(e) => setHours(e.target.value)} /></div>
            <div className="form-group"><label>Battery Voltage (V)</label><input type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} /></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>Calculate</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">Energy Required</span><span className="result-value">{result.wh} Wh</span></div>
                <div className="result-item"><span className="result-label">Battery Capacity</span><span className="result-value">{result.ah} Ah</span></div>
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
