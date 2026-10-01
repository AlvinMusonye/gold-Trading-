import { useEffect, useState } from 'react'
import useInView from '../hooks/useInView'

function CountUp({ value, decimals = 0, prefix = '', suffix = '', duration = 1800 }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let frame

    const tick = (now) => {
      const t = reduceMotion ? 1 : Math.min((now - start) / duration, 1)
      setDisplay(value * (1 - Math.pow(1 - t, 4)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default CountUp
