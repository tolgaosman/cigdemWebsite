import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { bildirimEmailiGonder } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { adSoyad, email, telefon, sikayet, anamnezJson, iletisimTercihi } = body

    if (!adSoyad || !telefon || !sikayet) {
      return NextResponse.json({ hata: 'Zorunlu alanlar eksik.' }, { status: 400 })
    }

    const kayit = await prisma.basvuruFormu.create({
      data: {
        adSoyad: String(adSoyad).trim(),
        email: email ? String(email).trim() : '',
        telefon: String(telefon).trim(),
        sikayet: String(sikayet).trim(),
        anamnezJson: anamnezJson ? String(anamnezJson) : '{}',
      },
    })

    // E-posta bildirim — her iki iletişim yolunda da gönder
    try {
      await bildirimEmailiGonder({
        adSoyad: kayit.adSoyad,
        email: kayit.email,
        telefon: kayit.telefon,
        sikayet: kayit.sikayet,
        anamnezJson: kayit.anamnezJson,
        iletisimTercihi: iletisimTercihi ?? 'email',
      })
    } catch (err) {
      console.error('Email gönderilemedi:', err)
    }

    return NextResponse.json({ basarili: true, id: kayit.id }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ hata: 'Sunucu hatası.' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.ADMIN_SIFRE}`) {
    return NextResponse.json({ hata: 'Yetkisiz.' }, { status: 401 })
  }
  const basvurular = await prisma.basvuruFormu.findMany({
    orderBy: { olusturmaTarihi: 'desc' },
  })
  return NextResponse.json(basvurular)
}
