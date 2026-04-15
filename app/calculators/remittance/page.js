'use client'
import { useState } from 'react'
import Link from 'next/link'

const SERVICES = [
  { name: 'Wise', fee: 0.0065, margin: 0.004, speed: '1–2 days', color: 'bg-green-500', tag: '✓ Best Rate', href: '#wise' },
  { name: 'Remitly Express', fee: 0, margin: 0.008, speed: 'Minutes', color: 'bg-blue-500', tag: '⚡ Fastest', href: '#remitly' },
  { name: 'Remitly Economy', fee: 0, margin: 0.006, speed: '3–5 days', color: 'bg-blue-400', tag: '', href: '#remitly' },
  { name: 'Google Pay', fee: 0, margin: 0.010, speed: 'Instant–3 days', color: 'bg-yellow-500', tag: '📱 Simplest', href: '#googlepay' },
  { name: 'Western Union', fee: 0.005, margin: 0.018, speed: 'Minutes', color: 'bg-orange-500', tag: '', href: '#wu' },
  { name: 'Bank SWIFT', fee: 0.03, margin: 0.025, speed: '2–5 days', color: 'bg-gray-500', tag: '🔒 Most Secure', href: '#bank' },
]

const MID_MARKET = { USD: 83.5, GBP: 106.0, AED: 22.7, CAD: 61.5, AUD: 54.5, EUR: 90.5 }

export default function RemittancePage() {
  const [amount, setAmount] = useState(1000)
  const [currency, setCurrency] = useState('USD')

  const midRate = MID_MARKET[currency] || 83.5

  const results = SERVICES.map(s => {
    const fee = amount * s.fee
    const amountAfterFee = amount - fee
    const effectiveRate = midRate * (1 - s.margin)
    const received = amountAfterFee * effectiveRate
    const loss = amount * midRate - received
    return { ...s, fee, received, loss, effectiveRate }
  }).sort((a, b) => b.received - a.received)

  const best = results[0]

  const fmt = (n, c = 'INR') => {
    if (c === 'INR') return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 })
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: c, maximumFractionDigits: 0 }).format(n)
  }

  return (
    <div className="min-h-screen">
      <div className="bg-navy-900 py-10 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">NRI Remittance Calculator</h1>
        <p className="text-navy-200 text-lg">Find the best service to send money to India right now</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Input */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-navy-700 mb-2">I want to send</label>
              <div className="relative">
                <input type="number" value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  min="100" max="100000" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">From currency</label>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.keys(MID_MARKET).map(c => (
                  <button key={c} onClick={() => setCurrency(c)}
                    className={`py-2 rounded-lg text-sm font-medium border transition-colors ${currency === c ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-gray-600 border-gray-200 hover:border-navy-300'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gold-50 border border-gold-200 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-0.5">Mid-market rate</div>
              <div className="font-bold text-navy-900">1 {currency} = ₹{midRate}</div>
              <div className="text-xs text-gray-400 mt-0.5">Best possible rate</div>
            </div>
          </div>
        </div>

        {/* Best option callout */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center gap-4">
          <div className="text-3xl">🏆</div>
          <div>
            <div className="font-semibold text-green-800">{best.name} gives your family the most money</div>
            <div className="text-green-700 text-sm">Recipient gets <strong>{fmt(best.received)}</strong> — {fmt(best.loss)} more than a bank wire</div>
          </div>
        </div>

        {/* Results table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy-900 text-gold-300">
                <tr>
                  <th className="px-5 py-4 text-left">Service</th>
                  <th className="px-4 py-4 text-right">Fee</th>
                  <th className="px-4 py-4 text-right">Rate</th>
                  <th className="px-4 py-4 text-right font-bold">Recipient Gets</th>
                  <th className="px-4 py-4 text-right">Speed</th>
                </tr>
              </thead>
              <tbody>
                {results.map((s, i) => (
                  <tr key={s.name} className={`border-b border-gray-100 hover:bg-gray-50 ${i === 0 ? 'bg-green-50/50' : ''}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${s.color}`} />
                        <span className="font-medium text-navy-800">{s.name}</span>
                        {s.tag && <span className="text-xs bg-gold-100 text-gold-700 px-2 py-0.5 rounded-full">{s.tag}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-gray-600">{s.fee === 0 ? 'Free' : fmt(s.fee, currency)}</td>
                    <td className="px-4 py-4 text-right text-gray-600">₹{s.effectiveRate.toFixed(2)}</td>
                    <td className="px-4 py-4 text-right">
                      <div className={`font-bold text-base ${i === 0 ? 'text-green-700' : 'text-navy-800'}`}>{fmt(s.received)}</div>
                      {i > 0 && <div className="text-red-400 text-xs">-{fmt(s.loss)} vs Wise</div>}
                    </td>
                    <td className="px-4 py-4 text-right text-gray-500">{s.speed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-3">
          Rates are approximate and change in real-time. Always verify on the provider&apos;s platform before transferring. Affiliate links may apply.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Wise', desc: 'Best exchange rate, transparent fees', cta: 'Open Wise Account', href: '#wise', col: 'bg-green-600' },
            { name: 'Remitly', desc: 'Fast delivery, first transfer often free', cta: 'Try Remitly', href: '#remitly', col: 'bg-blue-600' },
            { name: 'Niyo Global Card', desc: 'Zero forex card for India trips', cta: 'Get Niyo Card', href: '#niyo', col: 'bg-purple-600' },
          ].map(s => (
            <a key={s.name} href={s.href}
              className="block bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className={`w-10 h-1.5 rounded-full ${s.col} mb-3`} />
              <div className="font-semibold text-navy-800 mb-1">{s.name}</div>
              <div className="text-gray-500 text-sm mb-3">{s.desc}</div>
              <div className="text-gold-600 font-medium text-sm">{s.cta} →</div>
            </a>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/articles/best-money-transfer-apps"
            className="block bg-white border border-gray-100 rounded-2xl p-4 text-sm text-navy-700 hover:shadow-md transition-all text-center font-medium">
            📖 Full Comparison: Wise vs Remitly vs Google Pay →
          </Link>
        </div>
      </div>
    </div>
  )
}
