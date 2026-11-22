import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  LuCheck,
  LuClock,
  LuCircle,
  LuCircleDot,
  LuStar,
  LuMoon,
  LuHouse,
  LuCalendarDays,
  LuMessageSquare,
  LuUser,
  LuArrowRight,
  LuSparkles,
} from "react-icons/lu";
import AppLayout from "../components/AppLayout";

// Ramadan 30 Days Data mapping
const RAMADAN_DAYS = [
  { day: 1, date: "9 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 2, date: "10 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 3, date: "11 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 4, date: "12 Feb", status: "susulan", completed: 4, total: 5 },
  { day: 5, date: "13 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 6, date: "14 Feb", status: "sebagian", completed: 3, total: 5 },
  { day: 7, date: "15 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 8, date: "16 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 9, date: "17 Feb", status: "kosong", completed: 0, total: 5 },
  { day: 10, date: "18 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 11, date: "19 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 12, date: "20 Feb", status: "sebagian", completed: 2, total: 5 },
  { day: 13, date: "21 Feb", status: "susulan", completed: 5, total: 5 },
  { day: 14, date: "22 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 15, date: "23 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 16, date: "24 Feb", status: "sebagian", isToday: true, completed: 3, total: 5 },
  { day: 17, date: "25 Feb", status: "mendatang", isSpecial: "nuzulul", completed: 0, total: 5 },
  { day: 18, date: "26 Feb", status: "mendatang", completed: 0, total: 5 },
  { day: 19, date: "27 Feb", status: "mendatang", completed: 0, total: 5 },
  { day: 20, date: "28 Feb", status: "mendatang", completed: 0, total: 5 },
  { day: 21, date: "1 Mar", status: "mendatang", isSpecial: "lailatul", completed: 0, total: 5 },
  { day: 22, date: "2 Mar", status: "mendatang", isSpecial: "lailatul", completed: 0, total: 5 },
  { day: 23, date: "3 Mar", status: "mendatang", isSpecial: "lailatul", completed: 0, total: 5 },
  { day: 24, date: "4 Mar", status: "mendatang", isSpecial: "lailatul", completed: 0, total: 5 },
  { day: 25, date: "5 Mar", status: "mendatang", isSpecial: "lailatul", completed: 0, total: 5 },
  { day: 26, date: "6 Mar", status: "mendatang", isSpecial: "lailatul", completed: 0, total: 5 },
  { day: 27, date: "7 Mar", status: "mendatang", isSpecial: "lailatul", completed: 0, total: 5 },
  { day: 28, date: "8 Mar", status: "mendatang", isSpecial: "lailatul", completed: 0, total: 5 },
  { day: 29, date: "9 Mar", status: "mendatang", isSpecial: "lailatul", completed: 0, total: 5 },
  { day: 30, date: "10 Mar", status: "mendatang", isSpecial: "lailatul", completed: 0, total: 5 },
];

export default function KalenderRamadan() {
  const navigate = useNavigate();
  const [selectedDayItem, setSelectedDayItem] = useState(
    RAMADAN_DAYS.find((d) => d.isToday) || RAMADAN_DAYS[15]
  );

  const handleDayClick = (dayItem) => {
    setSelectedDayItem(dayItem);
    if (window.innerWidth < 1024) {
      navigate(`/ramadan/detail/${dayItem.day}`);
    }
  };

  const handleOpenDetail = (dayNumber) => {
    navigate(`/ramadan/detail/${dayNumber}`);
  };

  const lengkapCount = RAMADAN_DAYS.filter((d) => d.status === "lengkap").length;
  const sebagianCount = RAMADAN_DAYS.filter((d) => d.status === "sebagian").length;
  const susulanCount = RAMADAN_DAYS.filter((d) => d.status === "susulan").length;
  const kosongCount = RAMADAN_DAYS.filter((d) => d.status === "kosong").length;

  return (
    <AppLayout>
      {/* ===================== MAIN CONTENT WRAPPER ===================== */}
      <main className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 pt-6 pb-28 lg:pb-12 gap-6">
        
        {/* ===================== TOP PAGE HEADER ===================== */}
        <header className="flex items-center justify-between select-none">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-main">
              Kalender Ramadan
            </h1>
            <p className="text-xs md:text-sm text-text-muted font-normal mt-0.5">
              Ramadan 1448 H · Februari–Maret 2027
            </p>
          </div>
        </header>

        {/* ===================== RESPONSIVE LAYOUT ===================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ================= LEFT / PRIMARY CALENDAR COLUMN ================= */}
          <div className="w-full lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
            
            {/* Highlight Banner: Hari ke-16 berjalan & Nuzulul Qur'an */}
            <div className="w-full bg-accent-surface border border-accent/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center text-lg shrink-0 shadow-xs">
                  <LuSparkles />
                </div>
                <div>
                  <span className="text-sm md:text-base font-bold text-[#451A03] block">
                    Hari ke-16 berjalan
                  </span>
                  <span className="text-xs text-[#78350F] font-medium">
                    14 hari tersisa menuju Hari Raya Idul Fitri
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold text-[#78350F] bg-accent/20 px-3 py-1.5 rounded-lg shadow-2xs shrink-0">
                17 · Nuzulul Qur'an
              </span>
            </div>

            {/* 30-Day Ramadan Grid */}
            <div className="bg-bg-surface border border-border rounded-3xl p-4 md:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <LuCalendarDays className="text-primary text-lg" />
                  <span className="text-sm md:text-base font-bold text-text-main">
                    Jadwal & Catatan 30 Hari
                  </span>
                </div>
                <span className="text-xs text-text-muted hidden sm:inline">
                  Klik tanggal untuk melihat ringkasan amaliyah
                </span>
              </div>

              <div className="grid grid-cols-5 md:grid-cols-6 gap-2.5 sm:gap-3 lg:gap-3.5">
                {RAMADAN_DAYS.map((item) => {
                  const isSelected = selectedDayItem.day === item.day;
                  let cardStyle = "border-border bg-bg-surface text-text-main";
                  let iconElement = null;
                  let statusBadgeText = "";

                  if (item.status === "lengkap") {
                    cardStyle =
                      "border-primary/50 bg-primary-surface/30 text-primary shadow-2xs hover:border-primary";
                    iconElement = <LuCheck className="text-sm md:text-base font-bold" />;
                    statusBadgeText = "Lengkap";
                  } else if (item.status === "susulan") {
                    cardStyle =
                      "border-amber-400 bg-amber-50/60 text-amber-600 shadow-2xs hover:border-amber-500";
                    iconElement = <LuClock className="text-xs md:text-sm font-bold" />;
                    statusBadgeText = "Susulan";
                  } else if (item.status === "sebagian") {
                    cardStyle =
                      "border-amber-400 bg-amber-50/60 text-amber-600 shadow-2xs hover:border-amber-500";
                    iconElement = <LuCircleDot className="text-xs md:text-sm font-bold" />;
                    statusBadgeText = "Sebagian";
                  } else if (item.status === "kosong") {
                    cardStyle =
                      "border-border bg-bg-surface text-text-muted/70 hover:border-text-muted";
                    iconElement = <LuCircle className="text-xs" />;
                    statusBadgeText = "Kosong";
                  } else if (item.status === "mendatang") {
                    if (item.isSpecial === "lailatul") {
                      cardStyle =
                        "border-amber-300/80 bg-bg-surface/50 text-amber-700/80 hover:border-amber-400";
                    } else if (item.isSpecial === "nuzulul") {
                      cardStyle =
                        "border-amber-400 bg-accent-surface text-[#451A03] font-bold";
                    } else {
                      cardStyle =
                        "border-dashed border-border/80 bg-bg-surface/40 text-text-muted/50";
                    }
                    iconElement = <span className="text-[10px] leading-none">•</span>;
                    statusBadgeText = "Mendatang";
                  }

                  return (
                    <motion.button
                      key={item.day}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      type="button"
                      onClick={() => handleDayClick(item)}
                      className={`aspect-square rounded-2xl border p-2 sm:p-2.5 flex flex-col items-center justify-between transition-all cursor-pointer relative select-none ${cardStyle} ${
                        isSelected
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-bg-base shadow-md"
                          : ""
                      }`}
                    >
                      {item.isSpecial === "nuzulul" && (
                        <span className="absolute top-1.5 right-1.5 text-xs text-accent" title="Nuzulul Qur'an">
                          <LuStar />
                        </span>
                      )}
                      {item.isSpecial === "lailatul" && (
                        <span className="absolute top-1.5 right-1.5 text-xs text-amber-600" title="10 Malam Terakhir">
                          <LuMoon />
                        </span>
                      )}

                      <div className="flex flex-col items-center">
                        <span className="text-xs sm:text-sm font-bold leading-tight">
                          {item.day}
                        </span>
                        <span className="text-[10px] text-text-muted hidden sm:inline leading-none mt-0.5">
                          {item.date}
                        </span>
                      </div>

                      <span className="my-auto flex items-center justify-center">
                        {iconElement}
                      </span>

                      <span className="text-[9px] font-medium hidden md:inline leading-none truncate max-w-full">
                        {statusBadgeText}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Legend Box */}
            <div className="bg-bg-surface border border-border rounded-2xl p-4 text-xs space-y-3 shadow-2xs">
              <div className="text-xs font-bold text-text-muted uppercase tracking-wider px-0.5">
                Keterangan Status Catatan
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-text-muted">
                <span className="flex items-center gap-1.5">
                  <LuCheck className="text-primary text-sm font-bold" />
                  <span>Lengkap</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <LuCircleDot className="text-amber-500 text-sm font-bold" />
                  <span>Sebagian</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <LuClock className="text-amber-500 text-sm" />
                  <span>Susulan</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <LuCircle className="text-text-muted text-xs" />
                  <span>Kosong</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-text-muted font-bold text-sm">•</span>
                  <span>Mendatang</span>
                </span>
              </div>

              <div className="pt-2.5 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-text-muted">
                <span className="flex items-center gap-1 text-accent">
                  <LuStar className="text-xs" />
                  <span>17 · Nuzulul Qur'an</span>
                </span>
                <span className="flex items-center gap-1 text-amber-600">
                  <LuMoon className="text-xs" />
                  <span>21–30 · 10 Malam Terakhir (Lailatul Qadr)</span>
                </span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT / COMPANION SIDEBAR (DESKTOP) ================= */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6">
            
            {/* Widget 1: Detail Hari Terpilih Inspector */}
            <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <div>
                  <h3 className="text-base font-bold text-text-main mt-0.5">
                    Hari ke-{selectedDayItem.day} Ramadan 1448 H
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5 font-normal">
                    {selectedDayItem.date} 2027 · {selectedDayItem.isToday ? "Hari Ini" : "Catatan Harian"}
                  </p>
                </div>
              </div>

              {/* Progress Summary for Selected Day */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Progres Amaliyah</span>
                  <span className="font-bold text-text-main">
                    {selectedDayItem.completed} dari {selectedDayItem.total} Selesai
                  </span>
                </div>
                <div className="w-full h-2 rounded-md bg-bg-elevated overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-md transition-all duration-300"
                    style={{
                      width: `${(selectedDayItem.completed / selectedDayItem.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Quick Amaliyah checklist preview */}
              <div className="bg-bg-elevated/40 rounded-2xl p-3 border border-border/40 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Shaum Puasa:</span>
                  <span className="font-semibold text-text-main">
                    {selectedDayItem.completed > 0 ? "Sudah" : "Belum / Berhalangan"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Sholat Wajib (5 Waktu):</span>
                  <span className="font-semibold text-text-main">
                    {selectedDayItem.completed >= 4 ? "5/5 Waktu" : "3/5 Waktu"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Sholat Tarawih:</span>
                  <span className="font-semibold text-text-main">
                    {selectedDayItem.status === "lengkap" ? "Sudah" : "Belum"}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => handleOpenDetail(selectedDayItem.day)}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buka Detail / Isi Susulan</span>
                <LuArrowRight className="text-sm" />
              </motion.button>
            </div>

            {/* Widget 2: Month Stats & Overview */}
            <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Ringkasan Bulan Ramadan
                </h3>
                <span className="text-xs font-semibold text-primary">16 / 30 Hari</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-primary-surface/40 border border-primary/20 text-center">
                  <div className="text-lg font-bold text-primary">{lengkapCount}</div>
                  <div className="text-[11px] text-text-muted font-medium mt-0.5">Hari Lengkap</div>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300/40 text-center">
                  <div className="text-lg font-bold text-amber-600">
                    {sebagianCount}
                  </div>
                  <div className="text-[11px] text-text-muted font-medium mt-0.5">Hari Sebagian</div>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300/40 text-center">
                  <div className="text-lg font-bold text-amber-600">
                    {susulanCount}
                  </div>
                  <div className="text-[11px] text-text-muted font-medium mt-0.5">Catatan Susulan</div>
                </div>

                <div className="p-3 rounded-2xl bg-bg-elevated border border-border text-center">
                  <div className="text-lg font-bold text-text-muted">{kosongCount}</div>
                  <div className="text-[11px] text-text-muted font-medium mt-0.5">Hari Kosong</div>
                </div>
              </div>
            </div>

            {/* Widget 3: Agenda Utama Ramadan */}
            <div className="bg-accent-surface border border-accent/30 rounded-3xl p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#451A03] uppercase tracking-wider">
                <LuStar className="text-sm text-accent" />
                <span>Agenda Penting Ramadan</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-[#451A03] font-semibold">
                  <span>17 Ramadan · Nuzulul Qur'an</span>
                  <span className="text-[11px] text-[#78350F]">Besok Malam</span>
                </div>
                <div className="flex items-center justify-between text-[#451A03] font-semibold">
                  <span>21–30 Ramadan · 10 Malam Terakhir</span>
                  <span className="text-[11px] text-[#78350F]">5 Hari Lagi</span>
                </div>
                <div className="flex items-center justify-between text-[#451A03] font-semibold">
                  <span>1 Syawal 1448 H · Hari Raya Idul Fitri</span>
                  <span className="text-[11px] text-[#78350F]">14 Hari Lagi</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ===================== FLOATING BOTTOM NAVIGATION BAR (MOBILE) ===================== */}
      <nav className="lg:hidden fixed bottom-3 md:bottom-5 inset-x-0 max-w-sm md:max-w-md mx-auto px-2 py-1.5 bg-bg-surface/90 backdrop-blur-md border border-border rounded-2xl shadow-lg flex items-center justify-between z-30 select-none">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-text-muted hover:text-text-main text-xs transition-colors cursor-pointer"
        >
          <LuHouse className="text-base" />
          <span>Hari Ini</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-medium shadow-xs cursor-pointer transition-colors"
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
