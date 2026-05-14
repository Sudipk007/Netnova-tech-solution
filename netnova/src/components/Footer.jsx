export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-3">
            <img src="/brand_assest/image.png" alt="NetNova" className="h-7 w-auto" />
            <span className="text-xs" style={{ color: 'var(--text-4)' }}>Innovating The Future</span>
          </div>

          <div className="flex gap-8">
            {['/#services', '/#about', '/#contact'].map((href, i) => (
              <a key={href} href={href} className="nav-link text-xs">
                {['Services', 'About', 'Contact'][i]}
              </a>
            ))}
          </div>

          <p className="text-xs" style={{ color: 'var(--text-5)' }}>© 2026 NetNova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
