import Link from 'next/link'

export default function Fluid() {
  const calculators = [
    { slug: 'pipe-pressure', title: '管道压力损失计算器', desc: '计算管道系统的压力降' },
    { slug: 'flow-conversion', title: '流量单位换算', desc: 'GPM、L/s、m³/h 之间互转' },
    { slug: 'reynolds', title: '雷诺数计算器', desc: '计算管道流动的雷诺数' },
  ]

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1>
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
          <Link href="/terms">📄 使用条款</Link>
          <Link href="/privacy">🔒 隐私政策</Link>
        </div>
      </nav>

      <main className="container">
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0' }}>💧 流体力学计算器</h1>
        
        <div className="calculator-grid">
          {calculators.map((calc) => (
            <Link key={calc.slug} href={`/calculators/${calc.slug}`} className="calculator-card">
              <h3>{calc.title}</h3>
              <p>{calc.desc}</p>
            </Link>
          ))}
        </div>

        <div className="disclaimer">
          <strong>免责声明：</strong>所有计算结果仅供参照之用。请勿将计算结果作为工程设计或施工的最终依据。
        </div>
      </main>

      <footer><div className="container"><p>© 2026 智效厂务工程计算器. 保留所有权利.</p></div></footer>
    </>
  )
}
