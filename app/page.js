import Link from 'next/link'
import { getFeaturedArticles, getLatestArticles, CATEGORIES } from '../data/articles'

const stats = [
  { value: '1.3 Crore', label: 'NRIs Worldwide' },
  { value: '$100B+', label: 'Annual Remittance' },
  { value: '100+', label: 'Free Guides' },
  { value: '₹0', label: 'Cost to You' },
]

const tools = [
  { icon: '🏠', title: 'NRI EMI Calculator', desc: 'Calculate home loan EMI in USD & INR instantly', href: '/calculators/emi', badge: 'Popular' },
  { icon: '💰', title: 'NRI Tax Calculator', desc: 'Estimate your Indian tax liability in minutes', href: '/calculators/tax', badge: 'New' },
  { icon: '💸', title: 'Remittance Comparator', desc: 'Find the best rate to send money to India', href: '/calculators/remittance', badge: 'Free' },
]

const categories = [
  { name: 'NRI Banking', slug: 'banking', icon: '🏦', desc: 'NRE, NRO, FCNR accounts & FD rates', count: 15 },
  { name: 'Taxes & ITR', slug: 'taxes', icon: '📊', desc: 'ITR filing, DTAA, TDS & tax planning', count: 20 },
  { name: 'Investment', slug: 'investment', icon: '📈', desc: 'Mutual funds, stocks, NPS & PPF', count: 15 },
  { name: 'Property', slug: 'property', icon: '🏘️', desc: 'Buy, sell, rent Indian property', count: 10 },
  { name: 'Remittance', slug: 'remittance', icon: '💳', desc: 'Best apps to send money to India', count: 10 },
  { name: 'Legal & OCI', slug: 'legal', icon: '⚖️', desc: 'OCI card, POA, succession law', count: 10 },
]

const whyUs = [
  { icon: '🤖', title: 'AI-Powered Expert', desc: 'Get instant NRI finance answers from our AI expert trained on Indian tax law, RBI regulations, and FEMA rules.' },
  { icon: '📰', title: '100+ Free Guides', desc: 'Comprehensive, plain-English guides covering every NRI financial situation — banking, taxes, property, remittance.' },
  { icon: '🔢', title: 'Smart Calculators', desc: 'NRI-specific calculators for EMI, tax liability, and remittance rates — giving both INR and your currency.' },
  { icon: '🔄', title: 'Always Updated', desc: 'Content updated with every RBI notification, SEBI circular, and Union Budget change so you get current rules.' },
]

function ArticleCard({ article, large = false }) {
  const catColors = {
    banking: 'bg-blue-50 text-blue-700',
    taxes: 'bg-amber-50 text-amber-700',
    investment: 'bg-green-50 text-green-700',
    property: 'bg-purple-50 text-purple-700',
    remittance: 'bg-teal-50 text-teal-700',
    legal: 'bg-red-50 text-red-700',
    insurance: 'bg-orange-50 text-orange-700',
    returning: 'bg-indigo-50 text-indigo-700',
  }
  return (
    <Link href={`/articles/${article.slug}`}
      className={`group block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${large ? 'md:col-span-2' : ''}`}>
      <div className="bg-gradient-to-br from-navy-800 to-navy-900 h-2 w-full" />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${catColors[article.category] || 'bg-gray-100 text-gray-600'}`}>
            {article.category}
          </span>
          <span className="text-xs text-gray-400">{article.readTime} min read</span>
        </div>
        <h3 className={`font-display font-semibold text-navy-800 group-hover:text-navy-600 transition-colors leading-snug ${large ? 'text-xl mb-3' : 'text-base mb-2'}`}>
          {article.title}
        </h3>
        {article.metaDesc && (
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{article.metaDesc}</p>
        )}
        <div className="mt-4 flex items-center text-gold-500 font-semibold text-sm gap-1">
          Read Guide <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </div>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const featured = getFeaturedArticles(4)
  const latest = getLatestArticles(9)

  return (
    <div className="min-h-screen">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-navy-700/30 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-300 text-sm font-medium">India&apos;s #1 NRI Finance Resource</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Everything an NRI needs to
              <span className="text-gold-400"> manage money </span>
              in India
            </h1>

            <p className="text-navy-200 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              NRE/NRO accounts, ITR filing, DTAA, remittance, property — 100+ expert guides, smart calculators, and an AI expert that answers your NRI finance questions instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/ask-expert"
                className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold">
                🤖 Ask AI Expert Free
              </Link>
              <Link href="/articles"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors">
                Browse 100+ Guides →
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-navy-700/50 bg-navy-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-display font-bold text-gold-400">{s.value}</div>
                  <div className="text-navy-300 text-sm mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tools ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-3">Free NRI Finance Tools</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Smart calculators built for NRI financial decisions — results in INR and your currency.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map(t => (
            <Link key={t.title} href={t.href}
              className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="bg-gold-100 text-gold-700 text-xs font-semibold px-2 py-0.5 rounded-full">{t.badge}</span>
              </div>
              <div className="text-4xl mb-4">{t.icon}</div>
              <h3 className="font-display text-lg font-semibold text-navy-900 mb-2 group-hover:text-navy-600 transition-colors">{t.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{t.desc}</p>
              <span className="text-gold-500 font-semibold text-sm">Use Calculator →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Articles ───────────────────────────────────── */}
      <section className="bg-gray-50/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-2">Essential NRI Guides</h2>
              <p className="text-gray-500">Most read guides by NRIs worldwide</p>
            </div>
            <Link href="/articles" className="hidden md:block text-navy-700 font-semibold hover:text-gold-600 transition-colors">
              All 100+ Guides →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {featured.map((a, i) => <ArticleCard key={a.slug} article={a} large={i === 0} />)}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/articles" className="text-navy-700 font-semibold hover:text-gold-600">View All 100+ Guides →</Link>
          </div>
        </div>
      </section>

      {/* ── Browse by Category ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-3">Browse by Topic</h2>
          <p className="text-gray-500 text-lg">Find exactly what you&apos;re looking for</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(c => (
            <Link key={c.slug} href={`/articles?cat=${c.slug}`}
              className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gold-200 hover:-translate-y-1 transition-all duration-200">
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="font-semibold text-navy-800 group-hover:text-navy-600 mb-1">{c.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
              <div className="mt-3 text-xs text-gold-600 font-medium">{c.count} guides →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Latest Articles ─────────────────────────────────────── */}
      <section className="bg-gray-50/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-3xl font-bold text-navy-900">Latest Guides</h2>
            <Link href="/articles" className="text-navy-700 font-semibold hover:text-gold-600 transition-colors">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.slice(0, 9).map(a => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>

      {/* ── AI Expert CTA ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-navy-900 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-4xl mb-4">🤖</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Have an NRI finance question?
              </h2>
              <p className="text-navy-200 text-lg leading-relaxed mb-6">
                Our AI expert — powered by LLaMA 3.3 70B — knows Indian tax law, RBI regulations, FEMA rules, and NRI banking inside out. Ask anything, get an instant answer.
              </p>
              <Link href="/ask-expert"
                className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold">
                Ask AI Expert Free ✦
              </Link>
            </div>
            <div className="bg-navy-800/60 rounded-2xl p-5 border border-navy-700/50">
              <div className="space-y-3">
                {[
                  'Can I keep my NRE account after returning to India?',
                  'What TDS is deducted when I sell my property in India?',
                  'Is my US salary taxable in India as an NRI?',
                  'How do I claim DTAA benefit on my NRO interest?',
                ].map((q, i) => (
                  <div key={i} className="bg-navy-700/50 rounded-xl px-4 py-3 text-navy-100 text-sm hover:bg-navy-700 transition-colors cursor-pointer">
                    &quot;{q}&quot;
                  </div>
                ))}
                <div className="text-center text-navy-400 text-xs pt-1">Click any question or ask your own →</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us ──────────────────────────────────────────────── */}
      <section className="bg-gray-50/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-3">Why 10,000+ NRIs Trust Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(w => (
              <div key={w.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl mb-4">{w.icon}</div>
                <h3 className="font-semibold text-navy-900 mb-2 text-lg">{w.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-gold-50 to-amber-50 border border-gold-200 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-3">Weekly NRI Finance Tips</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            Get the latest NRI tax rule changes, remittance rate alerts, and finance tips every week — free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
  <input
    type="email"
    placeholder="Your email address"
    className="flex-1 px-5 py-3 rounded-xl border border-gold-200 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 text-navy-900"
  />
  <button type="button" className="btn-gold px-8 py-3 rounded-xl font-semibold whitespace-nowrap">
    Subscribe Free
  </button>
</div>
          <p className="text-gray-400 text-xs mt-4">No spam. Unsubscribe anytime. 100% free.</p>
        </div>
      </section>

    </div>
  )
}
