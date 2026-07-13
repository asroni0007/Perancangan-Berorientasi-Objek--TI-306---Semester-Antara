# Minggu 7 — Sequence Diagram

**Terkait CPMK:** 21.7

## Tujuan

Mendesain urutan pesan antar lifeline dan mengaudit kesesuaiannya dengan Use
Case Diagram, Class Diagram, serta urutan pemanggilan kode.

## Artefak Diagram

- `diagrams/sequence-ajukan-peminjaman.mmd`
- `diagrams/sequence-ajukan-peminjaman.puml`

## Cara Menjalankan

```bash
node index.js
```

## Verifikasi Kritis AI

Periksa apakah output AI:

- memakai lifeline yang memang tersedia pada Class Diagram;
- mengirim message ke object yang memiliki operasi terkait;
- memiliki jalur alternatif untuk stok habis;
- tidak mengarang database/service yang belum menjadi bagian desain;
- konsisten dengan log eksekusi kode.

## Tugas

1. Tambahkan jalur alternatif ketika layanan notifikasi gagal.
2. Cocokkan nomor pesan diagram dan log.
3. Lampirkan evaluasi manual vs AI.
