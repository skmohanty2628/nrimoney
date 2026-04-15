import { allArticles } from '@/data/articles'

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://nrimoneytalk.com'

  const staticPages = ['', '/articles', '/ask-expert', '/calculators/emi', '/calculators/tax', '/calculators/remittance', '/about', '/contact', '/privacy-policy', '/terms'].map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path.includes('article') ? 0.9 : 0.7,
  }))

  const articlePages = allArticles.map(a => ({
    url: `${base}/articles/${a.slug}`,
    lastModified: new Date(a.publishDate),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...articlePages]
}
