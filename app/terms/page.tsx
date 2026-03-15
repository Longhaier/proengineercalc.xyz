import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service - ProEngineerCalc',
  description: 'Terms of Service for ProEngineerCalc - Professional Engineering Calculator Toolbox',
}

export default function Terms() {
  return (
    <>
      <header className="header">
        <div className="container header-content">
          <h1 className="logo">
            <Link href="/">ProEngineerCalc</Link>
          </h1>
          <p className="tagline">Professional Engineering Calculator Toolbox</p>
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
            Terms of Service
          </h1>

          <div className="content-section">
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
              Last Updated: March 14, 2026
            </p>

            <h3>1. Acceptance of Terms</h3>
            <p>By accessing and using ProEngineerCalc, you accept and agree to be bound by the terms and provisions of this agreement.</p>

            <h3>2. Use License</h3>
            <p>Permission is granted to temporarily use this website for personal, non-commercial viewing only. This is the grant of a license, not a transfer of title.</p>

            <h3>3. Disclaimer of Warranties</h3>
            <p>This website is provided "as is" without any representations or warranties, express or implied. ProEngineerCalc makes no representations or warranties in relation to this website or the information and materials provided on this website.</p>

            <h3>4. Limitation of Liability</h3>
            <p>ProEngineerCalc will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website:</p>
            <ul>
              <li>For any indirect, special or consequential loss</li>
              <li>For any business losses, loss of revenue, income, profits or anticipated savings</li>
              <li>For any loss of data or database</li>
              <li>For any other loss or damage of any kind</li>
            </ul>

            <h3>5. Calculation Results</h3>
            <p>All calculations provided on this website are for reference only. The results should NOT be used as the final basis for engineering design or construction. Always consult a licensed professional engineer for actual engineering decisions.</p>

            <h3>6. Intellectual Property</h3>
            <p>All content on this website, including calculators, formulas, and documentation, is the intellectual property of ProEngineerCalc unless otherwise stated.</p>

            <h3>7. Third-Party Links</h3>
            <p>Our website may contain links to third-party websites. We are not responsible for their content or privacy practices.</p>

            <h3>8. Changes to Terms</h3>
            <p>We may update these terms from time to time. Any changes will be posted on this page.</p>

            <h3>9. Contact</h3>
            <p>If you have questions about these Terms of Service, please contact us.</p>
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
