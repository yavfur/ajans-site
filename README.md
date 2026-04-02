# Dijital Pazarlama Ajansı

E-ticaret markalarına özel 360° dijital pazarlama platformu. Müşteri paneli, içerik onay sistemi, fatura yönetimi ve mesajlaşma özelliklerini barındıran full-stack web uygulaması.

## Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| UI | Tailwind CSS v4, Framer Motion, Three.js |
| Auth | NextAuth v5 (JWT) |
| ORM | Prisma 7 |
| Veritabanı | PostgreSQL |
| Dil | TypeScript |

## Özellikler

**Public Site**
- Hero bölümü (Three.js GLSL shader animasyonu)
- Hizmetler, Hakkımızda, İletişim, Gizlilik sayfaları
- FAQ accordion, çalışma saatleri, WhatsApp butonu
- Responsive tasarım, `prefers-reduced-motion` desteği

**Admin Paneli** (`/admin`)
- Müşteri yönetimi (CRUD, hizmet atama, arama)
- İçerik yönetimi (yükleme, durum takibi, müşteri filtreleme)
- Fatura oluşturma ve takibi
- Mesajlaşma (müşteri seçerek mesaj gönderme)
- Dashboard istatistikleri (canlı veri)

**Müşteri Paneli** (`/dashboard`)
- İçerik onay/red akışı (feedback ile)
- Fatura görüntüleme
- Ajans ile mesajlaşma
- Hizmet bazlı içerik görüntüleme

## Kurulum

### 1. Bağımlılıkları yükle

```bash
npm install
```

### 2. Environment variables

`.env.example` dosyasını `.env` olarak kopyala ve doldur:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/ajans?schema=public"
AUTH_SECRET="openssl rand -base64 32 ile üretin"
```

### 3. Veritabanı

```bash
npx prisma migrate dev --name init
npx prisma db seed   # opsiyonel — örnek veri
```

### 4. Geliştirme sunucusu

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresini açın.

## Proje Yapısı

```
ajans-site/
├── app/
│   ├── (auth)/giris/          # Giriş sayfası
│   ├── admin/                 # Admin paneli
│   ├── dashboard/             # Müşteri paneli
│   ├── api/                   # API route'ları
│   ├── hizmetler/             # Hizmetler sayfası
│   ├── hakkimizda/            # Hakkımızda
│   ├── iletisim/              # İletişim formu
│   └── gizlilik/              # Gizlilik politikası
├── components/
│   ├── admin/                 # Admin bileşenleri
│   ├── dashboard/             # Dashboard bileşenleri
│   └── ...                    # Paylaşılan bileşenler
├── prisma/
│   └── schema.prisma          # Veritabanı şeması
├── auth.ts                    # NextAuth konfigürasyonu
└── proxy.ts                   # Route koruma (middleware)
```

## Deployment

### Vercel + Neon (Önerilen)

1. [neon.tech](https://neon.tech) üzerinde PostgreSQL veritabanı oluştur
2. `DATABASE_URL`'i Neon bağlantı string'iyle güncelle
3. Vercel'e deploy et:

```bash
# Vercel CLI
npx vercel --prod
```

4. Vercel dashboard'da environment variables ekle:
   - `DATABASE_URL`
   - `AUTH_SECRET`

5. Production'da migration çalıştır:

```bash
npx prisma migrate deploy
```

## Lisans

Özel kullanım. Tüm hakları saklıdır.
