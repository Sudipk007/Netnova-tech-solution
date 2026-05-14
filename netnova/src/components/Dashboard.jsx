import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('nn_user')
    if (!stored) { navigate('/auth'); return }
    setUser(JSON.parse(stored))
  }, [navigate])

  function logout() {
    localStorage.removeItem('nn_token')
    localStorage.removeItem('nn_user')
    navigate('/')
  }

  if (!user) return null

  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')

  return (
    <div
      className="min-h-screen px-6 py-16"
      style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.1) 0%, transparent 65%), #080C1A' }}
    >
      {/* Top bar */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-16">
        <a href="/">
          <img src="/brand_assest/image.png" alt="NetNova" className="h-8 w-auto" />
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full"
          style={{
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.25)',
            color: 'rgba(255,255,255,0.7)',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,92,246,0.2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(139,92,246,0.1)')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
          </svg>
          Sign Out
        </button>
      </div>

      <div className="max-w-5xl mx-auto">

        {/* Welcome */}
        <div className="mb-12">
          <div className="flex items-center gap-5 mb-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#7C3AED,#3B82F6)', boxShadow: '0 0 24px rgba(124,58,237,0.4)' }}
            >
              {initials}
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Welcome back</p>
              <h1 className="font-display font-bold text-3xl" style={{ letterSpacing: '-0.03em' }}>
                {user.name}
              </h1>
            </div>
          </div>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>{user.email}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { label: 'Account Status', value: 'Active', sub: 'Member in good standing', icon: '✓', color: '#34d399' },
            { label: 'Member Since', value: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), sub: 'NetNova community', icon: '📅', color: '#a78bfa' },
            { label: 'Support', value: '24 / 7', sub: 'Priority access', icon: '⚡', color: '#60a5fa' },
          ].map(card => (
            <div
              key={card.label}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(13,18,40,0.9)',
                border: '1px solid rgba(139,92,246,0.12)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>{card.label}</span>
                <span>{card.icon}</span>
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: card.color, letterSpacing: '-0.02em' }}>{card.value}</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(13,18,40,0.9)',
            border: '1px solid rgba(139,92,246,0.12)',
          }}
        >
          <h2 className="font-display font-semibold text-lg mb-6" style={{ letterSpacing: '-0.02em' }}>Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Explore Services', href: '/#services', desc: 'See what NetNova can build for you' },
              { label: 'Contact the Team', href: '/#contact', desc: 'Start a project conversation' },
              { label: 'Read Client Stories', href: '/#testimonials', desc: 'See what others have built' },
              { label: 'About NetNova', href: '/#about', desc: 'Learn who we are' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center justify-between p-4 rounded-xl group"
                style={{
                  background: 'rgba(139,92,246,0.06)',
                  border: '1px solid rgba(139,92,246,0.12)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,92,246,0.12)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(139,92,246,0.06)')}
              >
                <div>
                  <div className="text-sm font-semibold mb-0.5">{link.label}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{link.desc}</div>
                </div>
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#a78bfa' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
