// Minggu 12 — Prinsip Perancangan Berorientasi Objek
// Encapsulation, Inheritance, Polymorphism — didemonstrasikan lewat hierarki Anggota.

// --- ENCAPSULATION: field privat (#) + akses terkontrol lewat getter ---
class Anggota {
  #tunggakan = 0; // tidak bisa diakses/diubah langsung dari luar class

  constructor(id, nama) {
    if (new.target === Anggota) {
      throw new Error("Anggota adalah class dasar abstrak, gunakan Mahasiswa atau Staf.");
    }
    this.id = id;
    this.nama = nama;
  }

  get tunggakan() {
    return this.#tunggakan;
  }

  tambahTunggakan(jumlah) {
    if (jumlah < 0) throw new Error("Jumlah tunggakan tidak boleh negatif.");
    this.#tunggakan += jumlah;
  }

  bayarTunggakan(jumlah) {
    this.#tunggakan = Math.max(0, this.#tunggakan - jumlah);
  }

  // Method yang akan di-override oleh subclass (dasar untuk polymorphism)
  batasPinjam() {
    throw new Error("batasPinjam() harus diimplementasikan oleh subclass.");
  }

  ringkasan() {
    return `${this.nama} (${this.constructor.name}) — batas pinjam: ${this.batasPinjam()}, tunggakan: Rp${this.#tunggakan}`;
  }
}

// --- INHERITANCE: Mahasiswa & Staf mewarisi Anggota ---
class Mahasiswa extends Anggota {
  constructor(id, nama, nim) {
    super(id, nama);
    this.nim = nim;
  }

  // --- POLYMORPHISM: implementasi batasPinjam() berbeda dari Staf ---
  batasPinjam() {
    return 3;
  }
}

class Staf extends Anggota {
  constructor(id, nama, nip) {
    super(id, nama);
    this.nip = nip;
  }

  batasPinjam() {
    return 10;
  }
}

// --- Demonstrasi ---
const daftarAnggota = [
  new Mahasiswa(1, "Rani", "2201001"),
  new Staf(2, "Pak Budi", "198001"),
];

console.log("--- Polymorphism: method sama, hasil beda per subclass ---");
for (const a of daftarAnggota) {
  console.log(a.ringkasan());
}

console.log("\n--- Encapsulation: tunggakan tidak bisa diubah paksa dari luar ---");
const rani = daftarAnggota[0];
rani.tambahTunggakan(5000);
console.log(`Tunggakan Rani (lewat getter): Rp${rani.tunggakan}`);
console.log("Percobaan rani.#tunggakan = 0 dari luar class akan GAGAL di-compile (SyntaxError),");
console.log("karena # membuatnya benar-benar privat di JavaScript, bukan sekadar konvensi.");

console.log("\n--- Inheritance: coba instantiate class dasar langsung ---");
try {
  new Anggota(99, "Tidak Sah");
} catch (err) {
  console.log(`Gagal (sesuai desain): ${err.message}`);
}

console.log("\n=== TUGAS LATIHAN ===");
console.log("1. Tambahkan subclass Dosen dengan batasPinjam() sendiri (mis. 15).");
console.log("2. [AI code review] Minta AI meninjau file ini untuk pelanggaran prinsip OOP,");
console.log("   lalu nilai temuannya pakai Kerangka Evaluasi Kritis — apakah semua temuan AI relevan?");
