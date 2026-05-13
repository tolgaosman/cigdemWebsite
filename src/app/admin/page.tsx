'use client'

import { useState, useEffect, useCallback } from 'react'

type Basvuru = {
  id: number
  adSoyad: string
  email: string
  telefon: string
  sikayet: string
  anamnezJson: string
  olusturmaTarihi: string
  okundu: boolean
}

const SORU_ETIKETLERI: Record<string, string> = {
  s1_1: '1.1 — Temel şikayet',
  s1_2: '1.2 — Ne kadar süredir?',
  s1_3: '1.3 — Günlük hayata etkisi',
  s1_4: '1.4 — Daha önce çözüm?',
  s2_1: '2.1 — Daha önce terapi?',
  s2_2: '2.2 — Psikiyatrik tanı?',
  s2_3: '2.3 — Düzenli ilaç?',
  s2_4: '2.4 — Aile geçmişi?',
  s3_1: '3.1 — Yaşam düzeni',
  s3_2: '3.2 — Sosyal destek',
  s3_3: '3.3 — Çocukluk dönemi',
  s4_1: '4.1 — Terapi beklentisi',
  s4_2: '4.2 — Neyin değişmesini istiyor?',
  s5_1: '5.1 — Uyku / iştah değişimi?',
  s5_2: '5.2 — Alkol / madde kullanımı?',
}

export default function AdminPage() {
  const [sifre, setSifre] = useState('')
  const [girisYapildi, setGirisYapildi] = useState(false)
  const [hata, setHata] = useState('')
  const [basvurular, setBasvurular] = useState<Basvuru[]>([])
  const [yukleniyor, setYukleniyor] = useState(false)
  const [secilenId, setSecilenId] = useState<number | null>(null)
  const [filtre, setFiltre] = useState<'hepsi' | 'yeni' | 'okundu'>('hepsi')

  const veriGetir = useCallback(async (token: string) => {
    setYukleniyor(true)
    try {
      const res = await fetch('/api/basvuru', { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) { setGirisYapildi(false); return }
      setBasvurular(await res.json())
    } finally { setYukleniyor(false) }
  }, [])

  const girisYap = async (e: React.FormEvent) => {
    e.preventDefault(); setHata('')
    const res = await fetch('/api/basvuru', { headers: { Authorization: `Bearer ${sifre}` } })
    if (res.ok) { setGirisYapildi(true); setBasvurular(await res.json()) }
    else setHata('Hatalı şifre.')
  }

  useEffect(() => {
    if (girisYapildi) {
      const i = setInterval(() => veriGetir(sifre), 30000)
      return () => clearInterval(i)
    }
  }, [girisYapildi, sifre, veriGetir])

  const filtrelenmis = basvurular.filter(b =>
    filtre === 'yeni' ? !b.okundu : filtre === 'okundu' ? b.okundu : true
  )
  const secilen = basvurular.find(b => b.id === secilenId)
  const tarih = (s: string) => new Date(s).toLocaleString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  if (!girisYapildi) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="admin-login-icon">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="32" height="32">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h1>Admin Paneli</h1>
          <p>Dr. Çiğdem Dürüst — Başvuru Yönetimi</p>
          <form onSubmit={girisYap}>
            <input type="password" className="form-input" placeholder="Yönetici şifresi"
              value={sifre} onChange={e => setSifre(e.target.value)} style={{ marginBottom: '1rem' }} />
            {hata && <p className="admin-error">{hata}</p>}
            <button type="submit" className="btn-form-submit">Giriş Yap</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 400 }}>Başvuru Paneli</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Toplam {basvurular.length} başvuru · {basvurular.filter(b => !b.okundu).length} yeni
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => veriGetir(sifre)} disabled={yukleniyor}
            style={{ padding: '0.5rem 1.2rem', borderRadius: '50px', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', fontSize: '0.88rem' }}>
            {yukleniyor ? '...' : '↻ Yenile'}
          </button>
          <button onClick={() => { setGirisYapildi(false); setSifre('') }}
            style={{ padding: '0.5rem 1.2rem', borderRadius: '50px', border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: '0.88rem' }}>
            Çıkış
          </button>
        </div>
      </div>

      <div className="admin-filters">
        {(['hepsi', 'yeni', 'okundu'] as const).map(f => (
          <button key={f} className={`admin-filter-btn${filtre === f ? ' active' : ''}`} onClick={() => setFiltre(f)}>
            {f === 'hepsi' ? 'Tümü' : f === 'yeni' ? 'Yeni' : 'Okundu'}
          </button>
        ))}
      </div>

      <div className="admin-layout">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Durum</th><th>Ad Soyad</th><th>Telefon</th><th>E-posta</th><th>Tarih</th>
              </tr>
            </thead>
            <tbody>
              {filtrelenmis.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>Henüz başvuru yok.</td></tr>
              ) : filtrelenmis.map(b => (
                <tr key={b.id} onClick={() => setSecilenId(b.id === secilenId ? null : b.id)}
                  style={{ cursor: 'pointer', background: secilenId === b.id ? 'rgba(142,68,173,0.07)' : undefined }}>
                  <td><span className={`badge ${b.okundu ? 'badge-read' : 'badge-new'}`}>{b.okundu ? 'Okundu' : 'Yeni'}</span></td>
                  <td style={{ fontWeight: 500 }}>{b.adSoyad}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{b.telefon}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{b.email}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.83rem' }}>{tarih(b.olusturmaTarihi)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {secilen && (
          <div className="admin-detail">
            <div className="admin-detail-header">
              <h3>{secilen.adSoyad}</h3>
              <button onClick={() => setSecilenId(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-muted)' }}>✕</button>
            </div>
            <div className="admin-detail-body">
              <div className="detail-row"><span className="detail-label">E-posta</span><span>{secilen.email}</span></div>
              <div className="detail-row"><span className="detail-label">Telefon</span><span>{secilen.telefon}</span></div>
              <div className="detail-row"><span className="detail-label">Tarih</span><span>{tarih(secilen.olusturmaTarihi)}</span></div>
              <div className="detail-row">
                <span className="detail-label">Başvuru Şikayeti</span>
                <p style={{ marginTop: '0.4rem', lineHeight: 1.7, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{secilen.sikayet}</p>
              </div>
              {(() => {
                try {
                  const c: Record<string, string> = JSON.parse(secilen.anamnezJson)
                  const entries = Object.entries(c).filter(([, v]) => v?.trim())
                  if (!entries.length) return null
                  return (
                    <div style={{ marginTop: '1rem' }}>
                      <span className="detail-label" style={{ display: 'block', marginBottom: '0.75rem' }}>Anamnez Cevapları</span>
                      {entries.map(([k, v]) => (
                        <div key={k} className="detail-row">
                          <span className="detail-label" style={{ fontSize: '0.7rem' }}>{SORU_ETIKETLERI[k] ?? k}</span>
                          <p style={{ marginTop: '0.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{v}</p>
                        </div>
                      ))}
                    </div>
                  )
                } catch { return null }
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
