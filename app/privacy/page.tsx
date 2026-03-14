import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy - ProEngineerCalc',
  description: 'Privacy Policy for ProEngineerCalc - Professional Engineering Calculator Tools',
}

export default function Privacy() {
  return (
    <>
      <header className="header">
        <div className="container header-content">
          <h1 className="logo">
            <Link href="/">ProEngineerCalc</Link>
          </h1>
          <p className="tagline">Professional Engineering Calculator Tools</p>
        </div>
      </header>

      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/">Home</Link>
          <Link href="/calculators/hvac">HVAC</Link>
          <Link href="/calculators/electrical">Electrical</Link>
          <Link href="/calculators/fluid">Fluid</Link>
          <Link href="/calculators/structure">Structure</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </nav>

      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>
            Privacy Policy
          </h1>

          <div className="content-section">
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
              Last Updated: March 14, 2026
            </p>

            <h3>1. Information We Collect</h3>
            <p>ProEngineerCalc is an informational website. We do not collect personal information through this website. All calculations are performed locally in your browser and are not transmitted to our servers.</p>

            <h3>2. Local Storage</h3>
            <p>We may use local storage to save your calculation history and preferences for a better user experience. This data is stored only on your device and is not transmitted to us.</p>

            <h3>3. Cookies</h3>
            <p>We may use essential cookies to improve your browsing experience. You can disable cookies in your browser settings.</p>

            <h3>4. Third-Party Services</h3>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Vercel:</strong> For hosting and analytics</li>
              <li><strong>Google Analytics:</strong> For website traffic analysis (if enabled)</li>
              <li><strong>Google AdSense:</strong> For displaying advertisements</li>
            </ul>

            <h3>5. Children&apos;s Privacy</h3>
            <p>Our website does not knowingly collect personal information from children under 13 years of age.</p>

            <h3>6. Changes to Privacy Policy</h3>
            <p>We may update this privacy policy from time to time. Any changes will be posted on this page.</p>

            <h3>7. Contact</h3>
            <p>If you have questions about this Privacy Policy, please contact us.</p>
          </div>

          <div className="disclaimer">
            <strong>Disclaimer:</strong> All calculations are for reference only. 
            Do not use these results as the final basis for engineering design or construction. 
            Consult a licensed professional engineer for actual installations.
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>2026 ProEngineerCalc. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
