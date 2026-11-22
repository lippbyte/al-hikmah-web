import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  LuArrowLeft,
  LuChevronRight,
  LuCheck,
  LuHouse,
  LuCalendarDays,
  LuMessageSquare,
  LuUser,
  LuSparkles,
} from "react-icons/lu";
import AppLayout from "../components/AppLayout";

export const INITIAL_KEGIATAN_KHUSUS = [
  {
    id: "nuzulul-quran",
    tag: "17 Ramadan",
    title: "Nuzulul Qur'an",
    description:
      "Peringatan turunnya Al-Qur'an dengan tadarus bersama dan kajian singkat.",
    status: "belum", // "sudah" | "belum"
    dateRange: "17 Ramadan 1448 H · Malam Nuzulul Qur'an",
    arahan:
      "Mengikuti tadarus Al-Qur'an bersama keluarga atau di masjid sekolah, serta menyimak kajian peringatan Nuzulul Qur'an.",
    hasNightChips: false,
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
    hasNightChips: true,
    nightChips: [21, 23, 25, 27, 29],
    savedAt: null,
  },
  {
    id: "pesantren-kilat",
    tag: "Program Sekolah · 14–16 Ramadan",
    title: "Pesantren Kilat",
    description:
      "Pembinaan akhlak, tadarus berkelompok, dan diskusi adab remaja muslim.",
    status: "sudah",
    dateRange: "14–16 Ramadan 1448 H · Kampus Sekolah Al-Hikmah",
    arahan:
      "Hadir tepat waktu, membawa Al-Qur'an dan buku catatan, serta aktif dalam kelompok tadarus dan halaqah adab.",
    hasNightChips: false,
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
    hasNightChips: false,
    savedAt: null,
  },
];

export default function KegiatanKhusus() {
  const navigate = useNavigate();

  // Load from localStorage so status updates dynamically
  const [kegiatanList, setKegiatanList] = useState(() => {
    try {
      const saved = localStorage.getItem("al-hikmah-kegiatan-khusus");
      return saved ? JSON.parse(saved) : INITIAL_KEGIATAN_KHUSUS;
    } catch {
      return INITIAL_KEGIATAN_KHUSUS;
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("al-hikmah-kegiatan-khusus");
      if (saved) {
        setKegiatanList(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const completedCount = kegiatanList.filter((k) => k.status === "sudah").length;
  const totalCount = kegiatanList.length;

  return (
    <AppLayout>
      {/* ===================== MAIN CONTENT WRAPPER ===================== */}
      <main className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-28 lg:pb-12 gap-6">
        
        {/* ===================== TOP PAGE HEADER (NO MOON/CALENDAR ICONS) ===================== */}
        <header className="flex items-center justify-between select-none">
          <div className="flex items-center gap-3.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-xl border border-border bg-bg-surface flex items-center justify-center text-text-main shadow-2xs hover:bg-bg-elevated transition-colors cursor-pointer shrink-0"
              aria-label="Kembali ke Beranda"
            >
              <LuArrowLeft className="text-xl" />
            </motion.button>

            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-main leading-tight">
                Kegiatan Khusus
              </h1>
              <p className="text-xs md:text-sm text-text-muted font-normal mt-0.5">
                Program Ramadan aktif di sekolahmu
              </p>
            </div>
          </div>
        </header>

        {/* ===================== RESPONSIVE LAYOUT ===================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ================= LEFT MAIN LIST (7/12 & 8/12) ================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-3.5">
            {kegiatanList.map((item, idx) => {
              const isCompleted = item.status === "sudah";
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate(`/kegiatan-khusus/${item.id}`)}
                  className="bg-bg-surface border border-border rounded-2xl p-4 md:p-5 shadow-2xs hover:border-primary/50 transition-all cursor-pointer select-none space-y-2.5 group"
                >
                  {/* Top Row: Tag date & Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#78350F]">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Chevron */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-base md:text-lg font-bold text-text-main group-hover:text-primary transition-colors">
                      {item.title}
                    </h2>
                    <LuChevronRight className="text-lg text-text-muted group-hover:text-primary transition-colors shrink-0" />
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-text-muted font-normal leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ================= RIGHT STICKY SIDEBAR (DESKTOP) ================= */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6 select-none">
            
            {/* Widget 1: Ringkasan Partisipasi Program */}
            <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <div>
                  <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                    Progres Program
                  </span>
                  <h3 className="text-base font-bold text-text-main mt-0.5">
                    {completedCount} dari {totalCount} Kegiatan Diikuti
                  </h3>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-surface px-2.5 py-1 rounded-md">
                  {Math.round((completedCount / totalCount) * 100)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-md bg-bg-elevated overflow-hidden">
                <div
                  className="h-full bg-primary rounded-md transition-all duration-300"
                  style={{
                    width: `${(completedCount / totalCount) * 100}%`,
                  }}
                />
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                Catatan kegiatan khusus membantu bapak/ibu guru memantau keaktifan amaliyah ibadah di luar jam sekolah formal.
              </p>
            </div>

            {/* Widget 2: Panduan Amaliyah Nuzulul Qur'an */}
            <div className="bg-accent-surface border border-accent/30 rounded-3xl p-5 shadow-xs flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#451A03] uppercase tracking-wider">
                <LuSparkles className="text-sm text-accent" />
                <span>Malam Istimewa Ramadan</span>
              </div>
              <p className="text-xs md:text-sm text-[#78350F] font-medium leading-relaxed italic">
                "Bulan Ramadan adalah bulan yang di dalamnya diturunkan Al-Qur'an sebagai petunjuk bagi manusia."
              </p>
              <span className="text-[11px] text-[#92400E] font-semibold">
                (QS. Al-Baqarah: 185)
              </span>
            </div>

          </div>
        </div>
      </main>

      {/* ===================== FLOATING BOTTOM NAVIGATION BAR (MOBILE) ===================== */}
      <nav className="lg:hidden fixed bottom-3 md:bottom-5 inset-x-0 max-w-sm md:max-w-md mx-auto px-2 py-1.5 bg-bg-surface/90 backdrop-blur-md border border-border rounded-2xl shadow-lg flex items-center justify-between z-30 select-none">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold cursor-pointer transition-colors"
        >
          <LuHouse className="text-base" />
          <span>Hari Ini</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/ramadan")}
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-text-muted hover:text-text-main text-xs transition-colors cursor-pointer"
        >
          <LuCalendarDays className="text-base" />
          <span>Ramadan</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/chat")}
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-text-muted hover:text-text-main text-xs transition-colors cursor-pointer"
          title="Buka AI Chat"
        >
          <LuMessageSquare className="text-base" />
          <span>Tanya</span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-text-muted hover:text-text-main text-xs transition-colors cursor-pointer"
        >
          <LuUser className="text-base" />
          <span>Profil</span>
        </button>
      </nav>
    </AppLayout>
  );
}
