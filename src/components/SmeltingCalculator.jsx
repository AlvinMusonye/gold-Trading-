import { useState } from 'react'
import { WHATSAPP_URL } from '../content'
import { ArrowIcon, CheckIcon } from './Icons'
import Reveal from './Reveal'

const CARAT_OPTIONS = [
  { value: 24, label: '24K', purity: 0.999 },
  { value: 22, label: '22K', purity: 0.916 },
  { value: 18, label: '18K', purity: 0.75 },
  { value: 14, label: '14K', purity: 0.585 },
]

const WEIGHT_UNITS = [
  { value: 'kg', label: 'kg' },
  { value: 'g', label: 'g' },
]

const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'KES', symbol: 'KSh', rate: 130 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
]

// Smelting rate: $100 USD per kg of raw gold
const SMELT_RATE_USD_PER_KG = 100

const formatMoney = (amount) =>
  amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const SMELT_TYPES = ['Gold nuggets to gold bars', 'Gold Bars to Refined Gold Bars']

const SMELT_STEPS = [
  'Deliver your gold to our facility for assaying.',
  'We melt, refine, and cast to your specification.',
  'Receive your refined gold with a purity certificate.',
]

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
  const smeltCost = formatMoney(smeltCostUSD * selectedCurrency.rate)

  const hasInput = weightNum > 0

  const breakdown = [
    {
      label: 'Total gold weight',
      value: weightGrams >= 1000 ? `${weightKg.toFixed(3)} kg` : `${weightGrams.toFixed(1)} g`,
    },
    {
      label: 'Pure gold content',
      value: pureWeightKg >= 1 ? `${pureWeightKg.toFixed(3)} kg` : `${pureWeightGrams.toFixed(2)} g`,
    },
    {
      label: 'Rate',
      value: `${selectedCurrency.symbol} ${formatMoney(SMELT_RATE_USD_PER_KG * selectedCurrency.rate)} / kg`,
    },
  ]

  return (
    <section id="smelting" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <Reveal>
          <p className="eyebrow">Smelting services</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Gold Smelting <span className="text-gold-gradient italic">&amp; Refining</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="max-w-md text-base leading-8 text-ink-soft lg:ml-auto">
            Professional smelting services for gold of all purities. Use our calculator below to estimate your smelting
            costs, then book a session with our metallurgy team.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Calculator */}
        <Reveal variant="left" className="h-full">
          <div className="card-lux h-full p-6 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-3xl text-ink sm:text-4xl">Smelting Cost Calculator</h3>
              <span className="hidden shrink-0 rounded-full bg-gold-50 px-3.5 py-1.5 text-xs font-bold text-gold-700 ring-1 ring-gold-200 sm:inline-flex">
                $100 / kg
              </span>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="space-y-7">
                <div>
                  <span className="field-label">Gold carat</span>
                  <div className="grid grid-cols-4 gap-2">
                    {CARAT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setCarat(option.value)}
                        aria-pressed={carat === option.value}
                        className={`rounded-xl border px-1 py-3 text-sm font-bold transition-all duration-300 ${
                          carat === option.value
                            ? 'border-gold-400 bg-gold-50 text-ink shadow-[0_0_0_3px_rgba(201,162,74,0.18)]'
                            : 'border-sand bg-ivory text-ink-soft hover:border-gold-300'
                        }`}
                      >
                        {option.label}
                        <span className="mt-0.5 block text-[0.65rem] font-medium text-ink-mute">
                          {(option.purity * 100).toFixed(1)}%
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="weight" className="field-label">Weight</label>
                  <div className="flex gap-2">
                    <input
                      id="weight"
                      type="number"
                      min="0"
                      step={weightUnit === 'kg' ? '0.001' : '0.1'}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={weightUnit === 'kg' ? 'e.g. 10' : 'e.g. 500'}
                      className="field flex-1"
                    />
                    <div className="flex rounded-[0.9rem] border border-sand bg-ivory p-1">
                      {WEIGHT_UNITS.map((u) => (
                        <button
                          key={u.value}
                          type="button"
                          onClick={() => setWeightUnit(u.value)}
                          aria-pressed={weightUnit === u.value}
                          className={`rounded-[0.65rem] px-3.5 text-sm font-semibold transition-all duration-300 ${
                            weightUnit === u.value ? 'bg-white text-ink shadow-sm' : 'text-ink-mute hover:text-ink'
                          }`}
                        >
                          {u.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="currency" className="field-label">Currency</label>
                  <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="field">
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.symbol} {c.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results */}
              <div className="relative flex flex-col overflow-hidden rounded-2xl bg-linear-to-br from-gold-50 via-cream to-gold-100 p-6 ring-1 ring-gold-200/70 sm:p-7">
                <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-white/70 blur-2xl" />
                <p className="relative text-[0.66rem] font-bold tracking-[0.26em] text-gold-700 uppercase">Estimate breakdown</p>
                <p className="relative mt-6 text-xs tracking-[0.14em] text-ink-mute uppercase">Total smelting cost</p>
                <p className="relative mt-1 font-display text-5xl leading-tight tabular-nums">
                  <span key={`${smeltCost}-${currency}`} className="tick text-gold-deep">
                    {selectedCurrency.symbol} {hasInput ? smeltCost : '0.00'}
                  </span>
                </p>

                <dl className="relative mt-6 space-y-3 border-t border-gold-300/50 pt-5 text-sm">
                  {breakdown.map((row) => (
                    <div key={row.label} className="flex justify-between gap-4">
                      <dt className="text-ink-soft">{row.label}</dt>
                      <dd className="font-semibold text-ink tabular-nums">{hasInput ? row.value : '—'}</dd>
                    </div>
                  ))}
                </dl>

                {!hasInput && (
                  <p className="relative mt-auto pt-6 text-xs text-ink-mute">Enter a weight to see your estimate.</p>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Info panel */}
        <Reveal variant="right" delay={120} className="h-full">
          <div className="flex h-full flex-col gap-5">
            <div className="card-lux p-7 sm:p-8">
              <h3 className="font-display text-2xl text-ink">What we smelt</h3>
              <ul className="mt-5 space-y-3.5 text-sm text-ink-soft">
                {SMELT_TYPES.map((type) => (
                  <li key={type} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold-200">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {type}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-lux flex-1 p-7 sm:p-8">
              <h3 className="font-display text-2xl text-ink">How it works</h3>
              <ol className="mt-5 space-y-4 text-sm text-ink-soft">
                {SMELT_STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-300 font-display text-sm text-gold-700">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold w-full">
              Book smelting via WhatsApp
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default SmeltingCalculator
