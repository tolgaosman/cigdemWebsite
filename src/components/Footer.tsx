import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h4>Dr. Çiğdem Dürüst</h4>
          <p>
            Kuzey Kıbrıs'ta bireysel terapi, çift terapisi ve kaygı bozuklukları
            alanında uzmanlaşmış psikolojik danışmanlık hizmetleri.
          </p>
        </div>
        <div className="footer-col">
          <h5>Sayfalar</h5>
          <ul>
            <li><Link href="/">Ana Sayfa</Link></li>
            <li><Link href="/hakkimda">Ben Kimim?</Link></li>
            <li><Link href="/iletisim">Randevu Al</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>İletişim</h5>
          <ul>
            <li><a href="mailto:durustc@gmail.com">durustc@gmail.com</a></li>
            <li><a href="tel:+905338346699">+90 533 834 6699</a></li>
            <li>Kuzey Kıbrıs</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} Dr. Çiğdem Dürüst. Tüm hakları saklıdır.</span>
      </div>
    </footer>
  )
}
