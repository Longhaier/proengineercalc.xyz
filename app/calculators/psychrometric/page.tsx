'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Psychrometric() {
  const [mode, setMode] = useState('enthalpy')
  const [temp, setTemp] = useState('')
  const [humidity, setHumidity] = useState('')
  const [pressure, setPressure] = useState('101.325')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const T = parseFloat(temp)
    const RH = parseFloat(humidity)
    const P = parseFloat(pressure) || 101.325
    
    if (isNaN(T) || isNaN(RH)) return
    
    const Ps = 0.61078 * Math.exp((17.27 * T) / (T + 237.3))
    const Pv = Ps * RH / 100
    const W = 0.622 * Pv / (P - Pv)
    const h = 1.005 * T + W * (2501 + 1.86 * T)
    const Td = (237.3 * Math.log(Pv / 6.1078)) / (7.5 - Math.log(Pv / 6.1078))
    
    setResult({ Ps: Ps.toFixed(3), Pv: Pv.toFixed(3), W: (W*1000).toFixed(2), h: h.toFixed(1), Td: Td.toFixed(1) })
  }

  const calculateFromEnthalpy = () => {
    const targetH = parseFloat(temp)
    const RH = parseFloat(humidity) || 50
    const P = parseFloat(pressure) || 101.325
    
    if (isNaN(targetH)) return
    
    for (let T = -10; T <= 50; T += 0.1) {
      const Ps = 0.61078 * Math.exp((17.27 * T) / (T + 237.3))
      const Pv = Ps * RH / 100
      const W = 0.622 * Pv / (P - Pv)
      const h = 1.005 * T + W * (2501 + 1.86 * T)
      if (Math.abs(h - targetH) < 0.5) {
        setResult({ temp: T.toFixed(1), humidity: RH, enthalpy: h.toFixed(1), found: true })
        return
      }
    }
    setResult({ error: 'Cannot find matching temperature' })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">ProEngineerCalc</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">Home</Link><Link href="/calculators/hvac">HVAC</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>Psychrometric Calculator</h1>
          <div className="calculator-form">
            <div className="form-group"><label>Calculation Mode</label>
              <select value={mode} onChange={(e)=>setMode(e.target.value)}>
                <option value="enthalpy">Calculate from T+RH</option>
                <option value="reverse">Calculate T from Enthalpy</option>
              </select>
            </div>
            <div className="form-group"><label>Temperature (°C)</label><input type="number" value={temp} onChange={(e)=>setTemp(e.target.value)}/></div>
            <div className="form-group"><label>Relative Humidity (%)</label><input type="number" value={humidity} onChange={(e)=>setHumidity(e.target.value)}/></div>
            <div className="form-group"><label>Atmospheric Pressure (kPa)</label><input type="number" value={pressure} onChange={(e)=>setPressure(e.target.value)}/></div>
            <button onClick={mode==='enthalpy'?calculate:calculateFromEnthalpy} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px'}}>Calculate</button>
            {result && !result.error && (
              <div className="result-group">
                {result.h && <div className="result-item"><span className="result-label">Enthalpy</span><span className="result-value">{result.h} kJ/kg</span></div>}
                {result.W && <div className="result-item"><span className="result-label">Humidity Ratio</span><span className="result-value">{result.W} g/kg</span></div>}
                {result.Td && <div className="result-item"><span className="result-label">Dew Point</span><span className="result-value">{result.Td} °C</span></div>}
                {result.temp && <div className="result-item"><span className="result-label">Temperature</span><span className="result-value">{result.temp} °C</span></div>}
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>Formula and Principles</h2>
            <p>Psychrometrics studies the thermodynamic properties of gas-vapor mixtures. The key relationships are:</p>
            <div className="formula-box">
              Ps = 0.61078 × exp(17.27T/(T+237.3))<br/>
              Pv = Ps × RH/100<br/>
              W = 0.622 × Pv/(P-Pv)<br/>
              h = 1.005T + W(2501 + 1.86T)
            </div>
          </div>
          <div className="content-section">
            <h2>User Guide</h2>
            <ol>
              <li>Select calculation mode</li>
              <li>Enter temperature and relative humidity</li>
              <li>Adjust pressure if needed (default: 101.325 kPa)</li>
              <li>Click Calculate to get all psychrometric properties</li>
            </ol>
          </div>
          <div className="content-section">
            <h2>FAQ</h2>
            <div className="faq-item"><p className="faq-question">What is enthalpy?</p><p className="faq-answer">Enthalpy is the total heat content of air per unit mass, measured in kJ/kg. It combines sensible heat and latent heat from water vapor.</p></div>
            <div className="faq-item"><p className="faq-question">Why does pressure matter?</p><p className="faq-answer">At higher altitudes, lower pressure reduces air's moisture capacity. This affects all psychrometric calculations.</p></div>
          </div>
          <div className="content-section">
            <h2>Related Cases</h2>
            <p><strong>Case 1:</strong> A data center at 25°C, 50% RH has enthalpy of 50.4 kJ/kg. This determines cooling coil load.</p>
            <p><strong>Case 2:</strong> Industrial drying process requires air at 80°C with 10% RH, giving enthalpy of 110 kJ/kg.</p>
          </div>
          <div className="disclaimer"><strong>Disclaimer:</strong> All calculations are for reference only.</div>
        </div>
      </main>
      <footer><div className="container"><p>2026 ProEngineerCalc</p></div></footer>
    </>
  )
}
