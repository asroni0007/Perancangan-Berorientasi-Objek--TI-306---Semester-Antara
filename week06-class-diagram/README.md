# Minggu 6 — Class Diagram

**Terkait CPMK:** 21.6

## Tujuan

Mendesain struktur class, atribut, operasi, relasi, dan multiplicity serta
melatih prompt engineering untuk menghasilkan draf Class Diagram.

## Artefak Diagram

- `diagrams/class-sipustaka.mmd`
- `diagrams/class-sipustaka.puml`

## Konsep Kunci

- asosiasi `Peminjaman` ke `Buku` dan `Anggota`;
- agregasi `Perpustakaan` terhadap koleksi object;
- multiplicity harus sesuai implementasi object tunggal atau collection;
- visibility atribut/method harus konsisten dengan encapsulation.

## Cara Menjalankan

```bash
node index.js
```

## Prompt Engineering

Prompt minimal harus menyebutkan:

- daftar class dan tanggung jawab;
- atribut dan method penting;
- jenis relasi serta multiplicity;
- larangan menambahkan class yang tidak memiliki dasar requirement;
- format output Mermaid atau PlantUML.

## Tugas

1. Tambahkan class `Pustakawan` dan relasinya.
2. Buat baseline, draf AI, dan diagram final.
3. Periksa traceability setiap class dan relasi ke requirement.
