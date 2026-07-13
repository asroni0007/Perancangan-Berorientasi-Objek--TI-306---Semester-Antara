// Minggu 13 — Design Pattern: Singleton, Factory, Observer
// Ketiga pola diterapkan langsung pada studi kasus SIPUSTAKA.

// ============================================================
// 1) SINGLETON — hanya boleh ada SATU KatalogPerpustakaan di seluruh aplikasi
// ============================================================
class KatalogPerpustakaan {
  static #instance = null;
  #buku = new Map();

  constructor() {
    if (KatalogPerpustakaan.#instance) {
      throw new Error("Gunakan KatalogPerpustakaan.getInstance(), jangan new langsung.");
    }
  }

  static getInstance() {
    if (!KatalogPerpustakaan.#instance) {
      KatalogPerpustakaan.#instance = new KatalogPerpustakaan();
    }
    return KatalogPerpustakaan.#instance;
  }

  tambah(buku) {
    this.#buku.set(buku.isbn, buku);
  }

  semua() {
    return [...this.#buku.values()];
  }
}

console.log("=== 1) SINGLETON ===");
const katalogA = KatalogPerpustakaan.getInstance();
const katalogB = KatalogPerpustakaan.getInstance();
katalogA.tambah({ isbn: "978-1", judul: "Clean Code" });
console.log("katalogA === katalogB ->", katalogA === katalogB);
console.log("Buku terlihat dari katalogB juga:", katalogB.semua());

// ============================================================
// 2) FACTORY — membuat jenis Anggota yang tepat tanpa if/else berserakan
//    di banyak tempat pemanggil
// ============================================================
class Mahasiswa {
  constructor(id, nama, nim) {
    this.id = id; this.nama = nama; this.nim = nim; this.batasPinjam = 3;
  }
}
class Staf {
  constructor(id, nama, nip) {
    this.id = id; this.nama = nama; this.nip = nip; this.batasPinjam = 10;
  }
}

class AnggotaFactory {
  static buat(tipe, id, nama, nomorIdentitas) {
    switch (tipe) {
      case "mahasiswa":
        return new Mahasiswa(id, nama, nomorIdentitas);
      case "staf":
        return new Staf(id, nama, nomorIdentitas);
      default:
        throw new Error(`Tipe anggota tidak dikenal: ${tipe}`);
    }
  }
}

console.log("\n=== 2) FACTORY ===");
const rani = AnggotaFactory.buat("mahasiswa", 1, "Rani", "2201001");
const budi = AnggotaFactory.buat("staf", 2, "Pak Budi", "198001");
console.log(rani, budi);

// ============================================================
// 3) OBSERVER — anggota "berlangganan" notifikasi jatuh tempo,
//    tanpa LayananNotifikasi perlu tahu detail tiap anggota
// ============================================================
class LayananNotifikasi {
  #pelanggan = [];

  subscribe(pelanggan) {
    this.#pelanggan.push(pelanggan);
  }

  beriTahuJatuhTempo(judulBuku) {
    for (const p of this.#pelanggan) {
      p.terimaNotifikasi(`Pengingat: "${judulBuku}" jatuh tempo besok.`);
    }
  }
}

class PelangganNotifikasi {
  constructor(nama) {
    this.nama = nama;
  }
  terimaNotifikasi(pesan) {
    console.log(`  [Notifikasi ke ${this.nama}] ${pesan}`);
  }
}

console.log("\n=== 3) OBSERVER ===");
const layanan = new LayananNotifikasi();
layanan.subscribe(new PelangganNotifikasi("Rani"));
layanan.subscribe(new PelangganNotifikasi("Pak Budi"));
layanan.beriTahuJatuhTempo("Clean Code");

console.log("\n=== TUGAS LATIHAN ===");
console.log("1. [AI pattern recommendation] Deskripsikan ke AI kebutuhan: 'perlu cara membuat");
console.log("   objek Laporan dalam format PDF/CSV/Excel tanpa banyak if/else'. Bandingkan saran");
console.log("   pola dari AI dengan pola Factory di atas — apakah relevan?");
console.log("2. Refactor AnggotaFactory memakai Map<tipe, constructor> agar bebas if/else,");
console.log("   lalu jelaskan alasan mengapa itu tergolong 'Factory yang lebih baik' atau tidak.");
