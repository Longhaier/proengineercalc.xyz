'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FlowConversion() {
  const [value, setValue] = useState('100')
  const [from, setFrom] = useState('m3h')
  const [result, setResult] = useState<any>(null)

  const rates: Record<string, number> = { lps: 1, m3h: 0.277778, gpm: 0.0630902, cfm: 0.471947 }

  const calculate = () => {
    const v = parseFloat(value)
    const lps = v * rates[from]
    setResult({
      lps: lps.toFixed(3),
      m3h: (lps / rates.m3h).toFixed(3),
      gpm: (lps / rates.gpm).toFixed(3),
      cfm: (lps / rates.cfm).toFixed(3)
    })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/fluid">Fluid</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Flow Rate Converter</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Value</label><input type="number" value={value} onChange={(e) => setValue(e.target.value)} /></div>
            <div className="form-group"><label>From</label><select value={from} onChange={(e) => setFrom(e.target.value)}><option value="lps">L/s</option><option value="m3h">m³/h</option><option value="gpm">GPM</option><option value="cfm">CFM</option></select></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>Convert</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">L/s</span><span className="result-value">{result.lps}</span></div>
                <div className="result-item"><span className="result-label">m³/h</span><span className="result-value">{result.m3h}</span></div>
                <div className="result-item"><span className="result-label">GPM</span><span className="result-value">{result.gpm}</span></div>
                <div className="result-item"><span className="result-label">CFM</span><span className="result-value">{result.cfm}</span></div>
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
