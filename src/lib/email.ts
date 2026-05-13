import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface BasvuruBilgisi {
  adSoyad: string
  email: string
  telefon: string
  sikayet: string
  anamnezJson?: string
  iletisimTercihi?: string
}

const SORU_ETIKETLERI: Record<string, string> = {
  s1_1: 'Temel şikayet nedir?',
  s1_2: 'Ne kadar süredir devam ediyor?',
  s1_3: 'Günlük hayatı nasıl etkiliyor?',
  s1_4: 'Daha önce çözüm denedi mi?',
  s2_1: 'Daha önce terapi aldı mı?',
  s2_2: 'Psikiyatrik tanısı var mı?',
  s2_3: 'Düzenli ilaç kullanıyor mu?',
  s2_4: 'Aile geçmişinde psikiyatrik öykü?',
  s3_1: 'Yaşam düzeni (kiminle yaşıyor)?',
  s3_2: 'Sosyal destek ne kadar erişilebilir?',
  s3_3: 'Çocukluk dönemi genel duygu?',
  s4_1: 'Terapi beklentisi nedir?',
  s4_2: 'Süreç sonunda ne değişmesini istiyor?',
  s5_1: 'Uyku / iştah değişimi var mı?',
  s5_2: 'Alkol / madde kullanım sıklığı?',
}

/** Always sends notification to durustc@gmail.com */
export async function bildirimEmailiGonder(basvuru: BasvuruBilgisi) {
  // Always send to Dr. Çiğdem's address
  const alici = 'durustc@gmail.com'

  let anamnezHtml = ''
  let anamnezText = ''

  if (basvuru.anamnezJson) {
    try {
      const cevaplar: Record<string, string> = JSON.parse(basvuru.anamnezJson)
      const doluCevaplar = Object.entries(cevaplar).filter(([, v]) => v && v.trim())

      anamnezHtml = doluCevaplar
        .map(
          ([k, v]) => `
          <tr>
            <td style="padding:10px 12px; background:white; border-radius:6px; vertical-align:top; min-width:180px; border-bottom:1px solid #E5DAF0;">
              <strong style="color:#8E44AD; font-size:13px;">${SORU_ETIKETLERI[k] ?? k}</strong>
            </td>
            <td style="padding:10px 12px; border-bottom:1px solid #E5DAF0; font-size:14px; line-height:1.6;">${v.replace(/\n/g, '<br/>')}</td>
          </tr>`,
        )
        .join('')

      anamnezText = doluCevaplar
        .map(([k, v]) => `• ${SORU_ETIKETLERI[k] ?? k}\n  ${v}`)
        .join('\n\n')
    } catch { /* ignore */ }
  }

  const tercih = basvuru.iletisimTercihi === 'whatsapp' ? '📱 WhatsApp' : '✉️ E-posta'
  const konu = `Yeni Randevu Başvurusu — ${basvuru.adSoyad} [${tercih}]`

  const whatsappNote =
    basvuru.iletisimTercihi === 'whatsapp'
      ? `<div style="background:#E8F5E9;border-left:4px solid #25D366;padding:12px 16px;border-radius:4px;margin-bottom:20px;font-size:13px;color:#1B5E20;">
          <strong>📱 Bu müşteri WhatsApp üzerinden randevu aldı.</strong><br/>
          Aynı zamanda tüm bilgiler bu e-posta ile iletilmiştir.
        </div>`
      : `<div style="background:#EDE7F6;border-left:4px solid #7B1FA2;padding:12px 16px;border-radius:4px;margin-bottom:20px;font-size:13px;color:#4A148C;">
          <strong>✉️ Bu müşteri e-posta yoluyla randevu talebinde bulundu.</strong><br/>
          Lütfen en kısa sürede dönüş yapınız.
        </div>`

  await transporter.sendMail({
    from: `"Dr. Çiğdem Dürüst Web Sitesi" <${process.env.SMTP_USER}>`,
    to: alici,
    subject: konu,
    text: [
      `YENİ RANDEVU BAŞVURUSU — ${tercih}`,
      '─'.repeat(40),
      `Ad Soyad : ${basvuru.adSoyad}`,
      `Telefon  : ${basvuru.telefon}`,
      `E-posta  : ${basvuru.email || '(belirtilmedi)'}`,
      '',
      `Şikayet:\n${basvuru.sikayet}`,
      '',
      anamnezText ? `ANAMNEZ CEVAPLARI:\n${anamnezText}` : '',
    ].join('\n'),
    html: `
      <div style="font-family:Georgia,serif;max-width:660px;margin:0 auto;color:#2C1A3E;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#6C3483,#9B59B6);padding:28px 32px;border-radius:12px 12px 0 0;">
          <h1 style="color:white;margin:0;font-size:22px;font-weight:normal;">Yeni Randevu Başvurusu</h1>
          <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">
            Dr. Çiğdem Dürüst Web Sitesi &mdash; İletişim Tercihi: <strong>${tercih}</strong>
          </p>
        </div>

        <!-- Body -->
        <div style="background:#FAF8FC;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #E5DAF0;">

          ${whatsappNote}

          <h2 style="font-size:13px;color:#8E44AD;margin:0 0 12px;letter-spacing:.08em;text-transform:uppercase;">Kişisel Bilgiler</h2>
          <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;border:1px solid #E5DAF0;margin-bottom:24px;">
            <tr>
              <td style="padding:11px 14px;border-bottom:1px solid #E5DAF0;width:130px;"><strong style="color:#8E44AD;font-size:13px;">Ad Soyad</strong></td>
              <td style="padding:11px 14px;border-bottom:1px solid #E5DAF0;font-size:14px;">${basvuru.adSoyad}</td>
            </tr>
            <tr>
              <td style="padding:11px 14px;border-bottom:1px solid #E5DAF0;"><strong style="color:#8E44AD;font-size:13px;">Telefon</strong></td>
              <td style="padding:11px 14px;border-bottom:1px solid #E5DAF0;font-size:14px;">${basvuru.telefon}</td>
            </tr>
            <tr>
              <td style="padding:11px 14px;border-bottom:1px solid #E5DAF0;"><strong style="color:#8E44AD;font-size:13px;">E-posta</strong></td>
              <td style="padding:11px 14px;border-bottom:1px solid #E5DAF0;font-size:14px;">${basvuru.email || '<em style="color:#9E9E9E;">belirtilmedi</em>'}</td>
            </tr>
            <tr>
              <td style="padding:11px 14px;vertical-align:top;"><strong style="color:#8E44AD;font-size:13px;">Şikayet</strong></td>
              <td style="padding:11px 14px;font-size:14px;line-height:1.7;">${basvuru.sikayet.replace(/\n/g, '<br/>')}</td>
            </tr>
          </table>

          ${anamnezHtml ? `
          <h2 style="font-size:13px;color:#8E44AD;margin:0 0 12px;letter-spacing:.08em;text-transform:uppercase;">Anamnez Cevapları</h2>
          <table style="width:100%;border-collapse:collapse;background:#FAF8FC;border-radius:8px;border:1px solid #E5DAF0;margin-bottom:24px;">
            ${anamnezHtml}
          </table>` : ''}

          <p style="margin-top:20px;color:#9B85AE;font-size:11px;text-align:center;border-top:1px solid #E5DAF0;padding-top:16px;">
            Bu e-posta cigdemdurst.com web sitesi üzerinden otomatik olarak gönderilmiştir.
          </p>
        </div>
      </div>
    `,
  })
}
