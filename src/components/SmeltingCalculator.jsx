import { useState } from 'react'

const CARAT_OPTIONS = [
  { value: 24, label: '24K', purity: 0.999 },
  { value: 22, label: '22K', purity: 0.916 },
  { value: 18, label: '18K', purity: 0.75 },
  { value: 14, label: '14K', purity: 0.585 },
]

const WEIGHT_UNITS = [
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'g', label: 'Grams (g)' },
]

const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'KES', symbol: 'KSh', rate: 130 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
]

// Smelting rate: $100 USD per kg of raw gold
const SMELT_RATE_USD_PER_KG = 100

function SmeltingCalculator() {
  const [carat, setCarat] = useState(24)
  const [weight, setWeight] = useState('')
  const [weightUnit, setWeightUnit] = useState('kg')
  const [currency, setCurrency] = useState('USD')

  const selectedCarat = CARAT_OPTIONS.find((c) => c.value === carat) || CARAT_OPTIONS[0]
  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0]
  const purity = selectedCarat.purity
  const weightNum = parseFloat(weight) || 0

  // Convert input to kg
  const weightKg = weightUnit === 'g' ? weightNum / 1000 : weightNum
  const weightGrams = weightKg * 1000

  // Pure gold content
  const pureWeightGrams = weightGrams * purity
  const pureWeightKg = pureWeightGrams / 1000

  // Smelting cost: $100 USD per kg of raw gold input
  const smeltCostUSD = weightKg * SMELT_RATE_USD_PER_KG
  const smeltCostConverted = (smeltCostUSD * selectedCurrency.rate).toFixed(2)

  const hasInput = weightNum > 0

  return (
    <section id="smelting" className="space-y-6 sm:space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-amber-400 sm:text-sm">Smelting Services</p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Gold Smelting & Refining</h2>
        <p className="mt-3 max-w-2xl text-sm text-stone-300 sm:text-base">
          Professional smelting services for gold of all purities. Use our calculator below to estimate your smelting costs, then book a session with our metallurgy team.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] sm:gap-8">
        {/* Calculator form */}
        <div className="rounded-[1rem] border border-amber-500/20 bg-stone-950/80 p-5 shadow-lg sm:rounded-[1.25rem] sm:p-6">
          <h3 className="mb-5 text-lg font-semibold text-amber-200 sm:mb-6 sm:text-xl">
            Smelting Cost Calculator
          </h3>

          <div className="space-y-4 sm:space-y-5">
            {/* Carat selector */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-300 sm:text-sm">
                Gold Carat
              </label>
              <div className="grid grid-cols-4 gap-2">
                {CARAT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setCarat(option.value)}
                    className={`relative rounded-xl border px-2 py-2 text-xs font-semibold transition sm:px-3 sm:py-2.5 sm:text-sm ${
                      carat === option.value
                        ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                        : 'border-stone-700 bg-stone-900/60 text-stone-400 hover:border-stone-500'
                    }`}
                  >
                    {option.label}
                    <span className="mt-0.5 block text-[10px] font-normal opacity-70 sm:text-xs">
                      {(option.purity * 100).toFixed(1)}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weight unit + input */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-300 sm:text-sm">
                Weight
              </label>
              <div className="flex gap-2">
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                  className="rounded-xl border border-stone-700 bg-black/60 px-3 py-2.5 text-xs outline-none transition focus:border-amber-400 sm:py-3 sm:text-sm"
                >
                  {WEIGHT_UNITS.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
                <input
                  id="weight"
                  type="number"
                  min="0"
                  step={weightUnit === 'kg' ? '0.001' : '0.1'}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={weightUnit === 'kg' ? 'e.g. 10' : 'e.g. 500'}
                  className="flex-1 rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs outline-none transition focus:border-amber-400 sm:py-3 sm:text-sm"
                />
              </div>
            </div>

            {/* Currency selector */}
            <div>
              <label htmlFor="currency" className="mb-1.5 block text-xs font-medium text-stone-300 sm:text-sm">
                Currency
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs outline-none transition focus:border-amber-400 sm:py-3 sm:text-sm"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.symbol} {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="mt-5 rounded-[1rem] border border-amber-500/20 bg-black/50 p-4 sm:mt-6 sm:p-5">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 sm:text-sm">
              Estimate Breakdown
            </h4>

            {hasInput ? (
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-400">Total gold weight</span>
                  <span className="font-medium text-stone-200">
                    {weightGrams >= 1000
                      ? `${weightKg.toFixed(3)} kg`
                      : `${weightGrams.toFixed(1)} g`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Pure gold content</span>
                  <span className="font-medium text-stone-200">
                    {pureWeightKg >= 1
                      ? `${pureWeightKg.toFixed(3)} kg`
                      : `${pureWeightGrams.toFixed(2)} g`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Rate</span>
                  <span className="font-medium text-stone-200">
                    {selectedCurrency.symbol} {(SMELT_RATE_USD_PER_KG * selectedCurrency.rate).toFixed(2)} / kg
                  </span>
                </div>
                <div className="border-t border-stone-700 pt-2 flex justify-between">
                  <span className="font-semibold text-stone-100">Total smelting cost</span>
                  <span className="font-semibold text-amber-300">
                    {selectedCurrency.symbol} {smeltCostConverted}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-500 sm:text-sm">
                Enter a weight to see your estimate.
              </p>
            )}
          </div>
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="rounded-[1rem] border border-stone-800 bg-stone-950/70 p-5 sm:rounded-[1.25rem] sm:p-6">
            <h3 className="text-base font-semibold text-amber-200 sm:text-lg">What we smelt</h3>
            <ul className="mt-4 space-y-3 text-xs text-stone-300 sm:text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                Gold jewellery, scrap, and dental gold
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                Gold concentrates and doré bars
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                Electronic scrap and industrial gold
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                Alluvial and placer gold
              </li>
            </ul>
          </div>

          <div className="rounded-[1rem] border border-stone-800 bg-stone-950/70 p-5 sm:rounded-[1.25rem] sm:p-6">
            <h3 className="text-base font-semibold text-amber-200 sm:text-lg">How it works</h3>
            <ol className="mt-4 space-y-3 text-xs text-stone-300 sm:text-sm">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold text-amber-300">
                  1
                </span>
                Deliver your gold to our facility for assaying.
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold text-amber-300">
                  2
                </span>
                We melt, refine, and cast to your specification.
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold text-amber-300">
                  3
                </span>
                Receive your refined gold with a purity certificate.
              </li>
            </ol>
          </div>

          <a
            href="https://wa.me/+254780396250"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-amber-500 px-5 py-2.5 text-center text-xs font-semibold text-black transition hover:bg-amber-400 sm:px-5 sm:py-3 sm:text-sm"
          >
            Book smelting via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export default SmeltingCalculator
