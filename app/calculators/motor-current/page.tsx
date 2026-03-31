'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MotorCurrent() {
  const [power, setPower] = useState('37')
  const [voltage, setVoltage] = useState('380')
  const [pf, setPf] = useState('0.85')
  const [efficiency, setEfficiency] = useState('92')
  const [startMethod, setStartMethod] = useState('direct')
  const [result, setResult] = useState<any>(null)

  const startMultipliers: Record<string, number> = {
    direct: 6,
    star_delta: 2,
    soft_start: 3,
    vfd: 1.5
  }

  const startLabels: Record<string, string> = {
    direct: '直接启动 (×6)',
    star_delta: '星三角启动 (×2)',
    soft_start: '软启动器 (×3)',
    vfd: '变频器 (×1.5)'
  }

  const calculate = () => {
    const P = parseFloat(power) * 1000
    const V = parseFloat(voltage)
    const PF = parseFloat(pf)
    const eta = parseFloat(efficiency) / 100
    if (isNaN(P) || isNaN(V) || isNaN(PF) || isNaN(eta)) return
    const I_rated = P / (Math.sqrt(3) * V * PF * eta)
    const I_start = I_rated * startMultipliers[startMethod]
    const breakerSizes = [6,10,16,20,25,32,40,50,63,80,100,125,160,200,250,315,400]
    const breaker = breakerSizes.find(s => s >= I_rated * 2.5) || 400
    const relay = I_rated * 1.05
    setResult({
      rated: I_rated.toFixed(2),
      start: I_start.toFixed(1),
      breaker,
      relay: relay.toFixed(2)
    })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1><p className="tagline">专业工程师计算工具箱</p></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/hvac">🌡️ 暖通空调</Link><Link href="/calculators/electrical">⚡ 电气工程</Link><Link href="/calculators/fluid">💧 流体力学</Link><Link href="/calculators/structure">🏗️ 结构工程</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>电机电流计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>电机功率 (kW)</label><input type="number" value={power} onChange={(e)=>setPower(e.target.value)}/></div>
            <div className="form-group"><label>电源电压 (V)</label><input type="number" value={voltage} onChange={(e)=>setVoltage(e.target.value)}/></div>
            <div className="form-group"><label>功率因数</label><input type="number" step="0.01" value={pf} onChange={(e)=>setPf(e.target.value)}/></div>
            <div className="form-group"><label>电机效率 (%)</label><input type="number" value={efficiency} onChange={(e)=>setEfficiency(e.target.value)}/></div>
            <div className="form-group"><label>启动方式</label>
              <select value={startMethod} onChange={(e)=>setStartMethod(e.target.value)}>
                {Object.entries(startLabels).map(([k,v])=><option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <button onClick={calculate} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px',fontSize:'1rem',fontWeight:600,cursor:'pointer'}}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">额定电流</span><span className="result-value">{result.rated} A</span></div>
                <div className="result-item"><span className="result-label">启动电流</span><span className="result-value">{result.start} A</span></div>
                <div className="result-item"><span className="result-label">推荐断路器</span><span className="result-value">{result.breaker} A</span></div>
                <div className="result-item"><span className="result-label">热继电器整定值</span><span className="result-value">{result.relay} A</span></div>
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>公式与原理</h2>
            <p>三相异步电动机额定电流由功率、电压、功率因数和效率共同决定，启动电流与启动方式密切相关。</p>
            <div className="formula-box">
              I_rated = P / (√3 × V × cosφ × η)（A）<br/>
              I_start = I_rated × 启动倍数<br/>
              断路器整定：≥ I_rated × 2.5<br/>
              热继电器整定：I_rated × 1.05
            </div>
          </div>
          <div className="content-section">
            <h2>使用说明</h2>
            <ol>
              <li>输入电机额定功率（kW）</li>
              <li>输入电源电压（三相一般为 380V）</li>
              <li>输入功率因数（一般取 0.85~0.90）和电机效率（一般取 88%~95%）</li>
              <li>选择启动方式</li>
              <li>点击"计算"查看额定电流、启动电流及保护元件推荐值</li>
            </ol>
          </div>
          <div className="content-section">
            <h2>常见问题</h2>
            <p><strong>各启动方式的启动电流倍数是多少？</strong></p>
            <p>直接启动：约 6 倍额定电流，适用于小功率电机。</p>
            <p>星三角启动：约 2 倍额定电流，适用于 15kW 以上电机。</p>
            <p>软启动器：约 3 倍额定电流，可平滑控制启动过程。</p>
            <p>变频器：约 1.5 倍额定电流，启动最平稳，节能效果好。</p>
            <p><strong>断路器为什么取额定电流的 2.5 倍？</strong></p>
            <p>断路器需躲过电机启动电流，同时保护线路。取 2.5 倍是工程经验值，实际应结合启动方式和断路器特性曲线选取。</p>
          </div>
          <div className="content-section">
            <h2>案例</h2>
            <p><strong>案例：</strong>37kW 电机，380V，功率因数 0.85，效率 92%，采用星三角启动。</p>
            <p>额定电流：I = 37000 / (√3 × 380 × 0.85 × 0.92) = 71.8 A</p>
            <p>启动电流：71.8 × 2 = 143.6 A（星三角启动）</p>
            <p>推荐断路器：71.8 × 2.5 = 179.5 A → 选 200 A</p>
            <p>热继电器整定值：71.8 × 1.05 = 75.4 A</p>
          </div>
          <div className="disclaimer"><strong>免责声明：</strong>所有计算结果仅供参考，实际工程设计请遵循相关规范并由专业工程师审核。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}
