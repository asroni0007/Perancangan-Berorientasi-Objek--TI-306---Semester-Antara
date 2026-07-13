// Minggu 10 — State Machine Diagram

class StatusPeminjamanTidakValid extends Error {}

class Peminjaman {
  static #transisiValid = {
    PENGAJUAN: ["DIPINJAM", "DITOLAK"],
    DIPINJAM: ["DIPERPANJANG", "DIKEMBALIKAN", "TERLAMBAT"],
    DIPERPANJANG: ["DIKEMBALIKAN", "TERLAMBAT"],
    TERLAMBAT: ["DIKEMBALIKAN"],
    DIKEMBALIKAN: ["SELESAI"],
    DITOLAK: [],
    SELESAI: [],
  };

  #status = "PENGAJUAN";

  constructor(id, judulBuku) {
    this.id = id;
    this.judulBuku = judulBuku;
    this.riwayatStatus = ["PENGAJUAN"];
  }

  get status() {
    return this.#status;
  }

  ubahStatus(statusBaru) {
    const diizinkan = Peminjaman.#transisiValid[this.#status] || [];
    if (!diizinkan.includes(statusBaru)) {
      throw new StatusPeminjamanTidakValid(
        `Transisi ${this.#status} -> ${statusBaru} tidak diizinkan. ` +
        `Transisi valid: [${diizinkan.join(", ") || "-"}]`
      );
    }
    console.log(`  [TRANSISI] ${this.#status} -> ${statusBaru}`);
    this.#status = statusBaru;
    this.riwayatStatus.push(statusBaru);
  }
}

console.log("Skenario 1: normal");
const p1 = new Peminjaman(1, "Clean Code");
p1.ubahStatus("DIPINJAM");
p1.ubahStatus("DIKEMBALIKAN");
p1.ubahStatus("SELESAI");
console.log("Riwayat:", p1.riwayatStatus.join(" -> "));

console.log("\nSkenario 2: diperpanjang lalu terlambat");
const p2 = new Peminjaman(2, "Design Patterns");
p2.ubahStatus("DIPINJAM");
p2.ubahStatus("DIPERPANJANG");
p2.ubahStatus("TERLAMBAT");
p2.ubahStatus("DIKEMBALIKAN");
p2.ubahStatus("SELESAI");
console.log("Riwayat:", p2.riwayatStatus.join(" -> "));

console.log("\nSkenario 3: transisi ilegal");
const p3 = new Peminjaman(3, "Refactoring");
try {
  p3.ubahStatus("SELESAI");
} catch (error) {
  console.log(`  [DITOLAK] ${error.message}`);
}

console.log("\n=== TUGAS LATIHAN ===");
console.log("1. Tambahkan guard: perpanjangan hanya boleh sebelum jatuh tempo.");
console.log("2. Tambahkan observer audit untuk setiap perubahan state.");
console.log("3. Pastikan diagram dan tabel transisi tetap sinkron.");
