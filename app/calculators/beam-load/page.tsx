'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BeamLoad() {
  const [load, setLoad] = useState('10')
  const [length, setLength] = useState('6')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const w = parseFloat(load)
    const L = parseFloat(length)
    const maxMoment = w * Math.pow(L, 2) / 8
    const maxDeflection = (w * Math.pow(L * 1000, 3)) / (384 * 200000 * 83333333)
    setResult({ moment: maxMoment.toFixed(1), deflection: maxDeflection.toFixed(2) })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/structure">🏗️ 结构工程</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>梁荷载计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>均布荷载 (kN/m)</label><input type="number" value={load} onChange={(e) => setLoad(e.target.value)} /></div>
            <div className="form-group"><label>跨度 (m)</label><input type="number" value={length} onChange={(e) => setLength(e.target.value)} /></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">最大弯矩</span><span className="result-value">{result.moment} kN·m</span></div>
                <div className="result-item"><span className="result-label">挠度</span><span className="result-value">{result.deflection} mm</span></div>
              </div>
            )}
          </div>
          <div className="content-section"><h2>公式</h2><div className="formula-box">M = wL²/8<br/>δ = wL³/384EI<br/>(假设 200mm × 400mm 梁)</div></div>
          <div className="disclaimer"><strong>免责声明：</strong>仅供参考。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}
