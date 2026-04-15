'use client'
import { useState, useRef, useEffect } from 'react'

const QUICK_QUESTIONS = [
  'What is the difference between NRE and NRO account?',
  'Do I need to file ITR in India as an NRI?',
  'How can I send money to India cheaply?',
  'Can I invest in Indian mutual funds from the USA?',
  'What TDS is deducted on my NRO account interest?',
]

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isUser ? 'bg-navy-700 text-white' : 'bg-gold-400 text-navy-900'}`}>
        {isUser ? 'You' : 'AI'}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? 'bg-navy-700 text-white rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'}`}>
        <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>').replace(/⚠️/g, '<span class="text-amber-500">⚠️</span>') }} />
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Namaste! 🙏 I\'m your NRI Money Guide AI Expert.\n\nAsk me anything about NRI banking, taxes (ITR, DTAA), mutual funds, property, or remittance. I\'ll give you a clear, practical answer instantly.'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async (text) => {
    const question = text || input.trim()
    if (!question || loading) return

    setInput('')
    const newMessages = [...messages, { role: 'user', content: question }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure GROQ_API_KEY is set in your .env.local file and try again.'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl btn-gold flex items-center justify-center text-2xl hover:scale-110 transition-transform"
        aria-label="Open AI Expert Chat">
        {open ? '✕' : '🤖'}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-gray-50 rounded-2xl shadow-2xl border border-gray-200 flex flex-col chat-bubble overflow-hidden"
          style={{ height: '520px' }}>

          {/* Header */}
          <div className="bg-navy-900 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-400 flex items-center justify-center text-navy-900 font-bold text-sm flex-shrink-0">AI</div>
            <div>
              <div className="text-white font-semibold text-sm">NRI Money Expert</div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-navy-300 text-xs">Powered by LLaMA 3.3 70B</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {messages.map((m, i) => <Message key={i} msg={m} />)}

            {loading && (
              <div className="flex gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center text-xs font-bold text-navy-900">AI</div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick questions (shown only at start) */}
            {messages.length === 1 && (
              <div className="mt-2">
                <p className="text-xs text-gray-400 mb-2 px-1">Quick questions:</p>
                {QUICK_QUESTIONS.map((q, i) => (
                  <button key={i} onClick={() => send(q)}
                    className="block w-full text-left text-xs bg-white border border-gray-200 rounded-xl px-3 py-2 mb-1.5 text-gray-700 hover:bg-navy-50 hover:border-navy-200 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Ask your NRI finance question..."
                className="flex-1 text-sm px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 bg-gray-50"
                disabled={loading}
              />
              <button onClick={() => send()}
                disabled={loading || !input.trim()}
                className="btn-gold px-4 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                Send
              </button>
            </div>
            <p className="text-center text-gray-300 text-xs mt-2">Not financial advice. For personal matters, consult a CA.</p>
          </div>
        </div>
      )}
    </>
  )
}
