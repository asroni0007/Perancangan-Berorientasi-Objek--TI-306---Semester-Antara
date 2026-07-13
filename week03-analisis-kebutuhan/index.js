// Minggu 3 — Dari Analisis Kebutuhan ke Skeleton Class
// Lihat requirements.md untuk daftar kebutuhan & user story lengkap.
//
// Di tahap ini kita BELUM mengimplementasikan logika — tujuannya adalah
// menerjemahkan entitas yang teridentifikasi dari kebutuhan menjadi
// "kerangka" class (constructor + nama method saja). Implementasi penuh
// menyusul di Minggu 4-7 seiring pemodelan UML.

class Buku {
  constructor(isbn, judul, penulis, jumlahEksemplar) {
    this.isbn = isbn;
    this.judul = judul;
    this.penulis = penulis;
    this.jumlahEksemplar = jumlahEksemplar;
  }
}

class Anggota {
  constructor(id, nama, email) {
    this.id = id;
    this.nama = nama;
    this.email = email;
  }

  // TODO (Minggu 4): implementasikan setelah Use Case Diagram selesai
  cariBuku(kataKunci) {
    throw new Error("Belum diimplementasikan — lihat Minggu 4");
  }
}

class Peminjaman {
  constructor(buku, anggota, tanggalPinjam) {
    this.buku = buku;
    this.anggota = anggota;
    this.tanggalPinjam = tanggalPinjam;
    this.status = "PENGAJUAN"; // akan menjadi state machine di Minggu 10
  }
}

class Pustakawan {
  constructor(id, nama) {
    this.id = id;
    this.nama = nama;
  }

  // TODO (Minggu 4): implementasikan setelah Use Case Diagram selesai
  tambahBuku(dataBuku) {
    throw new Error("Belum diimplementasikan — lihat Minggu 4");
  }
}

console.log("Skeleton class hasil analisis kebutuhan berhasil dimuat:");
console.log("- Buku, Anggota, Peminjaman, Pustakawan");
console.log("\nCoba jalankan salah satu method yang belum diimplementasikan:");
try {
  const anggota = new Anggota(1, "Rani", "rani@kampus.ac.id");
  anggota.cariBuku("Clean Code");
} catch (err) {
  console.log(`-> ${err.message}`);
}

console.log("\n=== TUGAS LATIHAN ===");
console.log("1. Baca requirements.md, lengkapi kebutuhan & user story sesuai instruksi.");
console.log("2. Jika kebutuhan tambahanmu butuh entitas baru, tambahkan skeleton class-nya di sini.");
