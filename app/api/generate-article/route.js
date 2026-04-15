import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req) {
  try {
    const { title, category, slug } = await req.json()

    if (!title) {
      return NextResponse.json({ error: 'Title required' }, { status: 400 })
    }

    const prompt = `Write a comprehensive, expert-level article for an NRI finance website titled: "${title}"

REQUIREMENTS:
- Target audience: Non-Resident Indians (NRIs) from USA, UK, UAE, Canada, Australia
- Length: 900-1100 words of actual content
- Format: HTML only (no markdown). Use these HTML tags: <p>, <h2>, <h3>, <ul>, <li>, <ol>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <strong>, <div class="highlight-box">, <div class="disclaimer">
- Include at least one comparison table with practical data
- Include factual information about RBI/SEBI/FEMA regulations where relevant
- Use specific examples with INR and foreign currency amounts
- End with a disclaimer div: <div class="disclaimer"><p><strong>Disclaimer:</strong> [appropriate disclaimer]</p></div>
- Write in clear, authoritative but accessible English
- Include practical step-by-step information where applicable
- Category: ${category}
- Make it genuinely useful — not generic fluff

CRITICAL: Output ONLY the HTML content. No markdown. No preamble. Start directly with <p> or <h2>. Do not include doctype, html, head, or body tags.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert NRI financial content writer. You write factual, detailed, HTML-formatted articles about NRI finance, banking, taxation, and investment in India. Output clean HTML only with no markdown or code blocks.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2048,
      temperature: 0.6,
    })

    let content = completion.choices[0]?.message?.content || ''

    // Clean up any accidental markdown code blocks
    content = content.replace(/```html\n?/gi, '').replace(/```\n?/gi, '').trim()

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Article generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate article content', details: error.message },
      { status: 500 }
    )
  }
}
