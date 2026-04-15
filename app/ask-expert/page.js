'use client'
import { useState, useRef, useEffect } from 'react'

const SAMPLE_QUESTIONS = [
  { q: 'Do I need to file ITR in India as an NRI?', cat: 'Taxes' },
  { q: 'What is the difference between NRE and NRO account?', cat: 'Banking' },
  { q: 'How much TDS is deducted when selling property in India as NRI?', cat: 'Property' },
  { q: 'Can I invest in Indian mutual funds from the USA?', cat: 'Investment' },
  { q: 'What is DTAA and how does it help me avoid double taxation?', cat: 'Taxes' },
  { q: 'Which is the best app to send money to India?', cat: 'Remittance' },
  { q: 'Can I keep my NRE account after returning to India permanently?', cat: 'Banking' },
  { q: 'How can I repatriate money from selling my Indian property?', cat: 'Property' },
]

export default function AskExpertPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text) => {
    const q = text || input.trim()
    if (!q || loading) return
    setInput('')
    const newMessages = [...messages, { role: 'user', content: q }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting. Check your GROQ_API_KEY in .env.local.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-navy-900 py-8 text-center border-b border-navy-800">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center text-navy-900 font-bold">AI</div>
          <div className="text-left">
            <div className="text-white font-display font-semibold text-xl">NRI Money Expert</div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-navy-300 text-sm">Powered by LLaMA 3.3 70B · Free · Instant</span>
            </div>
          </div>
        </div>
        <p className="text-navy-300 text-sm max-w-xl mx-auto">
          Ask anything about NRI banking, taxes, property, remittance, investments, or legal matters.
        </p>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col">
        {/* Welcome / sample questions */}
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-6xl mb-6">🤖</div>
            <h2 className="font-display text-2xl font-semibold text-navy-900 mb-2">Namaste! How can I help you?</h2>
            <p className="text-gray-500 mb-8 text-center max-w-md">
              Ask me any NRI finance question — taxes, banking, property, remittance, investments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {SAMPLE_QUESTIONS.map((item, i) => (
                <button key={i} onClick={() => send(item.q)}
                  className="text-left bg-white border border-gray-200 rounded-2xl p-4 hover:border-gold-300 hover:shadow-sm transition-all group">
                  <div className="text-xs text-gold-600 font-semibold mb-1">{item.cat}</div>
                  <div className="text-sm text-navy-700 group-hover:text-navy-900 leading-snug">{item.q}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="flex-1 overflow-y-auto space-y-6 pb-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${m.role === 'user' ? 'bg-navy-700 text-white' : 'bg-gold-400 text-navy-900'}`}>
                  {m.role === 'user' ? 'You' : 'AI'}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${m.role === 'user' ? 'bg-navy-800 text-white rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'}`}>
                  <div dangerouslySetInnerHTML={{ __html: m.content.replace(/\n/g, '<br/>') }} />
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-400 flex items-center justify-center text-xs font-bold text-navy-900">AI</div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                  <div className="flex gap-1.5 items-center">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                    <span className="text-gray-400 text-xs ml-2">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input */}
        <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
          <textarea
            rows={3}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Ask your NRI finance question here... (Press Enter to send)"
            className="w-full resize-none text-sm text-navy-900 focus:outline-none bg-transparent"
            disabled={loading}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-400">Not financial advice. For your specific situation, consult a CA.</p>
            <button onClick={() => send()}
              disabled={loading || !input.trim()}
              className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
              Ask Expert →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
