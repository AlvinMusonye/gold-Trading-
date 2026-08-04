import { useState } from 'react'
import SmeltingCalculator from './components/SmeltingCalculator'

const offerings = [
  {
    title: 'Gold Bars & Bullion',
    description: 'Investment grade gold bars from 10 kg to 50 kg. 99.9% purity, certified and ready for delivery or secure storage.',
    badge: 'For investors',
  },
  {
    title: 'Smelting & Refining',
    description: 'Industrial scale gold smelting at $100/kg. We refine scrap, doré bars, and alluvial gold into certified pure bullion.',
    badge: 'For miners & traders',
  },
  {
    title: 'Gold Export & Trade',
    description: 'Licensed gold export services with full documentation. We handle customs, assaying, and international logistics.',
    badge: 'For global buyers',
  },
]

const steps = [
  'Tell us the quantity and form of gold you need.',
  'Receive pricing and logistics details within 30 minutes.',
  'Confirm your order and schedule delivery or pickup.',
]

const metrics = [
  { label: 'Verified clients', value: '1.2k+' },
  { label: 'Response time', value: '< 30 min' },
  { label: 'Premium access', value: '24/7' },
]

const MIN_QUANTITY_KG = 10

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Buy gold',
    quantity: '',
  })

  const [quantityError, setQuantityError] = useState('')

  const qtyNum = parseFloat(formData.quantity)
  const qtyIsValid = !isNaN(qtyNum) && qtyNum >= MIN_QUANTITY_KG

  const handleQuantityChange = (value) => {
    setFormData({ ...formData, quantity: value })
    const qty = parseFloat(value)
    if (value !== '' && qty < MIN_QUANTITY_KG) {
      setQuantityError(`Minimum order is ${MIN_QUANTITY_KG} kg`)
    } else {
      setQuantityError('')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const qty = parseFloat(formData.quantity)
    if (isNaN(qty) || qty < MIN_QUANTITY_KG) {
      setQuantityError(`Minimum order is ${MIN_QUANTITY_KG} kg`)
      return
    }

    const subject = encodeURIComponent(`Gold inquiry from ${formData.name || 'a new client'}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nInterest: ${formData.interest}\nQuantity: ${formData.quantity} kg\n\nPlease contact me regarding my gold inquiry.`
    )
    const mailtoLink = `mailto:johnrumenya@gmail.com?subject=${subject}&body=${body}`

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Gold%20Consultation&details=${encodeURIComponent(`Private consultation with Raw Gold Refiners for ${formData.name || 'a new client'}. Quantity: ${formData.quantity} kg.`)}`

    window.location.href = mailtoLink
    window.open(calendarUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.2),_transparent_35%),linear-gradient(135deg,_#050505,_#111111)] text-stone-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <a href="#top" className="text-lg font-semibold tracking-[0.35em] text-amber-400 uppercase sm:text-xl">
          Raw Gold Refiners
        </a>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-amber-400 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-amber-400 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-amber-400 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
          <a href="#collections" className="transition hover:text-amber-300">What We Offer</a>
          <a href="#smelting" className="transition hover:text-amber-300">Smelting</a>
          <a href="#process" className="transition hover:text-amber-300">Process</a>
          <a href="#contact" className="transition hover:text-amber-300">Contact</a>
        </nav>
        
        {/* Desktop CTA */}
        <a
          href="tel:+254780396250"
          className="hidden rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-500/20 md:block"
        >
          Call Now
        </a>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="mx-auto max-w-7xl border-b border-amber-500/20 bg-black/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a 
              href="#collections" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-stone-300 transition hover:text-amber-300"
            >
              What We Offer
            </a>
            <a 
              href="#smelting" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-stone-300 transition hover:text-amber-300"
            >
              Smelting
            </a>
            <a 
              href="#process" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-stone-300 transition hover:text-amber-300"
            >
              Process
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-stone-300 transition hover:text-amber-300"
            >
              Contact
            </a>
            <a
              href="tel:+254780396250"
              className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-center text-sm font-medium text-amber-300 transition hover:bg-amber-500/20"
            >
              Call Now
            </a>
          </div>
        </nav>
      )}

      <main id="top" className="mx-auto flex max-w-7xl flex-col gap-12 px-4 pb-12 sm:gap-16 sm:px-6 sm:pb-16 lg:px-8">
        <section className="grid items-center gap-8 rounded-[1.5rem] border border-amber-500/20 bg-black/60 p-6 shadow-[0_0_80px_rgba(212,175,55,0.15)] sm:gap-10 sm:rounded-[2rem] sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400 sm:mb-4 sm:text-sm">
              Large-scale gold refining & trade
            </p>
            <h1 className="max-w-2xl text-2xl font-semibold leading-tight sm:text-4xl lg:text-6xl">
              Premium gold bars, smelting, and export at industry scale.
            </h1>
            <p className="mt-4 max-w-xl text-base text-stone-300 sm:mt-6 sm:text-lg">
              We supply certified gold bullion from 10 kg to 50 kg, refine raw gold at $100/kg, and handle licensed export to global markets.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <a
                href="#contact"
                className="rounded-full bg-amber-500 px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-amber-400 sm:px-6"
              >
                Schedule a consultation
              </a>
              <a
                href="mailto:hello@aurumlegacy.com"
                className="rounded-full border border-amber-500/40 px-5 py-3 text-center text-sm font-semibold text-amber-200 transition hover:border-amber-300 sm:px-6"
              >
                Request a callback
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
              {metrics.map((item) => (
                <div key={item.label} className="rounded-full border border-stone-800 bg-stone-900/80 px-3 py-1.5 text-xs text-stone-200 sm:px-4 sm:py-2 sm:text-sm">
                  <span className="mr-2 font-semibold text-amber-300">{item.value}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-amber-500/20 bg-stone-950/80 p-5 shadow-inner sm:rounded-[1.5rem] sm:p-6">
            <div className="mb-5 rounded-[1rem] border border-amber-500/20 bg-gradient-to-br from-amber-500/15 to-black/40 p-4 sm:mb-6 sm:p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300 sm:text-sm">Private booking</p>
              <h2 className="mt-2 text-xl font-semibold sm:text-2xl">Let us contact you</h2>
              <p className="mt-2 text-xs text-stone-300 sm:text-sm">
                Share your details below, we will reach out by call or email with a calendar invite within 30 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <input
                required
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                className="w-full rounded-xl border border-stone-800 bg-black/70 px-4 py-2.5 text-sm outline-none ring-0 transition focus:border-amber-400 sm:py-3"
                placeholder="Your name"
              />
              <input
                required
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                className="w-full rounded-xl border border-stone-800 bg-black/70 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 sm:py-3"
                placeholder="Phone number"
              />
              <input
                required
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className="w-full rounded-xl border border-stone-800 bg-black/70 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 sm:py-3"
                placeholder="Email address"
              />
              <select
                value={formData.interest}
                onChange={(event) => setFormData({ ...formData, interest: event.target.value })}
                className="w-full rounded-xl border border-stone-800 bg-black/70 px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 sm:py-3"
              >
                <option>Buy gold</option>
                <option>Smelting inquiry</option>
                <option>Private consultation</option>
              </select>
              <div>
                <input
                  required
                  type="number"
                  min={MIN_QUANTITY_KG}
                  step="0.1"
                  value={formData.quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:border-amber-400 sm:py-3 ${
                    quantityError
                      ? 'border-red-500/60 bg-black/70'
                      : 'border-stone-800 bg-black/70'
                  }`}
                  placeholder={`Quantity (kg) — min ${MIN_QUANTITY_KG} kg`}
                />
                {quantityError && (
                  <p className="mt-1 text-xs text-red-400">{quantityError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={!qtyIsValid}
                className={`w-full rounded-full px-5 py-2.5 text-sm font-semibold transition sm:py-3 ${
                  qtyIsValid
                    ? 'bg-amber-500 text-black hover:bg-amber-400'
                    : 'cursor-not-allowed bg-stone-700 text-stone-500'
                }`}
              >
                {qtyIsValid ? 'Book my consultation' : `Minimum ${MIN_QUANTITY_KG} kg required`}
              </button>
            </form>
          </div>
        </section>

        <section id="collections" className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400 sm:text-sm">What we offer</p>
              <h2 className="text-2xl font-semibold sm:text-3xl">Large-scale gold supply, refining, and export</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {offerings.map((item) => (
              <article key={item.title} className="rounded-[1rem] border border-stone-800 bg-stone-950/70 p-5 shadow-lg sm:rounded-[1.25rem] sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 sm:text-sm">{item.badge}</p>
                <h3 className="mt-2 text-lg font-semibold sm:mt-3 sm:text-xl">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-stone-300 sm:mt-3 sm:text-sm sm:leading-7">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <SmeltingCalculator />

        <section id="process" className="grid gap-6 rounded-[1.5rem] border border-amber-500/20 bg-black/65 p-6 lg:grid-cols-[0.8fr_1.2fr] sm:rounded-[2rem] sm:p-8 lg:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-400 sm:text-sm">How it works</p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">From inquiry to delivery in three steps</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex gap-3 rounded-[1rem] border border-stone-800 bg-stone-900/70 p-3 sm:gap-4 sm:p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold text-amber-300 sm:h-9 sm:w-9 sm:text-sm">
                  {index + 1}
                </div>
                <p className="text-xs leading-6 text-stone-300 sm:text-sm sm:leading-7">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-[1.5rem] border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-black/60 p-6 text-center sm:rounded-[2rem] sm:p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-400 sm:text-sm">Ready to begin?</p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl lg:text-4xl">Speak with a gold advisor today.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-stone-300 sm:text-base">
            Choose a direct call or a private consultation slot, and we will send your invitation straight to your calendar.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
            <a href="tel:+254780396250" className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400 sm:px-6 sm:py-3">
              Call now
            </a>
            <a href="mailto:johnrumenya@gmail.com" className="rounded-full border border-amber-500/40 px-5 py-2.5 text-sm font-semibold text-amber-200 transition hover:border-amber-300 sm:px-6 sm:py-3">
              Email us
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-800/80 px-4 py-4 text-center text-xs text-stone-400 sm:px-6 sm:py-6 sm:text-sm">
        © 2026 Raw Gold Refiners. Private wealth, refined.
      </footer>

      {/* ── WhatsApp floating button ── */}
      <a
        href="https://wa.me/+254780396250"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  )
}

export default App
