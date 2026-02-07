# Deployment Guide - Vercel

## Prerequisites

1. Akun GitHub
2. Akun Vercel (gratis)
3. Database PostgreSQL (sudah ada dari Prisma)

## Step-by-Step Deployment

### 1. Push ke GitHub

```bash
# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Wedding invitation app"

# Add remote (ganti dengan URL repo Anda)
git remote add origin https://github.com/username/wedding-invitation.git

# Push
git push -u origin main
```

### 2. Import Project ke Vercel

1. Login ke [vercel.com](https://vercel.com)
2. Klik **"Add New Project"**
3. Import repository GitHub Anda
4. Vercel akan otomatis detect Next.js

### 3. Configure Environment Variables

Di Vercel dashboard, tambahkan environment variables berikut:

**Environment Variables:**

```
DATABASE_URL=postgres://e0edb7e20b3afaaced409fb4bff30af6f446e8de3d30a69a7ec31ee5b85444f5:sk_-3Hltzepxnx238EbvmFqP@db.prisma.io:5432/postgres?sslmode=require&pool=true

JWT_SECRET=GANTI_DENGAN_RANDOM_STRING_YANG_KUAT_MIN_32_KARAKTER

ADMIN_USERNAME=admin

ADMIN_PASSWORD=GANTI_DENGAN_PASSWORD_YANG_KUAT
```

⚠️ **PENTING:**
- Ganti `JWT_SECRET` dengan random string yang kuat (minimal 32 karakter)
- Ganti `ADMIN_PASSWORD` dengan password yang kuat

Generate JWT_SECRET dengan:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Deploy

Klik **"Deploy"** dan tunggu proses selesai.

### 5. Setup Database di Production

Setelah deployment pertama berhasil, Anda perlu:

#### Option A: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Push database schema
vercel env pull .env.production
DATABASE_URL="..." npx prisma db push

# Create admin user
vercel env pull .env.production
DATABASE_URL="..." npx tsx scripts/init-admin.ts
```

#### Option B: Via Local dengan Production Database URL

```bash
# Set DATABASE_URL temporarily
$env:DATABASE_URL="your-production-database-url"

# Push schema
npx prisma db push

# Create admin
npx tsx scripts/init-admin.ts
```

### 6. Verify Deployment

1. Buka URL production Anda (contoh: `https://your-app.vercel.app`)
2. Akan redirect ke `/login`
3. Login dengan credentials admin
4. Buat guest pertama
5. Test link undangan

## Post-Deployment

### Custom Domain (Optional)

1. Di Vercel dashboard, buka **Settings > Domains**
2. Tambahkan domain Anda
3. Update DNS records sesuai instruksi Vercel

### Monitoring

- **Logs**: Vercel Dashboard > Deployments > View Function Logs
- **Analytics**: Vercel Dashboard > Analytics
- **Database**: Prisma Studio (`npx prisma studio`)

## Troubleshooting

### Build Failed

**Error: Prisma Client not generated**

Solution: Pastikan `postinstall` script ada di `package.json`:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Database Connection Error

**Error: Can't reach database server**

Solution:
1. Pastikan `DATABASE_URL` benar di environment variables
2. Pastikan database mengizinkan koneksi dari Vercel IPs
3. Untuk Prisma Accelerate, pastikan connection pooling enabled

### Admin Login Failed

**Error: Invalid credentials**

Solution: Pastikan admin user sudah dibuat di production database:
```bash
vercel env pull .env.production
DATABASE_URL="..." npx tsx scripts/init-admin.ts
```

### Middleware Error

**Error: Middleware not working**

Solution: Pastikan file `middleware.ts` ada di root project (bukan di `/app`)

## Security Checklist

✅ JWT_SECRET menggunakan random string yang kuat
✅ ADMIN_PASSWORD menggunakan password yang kuat
✅ File `.env` tidak di-commit ke Git
✅ Database connection string aman
✅ HTTPS enabled (otomatis di Vercel)

## Maintenance

### Update Admin Password

1. Hash password baru:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('new-password', 10))"
```

2. Update di database via Prisma Studio atau SQL:
```sql
UPDATE "Admin" SET password = 'hashed-password' WHERE username = 'admin';
```

### Backup Database

Gunakan Prisma Studio atau pg_dump untuk backup:
```bash
pg_dump $DATABASE_URL > backup.sql
```

### View Logs

```bash
vercel logs
```

## Support

Jika ada masalah:
1. Check Vercel deployment logs
2. Check browser console untuk client-side errors
3. Check Prisma Studio untuk database issues

---

**Deployment Checklist:**

- [ ] Repository pushed ke GitHub
- [ ] Project imported ke Vercel
- [ ] Environment variables configured
- [ ] First deployment successful
- [ ] Database schema pushed
- [ ] Admin user created
- [ ] Login tested
- [ ] Guest creation tested
- [ ] Invitation link tested
- [ ] Custom domain configured (optional)
