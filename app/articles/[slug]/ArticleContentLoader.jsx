'use client'
import { useState, useEffect } from 'react'

export default function ArticleContentLoader({ article }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cacheKey = `article_${article.slug}`
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) {
      setContent(cached)
      setLoading(false)
      return
    }

    fetch('/api/generate-article', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: article.title, category: article.category, slug: article.slug })
    })
      .then(r => r.json())
      .then(data => {
        if (data.content) {
          sessionStorage.setItem(cacheKey, data.content)
          setContent(data.content)
        } else {
          setContent('<p>Unable to load content. Please try again later.</p>')
        }
      })
      .catch(() => setContent('<p>Unable to load content. Please try again later.</p>'))
      .finally(() => setLoading(false))
  }, [article.slug, article.title, article.category])

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🤖</div>
          <p className="text-navy-700 font-semibold">Our AI is generating this expert guide...</p>
          <p className="text-gray-500 text-sm mt-1">Powered by LLaMA 3.3 70B. This takes 5–10 seconds.</p>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
        <div className="h-32 bg-gray-100 rounded-xl mt-6" />
        <div className="h-4 bg-gray-200 rounded w-full mt-4" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    )
  }

  return <div className="article-body" dangerouslySetInnerHTML={{ __html: content }} />
}
