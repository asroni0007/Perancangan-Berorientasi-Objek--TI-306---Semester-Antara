# Minggu 10 — State Machine Diagram

**Terkait CPMK:** 31.2

## Tujuan

Mendesain state, transition, event, dan guard serta memastikan transisi ilegal
ditolak oleh implementasi.

## Artefak Diagram

- `diagrams/state-peminjaman.mmd`
- `diagrams/state-peminjaman.puml`

Diagram dan kode referensi telah memuat state `DIPERPANJANG` sebagai contoh sinkronisasi model dan implementasi.

## Cara Menjalankan

```bash
node index.js
```

## Tugas

1. Tambahkan guard perpanjangan berdasarkan tanggal jatuh tempo.
2. Buat pengujian transisi legal dan ilegal.
3. Pastikan semua state/transition pada diagram memiliki implementasi, dan
   setiap transisi implementasi terlihat pada diagram.
