import Link from 'next/link'

const footerLinks = {
  Banking: [
    { label: 'NRE vs NRO Account', href: '/articles/nre-vs-nro-account' },
    { label: 'Open NRE Account', href: '/articles/how-to-open-nre-account' },
    { label: 'FCNR Account Guide', href: '/articles/fcnr-account-guide' },
    { label: 'SBI vs HDFC NRI', href: '/articles/sbi-vs-hdfc-nri-account' },
  ],
  Taxes: [
    { label: 'NRI ITR Filing', href: '/articles/nri-itr-filing-guide' },
    { label: 'DTAA India Guide', href: '/articles/dtaa-india-guide' },
    { label: 'NRI Rental Tax', href: '/articles/nri-rental-income-tax' },
    { label: 'Property Sale TDS', href: '/articles/nri-property-sale-tds' },
  ],
  Calculators: [
    { label: 'EMI Calculator', href: '/calculators/emi' },
    { label: 'NRI Tax Calculator', href: '/calculators/tax' },
    { label: 'Remittance Calculator', href: '/calculators/remittance' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold-400 rounded-lg flex items-center justify-center">
                <span className="text-navy-900 font-bold text-sm">₹</span>
              </div>
              <span className="font-display text-white font-semibold">NRI Money Guide</span>
            </div>
            <p className="text-sm text-navy-300 leading-relaxed">
              India&apos;s most trusted NRI finance resource. Free guides, calculators, and AI-powered expert advice.
            </p>
            <div className="mt-4 text-xs text-navy-400">
              © {new Date().getFullYear()} NRI Money Guide.<br />All rights reserved.
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-gold-300 font-semibold text-sm mb-3 font-sans uppercase tracking-wide">{category}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-navy-300 hover:text-gold-300 text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-navy-800 mt-10 pt-6">
          <p className="text-xs text-navy-400 text-center leading-relaxed max-w-3xl mx-auto">
            <strong className="text-navy-300">Disclaimer:</strong> The content on NRI Money Guide is for informational purposes only and does not constitute financial, tax, or legal advice. Always consult a qualified Chartered Accountant or financial advisor for your specific situation. Tax laws and RBI regulations change — verify information with official government sources.
          </p>
        </div>
      </div>
    </footer>
  )
}
