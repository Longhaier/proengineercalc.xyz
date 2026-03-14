'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DuctVelocity() {
  const [mode, setMode] = useState('velocity')
  const [flowRate, setFlowRate] = useState('')
  const [diameter, setDiameter] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState<any>(null)

  const calculateVelocity = () => {
    const Q = parseFloat(flowRate) / 3600
    const d = parseFloat(diameter) / 1000
    const A = Math.PI * Math.pow(d/2, 2)
    setResult({ velocity: (Q/A*100).toFixed(1), velocityFPM: (Q/A*196.85).toFixed(0), area: (A*1e6).toFixed(0) })
  }

  const calculateFlowRate = () => {
    const d = parseFloat(diameter) / 1000
    const v = parseFloat(flowRate) / 100
    const A = Math.PI * Math.pow(d/2, 2)
    const Q = v * A * 3600
    setResult({ flowRate: Q.toFixed(1), velocity: v.toFixed(1), area: (A*1e6).toFixed(0) })
  }

  const calculateDiameter = () => {
    const Q = parseFloat(flowRate) / 3600
    const v = parseFloat(diameter) / 100
    const A = Q / v
    const d = Math.sqrt(4 * A / Math.PI) * 1000
    setResult({ diameter: d.toFixed(0), velocity: v.toFixed(1), flowRate: parseFloat(flowRate).toFixed(1) })
  }

  const calculate = () => {
    if (mode === 'velocity') calculateVelocity()
    else if (mode === 'flowRate') calculateFlowRate()
    else calculateDiameter()
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/hvac">HVAC</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>Duct Velocity Calculator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Calculation Mode</label>
              <select value={mode} onChange={(e)=>setMode(e.target.value)}>
                <option value="velocity">Calculate Velocity (from Flow Rate)</option>
                <option value="flowRate">Calculate Flow Rate (from Velocity)</option>
                <option value="diameter">Calculate Diameter (from Velocity)</option>
              </select>
            </div>
            <div className="form-group"><label>Airflow (m³/h)</label><input type="number" value={flowRate} onChange={(e)=>setFlowRate(e.target.value)}/></div>
            <div className="form-group"><label>Diameter (mm)</label><input type="number" value={diameter} onChange={(e)=>setDiameter(e.target.value)}/></div>
            <button onClick={calculate} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px'}}>Calculate</button>
            {result && (
              <div className="result-group">
                {result.velocity && <div className="result-item"><span className="result-label">Velocity</span><span className="result-value">{result.velocity} m/s</span></div>}
                {result.velocityFPM && <div className="result-item"><span className="result-label">Velocity</span><span className="result-value">{result.velocityFPM} fpm</span></div>}
                {result.flowRate && <div className="result-item"><span className="result-label">Flow Rate</span><span className="result-value">{result.flowRate} m³/h</span></div>}
                {result.diameter && <div className="result-item"><span className="result-label">Required Diameter</span><span className="result-value">{result.diameter} mm</span></div>}
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>Formula and Principles</h2>
            <p>Air velocity in ducts is fundamental to HVAC system design. Proper velocity ensures comfort and efficiency.</p>
            <div className="formula-box">V = Q / A<br/>A = πd²/4<br/>Q = m³/s, V = m/s</div>
          </div>
          <div className="content-section">
            <h2>User Guide</h2>
            <ol>
              <li>Select calculation mode</li>
              <li>Enter airflow or velocity as needed</li>
              <li>Enter duct diameter</li>
              <li>Click Calculate</li>
            </ol>
          </div>
          <div className="content-section">
            <h2>FAQ</h2>
            <div className="faq-item"><p className="faq-question">What velocity is recommended?</p><p className="faq-answer">Main ducts: 6-10 m/s. Branches: 5-8 m/s. Diffusers: 2-5 m/s.</p></div>
          </div>
          <div className="content-section">
            <h2>Related Cases</h2>
            <p><strong>Case:</strong> 2000 m³/h in 300mm duct gives V = 7.85 m/s - within acceptable range.</p>
          </div>
          <div className="disclaimer"><strong>Disclaimer:</strong> All calculations are for reference only.</div>
        </div>
      </main>
      <footer><div className="container"><p>2026 ProEngineerCalc</p></div></footer>
    </>
  )
}
