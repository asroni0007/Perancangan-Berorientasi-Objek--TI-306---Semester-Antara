// Minggu 11 — Deployment Diagram
// API Server yang berkomunikasi dengan mock AI/ML service melalui HTTP.

import { createServer } from "node:http";

class Buku {
  constructor(isbn, judul, kategori, eksemplarTersedia) {
    this.isbn = isbn;
    this.judul = judul;
    this.kategori = kategori;
    this.eksemplarTersedia = eksemplarTersedia;
  }
}

class SistemPerpustakaan {
  #buku = [
    new Buku("978-1", "Clean Code", "Teknologi", 2),
    new Buku("978-2", "Design Patterns", "Desain", 1),
  ];

  daftarBuku() {
    return this.#buku;
  }

  cariBuku(isbn) {
    return this.#buku.find((b) => b.isbn === isbn);
  }

  pinjamkan(isbn) {
    const buku = this.cariBuku(isbn);
    if (!buku) throw new Error("Buku tidak ditemukan");
    if (buku.eksemplarTersedia <= 0) throw new Error("Stok habis");
    buku.eksemplarTersedia -= 1;
    return buku;
  }
}

const sistem = new SistemPerpustakaan();
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:3001";

function kirimJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

async function ambilRekomendasi(kategori) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);
  try {
    const url = `${AI_SERVICE_URL}/recommend?kategori=${encodeURIComponent(kategori)}`;
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`AI service merespons ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (req.method === "GET" && url.pathname === "/health") {
    kirimJSON(res, 200, { status: "ok", service: "api-server" });
    return;
  }

  if (req.method === "GET" && url.pathname === "/buku") {
    kirimJSON(res, 200, sistem.daftarBuku());
    return;
  }

  if (req.method === "GET" && url.pathname.startsWith("/buku/")) {
    const isbn = decodeURIComponent(url.pathname.slice("/buku/".length));
    const buku = sistem.cariBuku(isbn);
    if (!buku) {
      kirimJSON(res, 404, { pesan: "Buku tidak ditemukan" });
      return;
    }
    kirimJSON(res, 200, buku);
    return;
  }

  if (req.method === "GET" && url.pathname.startsWith("/rekomendasi/")) {
    const isbn = decodeURIComponent(url.pathname.slice("/rekomendasi/".length));
    const buku = sistem.cariBuku(isbn);
    if (!buku) {
      kirimJSON(res, 404, { pesan: "Buku tidak ditemukan" });
      return;
    }

    try {
      const hasil = await ambilRekomendasi(buku.kategori);
      kirimJSON(res, 200, { bukuAcuan: buku, ...hasil, diverifikasiManusia: false });
    } catch (error) {
      kirimJSON(res, 502, {
        pesan: "Layanan rekomendasi tidak tersedia",
        detail: error.name === "AbortError" ? "timeout" : error.message,
        fallback: [],
      });
    }
    return;
  }

  if (req.method === "POST" && url.pathname.startsWith("/pinjam/")) {
    const isbn = decodeURIComponent(url.pathname.slice("/pinjam/".length));
    try {
      const buku = sistem.pinjamkan(isbn);
      kirimJSON(res, 200, { berhasil: true, buku });
    } catch (error) {
      kirimJSON(res, 400, { berhasil: false, pesan: error.message });
    }
    return;
  }

  kirimJSON(res, 404, { pesan: "Rute tidak ditemukan" });
});

const PORT = Number(process.env.PORT || 3000);
if (import.meta.url === `file://${process.argv[1]}`) {
  server.listen(PORT, () => {
    console.log(`API Server berjalan di http://localhost:${PORT}`);
    console.log(`AI Service URL: ${AI_SERVICE_URL}`);
  });
}

export { server, sistem, ambilRekomendasi };
