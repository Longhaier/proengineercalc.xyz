'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function VoltageDrop() {
  const [mode, setMode] = useState('vd')
  const [voltage, setVoltage] = useState('')
  const [current, setCurrent] = useState('')
  const [length, setLength] = useState('')
  const [size, setSize] = useState('2.5')
  const [material, setMaterial] = useState('copper')
  const [result, setResult] = useState<any>(null)

  const calculateVD = () => {
    const V = parseFloat(voltage)
    const I = parseFloat(current)
    const L = parseFloat(length)
    const A = parseFloat(size)
    const rho = material === 'copper' ? 0.0175 : 0.0283
    const R = (rho * L * 2 * 1.2) / A
    const VD = I * R
    const percent = (VD / V) * 100
    setResult({ vd: VD.toFixed(2), percent: percent.toFixed(2), ok: percent <= 3, final: (V-VD).toFixed(1) })
  }

  const calculateCurrent = () => {
    const V = parseFloat(voltage)
    const L = parseFloat(length)
    const A = parseFloat(size)
    const rho = material === 'copper' ? 0.0175 : 0.0283
    const maxVD = V * 0.03
    const R = (rho * L * 2 * 1.2) / A
    const Imax = maxVD / R
    setResult({ maxCurrent: Imax.toFixed(2), maxVD: maxVD.toFixed(1) })
  }

  const calculateSize = () => {
    const V = parseFloat(voltage)
    const I = parseFloat(current)
    const L = parseFloat(length)
    const rho = material === 'copper' ? 0.0175 : 0.0283
    const maxVD = V * 0.03
    const minArea = (rho * L * 2 * 1.2 * I) / maxVD
    setResult({ minArea: minArea.toFixed(2), recommended: minArea > 1.5 ? Math.ceil(minArea) : 1.5 })
  }

  const calculate = () => {
    if (mode === 'vd') calculateVD()
    else if (mode === 'current') calculateCurrent()
    else calculateSize()
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/electrical">Electrical</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>Voltage Drop Calculator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Calculation Mode</label>
              <select value={mode} onChange={(e)=>setMode(e.target.value)}>
                <option value="vd">Calculate Voltage Drop</option>
                <option value="current">Calculate Max Current</option>
                <option value="size">Calculate Required Cable Size</option>
              </select>
            </div>
            <div className="form-group"><label>System Voltage (V)</label><input type="number" value={voltage} onChange={(e)=>setVoltage(e.target.value)}/></div>
            <div className="form-group"><label>Current (A) {mode==='current'?'':'*'}</label><input type="number" value={current} onChange={(e)=>setCurrent(e.target.value)}/></div>
            <div className="form-group"><label>Circuit Length (m) - one way</label><input type="number" value={length} onChange={(e)=>setLength(e.target.value)}/></div>
            <div className="form-group"><label>Conductor Size (mm²)</label>
              <select value={size} onChange={(e)=>setSize(e.target.value)}>
                <option value="1.5">1.5 mm²</option><option value="2.5">2.5 mm²</option><option value="4">4 mm²</option><option value="6">6 mm²</option><option value="10">10 mm²</option><option value="16">16 mm²</option><option value="25">25 mm²</option>
              </select>
            </div>
            <div className="form-group"><label>Material</label>
              <select value={material} onChange={(e)=>setMaterial(e.target.value)}>
                <option value="copper">Copper</option><option value="aluminum">Aluminum</option>
              </select>
            </div>
            <button onClick={calculate} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px'}}>Calculate</button>
            {result && (
              <div className="result-group">
                {result.vd && <div className="result-item"><span className="result-label">Voltage Drop</span><span className="result-value">{result.vd} V ({result.percent}%)</span></div>}
                {result.final && <div className="result-item"><span className="result-label">Voltage at Load</span><span className="result-value">{result.final} V</span></div>}
                {result.maxCurrent && <div className="result-item"><span className="result-label">Max Current (3%)</span><span className="result-value">{result.maxCurrent} A</span></div>}
                {result.minArea && <div className="result-item"><span className="result-label">Min Area Required</span><span className="result-value">{result.minArea} mm²</span></div>}
                {result.recommended && <div className="result-item"><span className="result-label">Recommended Size</span><span className="result-value">{result.recommended} mm²</span></div>}
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>Formula and Principles</h2>
            <p>Voltage drop occurs when current flows through conductors due to their resistance. IEEE and NEC standards recommend maximum 3% voltage drop for branch circuits.</p>
            <div className="formula-box">
              R = ρ × L × 2 / A<br/>
              VD = I × R<br/><br/>
              Where:<br/>
              ρ = Resistivity (Ω·mm²/m)<br/>
              L = Length (m)<br/>
              A = Cross-section (mm²)
            </div>
          </div>
          <div className="content-section">
            <h2>User Guide</h2>
            <ol>
              <li>Select calculation mode based on what you need</li>
              <li>Enter system voltage (230V, 400V common)</li>
              <li>Enter load current or circuit length</li>
              <li>Select conductor material and size</li>
              <li>Click Calculate to see results</li>
            </ol>
          </div>
          <div className="content-section">
            <h2>FAQ</h2>
            <div className="faq-item"><p className="faq-question">Why 3% limit?</p><p className="faq-answer">3% is the maximum recommended voltage drop for efficient operation. Total drop including feeders should not exceed 5%.</p></div>
            <div className="faq-item"><p className="faq-question">Copper vs Aluminum?</p><p className="faq-answer">Copper has lower resistivity (0.0175 vs 0.0283 Ω·mm²/m), so smaller copper cables can carry the same current.</p></div>
          </div>
          <div className="content-section">
            <h2>Related Cases</h2>
            <p><strong>Case 1:</strong> 100m circuit, 20A load, 2.5mm² copper at 230V: VD = 2.77V (1.2%) - OK</p>
            <p><strong>Case 2:</strong> Same circuit with 1.5mm²: VD = 4.6V (2%) - OK but close to limit</p>
          </div>
          <div className="disclaimer"><strong>Disclaimer:</strong> All calculations are for reference only.</div>
        </div>
      </main>
      <footer><div className="container"><p>2026 ProEngineerCalc</p></div></footer>
    </>
  )
}
