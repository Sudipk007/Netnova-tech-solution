import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const inputStyle = {
  background: 'var(--bg-input)',
  border: '1px solid var(--border)',
  color: 'var(--text-1)',
  caretColor: '#8B5CF6',
}
const focusStyle = { borderColor: 'rgba(139,92,246,0.55)', boxShadow: '0 0 0 3px rgba(139,92,246,0.1)' }
const blurStyle  = { borderColor: 'var(--border)', boxShadow: 'none' }

function Field({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-3)' }}>{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none placeholder:opacity-30"
        style={inputStyle}
        onFocus={e => Object.assign(e.target.style, focusStyle)}
        onBlur={e => Object.assign(e.target.style, blurStyle)}
      />
    </div>
  )
}

export default function AuthPage() {
  const [tab, setTab] = useState('login')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.target
    const isRegister = tab === 'register'

    const body = isRegister
      ? { name: form.name.value.trim(), email: form.email.value.trim(), password: form.password.value }
      : { email: form.email.value.trim(), password: form.password.value }

    try {
      const res = await fetch(`/api/auth/${isRegister ? 'register' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')

      localStorage.setItem('nn_token', data.token)
      localStorage.setItem('nn_user', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  function switchTab(t) {
    setTab(t)
    setStatus('idle')
    setErrorMsg('')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%), var(--bg)' }}
    >
      {/* Back link */}
      <a href="/" className="nav-back-link fixed top-6 left-6 flex items-center gap-2 text-sm font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </a>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/">
            <img src="/brand_assest/image.png" alt="NetNova" className="h-10 w-auto mx-auto mb-6" />
          </a>
          <h1 className="font-display font-bold text-2xl mb-2" style={{ letterSpacing: '-0.03em' }}>
            {tab === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-3)' }}>
            {tab === 'login' ? 'Sign in to your NetNova account' : 'Join NetNova and start building'}
          </p>
        </div>

        {/* Tab switcher */}
        <div
          className="flex rounded-xl p-1 mb-8"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
        >
          {['login', 'register'].map(t => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize"
              style={{
                background: tab === t ? 'linear-gradient(135deg,#7C3AED,#3B82F6)' : 'transparent',
                color: tab === t ? '#fff' : 'var(--text-3)',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              {t === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'var(--bg-panel)',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(139,92,246,0.05)',
          }}
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            {tab === 'register' && (
              <Field label="Full Name" type="text" name="name" placeholder="Alex Kim" required />
            )}
            <Field label="Email Address" type="email" name="email" placeholder="you@company.com" required />
            <Field label="Password" type="password" name="password" placeholder="••••••••" required minLength={8} />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full text-white font-semibold py-3.5 rounded-xl text-sm mt-2"
              style={{
                background: 'linear-gradient(135deg,#7C3AED,#3B82F6)',
                opacity: status === 'loading' ? 0.7 : 1,
                boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
              }}
            >
              {status === 'loading'
                ? 'Please wait…'
                : tab === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>

            {status === 'error' && (
              <p className="text-sm text-center" style={{ color: '#f87171' }}>⚠️ {errorMsg}</p>
            )}
          </form>
        </div>

        {/* Footer switch */}
        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-4)' }}>
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => switchTab(tab === 'login' ? 'register' : 'login')}
            className="font-semibold"
            style={{ color: '#a78bfa' }}
          >
            {tab === 'login' ? 'Register' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  )
}
