'use client'

import { useState } from 'react'
import Link from 'next/link'

function calcPumpHead(Q_m3h: number, d_mm: number, L: number, staticHead: number, minorPct: number) {
  const Q = Q_m3h / 3600
  const d = d_mm / 1000
  const A = Math.PI * Math.pow(d / 2, 2)
  const v = Q / A
  const Re = (v * d) / 1e-6
  const f = Re < 2300 ? 64 / Re : 0.316 / Math.pow(Re, 0.25)
  const hf = f * (L / d) * (v * v) / (2 * 9.81)
  const h_minor = hf * minorPct / 100
  const H_total = hf + h_minor + staticHead
  const P_kW = (1000 * 9.81 * Q * H_total) / (1000 * 0.75)
  return { v, Re, f, hf, h_minor, H_total, P_kW }
}

export default function PumpHead() {
  const [flow, setFlow] = useState('50')
  const [diameter, setDiameter] = useState('100')
  const [length, setLength] = useState('100')
  const [staticHead, setStaticHead] = useState('5')
  const [minorLoss, setMinorLoss] = useState('20')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const Q = parseFloat(flow)
    const d = parseFloat(diameter)
    const L = parseFloat(length)
    const sh = parseFloat(staticHead)
    const ml = parseFloat(minorLoss)
    if ([Q, d, L, sh, ml].some(isNaN) || Q <= 0 || d <= 0 || L <= 0) return
    const r = calcPumpHead(Q, d, L, sh, ml)
    setResult({
      velocity: r.v.toFixed(3),
      Re: r.Re.toFixed(0),
      flowRegime: r.Re < 2300 ? '层流' : r.Re > 4000 ? '湍流' : '过渡流',
      f: r.f.toFixed(5),
      hf: r.hf.toFixed(3),
      h_minor: r.h_minor.toFixed(3),
      H_total: r.H_total.toFixed(2),
      P_kW: r.P_kW.toFixed(3),
    })
  }

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/hvac">🌡️ 暖通空调</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>水泵扬程计算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>流量 (m³/h)</label><input type="number" min="0.1" step="0.1" value={flow} onChange={(e) => setFlow(e.target.value)} /></div>
            <div className="form-group"><label>管道内径 (mm)</label><input type="number" min="1" value={diameter} onChange={(e) => setDiameter(e.target.value)} /></div>
            <div className="form-group"><label>管道长度 (m)</label><input type="number" min="0.1" step="0.1" value={length} onChange={(e) => setLength(e.target.value)} /></div>
            <div className="form-group"><label>静扬程 (m)</label><input type="number" min="0" step="0.5" value={staticHead} onChange={(e) => setStaticHead(e.target.value)} /></div>
            <div className="form-group"><label>局部损失系数 (%，占沿程损失的百分比)</label><input type="number" min="0" max="200" value={minorLoss} onChange={(e) => setMinorLoss(e.target.value)} /></div>
            <button onClick={calculate} style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px' }}>计算</button>
            {result && (
              <div className="result-group">
                <div className="result-item"><span className="result-label">管内流速</span><span className="result-value">{result.velocity} m/s</span></div>
                <div className="result-item"><span className="result-label">雷诺数 Re</span><span className="result-value">{result.Re} ({result.flowRegime})</span></div>
                <div className="result-item"><span className="result-label">摩擦系数 f</span><span className="result-value">{result.f}</span></div>
                <div className="result-item"><span className="result-label">沿程摩擦损失 hf</span><span className="result-value">{result.hf} m</span></div>
                <div className="result-item"><span className="result-label">局部损失 h_minor</span><span className="result-value">{result.h_minor} m</span></div>
                <div className="result-item"><span className="result-label">总扬程 H</span><span className="result-value">{result.H_total} m</span></div>
                <div className="result-item"><span className="result-label">水泵功率估算 (η=75%)</span><span className="result-value">{result.P_kW} kW</span></div>
              </div>
            )}
          </div>

          <div className="content-section">
            <h2>公式与原理</h2>
            <p>水泵扬程由沿程摩擦损失、局部损失和静扬程三部分组成。沿程损失采用 Darcy-Weisbach 公式计算，摩擦系数 f 根据雷诺数自动选取。</p>
            <div className="formula-box">
              流速：v = Q / A，A = πd²/4<br/>
              雷诺数：Re = v·d / ν，ν = 1×10⁻⁶ m²/s（水，20°C）<br/><br/>
              摩擦系数 f：<br/>
              　层流 (Re &lt; 2300)：f = 64 / Re<br/>
              　湍流 (Re &gt; 4000)：f = 0.316 / Re^0.25（Blasius 公式）<br/><br/>
              沿程损失：hf = f · (L/d) · v² / (2g)<br/>
              局部损失：h_minor = hf × 局部损失系数%<br/>
              总扬程：H = hf + h_minor + 静扬程<br/><br/>
              水泵功率：P = ρgQH / (1000 × η)，η 取 0.75
            </div>
            <p>Blasius 公式适用于光滑管湍流区（Re = 4000–100000）。对于粗糙管或更高雷诺数，应使用 Colebrook-White 方程或 Moody 图。</p>
          </div>

          <div className="content-section">
            <h2>使用说明</h2>
            <ol>
              <li>输入系统设计流量（m³/h）。</li>
              <li>输入管道内径（注意是内径，不是公称直径）。</li>
              <li>输入管道总长度（主管道长度）。</li>
              <li>输入静扬程，即供水点与回水点的高度差。</li>
              <li>局部损失系数默认 20%，即弯头、阀门等局部阻力约为沿程阻力的 20%。复杂管网可适当提高至 30%–50%。</li>
              <li>计算结果中的功率为轴功率估算，电机选型时需再除以电机效率（约 0.9–0.95）。</li>
            </ol>
          </div>

          <div className="content-section">
            <h2>常见问题</h2>
            <div className="faq-item">
              <p className="faq-question">什么是扬程？</p>
              <p className="faq-answer">扬程是水泵能够将液体提升的等效高度，单位为米（m）。它包含克服高度差所需的静扬程，以及克服管道摩擦和局部阻力所需的动扬程。</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">局部损失系数如何取值？</p>
              <p className="faq-answer">简单管路（弯头少、阀门少）取 10%–20%；一般空调水系统取 20%–30%；管件复杂的工业管路可取 30%–50%。精确计算需逐一统计各管件的局部阻力系数 ξ。</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">为什么流速很重要？</p>
              <p className="faq-answer">流速过低会导致管道内沉积和腐蚀；流速过高会产生噪音、振动和较大压力损失。空调冷冻水系统推荐流速为 1.0–2.5 m/s，生活给水为 1.0–2.0 m/s。</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">计算结果与实际偏差大怎么办？</p>
              <p className="faq-answer">本工具假设管道为光滑管、水温 20°C。实际工程中管道粗糙度、水温变化、管件数量等都会影响结果。建议在计算结果基础上增加 10%–20% 的安全余量。</p>
            </div>
          </div>

          <div className="content-section">
            <h2>案例分析</h2>
            <p><strong>案例：某空调冷冻水系统</strong></p>
            <p>条件：流量 50 m³/h，管道内径 100 mm，管道长度 100 m，静扬程 5 m，局部损失系数 20%。</p>
            <div className="formula-box">
              A = π × (0.1/2)² = 7.854×10⁻³ m²<br/>
              v = (50/3600) / 7.854×10⁻³ = 1.768 m/s<br/>
              Re = 1.768 × 0.1 / 1×10⁻⁶ = 176,800（湍流）<br/>
              f = 0.316 / 176800^0.25 = 0.01622<br/>
              hf = 0.01622 × (100/0.1) × 1.768² / (2×9.81) = 2.59 m<br/>
              h_minor = 2.59 × 20% = 0.52 m<br/>
              H = 2.59 + 0.52 + 5 = 8.11 m<br/>
              P = 1000×9.81×(50/3600)×8.11 / (1000×0.75) = 1.47 kW
            </div>
            <p>结论：该系统所需扬程约 8.1 m，水泵轴功率约 1.47 kW，可选用扬程 10 m、功率 2.2 kW 的离心泵，留有足够余量。</p>
          </div>

          <div className="disclaimer"><strong>免责声明：</strong>本计算结果仅供参考，不得直接用于正式工程设计。实际工程请委托具备资质的专业人员按相关规范进行计算。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}
