'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Power() {
  const [mode, setMode] = useState('power')
  const [current, setCurrent] = useState('')
  const [voltage, setVoltage] = useState('')
  const [power, setPower] = useState('')
  const [pf, setPf] = useState('0.85')
  const [phase, setPhase] = useState('single')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const I = parseFloat(current)
    const V = parseFloat(voltage)
    const P = parseFloat(power)
    const PF = parseFloat(pf) || 0.85
    
    if (mode === 'power' && I && V) {
      const realP = phase === 'single' ? I * V * PF : Math.sqrt(3) * I * V * PF
      const apparent = phase === 'single' ? I * V : Math.sqrt(3) * I * V
      setResult({ power: realP.toFixed(0), apparent: apparent.toFixed(0), reactive: Math.sqrt(Math.pow(apparent,2)-Math.pow(realP,2)).toFixed(0) })
    } else if (mode === 'current' && V && P) {
      const Icalc = phase === 'single' ? P / (V * PF) : P / (Math.sqrt(3) * V * PF)
      setResult({ current: Icalc.toFixed(2) })
    } else if (mode === 'voltage' && I && P) {
      const Vcalc = phase === 'single' ? P / (I * PF) : P / (Math.sqrt(3) * I * PF)
      setResult({ voltage: Vcalc.toFixed(1) })
    }
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 工程师计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/electrical">⚡ 电气工程</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>功率计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>计算模式</label>
              <select value={mode} onChange={(e)=>setMode(e.target.value)}>
                <option value="power">计算功率（已知电流+电压）</option>
                <option value="current">计算电流（已知功率+电压）</option>
                <option value="voltage">计算电压（已知功率+电流）</option>
              </select>
            </div>
            <div className="form-group"><label>相数</label>
              <select value={phase} onChange={(e)=>setPhase(e.target.value)}>
                <option value="single">单相</option>
                <option value="three">三相</option>
              </select>
            </div>
            <div className="form-group"><label>功率因数</label><input type="number" value={pf} onChange={(e)=>setPf(e.target.value)} step="0.01"/></div>
            <div className="form-group"><label>电流 (A) {mode==='current'?'':'*'}</label><input type="number" value={current} onChange={(e)=>setCurrent(e.target.value)}/></div>
            <div className="form-group"><label>电压 (V) {mode==='voltage'?'':'*'}</label><input type="number" value={voltage} onChange={(e)=>setVoltage(e.target.value)}/></div>
            <div className="form-group"><label>功率 (W) {mode==='power'?'':'*'}</label><input type="number" value={power} onChange={(e)=>setPower(e.target.value)}/></div>
            <button onClick={calculate} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px'}}>计算</button>
            {result && (
              <div className="result-group">
                {result.power && <div className="result-item"><span className="result-label">有功功率</span><span className="result-value">{result.power} W</span></div>}
                {result.apparent && <div className="result-item"><span className="result-label">视在功率</span><span className="result-value">{result.apparent} VA</span></div>}
                {result.reactive && <div className="result-item"><span className="result-label">无功功率</span><span className="result-value">{result.reactive} VAR</span></div>}
                {result.current && <div className="result-item"><span className="result-label">电流</span><span className="result-value">{result.current} A</span></div>}
                {result.voltage && <div className="result-item"><span className="result-label">电压</span><span className="result-value">{result.voltage} V</span></div>}
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>公式与原理</h2>
            <p>交流电路中的功率关系：</p>
            <div className="formula-box">
              单相: P = V × I × PF<br/>
              三相: P = √3 × V_L × I_L × PF<br/><br/>
              S = V × I（视在功率）<br/>
              Q = √(S² - P²)（无功功率）
            </div>
          </div>
          <div className="content-section">
            <h2>使用说明</h2>
            <ol>
              <li>选择计算模式：功率、电流或电压</li>
              <li>选择单相或三相系统</li>
              <li>输入功率因数（电机通常0.85-0.95）</li>
              <li>输入任意两个值（I、V、P）</li>
              <li>点击计算</li>
            </ol>
          </div>
          <div className="content-section">
            <h2>常见问题</h2>
            <div className="faq-item"><p className="faq-question">为什么功率因数重要？</p><p className="faq-answer">PF表示功率的使用效率。PF=1表示所有功率都做有用功。电机、变压器因无功功率而PF较低。</p></div>
            <div className="faq-item"><p className="faq-question">单相和三相的区别？</p><p className="faq-answer">三相用于工业负荷和远距离电力传输。单相常见于住宅。</p></div>
          </div>
          <div className="content-section">
            <h2>案例</h2>
            <p><strong>案例1：</strong>10HP电机，480V三相：I = 7460/(480×0.89×√3) = 10.1A</p>
            <p><strong>案例2：</strong>2000W负载，230V单相：I = 2000/(230×0.9) = 9.7A</p>
          </div>
          <div className="disclaimer"><strong>免责声明：</strong>所有计算结果仅供参照。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 工程师计算器</p></div></footer>
    </>
  )
}
