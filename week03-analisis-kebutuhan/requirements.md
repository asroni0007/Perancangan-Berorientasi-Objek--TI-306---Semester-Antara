# Analisis Kebutuhan — SIPUSTAKA

## Kebutuhan Fungsional (contoh awal, lengkapi sesuai tugas)

1. Anggota dapat mencari buku berdasarkan judul/kategori.
2. Anggota dapat mengajukan peminjaman buku yang tersedia.
3. Anggota dapat mengembalikan buku yang sedang dipinjam.
4. Pustakawan dapat menambah/mengubah data buku.
5. Pustakawan dapat mendaftarkan anggota baru.

## Kebutuhan Non-Fungsional (contoh awal)

1. Sistem harus menolak peminjaman jika stok buku habis (integritas data).
2. Riwayat peminjaman harus tetap tersimpan meskipun buku sudah dikembalikan.

## User Story

Format: *Sebagai [peran], saya ingin [aksi], agar [tujuan].*

- Sebagai **anggota**, saya ingin mencari buku berdasarkan judul, agar saya cepat
  menemukan buku yang saya butuhkan.
- Sebagai **anggota**, saya ingin meminjam buku yang tersedia, agar saya bisa
  membacanya di luar perpustakaan.
- Sebagai **anggota**, saya ingin melihat tanggal jatuh tempo pengembalian, agar
  saya tidak terkena denda.
- Sebagai **pustakawan**, saya ingin menambahkan judul buku baru, agar koleksi
  perpustakaan selalu ter-update.

## Identifikasi Entitas Awal (calon class)

Dari kebutuhan di atas, entitas yang teridentifikasi: `Buku`, `Anggota`,
`Peminjaman`, `Pustakawan`. Entitas ini akan menjadi dasar Class Diagram di
Minggu 6.

---

## TUGAS LATIHAN
1. Tambahkan minimal **5 kebutuhan fungsional** dan **2 kebutuhan non-fungsional** lain.
2. Tulis minimal **3 user story** tambahan (boleh untuk peran pustakawan).
3. Berdasarkan kebutuhan tambahanmu, apakah ada entitas baru yang perlu
   ditambahkan ke `index.js`? Sebutkan.
