# Minggu 11 — Deployment Diagram

**Terkait CPMK:** 31.3

## Tujuan

Mendesain node, execution environment, artifact, protokol komunikasi,
containerization, dan penempatan layanan AI/ML.

## Artefak Diagram

- `diagrams/deployment-sipustaka.mmd`
- `diagrams/deployment-sipustaka.puml`
- `server.js` — API Server
- `ai-service.js` — mock AI/ML service lokal
- `Dockerfile` dan `docker-compose.yml`
- `.env.example` — contoh konfigurasi tanpa kredensial

## Menjalankan Tanpa Docker

Terminal 1:

```bash
node ai-service.js
```

Terminal 2:

```bash
AI_SERVICE_URL=http://localhost:3001 node server.js
```

Terminal 3:

```bash
curl http://localhost:3000/buku
curl http://localhost:3000/buku/978-1
curl http://localhost:3000/rekomendasi/978-1
curl -X POST http://localhost:3000/pinjam/978-1
```

## Menjalankan dengan Docker

```bash
docker compose up --build
```

## Aspek Keamanan dan Tata Kelola

- Jangan menaruh API key di kode atau repository.
- Gunakan environment variable/secret manager.
- Batasi data yang dikirim ke layanan AI.
- Tambahkan autentikasi, timeout, rate limit, dan audit log pada sistem nyata.
- Verifikasi output AI sebelum ditampilkan atau dipakai sebagai keputusan.

## Tugas

1. Tambahkan node database dan jelaskan protokolnya.
2. Jelaskan risiko jika AI service tidak tersedia.
3. Rancang fallback dan timeout.
4. Identifikasi data apa yang tidak boleh dikirim ke layanan AI eksternal.
