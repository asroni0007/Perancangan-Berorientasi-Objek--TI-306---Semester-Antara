// Minggu 14 — Generator Software Design Document (SDD)
// Mengintegrasikan requirement, diagram Mermaid/PlantUML, traceability,
// design pattern, deployment, keamanan, dan transparansi penggunaan AI.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function baca(relatif) {
  try {
    return readFileSync(join(root, relatif), "utf-8").trim();
  } catch {
    return `> Berkas belum tersedia: ${relatif}`;
  }
}

function blokKode(bahasa, isi) {
  return `\`\`\`${bahasa}\n${isi}\n\`\`\``;
}

const requirement = baca("week03-analisis-kebutuhan/requirements.md");

const diagram = {
  useCaseMermaid: baca("week04-use-case-diagram/diagrams/use-case-reference.mmd"),
  useCasePlantUML: baca("week04-use-case-diagram/diagrams/use-case-reference.puml"),
  activityMermaid: baca("week05-activity-diagram/diagrams/activity-peminjaman.mmd"),
  classMermaid: baca("week06-class-diagram/diagrams/class-sipustaka.mmd"),
  sequenceMermaid: baca("week07-sequence-diagram/diagrams/sequence-ajukan-peminjaman.mmd"),
  communicationPlantUML: baca("week09-communication-diagram/diagrams/communication-peminjaman.puml"),
  stateMermaid: baca("week10-state-machine-diagram/diagrams/state-peminjaman.mmd"),
  deploymentPlantUML: baca("week11-deployment-diagram/diagrams/deployment-sipustaka.puml"),
};

const dokumen = `# Software Design Document (SDD) — SIPUSTAKA

> Draf ini dihasilkan otomatis sebagai bahan awal. Mahasiswa wajib memeriksa,
> memperbaiki, dan melengkapi seluruh bagian sebelum dikumpulkan.

## 1. Ringkasan Sistem

SIPUSTAKA adalah sistem manajemen peminjaman buku perpustakaan yang digunakan
sebagai studi kasus Perancangan Berorientasi Objek TI-306.

## 2. Requirement dan User Story

${requirement}

## 3. Arsitektur dan Prinsip Desain

- Entitas inti: Buku, Anggota, Peminjaman, Perpustakaan.
- Prinsip OOP: encapsulation, inheritance, polymorphism.
- Pattern: Singleton, Factory, Observer.
- Integrasi eksternal: API Server, database (rencana), dan layanan AI/ML.

## 4. Use Case Diagram

### Mermaid

${blokKode("mermaid", diagram.useCaseMermaid)}

### PlantUML

${blokKode("plantuml", diagram.useCasePlantUML)}

## 5. Activity Diagram

${blokKode("mermaid", diagram.activityMermaid)}

## 6. Class Diagram

${blokKode("mermaid", diagram.classMermaid)}

## 7. Sequence Diagram

${blokKode("mermaid", diagram.sequenceMermaid)}

## 8. Communication Diagram

${blokKode("plantuml", diagram.communicationPlantUML)}

## 9. State Machine Diagram

${blokKode("mermaid", diagram.stateMermaid)}

## 10. Deployment Diagram

${blokKode("plantuml", diagram.deploymentPlantUML)}

## 11. Matriks Traceability

| ID | Requirement | Use Case | Activity | Class/Method | Sequence/Communication | State | Deployment | Status |
|---|---|---|---|---|---|---|---|---|
| FR-01 | Cari buku | Cari Buku | Alur pencarian | Katalog.cari | Anggota→Sistem→Katalog | - | Client→API | Perlu verifikasi |
| FR-02 | Ajukan peminjaman | Ajukan Peminjaman | Proses peminjaman | SistemPerpustakaan.ajukanPeminjaman | Sequence peminjaman | PENGAJUAN→DIPINJAM | Client→API→DB | Perlu verifikasi |

## 12. Keamanan dan Kualitas

- Validasi input dan otorisasi belum lengkap pada contoh praktikum.
- API key tidak boleh disimpan di kode/repository.
- Komunikasi produksi harus menggunakan HTTPS.
- Panggilan layanan AI membutuhkan timeout, fallback, rate limit, dan audit.
- Output AI tidak boleh langsung menjadi keputusan tanpa verifikasi manusia.

## 13. Risiko dan Tata Kelola AI

- halusinasi requirement/elemen UML;
- prompt injection dari dokumen eksternal;
- kebocoran data atau kekayaan intelektual;
- permission/scope creep pada AI Agent;
- AI technical debt dan ketergantungan berlebihan.

## 14. Catatan Penggunaan AI

> **Lengkapi oleh mahasiswa**
>
> - Tools dan mode AI:
> - Ringkasan prompt:
> - Baseline manual:
> - Bagian yang dihasilkan AI:
> - Koreksi dan alasan:
> - Log agent (jika ada):

## 15. Keputusan Desain dan Trade-off

Jelaskan keputusan yang diterima/ditolak, alasan penggunaan pattern, serta
keterbatasan rancangan saat ini.
`;

const outputPath = join(__dirname, "SDD-generated.md");
writeFileSync(outputPath, dokumen, "utf-8");

console.log(`Draf SDD dibuat: ${outputPath}`);
console.log("Verifikasi diagram, traceability, keamanan, dan catatan AI sebelum dikumpulkan.");
