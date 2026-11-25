import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import AppLayout from "../../components/AppLayout";
import BottomSheet from "../../components/BottomSheet";
import { DEMO_SCHOOL, INITIAL_STUDENTS } from "../../../data/demoData";
import { listItem, tapScale } from "../../../lib/motion";
import {
  IconPrinter,
  IconChevronDown,
  IconCheckBold,
  IconCircle,
  IconSparkleFill,
} from "../../../lib/icons";

export default function RekapCetak() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("Kelas VIII-A");
  const [selectedPeriod, setSelectedPeriod] = useState("1 – 14 Ramadan 1448 H");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-28 lg:pb-12 gap-5 md:gap-6 select-none">
        <header>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main leading-tight">
            Rekap &amp; Cetak
          </h1>
          <p className="text-xs md:text-sm text-text-muted mt-0.5">
            Ringkasan pencatatan kelas · Data Contoh
          </p>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Primary Column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            {/* Filters with labels above controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label
                  htmlFor="rekap-kelas"
                  className="text-xs font-semibold text-text-muted block"
                >
                  Pilih Kelas
                </label>
                <div className="relative">
                  <select
                    id="rekap-kelas"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full min-h-12 appearance-none bg-bg-surface border border-border rounded-2xl px-4 pr-10 text-sm font-semibold text-text-main shadow-[var(--shadow-card)] focus:border-primary-600 cursor-pointer"
                  >
                    <option value="Kelas VIII-A">Kelas VIII-A</option>
                    <option value="Kelas VIII-B">Kelas VIII-B</option>
                    <option value="Kelas IX-A">Kelas IX-A</option>
                  </select>
                  <IconChevronDown
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-base"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="rekap-periode"
                  className="text-xs font-semibold text-text-muted block"
                >
                  Periode Catatan
                </label>
                <div className="relative">
                  <select
                    id="rekap-periode"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full min-h-12 appearance-none bg-bg-surface border border-border rounded-2xl px-4 pr-10 text-sm font-semibold text-text-main shadow-[var(--shadow-card)] focus:border-primary-600 cursor-pointer"
                  >
                    <option value="1 – 14 Ramadan 1448 H">
                      1 – 14 Ramadan 1448 H
                    </option>
                    <option value="15 – 30 Ramadan 1448 H">
                      15 – 30 Ramadan 1448 H
                    </option>
                    <option value="1 – 30 Ramadan 1448 H">
                      1 Bulan Penuh (1–30 Ramadan)
                    </option>
                  </select>
                  <IconChevronDown
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-base"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Class Summary Card */}
            <div className="w-full bg-primary-50 border border-primary-200 rounded-[1.5rem] p-5 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-base md:text-lg font-bold text-primary-900">
                  Ringkasan {selectedClass}
                </h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-bg-surface text-primary-700 border border-primary-200">
                  32 siswa
                </span>
              </div>
              <p className="text-xs md:text-sm text-primary-800">
                27 dari 32 catatan sudah dilihat oleh orang tua.
              </p>
            </div>

            {/* Student Cards */}
            <div className="flex flex-col gap-3">
              {INITIAL_STUDENTS.map((student, idx) => (
                <motion.button
                  key={student.id}
                  custom={idx}
                  variants={listItem}
                  initial="initial"
                  animate="animate"
                  whileTap={tapScale}
                  type="button"
                  onClick={() => navigate(`/guru/siswa/${student.id}`)}
                  className="w-full text-left bg-bg-surface border border-border hover:border-primary-300 rounded-2xl p-4 min-h-[72px] shadow-[var(--shadow-card)] flex items-center justify-between gap-3 cursor-pointer transition-colors"
                >
                  <div className="min-w-0">
                    <h3 className="text-sm md:text-base font-bold text-text-main truncate">
                      {student.name}
                    </h3>
                    <p className="text-xs text-text-muted mt-1">
                      Terisi: {student.daysFilled} · Susulan: {student.missedCount}
                    </p>
                  </div>

                  <div className="shrink-0">
                    {student.parentViewed ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-success-50 text-success-700 border border-success-200">
                        <IconCheckBold className="text-xs" aria-hidden="true" />
                        <span>Dilihat wali</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-bg-elevated text-text-muted border border-border">
                        <IconCircle className="text-xs" aria-hidden="true" />
                        <span>Belum dilihat</span>
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Mobile Print CTA */}
            <div className="pt-2 lg:hidden">
              <motion.button
                whileTap={tapScale}
                type="button"
                onClick={() => setIsPrintModalOpen(true)}
                className="w-full min-h-12 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary font-semibold text-sm shadow-[var(--shadow-card)] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <IconPrinter className="text-lg" aria-hidden="true" />
                <span>Cetak Rekap (Versi A4)</span>
              </motion.button>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6">
            <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary-700 uppercase tracking-wider">
                <IconPrinter className="text-base text-primary-600" aria-hidden="true" />
                <span>Cetak Lembar A4</span>
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                Lembar ringkasan pencatatan Ramadan kelas siap cetak untuk arsip
                pendampingan wali kelas.
              </p>

              <motion.button
                whileTap={tapScale}
                type="button"
                onClick={() => setIsPrintModalOpen(true)}
                className="w-full min-h-12 px-5 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary font-semibold text-sm shadow-[var(--shadow-card)] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <IconPrinter className="text-base" aria-hidden="true" />
                <span>Pratinjau &amp; Cetak A4</span>
              </motion.button>
            </div>

            <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-3.5">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
                Ringkasan Tinjauan Wali
              </span>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Sudah Melihat</span>
                  <span className="font-bold text-success-700">27 Siswa (84%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-bg-elevated overflow-hidden">
                  <div
                    className="h-full bg-success-600 rounded-full"
                    style={{ width: "84%" }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Belum Melihat</span>
                  <span className="font-bold text-accent-700">5 Siswa (16%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-bg-elevated overflow-hidden">
                  <div
                    className="h-full bg-accent-500 rounded-full"
                    style={{ width: "16%" }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-accent-50 border border-accent-200 rounded-[1.5rem] p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent-700 uppercase tracking-wider">
                <IconSparkleFill
                  className="text-base text-accent-500"
                  aria-hidden="true"
                />
                <span>Catatan Pelaporan</span>
              </div>
              <p className="text-xs text-accent-800 leading-relaxed">
                Rekap mencatat konsistensi pengisian, bukan perbandingan nilai
                ibadah antar siswa.
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Draggable BottomSheet / Modal for A4 Print Preview */}
      <BottomSheet
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        title="Pratinjau Lembar Rekap (A4)"
        subtitle="Contoh dokumen ringkasan pencatatan kelas untuk arsip sekolah."
        maxWidthClass="sm:max-w-2xl"
      >
        <div className="space-y-5">
          <div className="border border-border rounded-2xl p-5 bg-bg-base/60 space-y-4 text-xs">
            <div className="text-center pb-3 border-b-2 border-primary-600 space-y-1">
              <h3 className="font-display font-bold text-base text-text-main uppercase tracking-wide">
                {DEMO_SCHOOL}
              </h3>
              <p className="text-xs text-text-muted">
                Rekapitulasi Catatan Ramadan 1448 H · Periode {selectedPeriod}
              </p>
              <p className="text-xs font-semibold text-text-main">
                {selectedClass} · Wali Kelas (Demo)
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-primary-50 text-primary-900">
                    <th className="py-2 px-2 font-semibold">No</th>
                    <th className="py-2 px-2 font-semibold">Nama Siswa</th>
                    <th className="py-2 px-2 font-semibold text-center">Terisi</th>
                    <th className="py-2 px-2 font-semibold text-center">Susulan</th>
                    <th className="py-2 px-2 font-semibold">Ritme</th>
                    <th className="py-2 px-2 font-semibold">Tinjauan Wali</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {INITIAL_STUDENTS.map((s, i) => (
                    <tr key={s.id}>
                      <td className="py-2 px-2 text-text-muted">{i + 1}</td>
                      <td className="py-2 px-2 font-semibold text-text-main">
                        {s.name}
                      </td>
                      <td className="py-2 px-2 text-center text-text-muted">
                        {s.daysFilled}
                      </td>
                      <td className="py-2 px-2 text-center text-text-muted">
                        {s.missedCount}
                      </td>
                      <td className="py-2 px-2 text-primary-700 font-medium">
                        {s.consistencyLabel}
                      </td>
                      <td className="py-2 px-2 text-text-muted">
                        {s.parentViewed ? "Sudah dilihat" : "Belum"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 pt-5 text-center text-xs text-text-muted gap-4">
              <div>
                <p>Mengetahui,</p>
                <p className="font-semibold text-text-main mt-1">
                  Kepala Sekolah (Contoh)
                </p>
                <div className="h-10" />
                <p className="font-bold text-text-main underline">
                  Nama Kepala Sekolah (Demo)
                </p>
              </div>
              <div>
                <p>Kota Contoh, 14 Ramadan 1448 H</p>
                <p className="font-semibold text-text-main mt-1">
                  Wali {selectedClass}
                </p>
                <div className="h-10" />
                <p className="font-bold text-text-main underline">
                  Guru Wali Kelas (Demo)
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => setIsPrintModalOpen(false)}
              className="w-full sm:w-auto min-h-12 px-6 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main text-sm font-semibold transition-colors cursor-pointer"
            >
              Tutup
            </motion.button>
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto min-h-12 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary text-sm font-semibold shadow-[var(--shadow-card)] flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <IconPrinter className="text-base" aria-hidden="true" />
              <span>Cetak Dokumen</span>
            </motion.button>
          </div>
        </div>
      </BottomSheet>
    </AppLayout>
  );
}
