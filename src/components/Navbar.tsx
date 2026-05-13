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
          <img src="/logo.png" alt="Dr. Çiğdem Dürüst Logo" style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(142, 68, 173, 0.2)' }} />
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
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menüyü aç"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/iletisim"
          className="nav-cta"
          onClick={() => setMobileOpen(false)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          Randevu Al
        </Link>
      </div>
    </>
  )
}
