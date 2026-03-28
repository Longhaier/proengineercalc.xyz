'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CableAmpacity() {
  const [conductorType, setConductorType] = useState('copper')
  const [size, setSize] = useState(2.5)
  const [installMethod, setInstallMethod] = useState('B1')
  const [temp, setTemp] = useState(30)
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const baseAmpacity = conductorType === 'copper' ? 15 : 12
    const methodFactors: Record<string, number> = {
      'A1': 0.80, 'A2': 0.80, 'B1': 0.85, 'B2': 0.85,
      'C': 0.90, 'D': 0.90
    }
    const tempFactor = temp <= 30 ? 1.0 : 1 - (temp - 30) * 0.04
    
    const ampacity = size * baseAmpacity * (methodFactors[installMethod] || 1) * tempFactor
    setResult(Math.round(ampacity * 10) / 10)
  }

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <h1 className="logo"><Link href="/">🔧 工程师计算器</Link></h1>
          <p className="tagline">专业工程师计算工具箱</p>
        </div>
      </header>

      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/">🏠 首页</Link>
          <Link href="/calculators/hvac">🌡️ 暖通空调</Link>
          <Link href="/calculators/electrical">⚡ 电气工程</Link>
          <Link href="/calculators/fluid">💧 流体力学</Link>
          <Link href="/calculators/structure">🏗️ 结构工程</Link>
        </div>
      </nav>

      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>电缆载流量计算器</h1>

          <div className="calculator-form">
            <div className="form-group">
              <label>导体材质</label>
              <select value={conductorType} onChange={(e) => setConductorType(e.target.value)}>
                <option value="copper">铜</option>
                <option value="aluminum">铝</option>
              </select>
            </div>

            <div className="form-group">
              <label>导体截面积 (mm²)</label>
              <input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} />
            </div>

            <div className="form-group">
              <label>敷设方式</label>
              <select value={installMethod} onChange={(e) => setInstallMethod(e.target.value)}>
                <option value="A1">A1 - 墙内导管</option>
                <option value="A2">A2 - 墙内导管</option>
                <option value="B1">B1 - 墙上导管</option>
                <option value="B2">B2 - 墙上导管</option>
                <option value="C">C - 空气中电缆</option>
                <option value="D">D - 直埋</option>
              </select>
            </div>

            <div className="form-group">
              <label>环境温度 (°C)</label>
              <input type="number" value={temp} onChange={(e) => setTemp(Number(e.target.value))} />
            </div>

            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>计算</button>

            {result && (
              <div className="result-group">
                <h4>计算结果</h4>
                <div className="result-item">
                  <span className="result-label">安全载流量</span>
                  <span className="result-value">{result} A</span>
                </div>
              </div>
            )}
          </div>

          <div className="content-section">
            <h2>公式与原理</h2>
            <p>电缆载流量根据导体截面积、材质、敷设方式和环境温度计算。</p>
            <div className="formula-box">
              I = A × I_density × F_method × F_temp<br/><br/>
              其中:<br/>
              I = 载流量 (A)<br/>
              A = 截面积 (mm²)<br/>
              I_density = 电流密度 (A/mm²)<br/>
              F_method = 敷设方式系数<br/>
              F_temp = 温度系数
            </div>
          </div>

          <div className="content-section">
            <h2>使用说明</h2>
            <ol>
              <li>选择导体材质（铜或铝）</li>
              <li>输入电缆截面积（mm²）</li>
              <li>选择敷设方式</li>
              <li>输入环境温度</li>
              <li>点击计算</li>
            </ol>
          </div>

          <div className="disclaimer">
            <strong>免责声明：</strong>所有计算结果仅供参照之用。请勿将计算结果作为工程设计或施工的最终依据。
          </div>
        </div>
      </main>

      <footer><div className="container"><p>© 2026 工程师计算器</p></div></footer>
    </>
  )
}
