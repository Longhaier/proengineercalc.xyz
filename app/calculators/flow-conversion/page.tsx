'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FlowConversion() {
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('m3h')
  const [result, setResult] = useState<any>(null)

  const rates: Record<string, number> = { lps: 1, m3h: 0.277778, gpm: 0.0630902, cfm: 0.471947, lpm: 60 }

  const convert = () => {
    const v = parseFloat(value)
    if (isNaN(v)) return
    const lps = v * rates[fromUnit]
    setResult({
      lps: lps.toFixed(4),
      m3h: (lps / rates.m3h).toFixed(4),
      gpm: (lps / rates.gpm).toFixed(4),
      cfm: (lps / rates.cfm).toFixed(4),
      lpm: (lps / rates.lpm).toFixed(4)
    })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/fluid">Fluid</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>Flow Rate Converter</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Value</label><input type="number" value={value} onChange={(e)=>setValue(e.target.value)}/></div>
            <div className="form-group"><label>From Unit</label>
              <select value={fromUnit} onChange={(e)=>setFromUnit(e.target.value)}>
                <option value="lps">L/s (Liters per second)</option>
                <option value="m3h">m³/h (Cubic meters per hour)</option>
                <option value="gpm">GPM (Gallons per minute)</option>
                <option value="cfm">CFM (Cubic feet per minute)</option>
                <option value="lpm">LPM (Liters per minute)</option>
              </select>
            </div>
            <button onClick={convert} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px'}}>Convert</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">L/s</span><span className="result-value">{result.lps}</span></div>
                <div className="result-item"><span className="result-label">m³/h</span><span className="result-value">{result.m3h}</span></div>
                <div className="result-item"><span className="result-label">GPM</span><span className="result-value">{result.gpm}</span></div>
                <div className="result-item"><span className="result-label">CFM</span><span className="result-value">{result.cfm}</span></div>
                <div className="result-item"><span className="result-label">LPM</span><span className="result-value">{result.lpm}</span></div>
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>Formula and Principles</h2>
            <p>Flow rate conversion between different units:</p>
            <div className="formula-box">1 m³/h = 0.27778 L/s<br/>1 GPM = 0.06309 L/s<br/>1 CFM = 0.47195 L/s</div>
          </div>
          <div className="content-section">
            <h2>User Guide</h2>
            <ol>
              <li>Enter flow rate value</li>
              <li>Select source unit</li>
              <li>Click Convert to see all conversions</li>
            </ol>
          </div>
          <div className="content-section">
            <h2>FAQ</h2>
            <div className="faq-item"><p className="faq-question">Why different units?</p><p className="faq-answer">Different industries use different units. HVAC typically uses GPM or L/s, while process industries use m³/h.</p></div>
          </div>
          <div className="disclaimer"><strong>Disclaimer:</strong> All calculations are for reference only.</div>
        </div>
      </main>
      <footer><div className="container"><p>2026 ProEngineerCalc</p></div></footer>
    </>
  )
}
