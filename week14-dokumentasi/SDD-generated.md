# Software Design Document (SDD) — SIPUSTAKA

> Draf ini dihasilkan otomatis sebagai bahan awal. Mahasiswa wajib memeriksa,
> memperbaiki, dan melengkapi seluruh bagian sebelum dikumpulkan.

## 1. Ringkasan Sistem

SIPUSTAKA adalah sistem manajemen peminjaman buku perpustakaan yang digunakan
sebagai studi kasus Perancangan Berorientasi Objek TI-306.

## 2. Requirement dan User Story

# Analisis Kebutuhan — SIPUSTAKA

## Kebutuhan Fungsional (contoh awal, lengkapi sesuai tugas)

1. Anggota dapat mencari buku berdasarkan judul/kategori.
2. Anggota dapat mengajukan peminjaman buku yang tersedia.
3. Anggota dapat mengembalikan buku yang sedang dipinjam.
4. Pustakawan dapat menambah/mengubah data buku.
5. Pustakawan dapat mendaftarkan anggota baru.

## Kebutuhan Non-Fungsional (contoh awal)

1. Sistem harus menolak peminjaman jika stok buku habis (integritas data).
2. Riwayat peminjaman harus tetap tersimpan meskipun buku sudah dikembalikan.

## User Story

Format: *Sebagai [peran], saya ingin [aksi], agar [tujuan].*

- Sebagai **anggota**, saya ingin mencari buku berdasarkan judul, agar saya cepat
  menemukan buku yang saya butuhkan.
- Sebagai **anggota**, saya ingin meminjam buku yang tersedia, agar saya bisa
  membacanya di luar perpustakaan.
- Sebagai **anggota**, saya ingin melihat tanggal jatuh tempo pengembalian, agar
  saya tidak terkena denda.
- Sebagai **pustakawan**, saya ingin menambahkan judul buku baru, agar koleksi
  perpustakaan selalu ter-update.

## Identifikasi Entitas Awal (calon class)

Dari kebutuhan di atas, entitas yang teridentifikasi: `Buku`, `Anggota`,
`Peminjaman`, `Pustakawan`. Entitas ini akan menjadi dasar Class Diagram di
Minggu 6.

---

## TUGAS LATIHAN
1. Tambahkan minimal **5 kebutuhan fungsional** dan **2 kebutuhan non-fungsional** lain.
2. Tulis minimal **3 user story** tambahan (boleh untuk peran pustakawan).
3. Berdasarkan kebutuhan tambahanmu, apakah ada entitas baru yang perlu
   ditambahkan ke `index.js`? Sebutkan.

## 3. Arsitektur dan Prinsip Desain

- Entitas inti: Buku, Anggota, Peminjaman, Perpustakaan.
- Prinsip OOP: encapsulation, inheritance, polymorphism.
- Pattern: Singleton, Factory, Observer.
- Integrasi eksternal: API Server, database (rencana), dan layanan AI/ML.

## 4. Use Case Diagram

### Mermaid

```mermaid
flowchart LR
  Anggota["👤 Anggota"]
  Pustakawan["👤 Pustakawan"]

  subgraph SIPUSTAKA["SIPUSTAKA"]
    UC1([Cari Buku])
    UC2([Ajukan Peminjaman])
    UC3([Kembalikan Buku])
    UC4([Perpanjang Peminjaman])
    UC5([Daftar Anggota])
    UC6([Kelola Data Buku])
    UC7([Validasi Ketersediaan dan Tunggakan])
  end

  Anggota --- UC1
  Anggota --- UC2
  Anggota --- UC3
  Anggota --- UC4
  Pustakawan --- UC5
  Pustakawan --- UC6

  UC2 -. include .-> UC7
  UC4 -. include .-> UC7
```

### PlantUML

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor Anggota
actor Pustakawan

rectangle SIPUSTAKA {
  usecase "Cari Buku" as UC1
  usecase "Ajukan Peminjaman" as UC2
  usecase "Kembalikan Buku" as UC3
  usecase "Perpanjang Peminjaman" as UC4
  usecase "Daftar Anggota" as UC5
  usecase "Kelola Data Buku" as UC6
  usecase "Validasi Ketersediaan\ndan Tunggakan" as UC7
}

Anggota --> UC1
Anggota --> UC2
Anggota --> UC3
Anggota --> UC4
Pustakawan --> UC5
Pustakawan --> UC6
UC2 .> UC7 : <<include>>
UC4 .> UC7 : <<include>>
@enduml
```

## 5. Activity Diagram

```mermaid
flowchart TD
  A([Mulai]) --> B[Anggota mengajukan peminjaman]
  B --> C{Buku tersedia?}
  C -- Tidak --> D[Tolak: stok habis]
  D --> Z([Selesai])
  C -- Ya --> E{Ada tunggakan?}
  E -- Ya --> F[Tolak: selesaikan tunggakan]
  F --> Z
  E -- Tidak --> G{Buku aktif sudah 3 atau lebih?}
  G -- Ya --> H[Tolak: batas peminjaman tercapai]
  H --> Z
  G -- Tidak --> I[Buat catatan peminjaman]
  I --> J[Kurangi stok buku]
  J --> K[Kirim konfirmasi]
  K --> Z
```

## 6. Class Diagram

```mermaid
classDiagram
  class Buku {
    +String isbn
    +String judul
    +String kategori
    +Number jumlahEksemplar
    +Number eksemplarTersedia
  }

  class Anggota {
    +Number id
    +String nama
    +String email
  }

  class Peminjaman {
    +Number id
    +Date tanggalPinjam
    +String status
  }

  class Perpustakaan {
    -Buku[] buku
    -Anggota[] anggota
    -Peminjaman[] peminjaman
    -Number nomorPeminjaman
    +tambahBuku(buku)
    +tambahAnggota(anggota)
    +pinjamkan(isbn, idAnggota, tanggal)
    +daftarPeminjamanAktif()
  }

  Perpustakaan "1" o-- "0..*" Buku : mengelola
  Perpustakaan "1" o-- "0..*" Anggota : mendaftarkan
  Perpustakaan "1" o-- "0..*" Peminjaman : mencatat
  Peminjaman "0..*" --> "1" Buku : buku
  Peminjaman "0..*" --> "1" Anggota : peminjam
```

## 7. Sequence Diagram

```mermaid
sequenceDiagram
  actor A as Anggota
  participant S as SistemPerpustakaan
  participant K as Katalog
  participant N as LayananNotifikasi

  A->>S: 1. ajukanPeminjaman(isbn)
  S->>S: 2. validasi anggota
  S->>K: 3. cekKetersediaan(isbn)
  K-->>S: 4. status ketersediaan

  alt buku tersedia
    S->>K: 5. kurangiStok(isbn)
    K-->>S: 6. stok diperbarui
    S->>N: 7. kirimKonfirmasi(anggota, buku)
    N-->>A: 8. notifikasi berhasil
    S-->>A: 9. data peminjaman
  else buku tidak tersedia
    S-->>A: 5a. penolakan peminjaman
  end
```

## 8. Communication Diagram

```plantuml
@startuml
left to right direction
object "anggota:Anggota" as A
object "sistem:SistemPerpustakaan" as S
object "katalog:Katalog" as K
object "notifikasi:LayananNotifikasi" as N
object "audit:LogAudit" as L

A --> S : 1: ajukanPeminjaman(isbn)
S --> K : 1.1: prosesPermintaan(isbn)
K --> S : 1.2: stokBerkurang(isbn)
S --> N : 1.3: peminjamanSukses(isbn)
S --> L : 1.4: catatPeminjaman(isbn)
N --> A : 1.5: konfirmasi
@enduml
```

## 9. State Machine Diagram

```mermaid
stateDiagram-v2
  [*] --> PENGAJUAN
  PENGAJUAN --> DIPINJAM: disetujui
  PENGAJUAN --> DITOLAK: ditolak
  DIPINJAM --> DIPERPANJANG: perpanjang disetujui
  DIPINJAM --> TERLAMBAT: melewati jatuh tempo
  DIPINJAM --> DIKEMBALIKAN: dikembalikan tepat waktu
  DIPERPANJANG --> TERLAMBAT: melewati jatuh tempo baru
  DIPERPANJANG --> DIKEMBALIKAN: dikembalikan
  TERLAMBAT --> DIKEMBALIKAN: buku dikembalikan
  DIKEMBALIKAN --> SELESAI: transaksi ditutup
  DITOLAK --> [*]
  SELESAI --> [*]
```

## 10. Deployment Diagram

```plantuml
@startuml
node "Client Device" as client {
  artifact "Browser/Mobile App" as browser
}

cloud "Cloud / Container Platform" {
  node "Reverse Proxy / Load Balancer" as proxy
  node "API Server Container" as api {
    artifact "server.js"
  }
  node "AI/ML Service Container" as ai {
    artifact "ai-service.js"
  }
  database "Database" as db
  node "Secret Manager" as secret
}

browser --> proxy : HTTPS
proxy --> api : HTTP internal
api --> db : SQL/TCP
api --> ai : HTTP/JSON
api ..> secret : read config/API key
ai ..> secret : read config/API key
@enduml
```

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
