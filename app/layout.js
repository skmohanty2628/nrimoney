import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChatWidget from '../components/ChatWidget'
export const metadata = {
  title: { default: 'NRI Money Guide — India\'s #1 NRI Finance Resource', template: '%s | NRI Money Guide' },
  description: 'Complete NRI finance guide. NRE/NRO accounts, ITR filing, DTAA, remittance, NRI home loans, tax calculators and expert AI advice. Free, trusted, updated 2025.',
  keywords: ['NRI finance', 'NRE NRO account', 'NRI tax India', 'NRI ITR filing', 'send money to India', 'NRI home loan', 'DTAA India'],
  authors: [{ name: 'NRI Money Guide' }],
  creator: 'NRI Money Guide',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nrimoneytalk.com',
    siteName: 'NRI Money Guide',
    title: 'NRI Money Guide — India\'s #1 NRI Finance Resource',
    description: 'Complete NRI finance guide covering NRE/NRO accounts, ITR filing, DTAA, remittance, tax calculators and AI expert advice.',
  },
  twitter: { card: 'summary_large_image', title: 'NRI Money Guide', description: 'India\'s trusted NRI finance resource.' },
  robots: { index: true, follow: true },
  verification: { google: 'f32dc886c29dbd11' },
}

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID
  const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID

  return (
    <html lang="en">
      <head>
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');` }} />
          </>
        )}
        {ADSENSE_ID && (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`} crossOrigin="anonymous" />
        )}
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'https://nrimoneytalk.com'} />
      </head>
      <body className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
