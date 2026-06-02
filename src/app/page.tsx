'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import Reveal, { RevealItem } from '@/components/Reveal'

function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  const prefix = (value.match(/^[^0-9]+/) || [''])[0];
  const suffix = (value.match(/[^0-9]+$/) || [''])[0];
  const targetNumber = parseInt((value.match(/[0-9]+/) || ['0'])[0], 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = targetNumber;
    if (start === end) {
      setCount(end);
      return;
    }

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing: easeOutQuad
      const easePercentage = percentage * (2 - percentage);

      const currentCount = Math.floor(easePercentage * end);
      setCount(currentCount);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, targetNumber, duration]);

  return (
    <span ref={elementRef}>
      {prefix}
      {hasStarted ? count : 0}
      {suffix}
    </span>
  );
}

// Hero giriş animasyonu — öğeler sırayla belirir
const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cigdemWebsite/hero-bg.jpg"
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="hero-overlay" />
        <motion.div
          className="hero-content"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero-subtitle" variants={heroItem}>
            Psikolojik Danışmanlık · Çiğdem Dürüst
          </motion.p>
          <motion.h1 variants={heroItem}>
            İçinizdeki <em>huzuru</em>
            <br />
            birlikte bulalım
          </motion.h1>
          <motion.p className="hero-desc" variants={heroItem}>
            Hayatın karmaşıklıkları arasında kaybolduğunuzda, güvenli ve yargısız
            bir alanda size eşlik etmek için buradayım.
          </motion.p>
          <motion.div className="hero-ctas" variants={heroItem}>
            <Link href="/iletisim" className="btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Hemen Randevu Al
            </Link>
            <Link href="/hakkimda" className="btn-secondary">
              Daha Fazla Öğren
            </Link>
          </motion.div>
          <motion.div className="hero-trust" variants={heroItem}>
            <span className="hero-chip">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
              Lefkoşa, Kuzey Kıbrıs
            </span>
            <span className="hero-chip">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.42A12 12 0 0112 21a12 12 0 01-6.16-10.42L12 14z"/></svg>
              10+ Yıl Deneyim
            </span>
            <span className="hero-chip">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
              EMDR &amp; BDT Sertifikalı
            </span>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
          <span>Keşfet</span>
        </motion.div>
      </section>

      {/* ── HIZMETLER ── */}
      <section className="section section-center">
        <Reveal>
          <p className="section-label">Uzmanlık Alanları</p>
          <h2 className="section-title">Size nasıl <span>yardımcı</span> olabilirim?</h2>
          <div className="divider" />
          <p className="section-desc">
            Her bireyin hikayesi kendine özgüdür. Birlikte, size en uygun terapötik
            yaklaşımı belirleriz.
          </p>
        </Reveal>
        <Reveal stagger as="div" className="cards-grid">
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
            <RevealItem key={card.title} className="card">
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </RevealItem>
          ))}
        </Reveal>
        {/* Diğer destek alanlarına yönlendiren şerit */}
        <Reveal className="services-strip" delay={0.1}>
          <div className="services-strip-text">
            <strong>Yas, depresyon, özgüven, stres ve daha fazlası</strong>
            <span>Çalıştığım tüm destek alanlarını keşfedin.</span>
          </div>
          <Link href="/destek-alanlari" className="btn-primary">
            Diğer Destek Alanları
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginLeft: '0.4rem' }}><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </Link>
        </Reveal>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="section section-alt">
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
              <strong>10+</strong>
              <span>Yıl Deneyim</span>
            </div>
          </Reveal>
          <Reveal className="about-content" direction="left" delay={0.1}>
            <p className="section-label">Hakkımda</p>
            <h2 className="section-title">
              Empatik, <span>yargısız</span> bir yaklaşım
            </h2>
            <div className="divider" />
            <p className="about-desc">
              Merhaba, ben Dr. Çiğdem Dürüst. Kuzey Kıbrıs&apos;ta psikolojik danışmanlık
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
            <Link href="/hakkimda" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1rem', background: 'var(--gradient-brand)', color: 'white' }}>
              Daha Fazla Öğren
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginLeft: '0.5rem' }}><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── PHILOSOPHY / QUOTE ── */}
      <section className="quote-band">
        <Reveal>
          <blockquote>
            Her danışanın kendine has bir <em>hikayesi</em> olduğuna inanıyorum;
            terapi de bu hikayeye yargısızca eşlik etmekle başlar.
          </blockquote>
          <cite>Dr. Çiğdem Dürüst</cite>
        </Reveal>
      </section>

      {/* ── STATS ── */}
      <section className="section section-center">
        <Reveal>
          <p className="section-label">Rakamlarla</p>
          <h2 className="section-title">Birlikte yürüdüğümüz <span>yol</span></h2>
          <div className="divider" />
        </Reveal>
        <Reveal stagger as="div" className="stats-grid">
          <RevealItem className="stat">
            <div className="stat-num">
              <AnimatedCounter value="500+" />
            </div>
            <div className="stat-label">Mutlu Danışan</div>
          </RevealItem>
          <RevealItem className="stat">
            <div className="stat-num">
              <AnimatedCounter value="10+" />
            </div>
            <div className="stat-label">Yıl Deneyim</div>
          </RevealItem>
          <RevealItem className="stat">
            <div className="stat-num">
              <AnimatedCounter value="%100" />
            </div>
            <div className="stat-label">Memnuniyet Garantisi</div>
          </RevealItem>
        </Reveal>

        {/* CTA Banner */}
        <Reveal className="cta-banner" delay={0.1}>
          <h3>Yardım istemek cesaret ister.</h3>
          <p>İlk adımı atmaya hazır hissediyorsanız, buradayım.</p>
          <Link href="/iletisim" className="btn-primary">
            Randevu Al
          </Link>
        </Reveal>
      </section>
    </>
  )
}
