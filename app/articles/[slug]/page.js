import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticle, hasFullContent, allArticles, getArticlesByCategory } from '../../../data/articles'
import ArticleContentLoader from './ArticleContentLoader'

export async function generateMetadata({ params }) {
  const article = getArticle(params.slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.metaDesc,
    openGraph: {
      title: article.title,
      description: article.metaDesc,
      type: 'article',
      publishedTime: article.publishDate,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nrimoneytalk.com'}/articles/${article.slug}`,
    }
  }
}

export async function generateStaticParams() {
  return allArticles.slice(0, 30).map(a => ({ slug: a.slug }))
}

const catColors = {
  banking: 'bg-blue-50 text-blue-700',
  taxes: 'bg-amber-50 text-amber-700',
  investment: 'bg-green-50 text-green-700',
  property: 'bg-purple-50 text-purple-700',
  remittance: 'bg-teal-50 text-teal-700',
  insurance: 'bg-orange-50 text-orange-700',
  legal: 'bg-red-50 text-red-700',
  returning: 'bg-indigo-50 text-indigo-700',
}

export default function ArticlePage({ params }) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const isComplete = hasFullContent(params.slug)
  const relatedArticles = getArticlesByCategory(article.category, 4)
    .filter(a => a.slug !== params.slug)
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDesc,
    datePublished: article.publishDate,
    publisher: {
      '@type': 'Organization',
      name: 'NRI Money Guide',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-cream">
        {/* Article Header */}
        <div className="bg-navy-900 py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-navy-300 text-sm mb-4">
              <Link href="/" className="hover:text-gold-300 transition-colors">Home</Link>
              <span>›</span>
              <Link href="/articles" className="hover:text-gold-300 transition-colors">Guides</Link>
              <span>›</span>
              <Link href={`/articles?cat=${article.category}`} className="hover:text-gold-300 capitalize transition-colors">{article.category}</Link>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${catColors[article.category] || 'bg-gray-100 text-gray-600'}`}>
                {article.category}
              </span>
              <span className="text-navy-300 text-sm">{article.readTime} min read</span>
              <span className="text-navy-400 text-sm">{new Date(article.publishDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed max-w-2xl">{article.metaDesc}</p>
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Article body */}
            <article className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
                {isComplete ? (
                  <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  <ArticleContentLoader article={article} />
                )}
              </div>

              {/* Social share */}
              <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5 flex flex-wrap items-center gap-4">
                <span className="font-semibold text-navy-800 text-sm">Found this helpful?</span>
                <a href={`https://wa.me/?text=${encodeURIComponent(article.title + ' — ' + (process.env.NEXT_PUBLIC_SITE_URL || 'https://nrimoneytalk.com') + '/articles/' + article.slug)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1.5">
                  📱 Share on WhatsApp
                </a>
                <Link href="/ask-expert"
                  className="bg-navy-100 text-navy-800 text-sm px-4 py-2 rounded-lg hover:bg-navy-200 transition-colors">
                  Ask AI Expert a Follow-up →
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* AI Expert CTA */}
              <div className="bg-navy-900 rounded-2xl p-5 text-white">
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="font-display font-semibold text-lg mb-2">Have questions?</h3>
                <p className="text-navy-200 text-sm mb-4 leading-relaxed">Ask our AI Expert — powered by LLaMA 3.3 70B — any NRI finance question and get an instant answer.</p>
                <Link href="/ask-expert" className="btn-gold block text-center py-2.5 rounded-xl text-sm font-semibold">
                  Ask AI Expert Free ✦
                </Link>
              </div>

              {/* Calculators */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-semibold text-navy-800 mb-4 text-sm uppercase tracking-wide">Free Calculators</h3>
                <div className="space-y-2">
                  {[
                    { icon: '🏠', label: 'NRI EMI Calculator', href: '/calculators/emi' },
                    { icon: '💰', label: 'NRI Tax Calculator', href: '/calculators/tax' },
                    { icon: '💸', label: 'Remittance Comparator', href: '/calculators/remittance' },
                  ].map(t => (
                    <Link key={t.href} href={t.href}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-navy-50 hover:text-navy-800 transition-colors text-sm text-gray-700">
                      <span className="text-xl">{t.icon}</span>
                      <span className="font-medium">{t.label}</span>
                      <span className="ml-auto text-gray-400">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-semibold text-navy-800 mb-4 text-sm uppercase tracking-wide">Related Guides</h3>
                  <div className="space-y-3">
                    {relatedArticles.map(a => (
                      <Link key={a.slug} href={`/articles/${a.slug}`}
                        className="block p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="text-sm font-medium text-navy-700 hover:text-navy-900 leading-snug">{a.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{a.readTime} min read</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Affiliate CTAs */}
              <div className="bg-gold-50 border border-gold-200 rounded-2xl p-5">
                <h3 className="font-semibold text-navy-800 mb-3 text-sm">Recommended Services</h3>
                <div className="space-y-2">
                  <a href="#" className="block bg-white border border-gold-200 rounded-xl p-3 text-sm hover:border-gold-400 transition-colors">
                    <div className="font-semibold text-navy-800">Wise — Send Money to India</div>
                    <div className="text-gray-500 text-xs mt-0.5">Best exchange rates, low fees</div>
                    <div className="text-gold-600 text-xs font-medium mt-1">Get first transfer free →</div>
                  </a>
                  <a href="#" className="block bg-white border border-gold-200 rounded-xl p-3 text-sm hover:border-gold-400 transition-colors">
                    <div className="font-semibold text-navy-800">Open NRE Account — HDFC</div>
                    <div className="text-gray-500 text-xs mt-0.5">7% FD rate, online application</div>
                    <div className="text-gold-600 text-xs font-medium mt-1">Apply online →</div>
                  </a>
                </div>
                <p className="text-gray-400 text-xs mt-3">*Affiliate links. We may earn a commission.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
