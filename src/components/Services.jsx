import { OFFERINGS } from '../content'
import { ArrowIcon } from './Icons'
import Reveal from './Reveal'

function ServiceCard({ item, index }) {
  const Icon = item.icon

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <article onMouseMove={handleMouseMove} className="card-lux spotlight lift group flex h-full flex-col p-7 sm:p-8">
      <div className="relative flex items-start justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-50 text-gold-600 ring-1 ring-gold-200/70 transition-all duration-500 group-hover:bg-gold-300 group-hover:text-ink group-hover:ring-gold-300">
          <Icon className="h-6 w-6" />
        </span>
        <span className="font-display text-4xl text-gold-200 transition-colors duration-500 group-hover:text-gold-400">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <p className="relative mt-8 text-[0.66rem] font-bold tracking-[0.26em] text-gold-700 uppercase">{item.badge}</p>
      <h3 className="relative mt-3 font-display text-[1.75rem] leading-tight text-ink">{item.title}</h3>
      <p className="relative mt-4 flex-1 text-sm leading-7 text-ink-soft">{item.description}</p>
      <a href="#contact" className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink">
        Enquire
        <ArrowIcon className="h-4 w-4 text-gold-600 transition-transform duration-500 group-hover:translate-x-1.5" />
      </a>
    </article>
  )
}

function Services() {
  return (
    <section id="collections" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <Reveal>
          <p className="eyebrow">What we offer</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Gold refining, testing, <span className="text-gold-gradient italic">and investor consultancy</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="max-w-md text-base leading-8 text-ink-soft lg:ml-auto">
            Four disciplines under one roof — from the furnace to the vault — delivered with the precision and discretion
            our clients expect.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {OFFERINGS.map((item, i) => (
          <Reveal key={item.title} delay={i * 120} className="h-full">
            <ServiceCard item={item} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Services
