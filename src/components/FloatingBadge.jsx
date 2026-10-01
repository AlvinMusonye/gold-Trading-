function FloatingBadge({ className, delay, title, sub }) {
  return (
    <div
      className={`float absolute rounded-2xl border border-white bg-white/80 px-4 py-3 shadow-[0_20px_40px_-20px_rgba(120,85,20,0.4)] backdrop-blur-md sm:px-5 sm:py-4 ${className}`}
      style={{ animationDelay: delay, animationDuration: '8s' }}
    >
      <p className="font-display text-lg leading-none text-ink sm:text-2xl">{title}</p>
      <p className="mt-1.5 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-gold-700 sm:text-[0.62rem]">{sub}</p>
    </div>
  )
}

export default FloatingBadge
