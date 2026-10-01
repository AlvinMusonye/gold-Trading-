import heroNugget from '../assets/hero-nugget.jpg'
import FloatingBadge from './FloatingBadge'

function HeroImage() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] px-4 py-6 sm:px-8">
      <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-gold-200/60 blur-3xl" />
      <div
        aria-hidden="true"
        className="frame-in absolute top-12 right-0 bottom-0 left-12 rounded-[2.25rem] border border-gold-300/70 sm:top-14 sm:left-14"
        style={{ '--d': '900ms' }}
      />

      <div
        className="photo-reveal relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink shadow-[0_50px_100px_-40px_rgba(90,66,20,0.6)]"
        style={{ '--d': '350ms' }}
      >
        <img
          src={heroNugget}
          alt="Raw gold nugget resting on dark mineral-rich earth"
          className="ken-burns h-full w-full object-cover object-[47%_50%]"
          fetchPriority="high"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent" />
        <div aria-hidden="true" className="photo-sheen absolute inset-0" />
        <div aria-hidden="true" className="absolute inset-3 rounded-[1.5rem] border border-white/15" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="text-[0.62rem] font-bold tracking-[0.3em] text-gold-200 uppercase">From the earth</p>
          <p className="mt-2 font-display text-2xl leading-tight text-white italic sm:text-3xl">To certified fine gold.</p>
        </div>
      </div>

      <FloatingBadge className="top-[12%] -left-1 sm:-left-4" delay="0s" title="Verified" sub="Purity &amp; weight assayed" />
      <FloatingBadge className="top-[40%] -right-1 sm:-right-4" delay="-2.5s" title="XRF & Fire" sub="Certified assay" />
      <FloatingBadge className="bottom-[22%] -left-1 sm:-left-6" delay="-5s" title="Insured Vaults" sub="Secure bullion storage" />
    </div>
  )
}

export default HeroImage
