'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Power() {
  const [mode, setMode] = useState('power')
  const [current, setCurrent] = useState('')
  const [voltage, setVoltage] = useState('')
  const [power, setPower] = useState('')
  const [pf, setPf] = useState('0.85')
  const [phase, setPhase] = useState('single')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const I = parseFloat(current)
    const V = parseFloat(voltage)
    const P = parseFloat(power)
    const PF = parseFloat(pf) || 0.85
    
    if (mode === 'power' && I && V) {
      const realP = phase === 'single' ? I * V * PF : Math.sqrt(3) * I * V * PF
      const apparent = phase === 'single' ? I * V : Math.sqrt(3) * I * V
      setResult({ power: realP.toFixed(0), apparent: apparent.toFixed(0), reactive: Math.sqrt(Math.pow(apparent,2)-Math.pow(realP,2)).toFixed(0) })
    } else if (mode === 'current' && V && P) {
      const Icalc = phase === 'single' ? P / (V * PF) : P / (Math.sqrt(3) * V * PF)
      setResult({ current: Icalc.toFixed(2) })
    } else if (mode === 'voltage' && I && P) {
      const Vcalc = phase === 'single' ? P / (I * PF) : P / (Math.sqrt(3) * I * PF)
      setResult({ voltage: Vcalc.toFixed(1) })
    }
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/electrical">Electrical</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>Electrical Power Calculator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Calculation Mode</label>
              <select value={mode} onChange={(e)=>setMode(e.target.value)}>
                <option value="power">Calculate Power (I+V)</option>
                <option value="current">Calculate Current (P+V)</option>
                <option value="voltage">Calculate Voltage (P+I)</option>
              </select>
            </div>
            <div className="form-group"><label>Phase Type</label>
              <select value={phase} onChange={(e)=>setPhase(e.target.value)}>
                <option value="single">Single Phase</option>
                <option value="three">Three Phase</option>
              </select>
            </div>
            <div className="form-group"><label>Power Factor</label><input type="number" value={pf} onChange={(e)=>setPf(e.target.value)} step="0.01"/></div>
            <div className="form-group"><label>Current (A) {mode==='current'?'':'*'}</label><input type="number" value={current} onChange={(e)=>setCurrent(e.target.value)}/></div>
            <div className="form-group"><label>Voltage (V) {mode==='voltage'?'':'*'}</label><input type="number" value={voltage} onChange={(e)=>setVoltage(e.target.value)}/></div>
            <div className="form-group"><label>Power (W) {mode==='power'?'':'*'}</label><input type="number" value={power} onChange={(e)=>setPower(e.target.value)}/></div>
            <button onClick={calculate} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px'}}>Calculate</button>
            {result && (
              <div className="result-group">
                {result.power && <div className="result-item"><span className="result-label">Real Power</span><span className="result-value">{result.power} W</span></div>}
                {result.apparent && <div className="result-item"><span className="result-label">Apparent Power</span><span className="result-value">{result.apparent} VA</span></div>}
                {result.reactive && <div className="result-item"><span className="result-label">Reactive Power</span><span className="result-value">{result.reactive} VAR</span></div>}
                {result.current && <div className="result-item"><span className="result-label">Current</span><span className="result-value">{result.current} A</span></div>}
                {result.voltage && <div className="result-item"><span className="result-label">Voltage</span><span className="result-value">{result.voltage} V</span></div>}
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>Formula and Principles</h2>
            <p>Electrical power relationships in AC circuits:</p>
            <div className="formula-box">
              Single Phase: P = V × I × PF<br/>
              Three Phase: P = √3 × V_L × I_L × PF<br/><br/>
              S = V × I (apparent power)<br/>
              Q = √(S² - P²) (reactive power)
            </div>
          </div>
          <div className="content-section">
            <h2>User Guide</h2>
            <ol>
              <li>Select calculation mode: Power, Current, or Voltage</li>
              <li>Choose single or three phase system</li>
              <li>Enter power factor (0.85-0.95 typical for motors)</li>
              <li>Enter any TWO values among I, V, P</li>
              <li>Click Calculate</li>
            </ol>
          </div>
          <div className="content-section">
            <h2>FAQ</h2>
            <div className="faq-item"><p className="faq-question">Why power factor matters?</p><p className="faq-answer">PF represents how efficiently power is used. PF=1 means all power does useful work. Motors, transformers have lower PF due to reactive power.</p></div>
            <div className="faq-item"><p className="faq-question">Single vs Three Phase?</p><p className="faq-answer">Three phase is used for industrial loads and long-distance power distribution. Single phase is common in residential.</p></div>
          </div>
          <div className="content-section">
            <h2>Related Cases</h2>
            <p><strong>Case 1:</strong> 10HP motor at 480V 3-phase: I = 7460/(480×0.89×√3) = 10.1A</p>
            <p><strong>Case 2:</strong> 2000W load at 230V single phase: I = 2000/(230×0.9) = 9.7A</p>
          </div>
          <div className="disclaimer"><strong>Disclaimer:</strong> All calculations are for reference only.</div>
        </div>
      </main>
      <footer><div className="container"><p>2026 ProEngineerCalc</p></div></footer>
    </>
  )
}
