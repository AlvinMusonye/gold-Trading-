import { useId } from 'react'
import FloatingBadge from './FloatingBadge'

// Ingot drawn as a front-facing trapezoid: a narrow top face over a wider front face.
const TOP_FACE = '28,0 172,0 186,16 14,16'
const FRONT_FACE = '14,16 186,16 200,62 0,62'
const OUTLINE = '28,0 172,0 186,16 200,62 0,62 14,16'

const BARS = [
  { x: 0, y: 200 },
  { x: 212, y: 200 },
  { x: 106, y: 146 },
]

const STAR = 'M0 -10C1 -3 3 -1 10 0C3 1 1 3 0 10C-1 3 -3 1 -10 0C-3 -1 -1 -3 0 -10Z'

const SPARKLES = [
  { x: 46, y: 128, s: 0.9, d: '0s' },
  { x: 374, y: 104, s: 1.2, d: '1.3s' },
  { x: 318, y: 34, s: 0.7, d: '2.2s' },
  { x: 96, y: 52, s: 0.6, d: '0.7s' },
]

function Ingot({ x, y, ids }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon points={FRONT_FACE} fill={`url(#${ids.front})`} />
      <polygon points={TOP_FACE} fill={`url(#${ids.top})`} />
      <polyline points="14,16 186,16" fill="none" stroke="#fff4d1" strokeOpacity="0.9" strokeWidth="1.2" />
      <polygon points="26,22 174,22 186,56 14,56" fill="none" stroke="#fbe7ad" strokeOpacity="0.35" />
      <text x="100" y="37" textAnchor="middle" fontSize="8.5" letterSpacing="3.5" fill="#6f4f12" fillOpacity="0.55" fontFamily="Manrope, sans-serif" fontWeight="700">
        FINE GOLD
      </text>
      <text x="100" y="50" textAnchor="middle" fontSize="9" letterSpacing="2" fill="#6f4f12" fillOpacity="0.55" fontFamily="Manrope, sans-serif" fontWeight="700">
        999
      </text>
    </g>
  )
}

function GoldBars() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ids = {
    top: `${uid}-top`,
    front: `${uid}-front`,
    sheen: `${uid}-sheen`,
    shadow: `${uid}-shadow`,
    clip: `${uid}-clip`,
  }

  return (
    <svg viewBox="0 0 412 300" className="w-full drop-shadow-[0_30px_40px_rgba(120,85,20,0.22)]" role="img" aria-label="Stacked fine gold bars">
      <defs>
        <linearGradient id={ids.top} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6d8" />
          <stop offset="1" stopColor="#e6c672" />
        </linearGradient>
        <linearGradient id={ids.front} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d488" />
          <stop offset="0.45" stopColor="#c99a3a" />
          <stop offset="1" stopColor="#8f6519" />
        </linearGradient>
        <linearGradient id={ids.sheen} x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={ids.shadow}>
          <stop offset="0" stopColor="#7a5719" stopOpacity="0.35" />
          <stop offset="1" stopColor="#7a5719" stopOpacity="0" />
        </radialGradient>
        <clipPath id={ids.clip}>
          {BARS.map((bar) => (
            <polygon key={`${bar.x}-${bar.y}`} points={OUTLINE} transform={`translate(${bar.x} ${bar.y})`} />
          ))}
        </clipPath>
      </defs>

      <ellipse cx="206" cy="278" rx="210" ry="16" fill={`url(#${ids.shadow})`} />
      {BARS.map((bar) => (
        <Ingot key={`${bar.x}-${bar.y}`} x={bar.x} y={bar.y} ids={ids} />
      ))}
      <g clipPath={`url(#${ids.clip})`}>
        <rect className="bar-sheen" x="-160" y="130" width="110" height="150" fill={`url(#${ids.sheen})`} />
      </g>
      {SPARKLES.map((s) => (
        <g key={`${s.x}-${s.y}`} transform={`translate(${s.x} ${s.y}) scale(${s.s})`}>
          <path className="sparkle" d={STAR} fill="#d4aa55" style={{ animationDelay: s.d }} />
        </g>
      ))}
    </svg>
  )
}

function GoldShowcase() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div aria-hidden="true" className="absolute inset-[14%] rounded-full bg-gold-200/70 blur-3xl" />
      <div aria-hidden="true" className="absolute inset-[3%] rounded-full border border-gold-300/40" />
      <svg aria-hidden="true" className="spin-slow absolute inset-[10%] h-[80%] w-[80%]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="49.5" fill="none" stroke="#c9a24a" strokeOpacity="0.6" strokeWidth="0.3" strokeDasharray="0.6 2.4" />
        <circle cx="50" cy="0.5" r="1.1" fill="#c9a24a" />
      </svg>
      <div aria-hidden="true" className="absolute inset-[20%] rounded-full bg-linear-to-b from-white/80 to-white/20 ring-1 ring-white" />

      <div className="float absolute inset-x-[9%] top-[30%]">
        <GoldBars />
      </div>

      <FloatingBadge className="top-[7%] left-0" delay="0s" title="99.9%" sub="Fine gold purity" />
      <FloatingBadge className="top-[22%] right-0 sm:top-[26%]" delay="-2.5s" title="XRF & Fire" sub="Certified assay" />
      <FloatingBadge className="bottom-[6%] left-[8%]" delay="-5s" title="$100 / kg" sub="Industrial smelting" />
    </div>
  )
}

export default GoldShowcase
