# Minggu 5 — Activity Diagram

**Terkait CPMK:** 21.5

## Tujuan

Memodelkan workflow, decision node, guard condition, dan jalur alternatif;
kemudian membandingkan baseline manual dengan draf AI.

## Artefak Diagram

- `diagrams/activity-peminjaman.mmd`
- `diagrams/activity-peminjaman.puml`

## Traceability ke Kode

- decision `Buku tersedia?` → pemeriksaan `eksemplarTersedia`;
- decision `Ada tunggakan?` → pemeriksaan `anggota.tunggakan`;
- decision `Buku aktif >= 3?` → tugas pengembangan kode;
- action peminjaman → pengurangan stok dan pembuatan catatan.

## Cara Menjalankan

```bash
node index.js
```

## Tugas Wajib Manual–AI–Final

1. Buat baseline Activity Diagram tanpa AI.
2. Minta AI membuat diagram dari requirement yang sama.
3. Catat node yang hilang, berlebih, atau salah guard.
4. Tambahkan satu guard baru untuk buku kategori Referensi dan perbarui kode/diagram final.
5. Lampirkan evaluasi output AI.
