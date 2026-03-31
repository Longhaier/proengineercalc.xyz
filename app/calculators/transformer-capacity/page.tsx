'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TransformerCapacity() {
  const [pTotal, setPTotal] = useState('500')
  const [demand, setDemand] = useState('0.7')
  const [simultaneous, setSimultaneous] = useState('0.9')
  const [pf, setPf] = useState('0.85')
  const [margin, setMargin] = useState('1.2')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const P = parseFloat(pTotal)
    const d = parseFloat(demand)
    const s = parseFloat(simultaneous)
    const pfVal = parseFloat(pf)
    const m = parseFloat(margin)
    if (isNaN(P) || isNaN(d) || isNaN(s) || isNaN(pfVal) || isNaN(m)) return
    const P_calc = P * d * s
    const S_calc = P_calc / pfVal
    const S_required = S_calc * m
    const standards = [50,100,160,200,250,315,400,500,630,800,1000,1250,1600,2000]
    const recommended = standards.find(s => s >= S_required) || 2000
    setResult({
      P_calc: P_calc.toFixed(1),
      S_calc: S_calc.toFixed(1),
      S_required: S_required.toFixed(1),
      recommended
    })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1><p className="tagline">专业工程师计算工具箱</p></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/hvac">🌡️ 暖通空调</Link><Link href="/calculators/electrical">⚡ 电气工程</Link><Link href="/calculators/fluid">💧 流体力学</Link><Link href="/calculators/structure">🏗️ 结构工程</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>变压器容量计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>总设备功率 (kW)</label><input type="number" value={pTotal} onChange={(e)=>setPTotal(e.target.value)}/></div>
            <div className="form-group"><label>需用系数 (0~1)</label><input type="number" step="0.01" value={demand} onChange={(e)=>setDemand(e.target.value)}/></div>
            <div className="form-group"><label>同时系数 (0~1)</label><input type="number" step="0.01" value={simultaneous} onChange={(e)=>setSimultaneous(e.target.value)}/></div>
            <div className="form-group"><label>功率因数 (0~1)</label><input type="number" step="0.01" value={pf} onChange={(e)=>setPf(e.target.value)}/></div>
            <div className="form-group"><label>余量系数</label><input type="number" step="0.01" value={margin} onChange={(e)=>setMargin(e.target.value)}/></div>
            <button onClick={calculate} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px',fontSize:'1rem',fontWeight:600,cursor:'pointer'}}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">计算负荷</span><span className="result-value">{result.P_calc} kW</span></div>
                <div className="result-item"><span className="result-label">视在功率</span><span className="result-value">{result.S_calc} kVA</span></div>
                <div className="result-item"><span className="result-label">所需容量（含余量）</span><span className="result-value">{result.S_required} kVA</span></div>
                <div className="result-item"><span className="result-label">推荐变压器容量</span><span className="result-value">{result.recommended} kVA</span></div>
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>公式与原理</h2>
            <p>变压器容量选择需综合考虑设备需用系数、同时使用系数、功率因数及适当余量，以确保供电可靠性。</p>
            <div className="formula-box">
              P_calc = P_total × 需用系数 × 同时系数（kW）<br/>
              S_calc = P_calc / 功率因数（kVA）<br/>
              S_required = S_calc × 余量系数（kVA）<br/>
              按国标系列选取不小于 S_required 的标准容量
            </div>
          </div>
          <div className="content-section">
            <h2>使用说明</h2>
            <ol>
              <li>输入项目中所有设备的总安装功率（kW）</li>
              <li>根据行业经验填写需用系数（一般工厂取 0.6~0.8）</li>
              <li>填写同时系数（多回路同时运行比例，一般取 0.85~0.95）</li>
              <li>填写综合功率因数（一般取 0.8~0.9）及余量系数（建议 1.2）</li>
              <li>点击"计算"，系统自动匹配国标标准容量</li>
            </ol>
          </div>
          <div className="content-section">
            <h2>常见问题</h2>
            <p><strong>需用系数如何取值？</strong></p>
            <p>需用系数反映设备实际运行功率与额定功率的比值。一般工厂：0.6~0.75；办公楼：0.7~0.8；商业建筑：0.75~0.85。</p>
            <p><strong>国标变压器标准容量系列有哪些？</strong></p>
            <p>50、100、160、200、250、315、400、500、630、800、1000、1250、1600、2000 kVA。</p>
            <p><strong>为什么需要余量系数？</strong></p>
            <p>余量系数用于应对未来负荷增长及计算误差，通常取 1.2，即预留 20% 余量。</p>
          </div>
          <div className="content-section">
            <h2>案例</h2>
            <p><strong>案例：</strong>某工厂总设备功率 500kW，需用系数 0.7，同时系数 0.9，功率因数 0.85，余量系数 1.2。</p>
            <p>计算负荷：P_calc = 500×0.7×0.9 = 315 kW</p>
            <p>视在功率：S_calc = 315/0.85 = 370.6 kVA</p>
            <p>所需容量：S_required = 370.6×1.2 = 444.7 kVA</p>
            <p>按国标系列选取：推荐 500 kVA 变压器</p>
          </div>
          <div className="disclaimer"><strong>免责声明：</strong>所有计算结果仅供参考，实际工程设计请遵循相关规范并由专业工程师审核。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}
