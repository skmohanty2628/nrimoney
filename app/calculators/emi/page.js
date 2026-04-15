'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(5000000)
  const [interestRate, setInterestRate] = useState(8.75)
  const [tenure, setTenure] = useState(20)
  const [currency, setCurrency] = useState('USD')
  const [exchangeRate, setExchangeRate] = useState(83.5)

  const rates = { USD: 83.5, GBP: 106.0, AED: 22.7, CAD: 61.5, AUD: 54.5, SGD: 61.8 }

  const emi = (() => {
    const r = interestRate / 12 / 100
    const n = tenure * 12
    if (r === 0) return loanAmount / n
    return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  })()

  const totalPayment = emi * tenure * 12
  const totalInterest = totalPayment - loanAmount
  const rate = rates[currency] || exchangeRate

  const fmt = (n, cur = 'INR') => {
    if (cur === 'INR') return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 })
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n / rate)
  }

  return (
    <div className="min-h-screen">
      <div className="bg-navy-900 py-10 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">NRI Home Loan EMI Calculator</h1>
        <p className="text-navy-200 text-lg">Calculate your monthly EMI in both INR and your currency</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Inputs */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <h2 className="font-display text-xl font-semibold text-navy-900">Loan Details</h2>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Loan Amount</label>
              <input type="range" min={500000} max={50000000} step={100000} value={loanAmount}
                onChange={e => setLoanAmount(Number(e.target.value))}
                className="w-full accent-gold-500" />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>₹5L</span>
                <span className="font-semibold text-navy-800 text-base">{fmt(loanAmount)}</span>
                <span>₹5Cr</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Interest Rate (% per annum)</label>
              <input type="range" min={6} max={15} step={0.05} value={interestRate}
                onChange={e => setInterestRate(Number(e.target.value))}
                className="w-full accent-gold-500" />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>6%</span>
                <span className="font-semibold text-navy-800 text-base">{interestRate.toFixed(2)}% p.a.</span>
                <span>15%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Loan Tenure (years)</label>
              <input type="range" min={1} max={30} step={1} value={tenure}
                onChange={e => setTenure(Number(e.target.value))}
                className="w-full accent-gold-500" />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1 yr</span>
                <span className="font-semibold text-navy-800 text-base">{tenure} years</span>
                <span>30 yrs</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Your Currency</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(rates).map(c => (
                  <button key={c} onClick={() => { setCurrency(c); setExchangeRate(rates[c]) }}
                    className={`py-2 rounded-xl text-sm font-semibold border transition-colors ${currency === c ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-gray-600 border-gray-200 hover:border-navy-300'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="bg-navy-900 rounded-2xl p-6 text-white text-center">
              <div className="text-navy-300 text-sm font-medium mb-1">Monthly EMI</div>
              <div className="font-display text-4xl font-bold text-gold-400 mb-1">{fmt(emi)}</div>
              <div className="text-navy-300 text-lg">{fmt(emi, currency)}</div>
              <div className="text-navy-400 text-xs mt-2">Exchange rate: 1 {currency} = ₹{rate}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Total Payable</div>
                <div className="font-display font-bold text-navy-900 text-xl">{fmt(totalPayment)}</div>
                <div className="text-gray-400 text-sm">{fmt(totalPayment, currency)}</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Total Interest</div>
                <div className="font-display font-bold text-amber-600 text-xl">{fmt(totalInterest)}</div>
                <div className="text-gray-400 text-sm">{fmt(totalInterest, currency)}</div>
              </div>
            </div>

            {/* Breakup bar */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="text-sm font-semibold text-navy-800 mb-3">Payment Breakdown</div>
              <div className="h-6 rounded-full overflow-hidden flex">
                <div className="bg-navy-700 h-full transition-all" style={{ width: `${(loanAmount / totalPayment * 100).toFixed(1)}%` }} />
                <div className="bg-gold-400 h-full flex-1" />
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-navy-700 inline-block" /> Principal ({(loanAmount / totalPayment * 100).toFixed(1)}%)</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gold-400 inline-block" /> Interest ({(totalInterest / totalPayment * 100).toFixed(1)}%)</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-800">
              <strong>💡 NRI Home Loan Tip:</strong> NRE and NRO accounts can both be used for EMI repayment. Rates above 9% — consider prepaying to save on interest.
            </div>

            <Link href="/articles/nri-home-loan-guide"
              className="block bg-white border border-gray-100 rounded-2xl p-4 text-sm text-navy-700 hover:shadow-md transition-all text-center font-medium">
              📖 Read: NRI Home Loan Complete Guide →
            </Link>
          </div>
        </div>

        {/* Bank rate comparison */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-display text-xl font-semibold text-navy-900 mb-4">Current NRI Home Loan Rates (April 2025)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-900 text-gold-300">
                  <th className="px-4 py-3 text-left rounded-l-lg">Bank</th>
                  <th className="px-4 py-3 text-left">Rate</th>
                  <th className="px-4 py-3 text-left">EMI per ₹1L</th>
                  <th className="px-4 py-3 text-left rounded-r-lg">Max Tenure</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['SBI NRI Home Loan', '8.50–9.20%', '₹870–878', '30 years'],
                  ['HDFC NRI Loan', '8.60–9.50%', '₹874–887', '20 years'],
                  ['ICICI NRI Loan', '8.75–9.65%', '₹880–898', '20 years'],
                  ['Axis Bank NRI', '8.90–9.80%', '₹887–908', '25 years'],
                  ['LIC Housing Finance', '8.50–9.00%', '₹870–880', '20 years'],
                ].map(([bank, rate, emi, tenure]) => (
                  <tr key={bank} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-navy-800">{bank}</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">{rate}</td>
                    <td className="px-4 py-3 text-gray-700">{emi}</td>
                    <td className="px-4 py-3 text-gray-500">{tenure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Rates are indicative. Contact banks directly for current rates. EMI per ₹1L calculated at 9% for 20 years.</p>
        </div>
      </div>
    </div>
  )
}
