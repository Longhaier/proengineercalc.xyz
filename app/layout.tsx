import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ProEngineerCalc - Professional Engineering Calculator Toolbox',
  description: 'Free online engineering calculator toolbox for HVAC, electrical, fluid mechanics, and structural engineering. Calculate dew point, cable ampacity, psychrometric properties and more.',
  keywords: 'engineering calculator, HVAC calculator, electrical calculator, dew point calculator, cable ampacity, psychrometric chart',
  authors: [{ name: 'ProEngineerCalc' }],
  openGraph: {
    title: 'ProEngineerCalc - Professional Engineering Calculator Toolbox',
    description: 'Free online engineering calculator toolbox for professionals',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="7p6E6l3bA-XCHPdkW7jBefcSPlzYNp3TxjMck2AuawE" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7465624411296700" crossOrigin="anonymous"></script>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
