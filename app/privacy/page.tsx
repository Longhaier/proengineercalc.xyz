import Link from 'next/link'

export const metadata = {
  title: '隐私政策 - 工程师计算器',
  description: '工程师计算器隐私政策 - 专业工程师计算工具箱',
}

export default function Privacy() {
  return (
    <>
      <header className="header">
        <div className="container header-content">
          <h1 className="logo">
            <Link href="/">🔧 工程师计算器</Link>
          </h1>
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
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>
            隐私政策
          </h1>

          <div className="content-section">
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
              最后更新：2026年3月14日
            </p>

            <h3>1. 我们收集的信息</h3>
            <p>工程师计算器是一个信息类网站。我们不会通过本网站收集您的个人信息。所有计算都在您的浏览器本地执行，不会传输到我们的服务器。</p>

            <h3>2. 本地存储</h3>
            <p>我们可能会使用本地存储来保存您的计算历史和偏好设置，以提供更好的用户体验。这些数据仅存储在您的设备上，不会传输给我们。</p>

            <h3>3. Cookie</h3>
            <p>我们可能会使用必要的Cookie来改善您的浏览体验。您可以在浏览器设置中禁用Cookie。</p>

            <h3>4. 第三方服务</h3>
            <p>我们使用以下第三方服务：</p>
            <ul>
              <li><strong>Vercel：</strong>用于托管和数据分析</li>
              <li><strong>Google Analytics：</strong>用于网站流量分析（如已启用）</li>
              <li><strong>Google AdSense：</strong>用于展示广告</li>
            </ul>

            <h3>5. 儿童隐私</h3>
            <p>我们的网站不会故意收集13岁以下儿童的个人信息。</p>

            <h3>6. 隐私政策变更</h3>
            <p>我们可能会不时更新此隐私政策。更新内容将发布在本页面。</p>

            <h3>7. 联系我们</h3>
            <p>如果您对隐私政策有任何疑问，请与我们联系。</p>
          </div>

          <div className="disclaimer">
            <strong>免责声明：</strong>所有计算结果仅供参照之用。
            请勿将计算结果作为工程设计或施工的最终依据。
            如需进行实际工程项目，请咨询有执照的专业工程师。
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>© 2026 工程师计算器. 保留所有权利.</p>
        </div>
      </footer>
    </>
  )
}
