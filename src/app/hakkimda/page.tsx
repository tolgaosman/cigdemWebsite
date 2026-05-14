'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HakkimdaPage() {
  const fadeRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    fadeRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addRef = (el: HTMLElement | null) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el)
  }

  return (
    <>
      {/* ── PAGE HEADER ── */}
      <div className="page-header">
        <div className="page-header-bg" />
        <div className="page-header-content">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Hakkımda</p>
          <h1 style={{ color: 'white', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '1rem' }}>
            Ben Kimim?
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '520px', lineHeight: 1.8, textAlign: 'center', margin: '0 auto' }}>
            Empatik, yargısız ve bilimsel temelli bir yaklaşımla her danışanın
            kendine özgü yolculuğuna eşlik ediyorum.
          </p>
        </div>
      </div>

      {/* ── ANA BİO ── */}
      <section className="section">
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
              <strong>Dr.</strong>
              <span>Psikolojik Danışman</span>
            </div>
          </div>
          <div className="about-content fade-in" ref={addRef as never}>
            <p className="section-label">Tanışalım</p>
            <h2 className="section-title">Dr. Çiğdem <span>DÜRÜST</span></h2>
            <div className="divider" />
            <p className="about-desc">
              Merhaba, ben Dr. Çiğdem Dürüst. Kuzey Kıbrıs'ta psikolojik danışmanlık
              alanında 10 yılı aşkın deneyime sahibim. Bireysel terapi, çift terapisi
              ve kaygı bozuklukları konularında uzmanlaşmış bir terapistim.
            </p>
            <p className="about-desc">
              Her danışanımın kendine özgü bir hikâyesi olduğuna yürekten inanıyorum.
              Bu nedenle tek tip bir yöntem değil; her bireyin ihtiyacına, kültürel
              arka planına ve kişisel hedeflerine göre şekillenen, esnek ve bilimsel
              temelli bir yaklaşım benimsiyorum.
            </p>
            <p className="about-desc">
              Terapötik süreçte güvenli, yargısız ve destekleyici bir ortam yaratmak
              en temel önceliğimdir. Danışanlarımın kendi içsel gücünü keşfetmesine
              ve sürdürülebilir bir değişim yolculuğuna çıkmasına eşlik etmekten
              büyük mutluluk duyuyorum.
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
          </div>
        </div>
      </section>

      {/* ── EĞİTİM & DENEYİM ── */}
      <section className="section section-alt">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }} className="edu-grid">
            <div className="fade-in" ref={addRef as never}>
              <p className="section-label">Eğitim</p>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Akademik <span>Geçmiş</span></h2>
              <div className="divider" style={{ margin: '1.2rem 0' }} />
              <ul className="edu-list">
                <li>
                  <span className="edu-year">2014</span>
                  <div className="edu-info">
                    <strong>Psikoloji Doktorası</strong>
                    <span>Yakın Doğu Üniversitesi, KKTC</span>
                  </div>
                </li>
                <li>
                  <span className="edu-year">2010</span>
                  <div className="edu-info">
                    <strong>Klinik Psikoloji Yüksek Lisansı</strong>
                    <span>Orta Doğu Teknik Üniversitesi, Ankara</span>
                  </div>
                </li>
                <li>
                  <span className="edu-year">2008</span>
                  <div className="edu-info">
                    <strong>Psikoloji Lisansı</strong>
                    <span>Ege Üniversitesi, İzmir</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="fade-in" ref={addRef as never}>
              <p className="section-label">Sertifikalar</p>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Uzmanlık <span>Alanları</span></h2>
              <div className="divider" style={{ margin: '1.2rem 0' }} />
              <ul className="edu-list">
                <li>
                  <span className="edu-year">✦</span>
                  <div className="edu-info">
                    <strong>EMDR Terapisti Sertifikası</strong>
                    <span>EMDR Europe — Akredite Uygulayıcı</span>
                  </div>
                </li>
                <li>
                  <span className="edu-year">✦</span>
                  <div className="edu-info">
                    <strong>Bilişsel Davranışçı Terapi (BDT)</strong>
                    <span>Türk Psikoloji Derneği — Sertifikalı Terapist</span>
                  </div>
                </li>
                <li>
                  <span className="edu-year">✦</span>
                  <div className="edu-info">
                    <strong>Çift & Aile Terapisi</strong>
                    <span>Gottman Enstitüsü — Seviye 2</span>
                  </div>
                </li>
                <li>
                  <span className="edu-year">✦</span>
                  <div className="edu-info">
                    <strong>Yas Danışmanlığı</strong>
                    <span>ADEC Sertifikalı Danışman</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── YAKLAŞIM ── */}
      <section className="section section-center">
        <p className="section-label">Terapötik Yaklaşım</p>
        <h2 className="section-title">Nasıl <span>çalışıyorum?</span></h2>
        <div className="divider" />
        <p className="section-desc">
          Her seansımda bilimsel yöntemleri insani sıcaklıkla harmanlıyorum.
        </p>
        <div className="cards-grid fade-in" ref={addRef as never}>
          {[
            {
              num: '01',
              title: 'Güvenli Alan',
              desc: 'Her danışanım için yargısız, güvenli ve gizli bir terapötik ortam oluştururum. Paylaşmak konusunda asla baskı hissetmezsiniz.',
            },
            {
              num: '02',
              title: 'Bireysel Plan',
              desc: 'Tek tip bir yaklaşım yerine; sizin ihtiyaçlarınıza, hedeflerinize ve kültürel arka planınıza göre kişiselleştirilmiş bir yol haritası çizeriz.',
            },
            {
              num: '03',
              title: 'Kanıta Dayalı',
              desc: 'BDT, EMDR ve Gottman yöntemi gibi bilimsel temelli tekniklerden yararlanarak somut ve kalıcı değişimler hedefleriz.',
            },
            {
              num: '04',
              title: 'Sürdürülebilir Değişim',
              desc: 'Terapi süreci sonunda da kendi başınıza kullanabileceğiniz araçlar ve stratejiler geliştirmenize yardımcı olurum.',
            },
          ].map((item) => (
            <div key={item.num} className="card">
              <div className="card-icon" style={{ background: 'none', border: '1.5px solid var(--primary-light)' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--primary)', fontWeight: 600 }}>{item.num}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section-alt section-center">
        <div className="cta-banner fade-in" ref={addRef as never}>
          <h3>Birlikte çalışmaya hazır mısınız?</h3>
          <p>İlk adımı atmak bazen en zor olanıdır — ama siz buradasınız, bu başlı başına cesaret.</p>
          <Link href="/iletisim" className="btn-primary">
            Randevu Formu
          </Link>
        </div>
      </section>
    </>
  )
}
