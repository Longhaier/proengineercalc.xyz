'use client'

import { useState } from 'react'
import Link from 'next/link'

const FLUIDS = [
  { label: '水 20°C', nu: '1e-6' },
  { label: '水 60°C', nu: '0.474e-6' },
  { label: '空气 20°C', nu: '15.1e-6' },
  { label: '油 (润滑油)', nu: '50e-6' },
  { label: '自定义', nu: '' },
]

export default function Reynolds() {
  const [fluid, setFluid] = useState('水 20°C')
  const [velocity, setVelocity] = useState('2')
  const [diameter, setDiameter] = useState('100')
  const [nu, setNu] = useState('1e-6')
  const [result, setResult] = useState<any>(null)

  const handleFluidChange = (label: string) => {
    setFluid(label)
    const found = FLUIDS.find(f => f.label === label)
    if (found && found.nu) setNu(found.nu)
  }

  const calculate = () => {
    const v = parseFloat(velocity)
    const d = parseFloat(diameter) / 1000
    const viscosity = parseFloat(nu)
    if ([v, d, viscosity].some(isNaN) || v <= 0 || d <= 0 || viscosity <= 0) return
    const Re = (v * d) / viscosity
    let regime = ''
    let regimeDesc = ''
    if (Re < 2300) {
      regime = '层流'
      regimeDesc = '流体呈有序的平行层状流动，无横向混合，压降与流速成正比。'
    } else if (Re > 4000) {
      regime = '湍流'
      regimeDesc = '流体呈无规则的混乱运动，横向混合强烈，传热传质效率高，压降与流速的平方近似成正比。'
    } else {
      regime = '过渡流'
      regimeDesc = '介于层流与湍流之间的不稳定状态，流态随扰动变化，工程设计中应尽量避免在此区间运行。'
    }
    setResult({ Re: Re.toFixed(0), regime, regimeDesc })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/fluid">💧 流体力学</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>雷诺数计算器</h1>
          <div className="calculator-form">
            <div className="form-group">
              <label>流体选择</label>
              <select value={fluid} onChange={(e) => handleFluidChange(e.target.value)}>
                {FLUIDS.map(f => <option key={f.label} value={f.label}>{f.label}</option>)}
              </select>
            </div>
            <div className="form-group"><label>流速 (m/s)</label><input type="number" min="0.001" step="0.1" value={velocity} onChange={(e) => setVelocity(e.target.value)} /></div>
            <div className="form-group"><label>特征尺寸 / 管道直径 (mm)</label><input type="number" min="0.1" value={diameter} onChange={(e) => setDiameter(e.target.value)} /></div>
            <div className="form-group">
              <label>运动粘度 ν (m²/s)</label>
              <input type="number" step="any" value={nu} onChange={(e) => { setNu(e.target.value); setFluid('自定义') }} />
            </div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">雷诺数 Re</span><span className="result-value">{result.Re}</span></div>
                <div className="result-item"><span className="result-label">流态</span><span className="result-value">{result.regime}</span></div>
                <div className="result-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}>
                  <span className="result-label">流态说明</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{result.regimeDesc}</span>
                </div>
              </div>
            )}
          </div>

          <div className="content-section">
            <h2>公式与原理</h2>
            <p>雷诺数（Reynolds Number）是流体力学中最重要的无量纲数之一，用于判断流体的流动状态。</p>
            <div className="formula-box">
              Re = ρVD / μ = VD / ν<br/><br/>
              ρ — 流体密度 (kg/m³)<br/>
              V — 流速 (m/s)<br/>
              D — 特征尺寸，管道取内径 (m)<br/>
              μ — 动力粘度 (Pa·s)<br/>
              ν — 运动粘度 = μ/ρ (m²/s)<br/><br/>
              流态判断（圆管内流）：<br/>
              Re &lt; 2300　→　层流<br/>
              2300 ≤ Re ≤ 4000　→　过渡流<br/>
              Re &gt; 4000　→　湍流
            </div>
            <p>雷诺数的物理意义是惯性力与粘性力之比。Re 小时粘性力占主导，流体保持有序的层流；Re 大时惯性力占主导，流体发展为混乱的湍流。</p>
          </div>

          <div className="content-section">
            <h2>使用说明</h2>
            <ol>
              <li>从下拉菜单选择流体类型，运动粘度将自动填入。</li>
              <li>如需计算其他流体，选择"自定义"并手动输入运动粘度。</li>
              <li>输入流速（m/s）和管道内径（mm）。</li>
              <li>点击"计算"，查看雷诺数和流态判断结果。</li>
              <li>对于非圆形截面（如矩形风管），特征尺寸取水力直径 D_h = 4A/P，其中 A 为截面积，P 为湿周。</li>
            </ol>
          </div>

          <div className="content-section">
            <h2>常见问题</h2>
            <div className="faq-item">
              <p className="faq-question">为什么雷诺数重要？</p>
              <p className="faq-answer">雷诺数决定了流体的流动状态，而流动状态直接影响传热系数、压力损失和流量计的测量精度。暖通、给排水、化工等工程设计都需要先判断流态，再选用对应的计算公式。</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">层流和湍流有什么区别？</p>
              <p className="faq-answer">层流中流体质点沿平行流线运动，无横向混合，传热主要靠导热，摩擦系数 f = 64/Re。湍流中流体质点做无规则运动，横向混合剧烈，传热效率远高于层流，但压力损失也更大，摩擦系数与管壁粗糙度有关。</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">过渡流区间如何处理？</p>
              <p className="faq-answer">过渡流（Re 2300–4000）是不稳定区间，流态会在层流和湍流之间随机切换。工程设计中应尽量避免在此区间运行，通常按湍流保守计算压力损失。</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">温度如何影响雷诺数？</p>
              <p className="faq-answer">温度升高时，液体（如水）的粘度降低，运动粘度减小，雷诺数增大，更容易进入湍流。气体（如空气）则相反，温度升高粘度增大，但密度减小，综合效果是运动粘度增大，雷诺数减小。</p>
            </div>
          </div>

          <div className="content-section">
            <h2>案例分析</h2>
            <p><strong>案例一：空调冷冻水管道</strong></p>
            <p>条件：水温 20°C（ν = 1×10⁻⁶ m²/s），流速 1.5 m/s，管道内径 80 mm。</p>
            <div className="formula-box">
              Re = 1.5 × 0.08 / 1×10⁻⁶ = 120,000<br/>
              Re &gt; 4000 → 湍流<br/>
              可使用 Blasius 公式：f = 0.316 / 120000^0.25 = 0.0168
            </div>
            <p>结论：该管道内为充分发展的湍流，传热效果好，适合空调水系统。</p>

            <p style={{ marginTop: '1.5rem' }}><strong>案例二：空调送风风管</strong></p>
            <p>条件：空气 20°C（ν = 15.1×10⁻⁶ m²/s），风速 6 m/s，风管水力直径 400 mm。</p>
            <div className="formula-box">
              Re = 6 × 0.4 / 15.1×10⁻⁶ = 158,940<br/>
              Re &gt; 4000 → 湍流<br/>
              风管内空气流动为湍流，符合暖通设计预期。
            </div>
            <p>结论：空气在风管内的雷诺数远大于临界值，为湍流状态，可按湍流公式计算风管阻力。</p>
          </div>

          <div className="disclaimer"><strong>免责声明：</strong>本计算结果仅供参考，不得直接用于正式工程设计。实际工程请委托具备资质的专业人员按相关规范进行计算。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}
