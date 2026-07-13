// Minggu 15 — Presentasi Hasil Perancangan (Demo End-to-End)
// Skrip ini menyatukan seluruh konsep Minggu 1-14 menjadi satu alur demo
// utuh: dari pendaftaran anggota sampai notifikasi jatuh tempo, memakai
// entitas & pola yang sudah dibangun sepanjang praktikum. Cocok dipakai
// sebagai bahan presentasi kelompok (live demo, bukan hanya slide).

import { EventEmitter } from "node:events";

// --- Entitas inti (ringkasan dari Minggu 2, 6, 12) ---
class Anggota {
  #tunggakan = 0;
  constructor(id, nama) {
    if (new.target === Anggota) throw new Error("Gunakan Mahasiswa/Staf.");
    this.id = id;
    this.nama = nama;
  }
  get tunggakan() { return this.#tunggakan; }
  batasPinjam() { throw new Error("Harus di-override subclass."); }
}
class Mahasiswa extends Anggota {
  constructor(id, nama, nim) { super(id, nama); this.nim = nim; }
  batasPinjam() { return 3; }
}

class Buku {
  constructor(isbn, judul, jumlahEksemplar) {
    this.isbn = isbn; this.judul = judul;
    this.jumlahEksemplar = jumlahEksemplar;
    this.eksemplarTersedia = jumlahEksemplar;
  }
}

// --- State machine (ringkasan Minggu 10) ---
class Peminjaman {
  static #transisiValid = {
    PENGAJUAN: ["DIPINJAM"], DIPINJAM: ["DIKEMBALIKAN"], DIKEMBALIKAN: ["SELESAI"], SELESAI: [],
  };
  #status = "PENGAJUAN";
  constructor(id, buku, anggota) { this.id = id; this.buku = buku; this.anggota = anggota; }
  get status() { return this.#status; }
  ubahStatus(baru) {
    if (!Peminjaman.#transisiValid[this.#status].includes(baru)) {
      throw new Error(`Transisi ${this.#status} -> ${baru} tidak valid.`);
    }
    this.#status = baru;
  }
}

// --- Singleton Katalog (ringkasan Minggu 13) ---
class KatalogPerpustakaan {
  static #instance = null;
  #buku = new Map();
  static getInstance() {
    if (!KatalogPerpustakaan.#instance) KatalogPerpustakaan.#instance = new KatalogPerpustakaan();
    return KatalogPerpustakaan.#instance;
  }
  tambah(buku) { this.#buku.set(buku.isbn, buku); }
  cari(isbn) { return this.#buku.get(isbn); }
}

// --- Observer notifikasi (ringkasan Minggu 13) ---
class LayananNotifikasi extends EventEmitter {
  konfirmasi(anggota, buku) {
    console.log(`  [NOTIFIKASI] ${anggota.nama}, peminjaman "${buku.judul}" berhasil.`);
  }
}

// --- Fasad sistem (ringkasan Minggu 4, 5, 7, 9) ---
class SistemPerpustakaan {
  #katalog = KatalogPerpustakaan.getInstance();
  #notifikasi = new LayananNotifikasi();
  #nomor = 1;

  tambahBuku(buku) { this.#katalog.tambah(buku); }

  ajukanPeminjaman(anggota, isbn) {
    console.log(`\n>> ${anggota.nama} mengajukan peminjaman ${isbn}`);
    const buku = this.#katalog.cari(isbn);
    if (!buku) throw new Error("Buku tidak ditemukan.");
    if (buku.eksemplarTersedia <= 0) throw new Error("Stok habis.");
    if (anggota.tunggakan > 0) throw new Error("Anggota punya tunggakan.");

    buku.eksemplarTersedia -= 1;
    const peminjaman = new Peminjaman(this.#nomor++, buku, anggota);
    peminjaman.ubahStatus("DIPINJAM");
    this.#notifikasi.konfirmasi(anggota, buku);
    return peminjaman;
  }
}

// ============================================================
// DEMO END-TO-END
// ============================================================
console.log("========================================");
console.log(" DEMO SIPUSTAKA — Sistem Perpustakaan Digital");
console.log("========================================");

const sistem = new SistemPerpustakaan();
sistem.tambahBuku(new Buku("978-1", "Clean Code", 2));
sistem.tambahBuku(new Buku("978-2", "Design Patterns", 1));

const rani = new Mahasiswa(1, "Rani", "2201001");
console.log(`\nAnggota terdaftar: ${rani.nama} (batas pinjam: ${rani.batasPinjam()})`);

const peminjaman1 = sistem.ajukanPeminjaman(rani, "978-1");
console.log(`Status peminjaman #${peminjaman1.id}: ${peminjaman1.status}`);

peminjaman1.ubahStatus("DIKEMBALIKAN");
peminjaman1.ubahStatus("SELESAI");
console.log(`Status akhir peminjaman #${peminjaman1.id}: ${peminjaman1.status}`);

console.log("\n========================================");
console.log(" Demo selesai. Ini adalah rangkuman dari Minggu 1-14.");
console.log("========================================");

console.log("\n=== TUGAS LATIHAN (persiapan presentasi) ===");
console.log("1. Siapkan naskah presentasi 5 menit yang menjelaskan tiap bagian demo ini");
console.log("   sambil menunjuk ke diagram UML yang bersesuaian (Minggu 4-10).");
console.log("2. Siapkan transparansi penggunaan AI selama pengerjaan proyek kelompok,");
console.log("   sesuai format pada Kebijakan Etika AI di RPS.");
