import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LuArrowLeft,
  LuCalendarDays,
  LuCheck,
  LuClock,
  LuMoon,
  LuBookOpen,
  LuMessageSquare,
} from "react-icons/lu";
import AppLayout from "../components/AppLayout";

const PRAYERS = [
  { id: "subuh", name: "Subuh", time: "04:42 WIB", defaultStatus: "sudah" },
  { id: "dzuhur", name: "Dzuhur", time: "12:05 WIB", defaultStatus: "sudah" },
  { id: "ashar", name: "Ashar", time: "15:15 WIB", defaultStatus: "sudah" },
  { id: "maghrib", name: "Maghrib", time: "18:12 WIB", defaultStatus: "belum" },
  { id: "isya", name: "Isya", time: "19:22 WIB", defaultStatus: "belum" },
];

export default function IsiCatatan() {
  const navigate = useNavigate();

  // State: "form" (S-02) or "success" (S-03)
  const [stage, setStage] = useState("form");
  const [shaumStatus, setShaumStatus] = useState("sudah");
  const [prayerStatuses, setPrayerStatuses] = useState(
    PRAYERS.reduce((acc, p) => ({ ...acc, [p.id]: p.defaultStatus }), {})
  );

  const handlePrayerStatusChange = (id, status) => {
    setPrayerStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const handleSave = () => {
    setStage("success");
  };

  const completedPrayers = Object.values(prayerStatuses).filter((s) => s === "sudah").length;
  const isShaumCompleted = shaumStatus === "sudah";
  const totalCompleted = (isShaumCompleted ? 1 : 0) + completedPrayers;
  const totalItems = 6;

  return (
    <AppLayout>
      {/* ===================== MAIN CONTENT WRAPPER ===================== */}
      <main className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-12 gap-6">
        <AnimatePresence mode="wait">
          {stage === "form" ? (
            /* ===================== SECTION S-02: ISI CATATAN HARIAN ===================== */
            <motion.div
              key="form-stage"
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
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-xl border border-border bg-bg-surface flex items-center justify-center text-text-main shadow-2xs hover:bg-bg-elevated transition-colors cursor-pointer shrink-0"
                    aria-label="Kembali"
                  >
                    <LuArrowLeft className="text-xl" />
                  </motion.button>

                  <div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-main">
                      Isi Catatan Harian
                    </h1>
                    <p className="text-xs md:text-sm text-text-muted font-normal flex items-center gap-1.5 mt-0.5">
                      <LuCalendarDays className="text-xs shrink-0" />
                      <span>Senin, 23 Feb 2027 · 16 Ramadan 1448 H</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* ===================== RESPONSIVE 2-COLUMN GRID ===================== */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* ================= LEFT MAIN FORM (7/12 & 8/12) ================= */}
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                  
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
                            Puasa wajib hari ke-16
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

                  {/* Footer Reminder & Secondary Submit */}
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
                      Simpan Catatan
                    </motion.button>
                  </div>
                </div>

                {/* ================= RIGHT STICKY SIDEBAR (DESKTOP) ================= */}
                <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6">
                  
                  {/* Widget 1: Live Completion & Submit CTA */}
                  <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-2 border-b border-border/50">
                      <div>
                        <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                          Ringkasan Hari Ini
                        </span>
                        <h3 className="text-base font-bold text-text-main mt-0.5">
                          {totalCompleted} dari {totalItems} Selesai
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-primary bg-primary-surface px-2.5 py-1 rounded-md">
                        {Math.round((totalCompleted / totalItems) * 100)}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-md bg-bg-elevated overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-md transition-all duration-300"
                        style={{
                          width: `${(totalCompleted / totalItems) * 100}%`,
                        }}
                      />
                    </div>

                    {/* Status Breakdown Checklist */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between py-1 border-b border-border/30">
                        <span className="text-text-muted">Shaum Ramadan</span>
                        <span className={`font-semibold capitalize ${shaumStatus === "sudah" ? "text-primary" : "text-text-muted"}`}>
                          {shaumStatus}
                        </span>
                      </div>
                      {PRAYERS.map((p) => (
                        <div key={p.id} className="flex items-center justify-between py-1 border-b border-border/30">
                          <span className="text-text-muted">{p.name}</span>
                          <span className={`font-semibold capitalize ${prayerStatuses[p.id] === "sudah" ? "text-primary" : "text-text-muted"}`}>
                            {prayerStatuses[p.id]}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Prominent Desktop Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleSave}
                      className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-colors shadow-xs cursor-pointer text-center mt-2 flex items-center justify-center gap-2"
                    >
                      <LuCheck className="text-base" />
                      <span>Simpan Catatan</span>
                    </motion.button>
                  </div>

                  {/* Widget 2: Adab & Motivasi Kejujuran Amaliyah */}
                  <div className="bg-accent-surface border border-accent/30 rounded-3xl p-5 shadow-xs flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#451A03] uppercase tracking-wider">
                      <LuBookOpen className="text-sm text-accent" />
                      <span>Adab Mencatat Amaliyah</span>
                    </div>
                    <p className="text-xs md:text-sm text-[#78350F] font-medium leading-relaxed italic">
                      "Amalan yang paling dicintai Allah adalah amalan yang kontinu (istiqomah) walaupun sedikit."
                    </p>
                    <span className="text-[11px] text-[#92400E] font-semibold">
                      (HR. Muslim no. 783)
                    </span>
                  </div>

                  {/* Widget 3: AI Fikih Shortcut */}
                  <div className="bg-bg-surface border border-border rounded-3xl p-4 shadow-xs flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-text-main">Ragu status puasa / sholat?</h4>
                      <p className="text-[11px] text-text-muted mt-0.5">Tanyakan langsung pada AI</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate("/chat")}
                      className="px-3 py-1.5 rounded-xl bg-primary-surface hover:bg-primary/20 text-primary font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <LuMessageSquare className="text-xs" />
                      <span>Tanya AI</span>
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          ) : (
            /* ===================== SECTION S-03: KONFIRMASI TERSIMPAN ===================== */
            <motion.div
              key="success-stage"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl mx-auto flex-1 flex flex-col justify-between py-6 min-h-[500px]"
            >
              {/* Top Header */}
              <div className="select-none text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-text-main">
                  Catatan Tersimpan
                </h1>
                <p className="text-xs md:text-sm text-text-muted font-normal mt-0.5">
                  Senin, 23 Feb 2027 · 16 Ramadan 1448 H
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
                    Semoga amal ibadah puasa dan sholat kita diterima Allah SWT.
                  </p>
                </div>

                {/* Timestamp Card */}
                <div className="w-full max-w-sm bg-bg-surface border border-border rounded-xl py-3.5 px-5 flex items-center justify-center gap-2.5 text-xs md:text-sm text-text-main shadow-2xs">
                  <LuClock className="text-primary text-base" />
                  <span>Tersimpan pukul 20:15 WIB</span>
                </div>
              </div>

              {/* Bottom Actions: Kembali ke Hari Ini & Lihat Kalender */}
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
