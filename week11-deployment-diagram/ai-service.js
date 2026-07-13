// Mock AI/ML Service lokal untuk latihan Deployment Diagram.
// Service ini TIDAK menggunakan model AI eksternal dan tidak mengirim data keluar.

import { createServer } from "node:http";

const rekomendasiPerKategori = {
  Teknologi: ["Refactoring", "The Pragmatic Programmer"],
  Desain: ["UML Distilled", "Applying UML and Patterns"],
  Umum: ["Software Engineering"],
};

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  const url = new URL(req.url, "http://localhost");
  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200);
    res.end(JSON.stringify({ status: "ok", service: "mock-ai-service" }));
    return;
  }

  if (req.method === "GET" && url.pathname === "/recommend") {
    const kategori = url.searchParams.get("kategori") || "Umum";
    const rekomendasi = rekomendasiPerKategori[kategori] || rekomendasiPerKategori.Umum;
    res.writeHead(200);
    res.end(JSON.stringify({ kategori, rekomendasi, sumber: "mock-local" }));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ pesan: "Rute tidak ditemukan" }));
});

const PORT = Number(process.env.AI_PORT || 3001);
if (import.meta.url === `file://${process.argv[1]}`) {
  server.listen(PORT, () => {
    console.log(`Mock AI Service berjalan di http://localhost:${PORT}`);
  });
}

export { server };
