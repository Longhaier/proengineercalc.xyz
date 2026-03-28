'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function VoltageDrop() {
  const [mode, setMode] = useState('vd')
  const [voltage, setVoltage] = useState('')
  const [current, setCurrent] = useState('')
  const [length, setLength] = useState('')
  const [size, setSize] = useState('2.5')
  const [material, setMaterial] = useState('copper')
  const [result, setResult] = useState<any>(null)

  const calculateVD = () => {
    const V = parseFloat(voltage)
    const I = parseFloat(current)
    const L = parseFloat(length)
    const A = parseFloat(size)
    const rho = material === 'copper' ? 0.0175 : 0.0283
    const R = (rho * L * 2 * 1.2) / A
    const VD = I * R
    const percent = (VD / V) * 100
    setResult({ vd: VD.toFixed(2), percent: percent.toFixed(2), ok: percent <= 3, final: (V-VD).toFixed(1) })
  }

  const calculateCurrent = () => {
    const V = parseFloat(voltage)
    const L = parseFloat(length)
    const A = parseFloat(size)
    const rho = material === 'copper' ? 0.0175 : 0.0283
    const maxVD = V * 0.03
    const R = (rho * L * 2 * 1.2) / A
    const Imax = maxVD / R
    setResult({ maxCurrent: Imax.toFixed(2), maxVD: maxVD.toFixed(1) })
  }

  const calculateSize = () => {
    const V = parseFloat(voltage)
    const I = parseFloat(current)
    const L = parseFloat(length)
    const rho = material === 'copper' ? 0.0175 : 0.0283
    const maxVD = V * 0.03
    const minArea = (rho * L * 2 * 1.2 * I) / maxVD
    setResult({ minArea: minArea.toFixed(2), recommended: minArea > 1.5 ? Math.ceil(minArea) : 1.5 })
  }

  const calculate = () => {
    if (mode === 'vd') calculateVD()
    else if (mode === 'current') calculateCurrent()
    else calculateSize()
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 工程师计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/electrical">⚡ 电气工程</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>电压降计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>计算模式</label>
              <select value={mode} onChange={(e)=>setMode(e.target.value)}>
                <option value="vd">计算电压降</option>
                <option value="current">计算最大电流</option>
                <option value="size">计算所需电缆截面积</option>
              </select>
            </div>
            <div className="form-group"><label>系统电压 (V)</label><input type="number" value={voltage} onChange={(e)=>setVoltage(e.target.value)}/></div>
            <div className="form-group"><label>电流 (A) {mode==='current'?'':'*'}</label><input type="number" value={current} onChange={(e)=>setCurrent(e.target.value)}/></div>
            <div className="form-group"><label>线路长度 (m) - 单程</label><input type="number" value={length} onChange={(e)=>setLength(e.target.value)}/></div>
            <div className="form-group"><label>导体截面积 (mm²)</label>
              <select value={size} onChange={(e)=>setSize(e.target.value)}>
                <option value="1.5">1.5 mm²</option><option value="2.5">2.5 mm²</option><option value="4">4 mm²</option><option value="6">6 mm²</option><option value="10">10 mm²</option><option value="16">16 mm²</option><option value="25">25 mm²</option>
              </select>
            </div>
            <div className="form-group"><label>材质</label>
              <select value={material} onChange={(e)=>setMaterial(e.target.value)}>
                <option value="copper">铜</option><option value="aluminum">铝</option>
              </select>
            </div>
            <button onClick={calculate} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px'}}>计算</button>
            {result && (
              <div className="result-group">
                {result.vd && <div className="result-item"><span className="result-label">电压降</span><span className="result-value">{result.vd} V ({result.percent}%)</span></div>}
                {result.final && <div className="result-item"><span className="result-label">负载端电压</span><span className="result-value">{result.final} V</span></div>}
                {result.maxCurrent && <div className="result-item"><span className="result-label">最大允许电流 (3%)</span><span className="result-value">{result.maxCurrent} A</span></div>}
                {result.minArea && <div className="result-item"><span className="result-label">最小所需截面积</span><span className="result-value">{result.minArea} mm²</span></div>}
                {result.recommended && <div className="result-item"><span className="result-label">推荐截面积</span><span className="result-value">{result.recommended} mm²</span></div>}
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>公式与原理</h2>
            <p>电流流过导体时因电阻产生电压降。IEEE和NEC标准建议分支电路最大电压降不超过3%。</p>
            <div className="formula-box">
              R = ρ × L × 2 / A<br/>
              VD = I × R<br/><br/>
              其中:<br/>
              ρ = 电阻率 (Ω·mm²/m)<br/>
              L = 长度 (m)<br/>
              A = 截面积 (mm²)
            </div>
          </div>
          <div className="content-section">
            <h2>使用说明</h2>
            <ol>
              <li>选择计算模式</li>
              <li>输入系统电压（常见230V、400V）</li>
              <li>输入负载电流或线路长度</li>
              <li>选择导体材质和截面积</li>
              <li>点击计算查看结果</li>
            </ol>
          </div>
          <div className="content-section">
            <h2>常见问题</h2>
            <div className="faq-item"><p className="faq-question">为什么是3%？</p><p className="faq-answer">3%是保证设备正常工作的最大电压降。总电压降（含干线）不应超过5%。</p></div>
            <div className="faq-item"><p className="faq-question">铜和铝哪个好？</p><p className="faq-answer">铜的电阻率更低（0.0175 vs 0.0283 Ω·mm²/m），所以铜电缆可以用更小的截面积承载相同的电流。</p></div>
          </div>
          <div className="content-section">
            <h2>案例</h2>
            <p><strong>案例1：</strong>100m线路，20A负载，2.5mm²铜芯230V：VD = 2.77V (1.2%) - 合格</p>
            <p><strong>案例2：</strong>同样线路用1.5mm²：VD = 4.6V (2%) - 合格但接近限值</p>
          </div>
          <div className="disclaimer"><strong>免责声明：</strong>所有计算结果仅供参照。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 工程师计算器</p></div></footer>
    </>
  )
}
