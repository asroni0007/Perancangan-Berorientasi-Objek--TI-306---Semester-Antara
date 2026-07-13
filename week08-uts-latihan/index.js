// Minggu 8 — UTS (Latihan Mandiri, BUKAN soal ujian resmi)
// File ini menggabungkan konsep Minggu 1-7 dalam satu studi kasus mini untuk
// latihan menjelang UTS. Soal ujian sesungguhnya ditentukan oleh dosen.

// --- Kelas inti hasil Minggu 2 & 6 ---
class Buku {
  constructor(isbn, judul, kategori, jumlahEksemplar) {
    this.isbn = isbn;
    this.judul = judul;
    this.kategori = kategori;
    this.jumlahEksemplar = jumlahEksemplar;
    this.eksemplarTersedia = jumlahEksemplar;
  }
}

class Anggota {
  constructor(id, nama, tunggakan = 0) {
    this.id = id;
    this.nama = nama;
    this.tunggakan = tunggakan;
  }
}

class Peminjaman {
  constructor(id, buku, anggota) {
    this.id = id;
    this.buku = buku;
    this.anggota = anggota;
    this.status = "DIPINJAM";
  }
}

// --- Fasad hasil Minggu 4, dengan alur keputusan hasil Minggu 5 ---
class SistemPerpustakaan {
  #buku = [];
  #anggota = [];
  #peminjaman = [];
  #nomor = 1;

  tambahBuku(buku) {
    this.#buku.push(buku);
  }

  tambahAnggota(anggota) {
    this.#anggota.push(anggota);
  }

  cariBuku(kataKunci) {
    return this.#buku.filter((b) => b.judul.toLowerCase().includes(kataKunci.toLowerCase()));
  }

  // Menggabungkan decision node Minggu 5 + pemanggilan berurutan ala Minggu 7
  ajukanPeminjaman(isbn, idAnggota) {
    const buku = this.#buku.find((b) => b.isbn === isbn);
    const anggota = this.#anggota.find((a) => a.id === idAnggota);
    if (!buku) throw new Error("Buku tidak ditemukan.");
    if (!anggota) throw new Error("Anggota tidak ditemukan.");
    if (buku.eksemplarTersedia <= 0) throw new Error("Stok buku habis.");
    if (anggota.tunggakan > 0) throw new Error("Anggota masih punya tunggakan.");

    buku.eksemplarTersedia -= 1;
    const peminjaman = new Peminjaman(this.#nomor++, buku, anggota);
    this.#peminjaman.push(peminjaman);
    return peminjaman;
  }

  daftarPeminjamanAktif() {
    return this.#peminjaman.filter((p) => p.status === "DIPINJAM");
  }
}

// --- Simulasi ---
const sistem = new SistemPerpustakaan();
sistem.tambahBuku(new Buku("978-1", "Clean Code", "Teknologi", 2));
sistem.tambahAnggota(new Anggota(1, "Rani"));
sistem.tambahAnggota(new Anggota(2, "Budi", 15000));

console.log("Cari 'clean' ->", sistem.cariBuku("clean").map((b) => b.judul));
console.log("Rani meminjam ->", sistem.ajukanPeminjaman("978-1", 1));

try {
  sistem.ajukanPeminjaman("978-1", 2);
} catch (err) {
  console.log(`Budi gagal meminjam -> ${err.message}`);
}

console.log("\n=== SOAL LATIHAN MANDIRI (bukan soal UTS resmi) ===");
console.log("1. [Class Diagram] Gambar Class Diagram lengkap dari kode di atas beserta multiplisitasnya.");
console.log("2. [Sequence Diagram] Buat Sequence Diagram untuk skenario Budi gagal meminjam di atas.");
console.log("3. [Coding] Tambahkan method kembalikanBuku(isbn) yang juga mengurangi tunggakan jika ada denda.");
console.log("4. [Konseptual] Jelaskan mengapa #buku, #anggota, #peminjaman dibuat private,");
console.log("   dan apa risikonya jika dibuat public.");
