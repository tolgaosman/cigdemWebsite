'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const fadeRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )
    fadeRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addRef = (el: HTMLElement | null) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el)
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <Image
            src="/hero-bg.jpg"
            alt="Huzurlu terapi ortamı"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-subtitle">Psikolojik Danışmanlık · Çiğdem Dürüst</p>
          <h1>
            İçinizdeki <em>huzuru</em>
            <br />
            birlikte bulalım
          </h1>
          <p className="hero-desc">
            Hayatın karmaşıklıkları arasında kaybolduğunuzda, güvenli ve yargısız
            bir alanda size eşlik etmek için buradayım.
          </p>
          <div className="hero-ctas">
            <Link href="/iletisim" className="btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Hemen Randevu Al
            </Link>
            <Link href="/hakkimda" className="btn-secondary">
              Daha Fazla Öğren
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
          <span>Keşfet</span>
        </div>
      </section>

      {/* ── HIZMETLER ── */}
      <section className="section section-center" ref={addRef as never}>
        <p className="section-label">Uzmanlık Alanları</p>
        <h2 className="section-title">Size nasıl <span>yardımcı</span> olabilirim?</h2>
        <div className="divider" />
        <p className="section-desc">
          Her bireyin hikayesi kendine özgüdür. Birlikte, size en uygun terapötik
          yaklaşımı belirleriz.
        </p>
        <div className="cards-grid">
          {[
            {
              icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              ),
              title: 'Bireysel Terapi',
              desc: 'Kendinizi daha iyi tanımak, duygusal zorluklarla başa çıkmak ve içsel gücünüzü keşfetmek için güvenli bir alan.',
            },
            {
              icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              ),
              title: 'Çift Terapisi',
              desc: 'İlişkinizde iletişimi güçlendirmek, köklü sorunları ele almak ve birbirinize daha derin bağlanmak için destek.',
            },
            {
              icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              ),
              title: 'Aile Terapisi',
              desc: 'Aile içi iletişimi güçlendirmek, kuşaklar arası sorunları ele almak ve sağlıklı aile dinamikleri oluşturmak için destek.',
            },
          ].map((card) => (
            <div key={card.title} className="card fade-in" ref={addRef as never}>
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
          {/* Diğer Destek Alanları butonu */}
          <Link href="/destek-alanlari" className="card fade-in" ref={addRef as never} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', border: '2px dashed var(--primary-light)' }}>
            <div className="card-icon">
              <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            </div>
            <h3>Diğer Destek Alanları</h3>
            <p>Tüm çalışma alanlarını keşfetmek için tıklayın →</p>
          </Link>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="section section-alt">
        <div className="about-grid">
          <div className="about-img-wrap fade-in" ref={addRef as never}>
            <div className="about-img-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cigdemWebsite/cigdem.jpeg"
                alt="Dr. Çiğdem Dürüst"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 15%' }}
              />
            </div>
            <div className="about-badge">
              <strong>10+</strong>
              <span>Yıl Deneyim</span>
            </div>
          </div>
          <div className="about-content fade-in" ref={addRef as never}>
            <p className="section-label">Hakkımda</p>
            <h2 className="section-title">
              Empatik, <span>yargısız</span> bir yaklaşım
            </h2>
            <div className="divider" />
            <p className="about-desc">
              Merhaba, ben Dr. Çiğdem Dürüst. Kuzey Kıbrıs'ta psikolojik danışmanlık
              alanında uzmanlaşmış bir terapistim. Bireysel terapi, çift terapisi ve
              kaygı bozuklukları konularında danışanlarıma destek sunuyorum.
            </p>
            <p className="about-desc">
              Her danışanın kendine has bir hikayesi olduğuna inanıyorum. Terapötik
              süreçte yargısız, empatik ve destekleyici bir ortam yaratmayı her şeyin
              önünde tutuyorum.
            </p>
            <div className="about-tags">
              {[
                'Bireysel Terapi', 'Çift Terapisi', 'Aile Danışmanlığı',
                'Kaygı Bozuklukları', 'Depresyon', 'BDT', 'EMDR',
                'Yas Terapisi', 'Özgüven Çalışmaları',
                'Ergen ve Yetişkin Psikoterapisi',
                'İlişki ve İletişim Sorunları',
                'Stres ve Duygusal Denge Çalışmaları',
              ].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            <Link href="/hakkimda" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1rem' }}>
              Daha Fazla Öğren
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginLeft: '0.5rem' }}><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section section-center">
        <p className="section-label">Rakamlarla</p>
        <h2 className="section-title">Birlikte yürüdüğümüz <span>yol</span></h2>
        <div className="divider" />
        <div className="stats-grid fade-in" ref={addRef as never}>
          <div className="stat">
            <div className="stat-num">500+</div>
            <div className="stat-label">Mutlu Danışan</div>
          </div>
          <div className="stat">
            <div className="stat-num">10+</div>
            <div className="stat-label">Yıl Deneyim</div>
          </div>
          <div className="stat">
            <div className="stat-num">%100</div>
            <div className="stat-label">Memnuniyet Garantisi</div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="cta-banner fade-in" ref={addRef as never}>
          <h3>Yardım istemek cesaret ister.</h3>
          <p>İlk adımı atmaya hazır hissediyorsanız, buradayım.</p>
          <Link href="/iletisim" className="btn-primary">
            Randevu Al
          </Link>
        </div>
      </section>
    </>
  )
}
