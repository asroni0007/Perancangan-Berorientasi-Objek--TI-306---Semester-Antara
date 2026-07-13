# Minggu 4 — Use Case Diagram

**Terkait CPMK:** 21.4

## Tujuan

Memodelkan aktor dan fungsi sistem, membangkitkan draf text-to-diagram, lalu
memvalidasi hasil AI terhadap requirement.

## Artefak Diagram

- `diagrams/use-case-reference.mmd`
- `diagrams/use-case-reference.puml`

Versi Mermaid menggunakan flowchart agar mudah dirender pada editor Mermaid.
Versi PlantUML menggunakan notasi use case UML.

## Alur Tugas Wajib

1. Buat baseline manual dari `week03-analisis-kebutuhan/requirements.md`.
2. Bangkitkan draf dengan AI text-to-diagram.
3. Bandingkan aktor, batas sistem, use case, dan relasi `include/extend`.
4. Buat versi final Mermaid atau PlantUML.
5. Isi `templates/evaluasi-output-ai.md` dan matriks traceability.

## Keterkaitan dengan Kode

Class `SistemPerpustakaan` berperan sebagai fasad. Use case publik direalisasikan
sebagai method publik, tetapi satu use case tidak selalu harus identik dengan
satu method pada desain yang lebih kompleks.

## Cara Menjalankan

```bash
node index.js
```

## Tugas Latihan

1. Tambahkan use case `Lihat Riwayat Peminjaman` dan implementasinya.
2. Pastikan use case tersebut memiliki aturan validasi yang dapat ditelusuri.
3. Jelaskan perbedaan antara use case pengguna dan method internal sistem.
