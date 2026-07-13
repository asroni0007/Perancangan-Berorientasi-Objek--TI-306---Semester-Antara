// Minggu 16 — UAS (Latihan Mandiri, BUKAN soal ujian resmi)
// Menggabungkan konsep Minggu 9-15: communication style, state machine,
// prinsip OOP, design pattern, dan integrasi end-to-end.

class Anggota {
  #tunggakan = 0;
  constructor(id, nama) {
    if (new.target === Anggota) throw new Error("Gunakan Mahasiswa/Staf.");
    this.id = id;
    this.nama = nama;
  }
  get tunggakan() { return this.#tunggakan; }
  tambahTunggakan(jumlah) { this.#tunggakan += jumlah; }
  batasPinjam() { throw new Error("Harus di-override subclass."); }
}
class Mahasiswa extends Anggota {
  constructor(id, nama, nim) { super(id, nama); this.nim = nim; }
  batasPinjam() { return 3; }
}
class Staf extends Anggota {
  constructor(id, nama, nip) { super(id, nama); this.nip = nip; }
  batasPinjam() { return 10; }
}

class Buku {
  constructor(isbn, judul, jumlahEksemplar) {
    this.isbn = isbn; this.judul = judul;
    this.jumlahEksemplar = jumlahEksemplar;
    this.eksemplarTersedia = jumlahEksemplar;
  }
}

// State machine (Minggu 10)
class Peminjaman {
  static #transisiValid = {
    PENGAJUAN: ["DIPINJAM", "DITOLAK"],
    DIPINJAM: ["DIKEMBALIKAN", "TERLAMBAT"],
    TERLAMBAT: ["DIKEMBALIKAN"],
    DIKEMBALIKAN: ["SELESAI"],
    DITOLAK: [], SELESAI: [],
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

// Singleton + Factory (Minggu 13)
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

class AnggotaFactory {
  static buat(tipe, id, nama, nomorIdentitas) {
    if (tipe === "mahasiswa") return new Mahasiswa(id, nama, nomorIdentitas);
    if (tipe === "staf") return new Staf(id, nama, nomorIdentitas);
    throw new Error(`Tipe tidak dikenal: ${tipe}`);
  }
}

// --- Simulasi ---
const katalog = KatalogPerpustakaan.getInstance();
katalog.tambah(new Buku("978-1", "Clean Code", 1));

const rani = AnggotaFactory.buat("mahasiswa", 1, "Rani", "2201001");
const buku = katalog.cari("978-1");

console.log(`Anggota: ${rani.nama}, batas pinjam: ${rani.batasPinjam()}`);

const peminjaman = new Peminjaman(1, buku, rani);
peminjaman.ubahStatus("DIPINJAM");
console.log(`Status: ${peminjaman.status}`);

peminjaman.ubahStatus("TERLAMBAT");
console.log(`Status: ${peminjaman.status}`);

try {
  peminjaman.ubahStatus("SELESAI"); // langsung loncat dari TERLAMBAT -> harus gagal
} catch (err) {
  console.log(`Ditolak (sesuai desain): ${err.message}`);
}

peminjaman.ubahStatus("DIKEMBALIKAN");
peminjaman.ubahStatus("SELESAI");
console.log(`Status akhir: ${peminjaman.status}`);

console.log("\n=== SOAL LATIHAN MANDIRI (bukan soal UAS resmi) ===");
console.log("1. [State Machine] Tambahkan state DIPERPANJANG pada tabel transisi, dan buktikan");
console.log("   lewat kode bahwa transisi ilegal ke state itu tetap ditolak.");
console.log("2. [Design Pattern] Tambahkan Observer yang mencatat SETIAP perubahan status");
console.log("   Peminjaman ke sebuah log array (Audit Trail).");
console.log("3. [Deployment] Jelaskan (tulisan) bagaimana KatalogPerpustakaan (Singleton) bisa");
console.log("   bermasalah jika sistem di-deploy dengan banyak instance server (horizontal scaling).");
console.log("4. [Dokumentasi & Integritas Akademik] Susun ringkasan proyek akhir 1 halaman,");
console.log("   sertakan transparansi penggunaan AI sesuai kebijakan RPS.");
