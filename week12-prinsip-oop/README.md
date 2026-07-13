# Minggu 12 — Prinsip Perancangan Berorientasi Objek

**Terkait CPMK:** 31.4

## Tujuan
Mempraktikkan tiga prinsip inti OOP dalam satu contoh yang saling terkait:
encapsulation, inheritance, dan polymorphism.

## Konsep Kunci
- **Encapsulation**: `#tunggakan` benar-benar privat di JavaScript (bukan
  konvensi `_namaVariabel`), diakses lewat getter
- **Inheritance**: `Mahasiswa` dan `Staf` mewarisi `Anggota`
- **Polymorphism**: method `batasPinjam()` sama namanya, tapi hasilnya beda
  tergantung object mana yang memanggilnya

## Titik Verifikasi AI (wajib untuk tugas)
1. Minta AI code review (assistant atau agent) meninjau `index.js`.
2. Catat semua temuannya.
3. Nilai tiap temuan dengan Kerangka Evaluasi Kritis — apakah ada temuan
   yang tidak relevan/berlebihan (over-flagging)? Ini melatih kewaspadaan
   terhadap *AI technical debt* bila saran AI diterima mentah-mentah.

## Cara Menjalankan
```bash
node index.js
```

## Tugas Latihan
1. Tambahkan subclass `Dosen` dengan `batasPinjam()` sendiri (mis. 15).
2. Lakukan titik verifikasi AI di atas dan lampirkan hasil evaluasinya.
