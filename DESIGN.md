# Design System — Al Hikmah (`al-hikmah-web`)

Dokumen ini menjadi panduan desain resmi aplikasi **Al Hikmah** dengan tema **Ivory Marun** (tema terang saja). Sumber kebenaran token CSS berada di `src/index.css`.

## 1. Palet Warna (Ivory Marun)

Seluruh komponen wajib menggunakan token `@theme` Tailwind v4 dari `src/index.css` dan **tidak boleh** menuliskan kode hex atau warna bawaan Tailwind (`emerald-*`, `amber-*`, `gray-*`, `slate-*`, dll.).

### Permukaan & Teks

| Token | Nilai | Penggunaan |
|---|---|---|
| `--color-bg-base` | `#F8F5F0` | Latar kanvas utama (`bg-bg-base`) |
| `--color-bg-elevated` | `#EDE6DD` | Permukaan naik, latar tab, hover sekunder |
| `--color-bg-surface` | `#FFFFFF` | Kartu, sidebar, bottom nav, dialog |
| `--color-border` | `#DDD3C8` | Garis batas kartu dan input |
| `--color-border-subtle` | `#EAE2D9` | Garis pemisah ringan |
| `--color-text-main` | `#1B1416` | Teks utama (kontras > 14:1) |
| `--color-text-muted` | `#6B615B` | Teks sekunder (kontras ≥ 4.9:1 di semua permukaan) |

### Primer Marun (`primary-50` – `primary-950`) & Aksen Emas (`accent-50` – `accent-950`)

- Dasar marun `primary-600` (`#6E1F2F`), hover `primary-700` (`#5A1826`), permukaan lembut `primary-50`/`primary-100`.
- Emas `accent-500` (`#A67621`) hanya untuk ikon/ornamen; teks kecil memakai `accent-600` ke atas agar kontras ≥ 4.5:1.
- Tema **terang saja** (`color-scheme: light`).

### Status Kegiatan (Selalu Warna + Ikon + Teks)

| Status | Token | Ikon Phosphor |
|---|---|---|
| Sudah / Berpuasa | `success-50` / `success-200` / `success-700` (`#2D5A3D`) | `IconCheckBold` |
| Sebagian | `primary-50` / `primary-200` / `primary-700` | `IconPartial` |
| Belum / Tidak Berpuasa | `bg-elevated` / `border` / `text-muted` | `IconCircle` |
| Berhalangan | `accent-50` / `accent-200` / `accent-700` | `IconMinus` |
| Susulan | `accent-50` / `accent-300` (putus-putus) / `accent-700` | `IconClock` |
| Error Formulir | `danger-50` / `danger-600` | `IconWarningCircle` |

## 2. Tipografi (`@fontsource`) & Identitas Merek

- **Isi**: Inter Variable (`font-sans`), **Judul**: Source Serif 4 Variable (`font-display`), **Arab**: Amiri (`font-arabic`, `lang="ar" dir="rtl"`).
- **Logo**: `src/assets/images/logo-al-hikmah.png` dan favicon `/logo-al-hikmah.png` digunakan pada sidebar desktop, header mobile, dan halaman Masuk.

## 3. Tata Letak, Navigasi & Bento Grid

- **Desktop**: sidebar kiri **dapat dibuka-tutup** (`DesktopSidebar`), begitu pula panel riwayat di halaman **Tanya** (`AIChat`). Konten dibatasi `max-w-[1100px]`.
- **Mobile**: bottom tab bar dengan gestur **drag-hover** (`DraggableBottomNav`) sehingga pengguna dapat menggeser jari antar tab secara mulus, target sentuh ≥ 48 px.
  - Siswa: `Hari Ini`, `Ramadan`, `Tanya`, `Profil`.
  - Guru: `Kelas`, `Perlu Disapa`, `Rekap` (fitur `Atur Kegiatan` dihapus; pemilih kelas memakai dropdown).
- **Beranda Siswa (Bento Grid 6 Kegiatan Harian + Popup Form)**:
  1. **Shaum**: 3 opsi (*Berpuasa*, *Tidak Berpuasa*, *Berhalangan*).
  2. **Sholat Wajib**: 5 waktu dengan 2 kategori (*Waktu Pelaksanaan*: Awal Waktu / Tepat Waktu / Qadha; *Pelaksanaan*: Berjamaah / Munfarid) + opsi Sholat Sunnah.
  3. **Sholat Sunnah**: *Tarawih*, *Dhuha*, *Qobla & Ba'da*.
  4. **Tadarus Qur'an**: pilih Juz (1–30), Surah (114 surah, siap tersambung API Al-Qur'an), serta rentang ayat awal–akhir.
  5. **Infaq**: input teks keterangan bebas tanpa nominal dan tanpa status sudah/belum.
  6. **Ceramah / Kultum**: judul, penceramah, media (*Langsung di Masjid*, *Di Rumah*, *Lewat Internet*), ringkasan jujur, dan keterangan.
- **Kegiatan Khusus**: skema elemen dinamis yang dapat ditambah/dihapus oleh Admin Sekolah (kehadiran, ringkasan ceramah, keterangan, penanda malam).
- **Jadwal Sholat**: adapter siap API (`src/services/prayerScheduleService.js`) lengkap dengan hitung mundur langsung *"... jam ... menit lagi menuju ..."*.
- **Notifikasi & Orang Tua**: sapaan guru mengirim notifikasi ke siswa terpilih; pengisian siswa mengirim notifikasi ke orang tua; orang tua dapat mengklik ringkasan per tanggal untuk melihat keterangan dan mengonfirmasi, serta melihat jadwal Kegiatan Khusus sekolah.

## 4. Ikon & Animasi

- Seluruh ikon dari **Phosphor** (`react-icons/pi`) lewat `src/lib/icons.js`.
- Animasi memakai `motion` (`<MotionConfig reducedMotion="user">`, tanpa GSAP), hanya `opacity` & `transform` (plus `stroke-dashoffset` cincin progres).
