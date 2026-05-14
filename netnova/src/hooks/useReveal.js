import { useEffect, useRef } from 'react'

export default function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.12 },
    )
    io.observe(el)

    const t = setTimeout(() => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible')
    }, 50)

    return () => { io.disconnect(); clearTimeout(t) }
  }, [])

  return ref
}
