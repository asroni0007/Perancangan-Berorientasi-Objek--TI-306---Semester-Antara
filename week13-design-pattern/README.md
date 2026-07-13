# Minggu 13 — Design Pattern

**Terkait CPMK:** 31.5

## Tujuan

Menerapkan dan menjustifikasi Singleton, Factory, dan Observer serta mengevaluasi
rekomendasi pattern dan deteksi code smell dari AI.

## Kode

- `index.js` — contoh Singleton, Factory, Observer.
- `code-smell-exercise.js` — kode sengaja bermasalah untuk AI code review.
- `AI-REVIEW-CHECKLIST.md` — panduan evaluasi.

## Cara Menjalankan

```bash
node index.js
```

## Tugas AI Pattern Recommendation

Deskripsikan kebutuhan: membuat objek laporan PDF/CSV/Excel tanpa `if/else`
berserakan. Minta AI merekomendasikan pattern dan nilai apakah Factory tepat.

## Tugas Code Smell

1. Minta AI meninjau `code-smell-exercise.js`.
2. Kelompokkan temuan: valid, tidak relevan, atau berlebihan.
3. Refactor menggunakan pemisahan tanggung jawab dan pattern minimal yang tepat.
4. Jelaskan risiko penggunaan Singleton pada deployment multi-instance.
5. Lampirkan evaluasi kritis dan transparansi AI.
