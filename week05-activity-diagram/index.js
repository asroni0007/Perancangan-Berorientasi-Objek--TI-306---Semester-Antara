// Minggu 5 — Dari Activity Diagram ke Kode
// Setiap decision node pada diagram diterjemahkan menjadi guard/percabangan.

class Buku {
  constructor(isbn, judul, eksemplarTersedia) {
    this.isbn = isbn;
    this.judul = judul;
    this.eksemplarTersedia = eksemplarTersedia;
  }
}

class Anggota {
  constructor(id, nama, tunggakan = 0, peminjamanAktif = 0) {
    this.id = id;
    this.nama = nama;
    this.tunggakan = tunggakan;
    this.peminjamanAktif = peminjamanAktif;
  }
}

function prosesPeminjaman(buku, anggota) {
  console.log(`[MULAI] ${anggota.nama} mengajukan "${buku.judul}"`);

  console.log("[CEK] Buku tersedia?");
  if (buku.eksemplarTersedia <= 0) {
    console.log("[TOLAK] Stok buku habis.\n");
    return { berhasil: false, alasan: "STOK_HABIS" };
  }

  console.log("[CEK] Anggota memiliki tunggakan?");
  if (anggota.tunggakan > 0) {
    console.log(`[TOLAK] Tunggakan Rp${anggota.tunggakan}.\n`);
    return { berhasil: false, alasan: "ADA_TUNGGAKAN" };
  }

  console.log("[CEK] Peminjaman aktif sudah 3 atau lebih?");
  if (anggota.peminjamanAktif >= 3) {
    console.log("[TOLAK] Batas peminjaman aktif tercapai.\n");
    return { berhasil: false, alasan: "BATAS_PINJAM" };
  }

  buku.eksemplarTersedia -= 1;
  anggota.peminjamanAktif += 1;
  const catatan = {
    isbn: buku.isbn,
    idAnggota: anggota.id,
    status: "DIPINJAM",
  };
  console.log("[AKSI] Buat catatan peminjaman.");
  console.log("[AKSI] Kurangi stok buku.");
  console.log("[AKSI] Kirim konfirmasi.");
  console.log("[SELESAI] Peminjaman berhasil.\n");
  return { berhasil: true, catatan };
}

prosesPeminjaman(new Buku("978-1", "Clean Code", 1), new Anggota(1, "Rani"));
prosesPeminjaman(new Buku("978-2", "Design Patterns", 1), new Anggota(2, "Budi", 15000));
prosesPeminjaman(new Buku("978-3", "UML Distilled", 1), new Anggota(3, "Sinta", 0, 3));

console.log("=== TUGAS LATIHAN ===");
console.log("1. Tambahkan jalur persetujuan khusus untuk buku Referensi.");
console.log("2. Pastikan setiap guard condition tertulis jelas pada diagram final.");
console.log("3. Bandingkan baseline manual dan draf AI menggunakan template evaluasi.");
