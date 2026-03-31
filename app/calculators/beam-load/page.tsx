'use client'

import { useState } from 'react'
import Link from 'next/link'

const E_OPTIONS = [
  { label: '钢 200 GPa',    value: '200' },
  { label: '混凝土 30 GPa', value: '30'  },
]

function calcBeam(w: number, L: number, b: number, h: number, E_GPa: number) {
  const I = (b * h ** 3) / 12
  const M_max = (w * L ** 2) / 8
  const E_MPa = E_GPa * 1000
  const L_mm = L * 1000
  const delta = (5 * w * L_mm ** 4) / (384 * E_MPa * I)
  const sigma = (M_max * 1e6 * (h / 2)) / I
  const delta_allow = L_mm / 300
  const passes = delta <= delta_allow
  return { I, M_max, delta, sigma, delta_allow, passes }
}

export default function BeamLoad() {
  const [load,   setLoad]   = useState('10')
  const [length, setLength] = useState('6')
  const [width,  setWidth]  = useState('200')
  const [height, setHeight] = useState('400')
  const [eVal,   setEVal]   = useState('200')
  const [result, setResult] = useState<ReturnType<typeof calcBeam> | null>(null)
  const [error,  setError]  = useState('')

  const calculate = () => {
    setError('')
    const w = parseFloat(load)
    const L = parseFloat(length)
    const b = parseFloat(width)
    const h = parseFloat(height)
    const E = parseFloat(eVal)
    if ([w, L, b, h, E].some((n) => isNaN(n) || n <= 0)) {
      setError('请输入有效的正数')
      return
    }
    setResult(calcBeam(w, L, b, h, E))
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/structure">🏗️ 结构工程</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>梁荷载计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>均布荷载 (kN/m)</label><input type="number" min="0" step="any" value={load} onChange={(e) => setLoad(e.target.value)} /></div>
            <div className="form-group"><label>跨度 (m)</label><input type="number" min="0" step="any" value={length} onChange={(e) => setLength(e.target.value)} /></div>
            <div className="form-group"><label>梁宽 b (mm)</label><input type="number" min="0" step="any" value={width} onChange={(e) => setWidth(e.target.value)} /></div>
            <div className="form-group"><label>梁高 h (mm)</label><input type="number" min="0" step="any" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
            <div className="form-group">
              <label>弹性模量</label>
              <select value={eVal} onChange={(e) => setEVal(e.target.value)}>
                {E_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            {error && <p style={{ color: 'red', margin: '0.5rem 0' }}>{error}</p>}
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">截面惯性矩 I</span><span className="result-value">{result.I.toExponential(3)} mm⁴</span></div>
                <div className="result-item"><span className="result-label">最大弯矩 M</span><span className="result-value">{result.M_max.toFixed(2)} kN·m</span></div>
                <div className="result-item"><span className="result-label">最大弯曲应力 σ</span><span className="result-value">{result.sigma.toFixed(2)} MPa</span></div>
                <div className="result-item"><span className="result-label">最大挠度 δ</span><span className="result-value">{result.delta.toFixed(2)} mm</span></div>
                <div className="result-item"><span className="result-label">允许挠度 L/300</span><span className="result-value">{result.delta_allow.toFixed(2)} mm</span></div>
                <div className="result-item">
                  <span className="result-label">挠度验算</span>
                  <span className="result-value" style={{ color: result.passes ? 'green' : 'red' }}>
                    {result.passes ? '通过 ✓' : '不通过 ✗'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="content-section">
            <h2>计算公式</h2>
            <div className="formula-box">
              <p>截面惯性矩：I = b·h³ / 12 (mm⁴)</p>
              <p>最大弯矩：M = w·L² / 8 (kN·m)</p>
              <p>最大挠度：δ = 5·w·L⁴ / (384·E·I) (mm)</p>
              <p>最大弯曲应力：σ = M·(h/2) / I (MPa)</p>
              <p>允许挠度：[δ] = L/300</p>
            </div>
          </div>

          <div className="content-section">
            <h2>使用说明</h2>
            <ul>
              <li>本计算器适用于两端简支梁承受均布荷载的情况</li>
              <li>梁宽和梁高均为截面尺寸，单位为 mm</li>
              <li>钢梁弹性模量取 200 GPa，混凝土梁取 30 GPa（C30）</li>
              <li>挠度限值 L/300 适用于一般楼盖梁，屋面梁可取 L/200</li>
              <li>应力结果仅为弯曲正应力，剪切应力需另行验算</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>常见问题</h2>
            <p><strong>Q：挠度不通过怎么办？</strong><br />可增大梁高（对挠度影响最大，I ∝ h³）、增大弹性模量（换用钢梁）或减小跨度（加设中间支撑）。</p>
            <p><strong>Q：均布荷载如何确定？</strong><br />楼面活荷载一般取 2～4 kN/m²，乘以梁的受荷宽度即得线荷载（kN/m），再加上梁自重。</p>
            <p><strong>Q：弯曲应力超限怎么处理？</strong><br />增大截面高度或改用高强度材料（如 Q355 钢代替 Q235）。</p>
          </div>

          <div className="content-section">
            <h2>计算案例</h2>
            <p><strong>案例：</strong>简支钢梁，跨度 6 m，均布荷载 15 kN/m，截面 200×400 mm，E=200 GPa。</p>
            <p>I = 200×400³/12 = 1.067×10⁹ mm⁴</p>
            <p>M = 15×6²/8 = 67.5 kN·m</p>
            <p>δ = 5×15×6000⁴/(384×200000×1.067×10⁹) ≈ 7.6 mm</p>
            <p>允许挠度 = 6000/300 = 20 mm，挠度验算通过。</p>
          </div>

          <div className="disclaimer"><strong>免责声明：</strong>本计算器仅供工程参考，实际设计须由专业结构工程师复核。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}
