import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import AppLayout from "../../components/AppLayout";
import { INITIAL_STUDENTS } from "../../../data/demoData";
import { listItem, tapScale } from "../../../lib/motion";
import {
  IconChevronDown,
  IconChevronRight,
  IconCheckBold,
  IconCircle,
  IconMinus,
  IconClipboard,
  IconHeartFill,
} from "../../../lib/icons";

const CLASSES = ["VIII-A", "VIII-B", "IX-A"];

export default function KelasSaya() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("VIII-A");
  const [students] = useState(INITIAL_STUDENTS);

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-28 lg:pb-12 gap-5 md:gap-6">
        {/* Header with Class Dropdown (Atur Kegiatan dihapus) */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 select-none">
          <div>
            <span className="text-xs text-text-muted font-medium block">
              Assalamu&apos;alaikum, Bapak/Ibu Guru
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main leading-tight mt-0.5">
              Kelas Saya
            </h1>
            <p className="text-xs md:text-sm text-text-muted mt-0.5">
              14 Ramadan 1448 H · Data Contoh
            </p>
          </div>

          <div className="w-full sm:w-48 space-y-1">
            <label
              htmlFor="guru-pilih-kelas"
              className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block"
            >
              Pilih Kelas
            </label>
            <div className="relative">
              <select
                id="guru-pilih-kelas"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full min-h-12 appearance-none bg-bg-surface border border-border rounded-2xl px-4 pr-10 text-sm font-semibold text-text-main shadow-[var(--shadow-card)] focus:border-primary-600 cursor-pointer"
              >
                {CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    Kelas {cls}
                  </option>
                ))}
              </select>
              <IconChevronDown
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-base"
                aria-hidden="true"
              />
            </div>
          </div>
        </header>

        {/* 2-Column Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Primary Column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
            {/* 3 Metric Boxes */}
            <section
              aria-label="Ringkasan pengisian kelas hari ini"
              className="grid grid-cols-3 gap-3 select-none"
            >
              <div className="bg-success-50 border border-success-200 rounded-2xl p-3.5 text-center space-y-1">
                <div className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-success-700">
                  <IconCheckBold className="text-xs" aria-hidden="true" />
                  <span>Sudah</span>
                </div>
                <div className="font-display text-2xl md:text-3xl font-bold text-success-700 leading-none">
                  24
                </div>
                <div className="text-[11px] text-text-muted font-medium">
                  Sudah mengisi
                </div>
              </div>

              <div className="bg-bg-surface border border-border rounded-2xl p-3.5 text-center space-y-1 shadow-[var(--shadow-card)]">
                <div className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-text-muted">
                  <IconCircle className="text-xs" aria-hidden="true" />
                  <span>Belum</span>
                </div>
                <div className="font-display text-2xl md:text-3xl font-bold text-text-main leading-none">
                  5
                </div>
                <div className="text-[11px] text-text-muted font-medium">
                  Belum mengisi
                </div>
              </div>

              <div className="bg-accent-50 border border-accent-200 rounded-2xl p-3.5 text-center space-y-1">
                <div className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-accent-700">
                  <IconMinus className="text-xs" aria-hidden="true" />
                  <span>Halangan</span>
                </div>
                <div className="font-display text-2xl md:text-3xl font-bold text-accent-700 leading-none">
                  3
                </div>
                <div className="text-[11px] text-text-muted font-medium">
                  Berhalangan
                </div>
              </div>
            </section>

            {/* Student Roster */}
            <section aria-labelledby="daftar-siswa-heading" className="space-y-3">
              <div className="flex items-center justify-between px-0.5 select-none">
                <h2
                  id="daftar-siswa-heading"
                  className="font-display text-lg font-bold text-text-main"
                >
                  Daftar Siswa {selectedClass}
                </h2>
                <span className="text-xs text-text-muted font-medium">
                  Ritme pekan ini
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {students.map((student, idx) => {
                  let statusIcon = (
                    <IconCircle className="text-xs text-text-muted" aria-hidden="true" />
                  );
                  let statusTextClass = "text-text-muted";
                  if (student.statusToday === "sudah") {
                    statusIcon = (
                      <IconCheckBold
                        className="text-xs text-success-600"
                        aria-hidden="true"
                      />
                    );
                    statusTextClass = "text-success-700";
                  } else if (student.statusToday === "berhalangan") {
                    statusIcon = (
                      <IconMinus
                        className="text-xs text-accent-600"
                        aria-hidden="true"
                      />
                    );
                    statusTextClass = "text-accent-700";
                  }

                  return (
                    <motion.button
                      key={student.id}
                      custom={idx}
                      variants={listItem}
                      initial="initial"
                      animate="animate"
                      whileTap={tapScale}
                      type="button"
                      onClick={() => navigate(`/guru/siswa/${student.id}`)}
                      className="w-full text-left bg-bg-surface border border-border hover:border-primary-300 rounded-2xl p-4 min-h-[72px] shadow-[var(--shadow-card)] transition-colors cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <h3 className="text-sm md:text-base font-semibold text-text-main leading-tight truncate">
                          {student.name}
                        </h3>
                        <p
                          className={`text-xs mt-1 inline-flex items-center gap-1.5 font-medium ${statusTextClass}`}
                        >
                          {statusIcon}
                          <span>{student.statusText}</span>
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className="text-[11px] font-medium text-text-muted">
                          {student.consistencyLabel}
                        </span>
                        <div className="flex items-center gap-1" aria-hidden="true">
                          {student.consistencyBars.map((filled, i) => (
                            <span
                              key={i}
                              className={`w-4 h-1.5 rounded-full ${
                                filled
                                  ? student.consistency === "sapa"
                                    ? "bg-accent-500"
                                    : "bg-success-600"
                                  : "bg-bg-elevated"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Desktop Right Column */}
          <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6 select-none">
            <div className="bg-accent-50 border border-accent-200 rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-accent-800 uppercase tracking-wider">
                  <IconHeartFill
                    className="text-base text-accent-500"
                    aria-hidden="true"
                  />
                  <span>Perlu Disapa</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent-600 text-on-primary">
                  4 Siswa
                </span>
              </div>

              <p className="text-xs md:text-sm text-accent-800 leading-relaxed">
                Ada 4 siswa yang perlu disapa pekan ini. Menandai sapaan akan
                mengirimkan notifikasi hangat ke siswa tersebut.
              </p>

              <motion.button
                whileTap={tapScale}
                type="button"
                onClick={() => navigate("/guru/sapa")}
                className="w-full min-h-12 px-4 rounded-full bg-bg-surface text-accent-800 hover:bg-bg-base border border-accent-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Buka Daftar Perlu Disapa</span>
                <IconChevronRight className="text-base" aria-hidden="true" />
              </motion.button>
            </div>

            <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                  Tinjauan Orang Tua
                </span>
                <span className="text-xs font-semibold text-success-700 bg-success-50 border border-success-200 px-2.5 py-0.5 rounded-full">
                  84%
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-base font-bold text-text-main">
                  27 dari 32 Catatan Dilihat
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Sebagian besar orang tua telah meninjau ringkasan pencatatan
                  mingguan putra-putrinya.
                </p>
              </div>

              <motion.button
                whileTap={tapScale}
                type="button"
                onClick={() => navigate("/guru/rekap")}
                className="w-full min-h-12 px-5 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary text-xs font-semibold shadow-[var(--shadow-card)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <IconClipboard className="text-base" aria-hidden="true" />
                <span>Lihat Rekap &amp; Cetak A4</span>
              </motion.button>
            </div>
          </aside>
        </div>
      </main>
    </AppLayout>
  );
}
