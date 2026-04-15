import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <div className="text-8xl mb-6">🌏</div>
        <h1 className="font-display text-4xl font-bold text-navy-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">This page doesn&apos;t exist. Let&apos;s get you back to your NRI finance journey.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-gold px-8 py-3.5 rounded-xl font-semibold">Go Home</Link>
          <Link href="/articles" className="bg-white border border-gray-200 text-navy-800 px-8 py-3.5 rounded-xl font-semibold hover:border-navy-300 transition-colors">Browse Guides</Link>
        </div>
      </div>
    </div>
  )
}
