import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  LuArrowLeft,
  LuCheck,
  LuClock,
  LuCircle,
  LuMinus,
  LuCalendarDays,
  LuShieldCheck,
} from "react-icons/lu";
import AppLayout from "../../components/AppLayout";
import { INITIAL_STUDENTS } from "./KelasSaya";

// 30 Days student calendar data matching Mockup G-03
const STUDENT_CALENDAR_DAYS = [
  { day: 1, status: "lengkap" },
  { day: 2, status: "lengkap" },
  { day: 3, status: "lengkap" },
  { day: 4, status: "susulan" },
  { day: 5, status: "lengkap" },
  { day: 6, status: "sebagian" },
  { day: 7, status: "lengkap" },
  { day: 8, status: "lengkap" },
  { day: 9, status: "lengkap" },
  { day: 10, status: "lengkap" },
  { day: 11, status: "lengkap" },
  { day: 12, status: "berhalangan" },
  { day: 13, status: "susulan" },
  { day: 14, status: "lengkap" },
  { day: 15, status: "datang" },
  { day: 16, status: "datang" },
  { day: 17, status: "datang" },
  { day: 18, status: "datang" },
  { day: 19, status: "datang" },
  { day: 20, status: "datang" },
  { day: 21, status: "datang" },
  { day: 22, status: "datang" },
  { day: 23, status: "datang" },
  { day: 24, status: "datang" },
  { day: 25, status: "datang" },
  { day: 26, status: "datang" },
  { day: 27, status: "datang" },
  { day: 28, status: "datang" },
  { day: 29, status: "datang" },
  { day: 30, status: "datang" },
];

export default function DetailSiswa() {
  const { id } = useParams();
  const navigate = useNavigate();

  const student =
    INITIAL_STUDENTS.find((s) => s.id === id) || INITIAL_STUDENTS[0];

  return (
    <AppLayout>
      <main className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-20 lg:pb-12 gap-5 md:gap-6">
        
        {/* ===================== TOP HEADER (G-03 MOCKUP) ===================== */}
        <header className="flex items-center gap-3.5 select-none">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => navigate("/guru")}
            className="w-10 h-10 rounded-xl border border-border bg-bg-surface flex items-center justify-center text-text-main shadow-2xs hover:bg-bg-elevated transition-colors cursor-pointer shrink-0"
            aria-label="Kembali ke Kelas Saya"
          >
            <LuArrowLeft className="text-xl" />
          </motion.button>

          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-main leading-tight">
              {student.name}
            </h1>
            <p className="text-xs md:text-sm text-text-muted font-normal">
              Kelas {student.class}
            </p>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-bg-surface border border-border text-text-main">
                <span className="w-1.5 h-1.5 rounded-full bg-text-main" />
                <span>{student.consistencyLabel}</span>
              </span>

              {student.parentViewed && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300">
                  <LuCheck className="text-xs font-bold" />
                  <span>Sudah dilihat orang tua ({student.parentViewedDate || "12 Ram"})</span>
                </span>
              )}
            </div>
          </div>
        </header>

        {/* ===================== RESPONSIVE 2-COLUMN LAYOUT ===================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= LEFT MAIN COLUMN: CALENDAR & TIMELINE ================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5 select-none">
            
            {/* KALENDER RAMADAN 1448 H (30 DAYS GRID) */}
            <div className="bg-bg-surface border border-border rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-base font-bold text-text-main">
                  Kalender Ramadan 1448 H
                </h2>
                <span className="text-xs text-text-muted font-medium">
                  30 hari
                </span>
              </div>

              {/* 30 Day Grid: 6 columns */}
              <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                {STUDENT_CALENDAR_DAYS.map((item) => {
                  let cellStyle =
                    "border-border/60 bg-bg-elevated/40 text-text-muted border-dashed";
                  let icon = <LuCircle className="text-[10px]" />;

                  if (item.status === "lengkap") {
                    cellStyle =
                      "border-emerald-300 bg-emerald-50 text-emerald-700 font-bold";
                    icon = <LuCheck className="text-xs font-bold" />;
                  } else if (item.status === "sebagian") {
                    cellStyle =
                      "border-emerald-300 bg-emerald-50 text-emerald-700 font-bold";
                    icon = <span className="text-xs font-bold leading-none">◐</span>;
                  } else if (item.status === "susulan") {
                    cellStyle =
                      "border-amber-300 bg-amber-50 text-amber-700 font-bold border-dashed";
                    icon = <LuClock className="text-xs" />;
                  } else if (item.status === "berhalangan") {
                    cellStyle =
                      "border-amber-300 bg-amber-50 text-amber-700 font-bold";
                    icon = <LuMinus className="text-xs font-bold" />;
                  }

                  return (
                    <div
                      key={item.day}
                      className={`h-12 sm:h-14 rounded-xl border flex flex-col items-center justify-center p-1 shadow-2xs ${cellStyle}`}
                    >
                      <span className="text-xs font-bold">{item.day}</span>
                      <div className="mt-0.5">{icon}</div>
                    </div>
                  );
                })}
              </div>

              {/* Legend matching Mockup G-03 */}
              <div className="pt-2 border-t border-border/60 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-text-muted gap-2">
                <span className="flex items-center gap-1 font-medium">
                  <LuCheck className="text-emerald-600 font-bold" />
                  <span>Lengkap</span>
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span className="text-emerald-600">◐</span>
                  <span>Sebagian</span>
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <LuClock className="text-amber-600" />
                  <span>Susulan</span>
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <LuMinus className="text-amber-600 font-bold" />
                  <span>Berhalangan</span>
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <LuCircle className="text-text-muted text-[10px]" />
                  <span>Akan datang</span>
                </span>
              </div>
            </div>

            {/* JEJAK PENGISIAN (RIWAYAT WAKTU) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm md:text-base font-bold text-text-main">
                  Jejak Pengisian
                </h3>
                <span className="text-xs text-text-muted font-medium">
                  Riwayat waktu
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="bg-bg-surface border border-border rounded-2xl p-3.5 shadow-2xs">
                  <h4 className="text-sm font-bold text-text-main">14 Ramadan</h4>
                  <p className="text-xs text-text-muted mt-0.5">Tepat waktu (19.42 WIB)</p>
                </div>

                <div className="bg-bg-surface border border-border rounded-2xl p-3.5 shadow-2xs">
                  <h4 className="text-sm font-bold text-text-main">13 Ramadan</h4>
                  <p className="text-xs text-text-muted mt-0.5">Diisi 14 Ram, 06.15 WIB</p>
                </div>

                <div className="bg-bg-surface border border-border rounded-2xl p-3.5 shadow-2xs">
                  <h4 className="text-sm font-bold text-text-main">12 Ramadan</h4>
                  <p className="text-xs text-text-muted mt-0.5">Tercatat pada 12 Ram</p>
                </div>

                <div className="bg-bg-surface border border-border rounded-2xl p-3.5 shadow-2xs">
                  <h4 className="text-sm font-bold text-text-main">11 Ramadan</h4>
                  <p className="text-xs text-text-muted mt-0.5">Tepat waktu (20.05 WIB)</p>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT STICKY SIDEBAR (DESKTOP) ================= */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6 select-none">
            
            {/* Rekap Kehadiran Amaliyah (Read-Only) */}
            <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs space-y-3.5">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">
                Akumulasi Catatan (14 Hari)
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-xs text-emerald-800 font-medium">Hari Lengkap</span>
                  <div className="text-xl font-bold text-emerald-700 mt-0.5">11 hari</div>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <span className="text-xs text-amber-800 font-medium">Hari Susulan</span>
                  <div className="text-xl font-bold text-amber-700 mt-0.5">2 hari</div>
                </div>
              </div>

              <div className="pt-2 border-t border-border/60 space-y-2 text-xs">
                <div className="flex justify-between text-text-muted">
                  <span>Hari Berhalangan:</span>
                  <span className="font-semibold text-text-main">1 hari</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Verifikasi Wali Santri:</span>
                  <span className="font-semibold text-emerald-600">
                    {student.parentViewed ? "Sudah Dilihat" : "Belum Dilihat"}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Informasi Kelas */}
            <div className="bg-bg-surface border border-border rounded-3xl p-4 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-surface text-primary flex items-center justify-center text-lg shrink-0">
                <LuShieldCheck />
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-main">
                  Verifikasi Mutaba'ah Resmi
                </h4>
                <p className="text-[11px] text-text-muted mt-0.5 leading-tight">
                  Data ini tersinkronisasi otomatis dengan lembar rekapitulasi kelas {student.class}.
                </p>
              </div>
            </div>

          </div>

        </div>

      </main>
    </AppLayout>
  );
}
