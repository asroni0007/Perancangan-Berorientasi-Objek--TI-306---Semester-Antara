// Minggu 2 — Konsep Class, Object, Atribut, dan Method
// Studi kasus: SIPUSTAKA — mendefinisikan entitas Buku

class Buku {
  constructor(isbn, judul, penulis, jumlahEksemplar) {
    this.isbn = isbn;                         // atribut
    this.judul = judul;                       // atribut
    this.penulis = penulis;                   // atribut
    this.jumlahEksemplar = jumlahEksemplar;    // atribut
    this.eksemplarTersedia = jumlahEksemplar;  // atribut
  }

  // method: perilaku yang dimiliki setiap object Buku
  pinjam() {
    if (this.eksemplarTersedia <= 0) {
      throw new Error(`Buku "${this.judul}" sedang tidak tersedia.`);
    }
    this.eksemplarTersedia -= 1;
    return true;
  }

  kembalikan() {
    if (this.eksemplarTersedia < this.jumlahEksemplar) {
      this.eksemplarTersedia += 1;
    }
  }

  info() {
    return `${this.judul} oleh ${this.penulis} — tersedia ${this.eksemplarTersedia}/${this.jumlahEksemplar}`;
  }
}

// --- Membuat beberapa OBJECT dari CLASS Buku yang sama ---
const buku1 = new Buku("978-1", "Clean Code", "Robert C. Martin", 2);
const buku2 = new Buku("978-2", "Design Patterns", "GoF", 1);

console.log("--- Data awal ---");
console.log(buku1.info());
console.log(buku2.info());

console.log("\n--- Simulasi peminjaman ---");
buku1.pinjam();
console.log(buku1.info());
buku2.pinjam();
console.log(buku2.info());

try {
  buku2.pinjam(); // eksemplar habis -> harus gagal
} catch (err) {
  console.log(`Gagal meminjam: ${err.message}`);
}

console.log("\n=== TUGAS LATIHAN ===");
console.log("1. Tambahkan atribut 'kategori' dan method isReferensi().");
console.log("2. Buat 3 object Buku baru, simpan dalam array, lalu cetak info()");
console.log("   semuanya memakai perulangan (for...of atau forEach).");
