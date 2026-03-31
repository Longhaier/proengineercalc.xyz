'use client'

import { useState } from 'react'
import Link from 'next/link'

function calcIlluminance(L: number, W: number, workH: number, mountH: number, E: number, flux: number, mf: number) {
  const Hm = mountH - workH
  const RI = (L * W) / (Hm * (L + W))
  const CU = Math.min(0.4 + 0.1 * RI, 0.7)
  const Nraw = (E * L * W) / (flux * CU * mf)
  const N = Math.ceil(Nraw)
  const Eactual = (N * flux * CU * mf) / (L * W)
  const wPerFixture = flux / 100
  const totalW = N * wPerFixture
  const wPerM2 = totalW / (L * W)
  return { RI, CU, Nraw, N, Eactual, wPerM2, area: L * W }
}

const luxOptions = [
  { label: '办公室 500 lux', value: 500 },
  { label: '走廊 100 lux', value: 100 },
  { label: '车间 300 lux', value: 300 },
  { label: '精密作业 750 lux', value: 750 },
  { label: '仓库 200 lux', value: 200 },
]

export default function Illuminance() {
  const [length, setLength] = useState('10')
  const [width, setWidth] = useState('8')
  const [workHeight, setWorkHeight] = useState('0.8')
  const [mountHeight, setMountHeight] = useState('2.8')
  const [targetLux, setTargetLux] = useState('500')
  const [flux, setFlux] = useState('4000')
  const [mf, setMf] = useState('0.8')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const L = parseFloat(length)
    const W = parseFloat(width)
    const wH = parseFloat(workHeight)
    const mH = parseFloat(mountHeight)
    const E = parseFloat(targetLux)
    const f = parseFloat(flux)
    const m = parseFloat(mf)
    if ([L, W, wH, mH, E, f, m].some(isNaN) || mH <= wH) return
    setResult(calcIlluminance(L, W, wH, mH, E, f, m))
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/electrical">⚡ 电气工程</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>照度计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>房间长度 (m)</label><input type="number" value={length} onChange={(e)=>setLength(e.target.value)} /></div>
            <div className="form-group"><label>房间宽度 (m)</label><input type="number" value={width} onChange={(e)=>setWidth(e.target.value)} /></div>
            <div className="form-group"><label>工作面高度 (m)</label><input type="number" value={workHeight} step="0.1" onChange={(e)=>setWorkHeight(e.target.value)} /></div>
            <div className="form-group"><label>灯具安装高度 (m)</label><input type="number" value={mountHeight} step="0.1" onChange={(e)=>setMountHeight(e.target.value)} /></div>
            <div className="form-group">
              <label>目标照度</label>
              <select value={targetLux} onChange={(e)=>setTargetLux(e.target.value)}>
                {luxOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="form-group"><label>灯具光通量 (lm)</label><input type="number" value={flux} onChange={(e)=>setFlux(e.target.value)} /></div>
            <div className="form-group"><label>维护系数 MF</label><input type="number" value={mf} step="0.05" min="0.5" max="1" onChange={(e)=>setMf(e.target.value)} /></div>
            <button onClick={calculate} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px'}}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">房间面积</span><span className="result-value">{result.area.toFixed(1)} m²</span></div>
                <div className="result-item"><span className="result-label">室形指数 RI</span><span className="result-value">{result.RI.toFixed(2)}</span></div>
                <div className="result-item"><span className="result-label">利用系数 CU</span><span className="result-value">{result.CU.toFixed(2)}</span></div>
                <div className="result-item"><span className="result-label">所需灯具数</span><span className="result-value">{result.N} 盏（计算值 {result.Nraw.toFixed(1)}）</span></div>
                <div className="result-item"><span className="result-label">实际照度</span><span className="result-value">{result.Eactual.toFixed(0)} lux</span></div>
                <div className="result-item"><span className="result-label">功率密度</span><span className="result-value">{result.wPerM2.toFixed(1)} W/m²</span></div>
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>公式原理（利用系数法）</h2>
            <p>利用系数法（Lumen Method）是照明设计中最常用的平均照度计算方法，适用于室内均匀照明设计。</p>
            <div className="formula-box">
              室形指数 RI = (L × W) / (Hm × (L + W))<br/>
              利用系数 CU ≈ 0.4 + 0.1 × RI（上限0.7）<br/>
              所需灯具数 N = (E × L × W) / (Φ × CU × MF)<br/>
              实际照度 E = N × Φ × CU × MF / (L × W)<br/><br/>
              其中：Hm = 安装高度 - 工作面高度，Φ = 单灯光通量(lm)，MF = 维护系数
            </div>
            <p><strong>室形指数 RI：</strong>反映房间几何形状对照明效率的影响。RI越大，灯光利用率越高。</p>
            <p><strong>维护系数 MF：</strong>考虑灯具老化和污染导致的光通量衰减，清洁环境取0.8，多尘环境取0.6~0.7。</p>
          </div>
          <div className="content-section">
            <h2>使用说明</h2>
            <ol>
              <li>输入房间长度和宽度</li>
              <li>工作面高度：办公桌面取0.8m，站立操作取0.9m，地面取0m</li>
              <li>灯具安装高度：吊顶安装取吊顶高度，嵌入式取吊顶高度</li>
              <li>根据场所类型选择目标照度（参考GB 50034标准）</li>
              <li>输入所选灯具的额定光通量（见灯具规格书）</li>
              <li>维护系数：清洁办公室取0.8，工厂车间取0.7，多尘环境取0.6</li>
            </ol>
          </div>
          <div className="content-section">
            <h2>常见问题</h2>
            <div className="faq-item"><p className="faq-question">利用系数CU如何确定？</p><p className="faq-answer">精确的CU值需查灯具厂商提供的配光曲线表，与室形指数RI和房间反射率有关。本计算器使用简化公式（CU ≈ 0.4 + 0.1×RI，上限0.7），适合初步估算。精确设计请使用DIALux等专业软件。</p></div>
            <div className="faq-item"><p className="faq-question">为什么实际灯具数要向上取整？</p><p className="faq-answer">照度是最低保证值，向上取整确保实际照度不低于设计值。取整后的实际照度会略高于目标值，这是正常的。</p></div>
            <div className="faq-item"><p className="faq-question">功率密度LPD有什么意义？</p><p className="faq-answer">照明功率密度（W/m²）是衡量照明节能的重要指标。GB 50034规定办公室LPD不超过9 W/m²，工业厂房不超过7~11 W/m²（视精度要求）。</p></div>
          </div>
          <div className="content-section">
            <h2>案例</h2>
            <p><strong>办公室照明设计：</strong>房间10m×8m，吊顶高3m，工作面0.8m，目标照度500lux，选用4000lm LED灯盘，维护系数0.8。</p>
            <p>Hm = 3.0 - 0.8 = 2.2m</p>
            <p>RI = (10×8) / (2.2×(10+8)) = 80/39.6 = 2.02</p>
            <p>CU = min(0.4 + 0.1×2.02, 0.7) = 0.60</p>
            <p>N = (500×10×8) / (4000×0.60×0.8) = 40000/1920 = 20.8 → 21盏</p>
            <p>实际照度 = 21×4000×0.60×0.8 / 80 = 504 lux，功率密度 = 21×40/80 = 10.5 W/m²</p>
          </div>
          <div className="disclaimer"><strong>免责声明：</strong>所有计算结果仅供参考，正式照明设计请使用专业软件并由持证工程师审核。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}
