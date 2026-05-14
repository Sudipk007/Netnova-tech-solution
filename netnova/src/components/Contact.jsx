import { useState } from 'react'
import Reveal from './Reveal'

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

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.target
    const body = {
      name:    form.name.value.trim(),
      email:   form.email.value.trim(),
      company: form.company.value.trim(),
      message: form.message.value.trim(),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <section
      id="contact"
      className="py-28 px-6"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139,92,246,0.08) 0%, transparent 70%), var(--bg)' }}
    >
      <div className="max-w-2xl mx-auto text-center">

        <Reveal>
          <span className="badge inline-flex text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">Get In Touch</span>
          <h2 className="font-display font-bold mb-5" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-0.03em' }}>
            Ready to <span className="text-gradient">Launch?</span>
          </h2>
          <p className="text-base mb-10" style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
            Tell us about your project. Our team will reach out within 24 hours to explore how NetNova can help you build the future.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field type="text"  name="name"    placeholder="Your Name"   required />
              <Field type="email" name="email"   placeholder="Work Email"  required />
            </div>
            <Field type="text"    name="company" placeholder="Company (optional)" />
            <Field as="textarea"  name="message" rows={4} placeholder="Tell us about your project..." required />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full text-white font-semibold py-4 rounded-xl text-base"
              style={{ opacity: status === 'loading' ? 0.7 : 1 }}
            >
              {status === 'loading' ? 'Sending…' : 'Send Message →'}
            </button>

            {status === 'success' && (
              <p className="text-sm text-center" style={{ color: '#a78bfa' }}>
                ✓ Message sent! We'll be in touch within 24 hours.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-center" style={{ color: '#f87171' }}>
                ⚠️ {errorMsg}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
