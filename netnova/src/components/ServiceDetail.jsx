import { useParams, Link, Navigate } from 'react-router-dom'
import { services } from '../data/servicesData'
import Navbar from './Navbar'
import Footer from './Footer'
import Reveal from './Reveal'

function ServiceIcon({ path, size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      style={{ color: '#a78bfa' }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find(s => s.slug === slug)

  if (!service) return <Navigate to="/" replace />

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-1)' }}>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-20 px-6 text-center relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139,92,246,0.14) 0%, transparent 70%), var(--bg)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8"
              style={{
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid var(--border-hi)',
                boxShadow: '0 0 40px rgba(124,58,237,0.12)',
              }}
            >
              <ServiceIcon path={service.iconPath} size={36} />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="badge inline-flex text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              Service
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="font-display font-bold mb-4"
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.15 }}
            >
              {service.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg mb-8" style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
              {service.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 font-semibold py-4 px-8 rounded-xl text-sm text-white"
              style={{
                background: 'linear-gradient(135deg,#7C3AED,#3B82F6)',
                boxShadow: '0 4px 24px rgba(124,58,237,0.35)',
              }}
            >
              Get Started →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-2)', lineHeight: 1.85 }}>
              {service.overview}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-12">
            <span className="badge inline-flex text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              What We Deliver
            </span>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', letterSpacing: '-0.03em' }}
            >
              Capabilities
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.capabilities.map((cap, i) => (
              <Reveal key={cap} delay={(i % 2) * 0.05}>
                <div
                  className="flex items-start gap-4 p-5 rounded-xl"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(124,58,237,0.15)' }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="#a78bfa" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{cap}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-12">
            <span className="badge inline-flex text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              How We Work
            </span>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', letterSpacing: '-0.03em' }}
            >
              Our Process
            </h2>
          </Reveal>

          <div className="space-y-6">
            {service.process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.06}>
                <div
                  className="flex gap-6 p-6 rounded-2xl"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="font-display font-bold text-2xl flex-shrink-0 w-14 text-center leading-none pt-0.5"
                    style={{
                      background: 'linear-gradient(135deg,#7C3AED,#3B82F6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {step.step}
                  </div>
                  <div>
                    <div className="font-semibold mb-1.5 text-base">{step.title}</div>
                    <div className="text-sm" style={{ color: 'var(--text-3)', lineHeight: 1.75 }}>{step.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-section)' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-12">
            <span className="badge inline-flex text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Who It's For
            </span>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', letterSpacing: '-0.03em' }}
            >
              Common Use Cases
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.useCases.map((uc, i) => (
              <Reveal key={uc} delay={(i % 2) * 0.05}>
                <div
                  className="flex items-center gap-4 p-5 rounded-xl"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#7C3AED,#3B82F6)' }}
                  />
                  <span className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{uc}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h2
              className="font-display font-bold mb-4"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', letterSpacing: '-0.03em' }}
            >
              Ready to get started with{' '}
              <span className="text-gradient">{service.title}</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mb-8 text-sm" style={{ color: 'var(--text-3)', lineHeight: 1.75 }}>
              Tell us about your project and we'll get back to you within one business day.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-2 font-semibold py-4 px-8 rounded-xl text-sm text-white"
                style={{
                  background: 'linear-gradient(135deg,#7C3AED,#3B82F6)',
                  boxShadow: '0 4px 24px rgba(124,58,237,0.35)',
                }}
              >
                Contact Us →
              </Link>
              <Link
                to="/#services"
                className="inline-flex items-center justify-center gap-2 font-semibold py-4 px-8 rounded-xl text-sm"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-hi)',
                  color: 'var(--text-2)',
                }}
              >
                View All Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
