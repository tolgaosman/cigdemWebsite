import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Dr. Çiğdem Dürüst — Psikolojik Danışman | Kuzey Kıbrıs',
  description: 'Dr. Çiğdem Dürüst, Kuzey Kıbrıs\'ta bireysel terapi, çift terapisi ve kaygı bozuklukları alanında uzmanlaşmış psikolojik danışmanlık hizmetleri sunmaktadır.',
  keywords: 'psikolojik danışman, Kuzey Kıbrıs, bireysel terapi, çift terapisi, kaygı, psikolog, Çiğdem Dürüst',
  openGraph: {
    title: 'Dr. Çiğdem Dürüst — Psikolojik Danışman',
    description: 'Kuzey Kıbrıs\'ta profesyonel psikolojik danışmanlık hizmetleri.',
    locale: 'tr_TR',
    type: 'website',
  },
  icons: {
    icon: '/logo-transparent.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
