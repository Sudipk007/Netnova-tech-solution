import Reveal from './Reveal'

export default function Hero() {
  return (
    <section className="hero-bg circuit-bg relative min-h-screen flex items-center justify-center overflow-hidden pt-16">

      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative" style={{ width: 600, height: 600 }}>
          <div className="orbit-ring absolute inset-0" style={{ transformOrigin: 'center' }}>
            <div className="orbit-dot" />
          </div>
          <div className="orbit-ring-2 absolute" style={{ inset: 60, transformOrigin: 'center' }}>
            <div className="orbit-dot-2" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center py-24">

        <Reveal>
          <span className="badge inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] inline-block animate-pulse" />
            Next-Generation Technology
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className="font-display font-black leading-tight mb-6"
            style={{ fontSize: 'clamp(2.8rem,7vw,6rem)', letterSpacing: '-0.03em' }}
          >
            Creatinnng<br />
            <span className="text-gradient">The Future</span><br />
            <span style={{ color: 'var(--text-1)' }}>Together</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
            style={{ color: 'var(--text-2)', lineHeight: 1.75 }}
          >
            NetNova builds transformative digital solutions — from intelligent cloud infrastructure to AI-powered products — that help companies scale beyond limits.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" className="btn-primary text-white font-semibold px-8 py-4 rounded-full text-base gap-2">
              Explore Our Work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#contact" className="btn-outline font-semibold px-8 py-4 rounded-full text-base">
              Talk to Us
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-20 flex justify-center">
            <a
              href="#services"
              aria-label="Scroll down"
              className="flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity"
            >
              <span className="text-xs tracking-widest uppercase" style={{ color: '#a78bfa' }}>Scroll</span>
              <svg className="w-4 h-4 animate-bounce" style={{ color: '#a78bfa' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
