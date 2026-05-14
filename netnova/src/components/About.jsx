import Reveal from './Reveal'

const highlights = [
  { title: 'Elite Team',   sub: 'Ex-FAANG engineers and security experts' },
  { title: 'Global Reach', sub: 'Clients across 30+ countries' },
  { title: 'Open Source',  sub: 'Contributors to core infra projects' },
  { title: '24/7 Support', sub: 'Dedicated SRE on-call for all clients' },
]

export default function About() {
  return (
    <section id="about" className="section-glow-right py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Orbital logo */}
        <div className="reveal flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="relative" style={{ width: 340, height: 340 }}>
            <div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(139,92,246,0.25)', animation: 'spin 20s linear infinite', transformOrigin: 'center' }} />
            <div className="absolute rounded-full" style={{ inset: 40, border: '1px solid rgba(96,165,250,0.2)', animation: 'spin 14s linear infinite reverse', transformOrigin: 'center' }} />
            <div
              className="absolute rounded-full flex items-center justify-center"
              style={{
                inset: 80,
                background: 'radial-gradient(circle at 40% 35%, rgba(139,92,246,0.1), rgba(96,165,250,0.06))',
                border: '1px solid rgba(139,92,246,0.25)',
                boxShadow: '0 4px 24px rgba(139,92,246,0.15), 0 0 40px rgba(139,92,246,0.08)',
              }}
            >
              <img src="/brand_assest/image.png" alt="NetNova" className="w-32 h-auto" style={{ filter: 'drop-shadow(0 0 12px rgba(139,92,246,0.4))' }} />
            </div>
            <div className="absolute w-3 h-3 rounded-full" style={{ background: '#8B5CF6', boxShadow: '0 0 10px #8B5CF6, 0 0 20px rgba(139,92,246,0.5)', top: 12, left: '50%', transform: 'translateX(-50%)' }} />
            <div className="absolute w-2 h-2 rounded-full" style={{ background: '#60A5FA', boxShadow: '0 0 8px #60A5FA', bottom: 52, right: 28 }} />
            <div className="absolute w-2 h-2 rounded-full" style={{ background: '#a78bfa', boxShadow: '0 0 8px #a78bfa', top: 60, left: 20 }} />
          </div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="badge inline-flex text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">Our Mission</span>
            <h2 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              We don't just build software.<br />
              <span className="text-gradient">We build what's next.</span>
            </h2>
            <p className="text-base mb-5" style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
              Founded on the belief that technology should be a force multiplier for every business, NetNova combines deep engineering expertise with strategic vision to deliver solutions that are not just functional — they're future-proof.
            </p>
            <p className="text-base mb-8" style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
              Our multidisciplinary team operates at the intersection of cloud, AI, and security — giving clients a single, trusted partner for their entire digital ecosystem.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map(h => (
                <div key={h.title} className="card rounded-xl p-5">
                  <div className="text-2xl font-display font-bold text-gradient mb-1">{h.title}</div>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>{h.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
