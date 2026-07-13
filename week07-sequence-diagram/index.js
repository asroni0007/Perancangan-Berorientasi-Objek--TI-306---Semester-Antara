// Minggu 7 — Dari Sequence Diagram ke Kode
// Nomor log diselaraskan dengan diagram sequence referensi.

class Katalog {
  #buku = new Map();

  tambah(buku) {
    this.#buku.set(buku.isbn, buku);
  }

  cekKetersediaan(isbn) {
    console.log(`4: Katalog --> SistemPerpustakaan: status ketersediaan (${isbn})`);
    const buku = this.#buku.get(isbn);
    return Boolean(buku && buku.eksemplarTersedia > 0);
  }

  kurangiStok(isbn) {
    const buku = this.#buku.get(isbn);
    buku.eksemplarTersedia -= 1;
    console.log(`6: Katalog --> SistemPerpustakaan: stok diperbarui (${buku.eksemplarTersedia})`);
  }

  cari(isbn) {
    return this.#buku.get(isbn);
  }
}

class LayananNotifikasi {
  kirimKonfirmasi(anggota, buku) {
    console.log(`8: LayananNotifikasi --> Anggota: peminjaman "${buku.judul}" berhasil`);
    return { tujuan: anggota.nama, terkirim: true };
  }
}

class SistemPerpustakaan {
  #katalog = new Katalog();
  #notifikasi = new LayananNotifikasi();

  get katalog() {
    return this.#katalog;
  }

  ajukanPeminjaman(anggota, isbn) {
    console.log(`1: Anggota --> SistemPerpustakaan: ajukanPeminjaman(${isbn})`);
    console.log("2: SistemPerpustakaan -> SistemPerpustakaan: validasi anggota");
    console.log(`3: SistemPerpustakaan --> Katalog: cekKetersediaan(${isbn})`);

    const tersedia = this.#katalog.cekKetersediaan(isbn);
    if (!tersedia) {
      console.log("5a: SistemPerpustakaan --> Anggota: peminjaman ditolak");
      return { berhasil: false, alasan: "STOK_HABIS" };
    }

    console.log(`5: SistemPerpustakaan --> Katalog: kurangiStok(${isbn})`);
    this.#katalog.kurangiStok(isbn);
    const buku = this.#katalog.cari(isbn);
    console.log("7: SistemPerpustakaan --> LayananNotifikasi: kirimKonfirmasi()");
    this.#notifikasi.kirimKonfirmasi(anggota, buku);
    console.log("9: SistemPerpustakaan --> Anggota: data peminjaman");
    return { berhasil: true, buku };
  }
}

class Anggota {
  constructor(id, nama) {
    this.id = id;
    this.nama = nama;
  }
}

const sistem = new SistemPerpustakaan();
sistem.katalog.tambah({ isbn: "978-1", judul: "Clean Code", eksemplarTersedia: 1 });

const hasil = sistem.ajukanPeminjaman(new Anggota(1, "Rani"), "978-1");
console.log(`\nHasil akhir: ${hasil.berhasil ? "berhasil" : "gagal"}`);

console.log("\n=== TUGAS LATIHAN ===");
console.log("1. Tambahkan jalur alternatif kegagalan pengiriman notifikasi.");
console.log("2. Jelaskan apakah kegagalan notifikasi harus membatalkan peminjaman.");
console.log("3. Audit konsistensi Sequence Diagram dengan Class Diagram Minggu 6.");
