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
        {/* Sol taraftaki sayfa isimleri ve Randevu butonu */}
        <div className="navbar-links desktop-only" style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/iletisim"
            className={`nav-cta${pathname === '/iletisim' ? ' nav-cta-active' : ''}`}
            style={{ marginLeft: '1rem' }}
          >
            Randevu Al
          </Link>
        </div>

        {/* Ortadaki logo (logoisimli.png ve daha büyük) */}
        <Link href="/" aria-label="Ana Sayfa" style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cigdemWebsite/logoisimli.png"
            alt="Dr. Çiğdem Dürüst"
            style={{ height: '75px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </Link>

        {/* Sağ taraftaki sosyal ikonlar */}
        <div className="navbar-actions desktop-only" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.2rem' }}>
          <a href="https://www.facebook.com/DurustCigdem?locale=tr_TR" target="_blank" rel="noreferrer" aria-label="Facebook" className="nav-social">
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/cigdem_durust/" target="_blank" rel="noreferrer" aria-label="Instagram" className="nav-social">
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://cy.linkedin.com/in/çiğdem-dürüst-510820139" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="nav-social">
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://wa.me/905338616699" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="nav-social">
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M11.966 0C5.358 0 0 5.356 0 11.967c0 2.651.848 5.11 2.32 7.153L.68 24l5.06-1.637c1.986 1.282 4.331 2.035 6.837 2.035 6.611 0 11.97-5.362 11.97-11.974S19.186 0 11.966 0zm0 22.203c-2.155 0-4.148-.679-5.782-1.831l-.415-.292-3.238 1.047 1.066-3.15-.32-.511C2.08 15.932 1.391 14.025 1.391 11.967c0-5.836 4.747-10.583 10.575-10.583 5.832 0 10.579 4.747 10.579 10.583s-4.747 10.583-10.579 10.583zM17.78 15.54c-.318-.159-1.884-.929-2.176-1.035-.292-.106-.505-.159-.718.159-.212.318-.823 1.035-1.008 1.246-.186.212-.371.238-.689.079-2.128-1.06-3.714-2.83-4.168-3.606-.053-.092-.008-.146.035-.192.316-.339.638-.853.797-1.171.053-.106.027-.199-.013-.278-.04-.079-.718-1.73-.984-2.37-.26-.622-.524-.538-.718-.547-.186-.008-.398-.01-.611-.01-.212 0-.557.079-.849.398-.292.318-1.115 1.088-1.115 2.651 0 1.564 1.141 3.076 1.3 3.288.159.212 2.241 3.42 5.428 4.795 2.14.925 2.923.993 3.843.836.92-.157 2.176-.889 2.482-1.751.305-.862.305-1.599.212-1.751-.093-.153-.345-.246-.663-.405z"/></svg>
          </a>
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
        <div style={{
          width: '48px', height: '3px', borderRadius: '2px',
          background: 'linear-gradient(to right, var(--primary-light), var(--primary))',
          marginBottom: '2rem'
        }} />

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
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }}>
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          Randevu Al
        </Link>

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
