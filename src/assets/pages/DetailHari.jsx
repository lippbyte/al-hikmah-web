import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LuArrowLeft,
  LuCalendarDays,
  LuCheck,
  LuClock,
  LuMoon,
  LuArrowRight,
} from "react-icons/lu";
import AppLayout from "../components/AppLayout";

const PRAYERS = [
  { id: "subuh", name: "Subuh", time: "04:42 WIB", defaultStatus: "sudah" },
  { id: "dzuhur", name: "Dzuhur", time: "12:05 WIB", defaultStatus: "sudah" },
  { id: "ashar", name: "Ashar", time: "15:15 WIB", defaultStatus: "sudah" },
  { id: "maghrib", name: "Maghrib", time: "18:12 WIB", defaultStatus: "sudah" },
  { id: "isya", name: "Isya", time: "19:22 WIB", defaultStatus: "sudah" },
];

export default function DetailHari() {
  const navigate = useNavigate();
  const { day } = useParams();

  // State: "form" (S-05) or "success" (S-06)
  const [stage, setStage] = useState("form");
  const [shaumStatus, setShaumStatus] = useState("sudah");
  const [prayerStatuses, setPrayerStatuses] = useState(
    PRAYERS.reduce((acc, p) => ({ ...acc, [p.id]: p.defaultStatus }), {})
  );
  const selectedDay = day || "13";
  const dateFormatted = `Jumat, 20 Feb 2027 · ${selectedDay} Ramadan 1448 H`;

  const handlePrayerStatusChange = (id, status) => {
    setPrayerStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const handleSave = () => {
    setStage("success");
  };

  return (
    <AppLayout>
      {/* ===================== MAIN CONTENT WRAPPER ===================== */}
      <main className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-12 gap-6">
        <AnimatePresence mode="wait">
          {stage === "form" ? (
            /* ===================== SECTION S-05: DETAIL CATATAN HARI ===================== */
            <motion.div
              key="detail-form-stage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              {/* Header: Back button + Title & Date */}
              <div className="flex items-center justify-between select-none">
                <div className="flex items-center gap-3.5">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    type="button"
                    onClick={() => navigate("/ramadan")}
                    className="w-10 h-10 rounded-xl border border-border bg-bg-surface flex items-center justify-center text-text-main shadow-2xs hover:bg-bg-elevated transition-colors cursor-pointer shrink-0"
                    aria-label="Kembali ke kalender"
                  >
                    <LuArrowLeft className="text-xl" />
                  </motion.button>

                  <div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-main">
                      Detail Catatan Hari
                    </h1>
                    <p className="text-xs md:text-sm text-text-muted font-normal flex items-center gap-1.5 mt-0.5">
                      <LuCalendarDays className="text-xs shrink-0" />
                      <span>{dateFormatted}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* ===================== RESPONSIVE 2-COLUMN GRID ===================== */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* ================= LEFT MAIN FORM (7/12 & 8/12) ================= */}
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                  
                  {/* Warning/Notice Banner: Catatan Susulan */}
                  <div className="w-full bg-accent-surface border border-accent/30 rounded-2xl p-4 flex items-center gap-3 shadow-2xs">
                    <LuClock className="text-accent text-lg shrink-0" />
                    <span className="text-xs md:text-sm font-bold text-[#451A03] leading-snug">
                      Catatan susulan · Pertama diisi pada 14 Ramadan, pukul 08:40 WIB
                    </span>
                  </div>

                  {/* 1. SHAUM SECTION */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">
                      SHAUM
                    </div>

                    <div className="bg-bg-surface border border-border rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-text-main text-sm sm:text-base block">
                            Shaum Ramadan
                          </span>
                          <span className="text-xs text-text-muted">
                            Puasa wajib hari ke-{selectedDay}
                          </span>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-primary-surface text-primary font-semibold hidden sm:inline">
                          Wajib
                        </span>
                      </div>

                      {/* Segmented Toggle Control */}
                      <div className="bg-bg-elevated/70 p-1.5 rounded-xl border border-border/50 grid grid-cols-3 gap-1">
                        {["sudah", "belum", "berhalangan"].map((option) => {
                          const isSelected = shaumStatus === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setShaumStatus(option)}
                              className={`py-2 px-1 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer select-none flex items-center justify-center gap-1.5 ${
                                isSelected
                                  ? "bg-primary text-white shadow-xs"
                                  : "text-text-muted hover:text-text-main"
                              }`}
                            >
                              {isSelected && option === "sudah" && (
                                <LuCheck className="text-xs sm:text-sm font-bold" />
                              )}
                              <span className="capitalize">{option}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 2. SHOLAT WAJIB SECTION */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-text-muted uppercase tracking-wider px-1">
                      <span>SHOLAT WAJIB</span>
                      <span className="font-normal normal-case">5 waktu</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                      {PRAYERS.map((prayer) => {
                        const currentStatus = prayerStatuses[prayer.id];
                        return (
                          <div
                            key={prayer.id}
                            className="bg-bg-surface border border-border rounded-2xl p-4 shadow-2xs space-y-3 flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between px-0.5">
                              <span className="font-bold text-text-main text-sm sm:text-base">
                                {prayer.name}
                              </span>
                              <span className="text-xs text-text-muted">
                                {prayer.time}
                              </span>
                            </div>

                            {/* Segmented Toggle */}
                            <div className="bg-bg-elevated/70 p-1 rounded-xl border border-border/50 grid grid-cols-3 gap-1">
                              {["sudah", "belum", "berhalangan"].map((option) => {
                                const isSelected = currentStatus === option;
                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => handlePrayerStatusChange(prayer.id, option)}
                                    className={`py-1.5 px-1 text-xs font-semibold rounded-lg transition-all cursor-pointer select-none flex items-center justify-center gap-1 ${
                                      isSelected
                                        ? "bg-primary text-white shadow-xs"
                                        : "text-text-muted hover:text-text-main"
                                    }`}
                                  >
                                    {isSelected && option === "sudah" && (
                                      <LuCheck className="text-xs font-bold" />
                                    )}
                                    <span className="capitalize">{option}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Note & Mobile Submit */}
                  <div className="pt-2 flex flex-col gap-3">
                    <p className="text-xs text-center text-text-muted leading-relaxed px-4">
                      Isilah apa adanya. Terlambat boleh, hanya diberi tanda waktu.
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleSave}
                      className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-colors shadow-xs cursor-pointer text-center lg:hidden"
                    >
                      Simpan Perubahan
                    </motion.button>
                  </div>
                </div>

                {/* ================= RIGHT STICKY SIDEBAR (DESKTOP) ================= */}
                <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6">
                  
                  {/* Widget 1: Status Catatan & Aksi Simpan */}
                  <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-2 border-b border-border/50">
                      <div>
                        <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                          Status Hari ke-{selectedDay}
                        </span>
                        <h3 className="text-base font-bold text-text-main mt-0.5">
                          Catatan Susulan
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-md">
                        Susulan
                      </span>
                    </div>

                    <p className="text-xs text-text-muted leading-relaxed">
                      Perubahan yang Anda simpan akan memperbarui data kalender dan tetap tercatat secara transparan dengan stempel susulan.
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleSave}
                      className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-colors shadow-xs cursor-pointer text-center flex items-center justify-center gap-2 mt-2"
                    >
                      <LuCheck className="text-base" />
                      <span>Simpan Perubahan</span>
                    </motion.button>
                  </div>

                  {/* Widget 2: Riwayat Pengisian */}
                  <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      Riwayat Pencatatan
                    </h4>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-start gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-text-main">Pertama diisi</div>
                          <div className="text-text-muted text-[11px]">14 Ramadan 1448 H · 08:40 WIB</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-text-main">Terakhir diperbarui</div>
                          <div className="text-text-muted text-[11px]">Hari ini (sedang disunting)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Widget 3: Kembali ke Kalender */}
                  <button
                    type="button"
                    onClick={() => navigate("/ramadan")}
                    className="w-full py-3 rounded-xl border border-border bg-bg-surface hover:bg-bg-elevated text-xs font-semibold text-text-main transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <span>Kembali ke Kalender Ramadan</span>
                    <LuArrowRight className="text-sm" />
                  </button>

                </div>
              </div>
            </motion.div>
          ) : (
            /* ===================== SECTION S-06: KONFIRMASI TERSIMPAN (SUSULAN) ===================== */
            <motion.div
              key="detail-success-stage"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl mx-auto flex-1 flex flex-col justify-between py-6 min-h-[520px]"
            >
              {/* Top Header */}
              <div className="select-none text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-text-main">
                  Catatan Tersimpan
                </h1>
                <p className="text-xs md:text-sm text-text-muted font-normal mt-0.5">
                  {dateFormatted}
                </p>
              </div>

              {/* Center Message */}
              <div className="flex flex-col items-center justify-center my-auto text-center gap-5 py-8">
                {/* Large Green Check Badge */}
                <div className="w-20 h-20 rounded-2xl border-2 border-primary bg-primary-surface text-primary flex items-center justify-center text-4xl shadow-sm">
                  <LuCheck />
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl md:text-2xl font-bold text-text-main max-w-md leading-snug">
                    Terima kasih, catatan amaliyahmu hari ini sudah tersimpan.
                  </h2>
                  <p className="text-xs md:text-sm text-text-muted font-normal">
                    Catatan susulan telah berhasil diperbarui ke dalam kalender Ramadan.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 w-full max-w-sm">
                  {/* Card 1: Timestamp Card */}
                  <div className="w-full bg-bg-surface border border-border rounded-xl py-3 px-4 flex items-center justify-center gap-2 text-xs md:text-sm text-text-main shadow-2xs">
                    <LuClock className="text-primary text-base" />
                    <span>Tersimpan pukul 08:40 WIB</span>
                  </div>

                  {/* Card 2: Susulan Card */}
                  <div className="w-full bg-accent-surface border border-accent/30 rounded-xl py-3 px-4 flex items-center justify-center gap-2 text-xs md:text-sm text-[#451A03] font-bold shadow-2xs">
                    <LuClock className="text-accent text-base shrink-0" />
                    <span>Tersimpan sebagai catatan susulan.</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 w-full">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate("/")}
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-colors shadow-xs cursor-pointer text-center"
                >
                  Kembali ke Hari Ini
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate("/ramadan")}
                  className="w-full py-3.5 rounded-xl border border-border bg-bg-surface hover:bg-bg-elevated text-text-main font-semibold text-sm transition-colors shadow-2xs cursor-pointer text-center"
                >
                  Lihat Kalender Ramadan
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </AppLayout>
  );
}
