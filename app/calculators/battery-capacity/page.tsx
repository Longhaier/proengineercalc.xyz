'use client'

import { useState } from 'react'
import Link from 'next/link'

function calcBattery(P: number, h: number, V: number, dod: number, eff: number) {
  const whActual = (P * h) / (eff / 100)
  const whBattery = whActual / (dod / 100)
  const ahRaw = whBattery / V
  const standards = [100, 150, 200, 300, 400, 500]
  const recommended = standards.find(s => s >= ahRaw) ?? Math.ceil(ahRaw / 100) * 100
  return { whActual, whBattery, ahRaw, recommended }
}

export default function BatteryCapacity() {
  const [power, setPower] = useState('1000')
  const [hours, setHours] = useState('4')
  const [voltage, setVoltage] = useState('48')
  const [dod, setDod] = useState('80')
  const [efficiency, setEfficiency] = useState('90')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const P = parseFloat(power)
    const h = parseFloat(hours)
    const V = parseFloat(voltage)
    const d = parseFloat(dod)
    const e = parseFloat(efficiency)
    if ([P, h, V, d, e].some(isNaN) || V <= 0 || d <= 0 || e <= 0) return
    setResult(calcBattery(P, h, V, d, e))
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/electrical">⚡ 电气工程</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>蓄电池容量计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>负载功率 (W)</label><input type="number" value={power} onChange={(e)=>setPower(e.target.value)} /></div>
            <div className="form-group"><label>备用时间 (h)</label><input type="number" value={hours} onChange={(e)=>setHours(e.target.value)} /></div>
            <div className="form-group"><label>电池电压 (V)</label><input type="number" value={voltage} onChange={(e)=>setVoltage(e.target.value)} /></div>
            <div className="form-group"><label>放电深度 DoD (%)</label><input type="number" value={dod} min="1" max="100" onChange={(e)=>setDod(e.target.value)} /></div>
            <div className="form-group"><label>逆变器效率 (%)</label><input type="number" value={efficiency} min="1" max="100" onChange={(e)=>setEfficiency(e.target.value)} /></div>
            <button onClick={calculate} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px'}}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">实际所需能量</span><span className="result-value">{result.whActual.toFixed(0)} Wh</span></div>
                <div className="result-item"><span className="result-label">电池容量 (Wh)</span><span className="result-value">{result.whBattery.toFixed(0)} Wh</span></div>
                <div className="result-item"><span className="result-label">电池容量 (Ah)</span><span className="result-value">{result.ahRaw.toFixed(1)} Ah</span></div>
                <div className="result-item"><span className="result-label">推荐选型</span><span className="result-value">{result.recommended} Ah</span></div>
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>公式原理</h2>
            <p>蓄电池容量计算需要考虑两个关键修正系数：放电深度（DoD）和逆变器效率。忽略这两个参数会导致电池容量严重不足。</p>
            <div className="formula-box">
              实际所需能量 = 负载功率(W) × 备用时间(h) ÷ 逆变器效率<br/>
              电池容量(Wh) = 实际所需能量 ÷ DoD<br/>
              电池容量(Ah) = 电池容量(Wh) ÷ 电池电压(V)
            </div>
            <p><strong>DoD（放电深度）：</strong>电池实际可用的容量比例。铅酸电池通常设为50%~80%，锂电池可达80%~90%。设置过高会大幅缩短电池寿命。</p>
            <p><strong>逆变器效率：</strong>将直流电转换为交流电时的能量损耗，典型值85%~95%。效率越低，需要的电池容量越大。</p>
          </div>
          <div className="content-section">
            <h2>使用说明</h2>
            <ol>
              <li>输入负载总功率（所有用电设备功率之和）</li>
              <li>输入需要保障的备用时间</li>
              <li>输入电池组标称电压（常见12V、24V、48V）</li>
              <li>根据电池类型设置DoD：铅酸电池建议50%~80%，锂电池建议80%~90%</li>
              <li>输入逆变器效率，一般取90%</li>
              <li>计算结果会自动向上取整到标准规格</li>
            </ol>
          </div>
          <div className="content-section">
            <h2>常见问题</h2>
            <div className="faq-item"><p className="faq-question">DoD是什么？</p><p className="faq-answer">DoD（Depth of Discharge，放电深度）是指电池实际放出的电量占总容量的百分比。例如100Ah电池DoD=80%，则实际可用80Ah，剩余20Ah作为保护余量。</p></div>
            <div className="faq-item"><p className="faq-question">为什么不能100%放电？</p><p className="faq-answer">深度放电会加速电池极板硫化（铅酸）或造成过放保护（锂电），大幅缩短循环寿命。铅酸电池每次100%放电可能只有200次循环，而50%放电可达500次以上。</p></div>
            <div className="faq-item"><p className="faq-question">铅酸电池与锂电池DoD有何区别？</p><p className="faq-answer">铅酸电池推荐DoD为50%~80%，锂铁磷酸电池（LiFePO4）可达80%~90%，三元锂电池可达80%~85%。锂电池DoD更高意味着同等容量下实际可用能量更多，综合成本更低。</p></div>
          </div>
          <div className="content-section">
            <h2>案例</h2>
            <p><strong>UPS系统设计：</strong>某工厂UPS需保障5kW负载运行2小时，采用48V电池组，DoD=80%，逆变器效率90%。</p>
            <p>实际所需能量 = 5000 × 2 ÷ 0.9 = 11,111 Wh</p>
            <p>电池容量(Wh) = 11,111 ÷ 0.8 = 13,889 Wh</p>
            <p>电池容量(Ah) = 13,889 ÷ 48 = 289 Ah → 推荐选型 300 Ah</p>
            <p>若不考虑DoD和效率，简单计算仅需 5000×2÷48 ≈ 208 Ah，实际会严重不足。</p>
          </div>
          <div className="disclaimer"><strong>免责声明：</strong>所有计算结果仅供参考，实际选型请结合电池厂商规格和专业工程师意见。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}
