'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PipePressure() {
  const [flow, setFlow] = useState('50')
  const [diameter, setDiameter] = useState('100')
  const [length, setLength] = useState('100')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const Q = parseFloat(flow) / 3600
    const d = parseFloat(diameter) / 1000
    const L = parseFloat(length)
    const v = Q / (Math.PI * Math.pow(d/2, 2))
    const f = 0.02
    const hf = f * (L/d) * (Math.pow(v, 2) / (2 * 9.81))
    setResult({ velocity: v.toFixed(2), pressureLoss: (hf * 9.81).toFixed(2) })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 工程师计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/fluid">💧 流体力学</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>管道压力损失计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>流量 (m³/h)</label><input type="number" value={flow} onChange={(e) => setFlow(e.target.value)} /></div>
            <div className="form-group"><label>管径 (mm)</label><input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} /></div>
            <div className="form-group"><label>管道长度 (m)</label><input type="number" value={length} onChange={(e) => setLength(e.target.value)} /></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">流速</span><span className="result-value">{result.velocity} m/s</span></div>
                <div className="result-item"><span className="result-label">压力损失</span><span className="result-value">{result.pressureLoss} kPa</span></div>
              </div>
            )}
          </div>
          <div className="disclaimer"><strong>免责声明：</strong>仅供参考。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 工程师计算器</p></div></footer>
    </>
  )
}
