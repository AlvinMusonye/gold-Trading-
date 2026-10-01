import { NAV_LINKS, WHATSAPP_URL } from '../content'
import { LogoMark } from './Icons'

function Footer() {
  return (
    <footer className="border-t border-ink/[0.07] bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="#top" className="flex items-center gap-3" aria-label="Raw Gold Refiners home">
            <LogoMark className="h-12 w-12" />
            <span className="leading-none">
              <span className="block font-display text-2xl font-semibold tracking-[0.2em] text-ink">RAW GOLD</span>
              <span className="mt-1 block text-[0.6rem] font-bold tracking-[0.62em] text-gold-700">REFINERS</span>
            </span>
          </a>
          <p className="mt-6 font-display text-2xl text-ink-soft italic">Private wealth, refined.</p>
        </div>

        <div>
          <p className="text-[0.66rem] font-bold tracking-[0.26em] text-gold-700 uppercase">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-ink">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.66rem] font-bold tracking-[0.26em] text-gold-700 uppercase">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            <li>
              <a href="#contact" className="transition-colors hover:text-ink">Book a consultation</a>
            </li>
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-ink-mute sm:flex-row sm:justify-between sm:px-8">
          <p>© 2026 Raw Gold Refiners. All rights reserved.</p>
          <p className="tracking-[0.14em] uppercase">Refining · Testing · Storage · Advisory</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
