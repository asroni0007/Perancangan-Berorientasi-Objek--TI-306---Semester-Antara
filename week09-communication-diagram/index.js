// Minggu 9 — Communication Diagram
// EventEmitter dipakai sebagai contoh komunikasi decoupled antarobject.

import { EventEmitter } from "node:events";

class Katalog extends EventEmitter {
  #buku = new Map();

  tambah(buku) {
    this.#buku.set(buku.isbn, buku);
  }

  prosesPermintaan(isbn) {
    const buku = this.#buku.get(isbn);
    if (buku && buku.eksemplarTersedia > 0) {
      buku.eksemplarTersedia -= 1;
      this.emit("stokBerkurang", { isbn, sisaStok: buku.eksemplarTersedia });
    } else {
      this.emit("stokHabis", { isbn });
    }
  }
}

class SistemPerpustakaan extends EventEmitter {
  #katalog = new Katalog();

  constructor() {
    super();
    this.#katalog.on("stokBerkurang", ({ isbn, sisaStok }) => {
      console.log(`1.2: Katalog --> SistemPerpustakaan: stokBerkurang(${isbn}, ${sisaStok})`);
      this.emit("peminjamanSukses", { isbn });
    });
    this.#katalog.on("stokHabis", ({ isbn }) => {
      console.log(`1.2: Katalog --> SistemPerpustakaan: stokHabis(${isbn})`);
      this.emit("peminjamanGagal", { isbn });
    });
  }

  get katalog() {
    return this.#katalog;
  }

  ajukanPeminjaman(anggota, isbn) {
    console.log(`1: Anggota(${anggota.nama}) --> SistemPerpustakaan: ajukanPeminjaman(${isbn})`);
    console.log(`1.1: SistemPerpustakaan --> Katalog: prosesPermintaan(${isbn})`);
    this.#katalog.prosesPermintaan(isbn);
  }
}

class LayananNotifikasi {
  constructor(sistem) {
    sistem.on("peminjamanSukses", ({ isbn }) => {
      console.log(`1.3: SistemPerpustakaan --> LayananNotifikasi: peminjamanSukses(${isbn})`);
      console.log("1.5: LayananNotifikasi --> Anggota: konfirmasi berhasil");
    });
    sistem.on("peminjamanGagal", ({ isbn }) => {
      console.log(`1.3: SistemPerpustakaan --> LayananNotifikasi: peminjamanGagal(${isbn})`);
    });
  }
}

class LogAudit {
  #riwayat = [];

  constructor(sistem) {
    sistem.on("peminjamanSukses", ({ isbn }) => {
      const catatan = `Peminjaman ${isbn} berhasil`;
      this.#riwayat.push(catatan);
      console.log(`1.4: SistemPerpustakaan --> LogAudit: catatPeminjaman(${isbn})`);
    });
    sistem.on("peminjamanGagal", ({ isbn }) => {
      this.#riwayat.push(`Peminjaman ${isbn} gagal`);
    });
  }

  semua() {
    return [...this.#riwayat];
  }
}

const sistem = new SistemPerpustakaan();
new LayananNotifikasi(sistem);
const audit = new LogAudit(sistem);
sistem.katalog.tambah({ isbn: "978-1", judul: "Clean Code", eksemplarTersedia: 1 });

sistem.ajukanPeminjaman({ nama: "Rani" }, "978-1");
console.log();
sistem.ajukanPeminjaman({ nama: "Budi" }, "978-1");
console.log("\nAudit:", audit.semua());

console.log("\n=== TUGAS LATIHAN ===");
console.log("1. Tambahkan correlation ID agar pesan satu transaksi dapat ditelusuri.");
console.log("2. Bandingkan direct call dan event-driven dari sisi coupling dan debugging.");
