# Minggu 2 — Class, Object, Atribut, Method

**Terkait CPMK:** 21.2

## Tujuan

1. Menjelaskan class, object, atribut, dan method.
2. Membuat object dari class yang sama dengan state berbeda.
3. Membedakan AI Assistant dan AI Agent dalam workflow OOP.

## Konsep OOP

- **Class**: blueprint, misalnya `class Buku`.
- **Object**: instance, misalnya `new Buku(...)`.
- **Atribut**: state/data milik object.
- **Method**: perilaku yang menjaga aturan object.

## AI Assistant vs AI Agent

| Aspek | AI Assistant | AI Agent |
|---|---|---|
| Peran | Memberi saran/draf/autocomplete | Menjalankan rangkaian langkah |
| Kontrol | Pengguna mengeksekusi perubahan | Agent dapat membaca, mengubah, dan menguji sesuai izin |
| Risiko utama | Saran keliru/halusinasi | Scope creep, perubahan luas, perintah berisiko |
| Bukti penggunaan | Prompt dan koreksi | Prompt, izin, log tindakan, dan koreksi |

## Cara Menjalankan

```bash
node index.js
```

## Tugas Latihan

1. Tambahkan atribut `kategori` dan method `isReferensi()`.
2. Buat tiga object `Buku`, simpan dalam array, lalu cetak `info()`.
3. Jelaskan mengapa `eksemplarTersedia` sebaiknya dijaga melalui method.
4. Minta AI Assistant memberi satu saran refactoring kecil, lalu evaluasi.
5. Tuliskan tindakan apa saja yang tidak boleh langsung diberikan kepada AI Agent
   tanpa review manusia.
