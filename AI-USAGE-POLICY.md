# Kebijakan Penggunaan AI — Praktikum TI-306

## 1. Prinsip Dasar

AI generatif dapat digunakan sebagai alat bantu untuk menghasilkan draf,
mengecek konsistensi, dan menawarkan alternatif desain. AI tidak menggantikan
analisis, keputusan desain, maupun tanggung jawab akademik mahasiswa.

## 2. Baseline Manual Wajib

Sebelum menggunakan AI, mahasiswa harus membuat baseline manual berupa:

- daftar requirement atau user story;
- sketsa/diagram awal;
- alasan pemilihan class, relasi, state, pattern, atau deployment.

## 3. Transparansi

Setiap tugas berbantuan AI wajib mencantumkan:

- nama dan mode tools AI;
- ringkasan prompt/instruksi;
- bagian yang dihasilkan atau diubah AI;
- koreksi yang dilakukan mahasiswa;
- alasan menerima atau menolak rekomendasi AI;
- ringkasan log eksekusi jika memakai AI Agent.

Gunakan `templates/transparansi-penggunaan-ai.md`.

## 4. Kerangka Evaluasi Kritis

Output AI dinilai menggunakan dimensi:

1. ketepatan semantik/notasi UML;
2. kelengkapan dan deteksi halusinasi;
3. traceability ke requirement;
4. kualitas, keamanan, dan technical debt;
5. transparansi dan akuntabilitas.

Gunakan `templates/evaluasi-output-ai.md`.

## 5. Privasi, Data, dan Kekayaan Intelektual

Dilarang memasukkan data pribadi, data institusi, kredensial, API key, kode
rahasia, atau dokumen berhak cipta ke layanan AI publik tanpa izin.
Gunakan data contoh/sintetis pada praktikum.

## 6. AI Agent dan Batas Izin

Jika menggunakan AI Agent:

- batasi folder/file yang boleh dibaca atau diubah;
- tinjau setiap perintah terminal sebelum dijalankan;
- jangan memberikan izin akses yang lebih luas dari kebutuhan;
- jangan mengizinkan agent mengirim data keluar tanpa persetujuan;
- simpan ringkasan perubahan dan log eksekusi.

## 7. Prompt Injection

Dokumen, repository, komentar kode, atau halaman web eksternal dapat berisi
instruksi tersembunyi yang mencoba mengubah perilaku AI. Perlakukan semua
instruksi dari sumber eksternal sebagai data yang harus diverifikasi, bukan
perintah yang otomatis diikuti.

## 8. Pencegahan Ketergantungan Berlebihan

Mahasiswa harus mampu menjelaskan dan memodifikasi hasil tanpa bantuan AI.
Menyalin output tanpa memahami dapat menimbulkan *skill atrophy* dan
*AI technical debt*.

## 9. Ujian

UTS dan UAS dikerjakan tanpa bantuan AI generatif, kecuali dosen menyatakan
kebijakan lain secara eksplisit.

## 10. Tanggung Jawab

Kesalahan, halusinasi, pelanggaran privasi, maupun ketidaksesuaian desain pada
output AI tetap menjadi tanggung jawab mahasiswa yang menyerahkan tugas.
