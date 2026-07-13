// Minggu 6 — Dari Class Diagram ke Kode
// Class Diagram SIPUSTAKA (versi ringkas):
//
//   Perpustakaan "1" o-- "*" Buku        (agregasi: Perpustakaan menampung banyak Buku)
//   Perpustakaan "1" o-- "*" Anggota     (agregasi: Perpustakaan menampung banyak Anggota)
//   Peminjaman "*" --> "1" Buku          (asosiasi: tiap Peminjaman merujuk satu Buku)
//   Peminjaman "*" --> "1" Anggota       (asosiasi: tiap Peminjaman merujuk satu Anggota)
//
// Latihan prompt engineering (lihat README): coba minta AI membangkitkan Class
// Diagram dari deskripsi ini, lalu bandingkan hasilnya dengan struktur kode berikut.

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
  constructor(id, nama, email) {
    this.id = id;
    this.nama = nama;
    this.email = email;
  }
}

class Peminjaman {
  constructor(id, buku, anggota, tanggalPinjam) {
    this.id = id;
    this.buku = buku;       // asosiasi -> Buku
    this.anggota = anggota; // asosiasi -> Anggota
    this.tanggalPinjam = tanggalPinjam;
    this.status = "DIPINJAM";
  }
}

// Perpustakaan mengagregasi Buku, Anggota, dan Peminjaman (relasi "memiliki banyak").
class Perpustakaan {
  #buku = [];
  #anggota = [];
  #peminjaman = [];
  #nomorPeminjaman = 1;

  tambahBuku(buku) {
    this.#buku.push(buku);
  }

  tambahAnggota(anggota) {
    this.#anggota.push(anggota);
  }

  pinjamkan(isbn, idAnggota, tanggal) {
    const buku = this.#buku.find((b) => b.isbn === isbn);
    const anggota = this.#anggota.find((a) => a.id === idAnggota);
    if (!buku || !anggota) throw new Error("Buku/anggota tidak ditemukan.");
    if (buku.eksemplarTersedia <= 0) throw new Error("Stok habis.");

    buku.eksemplarTersedia -= 1;
    const peminjaman = new Peminjaman(this.#nomorPeminjaman++, buku, anggota, tanggal);
    this.#peminjaman.push(peminjaman);
    return peminjaman;
  }

  daftarPeminjamanAktif() {
    return this.#peminjaman.filter((p) => p.status === "DIPINJAM");
  }
}

// --- Simulasi ---
const perpus = new Perpustakaan();
perpus.tambahBuku(new Buku("978-1", "Clean Code", "Teknologi", 2));
perpus.tambahAnggota(new Anggota(1, "Rani", "rani@kampus.ac.id"));

const p1 = perpus.pinjamkan("978-1", 1, new Date("2026-02-01"));
console.log(`Peminjaman #${p1.id}: "${p1.buku.judul}" oleh ${p1.anggota.nama}, status: ${p1.status}`);

console.log("\nPeminjaman aktif:");
for (const p of perpus.daftarPeminjamanAktif()) {
  console.log(`  #${p.id} — ${p.buku.judul} (${p.anggota.nama})`);
}

console.log("\n=== TUGAS LATIHAN ===");
console.log("1. Tambahkan class Pustakawan dan relasikan ke Perpustakaan (asosiasi 1..* mengelola).");
console.log("2. Gunakan AI text-to-diagram untuk membangkitkan Class Diagram dari komentar di atas file ini,");
console.log("   lalu nilai hasilnya pakai Kerangka Evaluasi Kritis (traceability & kelengkapan relasi).");
