'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CoolingLoad() {
  const [area, setArea] = useState('100')
  const [height, setHeight] = useState('3')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const a = parseFloat(area)
    const h = parseFloat(height)
    const volume = a * h
    const watts = volume * 25
    setResult({ volume: volume.toFixed(1), watts: watts.toFixed(0), tons: (watts / 3517).toFixed(2) })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/hvac">🌡️ 暖通空调</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>冷负荷估算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>房间面积 (m²)</label><input type="number" value={area} onChange={(e) => setArea(e.target.value)} /></div>
            <div className="form-group"><label>层高 (m)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">冷负荷</span><span className="result-value">{result.watts} W</span></div>
                <div className="result-item"><span className="result-label">冷吨</span><span className="result-value">{result.tons} RT</span></div>
              </div>
            )}
          </div>
          <div className="disclaimer"><strong>免责声明：</strong>仅供参考。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}
