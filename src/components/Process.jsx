import { STEPS } from '../content'
import useInView from '../hooks/useInView'
import Reveal from './Reveal'

function Process() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <section id="process" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow eyebrow-center">How it works</p>
        <h2 className="mt-6 font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
          From inquiry to delivery <span className="text-gold-gradient italic">in three steps</span>
        </h2>
      </Reveal>

      <div ref={ref} className={`relative mt-20 grid gap-14 md:grid-cols-3 md:gap-8 ${inView ? 'is-visible' : ''}`}>
        <div aria-hidden="true" className="absolute top-7 right-[16.66%] left-[16.66%] hidden h-px bg-ink/10 md:block">
          <div className="line-draw h-full w-full bg-linear-to-r from-gold-300 via-gold-500 to-gold-300" />
        </div>

        {STEPS.map((step, i) => (
          <div key={step.title} className="step relative text-center" style={{ transitionDelay: `${300 + i * 300}ms` }}>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-300 bg-white font-display text-2xl text-gold-700 shadow-[0_0_0_10px_var(--color-ivory),0_14px_30px_-12px_rgba(179,138,46,0.5)]">
              {i + 1}
            </div>
            <h3 className="mt-8 font-display text-[1.7rem] text-ink">{step.title}</h3>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-ink-soft">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Process
