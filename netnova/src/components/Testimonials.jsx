import { useState, useEffect } from 'react'
import Reveal from './Reveal'

const SEED = [
  {
    quote: '"NetNova reduced our infrastructure costs by 40% and cut deployment time in half. Their cloud team is world-class."',
    name: 'Alex Kim',
    role: 'CTO, Orion Dynamics',
    initials: 'AK',
  },
  {
    quote: '"The AI pipeline they built processes 10M records daily with zero issues. Exceptional engineering, exceptional team."',
    name: 'Sofia Rivera',
    role: 'Head of Data, PulseAnalytics',
    initials: 'SR',
  },
  {
    quote: '"Security audit and SOC2 certification completed in 8 weeks. NetNova delivered what others said would take 6 months."',
    name: 'James Mercer',
    role: 'CEO, VaultFinance',
    initials: 'JM',
  },
]

const inputStyle = {
  background: 'var(--bg-input)',
  border: '1px solid var(--border)',
  color: 'var(--text-1)',
  caretColor: '#8B5CF6',
}
const focusStyle = { borderColor: 'rgba(139,92,246,0.55)', boxShadow: '0 0 0 3px rgba(139,92,246,0.1)' }
const blurStyle  = { borderColor: 'var(--border)', boxShadow: 'none' }

function Field({ as: Tag = 'input', ...props }) {
  return (
    <Tag
      {...props}
      className="w-full px-5 py-3.5 rounded-xl text-sm outline-none resize-none placeholder:opacity-30"
      style={inputStyle}
      onFocus={e => Object.assign(e.target.style, focusStyle)}
      onBlur={e => Object.assign(e.target.style, blurStyle)}
    />
  )
}

function TestimonialCard({ t, index }) {
  return (
    <Reveal delay={index * 0.1}>
      <div className="tcard rounded-2xl p-8 h-full flex flex-col">
        <div className="mb-5" style={{ color: '#a78bfa' }}>★★★★★</div>
        <p className="text-sm italic mb-6 flex-1" style={{ color: 'var(--text-2)', lineHeight: 1.8 }}>
          {t.quote.startsWith('"') ? t.quote : `"${t.quote}"`}
        </p>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#7C3AED,#3B82F6)' }}
          >
            {t.initials}
          </div>
          <div>
            <div className="text-sm font-semibold">{t.name}</div>
            <div className="text-xs" style={{ color: 'var(--text-4)' }}>{t.role}</div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [formStatus, setFormStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const isLoggedIn = !!localStorage.getItem('nn_token')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/testimonials')
        const data = await res.json()
        if (data.length === 0) {
          await Promise.all(
            SEED.map(t =>
              fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: t.name, role: t.role, quote: t.quote }),
              })
            )
          )
          const seeded = await fetch('/api/testimonials').then(r => r.json())
          setTestimonials(seeded)
        } else {
          setTestimonials(data)
        }
      } catch {
        setTestimonials(SEED)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setFormStatus('loading')
    setErrorMsg('')

    const form = e.target
    const body = {
      name:  form.tname.value.trim(),
      role:  form.role.value.trim(),
      quote: form.quote.value.trim(),
    }

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setTestimonials(prev => [data, ...prev])
      setFormStatus('success')
      form.reset()
      setTimeout(() => setFormStatus('idle'), 3000)
    } catch (err) {
      setFormStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <section className="section-glow-center py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <Reveal className="text-center mb-14">
          <span className="badge inline-flex text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">Client Stories</span>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '-0.03em' }}>
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
        </Reveal>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="text-center py-10" style={{ color: 'var(--text-5)' }}>Loading testimonials…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t._id || t.name} t={t} index={i} />
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="my-20 flex items-center gap-6">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-5)' }}>Share Your Experience</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        {/* Add Testimonial Section — visible only when logged in */}
        {isLoggedIn ? (
          <div className="max-w-2xl mx-auto">
            <Reveal className="text-center mb-10">
              <h3 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', letterSpacing: '-0.02em' }}>
                Worked with <span className="text-gradient">NetNova?</span>
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-3)', lineHeight: 1.75 }}>
                We'd love to hear about your experience. Your story helps others discover what we can build together.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="tcard rounded-2xl p-8">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field type="text" name="tname" placeholder="Your Name" required />
                    <Field type="text" name="role"  placeholder="Role, Company" required />
                  </div>
                  <Field
                    as="textarea"
                    name="quote"
                    rows={5}
                    placeholder="Share your experience working with NetNova…"
                    required
                  />
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="btn-primary w-full text-white font-semibold py-4 rounded-xl text-sm"
                    style={{ opacity: formStatus === 'loading' ? 0.7 : 1 }}
                  >
                    {formStatus === 'loading' ? 'Submitting…' : 'Submit Testimonial →'}
                  </button>

                  {formStatus === 'success' && (
                    <p className="text-sm text-center" style={{ color: '#a78bfa' }}>
                      ✓ Thank you! Your testimonial is now live above.
                    </p>
                  )}
                  {formStatus === 'error' && (
                    <p className="text-sm text-center" style={{ color: '#f87171' }}>
                      ⚠️ {errorMsg}
                    </p>
                  )}
                </form>
              </div>
            </Reveal>
          </div>
        ) : (
          <Reveal className="text-center">
            <p className="text-sm mb-5" style={{ color: 'var(--text-3)', lineHeight: 1.75 }}>
              Worked with NetNova?{' '}
              <a href="/auth" className="font-semibold" style={{ color: '#a78bfa' }}>Sign in</a>
              {' '}to share your experience.
            </p>
          </Reveal>
        )}

      </div>
    </section>
  )
}
