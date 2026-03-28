'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DuctVelocity() {
  const [mode, setMode] = useState('velocity')
  const [flowRate, setFlowRate] = useState('')
  const [diameter, setDiameter] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState<any>(null)

  const calculateVelocity = () => {
    const Q = parseFloat(flowRate) / 3600
    const d = parseFloat(diameter) / 1000
    const A = Math.PI * Math.pow(d/2, 2)
    setResult({ velocity: (Q/A*100).toFixed(1), velocityFPM: (Q/A*196.85).toFixed(0), area: (A*1e6).toFixed(0) })
  }

  const calculateFlowRate = () => {
    const d = parseFloat(diameter) / 1000
    const v = parseFloat(flowRate) / 100
    const A = Math.PI * Math.pow(d/2, 2)
    const Q = v * A * 3600
    setResult({ flowRate: Q.toFixed(1), velocity: v.toFixed(1), area: (A*1e6).toFixed(0) })
  }

  const calculateDiameter = () => {
    const Q = parseFloat(flowRate) / 3600
    const v = parseFloat(diameter) / 100
    const A = Q / v
    const d = Math.sqrt(4 * A / Math.PI) * 1000
    setResult({ diameter: d.toFixed(0), velocity: v.toFixed(1), flowRate: parseFloat(flowRate).toFixed(1) })
  }

  const calculate = () => {
    if (mode === 'velocity') calculateVelocity()
    else if (mode === 'flowRate') calculateFlowRate()
    else calculateDiameter()
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 工程师计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/hvac">🌡️ 暖通空调</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>风管风速计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>计算模式</label>
              <select value={mode} onChange={(e)=>setMode(e.target.value)}>
                <option value="velocity">计算风速（已知流量）</option>
                <option value="flowRate">计算风量（已知风速）</option>
                <option value="diameter">计算管径（已知风速）</option>
              </select>
            </div>
            <div className="form-group"><label>风量 (m³/h)</label><input type="number" value={flowRate} onChange={(e)=>setFlowRate(e.target.value)}/></div>
            <div className="form-group"><label>管径 (mm)</label><input type="number" value={diameter} onChange={(e)=>setDiameter(e.target.value)}/></div>
            <button onClick={calculate} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px'}}>计算</button>
            {result && (
              <div className="result-group">
                {result.velocity && <div className="result-item"><span className="result-label">风速</span><span className="result-value">{result.velocity} m/s</span></div>}
                {result.velocityFPM && <div className="result-item"><span className="result-label">风速</span><span className="result-value">{result.velocityFPM} fpm</span></div>}
                {result.flowRate && <div className="result-item"><span className="result-label">风量</span><span className="result-value">{result.flowRate} m³/h</span></div>}
                {result.diameter && <div className="result-item"><span className="result-label">所需管径</span><span className="result-value">{result.diameter} mm</span></div>}
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>公式与原理</h2>
            <p>风管内空气流速是暖通空调系统设计的基础参数。适当的风速可确保舒适性和效率。</p>
            <div className="formula-box">V = Q / A<br/>A = πd²/4<br/>Q = m³/s, V = m/s</div>
          </div>
          <div className="content-section">
            <h2>使用说明</h2>
            <ol>
              <li>选择计算模式</li>
              <li>输入风量或风速</li>
              <li>输入风管直径</li>
              <li>点击计算</li>
            </ol>
          </div>
          <div className="content-section">
            <h2>常见问题</h2>
            <div className="faq-item"><p className="faq-question">推荐风速是多少？</p><p className="faq-answer">主管道：6-10 m/s。支管道：5-8 m/s。风口：2-5 m/s。</p></div>
          </div>
          <div className="content-section">
            <h2>案例</h2>
            <p><strong>案例：</strong>2000 m³/h 风量通过 300mm 风管，流速 V = 7.85 m/s，在合理范围内。</p>
          </div>
          <div className="disclaimer"><strong>免责声明：</strong>所有计算结果仅供参照。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 工程师计算器</p></div></footer>
    </>
  )
}
