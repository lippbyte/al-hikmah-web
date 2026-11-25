// Data demo fiktif untuk keperluan pratinjau aplikasi Al Hikmah.
// Seluruh nama, email, NIS, dan nama sekolah adalah contoh fiktif.

export const DEMO_SCHOOL = "SMP Contoh Al Hikmah (Data Demo)";

export const DEMO_ACCOUNTS = {
  siswa: {
    id: "demo-siswa-1",
    role: "siswa",
    firstName: "Rafi",
    name: "Rafi Pratama (Demo)",
    email: "siswa.demo@alhikmah.contoh",
    class: "VIII-A",
    nis: "DEMO-0801",
    title: "Siswa Kelas VIII-A · Akun Demo",
    school: DEMO_SCHOOL,
    avatar: "R",
    initials: "RP",
  },
  guru: {
    id: "demo-guru-1",
    role: "guru",
    firstName: "Bapak/Ibu Guru",
    name: "Guru Wali Kelas (Demo)",
    email: "guru.demo@alhikmah.contoh",
    class: "VIII-A",
    title: "Wali Kelas VIII-A · Akun Demo",
    school: DEMO_SCHOOL,
    avatar: "G",
    initials: "GW",
  },
  ortu: {
    id: "demo-ortu-1",
    role: "orang-tua",
    firstName: "Bapak/Ibu",
    name: "Wali Siswa Contoh (Demo)",
    email: "wali.demo@alhikmah.contoh",
    class: "VIII-A",
    title: "Orang Tua Rafi (VIII-A) · Demo",
    childName: "Rafi Pratama (Demo)",
    school: DEMO_SCHOOL,
    avatar: "W",
    initials: "WS",
  },
};

export const PRAYERS_META = [
  { id: "subuh", name: "Subuh", time: "04:42 WIB" },
  { id: "dzuhur", name: "Dzuhur", time: "12:05 WIB" },
  { id: "ashar", name: "Ashar", time: "15:15 WIB" },
  { id: "maghrib", name: "Maghrib", time: "18:12 WIB" },
  { id: "isya", name: "Isya", time: "19:22 WIB" },
];

export const SHOLAT_SUNNAH_OPTIONS = [
  { id: "tarawih", label: "Tarawih", desc: "Sholat malam bulan Ramadan" },
  { id: "dhuha", label: "Dhuha", desc: "Sholat sunnah pagi hari" },
  { id: "qoblaBada", label: "Qobla & Ba'da", desc: "Sunnah rawatib sebelum/sesudah fardhu" },
];

export const DEFAULT_DAILY_LOG = {
  shaum: "berpuasa", // "berpuasa" | "tidak_berpuasa" | "berhalangan"
  sholatWajib: {
    subuh: { status: "sudah", waktu: "awal_waktu", pelaksanaan: "berjamaah" },
    dzuhur: { status: "sudah", waktu: "tepat_waktu", pelaksanaan: "berjamaah" },
    ashar: { status: "sudah", waktu: "awal_waktu", pelaksanaan: "munfarid" },
    maghrib: { status: "belum", waktu: "", pelaksanaan: "" },
    isya: { status: "belum", waktu: "", pelaksanaan: "" },
  },
  sholatSunnah: {
    tarawih: false,
    dhuha: true,
    qoblaBada: false,
  },
  tadarus: {
    juz: 1,
    surahNumber: 2,
    ayatStart: 1,
    ayatEnd: 20,
  },
  infaq: {
    keterangan: "Hari ini berinfaq di kotak masjid sekolah setelah Dzuhur.",
  },
  ceramah: {
    judul: "",
    penceramah: "",
    ringkasan: "",
    media: "masjid",
    keterangan: "",
  },
  updatedAt: "15:20 WIB",
};

export const INITIAL_STUDENTS = [
  {
    id: "nabila-contoh",
    name: "Nabila (Contoh)",
    class: "VIII-A",
    statusToday: "sudah",
    statusText: "Catatan hari ini: Sudah diisi",
    consistency: "rutin",
    consistencyLabel: "Mulai rutin",
    consistencyBars: [true, true, false],
    parentViewed: true,
    parentViewedDate: "12 Ram",
    daysFilled: "13/14 hari",
    missedCount: 1,
  },
  {
    id: "rafi-contoh",
    name: "Rafi Pratama (Contoh)",
    class: "VIII-A",
    statusToday: "sudah",
    statusText: "Catatan hari ini: Sudah diisi",
    consistency: "konsisten",
    consistencyLabel: "Rutin mencatat",
    consistencyBars: [true, true, true],
    parentViewed: true,
    parentViewedDate: "14 Ram",
    daysFilled: "14/14 hari",
    missedCount: 0,
  },
  {
    id: "hana-contoh",
    name: "Hana (Contoh)",
    class: "VIII-A",
    statusToday: "sudah",
    statusText: "Catatan hari ini: Sudah diisi",
    consistency: "konsisten",
    consistencyLabel: "Rutin mencatat",
    consistencyBars: [true, true, true],
    parentViewed: true,
    parentViewedDate: "13 Ram",
    daysFilled: "14/14 hari",
    missedCount: 0,
  },
  {
    id: "dimas-contoh",
    name: "Dimas (Contoh)",
    class: "VIII-A",
    statusToday: "belum",
    statusText: "Catatan hari ini: Belum diisi",
    consistency: "sapa",
    consistencyLabel: "Perlu sapaan",
    consistencyBars: [true, false, false],
    parentViewed: false,
    daysFilled: "9/14 hari",
    missedCount: 2,
    daysUnfilledCount: 4,
    lastFilled: "10 Ramadan",
    greeted: false,
  },
  {
    id: "salma-contoh",
    name: "Salma (Contoh)",
    class: "VIII-A",
    statusToday: "berhalangan",
    statusText: "Catatan hari ini: Berhalangan",
    consistency: "konsisten",
    consistencyLabel: "Rutin mencatat",
    consistencyBars: [true, true, true],
    parentViewed: true,
    parentViewedDate: "14 Ram",
    daysFilled: "14/14 hari",
    missedCount: 1,
  },
  {
    id: "fajar-contoh",
    name: "Fajar (Contoh)",
    class: "VIII-A",
    statusToday: "belum",
    statusText: "Catatan hari ini: Belum diisi",
    consistency: "sapa",
    consistencyLabel: "Perlu sapaan",
    consistencyBars: [true, false, false],
    parentViewed: true,
    parentViewedDate: "11 Ram",
    daysFilled: "10/14 hari",
    missedCount: 1,
    daysUnfilledCount: 3,
    lastFilled: "11 Ramadan",
    greeted: false,
  },
];

export const STUDENTS_TO_GREET = [
  {
    id: "dimas-contoh",
    name: "Dimas (Contoh)",
    class: "VIII-A",
    unfilledDays: "Belum mengisi 4 hari",
    lastFilledDate: "10 Ramadan",
    greeted: false,
    greetedAt: null,
  },
  {
    id: "fajar-contoh",
    name: "Fajar (Contoh)",
    class: "VIII-A",
    unfilledDays: "Belum mengisi 3 hari",
    lastFilledDate: "11 Ramadan",
    greeted: false,
    greetedAt: null,
  },
  {
    id: "ilham-contoh",
    name: "Ilham (Contoh)",
    class: "VIII-A",
    unfilledDays: "Belum mengisi 2 hari",
    lastFilledDate: "12 Ramadan",
    greeted: false,
    greetedAt: null,
  },
  {
    id: "rafi-contoh",
    name: "Rafi Pratama (Demo)",
    class: "VIII-A",
    unfilledDays: "Sapaan hangat rutin",
    lastFilledDate: "16 Ramadan",
    greeted: false,
    greetedAt: null,
  },
];

// Setiap kegiatan khusus memiliki skema `fields` dinamis yang dapat ditambah/diatur oleh Admin Sekolah.
export const INITIAL_KEGIATAN_KHUSUS = [
  {
    id: "nuzulul-quran",
    tag: "17 Ramadan",
    title: "Nuzulul Qur'an",
    description:
      "Peringatan turunnya Al-Qur'an dengan tadarus bersama dan kajian singkat.",
    status: "belum",
    dateRange: "17 Ramadan 1448 H · Malam Nuzulul Qur'an",
    arahan:
      "Mengikuti tadarus Al-Qur'an bersama keluarga atau di masjid sekolah, serta menyimak kajian peringatan Nuzulul Qur'an.",
    fields: [
      {
        id: "kehadiran",
        type: "attendance",
        label: "Kehadiran Kegiatan",
        required: true,
      },
      {
        id: "penceramah",
        type: "text",
        label: "Nama Penceramah / Pembimbing",
        placeholder: "Contoh: Guru PAI / Pemateri masjid",
      },
      {
        id: "ringkasan_ceramah",
        type: "textarea",
        label: "Ringkasan Ceramah Nuzulul Qur'an",
        placeholder: "Tuliskan inti materi yang kamu pahami secara jujur...",
      },
    ],
    responses: {},
    savedAt: null,
  },
  {
    id: "lailatul-qadr",
    tag: "10 Malam Terakhir",
    title: "Lailatul Qadr",
    description:
      "Menghidupkan sepuluh malam terakhir Ramadan dengan sholat malam, tilawah, dan doa.",
    status: "belum",
    dateRange: "21–30 Ramadan 1448 H · Malam Ganjil: 21, 23, 25, 27, 29",
    arahan:
      "Perbanyak doa memohon ampunan, tilawah Al-Qur'an, dan menjaga ketenangan ibadah di sepuluh malam terakhir.",
    fields: [
      {
        id: "malam_ganjil",
        type: "chips",
        label: "Penanda Malam Ganjil (Ramadan)",
        options: [21, 23, 25, 27, 29],
      },
      {
        id: "kehadiran",
        type: "attendance",
        label: "Keikutsertaan I'tikaf / Qiyamul Lail",
      },
      {
        id: "catatan_amalan",
        type: "textarea",
        label: "Catatan Kegiatan Malam",
        placeholder: "Tilawah, doa, atau kegiatan yang dilakukan bersama keluarga...",
      },
    ],
    responses: {
      malam_ganjil: [21, 23, 25, 27, 29],
    },
    savedAt: null,
  },
  {
    id: "pesantren-kilat",
    tag: "Program Sekolah · 14–16 Ramadan",
    title: "Pesantren Kilat",
    description:
      "Pembinaan akhlak, tadarus berkelompok, dan diskusi adab remaja muslim.",
    status: "sudah",
    dateRange: "14–16 Ramadan 1448 H · Lingkungan Sekolah (Contoh)",
    arahan:
      "Hadir tepat waktu, membawa Al-Qur'an dan buku catatan, serta aktif dalam kelompok tadarus dan diskusi adab.",
    fields: [
      {
        id: "kehadiran",
        type: "attendance",
        label: "Kehadiran Pesantren Kilat",
        required: true,
      },
      {
        id: "materi",
        type: "textarea",
        label: "Ringkasan Materi & Refleksi",
        placeholder: "Tuliskan pelajaran utama dari kegiatan pesantren kilat...",
      },
    ],
    responses: {
      kehadiran: "hadir",
      materi: "Belajar adab kepada orang tua, guru, dan menjaga lisan saat berpuasa.",
    },
    savedAt: "16 Ramadan 1448 H, 15:30 WIB",
  },
  {
    id: "idulfitri",
    tag: "1 Syawal 1448 H",
    title: "Idulfitri",
    description:
      "Sholat Idulfitri berjamaah dan silaturahmi bersama keluarga serta guru.",
    status: "belum",
    dateRange: "1 Syawal 1448 H · Hari Raya Idul Fitri",
    arahan:
      "Menunaikan zakat fitrah sebelum sholat Id, melaksanakan sholat Idulfitri berjamaah, dan menyambung silaturahmi.",
    fields: [
      {
        id: "kehadiran",
        type: "attendance",
        label: "Pelaksanaan Sholat Idulfitri",
      },
      {
        id: "lokasi",
        type: "text",
        label: "Lokasi Sholat Id / Keterangan",
        placeholder: "Contoh: Masjid lingkungan rumah bersama keluarga",
      },
    ],
    responses: {},
    savedAt: null,
  },
];

export const INITIAL_PARENT_WEEK_DAYS = [
  {
    day: 8,
    label: "H8",
    fullDate: "8 Ramadan 1448 H · 15 Feb 2027",
    status: "terisi",
    confirmed: true,
    confirmedAt: "15 Feb 2027 · 20:10 WIB",
    summary: {
      shaum: "Berpuasa",
      sholatWajib: "5/5 waktu tercatat (4 berjamaah)",
      sholatSunnah: "Tarawih, Dhuha",
      tadarus: "QS. Al-Baqarah · Ayat 1–15 (Juz 1)",
      infaq: "Berinfaq di masjid dekat rumah",
      ceramah: "Keutamaan Niat Puasa · Di Masjid",
    },
  },
  {
    day: 9,
    label: "H9",
    fullDate: "9 Ramadan 1448 H · 16 Feb 2027",
    status: "terisi",
    confirmed: true,
    confirmedAt: "16 Feb 2027 · 20:45 WIB",
    summary: {
      shaum: "Berpuasa",
      sholatWajib: "5/5 waktu tercatat (3 berjamaah)",
      sholatSunnah: "Tarawih",
      tadarus: "QS. Al-Baqarah · Ayat 16–30 (Juz 1)",
      infaq: "Berinfaq di kotak kelas",
      ceramah: "Menjaga Lisan di Bulan Puasa · Di Rumah",
    },
  },
  {
    day: 10,
    label: "H10",
    fullDate: "10 Ramadan 1448 H · 17 Feb 2027",
    status: "terisi",
    confirmed: true,
    confirmedAt: "17 Feb 2027 · 21:00 WIB",
    summary: {
      shaum: "Berpuasa",
      sholatWajib: "4/5 waktu tercatat",
      sholatSunnah: "Tarawih, Qobla & Ba'da",
      tadarus: "QS. Al-Baqarah · Ayat 31–48 (Juz 1)",
      infaq: "Tidak berinfaq hari ini",
      ceramah: "Adab Belajar · Lewat Internet",
    },
  },
  {
    day: 11,
    label: "H11",
    fullDate: "11 Ramadan 1448 H · 18 Feb 2027",
    status: "susulan",
    confirmed: false,
    confirmedAt: null,
    summary: {
      shaum: "Berpuasa",
      sholatWajib: "5/5 waktu tercatat (Catatan Susulan)",
      sholatSunnah: "Dhuha",
      tadarus: "QS. Al-Baqarah · Ayat 49–60 (Juz 1)",
      infaq: "Berinfaq bersama keluarga saat berbuka",
      ceramah: "Belum diisi",
    },
  },
  {
    day: 12,
    label: "H12",
    fullDate: "12 Ramadan 1448 H · 19 Feb 2027",
    status: "terisi",
    confirmed: true,
    confirmedAt: "19 Feb 2027 · 19:55 WIB",
    summary: {
      shaum: "Berpuasa",
      sholatWajib: "5/5 waktu tercatat (4 awal waktu)",
      sholatSunnah: "Tarawih, Dhuha",
      tadarus: "QS. Al-Baqarah · Ayat 61–75 (Juz 1)",
      infaq: "Berinfaq Jumat di masjid sekolah",
      ceramah: "Syukur atas Nikmat Sehat · Di Masjid",
    },
  },
  {
    day: 13,
    label: "H13",
    fullDate: "13 Ramadan 1448 H · 20 Feb 2027",
    status: "belum",
    confirmed: false,
    confirmedAt: null,
    summary: {
      shaum: "Belum diisi",
      sholatWajib: "Belum diisi",
      sholatSunnah: "Belum diisi",
      tadarus: "Belum diisi",
      infaq: "Belum diisi",
      ceramah: "Belum diisi",
    },
  },
  {
    day: 14,
    label: "H14",
    fullDate: "14 Ramadan 1448 H · 21 Feb 2027",
    status: "terisi",
    confirmed: false,
    confirmedAt: null,
    summary: {
      shaum: "Berpuasa",
      sholatWajib: "3/5 waktu tercatat",
      sholatSunnah: "Dhuha",
      tadarus: "QS. Al-Baqarah · Ayat 1–20 (Juz 1)",
      infaq: "Hari ini berinfaq di kotak masjid sekolah setelah Dzuhur.",
      ceramah: "Belum diisi",
    },
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-ortu-1",
    targetRole: "orang-tua",
    studentId: "rafi-contoh",
    studentName: "Rafi Pratama (Demo)",
    title: "Catatan Harian Diperbarui",
    message:
      "Rafi Pratama (Demo) baru saja mencatat Tadarus Qur'an (QS. Al-Baqarah ayat 1–20) dan Sholat Wajib.",
    timestamp: "Hari ini · 15:20 WIB",
    read: false,
  },
  {
    id: "notif-siswa-1",
    targetRole: "siswa",
    studentId: "rafi-contoh",
    studentName: "Rafi Pratama (Demo)",
    title: "Pengingat Hangat Wali Kelas",
    message:
      "Assalamu'alaikum Rafi, tetap semangat menjaga catatan harian Ramadan. Jika ada yang terlewat, silakan isi sebagai Susulan ya.",
    timestamp: "Hari ini · 10:15 WIB",
    read: false,
  },
];

export const TANYA_HISTORY = [
  {
    period: "Hari ini",
    hasFilterIcon: true,
    items: [
      { id: "q-air", text: "Syarat air untuk berwudhu dan dalilnya" },
      { id: "q-nuzulul", text: "Amalan pada malam Nuzulul Qur'an" },
      { id: "q-doa-buka", text: "Doa berbuka puasa beserta sumber hadits" },
    ],
  },
  {
    period: "Pekan lalu",
    hasFilterIcon: false,
    items: [
      { id: "q-lailatul", text: "Keutamaan 10 malam terakhir Ramadan" },
      { id: "q-tadarus", text: "Adab membaca Al-Qur'an saat Ramadan" },
    ],
  },
];

export const TANYA_SAMPLE_RESPONSES = {
  "q-air": {
    badge: "Contoh tampilan",
    summary:
      "Dalam literatur fikih, air yang dipakai untuk bersuci (berwudhu) adalah air mutlak yang suci lagi menyucikan—seperti air hujan, air sumur, atau air bersih yang tidak berubah sifat aslinya oleh campuran lain (seperti kopi atau teh).",
    dalilArabic: "وَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً طَهُورًا",
    dalilTranslation:
      '"Dan Kami turunkan dari langit air yang amat bersih (menyucikan)."',
    dalilSource: "QS. Al-Furqan: 48",
    note: "Contoh tampilan ini hanya ringkasan bacaan awal. Untuk rincian hukum bersuci sesuai mazhab yang dipelajari di sekolah, tanyakan kepada guru PAI atau orang tua.",
  },
  "q-nuzulul": {
    badge: "Contoh tampilan",
    summary:
      "Malam ke-17 Ramadan sering diperingati sebagai Nuzulul Qur'an. Di antara amalan yang dianjurkan selama bulan Ramadan adalah memperbanyak membaca, menyimak, dan merenungi makna Al-Qur'an.",
    dalilArabic: "شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ",
    dalilTranslation:
      '"Bulan Ramadan adalah bulan yang di dalamnya diturunkan Al-Qur\'an sebagai petunjuk bagi manusia."',
    dalilSource: "QS. Al-Baqarah: 185",
    note: "Contoh tampilan ini disiapkan sebagai bahan belajar singkat. Pastikan mencocokkan panduan kegiatan Nuzulul Qur'an dengan arahan guru di sekolah.",
  },
  "q-doa-buka": {
    badge: "Contoh tampilan",
    summary:
      "Salah satu doa berbuka puasa yang diriwayatkan dalam kitab hadits adalah doa yang dibaca setelah membatalkan puasa dengan air atau kurma.",
    dalilArabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    dalilTranslation:
      '"Telah hilang rasa haus, telah basah urat-urat, dan telah tetap pahala, insya Allah."',
    dalilSource: "HR. Abu Dawud no. 2357",
    note: "Contoh tampilan ini bersifat pengantar. Kamu juga bisa menanyakan bacaan doa berbuka yang biasa diamalkan keluarga atau guru.",
  },
  "q-lailatul": {
    badge: "Contoh tampilan",
    summary:
      "Sepuluh malam terakhir Ramadan adalah waktu yang sangat dianjurkan untuk lebih bersungguh-sungguh dalam beribadah, membaca Al-Qur'an, dan memperbanyak doa.",
    dalilArabic: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ",
    dalilTranslation:
      '"Malam kemuliaan itu lebih baik daripada seribu bulan."',
    dalilSource: "QS. Al-Qadr: 3 · lih. juga HR. Bukhari no. 2017",
    note: "Contoh tampilan ini hanya rujukan awal. Diskusikan amalan yang sesuai usia dan jadwal sekolah bersama orang tua atau guru.",
  },
  "q-tadarus": {
    badge: "Contoh tampilan",
    summary:
      "Di antara adab membaca Al-Qur'an adalah dalam keadaan bersih, memulai dengan ta'awudz dan basmalah, membaca dengan tenang (tartil), serta berusaha memahami pesannya.",
    dalilArabic: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
    dalilTranslation:
      '"Dan bacalah Al-Qur\'an itu dengan perlahan-lahan (tartil)."',
    dalilSource: "QS. Al-Muzzammil: 4",
    note: "Contoh tampilan ini hanya ringkasan umum. Untuk bimbingan tajwid dan tahsin, mintalah koreksi langsung dari guru mengaji atau orang tua.",
  },
};
