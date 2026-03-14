'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CableAmpacity() {
  const [conductorType, setConductorType] = useState('copper')
  const [size, setSize] = useState(2.5)
  const [installMethod, setInstallMethod] = useState('B1')
  const [temp, setTemp] = useState(30)
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    // Base ampacity for copper at 30C (A/mm2)
    const baseAmpacity = conductorType === 'copper' ? 15 : 12
    // Installation method factors
    const methodFactors: Record<string, number> = {
      'A1': 0.80, 'A2': 0.80, 'B1': 0.85, 'B2': 0.85,
      'C': 0.90, 'D': 0.90
    }
    // Temperature factors
    const tempFactor = temp <= 30 ? 1.0 : 1 - (temp - 30) * 0.04
    
    const ampacity = size * baseAmpacity * (methodFactors[installMethod] || 1) * tempFactor
    setResult(Math.round(ampacity * 10) / 10)
  }

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1>
          <p className="tagline">Professional Engineering Calculator Tools</p>
        </div>
      </header>

      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/">Home</Link>
          <Link href="/calculators/hvac">HVAC</Link>
          <Link href="/calculators/electrical">Electrical</Link>
          <Link href="/calculators/fluid">Fluid</Link>
          <Link href="/calculators/structure">Structure</Link>
        </div>
      </nav>

      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>Cable Ampacity Calculator</h1>

          <div className="calculator-form">
            <div className="form-group">
              <label>Conductor Material</label>
              <select value={conductorType} onChange={(e) => setConductorType(e.target.value)}>
                <option value="copper">Copper</option>
                <option value="aluminum">Aluminum</option>
              </select>
            </div>

            <div className="form-group">
              <label>Conductor Size (mm2)</label>
              <input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} />
            </div>

            <div className="form-group">
              <label>Installation Method</label>
              <select value={installMethod} onChange={(e) => setInstallMethod(e.target.value)}>
                <option value="A1">A1 - Conduit in wall</option>
                <option value="A2">A2 - Conduit in wall</option>
                <option value="B1">B1 - Conduit on wall</option>
                <option value="B2">B2 - Conduit on wall</option>
                <option value="C">C - Cable in air</option>
                <option value="D">D - Direct buried</option>
              </select>
            </div>

            <div className="form-group">
              <label>Ambient Temperature (C)</label>
              <input type="number" value={temp} onChange={(e) => setTemp(Number(e.target.value))} />
            </div>

            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Calculate</button>

            {result && (
              <div className="result-group">
                <h4>Results</h4>
                <div className="result-item">
                  <span className="result-label">Current Carrying Capacity</span>
                  <span className="result-value">{result} A</span>
                </div>
              </div>
            )}
          </div>

          <div className="content-section">
            <h2>Formula and Principles</h2>
            <p>Cable ampacity is calculated based on conductor cross-sectional area, material, installation method, and ambient temperature.</p>
            <div className="formula-box">
              I = A x I_density x F_method x F_temp<br/><br/>
              Where:<br/>
              I = Ampacity (A)<br/>
              A = Cross-sectional area (mm2)<br/>
              I_density = Current density (A/mm2)<br/>
              F_method = Installation method factor<br/>
              F_temp = Temperature factor
            </div>
          </div>

          <div className="content-section">
            <h2>User Guide</h2>
            <ol>
              <li>Select conductor material (Copper or Aluminum)</li>
              <li>Enter cable cross-sectional area in mm2</li>
              <li>Select installation method</li>
              <li>Enter ambient temperature</li>
              <li>Click Calculate</li>
            </ol>
          </div>

          <div className="disclaimer">
            <strong>Disclaimer:</strong> All calculations are for reference only. 
            Do not use these results as the final basis for engineering design. 
            Consult a licensed electrical engineer for actual installations.
          </div>
        </div>
      </main>

      <footer><div className="container"><p>2026 ProEngineerCalc. All rights reserved.</p></div></footer>
    </>
  )
}
