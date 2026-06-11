# Railway Deployment Guide - FoodyMoody

Aplikasi ini dapat langsung dideploy ke Railway menggunakan CLI atau web dashboard.

## Langkah-langkah Deployment:

1. **Buat Project Baru di Railway**:
   - Hubungkan repository GitHub Anda ke Railway dashboard.
2. **Deploy Backend Service**:
   - Konfigurasi target root directory ke `./backend`.
   - Tambahkan Environment Variables:
     - `PORT=8080` (Railway menggunakan dynamic port allocation)
     - `HOST=0.0.0.0`
     - `DEBUG=False`
3. **Deploy Frontend Service**:
   - Konfigurasi target root directory ke `./frontend`.
   - Update API base URL di `frontend/src/services/api.js` agar mengarah ke domain backend Railway yang telah tergenerasi.
4. **Verifikasi**:
   - Pastikan backend build menggunakan start command `python app.py`.
   - Pastikan frontend build menggunakan start command `npm run build` dan dilayani via web server.
