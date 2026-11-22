import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LuMoon,
  LuCheck,
  LuClock,
  LuCircle,
  LuArrowLeft,
  LuShieldCheck,
  LuSparkles,
} from "react-icons/lu";
import AppLayout from "../../components/AppLayout";

// 7 Days data for Pekan ke-2 Ramadan (H8 to H14) matching Mockup O-01
const WEEK_DAYS = [
  { day: 8, label: "H8", date: "15 Feb", status: "terisi" },
  { day: 9, label: "H9", date: "16 Feb", status: "terisi" },
  { day: 10, label: "H10", date: "17 Feb", status: "terisi" },
  { day: 11, label: "H11", date: "18 Feb", status: "susulan" },
  { day: 12, label: "H12", date: "19 Feb", status: "terisi" },
  { day: 13, label: "H13", date: "20 Feb", status: "belum" },
  { day: 14, label: "H14", date: "21 Feb", status: "terisi" },
];

export default function KonfirmasiOrangTua() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // State for Section O-01 vs Section O-02 (Confirmed state)
  const [isConfirmed, setIsConfirmed] = useState(() => {
    try {
      const saved = localStorage.getItem("al-hikmah-ortu-confirmed");
      return saved === "true";
    } catch {
      return false;
    }
  });

  const [confirmTimestamp, setConfirmTimestamp] = useState(() => {
    try {
      const savedTime = localStorage.getItem("al-hikmah-ortu-confirm-time");
      return savedTime || "Sabtu, 21 Februari 2027 · 19.42 WIB";
    } catch {
      return "Sabtu, 21 Februari 2027 · 19.42 WIB";
    }
  });

  const handleConfirm = () => {
    const now = new Date();
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dayName = days[now.getDay()];
    const dateNum = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");

    const timeStr = `${dayName}, ${dateNum} ${monthName} ${year} · ${hours}.${mins} WIB`;
    setConfirmTimestamp(timeStr);
    setIsConfirmed(true);

    try {
      localStorage.setItem("al-hikmah-ortu-confirmed", "true");
      localStorage.setItem("al-hikmah-ortu-confirm-time", timeStr);
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setIsConfirmed(false);
  };

  return (
    <AppLayout>
      <main className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-20 lg:pb-12 gap-5 md:gap-6 select-none">
        
        {/* ===================== TOP BRAND HEADER (VISIBLE ON MOBILE) ===================== */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-lg shadow-2xs">
            <LuMoon />
          </div>
          <span className="text-base font-bold text-text-main tracking-tight">
            Al Hikmah
          </span>
        </div>

        {/* ===================== SECTION O-01 / O-02 CONTAINER ===================== */}
        <AnimatePresence mode="wait">
          {!isConfirmed ? (
            <motion.div
              key="section-o01"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col gap-5 md:gap-6"
            >
              {/* Header Greeting */}
              <div>
                <span className="text-xs text-text-muted font-medium block">
                  Portal Konfirmasi Wali Santri
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main leading-tight mt-0.5">
                  Assalamu'alaikum, Bapak/Ibu
                </h1>
                <p className="text-xs md:text-sm text-text-muted font-normal mt-1">
                  Pantau dan konfirmasi keterlibatan ibadah ananda selama bulan suci Ramadan.
                </p>
              </div>

              {/* Responsive 2-Column Grid */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* ================= LEFT COLUMN: MAIN CONTENT (7/12 & 8/12) ================= */}
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
                  
                  {/* CARD 1: NAMA ANAK & RENTANG WAKTU */}
                  <div className="w-full bg-bg-surface border border-border rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xs space-y-4">
                    <div className="space-y-0.5">
                      <span className="text-xs text-text-muted font-medium block">
                        Nama anak
                      </span>
                      <h2 className="text-lg md:text-xl font-bold text-text-main leading-snug">
                        Ahmad Fauzan
                      </h2>
                      <p className="text-xs text-text-muted font-normal">
                        Kelas VIII-A · SMP Al-Hikmah Surabaya
                      </p>
                    </div>

                    <div className="w-full border-t border-border/60 pt-3.5 space-y-0.5">
                      <span className="text-xs text-text-muted font-medium block">
                        Rentang yang dikonfirmasi
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-text-main">
                        Pekan ke-2 Ramadan
                      </h3>
                      <p className="text-xs text-text-muted font-normal">
                        8 – 14 Ramadan 1448 H / 15 – 21 Feb 2027
                      </p>
                    </div>
                  </div>

                  {/* CARD 2: RINGKASAN CATATAN (7 HARI) */}
                  <div className="w-full bg-bg-surface border border-border rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm md:text-base font-bold text-text-main">
                        Ringkasan catatan
                      </h3>
                      <span className="text-xs text-text-muted font-medium">
                        7 hari
                      </span>
                    </div>

                    {/* 2 Metric Boxes: Hari terisi (5 hari) & Hari susulan (1 hari) */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4 text-left">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                          <LuCheck className="text-xs font-bold text-emerald-600" />
                          <span>Hari terisi</span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold text-emerald-700 mt-1 leading-tight">
                          5 hari
                        </div>
                      </div>

                      <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 text-left">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                          <LuClock className="text-xs text-amber-600" />
                          <span>Hari susulan</span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1 leading-tight">
                          1 hari
                        </div>
                      </div>
                    </div>

                    {/* SUB-CARD: CATATAN HARIAN (8-14 RAMADAN) */}
                    <div className="bg-bg-base/70 border border-border/80 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-text-main block">
                          Catatan harian (8–14 Ramadan)
                        </span>
                        <span className="text-[11px] text-text-muted">
                          Pekan 2
                        </span>
                      </div>

                      {/* 7 Chips Row: H8 to H14 */}
                      <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
                        {WEEK_DAYS.map((day) => {
                          let chipStyle =
                            "bg-bg-surface border-border text-text-muted";
                          let icon = <LuCircle className="text-[10px]" />;

                          if (day.status === "terisi") {
                            chipStyle =
                              "bg-emerald-50 border-emerald-300 text-emerald-700 font-bold";
                            icon = <LuCheck className="text-xs font-bold" />;
                          } else if (day.status === "susulan") {
                            chipStyle =
                              "bg-amber-50 border-amber-300 border-dashed text-amber-700 font-bold";
                            icon = <LuClock className="text-xs" />;
                          }

                          return (
                            <div
                              key={day.day}
                              className={`h-12 sm:h-14 md:h-16 rounded-xl border flex flex-col items-center justify-center p-1 shadow-2xs ${chipStyle}`}
                            >
                              <span className="text-[11px] sm:text-xs font-bold">
                                {day.label}
                              </span>
                              <div className="mt-0.5">{icon}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Legend below the 7 chips */}
                      <div className="flex items-center justify-between text-[11px] sm:text-xs text-text-muted pt-1">
                        <span className="flex items-center gap-1 font-medium">
                          <LuCheck className="text-emerald-600 font-bold text-xs" />
                          <span>Terisi</span>
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <LuClock className="text-amber-600 text-xs" />
                          <span>Susulan</span>
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <LuCircle className="text-text-muted text-[9px]" />
                          <span>Belum diisi</span>
                        </span>
                      </div>
                    </div>

                    {/* Privacy Explanatory Note */}
                    <p className="text-xs text-text-muted leading-relaxed font-normal">
                      Ringkasan ini menunjukkan hari anak mencatat amaliyah, tanpa rincian ibadah maupun alasan berhalangan.
                    </p>
                  </div>

                  {/* ACTION BUTTON & FOOTER (MOBILE INLINE) */}
                  <div className="flex flex-col gap-2.5 pt-1 lg:hidden">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleConfirm}
                      className="w-full h-12 md:h-14 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-xs sm:text-sm md:text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <LuCheck className="text-base md:text-lg font-bold" />
                      <span>Saya sudah melihat catatan anak saya</span>
                    </motion.button>

                    <p className="text-[11px] sm:text-xs text-text-muted text-center font-normal">
                      Konfirmasi tercatat langsung tanpa perlu membuat akun
                    </p>
                  </div>

                </div>

                {/* ================= RIGHT STICKY SIDEBAR (DESKTOP) ================= */}
                <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6">
                  
                  {/* Action Confirmation Card on Desktop */}
                  <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                      <LuShieldCheck className="text-base" />
                      <span>Konfirmasi Orang Tua</span>
                    </div>

                    <p className="text-xs text-text-muted leading-relaxed">
                      Dengan mengonfirmasi, Anda menyatakan telah mendampingi dan memeriksa mutaba'ah amaliyah ananda pada pekan ke-2.
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleConfirm}
                      className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-xs md:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <LuCheck className="text-base font-bold" />
                      <span>Saya sudah melihat catatan</span>
                    </motion.button>

                    <p className="text-[11px] text-text-muted text-center font-medium">
                      Konfirmasi tersimpan otomatis di lembar wali kelas
                    </p>
                  </div>

                  {/* Penjelasan Privasi Fiqih Mutaba'ah */}
                  <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs space-y-2.5">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">
                      Ketentuan Privasi Catatan
                    </span>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Ringkasan mingguan ini dirancang untuk menunjukkan keaktifan anak tanpa membuka rincian uzur syar'i maupun ibadah pribadi secara spesifik, guna menjaga adab dan kenyamanan ananda.
                    </p>
                  </div>

                  {/* Hikmah Ramadan Card */}
                  <div className="bg-accent-surface border border-accent/30 rounded-3xl p-5 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#451A03] uppercase tracking-wider">
                      <LuSparkles className="text-sm text-accent" />
                      <span>Kemitraan Madrasah & Rumah</span>
                    </div>
                    <p className="text-xs text-[#78350F] leading-relaxed italic">
                      "Peran teladan orang tua di rumah adalah pilar utama keberkahan ibadah puasa dan sholat anak."
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>
          ) : (
            /* ===================== SECTION O-02: KONFIRMASI BERHASIL ===================== */
            <motion.div
              key="section-o02"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center justify-center py-6 md:py-12 gap-6"
            >
              {/* Main Success Card (Responsive on Desktop & Mobile 1:1) */}
              <div className="w-full max-w-lg bg-bg-surface border border-border rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm flex flex-col items-center text-center gap-4">
                {/* Big Green Circle Check Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-3xl sm:text-4xl shadow-xs">
                  <LuCheck className="stroke-[2.5]" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-main">
                    Sudah dilihat orang tua
                  </h2>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-sm mx-auto">
                    Terima kasih, Bapak/Ibu telah melihat catatan amaliyah{" "}
                    <span className="font-semibold text-text-main">
                      Ahmad Fauzan
                    </span>{" "}
                    untuk rentang 8 – 14 Ramadan 1448 H.
                  </p>
                </div>

                {/* Timestamp Card */}
                <div className="w-full bg-bg-base/70 border border-border/80 rounded-2xl p-4 space-y-1 mt-2">
                  <span className="text-[11px] text-text-muted font-medium block">
                    Waktu konfirmasi tercatat
                  </span>
                  <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-text-main">
                    <LuClock className="text-primary text-sm shrink-0" />
                    <span>{confirmTimestamp}</span>
                  </div>
                </div>

                {/* Info Note & Return Button */}
                <div className="w-full pt-4 space-y-3">
                  <p className="text-xs text-text-muted">
                    Bapak/Ibu dapat menutup halaman ini dengan aman.
                  </p>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full h-12 rounded-xl bg-bg-surface hover:bg-bg-elevated border border-border text-text-main font-semibold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <LuArrowLeft className="text-base" />
                    <span>Kembali lihat ringkasan</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </AppLayout>
  );
}
