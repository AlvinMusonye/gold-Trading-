const ITEMS = ['Smelting', 'Refining', 'XRF Assay', 'Fire Assay', 'Vault Storage', 'Investor Advisory', 'Certified Purity']

function Marquee() {
  return (
    <section aria-label="Our disciplines" className="border-y border-ink/[0.06] bg-white/70 py-7">
      <div className="marquee overflow-hidden">
        <div className="marquee-track">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              aria-hidden={i >= ITEMS.length}
              className="flex items-center gap-12 pr-12 font-display text-2xl text-ink-soft italic sm:text-3xl"
            >
              {item}
              <span className="text-sm text-gold-400 not-italic">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Marquee
