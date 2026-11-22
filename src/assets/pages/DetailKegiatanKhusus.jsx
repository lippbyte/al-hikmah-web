import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LuArrowLeft,
  LuCheck,
  LuSparkles,
  LuClock,
  LuShieldCheck,
} from "react-icons/lu";
import AppLayout from "../components/AppLayout";
import { INITIAL_KEGIATAN_KHUSUS } from "./KegiatanKhusus";

export default function DetailKegiatanKhusus() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Load items from localStorage or fallback
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("al-hikmah-kegiatan-khusus");
      return saved ? JSON.parse(saved) : INITIAL_KEGIATAN_KHUSUS;
    } catch {
      return INITIAL_KEGIATAN_KHUSUS;
    }
  });

  // Find target item
  const currentItem = items.find((item) => item.id === id) || items[1]; // default to Lailatul Qadr

  // Form state
  const [participationStatus, setParticipationStatus] = useState(
    currentItem.status || "belum"
  );
  const [selectedNights, setSelectedNights] = useState(
    currentItem.nightChips || [21, 23, 25, 27, 29]
  );
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [savedTime, setSavedTime] = useState(currentItem.savedAt || "");

  // Update form state if id changes
  useEffect(() => {
    if (currentItem) {
      setParticipationStatus(currentItem.status || "belum");
      if (currentItem.nightChips) {
        setSelectedNights(currentItem.nightChips);
      }
    }
  }, [id, currentItem]);

  // Toggle night chip selection (for Lailatul Qadr)
  const toggleNight = (night) => {
    setSelectedNights((prev) =>
      prev.includes(night) ? prev.filter((n) => n !== night) : [...prev, night]
    );
  };

  // Save handler
  const handleSave = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const timeStr = `${hours}:${minutes} WIB`;

    const updated = items.map((item) => {
      if (item.id === currentItem.id) {
        return {
          ...item,
          status: participationStatus,
          savedAt: timeStr,
          selectedNights: selectedNights,
        };
      }
      return item;
    });

    setItems(updated);
    setSavedTime(timeStr);
    try {
      localStorage.setItem("al-hikmah-kegiatan-khusus", JSON.stringify(updated));
    } catch {
      // fallback
    }

    setSavedSuccess(true);
  };

  return (
    <AppLayout>
      {/* ===================== MAIN CONTENT CANVAS ===================== */}
      <main className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-20 lg:pb-12 gap-6">
        
        {/* ===================== TOP PAGE HEADER (NO ICONS ON RIGHT) ===================== */}
        <header className="flex items-center justify-between select-none">
          <div className="flex items-center gap-3.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => navigate("/kegiatan-khusus")}
              className="w-10 h-10 rounded-xl border border-border bg-bg-surface flex items-center justify-center text-text-main shadow-2xs hover:bg-bg-elevated transition-colors cursor-pointer shrink-0"
              aria-label="Kembali ke Daftar Kegiatan Khusus"
            >
              <LuArrowLeft className="text-xl" />
            </motion.button>

            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-main leading-tight">
                Detail Kegiatan
              </h1>
              <p className="text-xs md:text-sm text-text-muted font-normal mt-0.5">
                Kegiatan khusus Ramadan
              </p>
            </div>
          </div>
        </header>

        {/* ===================== SAVED CONFIRMATION SCREEN (S-03 STYLE) ===================== */}
        <AnimatePresence>
          {savedSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="w-full bg-bg-surface border border-emerald-300 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col items-center text-center gap-4 my-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 text-3xl shadow-xs">
                <LuCheck className="stroke-[2.5]" />
              </div>

              <div>
                <h2 className="text-lg md:text-xl font-bold text-text-main">
                  Catatan Kegiatan Tersimpan
                </h2>
                <p className="text-xs md:text-sm text-text-muted mt-1 max-w-sm mx-auto">
                  Terima kasih, catatan partisipasi untuk program{" "}
                  <span className="font-semibold text-text-main">
                    {currentItem.title}
                  </span>{" "}
                  sudah berhasil diperbarui.
                </p>
              </div>

              {savedTime && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-bg-elevated/70 border border-border text-xs text-text-main font-medium">
                  <LuClock className="text-primary text-sm" />
                  <span>Tersimpan pukul {savedTime}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs mt-2">
                <button
                  type="button"
                  onClick={() => navigate("/kegiatan-khusus")}
                  className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs md:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Kembali ke Kegiatan Khusus
                </button>
                <button
                  type="button"
                  onClick={() => setSavedSuccess(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-bg-elevated hover:bg-border text-text-main text-xs md:text-sm font-medium transition-colors cursor-pointer"
                >
                  Ubah Lagi
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================== RESPONSIVE 2-COLUMN GRID ===================== */}
        {!savedSuccess && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* ================= LEFT MAIN DETAIL CARD (7/12 & 8/12) ================= */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
              
              {/* PRIMARY CARD (S-06b Mockup) */}
              <div className="w-full bg-bg-surface border border-border rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xs space-y-5">
                
                {/* Header Row: Amber Tag + Title + Date */}
                <div className="space-y-1.5 select-none">
                  <span className="text-xs font-bold text-[#78350F]">
                    {currentItem.tag}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-text-main leading-tight">
                    {currentItem.title}
                  </h2>
                  <p className="text-xs md:text-sm text-text-muted font-normal">
                    {currentItem.dateRange}
                  </p>
                </div>

                {/* ARAHAN SEKOLAH */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider select-none">
                    Arahan Sekolah
                  </span>
                  <p className="text-xs md:text-sm text-text-main font-normal leading-relaxed">
                    {currentItem.arahan}
                  </p>
                </div>

                {/* SUB-CARD: PENANDA MALAM GANJIL (RAMADAN) */}
                {currentItem.hasNightChips && (
                  <div className="w-full bg-sky-50/40 border border-sky-100 rounded-2xl p-4 space-y-3">
                    <span className="text-[11px] font-bold text-[#92400E] uppercase tracking-wider select-none">
                      Penanda Malam Ganjil (Ramadan)
                    </span>

                    {/* Chips Row: [ 21 ] [ 23 ] [ 25 ] [ 27 ] [ 29 ] */}
                    <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                      {(currentItem.nightChips || [21, 23, 25, 27, 29]).map((night) => {
                        const isSelected = selectedNights.includes(night);
                        return (
                          <motion.button
                            key={night}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => toggleNight(night)}
                            className={`py-2 rounded-xl text-xs md:text-sm font-bold text-center border transition-all cursor-pointer shadow-2xs select-none ${
                              isSelected
                                ? "bg-[#FEF3C7] border-[#F59E0B] text-[#78350F] ring-2 ring-[#F59E0B]/30"
                                : "bg-bg-elevated/80 border-border text-text-muted hover:text-text-main"
                            }`}
                            title={`Malam ke-${night} Ramadan`}
                          >
                            {night}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ADDITIONAL INFO CARDS FOR OTHER ACTIVITIES */}
                {!currentItem.hasNightChips && (
                  <div className="w-full bg-bg-elevated/40 border border-border/70 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-primary uppercase tracking-wider select-none">
                      <LuSparkles className="text-sm" />
                      <span>Fokus Amaliyah Sekolah</span>
                    </div>
                    <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                      Siswa dihimbau mendokumentasikan kegiatan amaliyah ini dalam buku catatan harian dan meminta tanda tangan pembimbing atau orang tua.
                    </p>
                  </div>
                )}

                {/* CATATAN KEIKUTSERTAAN (Segmented Toggle) */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider select-none">
                    Catatan Keikutsertaan
                  </span>

                  <div className="bg-bg-elevated/70 p-1 rounded-xl border border-border/70 grid grid-cols-2 gap-1 select-none">
                    <button
                      type="button"
                      onClick={() => setParticipationStatus("sudah")}
                      className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        participationStatus === "sudah"
                          ? "bg-bg-surface text-emerald-600 border border-border shadow-2xs font-bold"
                          : "text-text-muted hover:text-text-main font-medium"
                      }`}
                    >
                      {participationStatus === "sudah" && (
                        <LuCheck className="text-sm font-bold" />
                      )}
                      <span>Sudah mengikuti</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setParticipationStatus("belum")}
                      className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        participationStatus === "belum"
                          ? "bg-bg-surface text-text-main border border-border shadow-2xs font-bold"
                          : "text-text-muted hover:text-text-main font-medium"
                      }`}
                    >
                      <span>Belum</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* FOOTER NOTE & CTA BUTTON (MOBILE & INLINE DESKTOP) */}
              <div className="flex flex-col gap-3.5 pt-1 select-none">
                <p className="text-xs text-text-muted text-center leading-relaxed">
                  Catatan kegiatan khusus membantu guru memantau program sekolah.
                </p>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleSave}
                  className="w-full h-12 md:h-14 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm md:text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <LuCheck className="text-lg font-bold" />
                  <span>Simpan Catatan Kegiatan</span>
                </motion.button>
              </div>

            </div>

            {/* ================= RIGHT STICKY SIDEBAR (DESKTOP) ================= */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6 select-none">
              
              {/* Summary Card */}
              <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col gap-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-border/50">
                  <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                    Status Partisipasi
                  </span>
                  {participationStatus === "sudah" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-300">
                      <LuCheck className="text-xs font-bold" />
                      <span>Terdata</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-bg-elevated text-text-muted border border-border/50">
                      Belum dicatat
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-text-main">
                    {currentItem.title}
                  </h3>
                  <p className="text-xs text-text-muted">
                    {currentItem.dateRange}
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <LuCheck className="text-sm font-bold" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </div>

              {/* Hadits / Hikmah Card */}
              <div className="bg-accent-surface border border-accent/30 rounded-3xl p-5 shadow-xs flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#451A03] uppercase tracking-wider">
                  <LuSparkles className="text-sm text-accent" />
                  <span>Keutamaan Amaliyah</span>
                </div>
                <p className="text-xs md:text-sm text-[#78350F] font-medium leading-relaxed italic">
                  {currentItem.id === "lailatul-qadr"
                    ? '"Carilah Lailatul Qadr pada malam-malam ganjil di sepuluh malam terakhir bulan Ramadan."'
                    : currentItem.id === "nuzulul-quran"
                    ? '"Bacalah Al-Qur\'an, sesungguhnya ia akan datang pada hari kiamat memberikan syafaat bagi para pembacanya."'
                    : currentItem.id === "pesantren-kilat"
                    ? '"Sebaik-baik kalian adalah orang yang belajar Al-Qur\'an dan mengajarkannya."'
                    : '"Barangsiapa yang berpuasa Ramadan lalu berpuasa enam hari di bulan Syawal, pahalanya seperti berpuasa setahun penuh."'}
                </p>
                <span className="text-[11px] text-[#92400E] font-semibold">
                  {currentItem.id === "lailatul-qadr"
                    ? "(HR. Bukhari no. 2017 & Muslim no. 1169)"
                    : currentItem.id === "nuzulul-quran"
                    ? "(HR. Muslim no. 804)"
                    : currentItem.id === "pesantren-kilat"
                    ? "(HR. Bukhari no. 5027)"
                    : "(HR. Muslim no. 1164)"}
                </span>
              </div>

              {/* Guru Pembimbing Info */}
              <div className="bg-bg-surface border border-border rounded-3xl p-4 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-surface text-primary flex items-center justify-center text-lg shrink-0">
                  <LuShieldCheck />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-main">
                    Verifikasi Guru PAI
                  </h4>
                  <p className="text-[11px] text-text-muted mt-0.5 leading-tight">
                    Catatan ini akan otomatis masuk ke laporan lembar mutaba'ah siswa sekolah.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>
    </AppLayout>
  );
}
