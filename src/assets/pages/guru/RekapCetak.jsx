import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LuPrinter,
  LuChevronDown,
  LuCheck,
  LuFileText,
  LuX,
  LuSparkles,
  LuShieldCheck,
} from "react-icons/lu";
import AppLayout from "../../components/AppLayout";
import TeacherBottomNav from "../../components/TeacherBottomNav";
import { INITIAL_STUDENTS } from "./KelasSaya";

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
      <main className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-28 lg:pb-12 gap-5 md:gap-6 select-none">
        
        {/* ===================== TOP HEADER (G-04 MOCKUP) ===================== */}
        <header>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-main leading-tight">
            Rekap & Cetak
          </h1>
          <p className="text-xs md:text-sm text-text-muted font-normal mt-0.5">
            Ringkasan otomatis pencatatan kelas
          </p>
        </header>

        {/* ===================== RESPONSIVE 2-COLUMN LAYOUT ===================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= LEFT MAIN COLUMN: FILTERS & STUDENT LIST ================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            
            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Class Select */}
              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full appearance-none bg-bg-surface border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-text-main shadow-2xs focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="Kelas VIII-A">Kelas VIII-A</option>
                  <option value="Kelas VIII-B">Kelas VIII-B</option>
                  <option value="Kelas IX-A">Kelas IX-A</option>
                </select>
                <LuChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-base" />
              </div>

              {/* Period Select */}
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full appearance-none bg-bg-surface border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold text-text-main shadow-2xs focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="1 – 14 Ramadan 1448 H">1 – 14 Ramadan 1448 H</option>
                  <option value="15 – 30 Ramadan 1448 H">15 – 30 Ramadan 1448 H</option>
                  <option value="1 Bulan Penuh">1 Bulan Penuh (1–30 Ramadan)</option>
                </select>
                <LuChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-base" />
              </div>
            </div>

            {/* CLASS SUMMARY BOX (G-04 MOCKUP) */}
            <div className="w-full bg-emerald-50/70 border border-emerald-300 rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-base font-bold text-emerald-950">
                  Ringkasan {selectedClass}
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white text-emerald-700 border border-emerald-300">
                  32 siswa
                </span>
              </div>
              <p className="text-xs md:text-sm text-emerald-900 font-medium">
                27 dari 32 catatan sudah dilihat orang tua.
              </p>
            </div>

            {/* STUDENT REKAP CARDS */}
            <div className="flex flex-col gap-2.5">
              {INITIAL_STUDENTS.map((student, idx) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  whileHover={{ y: -1 }}
                  onClick={() => navigate(`/guru/siswa/${student.id}`)}
                  className="bg-bg-surface border border-border hover:border-primary/50 rounded-2xl p-4 shadow-2xs flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm md:text-base font-bold text-text-main">
                        {student.name}
                      </h3>
                    </div>
                    <p className="text-xs text-text-muted mt-1">
                      Terisi: {student.daysFilled} · Susulan: {student.missedCount}
                    </p>
                  </div>

                  {/* Parent status on right */}
                  <div className="text-right shrink-0 ml-2">
                    {student.parentViewed ? (
                      <span className="text-xs font-semibold text-emerald-600 block">
                        Sudah dilihat orang tua
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-text-muted block">
                        Belum dilihat orang tua
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Button on Mobile */}
            <div className="pt-2 lg:hidden">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setIsPrintModalOpen(true)}
                className="w-full h-12 md:h-14 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm md:text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <LuPrinter className="text-lg font-bold" />
                <span>Cetak Rekap (Versi A4)</span>
              </motion.button>
            </div>

          </div>

          {/* ================= RIGHT STICKY SIDEBAR (DESKTOP) ================= */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6">
            
            {/* Quick Print Action Card on Desktop */}
            <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <LuPrinter className="text-base" />
                <span>Cetak Lembar Rekap A4</span>
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                Dokumen resmi rekapitulasi mutaba'ah amaliyah Ramadan siswa siap cetak dengan kop sekolah dan lembar pengesahan.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setIsPrintModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-xs md:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <LuPrinter className="text-base font-bold" />
                <span>Pratinjau & Cetak A4</span>
              </motion.button>
            </div>

            {/* Statistik Tinjauan Wali Santri */}
            <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs space-y-3">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">
                Statistik Tinjauan Wali
              </span>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Sudah Melihat:</span>
                  <span className="font-bold text-emerald-700">27 Siswa (84%)</span>
                </div>
                <div className="w-full h-2 rounded-md bg-bg-elevated overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-md"
                    style={{ width: "84%" }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">Belum Melihat:</span>
                  <span className="font-bold text-text-muted">5 Siswa (16%)</span>
                </div>
                <div className="w-full h-2 rounded-md bg-bg-elevated overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-md"
                    style={{ width: "16%" }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-text-muted leading-relaxed pt-1">
                Siswa yang belum dilihat orang tua dapat dikirimkan pengingat melalui fitur komunikasi kelas.
              </p>
            </div>

            {/* Panduan Pengarsipan */}
            <div className="bg-accent-surface border border-accent/30 rounded-3xl p-5 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#451A03] uppercase tracking-wider">
                <LuSparkles className="text-sm text-accent" />
                <span>Ketentuan Pelaporan</span>
              </div>
              <p className="text-xs text-[#78350F] leading-relaxed">
                Hasil rekapitulasi mutaba'ah per periode ditandatangani oleh wali kelas dan dilaporkan ke bagian kesiswaan untuk pengisian rapor karakter PAI.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* ===================== A4 PRINT PREVIEW MODAL ===================== */}
      <AnimatePresence>
        {isPrintModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrintModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl bg-white border border-border rounded-3xl shadow-2xl p-6 sm:p-8 relative z-10 max-h-[90vh] overflow-y-auto space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h3 className="text-lg font-bold text-text-main">
                    Pratinjau Lembar Rekap Mutaba'ah (A4)
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    Format resmi laporan hasil amaliyah Ramadan untuk arsip sekolah
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPrintModalOpen(false)}
                  className="p-1.5 text-text-muted hover:text-text-main rounded-lg cursor-pointer"
                >
                  <LuX className="text-xl" />
                </button>
              </div>

              {/* Document Sheet Simulation */}
              <div className="border border-border/80 rounded-2xl p-6 bg-slate-50/50 space-y-4 text-xs font-sans">
                {/* School Letterhead */}
                <div className="text-center pb-3 border-b-2 border-emerald-700 space-y-1">
                  <h4 className="font-bold text-sm text-text-main tracking-wider uppercase">
                    SMP Al-Hikmah Surabaya
                  </h4>
                  <p className="text-[11px] text-text-muted">
                    Rekapitulasi Mutaba'ah Amaliyah Ramadan 1448 H · Periode {selectedPeriod}
                  </p>
                  <p className="text-[11px] font-semibold text-text-main">
                    Kelas: {selectedClass} · Wali Kelas: Ustadz Rakan Shaka, S.Pd.I
                  </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="border-b border-border bg-emerald-50 text-emerald-900">
                        <th className="py-2 px-2 font-bold">No</th>
                        <th className="py-2 px-2 font-bold">Nama Siswa</th>
                        <th className="py-2 px-2 font-bold text-center">Terisi</th>
                        <th className="py-2 px-2 font-bold text-center">Susulan</th>
                        <th className="py-2 px-2 font-bold">Konsistensi</th>
                        <th className="py-2 px-2 font-bold">Status Wali Santri</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {INITIAL_STUDENTS.map((s, i) => (
                        <tr key={s.id} className="hover:bg-white">
                          <td className="py-2 px-2 text-text-muted">{i + 1}</td>
                          <td className="py-2 px-2 font-semibold text-text-main">{s.name}</td>
                          <td className="py-2 px-2 text-center text-text-muted">{s.daysFilled}</td>
                          <td className="py-2 px-2 text-center text-text-muted">{s.missedCount}</td>
                          <td className="py-2 px-2 text-emerald-700 font-medium">{s.consistencyLabel}</td>
                          <td className="py-2 px-2 text-text-muted">
                            {s.parentViewed ? "Terverifikasi" : "Belum"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-2 pt-6 text-center text-[11px] text-text-muted">
                  <div>
                    <p>Mengetahui,</p>
                    <p className="font-semibold text-text-main mt-1">Kepala Sekolah SMP Al-Hikmah</p>
                    <div className="h-12" />
                    <p className="font-bold text-text-main underline">Drs. H. Ahmad Masrur, M.Pd.</p>
                  </div>
                  <div>
                    <p>Surabaya, 14 Ramadan 1448 H</p>
                    <p className="font-semibold text-text-main mt-1">Wali Kelas {selectedClass}</p>
                    <div className="h-12" />
                    <p className="font-bold text-text-main underline">Ustadz Rakan Shaka, S.Pd.I</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPrintModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-bg-elevated text-text-main text-xs font-semibold hover:bg-border transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <LuPrinter className="text-sm font-bold" />
                  <span>Cetak Dokumen Sekarang</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Nav for Mobile */}
      <TeacherBottomNav activeTab="rekap" />
    </AppLayout>
  );
}
