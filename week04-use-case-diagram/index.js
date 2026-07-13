// Minggu 4 — Dari Use Case Diagram ke Kode
// Use case publik direalisasikan melalui fasad SistemPerpustakaan.

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
  constructor(id, nama) {
    this.id = id;
    this.nama = nama;
    this.tunggakan = 0;
  }
}

class Peminjaman {
  constructor(id, buku, anggota, tanggalPinjam) {
    this.id = id;
    this.buku = buku;
    this.anggota = anggota;
    this.tanggalPinjam = tanggalPinjam;
    this.tanggalJatuhTempo = new Date(tanggalPinjam);
    this.tanggalJatuhTempo.setDate(this.tanggalJatuhTempo.getDate() + 7);
    this.jumlahPerpanjangan = 0;
    this.status = "DIPINJAM";
  }
}

class SistemPerpustakaan {
  #bukuList = [];
  #anggotaList = [];
  #peminjamanList = [];
  #nomorPeminjaman = 1;

  // Use Case: Daftar Anggota
  daftarAnggota(id, nama) {
    if (this.#anggotaList.some((anggota) => anggota.id === id)) {
      throw new Error("ID anggota sudah terdaftar.");
    }
    const anggota = new Anggota(id, nama);
    this.#anggotaList.push(anggota);
    return anggota;
  }

  // Use Case: Kelola Data Buku (versi tambah)
  tambahBuku(isbn, judul, kategori, jumlahEksemplar) {
    if (this.#bukuList.some((buku) => buku.isbn === isbn)) {
      throw new Error("ISBN sudah terdaftar.");
    }
    const buku = new Buku(isbn, judul, kategori, jumlahEksemplar);
    this.#bukuList.push(buku);
    return buku;
  }

  // Use Case: Cari Buku
  cariBuku(kataKunci) {
    const kata = kataKunci.trim().toLowerCase();
    return this.#bukuList.filter((buku) =>
      `${buku.judul} ${buku.kategori}`.toLowerCase().includes(kata)
    );
  }

  #validasiPeminjaman(isbn, idAnggota) {
    const buku = this.#bukuList.find((item) => item.isbn === isbn);
    const anggota = this.#anggotaList.find((item) => item.id === idAnggota);
    if (!buku) throw new Error("Buku tidak ditemukan.");
    if (!anggota) throw new Error("Anggota tidak ditemukan.");
    if (buku.eksemplarTersedia <= 0) throw new Error("Stok buku habis.");
    if (anggota.tunggakan > 0) throw new Error("Anggota memiliki tunggakan.");
    return { buku, anggota };
  }

  // Use Case: Ajukan Peminjaman
  ajukanPeminjaman(isbn, idAnggota, tanggalPinjam = new Date()) {
    const { buku, anggota } = this.#validasiPeminjaman(isbn, idAnggota);
    buku.eksemplarTersedia -= 1;
    const peminjaman = new Peminjaman(
      this.#nomorPeminjaman++,
      buku,
      anggota,
      tanggalPinjam
    );
    this.#peminjamanList.push(peminjaman);
    return peminjaman;
  }

  // Use Case: Perpanjang Peminjaman
  perpanjangPeminjaman(idPeminjaman) {
    const peminjaman = this.#peminjamanList.find((item) => item.id === idPeminjaman);
    if (!peminjaman) throw new Error("Peminjaman tidak ditemukan.");
    if (peminjaman.status !== "DIPINJAM") throw new Error("Peminjaman tidak aktif.");
    if (peminjaman.jumlahPerpanjangan >= 1) throw new Error("Batas perpanjangan tercapai.");

    peminjaman.tanggalJatuhTempo.setDate(peminjaman.tanggalJatuhTempo.getDate() + 7);
    peminjaman.jumlahPerpanjangan += 1;
    return peminjaman;
  }

  // Use Case: Kembalikan Buku
  kembalikanBuku(idPeminjaman) {
    const peminjaman = this.#peminjamanList.find((item) => item.id === idPeminjaman);
    if (!peminjaman) throw new Error("Peminjaman tidak ditemukan.");
    if (peminjaman.status !== "DIPINJAM") throw new Error("Peminjaman sudah ditutup.");

    peminjaman.buku.eksemplarTersedia += 1;
    peminjaman.status = "DIKEMBALIKAN";
    return peminjaman;
  }
}

const sistem = new SistemPerpustakaan();
sistem.tambahBuku("978-1", "Clean Code", "Teknologi", 1);
const rani = sistem.daftarAnggota(1, "Rani");

console.log("Cari Buku:", sistem.cariBuku("clean"));
const peminjaman = sistem.ajukanPeminjaman("978-1", rani.id, new Date("2026-09-01"));
console.log("Ajukan Peminjaman:", peminjaman);
console.log("Perpanjang:", sistem.perpanjangPeminjaman(peminjaman.id));
console.log("Kembalikan:", sistem.kembalikanBuku(peminjaman.id));

console.log("\n=== TUGAS LATIHAN ===");
console.log("1. Tambahkan use case Lihat Riwayat Peminjaman.");
console.log("2. Bedakan method publik use case dan method internal validasi pada diagram/desain.");
console.log("3. Tambahkan pengujian untuk ID anggota, ISBN, stok, dan batas perpanjangan.");
