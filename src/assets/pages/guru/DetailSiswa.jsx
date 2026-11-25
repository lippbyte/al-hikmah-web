import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import AppLayout from "../../components/AppLayout";
import { INITIAL_STUDENTS } from "../../../data/demoData";
import { calendarCellHover, listItem, tapScale } from "../../../lib/motion";
import {
  IconArrowLeft,
  IconCheckBold,
  IconClock,
  IconCircle,
  IconPartial,
  IconMinus,
  IconNotebook,
} from "../../../lib/icons";

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
  { day: 14, status: "lengkap", isToday: true },
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

const ENTRY_LOGS = [
  { day: "14 Ramadan", note: "Tercatat tepat hari (19.42 WIB)", type: "sudah" },
  { day: "13 Ramadan", note: "Susulan · Diisi 14 Ram, 06.15 WIB", type: "susulan" },
  { day: "12 Ramadan", note: "Berhalangan · Tercatat pada 12 Ram", type: "berhalangan" },
  { day: "11 Ramadan", note: "Tercatat tepat hari (20.05 WIB)", type: "sudah" },
];

export default function DetailSiswa() {
  const { id } = useParams();
  const navigate = useNavigate();

  const student =
    INITIAL_STUDENTS.find((s) => s.id === id) || INITIAL_STUDENTS[0];

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-16 lg:pb-12 gap-6">
        {/* Header */}
        <header className="flex items-start gap-3.5 select-none">
          <motion.button
            whileTap={tapScale}
            type="button"
            onClick={() => navigate("/guru")}
            className="w-12 h-12 rounded-2xl border border-border bg-bg-surface flex items-center justify-center text-text-main shadow-[var(--shadow-card)] hover:bg-bg-elevated transition-colors cursor-pointer shrink-0"
            aria-label="Kembali ke Kelas Saya"
          >
            <IconArrowLeft className="text-xl" aria-hidden="true" />
          </motion.button>

          <div className="space-y-1.5 min-w-0">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main leading-tight">
              {student.name}
            </h1>
            <p className="text-xs md:text-sm text-text-muted">
              Kelas {student.class} · Data Contoh
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-bg-surface border border-border text-text-main">
                <IconCircle className="text-xs text-primary-600" aria-hidden="true" />
                <span>{student.consistencyLabel}</span>
              </span>

              {student.parentViewed && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-success-50 text-success-700 border border-success-200">
                  <IconCheckBold className="text-xs" aria-hidden="true" />
                  <span>
                    Sudah dilihat orang tua ({student.parentViewedDate || "12 Ram"})
                  </span>
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Responsive 2-Column Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Calendar & Timeline */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5 select-none">
            {/* 30-Day Grid */}
            <section className="bg-bg-surface border border-border rounded-[1.75rem] p-4 md:p-6 shadow-[var(--shadow-card)] space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base md:text-lg font-bold text-text-main">
                  Kalender Ramadan 1448 H
                </h2>
                <span className="text-xs text-text-muted font-medium">
                  30 hari
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-2.5">
                {STUDENT_CALENDAR_DAYS.map((item) => {
                  let cellStyle =
                    "border-border bg-bg-base/70 text-text-muted border-dashed";
                  let icon = <IconCircle className="text-[11px]" aria-hidden="true" />;
                  let statusLabel = "Akan datang";

                  if (item.status === "lengkap") {
                    cellStyle =
                      "border-success-200 bg-success-50 text-success-700";
                    icon = <IconCheckBold className="text-xs" aria-hidden="true" />;
                    statusLabel = "Lengkap";
                  } else if (item.status === "sebagian") {
                    cellStyle =
                      "border-primary-200 bg-primary-50 text-primary-700";
                    icon = <IconPartial className="text-xs" aria-hidden="true" />;
                    statusLabel = "Sebagian";
                  } else if (item.status === "susulan") {
                    cellStyle =
                      "border-accent-300 bg-accent-50 text-accent-700 border-dashed";
                    icon = <IconClock className="text-xs" aria-hidden="true" />;
                    statusLabel = "Susulan";
                  } else if (item.status === "berhalangan") {
                    cellStyle =
                      "border-accent-200 bg-accent-50 text-accent-700";
                    icon = <IconMinus className="text-xs" aria-hidden="true" />;
                    statusLabel = "Berhalangan";
                  }

                  return (
                    <motion.div
                      key={item.day}
                      whileHover={calendarCellHover}
                      title={`Hari ${item.day}: ${statusLabel}`}
                      className={`h-14 rounded-2xl border flex flex-col items-center justify-center p-1 ${cellStyle} ${
                        item.isToday
                          ? "ring-2 ring-primary-600 ring-offset-2 ring-offset-bg-surface"
                          : ""
                      }`}
                    >
                      <span className="text-xs font-bold">{item.day}</span>
                      <span className="mt-0.5">{icon}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-muted">
                <span className="flex items-center gap-1.5 font-medium">
                  <IconCheckBold className="text-success-600" aria-hidden="true" />
                  <span>Lengkap</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <IconPartial className="text-primary-600" aria-hidden="true" />
                  <span>Sebagian</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <IconClock className="text-accent-600" aria-hidden="true" />
                  <span>Susulan</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <IconMinus className="text-accent-600" aria-hidden="true" />
                  <span>Berhalangan</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <IconCircle className="text-text-muted text-[11px]" aria-hidden="true" />
                  <span>Akan datang</span>
                </span>
              </div>
            </section>

            {/* Timeline */}
            <section className="space-y-3">
              <div className="flex items-center justify-between px-0.5">
                <h2 className="font-display text-lg font-bold text-text-main">
                  Jejak Pengisian
                </h2>
                <span className="text-xs text-text-muted font-medium">
                  Riwayat waktu
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {ENTRY_LOGS.map((entry, idx) => (
                  <motion.div
                    key={entry.day}
                    custom={idx}
                    variants={listItem}
                    initial="initial"
                    animate="animate"
                    className="bg-bg-surface border border-border rounded-2xl p-4 shadow-[var(--shadow-card)] flex items-center justify-between gap-3"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-text-main">
                        {entry.day}
                      </h3>
                      <p className="text-xs text-text-muted mt-0.5">
                        {entry.note}
                      </p>
                    </div>

                    {entry.type === "susulan" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-50 text-accent-700 border border-accent-200 shrink-0">
                        <IconClock className="text-xs" aria-hidden="true" />
                        <span>Susulan</span>
                      </span>
                    ) : entry.type === "berhalangan" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-50 text-accent-700 border border-accent-200 shrink-0">
                        <IconMinus className="text-xs" aria-hidden="true" />
                        <span>Berhalangan</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-success-50 text-success-700 border border-success-200 shrink-0">
                        <IconCheckBold className="text-xs" aria-hidden="true" />
                        <span>Sudah</span>
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6 select-none">
            <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-4">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                Akumulasi 14 Hari
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-success-50 border border-success-200">
                  <span className="text-xs text-success-700 font-medium">
                    Hari Lengkap
                  </span>
                  <div className="font-display text-xl font-bold text-success-700 mt-0.5">
                    11 hari
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-accent-50 border border-accent-200">
                  <span className="text-xs text-accent-700 font-medium">
                    Hari Susulan
                  </span>
                  <div className="font-display text-xl font-bold text-accent-700 mt-0.5">
                    2 hari
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border-subtle space-y-2 text-xs">
                <div className="flex justify-between text-text-muted">
                  <span>Hari Berhalangan</span>
                  <span className="font-semibold text-text-main">1 hari</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Tinjauan Orang Tua</span>
                  <span
                    className={`font-semibold ${
                      student.parentViewed
                        ? "text-success-700"
                        : "text-text-muted"
                    }`}
                  >
                    {student.parentViewed ? "Sudah dilihat" : "Belum dilihat"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-bg-surface border border-border rounded-[1.5rem] p-4 shadow-[var(--shadow-card)] flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl shrink-0">
                <IconNotebook aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-text-main">
                  Catatan Pendampingan
                </h3>
                <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                  Alasan berhalangan tidak ditampilkan untuk menjaga kenyamanan
                  siswa. Ringkasan ini membantu konsistensi pencatatan kelas{" "}
                  {student.class}.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </AppLayout>
  );
}
