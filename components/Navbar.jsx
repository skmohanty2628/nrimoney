'use client'
import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Banking', href: '/articles?cat=banking' },
  { label: 'Taxes', href: '/articles?cat=taxes' },
  { label: 'Investment', href: '/articles?cat=investment' },
  { label: 'Property', href: '/articles?cat=property' },
  { label: 'Calculators', href: '/calculators/emi' },
  { label: 'All Articles', href: '/articles' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="bg-navy-900 shadow-lg sticky top-0 z-50 border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gold-400 rounded-lg flex items-center justify-center">
              <span className="text-navy-900 font-display font-bold text-sm">₹</span>
            </div>
            <div>
              <span className="font-display text-white font-semibold text-lg leading-none block">NRI Money Guide</span>
              <span className="text-gold-300 text-xs font-sans leading-none">India&apos;s Trusted NRI Finance Resource</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href}
                className="text-navy-100 hover:text-gold-300 text-sm font-sans font-medium px-3 py-2 rounded-lg hover:bg-navy-800 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/ask-expert"
              className="btn-gold text-sm px-5 py-2.5 rounded-lg font-semibold">
              Ask AI Expert ✦
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 border-t border-navy-800 pt-3">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="block text-navy-100 hover:text-gold-300 text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-navy-800 transition-colors">
                {l.label}
              </Link>
            ))}
            <Link href="/ask-expert" onClick={() => setOpen(false)}
              className="btn-gold block text-center mt-3 py-2.5 text-sm rounded-lg">
              Ask AI Expert ✦
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
