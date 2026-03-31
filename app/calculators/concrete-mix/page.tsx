'use client'

import { useState } from 'react'
import Link from 'next/link'

// GB standard mix design reference values (kg/m³)
const MIX: Record<string, { cement: number; sand: number; aggregate: number; water: number }> = {
  C20: { cement: 280, sand: 780, aggregate: 1100, water: 175 },
  C25: { cement: 320, sand: 750, aggregate: 1080, water: 175 },
  C30: { cement: 360, sand: 720, aggregate: 1060, water: 175 },
  C35: { cement: 400, sand: 690, aggregate: 1040, water: 170 },
  C40: { cement: 440, sand: 660, aggregate: 1020, water: 165 },
}

export default function ConcreteMix() {
  const [volume, setVolume] = useState('1')
  const [grade,  setGrade]  = useState('C30')
  const [result, setResult] = useState<{ cement: string; sand: string; aggregate: string; water: string; wc: string } | null>(null)
  const [error,  setError]  = useState('')

  const calculate = () => {
    setError('')
    const v = parseFloat(volume)
    if (isNaN(v) || v <= 0) { setError('请输入有效的正数'); return }
    const m = MIX[grade]
    setResult({
      cement:    (v * m.cement).toFixed(1),
      sand:      (v * m.sand).toFixed(1),
      aggregate: (v * m.aggregate).toFixed(1),
      water:     (v * m.water).toFixed(1),
      wc:        (m.water / m.cement).toFixed(3),
    })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/structure">🏗️ 结构工程</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>混凝土配比计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>混凝土方量 (m³)</label><input type="number" min="0" step="any" value={volume} onChange={(e) => setVolume(e.target.value)} /></div>
            <div className="form-group">
              <label>混凝土等级</label>
              <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                {Object.keys(MIX).map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            {error && <p style={{ color: 'red', margin: '0.5rem 0' }}>{error}</p>}
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">水泥 (kg)</span><span className="result-value">{result.cement}</span></div>
                <div className="result-item"><span className="result-label">砂 (kg)</span><span className="result-value">{result.sand}</span></div>
                <div className="result-item"><span className="result-label">骨料 (kg)</span><span className="result-value">{result.aggregate}</span></div>
                <div className="result-item"><span className="result-label">水 (kg)</span><span className="result-value">{result.water}</span></div>
                <div className="result-item"><span className="result-label">水灰比 (W/C)</span><span className="result-value">{result.wc}</span></div>
              </div>
            )}
          </div>

          <div className="content-section">
            <h2>配合比参考依据</h2>
            <div className="formula-box">
              <p>依据 GB 50010 及 JGJ 55 普通混凝土配合比设计规程</p>
              <p>各材料用量 = 单位体积参考值 (kg/m³) × 方量 (m³)</p>
              <p>水灰比 W/C = 用水量 / 水泥用量</p>
            </div>
          </div>

          <div className="content-section">
            <h2>使用说明</h2>
            <ul>
              <li>表中数值为普通硅酸盐水泥、中砂、碎石的参考配合比</li>
              <li>实际施工前须通过试配确定最终配合比</li>
              <li>外加剂、掺合料会改变用水量和水泥用量，需重新设计</li>
              <li>水灰比越低，混凝土强度越高，耐久性越好</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>常见问题</h2>
            <p><strong>Q：C30 和 C35 的区别是什么？</strong><br />C30 表示标准立方体试块 28 天抗压强度标准值为 30 MPa，C35 为 35 MPa。强度越高，水泥用量越多，水灰比越低。</p>
            <p><strong>Q：为什么不能直接用体积比换算？</strong><br />体积比（如 1:2:4）未考虑各材料密度差异，换算出的质量比误差较大，工程上应以质量配合比为准。</p>
            <p><strong>Q：砂率如何影响配合比？</strong><br />砂率过高会增加用水量，过低会影响和易性。本表砂率约 38%～42%，适用于一般工程。</p>
          </div>

          <div className="content-section">
            <h2>计算案例</h2>
            <p><strong>案例：</strong>浇筑 C30 混凝土 5 m³。</p>
            <p>水泥：360 × 5 = 1800 kg</p>
            <p>砂：720 × 5 = 3600 kg</p>
            <p>骨料：1060 × 5 = 5300 kg</p>
            <p>水：175 × 5 = 875 kg，水灰比 = 175/360 ≈ 0.486</p>
          </div>

          <div className="disclaimer"><strong>免责声明：</strong>本计算器仅供工程参考，实际配合比须经试验室试配确认，由专业工程师负责。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}
