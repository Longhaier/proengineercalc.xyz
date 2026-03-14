'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PowerCalculator() {
  const [current, setCurrent] = useState<string>('')
  const [voltage, setVoltage] = useState<string>('')
  const [power, setPower] = useState<string>('')
  const [pf, setPf] = useState<number>(0.85)
  const [phase, setPhase] = useState<string>('single')
  const [results, setResults] = useState<{
    current: number
    voltage: number
    power: number
    apparentPower: number
  } | null>(null)

  const calculate = () => {
    let calculatedCurrent = 0
    let calculatedVoltage = 0
    let calculatedPower = 0

    if (current !== '' && voltage !== '') {
      calculatedCurrent = Number(current)
      calculatedVoltage = Number(voltage)
      if (phase === 'single') {
        calculatedPower = calculatedCurrent * calculatedVoltage * pf
      } else {
        calculatedPower = Math.sqrt(3) * calculatedCurrent * calculatedVoltage * pf
      }
    } else if (current !== '' && power !== '') {
      calculatedCurrent = Number(current)
      calculatedPower = Number(power)
      if (phase === 'single') {
        calculatedVoltage = calculatedPower / (calculatedCurrent * pf)
      } else {
        calculatedVoltage = calculatedPower / (Math.sqrt(3) * calculatedCurrent * pf)
      }
    } else if (voltage !== '' && power !== '') {
      calculatedVoltage = Number(voltage)
      calculatedPower = Number(power)
      if (phase === 'single') {
        calculatedCurrent = calculatedPower / (calculatedVoltage * pf)
      } else {
        calculatedCurrent = calculatedPower / (Math.sqrt(3) * calculatedVoltage * pf)
      }
    }

    if (calculatedCurrent > 0 && calculatedVoltage > 0 && calculatedPower > 0) {
      const apparentPower = phase === 'single' 
        ? calculatedCurrent * calculatedVoltage 
        : Math.sqrt(3) * calculatedCurrent * calculatedVoltage
      
      setResults({
        current: Math.round(calculatedCurrent * 100) / 100,
        voltage: Math.round(calculatedVoltage * 100) / 100,
        power: Math.round(calculatedPower * 100) / 100,
        apparentPower: Math.round(apparentPower * 100) / 100
      })
    }
  }

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <h1 className="logo">
            <Link href="/">ProEngineerCalc</Link>
          </h1>
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
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>
            Electrical Power Calculator
          </h1>

          <div className="calculator-form">
            <div className="form-group">
              <label>Phase Type</label>
              <select value={phase} onChange={(e) => setPhase(e.target.value)}>
                <option value="single">Single Phase</option>
                <option value="three">Three Phase</option>
              </select>
            </div>

            <div className="form-group">
              <label>Power Factor</label>
              <input
                type="number"
                value={pf}
                onChange={(e) => setPf(Number(e.target.value))}
                min={0}
                max={1}
                step={0.01}
              />
              <p className="hint">Typical values: 0.85-0.95 for motors, 0.95-1.0 for resistive loads</p>
            </div>

            <div className="form-group">
              <label>Current (Amperes)</label>
              <input
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="Enter current"
              />
            </div>

            <div className="form-group">
              <label>Voltage (Volts)</label>
              <input
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                placeholder="Enter voltage"
              />
            </div>

            <div className="form-group">
              <label>Power (Watts)</label>
              <input
                type="number"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="Enter power"
              />
            </div>

            <button 
              onClick={calculate}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Calculate
            </button>

            {results && (
              <div className="result-group">
                <h4>Results</h4>
                <div className="result-item">
                  <span className="result-label">Current</span>
                  <span className="result-value">{results.current} A</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Voltage</span>
                  <span className="result-value">{results.voltage} V</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Real Power (P)</span>
                  <span className="result-value">{results.power} W</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Apparent Power (S)</span>
                  <span className="result-value">{results.apparentPower} VA</span>
                </div>
              </div>
            )}
          </div>

          <div className="content-section">
            <h2>Formula and Principles</h2>
            
            <h3>Basic Power Equations</h3>
            
            <h3>Single Phase</h3>
            <div className="formula-box">
              P = V x I x PF<br/>
              I = P / (V x PF)<br/>
              V = P / (I x PF)<br/><br/>
              S = V x I
            </div>

            <h3>Three Phase</h3>
            <div className="formula-box">
              P = sqrt(3) x V_L x I_L x PF<br/>
              I_L = P / (sqrt(3) x V_L x PF)<br/>
              V_L = P / (sqrt(3) x I_L x PF)<br/><br/>
              S = sqrt(3) x V_L x I_L
            </div>

            <p>Where:<br/>
            P = Real Power (W)<br/>
            V = Voltage (V)<br/>
            I = Current (A)<br/>
            PF = Power Factor<br/>
            S = Apparent Power (VA)</p>

            <h3>Understanding Power Factor</h3>
            <p>Power factor is the ratio of real power to apparent power:</p>
            <ul>
              <li>PF = 1.0: Perfect (all power is useful)</li>
              <li>PF less than 0.9: Poor (reactive power losses)</li>
              <li>PF less than 0.5: Very poor (significant losses)</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>User Guide</h2>
            
            <h3>How to Use</h3>
            <ol>
              <li>Select phase type (single or three)</li>
              <li>Enter power factor (or use default 0.85)</li>
              <li>Enter any TWO of: Current, Voltage, or Power</li>
              <li>Click Calculate to find the third value</li>
            </ol>

            <h3>Common Applications</h3>
            <ul>
              <li><strong>Wire sizing:</strong> Calculate current from load power</li>
              <li><strong>Transformer sizing:</strong> Calculate apparent power</li>
              <li><strong>Circuit breaker selection:</strong> Verify current rating</li>
              <li><strong>Energy audits:</strong> Analyze power consumption</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>FAQ</h2>
            
            <div className="faq-item">
              <p className="faq-question">Why do I need power factor?</p>
              <p className="faq-answer">Power factor accounts for reactive power in AC circuits. Motors, transformers, and fluorescent lights create reactive power that does not do useful work but causes losses.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">What is the difference between VA and Watts?</p>
              <p className="faq-answer">Watts (W) measure actual useful power. VA measures apparent power (current x voltage). For DC systems they are equal. For AC with PF less than 1, W is less than VA.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">When should I use three-phase calculations?</p>
              <p className="faq-answer">Use three-phase for commercial/industrial loads, large motors, and building main service.</p>
            </div>
          </div>

          <div className="content-section">
            <h2>Related Cases</h2>
            
            <h3>Case 1: Motor Circuit Design</h3>
            <p>A 10 HP motor runs at 480V, three-phase with PF 0.89 and efficiency 92%. Real power = 10x746/0.92 = 8,109W. Current = 8,109 / (sqrt(3) x 480 x 0.89) = 10.9A. Wire should be sized for 125% = 13.6A minimum.</p>
            
            <h3>Case 2: UPS Sizing</h3>
            <p>Critical load: 5kW servers at 208V single-phase, PF 0.95. Apparent power = 5,000 / 0.95 = 5,263VA. For 30-minute backup at 48V, battery capacity = (5,263 / 48) x 0.5 = 55Ah minimum.</p>
          </div>

          <div className="disclaimer">
            <strong>Disclaimer:</strong> All calculations are for reference only. 
            Do not use these results as the final basis for engineering design. 
            Consult a licensed electrical engineer for actual installations.
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>2026 ProEngineerCalc. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
