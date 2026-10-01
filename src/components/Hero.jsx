import { Fragment } from 'react'
import { METRICS } from '../content'
import CountUp from './CountUp'
import HeroImage from './HeroImage'
import { ArrowIcon } from './Icons'

const HEADLINE = [
  { text: 'Professional' },
  { text: 'Gold', gold: true },
  { text: 'Refining', gold: true },
  { text: '&' },
  { text: 'Investor' },
  { text: 'Consultancy.' },
]

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <p className="eyebrow fade-up" style={{ '--d': '100ms' }}>
            Large-scale gold refining &amp; trade
          </p>

          <h1 className="mt-7 font-display text-[2.9rem] leading-[1.02] font-medium tracking-[-0.01em] text-ink sm:text-6xl lg:text-[5.1rem]">
            {HEADLINE.map((word, i) => (
              <Fragment key={word.text}>
                <span className="word">
                  <span style={{ '--d': `${220 + i * 90}ms` }}>
                    <span className={word.gold ? 'text-gold-gradient italic' : ''}>{word.text}</span>
                  </span>
                </span>{' '}
              </Fragment>
            ))}
          </h1>

          <p className="fade-up mt-8 max-w-xl text-base leading-8 text-ink-soft sm:text-lg" style={{ '--d': '850ms' }}>
            We are a refinery and advisory partner for investors, miners, and traders. We specialize in gold refining,
            smelting, testing, and strategic guidance—without selling raw gold directly.
          </p>

          <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ '--d': '1000ms' }}>
            <a href="#contact" className="btn btn-gold">
              Schedule a consultation
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn btn-outline">
              Request a callback
            </a>
          </div>

          <dl className="fade-up mt-14 grid max-w-lg grid-cols-3 border-t border-ink/10 pt-8" style={{ '--d': '1150ms' }}>
            {METRICS.map((metric, i) => (
              <div key={metric.label} className={`flex flex-col-reverse ${i > 0 ? 'border-l border-ink/10 pl-4 sm:pl-6' : ''}`}>
                <dt className="mt-2 text-[0.65rem] font-semibold tracking-[0.14em] text-ink-mute uppercase sm:text-xs">
                  {metric.label}
                </dt>
                <dd className="font-display text-3xl text-ink sm:text-4xl">
                  <CountUp {...metric} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="fade-up" style={{ '--d': '450ms' }}>
          <HeroImage />
        </div>
      </div>
    </section>
  )
}

export default Hero
