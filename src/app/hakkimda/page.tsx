'use client'

import Link from 'next/link'
import Reveal, { RevealItem } from '@/components/Reveal'

export default function HakkimdaPage() {
  return (
    <>
      {/* ── PAGE HEADER ── */}
      <div className="page-header">
        <div className="page-header-bg" />
        <Reveal className="page-header-content" direction="none">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Hakkımda</p>
          <h1 style={{ color: 'white', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginBottom: '1rem' }}>
            Ben Kimim?
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '520px', lineHeight: 1.8, textAlign: 'center', margin: '0 auto' }}>
            Empatik, yargısız ve bilimsel temelli bir yaklaşımla her danışanın
            kendine özgü yolculuğuna eşlik ediyorum.
          </p>
        </Reveal>
      </div>

      {/* ── ANA BİO ── */}
      <section className="section">
        <div className="about-grid">
          <Reveal className="about-img-wrap" direction="right">
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
          </Reveal>
          <Reveal className="about-content" direction="left" delay={0.1}>
            <p className="section-label">Tanışalım</p>
            <h2 className="section-title">Dr. Çiğdem <span>DÜRÜST</span></h2>
            <div className="divider" />
            <p className="about-desc">
              Merhaba, ben Dr. Çiğdem Dürüst. Kuzey Kıbrıs&apos;ta psikolojik danışmanlık
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
          </Reveal>
        </div>
      </section>

      {/* ── EĞİTİM & DENEYİM ── */}
      <section className="section section-alt">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="edu-grid">
            <Reveal direction="right">
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
            </Reveal>

            <Reveal direction="left" delay={0.1}>
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── YAKLAŞIM ── */}
      <section className="section section-center">
        <Reveal>
          <p className="section-label">Terapötik Yaklaşım</p>
          <h2 className="section-title">Nasıl <span>çalışıyorum?</span></h2>
          <div className="divider" />
          <p className="section-desc">
            Her seansımda bilimsel yöntemleri insani sıcaklıkla harmanlıyorum.
          </p>
        </Reveal>
        <Reveal stagger as="div" className="cards-grid">
          {[
            {
              num: '01',
              title: 'Güvenli Alan',
              desc: 'Burada yargılanmadan, eleştirilmeden ve olduğu gibi kabul edilerek kendinizi ifade edebilirsiniz. Duygularınız, düşünceleriniz ve yaşadıklarınız gizlilik ve saygı çerçevesinde ele alınır. Bu alan, kendinizi anlamanız ve içsel gücünüzü yeniden keşfetmeniz için güvenli bir zemindir.',
            },
            {
              num: '02',
              title: 'Bireysel Plan',
              desc: 'Her bireyin ihtiyaçları, yaşam öyküsü ve hedefleri farklıdır. Bu nedenle danışmanlık süreci, size özel olarak yapılandırılır ve kendi hızınızda ilerlemenize olanak tanır. Birlikte, yaşam kalitenizi artıracak gerçekçi ve sürdürülebilir bir yol haritası oluştururuz.',
            },
            {
              num: '03',
              title: 'Kanıta Dayalı Yaklaşım',
              desc: 'Danışmanlık sürecinde, bilimsel araştırmalarla etkinliği desteklenen yöntem ve teknikler kullanılır. İlerleme, belirlenebilir hedefler ve gözlemlenebilir değişimler üzerinden düzenli olarak değerlendirilir. Böylece sürecin etkileri somut ve ölçülebilir sonuçlarla takip edilebilir.',
            },
            {
              num: '04',
              title: 'Sürdürülebilir Değişim',
              desc: 'Amaç, yalnızca geçici rahatlama değil; yaşamınızın her alanına yansıyacak kalıcı ve güçlü bir dönüşüm sağlamaktır. Kazandığınız farkındalık ve beceriler, uzun vadede daha dengeli ve tatmin edici bir yaşamın temelini oluşturur.',
            },
          ].map((item) => (
            <RevealItem key={item.num} className="card">
              <div className="card-icon" style={{ background: 'rgba(255,255,255,0.6)', border: '1.5px solid var(--primary-light)', boxShadow: 'none' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--primary)', fontWeight: 600 }}>{item.num}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="section section-alt section-center">
        <Reveal className="cta-banner">
          <h3>Birlikte çalışmaya hazır mısınız?</h3>
          <p>İlk adımı atmak bazen en zor olanıdır — ama siz buradasınız, bu başlı başına cesaret.</p>
          <Link href="/iletisim" className="btn-primary">
            Randevu Formu
          </Link>
        </Reveal>
      </section>
    </>
  )
}
