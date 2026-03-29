import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: '智效厂务工程计算器 - 专业工程师计算工具箱',
  description: '免费在线工程师计算工具箱，包含暖通空调、电气工程、流体力学和结构工程计算器。支持露点计算、电缆载流量、湿空气参数等多种工程计算。',
  keywords: '智效厂务工程计算器, 智效厂务, 暖通空调计算器, 电气计算器, 露点计算器, 电缆载流量, 湿空气计算器, 工程计算工具',
  authors: [{ name: '智效厂务工程计算器' }],
  openGraph: {
    title: '智效厂务工程计算器 - 专业工程师计算工具箱',
    description: '免费在线工程师计算工具箱，为专业人员提供精准计算',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
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
