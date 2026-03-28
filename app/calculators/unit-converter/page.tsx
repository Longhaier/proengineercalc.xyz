'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UnitConverter() {
  const [value, setValue] = useState('1')
  const [category, setCategory] = useState('length')
  const [from, setFrom] = useState('m')
  const [result, setResult] = useState<any>(null)

  const units: Record<string, Record<string, number>> = {
    length: { m: 1, cm: 100, mm: 1000, km: 0.001, inch: 39.37, ft: 3.281, yard: 1.094 },
    mass: { kg: 1, g: 1000, tonne: 0.001, lb: 2.205, oz: 35.274 },
    pressure: { bar: 1, kPa: 100, psi: 14.5, atm: 0.987, MPa: 0.1 },
    temperature: { C: 1, F: 1 }
  }

  const calculate = () => {
    const v = parseFloat(value)
    if (category === 'temperature') {
      const celsius = from === 'C' ? v : (v - 32) * 5/9
      setResult({ C: celsius.toFixed(2), F: (celsius * 9/5 + 32).toFixed(2) })
    } else {
      const base = v / (units[category]?.[from] || 1)
      const r: any = {}
      Object.entries(units[category] || {}).forEach(([u, f]) => { r[u] = (base * f).toFixed(4) })
      setResult(r)
    }
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/structure">🏗️ 结构工程</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>单位换算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>数值</label><input type="number" value={value} onChange={(e) => setValue(e.target.value)} /></div>
            <div className="form-group"><label>类别</label><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="length">长度</option><option value="mass">质量</option><option value="pressure">压力</option><option value="temperature">温度</option></select></div>
            <div className="form-group"><label>源单位</label><select value={from} onChange={(e) => setFrom(e.target.value)}>{Object.keys(units[category] || {}).map(u => <option key={u} value={u}>{u}</option>)}</select></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>换算</button>
            {result && (
              <div className="result-group">
                {Object.entries(result).map(([k, v]) => <div key={k} className="result-item"><span className="result-label">{k}</span><span className="result-value">{String(v)}</span></div>)}
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
