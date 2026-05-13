'use client'

export default function AdminPage() {
  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-icon">
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="32" height="32">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h1>Admin Paneli</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '0.5rem' }}>
          Başvurular doğrudan <strong>WhatsApp</strong> üzerinden iletilmektedir.
          <br />
          Yönetim paneli bu sürümde aktif değildir.
        </p>
        <a
          href="https://wa.me/905338616699"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-form-submit"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            padding: '0.85rem 2rem',
            borderRadius: '50px',
            textDecoration: 'none',
            background: '#25D366',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.95rem',
          }}
        >
          📱 WhatsApp'ı Aç
        </a>
      </div>
    </div>
  )
}
