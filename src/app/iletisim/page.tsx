'use client'

import { useState, useRef, useEffect } from 'react'

/* ── Custom Phone Input ── */
type UlkeItem = { kod: string; bayrak: string; ulke: string; format: string; uzunluk: number }

function PhoneInput({
  ulkeler,
  seciliKod,
  numara,
  onKodChange,
  onNumaraChange,
}: {
  ulkeler: UlkeItem[]
  seciliKod: string
  numara: string
  onKodChange: (kod: string) => void
  onNumaraChange: (n: string) => void
}) {
  const [acik, setAcik] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const secili = ulkeler.find(u => u.kod === seciliKod) ?? ulkeler[0]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAcik(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div className="phone-row-wrap">
        {/* Flag + code trigger */}
        <button
          type="button"
          className="phone-flag-btn"
          onClick={() => setAcik(p => !p)}
          aria-haspopup="listbox"
          aria-expanded={acik}
        >
          <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{secili.bayrak}</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-dark)', letterSpacing: '0.02em' }}>{secili.kod}</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ flexShrink: 0, transition: 'transform 0.2s', transform: acik ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <path d="M1 1l4 4 4-4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="phone-divider" />
        {/* Number input */}
        <input
          id="telefonNo"
          type="tel"
          inputMode="numeric"
          className="phone-num-input"
          placeholder={secili.format}
          value={numara}
          onChange={e => onNumaraChange(e.target.value.replace(/\D/g, ''))}
          maxLength={secili.uzunluk + 2}
          autoComplete="tel-national"
        />
      </div>
      {/* Dropdown list */}
      {acik && (
        <ul className="phone-dropdown" role="listbox">
          {ulkeler.map(u => (
            <li
              key={u.kod}
              role="option"
              aria-selected={u.kod === seciliKod}
              className={`phone-dropdown-item${u.kod === seciliKod ? ' selected' : ''}`}
              onClick={() => { onKodChange(u.kod); onNumaraChange(''); setAcik(false) }}
            >
              <span style={{ fontSize: '1.15rem' }}>{u.bayrak}</span>
              <span style={{ fontWeight: 600, fontSize: '0.83rem', color: 'var(--primary-dark)', minWidth: '38px' }}>{u.kod}</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{u.ulke}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

type OnBilgi = {
  adSoyad: string
  ulkeKodu: string
  telefonNo: string
  sikayet: string
}

type AnamnezCevap = Record<string, string>

const ULKE_KODLARI = [
  { kod: '+90', bayrak: '🇹🇷', ulke: 'Türkiye', format: '5XX XXX XX XX', uzunluk: 10 },
  { kod: '+357', bayrak: '🇨🇾', ulke: 'Güney Kıbrıs', format: 'XX XXXXXX', uzunluk: 8 },
  { kod: '+44', bayrak: '🇬🇧', ulke: 'İngiltere', format: 'XXXX XXXXXX', uzunluk: 10 },
  { kod: '+49', bayrak: '🇩🇪', ulke: 'Almanya', format: 'XXX XXXXXXXX', uzunluk: 11 },
  { kod: '+33', bayrak: '🇫🇷', ulke: 'Fransa', format: 'X XX XX XX XX', uzunluk: 9 },
  { kod: '+1', bayrak: '🇺🇸', ulke: 'ABD / Kanada', format: 'XXX XXX XXXX', uzunluk: 10 },
  { kod: '+7', bayrak: '🇷🇺', ulke: 'Rusya', format: 'XXX XXX XXXX', uzunluk: 10 },
  { kod: '+30', bayrak: '🇬🇷', ulke: 'Yunanistan', format: 'XXX XXXXXXX', uzunluk: 10 },
  { kod: '+971', bayrak: '🇦🇪', ulke: 'BAE', format: 'XX XXX XXXX', uzunluk: 9 },
  { kod: '+966', bayrak: '🇸🇦', ulke: 'Suudi Arabistan', format: 'XX XXX XXXX', uzunluk: 9 },
]

const BOLUMLER = [
  {
    no: '1',
    baslik: 'Temel Başvuru Nedeni',
    altbaslik: 'Mevcut Durum',
    sorular: [
      { id: 's1_1', soru: 'Şu an size destek aratan temel şikayetiniz nedir?' },
      { id: 's1_2', soru: 'Bu sorun ne kadar süredir devam ediyor?' },
      { id: 's1_3', soru: 'Bu durum günlük hayatınızı (iş, okul, sosyal ilişkiler) nasıl etkiliyor?' },
      { id: 's1_4', soru: 'Daha önce bu sorunla ilgili herhangi bir çözüm denediniz mi?' },
    ],
  },
  {
    no: '2',
    baslik: 'Psikolojik ve Tıbbi Geçmiş',
    altbaslik: '',
    sorular: [
      { id: 's2_1', soru: 'Daha önce psikolojik bir destek veya terapi aldınız mı? (Aldıysanız süreci kısaca özetler misiniz?)' },
      { id: 's2_2', soru: 'Tanısı konulmuş bir psikiyatrik rahatsızlığınız var mı?' },
      { id: 's2_3', soru: 'Düzenli olarak kullandığınız bir ilaç (psikiyatrik veya fiziksel) var mı?' },
      { id: 's2_4', soru: 'Aile geçmişinizde psikiyatrik rahatsızlık öyküsü bulunuyor mu?' },
    ],
  },
  {
    no: '3',
    baslik: 'Sosyal ve Ailevi Durum',
    altbaslik: '',
    sorular: [
      { id: 's3_1', soru: 'Şu anki yaşam düzeniniz nasıldır? (Kiminle yaşıyorsunuz?)' },
      { id: 's3_2', soru: 'Sosyal destek mekanizmalarınız (arkadaşlar, aile, partner) sizin için ne kadar erişilebilir?' },
      { id: 's3_3', soru: 'Çocukluk döneminizle ilgili genel duygunuz nasıldır? (Mutlu, kaygılı, zorlayıcı vb.)' },
    ],
  },
  {
    no: '4',
    baslik: 'Beklentiler ve Hedefler',
    altbaslik: '',
    sorular: [
      { id: 's4_1', soru: 'Terapi sürecinden temel beklentiniz nedir?' },
      { id: 's4_2', soru: 'Süreç sonunda kendinizde veya hayatınızda neyin değişmesini istersiniz?' },
    ],
  },
  {
    no: '5',
    baslik: 'Risk Değerlendirmesi',
    altbaslik: 'Kritik Sorular',
    sorular: [
      { id: 's5_1', soru: 'Uyku ve iştah düzeninizde son dönemde belirgin bir değişim oldu mu?' },
      { id: 's5_2', soru: 'Alkol veya madde kullanım sıklığınız nedir?' },
    ],
  },
]

const WHATSAPP_NO = '905338616699'

export default function IletisimPage() {
  const [ekran, setEkran] = useState<'onbilgi' | 'anamnez' | 'basarili'>('onbilgi')
  const [onBilgi, setOnBilgi] = useState<OnBilgi>({
    adSoyad: '',
    ulkeKodu: '+90',
    telefonNo: '',
    sikayet: '',
  })
  const [cevaplar, setCevaplar] = useState<AnamnezCevap>({})
  const [loading, setLoading] = useState(false)
  const [hata, setHata] = useState('')

  const secilenUlke = ULKE_KODLARI.find(u => u.kod === onBilgi.ulkeKodu) ?? ULKE_KODLARI[0]
  const telefonGecerli = onBilgi.telefonNo.length >= secilenUlke.uzunluk - 1

  const onBilgiDolu =
    onBilgi.adSoyad.trim().length > 1 &&
    telefonGecerli &&
    onBilgi.sikayet.trim().length > 10

  const handleGonder = () => {
    setLoading(true)
    setHata('')

    // ── Build WhatsApp URL SYNCHRONOUSLY from state (no await yet) ──
    // This must happen in the same call stack as the click so browsers
    // treat window.open as user-initiated and won't block it.
    const BOLUM_BASLIKLARI: Record<string, string> = {
      s1_1: 'Temel şikayetim',
      s1_2: 'Ne kadar süredir devam ediyor',
      s1_3: 'Günlük hayatımı nasıl etkiliyor',
      s1_4: 'Daha önce denediğim çözümler',
      s2_1: 'Daha önce terapi/destek aldım mı',
      s2_2: 'Psikiyatrik tanım var mı',
      s2_3: 'Düzenli kullandığım ilaç',
      s2_4: 'Aile geçmişinde psikiyatrik öykü',
      s3_1: 'Yaşam düzenim',
      s3_2: 'Sosyal desteğim',
      s3_3: 'Çocukluk dönemim hakkında',
      s4_1: 'Terapiden beklentim',
      s4_2: 'Süreç sonunda değişmesini istediğim',
      s5_1: 'Uyku / iştah durumum',
      s5_2: 'Alkol / madde kullanımım',
    }

    const satirlar: string[] = [
      'Merhaba Çiğdem Hanım, randevu almak istiyorum.',
      '',
      '👤 Ad Soyad: ' + onBilgi.adSoyad.trim(),
      '📞 Telefon: ' + onBilgi.ulkeKodu + ' ' + onBilgi.telefonNo,
      '',
      '📝 Şikayetim:',
      onBilgi.sikayet.trim(),
    ]

    const anamnezSatirlar = Object.entries(cevaplar)
      .filter(([, v]) => v && v.trim())
      .map(([k, v]) => `• ${BOLUM_BASLIKLARI[k] ?? k}: ${v.trim()}`)

    if (anamnezSatirlar.length > 0) {
      satirlar.push('', '📋 Anamnez Bilgilerim:', ...anamnezSatirlar)
    }

    const mesaj = encodeURIComponent(satirlar.join('\n'))
    const waUrl = `https://wa.me/${WHATSAPP_NO}?text=${mesaj}`

    // Open WhatsApp tab immediately — full URL, same call stack as click
    window.open(waUrl, '_blank', 'noopener,noreferrer')

    // Show success screen right away
    setEkran('basarili')
    setLoading(false)
  }

  return (
    <>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="page-header-bg" />
        <div className="page-header-content">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.8)' }}>İletişim</p>
          <h1 style={{ color: 'white', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '1rem' }}>
            Randevu Alın
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '520px', lineHeight: 1.8, margin: '0 auto' }}>
            İlk adımı atmaya hazırsanız, aşağıdaki formu doldurun. Size en kısa sürede ulaşacağım.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="contact-grid">

          {/* SOL: İLETİŞİM BİLGİLERİ */}
          <div className="contact-info-card">
            <h3>İletişim Bilgileri</h3>

            <div className="contact-item">
              <div className="contact-item-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="contact-item-text">
                <strong>E-Posta</strong>
                <span>durustc@gmail.com</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="contact-item-text">
                <strong>Telefon</strong>
                <span>+90 533 861 6699</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="contact-item-text">
                <strong>Konum</strong>
                <span>Lefkoşa, Kuzey Kıbrıs</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="contact-item-text">
                <strong>Seans Saatleri</strong>
                <span>Pzt–Cum: 09:00–18:00</span>
              </div>
            </div>

            <div className="social-links">
              <a href="https://www.instagram.com/cigdem_durust/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/%C3%A7i%C4%9Fdem-d%C3%BCr%C3%BCst-510820139/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://www.facebook.com/DurustCigdem/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
            </div>

            <div className="info-note">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" width="16" height="16">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Tüm bilgileriniz gizli tutulmaktadır.</span>
            </div>
          </div>

          {/* SAĞ: FORM */}
          <div className="form-card">

            {/* EKRAN 1: ÖN BİLGİ */}
            {ekran === 'onbilgi' && (
              <div className="form-step active">
                <div className="form-step-badge">Adım 1 / 2</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.7rem', marginBottom: '0.4rem' }}>
                  Sizi Tanıyalım
                </h3>
                <p className="form-intro">
                  Aşağıdaki alanları doldurun, ardından anamnez formuna geçin.
                </p>

                {/* Ad Soyad */}
                <div className="form-field">
                  <label className="form-label" htmlFor="adSoyad">
                    Ad ve Soyadınız <span className="form-required">*</span>
                  </label>
                  <input
                    id="adSoyad"
                    className="form-input"
                    type="text"
                    placeholder="Örn: Ayşe Kaya"
                    value={onBilgi.adSoyad}
                    onChange={e => setOnBilgi(p => ({ ...p, adSoyad: e.target.value }))}
                    autoComplete="name"
                  />
                </div>

                {/* Telefon */}
                <div className="form-field">
                  <label className="form-label" htmlFor="telefonNo">
                    Telefon Numaranız <span className="form-required">*</span>
                  </label>
                  <PhoneInput
                    ulkeler={ULKE_KODLARI}
                    seciliKod={onBilgi.ulkeKodu}
                    numara={onBilgi.telefonNo}
                    onKodChange={kod => setOnBilgi(p => ({ ...p, ulkeKodu: kod, telefonNo: '' }))}
                    onNumaraChange={n => setOnBilgi(p => ({ ...p, telefonNo: n }))}
                  />
                  {onBilgi.telefonNo.length > 0 && !telefonGecerli && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                      Format: {ULKE_KODLARI.find(u => u.kod === onBilgi.ulkeKodu)?.format}
                    </p>
                  )}
                </div>



                {/* Şikayet */}
                <div className="form-field">
                  <label className="form-label" htmlFor="sikayet">
                    Başvuru Şikayetiniz <span className="form-required">*</span>
                  </label>
                  <p className="form-field-hint">Sizi buraya getiren durumu birkaç cümleyle paylaşabilirsiniz.</p>
                  <textarea
                    id="sikayet"
                    className="form-input form-textarea"
                    placeholder="Örn: Son birkaç aydır yoğun kaygı ve uyku sorunları yaşıyorum..."
                    value={onBilgi.sikayet}
                    onChange={e => setOnBilgi(p => ({ ...p, sikayet: e.target.value }))}
                    rows={5}
                  />
                </div>

                <button
                  className="btn-form-next"
                  style={{
                    width: '100%', padding: '1rem', borderRadius: '50px',
                    fontSize: '1rem', fontWeight: 600, marginTop: '0.5rem',
                    opacity: onBilgiDolu ? 1 : 0.4,
                    cursor: onBilgiDolu ? 'pointer' : 'not-allowed',
                  }}
                  disabled={!onBilgiDolu}
                  onClick={() => setEkran('anamnez')}
                >
                  Devam Et — Anamnez Formu →
                </button>
              </div>
            )}

            {/* EKRAN 2: ANAMNEZ */}
            {ekran === 'anamnez' && (
              <div className="form-step active">
                <div className="form-step-badge">Adım 2 / 2</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.7rem', marginBottom: '0.4rem' }}>
                  Anamnez Formu
                </h3>
                <p className="form-intro">
                  Her soruya kısa cevaplar yeterlidir. Tüm bilgileriniz gizli tutulur.
                </p>

                {BOLUMLER.map((bolum) => (
                  <div key={bolum.no} className="anamnez-bolum">
                    <div className="anamnez-bolum-header">
                      <span className="anamnez-no">{bolum.no}</span>
                      <div>
                        <h4 className="anamnez-baslik">{bolum.baslik}</h4>
                        {bolum.altbaslik && <span className="anamnez-altbaslik">{bolum.altbaslik}</span>}
                      </div>
                    </div>
                    <ul className="anamnez-sorular">
                      {bolum.sorular.map((s) => (
                        <li key={s.id} className="anamnez-soru-item">
                          <label className="anamnez-soru-text" htmlFor={s.id}>{s.soru}</label>
                          <textarea
                            id={s.id}
                            className="form-input form-textarea"
                            placeholder="Yanıtınız..."
                            value={cevaplar[s.id] || ''}
                            onChange={e => setCevaplar(p => ({ ...p, [s.id]: e.target.value }))}
                            rows={2}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {hata && <p style={{ color: '#c0392b', fontSize: '0.88rem', marginBottom: '1rem' }}>{hata}</p>}

                <div className="form-nav" style={{ marginTop: '2rem' }}>
                  <button className="btn-form-back" onClick={() => setEkran('onbilgi')}>
                    ← Geri
                  </button>
                  <button
                    className="btn-form-submit"
                    style={{ padding: '0.85rem 2.5rem', borderRadius: '50px', width: 'auto', opacity: loading ? 0.7 : 1, background: '#25D366' }}
                    onClick={handleGonder}
                    disabled={loading}
                  >
                    {loading ? 'Gönderiliyor...' : '📱 WhatsApp ile Randevu Al'}
                  </button>
                </div>
              </div>
            )}

            {/* EKRAN 3: BAŞARI */}
            {ekran === 'basarili' && (
              <div className="form-success show">
                <div className="success-icon" style={{
                  background: 'linear-gradient(135deg,#25D366,#128C7E)'
                }}>
                  <svg fill="currentColor" viewBox="0 0 24 24" width="32" height="32">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>

                <h3 style={{ color: '#128C7E' }}>WhatsApp Açıldı! 📱</h3>
                <p>
                  Teşekkürler, <strong>{onBilgi.adSoyad}</strong>.<br />
                  Bilgileriniz WhatsApp mesajına hazırlandı — lütfen uygulamada <strong>Gönder</strong> tuşuna basın.
                  Dr. Çiğdem Dürüst en kısa sürede size dönüş yapacaktır. 🌿
                </p>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  )
}
