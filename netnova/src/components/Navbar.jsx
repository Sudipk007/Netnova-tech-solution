import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { href: '/#services', label: 'Services' },
  { href: '/#about',    label: 'About' },
  { href: '/#stats',    label: 'Impact' },
  { href: '/#contact',  label: 'Contact' },
]

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

function getUser() {
  try { return JSON.parse(localStorage.getItem('nn_user')) } catch { return null }
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const user = getUser()

  function logout() {
    localStorage.removeItem('nn_token')
    localStorage.removeItem('nn_user')
    window.location.href = '/'
  }

  const initials = user
    ? user.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')
    : null

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'var(--bg-nav)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 1px 12px rgba(0,0,0,0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6] focus-visible:rounded-md">
            <img src="/brand_assest/image.png" alt="NetNova" className="h-8 w-auto" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href} className="nav-link text-sm font-medium tracking-wide">
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + Toggle + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="theme-toggle"
              onClick={toggle}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <a
                  href="/dashboard"
                  className="flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm font-semibold"
                  style={{
                    background: 'rgba(139,92,246,0.12)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    color: 'var(--text-1)',
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg,#7C3AED,#3B82F6)' }}
                  >
                    {initials}
                  </span>
                  {user.name.split(' ')[0]}
                </a>
                <button
                  onClick={logout}
                  className="nav-sign-out-btn text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <a href="/auth" className="hidden md:inline-flex btn-primary text-white text-sm font-semibold px-5 py-2 rounded-full">
                Get Started
              </a>
            )}

            <button
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B5CF6]"
              onClick={() => setOpen(o => !o)}
              style={{ color: 'var(--text-1)' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="flex flex-col gap-4 pb-5 pt-2 md:hidden">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="nav-link text-sm font-medium py-1">
                {l.label}
              </a>
            ))}
            {user ? (
              <>
                <a href="/dashboard" onClick={() => setOpen(false)} className="text-sm font-semibold" style={{ color: '#a78bfa' }}>
                  My Dashboard ({user.name.split(' ')[0]})
                </a>
                <button onClick={logout} className="nav-sign-out-btn text-sm font-medium text-left px-0 py-0 border-0 bg-transparent">
                  Sign Out
                </button>
              </>
            ) : (
              <a href="/auth" onClick={() => setOpen(false)} className="btn-primary text-white text-sm font-semibold px-5 py-2 rounded-full w-fit">
                Get Started
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
