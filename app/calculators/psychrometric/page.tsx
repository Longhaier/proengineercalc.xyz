'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Psychrometric() {
  const [temp, setTemp] = useState('25')
  const [humidity, setHumidity] = useState('50')
  const [pressure, setPressure] = useState('101.325')
  const [results, setResults] = useState<any>(null)

  const calculate = () => {
    const T = parseFloat(temp)
    const RH = parseFloat(humidity)
    const P = parseFloat(pressure)
    if (isNaN(T) || isNaN(RH) || isNaN(P)) return
    
    const Ps = 0.61078 * Math.exp((17.27 * T) / (T + 237.3))
    const Pv = Ps * RH / 100
    const W = 0.622 * Pv / (P - Pv)
    const h = 1.005 * T + W * (2501 + 1.86 * T)
    
    setResults({ humidityRatio: (W * 1000).toFixed(2), enthalpy: h.toFixed(2), saturationVaporPressure: Ps.toFixed(3) })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1><p className="tagline">Professional Engineering Calculator Tools</p></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/hvac">HVAC</Link><Link href="/calculators/electrical">Electrical</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Psychrometric Calculator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Temperature (°C)</label><input type="number" value={temp} onChange={(e) => setTemp(e.target.value)} /></div>
            <div className="form-group"><label>Relative Humidity (%)</label><input type="number" value={humidity} onChange={(e) => setHumidity(e.target.value)} /></div>
            <div className="form-group"><label>Pressure (kPa)</label><input type="number" value={pressure} onChange={(e) => setPressure(e.target.value)} /></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>Calculate</button>
            {results && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">Humidity Ratio</span><span className="result-value">{results.humidityRatio} g/kg</span></div>
                <div className="result-item"><span className="result-label">Enthalpy</span><span className="result-value">{results.enthalpy} kJ/kg</span></div>
              </div>
            )}
          </div>
          <div className="disclaimer"><strong>Disclaimer:</strong> All calculations are for reference only.</div>
        </div>
      </main>
      <footer><div className="container"><p>2026 ProEngineerCalc</p></div></footer>
    </>
  )
}
