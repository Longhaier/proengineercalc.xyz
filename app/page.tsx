import Link from 'next/link'

const calculators = {
  hvac: [
    { slug: 'dewpoint', title: '露点计算器', desc: '根据海拔、温度和湿度计算露点温度' },
    { slug: 'psychrometric', title: '湿空气性质计算器', desc: '计算焓值、含湿量及空气其他参数' },
    { slug: 'duct-velocity', title: '风管风速计算器', desc: '计算矩形和圆形风管内的空气流速' },
    { slug: 'cooling-load', title: '冷负荷估算器', desc: '快速估算建筑冷负荷' },
    { slug: 'pump-head', title: '水泵扬程计算器', desc: '计算暖通空调系统所需的水泵扬程' },
    { slug: 'air-changes', title: '换气次数计算器', desc: '根据房间尺寸和换气次数计算所需风量' },
  ],
  electrical: [
    { slug: 'power', title: '功率计算器', desc: '根据任意两个已知值计算功率、电流、电压' },
    { slug: 'voltage-drop', title: '电压降计算器', desc: '计算电力线路的电压损失' },
    { slug: 'cable-ampacity', title: '电缆载流量计算器', desc: '计算电缆的安全载流量' },
    { slug: 'illuminance', title: '照度计算器', desc: '计算室内照明水平' },
    { slug: 'battery-capacity', title: '蓄电池容量计算器', desc: '计算备用电源的电池容量' },
    { slug: 'transformer-capacity', title: '变压器容量计算器', desc: '根据用电负荷计算所需变压器容量' },
    { slug: 'motor-current', title: '电机电流计算器', desc: '计算电机额定电流和启动电流' },
  ],
  fluid: [
    { slug: 'pipe-pressure', title: '管道压力损失计算器', desc: '计算管道系统的压力降' },
    { slug: 'flow-conversion', title: '流量单位换算', desc: 'GPM、L/s、m³/h 之间互转' },
    { slug: 'reynolds', title: '雷诺数计算器', desc: '计算管道流动的雷诺数' },
  ],
  structure: [
    { slug: 'concrete-mix', title: '混凝土配比计算器', desc: '计算混凝土配合比' },
    { slug: 'beam-load', title: '梁荷载计算器', desc: '计算梁的挠度和应力' },
    { slug: 'unit-converter', title: '单位换算器', desc: '工程单位之间的换算' },
    { slug: 'steel-weight', title: '钢材重量计算器', desc: '计算各类型钢材的重量' },
  ],
}

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <h1 className="logo">
            <Link href="/">🔧 智效厂务工程计算器</Link>
          </h1>
          <p className="tagline">专业工程师计算工具箱</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="active">🏠 首页</Link>
          <Link href="/calculators/hvac">🌡️ 暖通空调</Link>
          <Link href="/calculators/electrical">⚡ 电气工程</Link>
          <Link href="/calculators/fluid">💧 流体力学</Link>
          <Link href="/calculators/structure">🏗️ 结构工程</Link>
          <Link href="/terms">📄 使用条款</Link>
          <Link href="/privacy">🔒 隐私政策</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container">
        {/* HVAC Section */}
        <section className="category-section">
          <h2 className="category-title">🌡️ 暖通空调与制冷</h2>
          <div className="calculator-grid">
            {calculators.hvac.map((calc) => (
              <Link 
                key={calc.slug} 
                href={`/calculators/${calc.slug}`}
                className="calculator-card"
              >
                <h3>{calc.title}</h3>
                <p>{calc.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Electrical Section */}
        <section className="category-section">
          <h2 className="category-title">⚡ 电气工程</h2>
          <div className="calculator-grid">
            {calculators.electrical.map((calc) => (
              <Link 
                key={calc.slug} 
                href={`/calculators/${calc.slug}`}
                className="calculator-card"
              >
                <h3>{calc.title}</h3>
                <p>{calc.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Fluid Section */}
        <section className="category-section">
          <h2 className="category-title">💧 流体力学</h2>
          <div className="calculator-grid">
            {calculators.fluid.map((calc) => (
              <Link 
                key={calc.slug} 
                href={`/calculators/${calc.slug}`}
                className="calculator-card"
              >
                <h3>{calc.title}</h3>
                <p>{calc.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Structure Section */}
        <section className="category-section">
          <h2 className="category-title">🏗️ 结构工程</h2>
          <div className="calculator-grid">
            {calculators.structure.map((calc) => (
              <Link 
                key={calc.slug} 
                href={`/calculators/${calc.slug}`}
                className="calculator-card"
              >
                <h3>{calc.title}</h3>
                <p>{calc.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="disclaimer">
          <strong>⚠️ 免责声明：</strong>本网站所有计算结果仅供参照之用。
          请勿将计算结果作为工程设计或施工的最终依据。
          如需进行实际工程项目，请咨询有执照的专业工程师。
        </div>

        {/* WeChat QR Code */}
        <div style={{ textAlign: 'center', margin: '2rem 0', padding: '2rem', background: '#f0f9ff', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text)' }}>关注公众号</h3>
          <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>扫码关注「智效厂务」，获取更多厂务技术文章</p>
          <img 
            src="/wechat-qr.jpg" 
            alt="智效厂务公众号二维码" 
            style={{ width: '200px', height: '200px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
          />
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>© 2026 智效厂务工程计算器. 保留所有权利.</p>
        </div>
      </footer>
    </>
  )
}
