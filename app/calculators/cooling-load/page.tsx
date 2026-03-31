'use client'

import { useState } from 'react'
import Link from 'next/link'

function calcCoolingLoad(area: number, height: number, people: number, equipment: number, orientation: number) {
  const Q_envelope = area * height * 30 * orientation
  const Q_people = people * 120
  const Q_equipment = equipment * 1.25
  const Q_total = Q_envelope + Q_people + Q_equipment
  return { Q_envelope, Q_people, Q_equipment, Q_total }
}

export default function CoolingLoad() {
  const [area, setArea] = useState('100')
  const [height, setHeight] = useState('3')
  const [people, setPeople] = useState('10')
  const [equipment, setEquipment] = useState('2000')
  const [orientation, setOrientation] = useState('1.2')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const a = parseFloat(area)
    const h = parseFloat(height)
    const p = parseFloat(people)
    const e = parseFloat(equipment)
    const o = parseFloat(orientation)
    if ([a, h, p, e, o].some(isNaN) || a <= 0 || h <= 0) return
    const r = calcCoolingLoad(a, h, p, e, o)
    setResult({
      Q_envelope: r.Q_envelope.toFixed(0),
      Q_people: r.Q_people.toFixed(0),
      Q_equipment: r.Q_equipment.toFixed(0),
      Q_total_W: r.Q_total.toFixed(0),
      Q_total_kW: (r.Q_total / 1000).toFixed(2),
      Q_total_RT: (r.Q_total / 3517).toFixed(2),
    })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/hvac">🌡️ 暖通空调</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>冷负荷估算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>房间面积 (m²)</label><input type="number" min="1" value={area} onChange={(e) => setArea(e.target.value)} /></div>
            <div className="form-group"><label>层高 (m)</label><input type="number" min="0.1" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
            <div className="form-group"><label>人员数量 (人)</label><input type="number" min="0" value={people} onChange={(e) => setPeople(e.target.value)} /></div>
            <div className="form-group"><label>设备功率 (W)</label><input type="number" min="0" value={equipment} onChange={(e) => setEquipment(e.target.value)} /></div>
            <div className="form-group">
              <label>朝向系数</label>
              <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
                <option value="1.0">北向 (1.0)</option>
                <option value="1.1">东向 / 西向 (1.1)</option>
                <option value="1.2">南向 (1.2)</option>
              </select>
            </div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">围护结构冷负荷 Q_envelope</span><span className="result-value">{result.Q_envelope} W</span></div>
                <div className="result-item"><span className="result-label">人员冷负荷 Q_people</span><span className="result-value">{result.Q_people} W</span></div>
                <div className="result-item"><span className="result-label">设备冷负荷 Q_equipment</span><span className="result-value">{result.Q_equipment} W</span></div>
                <div className="result-item"><span className="result-label">总冷负荷</span><span className="result-value">{result.Q_total_W} W</span></div>
                <div className="result-item"><span className="result-label">总冷负荷</span><span className="result-value">{result.Q_total_kW} kW</span></div>
                <div className="result-item"><span className="result-label">总冷负荷</span><span className="result-value">{result.Q_total_RT} RT</span></div>
              </div>
            )}
          </div>

          <div className="content-section">
            <h2>公式与原理</h2>
            <p>建筑冷负荷由三部分叠加：围护结构传热、人员散热和设备散热。</p>
            <div className="formula-box">
              Q_total = Q_envelope + Q_people + Q_equipment<br/><br/>
              Q_envelope = 面积 × 层高 × 30 × 朝向系数 (W)<br/>
              Q_people = 人数 × 120 (W/人，含显热+潜热)<br/>
              Q_equipment = 设备功率 × 1.25 (W，含同时使用系数)<br/><br/>
              换算：1 RT (冷吨) = 3517 W = 3.517 kW
            </div>
            <p>朝向系数反映太阳辐射对不同朝向外墙的影响：南向受辐射最强取 1.2，北向最弱取 1.0，东西向居中取 1.1。设备功率乘以 1.25 是考虑到设备散热效率及同时使用率的修正系数。</p>
          </div>

          <div className="content-section">
            <h2>使用说明</h2>
            <ol>
              <li>输入房间面积和层高，确定空间体积。</li>
              <li>填写房间内的设计人员数量（按满员考虑）。</li>
              <li>填写房间内所有设备的总安装功率（电脑、服务器、照明等）。</li>
              <li>根据房间主要外墙朝向选择朝向系数。</li>
              <li>点击"计算"，查看各分项及总冷负荷。</li>
              <li>根据总冷负荷（RT）选择合适的空调机组容量，建议留 10%–15% 余量。</li>
            </ol>
          </div>

          <div className="content-section">
            <h2>常见问题</h2>
            <div className="faq-item">
              <p className="faq-question">什么是冷负荷？</p>
              <p className="faq-answer">冷负荷是指为维持室内设计温度，空调系统在单位时间内需要从房间带走的热量，单位为 W 或 kW。它决定了空调设备的选型容量。</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">朝向如何影响冷负荷？</p>
              <p className="faq-answer">南向外墙全天受太阳直射时间最长，太阳辐射得热最大，因此冷负荷最高。北向基本无直射阳光，冷负荷最低。东西向介于两者之间，早晨或下午会受到较强的斜射阳光。</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">人员散热为什么取 120 W/人？</p>
              <p className="faq-answer">办公室轻度活动状态下，每人散热约为显热 65 W + 潜热 55 W = 120 W。重体力劳动场所该值会更高，可达 300 W/人以上。</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">这个计算结果能直接用于设备选型吗？</p>
              <p className="faq-answer">本工具为快速估算，适合方案阶段。正式设计应按 GB 50736 采用逐时冷负荷计算法，并考虑新风负荷、围护结构热工参数、遮阳措施等更多因素。</p>
            </div>
          </div>

          <div className="content-section">
            <h2>案例分析</h2>
            <p><strong>案例：某 100 m² 南向办公室</strong></p>
            <p>条件：面积 100 m²，层高 3 m，10 人，设备功率 2000 W，南向（朝向系数 1.2）。</p>
            <div className="formula-box">
              Q_envelope = 100 × 3 × 30 × 1.2 = 10,800 W<br/>
              Q_people = 10 × 120 = 1,200 W<br/>
              Q_equipment = 2000 × 1.25 = 2,500 W<br/>
              Q_total = 10,800 + 1,200 + 2,500 = 14,500 W<br/>
              = 14.5 kW = 4.12 RT
            </div>
            <p>结论：该办公室需要约 4.1 RT（约 14.5 kW）的制冷量，可选用一台 5 HP（约 14 kW）或 6 HP（约 17 kW）的商用空调机组，留有适当余量。</p>
          </div>

          <div className="disclaimer"><strong>免责声明：</strong>本计算结果仅供参考，不得直接用于正式工程设计。实际工程请委托具备资质的专业人员按相关规范进行计算。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}
