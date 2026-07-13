// Minggu 1 — Pengenalan Perancangan Berorientasi Objek
// Studi kasus: SIPUSTAKA (Sistem Perpustakaan Digital)
// Tujuan: membandingkan pendekatan PROSEDURAL vs BERORIENTASI OBJEK
// untuk kasus yang sama: menghitung denda keterlambatan pengembalian buku.

console.log("=== BAGIAN A: Pendekatan PROSEDURAL ===\n");

// Pendekatan prosedural: data (plain object) dan fungsi (logika) terpisah.
function buatPeminjamanProsedural(judulBuku, tanggalPinjam, tanggalKembali) {
  return { judulBuku, tanggalPinjam, tanggalKembali };
}

function hitungDendaProsedural(peminjaman, tarifPerHari = 500) {
  const batasHari = 7;
  const selisihHari = Math.floor(
    (peminjaman.tanggalKembali - peminjaman.tanggalPinjam) / (1000 * 60 * 60 * 24)
  );
  const telat = Math.max(0, selisihHari - batasHari);
  return telat * tarifPerHari;
}

const pinjam1 = buatPeminjamanProsedural(
  "Clean Code",
  new Date("2026-01-01"),
  new Date("2026-01-12")
);
console.log(`Denda (prosedural): Rp${hitungDendaProsedural(pinjam1)}`);
console.log(
  "Masalah: data & logika terpisah — siapa pun bisa lupa memanggil fungsi yang\n" +
  "benar, dan tidak ada yang menjaga konsistensi aturan bisnisnya.\n"
);

console.log("=== BAGIAN B: Pendekatan BERORIENTASI OBJEK ===\n");

// Pendekatan OOP: data (atribut) dan perilaku (method) dibungkus jadi satu class.
class PeminjamanBuku {
  #tarifPerHariTelat = 500;
  #batasHariPeminjaman = 7;

  constructor(judulBuku, tanggalPinjam, tanggalKembali) {
    this.judulBuku = judulBuku;
    this.tanggalPinjam = tanggalPinjam;
    this.tanggalKembali = tanggalKembali;
  }

  #hitungSelisihHari() {
    return Math.floor(
      (this.tanggalKembali - this.tanggalPinjam) / (1000 * 60 * 60 * 24)
    );
  }

  hitungDenda() {
    const telat = Math.max(0, this.#hitungSelisihHari() - this.#batasHariPeminjaman);
    return telat * this.#tarifPerHariTelat;
  }
}

const pinjam2 = new PeminjamanBuku(
  "Clean Code",
  new Date("2026-01-01"),
  new Date("2026-01-12")
);
console.log(`Denda (OOP): Rp${pinjam2.hitungDenda()}`);
console.log(
  "Keuntungan: logika denda 'menempel' pada objeknya sendiri (encapsulation);\n" +
  "tarif & batas hari jadi private (#) sehingga tidak bisa diubah sembarangan\n" +
  "dari luar object.\n"
);

console.log("=== TUGAS LATIHAN ===");
console.log("1. Tambahkan aturan: jika buku berkategori 'Referensi', tarif denda x2.");
console.log("2. Implementasikan aturan yang sama dengan gaya prosedural, lalu");
console.log("   bandingkan mana yang lebih mudah dijaga saat aturan bisnis berkembang.");
