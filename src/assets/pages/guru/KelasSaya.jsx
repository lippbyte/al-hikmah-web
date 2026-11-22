import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  LuSettings,
  LuChevronRight,
  LuCheck,
  LuSparkles,
  LuFileText,
  LuHeart,
} from "react-icons/lu";
import AppLayout from "../../components/AppLayout";
import TeacherBottomNav from "../../components/TeacherBottomNav";

export const INITIAL_STUDENTS = [
  {
    id: "nabila-zahra",
    name: "Nabila Zahra",
    class: "VIII-A",
    statusToday: "sudah", // sudah | belum | berhalangan
    statusText: "Catatan hari ini: Sudah diisi",
    consistency: "rutin", // rutin | konsisten | sapa
    consistencyLabel: "Mulai rutin",
    consistencyBars: [true, true, false],
    parentViewed: true,
    parentViewedDate: "12 Ram",
    daysFilled: "13/14 hari",
    missedCount: 1,
  },
  {
    id: "ahmad-fauzan",
    name: "Ahmad Fauzan",
    class: "VIII-A",
    statusToday: "sudah",
    statusText: "Catatan hari ini: Sudah diisi",
    consistency: "konsisten",
    consistencyLabel: "Sangat konsisten",
    consistencyBars: [true, true, true],
    parentViewed: true,
    parentViewedDate: "14 Ram",
    daysFilled: "14/14 hari",
    missedCount: 0,
  },
  {
    id: "siti-aisyah",
    name: "Siti Aisyah",
    class: "VIII-A",
    statusToday: "sudah",
    statusText: "Catatan hari ini: Sudah diisi",
    consistency: "konsisten",
    consistencyLabel: "Sangat konsisten",
    consistencyBars: [true, true, true],
    parentViewed: true,
    parentViewedDate: "13 Ram",
    daysFilled: "14/14 hari",
    missedCount: 0,
  },
  {
    id: "dimas-saputra",
    name: "Dimas Saputra",
    class: "VIII-A",
    statusToday: "belum",
    statusText: "Catatan hari ini: Belum diisi",
    consistency: "sapa",
    consistencyLabel: "Perlu sapaan",
    consistencyBars: [true, false, false],
    parentViewed: false,
    daysFilled: "9/14 hari",
    missedCount: 2,
    daysUnfilledCount: 4,
    lastFilled: "10 Ramadan",
    greeted: false,
  },
  {
    id: "zahra-putri",
    name: "Zahra Putri",
    class: "VIII-A",
    statusToday: "berhalangan",
    statusText: "Catatan hari ini: Berhalangan",
    consistency: "konsisten",
    consistencyLabel: "Sangat konsisten",
    consistencyBars: [true, true, true],
    parentViewed: true,
    parentViewedDate: "14 Ram",
    daysFilled: "14/14 hari",
    missedCount: 1,
  },
  {
    id: "fajar-hidayat",
    name: "Fajar Hidayat",
    class: "VIII-A",
    statusToday: "belum",
    statusText: "Catatan hari ini: Belum diisi",
    consistency: "sapa",
    consistencyLabel: "Perlu sapaan",
    consistencyBars: [true, false, false],
    parentViewed: true,
    parentViewedDate: "11 Ram",
    daysFilled: "10/14 hari",
    missedCount: 1,
    daysUnfilledCount: 3,
    lastFilled: "11 Ramadan",
    greeted: false,
  },
];

export default function KelasSaya() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("VIII-A");
  const [students] = useState(INITIAL_STUDENTS);

  const classes = ["VIII-A", "VIII-B", "IX-A"];

  return (
    <AppLayout>
      <main className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-28 lg:pb-12 gap-5 md:gap-6">
        
        {/* ===================== TOP HEADER (G-01 MOCKUP) ===================== */}
        <header className="flex items-center justify-between select-none">
          <div>
            <span className="text-xs text-text-muted font-medium block">
              Assalamu'alaikum, Bapak/Ibu
            </span>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-main leading-tight mt-0.5">
              Kelas Saya
            </h1>
            <p className="text-xs md:text-sm text-text-muted font-normal mt-0.5">
              14 Ramadan 1448 H · 22 Feb 2027
            </p>
          </div>

          {/* Settings Button -> Section G-05 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => navigate("/guru/atur-kegiatan")}
            className="w-10 h-10 rounded-xl border border-border bg-bg-surface flex items-center justify-center text-text-main shadow-2xs hover:bg-bg-elevated hover:text-primary transition-colors cursor-pointer shrink-0"
            title="Atur Kegiatan Ramadan"
            aria-label="Atur Kegiatan Sekolah"
          >
            <LuSettings className="text-xl" />
          </motion.button>
        </header>

        {/* ===================== CLASS SELECTOR TABS ===================== */}
        <div className="w-full bg-bg-elevated/70 p-1 rounded-2xl border border-border/70 grid grid-cols-3 gap-1.5 select-none">
          {classes.map((cls) => (
            <button
              key={cls}
              type="button"
              onClick={() => setSelectedClass(cls)}
              className={`py-2 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer text-center ${
                selectedClass === cls
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "text-text-muted hover:text-text-main"
              }`}
            >
              {cls}
            </button>
          ))}
        </div>

        {/* ===================== RESPONSIVE 2-COLUMN LAYOUT ===================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= LEFT COLUMN: MAIN CONTENT (7/12 & 8/12) ================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
            
            {/* CARD: CATATAN HARI INI */}
            <div className="rounded-2xl md:rounded-3xl shadow-2xs select-none">
              <div className="flex items-center justify-between">
              </div>

              {/* 3 Metric Boxes (24 Sudah, 5 Belum, 3 Berhalangan) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-3 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-emerald-700 leading-tight">
                    24
                  </div>
                  <div className="text-[11px] md:text-xs text-text-muted mt-0.5 leading-tight font-medium">
                    Sudah mengisi
                  </div>
                </div>

                <div className="bg-bg-elevated/70 border border-border/80 rounded-2xl p-3 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-text-main leading-tight">
                    5
                  </div>
                  <div className="text-[11px] md:text-xs text-text-muted mt-0.5 leading-tight font-medium">
                    Belum mengisi
                  </div>
                </div>

                <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-3 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-amber-600 leading-tight">
                    3
                  </div>
                  <div className="text-[11px] md:text-xs text-text-muted mt-0.5 leading-tight font-medium">
                    Berhalangan
                  </div>
                </div>
              </div>
            </div>

            {/* DAFTAR SISWA SECTION */}
            <div className="space-y-3 select-none">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm md:text-base font-bold text-text-main">
                  Daftar Siswa
                </h3>
                <span className="text-xs text-text-muted font-medium">
                  Konsisten minggu ini
                </span>
              </div>

              {/* Student Cards List */}
              <div className="flex flex-col gap-2.5">
                {students.map((student, idx) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => navigate(`/guru/siswa/${student.id}`)}
                    className="bg-bg-surface border border-border hover:border-primary/50 rounded-2xl p-3.5 md:p-4 shadow-2xs transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-text-main leading-tight">
                        {student.name}
                      </h4>
                      <p className="text-xs text-text-muted mt-0.5 font-normal">
                        {student.statusText}
                      </p>
                    </div>

                    {/* Right Consistency Badge & Visual Mini Bars */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">

                      {/* 3 Consistency Mini Bars */}
                      <div className="flex items-center gap-1">
                        {student.consistencyBars.map((filled, i) => (
                          <div
                            key={i}
                            className={`w-3.5 h-1 rounded-sm ${
                              filled
                                ? student.consistency === "sapa"
                                  ? "bg-amber-500"
                                  : "bg-emerald-600"
                                : "bg-bg-elevated border border-border/40"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: STICKY DESKTOP WIDGETS ================= */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6 select-none">
            
            {/* Widget 1: Perlu Disapa Quick Alert */}
            <div className="bg-accent-surface border border-accent/30 rounded-3xl p-5 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#451A03] uppercase tracking-wider">
                  <LuHeart className="text-sm text-accent" />
                  <span>Perlu Disapa Pekan Ini</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-accent text-white">
                  4 Siswa
                </span>
              </div>

              <p className="text-xs text-[#78350F] leading-relaxed">
                Ada 4 siswa yang belum mengisi mutaba'ah selama lebih dari 2 hari berturut-turut. Mari sapa hangat saat jam istirahat.
              </p>

              <button
                type="button"
                onClick={() => navigate("/guru/sapa")}
                className="w-full py-2.5 px-3 rounded-xl bg-white text-[#78350F] hover:bg-white/80 border border-accent/40 text-xs font-bold shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Buka Daftar Perlu Disapa</span>
                <LuChevronRight className="text-sm" />
              </button>
            </div>

            {/* Widget 2: Rekap Kelas & Tanda Tangan Wali */}
            <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col gap-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-border/50">
                <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                  Tinjauan Orang Tua
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  84%
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-text-main">
                  27 dari 32 Catatan Dilihat
                </h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Sebagian besar wali santri telah memeriksa dan memvalidasi amaliyah harian putra/putrinya.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/guru/rekap")}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LuFileText className="text-sm" />
                <span>Lihat Rekap Lengkap & Cetak A4</span>
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Floating Bottom Nav for Mobile */}
      <TeacherBottomNav activeTab="kelas" />
    </AppLayout>
  );
}
