# Deployment Guide

Panduan lengkap untuk deploy blog ke Vercel dengan Supabase sebagai database.

## Prerequisites

- Akun [Vercel](https://vercel.com/)
- Akun [Supabase](https://supabase.com/)
- Repository sudah di-push ke GitHub

## Supabase Setup

### 1. Buat Project Baru

1. Login ke [Supabase Dashboard](https://app.supabase.com/)
2. Klik "New Project"
3. Isi nama project dan password database
4. Pilih region terdekat (Singapore untuk Indonesia)

### 2. Buat Tabel Views

Buka SQL Editor di Supabase dan jalankan query berikut:

```sql
CREATE TABLE views (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk performa query
CREATE INDEX idx_views_slug ON views(slug);
```

### 3. Buat RPC Functions

Jalankan query berikut untuk membuat functions:

```sql
-- Function untuk mendapatkan jumlah views
CREATE OR REPLACE FUNCTION get_view_count(slug TEXT)
RETURNS INTEGER AS $$
  SELECT COALESCE(count, 0) FROM views WHERE views.slug = get_view_count.slug;
$$ LANGUAGE SQL;

-- Function untuk increment views
CREATE OR REPLACE FUNCTION increment_view_count(slug TEXT)
RETURNS INTEGER AS $$
  INSERT INTO views (slug, count) VALUES (increment_view_count.slug, 1)
  ON CONFLICT (slug) DO UPDATE SET count = views.count + 1, updated_at = NOW()
  RETURNING count;
$$ LANGUAGE SQL;
```

### 4. Dapatkan API Keys

1. Buka **Project Settings** > **API**
2. Catat nilai berikut:
   - **Project URL** → `SUPABASE_URL`
   - **anon public key** → `SUPABASE_ANON_KEY`

## Vercel Deployment

### 1. Import Project

1. Login ke [Vercel](https://vercel.com/)
2. Klik "Add New" > "Project"
3. Import repository dari GitHub

### 2. Konfigurasi Environment Variables

Di halaman konfigurasi project, tambahkan environment variables:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIs...` |

### 3. Deploy

Klik "Deploy" dan tunggu proses build selesai.

## Local Development

### Environment Variables

Buat file `.env` di root project:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

> **Catatan**: File `.env` sudah ada di `.gitignore`, jadi tidak akan ter-commit.

### Jalankan Development Server

```bash
npm install
npm run dev
```

## Migrasi Data Views

Jika kamu memiliki data views dari sistem lama, ikuti langkah berikut:

### Dari JSON/File

```sql
-- Insert manual
INSERT INTO views (slug, count) VALUES
  ('intro-sveltekit', 150),
  ('tutorial-tailwind', 89),
  ('belajar-svelte-5', 234);
```

### Dari Database Lain

Export data dari database lama ke format CSV, lalu import via Supabase Dashboard:

1. Buka **Table Editor** > **views**
2. Klik **Insert** > **Import data from CSV**
3. Upload file CSV dengan format:
   ```csv
   slug,count
   intro-sveltekit,150
   tutorial-tailwind,89
   ```

## Row Level Security (Opsional)

Untuk keamanan tambahan, aktifkan RLS:

```sql
-- Enable RLS
ALTER TABLE views ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa membaca
CREATE POLICY "Allow public read" ON views
  FOR SELECT USING (true);

-- Policy: Hanya authenticated users bisa insert/update
-- (Skip jika views bisa di-increment oleh siapa saja)
CREATE POLICY "Allow public insert" ON views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON views
  FOR UPDATE USING (true);
```

## Troubleshooting

### Views tidak bertambah

1. Cek console browser untuk error
2. Pastikan environment variables sudah benar
3. Cek apakah RPC functions sudah dibuat

### Error 500 di API

1. Cek Vercel logs di dashboard
2. Pastikan `SUPABASE_URL` dan `SUPABASE_ANON_KEY` sudah di-set
3. Cek apakah tabel `views` sudah ada

### Build Error

```bash
# Clear cache dan rebuild
rm -rf .svelte-kit node_modules
npm install
npm run build
```
