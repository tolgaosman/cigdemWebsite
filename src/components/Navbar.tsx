'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/hakkimda', label: 'Hakkımda' },
  ]

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <Link href="/" className="navbar-logo" aria-label="Ana Sayfa" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logoisimli.png" alt="Dr. Çiğdem Dürüst Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
        </Link>
        <div className="navbar-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? 'active' : ''}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/iletisim"
            className={`nav-cta${pathname === '/iletisim' ? ' nav-cta-active' : ''}`}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }}>
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Randevu Al
          </Link>
        </div>
        <button
          className={`hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={mobileOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        {/* Brand accent line */}
        <div style={{
          width: '48px', height: '3px', borderRadius: '2px',
          background: 'linear-gradient(to right, var(--primary-light), var(--primary))',
          marginBottom: '2rem'
        }} />

        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname === l.href ? 'active' : ''}
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </Link>
        ))}

        <Link
          href="/iletisim"
          className="nav-cta"
          onClick={() => setMobileOpen(false)}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }}>
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          Randevu Al
        </Link>

        {/* Bottom close hint */}
        <p style={{
          position: 'absolute', bottom: '2rem',
          fontSize: '0.75rem', color: 'var(--text-muted)',
          letterSpacing: '0.1em', textTransform: 'uppercase'
        }}>
          Dr. Çiğdem Dürüst · Psikolojik Danışmanlık
        </p>
      </div>
    </>
  )
}
