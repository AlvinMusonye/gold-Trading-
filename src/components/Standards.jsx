import { PILLARS } from '../content'
import { ArrowIcon } from './Icons'
import Reveal from './Reveal'

function Standards() {
  return (
    <section className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-cream px-5 py-20 sm:rounded-[2.5rem] sm:px-12 sm:py-28 lg:px-20">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full bg-gold-200/60 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-24 h-[28rem] w-[28rem] rounded-full bg-white/80 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal variant="left">
            <p className="eyebrow">The Raw Gold standard</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-[3.6rem]">
              Every gram verified. <span className="text-gold-gradient italic">Every bar accounted for.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-ink-soft">
              We are a refinery and advisory partner — not a raw gold seller. Our only interest is the integrity of your
              metal, from first assay to final storage.
            </p>
            <a href="#contact" className="btn btn-dark mt-10">
              Speak with an advisor
              <ArrowIcon className="h-4 w-4" />
            </a>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <Reveal key={pillar.title} delay={i * 120} className="h-full">
                  <div className="lift h-full rounded-3xl border border-white bg-white/75 p-7 shadow-[0_20px_50px_-35px_rgba(120,88,25,0.45)] backdrop-blur">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-gold-100 to-gold-300 text-gold-800">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 font-display text-2xl text-ink">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{pillar.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Standards
