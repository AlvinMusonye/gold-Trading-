import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '../content'
import { ArrowIcon, LogoMark } from './Icons'

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  const progressRef = useRef(null)

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      }
    }
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      updateProgress()
    }
    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid
          ? 'bg-ivory/85 shadow-[0_1px_0_rgba(28,25,19,0.06),0_12px_30px_-22px_rgba(28,25,19,0.3)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
          scrolled ? 'py-3' : 'py-5 sm:py-6'
        }`}
      >
        <a href="#top" className="flex items-center gap-3" aria-label="Raw Gold Refiners home">
          <LogoMark className="h-11 w-11 sm:h-12 sm:w-12" />
          <span className="leading-none">
            <span className="block font-display text-xl font-semibold tracking-[0.2em] text-ink sm:text-[1.4rem]">
              RAW GOLD
            </span>
            <span className="mt-1 block text-[0.58rem] font-bold tracking-[0.62em] text-gold-700">REFINERS</span>
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-[0.82rem] font-medium tracking-wide text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-dark btn-sm hidden md:inline-flex">
          Book a consultation
          <ArrowIcon className="h-4 w-4" />
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`h-px w-6 bg-ink transition-all duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-ink transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-6 bg-ink transition-all duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-ink/5 px-5 pt-3 pb-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/5 py-3 font-display text-2xl text-ink"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-gold mt-5">
            Book a consultation
            <ArrowIcon className="h-4 w-4" />
          </a>
        </nav>
      </div>

      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-linear-to-r from-gold-300 via-gold-500 to-gold-300"
        style={{ transform: 'scaleX(0)' }}
      />
    </header>
  )
}

export default Header
