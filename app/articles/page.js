import Link from 'next/link'
import { allArticles, CATEGORIES } from '../../data/articles'

export const metadata = {
  title: '100+ NRI Finance Guides — NRI Money Guide',
  description: 'Complete collection of NRI finance guides covering banking, taxes, investment, property, remittance, and legal topics for NRIs worldwide.',
}

const catIcons = {
  banking: '🏦', taxes: '📊', investment: '📈', property: '🏘️',
  remittance: '💸', insurance: '🛡️', legal: '⚖️', returning: '✈️'
}
const catColors = {
  banking: 'bg-blue-50 text-blue-700 border-blue-200',
  taxes: 'bg-amber-50 text-amber-700 border-amber-200',
  investment: 'bg-green-50 text-green-700 border-green-200',
  property: 'bg-purple-50 text-purple-700 border-purple-200',
  remittance: 'bg-teal-50 text-teal-700 border-teal-200',
  insurance: 'bg-orange-50 text-orange-700 border-orange-200',
  legal: 'bg-red-50 text-red-700 border-red-200',
  returning: 'bg-indigo-50 text-indigo-700 border-indigo-200',
}

export default function ArticlesPage({ searchParams }) {
  const cat = searchParams?.cat || 'all'
  const filtered = cat === 'all' ? allArticles : allArticles.filter(a => a.category === cat)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-navy-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            100+ NRI Finance Guides
          </h1>
          <p className="text-navy-200 text-lg max-w-xl mx-auto">
            Everything you need to manage your money between India and abroad — free, expert-written, always updated.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/articles"
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${cat === 'all' ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-gray-600 border-gray-200 hover:border-navy-300'}`}>
            All ({allArticles.length})
          </Link>
          {CATEGORIES.map(c => (
            <Link key={c} href={`/articles?cat=${c}`}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors capitalize ${cat === c ? `${catColors[c]} font-semibold` : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
              {catIcons[c]} {c} ({allArticles.filter(a => a.category === c).length})
            </Link>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(article => (
            <Link key={article.slug} href={`/articles/${article.slug}`}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <div className="bg-gradient-to-br from-navy-800 to-navy-900 h-1.5 w-full" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${catColors[article.category] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {catIcons[article.category]} {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.readTime} min</span>
                </div>
                <h2 className="font-display font-semibold text-navy-800 group-hover:text-navy-600 transition-colors leading-snug text-base mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{article.metaDesc}</p>
                <div className="mt-4 text-gold-500 font-semibold text-sm flex items-center gap-1">
                  Read Guide <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">No articles found in this category yet.</div>
        )}
      </div>
    </div>
  )
}
