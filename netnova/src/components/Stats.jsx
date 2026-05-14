import Reveal from './Reveal'

const stats = [
  { value: '200+',  label: 'Global Clients' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '48h',   label: 'Avg. Deploy Time' },
  { value: '12yr',  label: 'Industry Experience' },
]

export default function Stats() {
  return (
    <section id="stats" className="py-16 px-6" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="stat-num">{s.value}</div>
            <p className="mt-2 text-sm font-medium tracking-wide" style={{ color: 'var(--text-3)' }}>
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
