'use client'

import { useState } from 'react'
import Link from 'next/link'

const FLUIDS: Record<string, { nu: number; rho: number; label: string }> = {
  water20: { nu: 1e-6,     rho: 998, label: '水 20°C' },
  water60: { nu: 0.474e-6, rho: 983, label: '水 60°C' },
  oil:     { nu: 50e-6,    rho: 870, label: '油'      },
}

function calcPipePressure(
  flowM3h: number, diamMm: number, lengthM: number, fluidKey: string, roughnessMm: number
) {
  const Q = flowM3h / 3600
  const d = diamMm / 1000
  const L = lengthM
  const eps = roughnessMm / 1000
  const { nu, rho } = FLUIDS[fluidKey]
  const A = Math.PI * (d / 2) ** 2
  const v = Q / A
  const Re = (v * d) / nu
  let f: number
  let regime: string
  if (Re < 2300) {
    f = 64 / Re
    regime = '层流'
  } else {
    f = 0.25 / Math.log10(eps / (3.7 * d) + 5.74 / Re ** 0.9) ** 2
    regime = Re < 4000 ? '过渡流' : '湍流'
  }
  const hf = f * (L / d) * v ** 2 / (2 * 9.81)
  const dP = (rho * 9.81 * hf) / 1000
  return { v, Re, f, hf, dP, regime }
}

export default function PipePressure() {
  const [flow,      setFlow]      = useState('50')
  const [diameter,  setDiameter]  = useState('100')
  const [length,    setLength]    = useState('100')
  const [fluid,     setFluid]     = useState('water20')
  const [roughness, setRoughness] = useState('0.046')
  const [result,    setResult]    = useState<ReturnType<typeof calcPipePressure> | null>(null)
  const [error,     setError]     = useState('')

  const calculate = () => {
    setError('')
    const Q = parseFloat(flow)
    const d = parseFloat(diameter)
    const L = parseFloat(length)
    const eps = parseFloat(roughness)
    if ([Q, d, L, eps].some((n) => isNaN(n) || n <= 0)) {
      setError('请输入有效的正数')
      return
    }
    setResult(calcPipePressure(Q, d, L, fluid, eps))
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/fluid">💧 流体力学</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>管道压力损失计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>流量 (m³/h)</label><input type="number" min="0" step="any" value={flow} onChange={(e) => setFlow(e.target.value)} /></div>
            <div className="form-group"><label>管径 (mm)</label><input type="number" min="0" step="any" value={diameter} onChange={(e) => setDiameter(e.target.value)} /></div>
            <div className="form-group"><label>管道长度 (m)</label><input type="number" min="0" step="any" value={length} onChange={(e) => setLength(e.target.value)} /></div>
            <div className="form-group">
              <label>流体</label>
              <select value={fluid} onChange={(e) => setFluid(e.target.value)}>
                {Object.entries(FLUIDS).map(([k, f]) => <option key={k} value={k}>{f.label}</option>)}
              </select>
            </div>
            <div className="form-group"><label>管材粗糙度 (mm) — 钢管默认 0.046</label><input type="number" min="0" step="any" value={roughness} onChange={(e) => setRoughness(e.target.value)} /></div>
            {error && <p style={{ color: 'red', margin: '0.5rem 0' }}>{error}</p>}
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">流速</span><span className="result-value">{result.v.toFixed(3)} m/s</span></div>
                <div className="result-item"><span className="result-label">雷诺数 Re</span><span className="result-value">{result.Re.toFixed(0)}</span></div>
                <div className="result-item"><span className="result-label">流态</span><span className="result-value">{result.regime}</span></div>
                <div className="result-item"><span className="result-label">摩擦系数 f</span><span className="result-value">{result.f.toFixed(5)}</span></div>
                <div className="result-item"><span className="result-label">水头损失</span><span className="result-value">{result.hf.toFixed(3)} m</span></div>
                <div className="result-item"><span className="result-label">压力损失 ΔP</span><span className="result-value">{result.dP.toFixed(3)} kPa</span></div>
              </div>
            )}
          </div>

          <div className="content-section">
            <h2>计算公式</h2>
            <div className="formula-box">
              <p>Darcy-Weisbach 方程：hf = f · (L/d) · v² / (2g)</p>
              <p>ΔP = ρ · g · hf / 1000 (kPa)</p>
              <p>层流 (Re &lt; 2300)：f = 64 / Re</p>
              <p>湍流 — Swamee-Jain 显式公式：</p>
              <p>f = 0.25 / [lg(ε/(3.7d) + 5.74/Re⁰·⁹)]²</p>
            </div>
          </div>

          <div className="content-section">
            <h2>使用说明</h2>
            <ul>
              <li>输入管道实际内径（非公称直径）</li>
              <li>钢管粗糙度通常取 0.046 mm，铸铁管取 0.26 mm，塑料管取 0.0015 mm</li>
              <li>Re &lt; 2300 为层流，Re &gt; 4000 为湍流，中间为过渡区</li>
              <li>结果仅为沿程损失，局部损失需另行计算</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>常见问题</h2>
            <p><strong>Q：为什么层流和湍流用不同公式？</strong><br />层流中摩擦系数仅与 Re 有关（f=64/Re），湍流时管壁粗糙度也起作用，需用 Colebrook-White 方程（此处用等效的 Swamee-Jain 显式近似）。</p>
            <p><strong>Q：局部损失如何估算？</strong><br />通常取沿程损失的 10%～30% 作为局部损失附加量，或用当量长度法逐一计算弯头、阀门等。</p>
            <p><strong>Q：工业管道推荐流速是多少？</strong><br />水管一般 1～3 m/s，蒸汽管 20～40 m/s，油管 0.5～2 m/s。</p>
          </div>

          <div className="content-section">
            <h2>计算案例</h2>
            <p><strong>案例：</strong>DN100 钢管，长 50 m，输送 20°C 水，流量 30 m³/h，粗糙度 0.046 mm。</p>
            <p>v = 30/3600 / (π×0.05²) ≈ 1.06 m/s，Re ≈ 106000（湍流）</p>
            <p>f ≈ 0.0198，hf ≈ 5.67 m，ΔP ≈ 55.5 kPa</p>
          </div>

          <div className="disclaimer"><strong>免责声明：</strong>本计算器仅供工程参考，实际设计须由专业工程师复核。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}
