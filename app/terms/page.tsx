import Link from 'next/link'

export const metadata = {
  title: '使用条款 - 工程师计算器',
  description: '工程师计算器使用条款 - 专业工程师计算工具箱',
}

export default function Terms() {
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
            使用条款
          </h1>

          <div className="content-section">
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
              最后更新：2026年3月14日
            </p>

            <h3>1. 条款接受</h3>
            <p>访问和使用工程师计算器，即表示您同意并接受本协议的所有条款和规定。</p>

            <h3>2. 使用许可</h3>
            <p>本网站的许可是临时性的，仅供个人、非商业性浏览使用。这是对许可的授予，而非所有权的转移。</p>

            <h3>3. 免责声明</h3>
            <p>本网站按"原样"提供，不提供任何明示或暗示的陈述或担保。工程师计算器对本网站上的信息、材料及相关内容不作任何陈述或担保。</p>

            <h3>4. 责任限制</h3>
            <p>对于以下情况，工程师计算器不承担任何责任：</p>
            <ul>
              <li>任何间接、特殊或后果性的损失</li>
              <li>任何业务损失、收入损失、利润损失或预期储蓄损失</li>
              <li>任何数据或数据库丢失</li>
              <li>任何其他类型的损失或损害</li>
            </ul>

            <h3>5. 计算结果</h3>
            <p>本网站提供的所有计算结果仅供参照之用。请勿将计算结果作为工程设计或施工的最终依据。如需进行实际工程项目，请咨询有执照的专业工程师。</p>

            <h3>6. 知识产权</h3>
            <p>本网站上的所有内容，包括计算器、公式和文档，均为工程师计算器的知识产权，除非另有说明。</p>

            <h3>7. 第三方链接</h3>
            <p>本网站可能包含指向第三方网站的链接。我们不对这些网站的内容或隐私实践负责。</p>

            <h3>8. 条款变更</h3>
            <p>我们可能不时更新这些条款。更新内容将发布在本页面。</p>

            <h3>9. 联系我们</h3>
            <p>如果您对使用条款有任何疑问，请与我们联系。</p>
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
