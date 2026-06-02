'use client'

import Link from 'next/link'
import Reveal, { RevealItem } from '@/components/Reveal'

const areas = [
  {
    icon: '🧠',
    title: 'Kaygı Bozuklukları',
    desc: 'Kaygı, panik atak, sosyal fobi ve obsesif düşüncelerle başa çıkma stratejileri geliştirerek günlük yaşam kalitenizi iyileştiriyoruz.',
  },
  {
    icon: '💙',
    title: 'Depresyon',
    desc: 'Depresif belirtileri anlamlandırmak, olumsuz düşünce kalıplarını değiştirmek ve yaşama yeniden anlam katmak için destek sunuyoruz.',
  },
  {
    icon: '💬',
    title: 'İlişki ve İletişim Sorunları',
    desc: 'Çift ve aile ilişkilerinde iletişim becerilerini güçlendirmek, tekrar eden çatışmaları çözmek ve sağlıklı bağlar kurmak için çalışıyoruz.',
  },
  {
    icon: '✨',
    title: 'Özgüven Çalışmaları',
    desc: 'Kendinize duyduğunuz güveni yeniden inşa etmek, içsel sesi dönüştürmek ve potansiyelinizi keşfetmek için rehberlik sunuyoruz.',
  },
  {
    icon: '🕊️',
    title: 'Yas ve Kayıp Süreci',
    desc: 'Sevilen bir kişinin kaybı, boşanma veya büyük yaşam değişiklikleri sonrasında yas sürecini sağlıklı biçimde deneyimleyebilmeniz için destek.',
  },
  {
    icon: '⚖️',
    title: 'Stres ve Duygusal Denge Çalışmaları',
    desc: 'Kronik stres, tükenmişlik ve duygusal dengesizlikle başa çıkmak; iç denge ve huzuru yeniden bulmak için bütüncül bir yaklaşım.',
  },
  {
    icon: '🌱',
    title: 'Ergen ve Yetişkin Psikoterapisi',
    desc: 'Ergenlik döneminin zorlukları, kimlik gelişimi, okul/iş stresi ve yetişkinlik geçiş dönemlerinde bireysel psikoterapi desteği.',
  },
]

export default function DestekAlanlariPage() {
  return (
    <>
      {/* ── PAGE HEADER ── */}
      <div className="page-header">
        <div className="page-header-bg" />
        <Reveal className="page-header-content" direction="none">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Hizmetler</p>
          <h1 style={{ color: 'white', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginBottom: '1rem' }}>
            Destek Alanlarım
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '520px', lineHeight: 1.8, textAlign: 'center', margin: '0 auto' }}>
            Her bireyın zorluğu farklıdır. Aşağıda çalıştığım başlıca alanlara göz atabilirsiniz.
          </p>
        </Reveal>
      </div>

      {/* ── AREAS GRID ── */}
      <section className="section">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center' }}>
            <p className="section-label">Uzmanlık Alanları</p>
            <h2 className="section-title">Size nasıl <span>yardımcı</span> olabilirim?</h2>
            <div className="divider" style={{ margin: '1.5rem auto 3rem' }} />
          </Reveal>

          <Reveal
            stagger
            as="div"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}
          >
            {areas.map((area) => (
              <RevealItem
                key={area.title}
                className="card"
                style={{ textAlign: 'left' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{area.icon}</div>
                <h3 style={{ marginBottom: '0.75rem' }}>{area.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{area.desc}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section-alt section-center">
        <Reveal className="cta-banner">
          <h3>Nereden başlayacağınızı bilmek zorunda değilsiniz.</h3>
          <p>İlk görüşmede birlikte ihtiyaçlarınızı belirleriz.</p>
          <Link href="/iletisim" className="btn-primary">
            Randevu Al
          </Link>
        </Reveal>
      </section>
    </>
  )
}
