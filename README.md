# Wedding Invitation Digital App

Aplikasi undangan digital dengan sistem manajemen tamu dan admin panel.

## Fitur Utama

- ✅ **Link Unik per Tamu**: Setiap tamu mendapat link `/undangan/[slug]` yang unik
- ✅ **Nama Tamu dari Database**: Nama tamu diambil dari database, tidak bisa diubah
- ✅ **Admin Panel**: Kelola daftar tamu dan generate link undangan
- ✅ **Tracking**: Sistem mencatat kapan tamu membuka undangan
- ✅ **Authentication**: Login admin dengan JWT-based session
- ✅ **Scalable**: Menggunakan Prisma ORM dengan PostgreSQL

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Prisma)
- **Authentication**: JWT (jose library)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Setup Lokal

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

Database connection sudah dikonfigurasi di `.env`:

```env
DATABASE_URL="postgres://..."
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
```

### 3. Push Schema ke Database

```bash
npx prisma db push
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Buat Admin User

```bash
npx tsx scripts/init-admin.ts
```

### 6. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Cara Penggunaan

### Login Admin

1. Buka `http://localhost:3000/login`
2. Login dengan credentials:
   - Username: `admin`
   - Password: `admin123`

### Membuat Link Undangan

1. Setelah login, Anda akan diarahkan ke `/admin`
2. Input nama tamu di form
3. Klik "Create Guest Link"
4. Link akan otomatis di-copy ke clipboard
5. Bagikan link tersebut ke tamu

### Format Link Undangan

```
https://your-domain.com/undangan/[slug-unik]
```

Contoh:
```
https://your-domain.com/undangan/a1b2c3d4e5
```

## API Endpoints

### POST `/api/auth/login`
Login admin

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

### POST `/api/auth/logout`
Logout admin

### POST `/api/guest`
Buat tamu baru (requires authentication)

**Request:**
```json
{
  "name": "Budi Santoso"
}
```

**Response:**
```json
{
  "success": true,
  "guest": {
    "id": "...",
    "name": "Budi Santoso",
    "slug": "a1b2c3d4e5",
    "link": "/undangan/a1b2c3d4e5"
  }
}
```

### GET `/api/guest`
Ambil semua tamu (requires authentication)

### POST `/api/guest/[slug]/track`
Track kapan tamu membuka undangan

## Database Schema

### Guest
```prisma
model Guest {
  id        String    @id @default(cuid())
  name      String
  slug      String    @unique
  createdAt DateTime  @default(now())
  openedAt  DateTime?
}
```

### Admin
```prisma
model Admin {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

## Deploy ke Vercel

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import di Vercel

1. Buka [vercel.com](https://vercel.com)
2. Import repository GitHub Anda
3. Tambahkan Environment Variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`

### 3. Deploy

Vercel akan otomatis build dan deploy aplikasi Anda.

### 4. Setup Database di Production

Setelah deploy pertama kali:

```bash
# Push schema ke production database
npx prisma db push

# Buat admin user
npx tsx scripts/init-admin.ts
```

Atau jalankan via Vercel CLI atau tambahkan sebagai build command.

## Security Notes

⚠️ **PENTING untuk Production:**

1. **Ganti JWT_SECRET** dengan random string yang kuat
2. **Ganti ADMIN_PASSWORD** dengan password yang kuat
3. Jangan commit file `.env` ke Git
4. Gunakan environment variables di Vercel untuk production

## Troubleshooting

### Prisma Client Error
```bash
npx prisma generate
```

### Database Connection Error
Pastikan `DATABASE_URL` sudah benar di `.env`

### Admin Login Gagal
Pastikan admin user sudah dibuat dengan menjalankan:
```bash
npx tsx scripts/init-admin.ts
```

## License

Private - Wedding Invitation Project
