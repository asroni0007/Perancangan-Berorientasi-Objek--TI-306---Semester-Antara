# Minggu 9 — Communication Diagram

**Terkait CPMK:** 31.1

## Tujuan

Memodelkan hubungan object dan pesan bernomor. Communication Diagram menekankan
struktur kolaborasi; implementasi `EventEmitter` hanyalah salah satu contoh
komunikasi decoupled dan bukan definisi Communication Diagram itu sendiri.

## Artefak Diagram

- `diagrams/communication-peminjaman.mmd`
- `diagrams/communication-peminjaman.puml`

## Cara Menjalankan

```bash
node index.js
```

## Tugas

1. Bandingkan dengan Sequence Diagram Minggu 7.
2. Tambahkan correlation ID pada semua pesan agar satu transaksi mudah ditelusuri.
3. Pastikan penomoran pesan menunjukkan hierarki `1`, `1.1`, `1.2`, dan seterusnya.
4. Jelaskan kapan direct call lebih sederhana daripada event-driven.
