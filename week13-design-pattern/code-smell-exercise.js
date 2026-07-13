// Latihan AI code review: file ini SENGAJA berisi beberapa code smell.
// Jangan menyalin desain ini sebagai solusi final.

class SistemSuperBesar {
  constructor() {
    this.buku = [];
    this.anggota = [];
    this.peminjaman = [];
  }

  proses(aksi, data) {
    if (aksi === "tambahBuku") {
      this.buku.push(data);
    } else if (aksi === "daftarAnggota") {
      this.anggota.push(data);
    } else if (aksi === "pinjam") {
      const buku = this.buku.find((item) => item.isbn === data.isbn);
      const anggota = this.anggota.find((item) => item.id === data.idAnggota);
      if (!buku || !anggota) return false;
      if (buku.stok <= 0) return false;
      buku.stok -= 1;
      this.peminjaman.push({ buku, anggota, status: "DIPINJAM" });
      console.log(`Kirim email langsung ke ${anggota.email}`);
      return true;
    } else if (aksi === "laporan") {
      return this.peminjaman.map((item) => `${item.anggota.nama}:${item.buku.judul}`);
    }
    return null;
  }
}

export { SistemSuperBesar };
