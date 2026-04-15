import Link from 'next/link'

export const metadata = {
  title: 'About NRI Money Guide — India\'s Trusted NRI Finance Resource',
  description: 'Learn about NRI Money Guide — our mission to provide free, accurate, and actionable financial guidance for the 1.3 crore Indians living abroad.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-navy-900 py-12 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">About NRI Money Guide</h1>
        <p className="text-navy-200 text-lg max-w-xl mx-auto">India&apos;s most trusted NRI finance resource — free, accurate, actionable.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 space-y-8">

          <div>
            <h2 className="font-display text-2xl font-semibold text-navy-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              NRI Money Guide exists to solve one problem: NRIs navigating complex Indian financial regulations without the right information end up paying unnecessary taxes, making poor banking decisions, and missing opportunities.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              We provide free, expert-quality guidance on every aspect of NRI finance — from opening an NRE account to selling property in India, from filing ITR-2 to claiming DTAA benefits. Our AI expert gives you instant answers. Our guides give you the complete picture.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-navy-900 mb-4">What We Cover</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '🏦', label: 'NRI Banking' },
                { icon: '📊', label: 'Tax & ITR' },
                { icon: '📈', label: 'Investment' },
                { icon: '🏘️', label: 'Property' },
                { icon: '💸', label: 'Remittance' },
                { icon: '⚖️', label: 'Legal & OCI' },
                { icon: '🛡️', label: 'Insurance' },
                { icon: '✈️', label: 'Returning NRIs' },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-sm font-medium text-navy-800">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-navy-900 mb-4">Our AI Expert</h2>
            <p className="text-gray-600 leading-relaxed">
              Our AI expert is powered by Meta&apos;s LLaMA 3.3 70B model via Groq — one of the fastest and most capable AI models available. It is trained to understand Indian tax law, RBI regulations, FEMA rules, and NRI-specific financial scenarios. It provides educational guidance to help you understand your options — not to replace your CA or financial advisor for complex decisions.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-semibold text-amber-800 mb-2">⚠️ Important Disclaimer</h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              All content on NRI Money Guide — including AI responses, articles, calculators, and guides — is for informational and educational purposes only. It does not constitute financial, tax, or legal advice. Tax laws and RBI regulations change frequently. Always verify information with official government sources (incometax.gov.in, rbi.org.in) and consult a qualified Chartered Accountant or financial advisor for decisions specific to your situation.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-navy-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">Have a suggestion, correction, or want to contribute? We&apos;d love to hear from you.</p>
            <Link href="/contact" className="btn-gold inline-block px-8 py-3 rounded-xl font-semibold text-sm">
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
