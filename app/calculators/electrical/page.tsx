import Link from 'next/link'

export default function Electrical() {
  const calculators = [
    { slug: 'power', title: '功率计算器', desc: '根据任意两个已知值计算功率、电流、电压' },
    { slug: 'voltage-drop', title: '电压降计算器', desc: '计算电力线路的电压损失' },
    { slug: 'cable-ampacity', title: '电缆载流量计算器', desc: '计算电缆的安全载流量' },
    { slug: 'illuminance', title: '照度计算器', desc: '计算室内照明水平' },
    { slug: 'battery-capacity', title: '蓄电池容量计算器', desc: '计算备用电源的电池容量' },
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
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0' }}>⚡ 电气工程计算器</h1>
        
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
