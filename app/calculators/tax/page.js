'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function TaxCalculator() {
  const [rentalIncome, setRentalIncome] = useState(0)
  const [nroInterest, setNroInterest] = useState(0)
  const [capitalGains, setCapitalGains] = useState(0)
  const [gainsType, setGainsType] = useState('ltcg')
  const [homeLoanInterest, setHomeLoanlnterest] = useState(0)
  const [municipalTax, setMunicipalTax] = useState(0)

  // Rental income calculation
  const netRental = Math.max(0, rentalIncome - municipalTax)
  const stdDeduction = netRental * 0.30
  const taxableRental = Math.max(0, netRental - stdDeduction - homeLoanInterest)

  // NRO interest — flat 30%
  const taxOnNRO = nroInterest * 0.30

  // Capital gains
  const taxOnGains = gainsType === 'stcg' ? capitalGains * 0.15 : Math.max(0, capitalGains - 100000) * 0.10

  // Total taxable income (rental)
  const totalTaxableIncome = taxableRental + nroInterest
  const rentalTax = (() => {
    let t = 0
    if (totalTaxableIncome > 1500000) t = (totalTaxableIncome - 1500000) * 0.30 + 187500
    else if (totalTaxableIncome > 1200000) t = (totalTaxableIncome - 1200000) * 0.20 + 127500
    else if (totalTaxableIncome > 900000) t = (totalTaxableIncome - 900000) * 0.15 + 82500
    else if (totalTaxableIncome > 600000) t = (totalTaxableIncome - 600000) * 0.10 + 52500
    else if (totalTaxableIncome > 300000) t = (totalTaxableIncome - 300000) * 0.05 + 22500
    else if (totalTaxableIncome > 250000) t = (totalTaxableIncome - 250000) * 0.05
    return t
  })()

  const totalTax = rentalTax + taxOnGains
  const cess = totalTax * 0.04
  const grandTotal = totalTax + cess

  const tdsAlreadyDeducted = rentalIncome * 0.30 + nroInterest * 0.30 + (gainsType === 'stcg' ? capitalGains * 0.15 : capitalGains * 0.10)
  const refundOrPayable = tdsAlreadyDeducted - grandTotal

  const fmt = n => '₹' + Math.abs(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })

  return (
    <div className="min-h-screen">
      <div className="bg-navy-900 py-10 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">NRI Tax Calculator India 2025</h1>
        <p className="text-navy-200 text-lg">Estimate your Indian income tax liability as an NRI</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 text-sm text-amber-800">
          ⚠️ <strong>Disclaimer:</strong> This is an estimation tool only. Actual tax depends on your full income profile, applicable deductions, DTAA benefits, and slab rates. Always consult a CA for accurate tax computation.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-display text-xl font-semibold text-navy-900">Your Indian Income (Annual)</h2>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-1">Rental Income from Property (₹)</label>
              <input type="number" value={rentalIncome || ''}
                onChange={e => setRentalIncome(Number(e.target.value))}
                placeholder="e.g. 600000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-navy-900" />
            </div>

            {rentalIncome > 0 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-1">Municipal Tax Paid (₹)</label>
                  <input type="number" value={municipalTax || ''}
                    onChange={e => setMunicipalTax(Number(e.target.value))}
                    placeholder="e.g. 20000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-navy-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-1">Home Loan Interest (₹)</label>
                  <input type="number" value={homeLoanInterest || ''}
                    onChange={e => setHomeLoanlnterest(Number(e.target.value))}
                    placeholder="e.g. 150000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-navy-900" />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-1">NRO Account Interest (₹)</label>
              <input type="number" value={nroInterest || ''}
                onChange={e => setNroInterest(Number(e.target.value))}
                placeholder="e.g. 50000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-navy-900" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-1">Capital Gains from Property/Stocks (₹)</label>
              <input type="number" value={capitalGains || ''}
                onChange={e => setCapitalGains(Number(e.target.value))}
                placeholder="e.g. 1000000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-400 text-navy-900" />
              {capitalGains > 0 && (
                <div className="flex gap-2 mt-2">
                  <button onClick={() => setGainsType('stcg')}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors ${gainsType === 'stcg' ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-gray-600 border-gray-200'}`}>
                    Short-term (STCG) 15%
                  </button>
                  <button onClick={() => setGainsType('ltcg')}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors ${gainsType === 'ltcg' ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-gray-600 border-gray-200'}`}>
                    Long-term (LTCG) 10%
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="bg-navy-900 rounded-2xl p-6 text-white">
              <h3 className="font-display text-xl font-semibold mb-4">Tax Summary</h3>
              {[
                ['Gross Rental Income', fmt(rentalIncome)],
                ['Less: Municipal Tax + 30% Std Deduction + Loan Interest', `-${fmt(municipalTax + stdDeduction + homeLoanInterest)}`],
                ['Taxable Rental Income', fmt(taxableRental)],
                ['NRO Interest (taxable at 30%)', fmt(nroInterest)],
                ['Capital Gains Tax', fmt(taxOnGains)],
                ['Total Income Tax', fmt(totalTax)],
                ['Education Cess (4%)', fmt(cess)],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-sm py-1.5 border-b border-navy-800">
                  <span className="text-navy-300">{label}</span>
                  <span className="text-white font-medium">{val}</span>
                </div>
              ))}
              <div className="flex justify-between mt-3 pt-3 border-t border-gold-500/30">
                <span className="text-gold-300 font-semibold">Total Tax Payable</span>
                <span className="text-gold-400 font-bold text-xl">{fmt(grandTotal)}</span>
              </div>
            </div>

            <div className={`rounded-2xl p-5 text-center border ${refundOrPayable > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="text-sm font-medium text-gray-600 mb-1">
                {refundOrPayable > 0 ? 'Estimated TDS Refund' : 'Additional Tax to Pay'}
              </div>
              <div className={`font-display text-3xl font-bold ${refundOrPayable > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {fmt(refundOrPayable)}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {refundOrPayable > 0
                  ? 'File ITR to claim this refund!'
                  : 'Pay advance tax by March 15 to avoid interest'}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-800 space-y-1">
              <div className="font-semibold mb-1">Tax Saving Opportunities:</div>
              <div>✓ Claim DTAA benefit to reduce TDS on NRO interest (to 10–15%)</div>
              <div>✓ Section 54: Reinvest property gains to save capital gains tax</div>
              <div>✓ File ITR to claim excess TDS deducted as refund</div>
            </div>

            <Link href="/articles/nri-itr-filing-guide"
              className="block bg-white border border-gray-100 rounded-2xl p-4 text-sm text-navy-700 hover:shadow-md transition-all text-center font-medium">
              📖 How to File NRI ITR — Step-by-Step Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
