# Praktikum Perancangan Berorientasi Objek (TI-306)
## Studi Kasus: SIPUSTAKA — Sistem Perpustakaan Digital

Repository ini adalah bahan penunjang praktikum untuk mata kuliah **Perancangan
Berorientasi Objek (TI-306)**. Struktur praktikum mengikuti RPS 16 pertemuan:
Minggu 8 untuk pengukuran CPMK21 dan Minggu 16 untuk pengukuran CPMK31.

Satu studi kasus dikembangkan bertahap agar mahasiswa dapat menelusuri hubungan:

**kebutuhan → model UML → keputusan desain → implementasi kode → dokumentasi**.

## Prasyarat

- Node.js versi 18 atau lebih baru
- Editor kode, misalnya Visual Studio Code
- Salah satu alat diagram:
  - Mermaid (Markdown/mermaid.live/editor yang mendukung Mermaid)
  - PlantUML (plugin editor, server PlantUML, atau PlantUML CLI)

Tidak ada dependency npm eksternal. Semua contoh JavaScript menggunakan modul
bawaan Node.js.

## Cara Menjalankan

```bash
node week01-pengenalan-oop/index.js
# atau
npm run week01
```

Untuk Minggu 11:

```bash
npm run week11
# terminal lain
curl http://localhost:3000/buku
```

Untuk menghasilkan dokumen SDD pada Minggu 14:

```bash
npm run week14
```

## Aturan Alur Kerja Diagram dan AI

Pada tugas yang menggunakan AI, mahasiswa menjalankan tiga tahap berikut:

1. **Baseline manual** — analisis dan diagram awal dibuat sendiri.
2. **Draf AI** — AI Assistant/AI Agent digunakan untuk menghasilkan alternatif.
3. **Final terverifikasi** — mahasiswa memperbaiki hasil berdasarkan requirement,
   aturan UML, traceability, keamanan, dan keputusan desain.

Gunakan:

- [`AI-USAGE-POLICY.md`](AI-USAGE-POLICY.md)
- [`templates/evaluasi-output-ai.md`](templates/evaluasi-output-ai.md)
- [`templates/transparansi-penggunaan-ai.md`](templates/transparansi-penggunaan-ai.md)
- [`templates/traceability-matrix.md`](templates/traceability-matrix.md)

## Struktur dan Pemetaan ke RPS

| Minggu | Folder | Topik RPS | Artefak Utama |
|---|---|---|---|
| 1 | `week01-pengenalan-oop` | OOD vs prosedural; tren modern | Kode perbandingan + refleksi tren |
| 2 | `week02-class-object` | Class, object, atribut, method; AI Assistant vs Agent | Class `Buku` + tabel perbandingan AI |
| 3 | `week03-analisis-kebutuhan` | Elisitasi kebutuhan dan user story | `requirements.md` + skeleton class |
| 4 | `week04-use-case-diagram` | Use Case Diagram dan text-to-diagram | Mermaid + PlantUML + kode fasad |
| 5 | `week05-activity-diagram` | Activity Diagram manual vs AI | Mermaid + PlantUML + kode bercabang |
| 6 | `week06-class-diagram` | Class Diagram dan prompt engineering | Mermaid + PlantUML + relasi class |
| 7 | `week07-sequence-diagram` | Sequence Diagram dan verifikasi | Mermaid + PlantUML + log pesan |
| 8 | `week08-uts-latihan` | **UTS / CPMK21** | Latihan mandiri Minggu 1–7 |
| 9 | `week09-communication-diagram` | Communication Diagram | Mermaid + PlantUML + komunikasi object |
| 10 | `week10-state-machine-diagram` | State Machine Diagram | Mermaid + PlantUML + finite state machine |
| 11 | `week11-deployment-diagram` | Deployment, cloud-native, container, layanan AI | Mermaid + PlantUML + API + mock AI service |
| 12 | `week12-prinsip-oop` | Encapsulation, inheritance, polymorphism | Implementasi + AI code review |
| 13 | `week13-design-pattern` | Singleton, Factory, Observer | Implementasi + latihan code smell |
| 14 | `week14-dokumentasi` | SDD dan AI-assisted technical writing | Generator SDD terintegrasi |
| 15 | `week15-presentasi-demo` | Presentasi dan peer review | Demo, template presentasi, rubrik |
| 16 | `week16-uas-studi-kasus` | **UAS / CPMK31** | Latihan komprehensif Minggu 9–15 |

## Berkas Diagram

Folder `diagrams/` pada Minggu 4–11 berisi dua representasi yang setara:

- `*.mmd` — kode Mermaid
- `*.puml` — kode PlantUML

Diagram referensi bukan pengganti pekerjaan mahasiswa. Mahasiswa tetap wajib
membuat baseline manual, membandingkan dengan draf AI, lalu menyerahkan versi
final beserta evaluasi kritisnya.

## Catatan Istilah

Materi menggunakan istilah **State Machine Diagram**, sesuai istilah UML 2.5,
bukan istilah lama *Statechart Diagram*.

## Lisensi

MIT — lihat [`LICENSE`](LICENSE).
