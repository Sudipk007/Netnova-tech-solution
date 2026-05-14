import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { services } from '../data/servicesData'

function ServiceCard({ service, delay }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={`/services/${service.slug}`}
        className="block h-full"
        style={{ textDecoration: 'none' }}
      >
        <div
          className="card rounded-2xl p-8 h-full flex flex-col cursor-pointer"
          style={{ transition: 'border-color 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,58,237,0.15)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = ''
            e.currentTarget.style.boxShadow = ''
          }}
        >
          <div className="icon-wrap w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" style={{ color: '#a78bfa' }} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={service.iconPath} />
            </svg>
          </div>
          <h3 className="font-display font-semibold text-lg mb-3 tracking-tight">{service.title}</h3>
          <p className="text-sm flex-1" style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>{service.desc}</p>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#a78bfa' }}>
            Learn more
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export default function Services() {
  return (
    <section id="services" className="section-glow-left py-28 px-6">
      <div className="max-w-7xl mx-auto">

        <Reveal className="text-center mb-16">
          <span className="badge inline-flex text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">What We Do</span>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.03em' }}>
            Full-Spectrum <span className="text-gradient">Tech Solutions</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base" style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
            From infrastructure to intelligence — we engineer the systems that power tomorrow's most ambitious companies.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} delay={(i % 3) * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
