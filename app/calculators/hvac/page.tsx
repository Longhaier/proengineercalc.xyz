import Link from 'next/link'

export default function HVAC() {
  const calculators = [
    { slug: 'dewpoint', title: '露点计算器', desc: '根据海拔、温度和湿度计算露点温度' },
    { slug: 'psychrometric', title: '湿空气性质计算器', desc: '计算焓值、含湿量及空气其他参数' },
    { slug: 'duct-velocity', title: '风管风速计算器', desc: '计算矩形和圆形风管内的空气流速' },
    { slug: 'cooling-load', title: '冷负荷估算器', desc: '快速估算建筑冷负荷' },
    { slug: 'pump-head', title: '水泵扬程计算器', desc: '计算暖通空调系统所需的水泵扬程' },
    { slug: 'air-changes', title: '换气次数计算器', desc: '根据房间尺寸和换气次数计算所需风量' },
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
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0' }}>🌡️ 暖通空调与制冷计算器</h1>
        
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
