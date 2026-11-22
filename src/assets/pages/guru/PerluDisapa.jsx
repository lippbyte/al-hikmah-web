import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LuCheck, LuHeart, LuInfo, LuArrowLeft } from "react-icons/lu";
import AppLayout from "../../components/AppLayout";
import TeacherBottomNav from "../../components/TeacherBottomNav";

export const STUDENTS_TO_GREET = [
  {
    id: "dimas-saputra",
    name: "Dimas Saputra",
    class: "VIII-A",
    unfilledDays: "Belum mengisi 4 hari",
    lastFilledDate: "10 Ramadan",
    greeted: false,
    greetedAt: null,
  },
  {
    id: "fajar-hidayat",
    name: "Fajar Hidayat",
    class: "VIII-A",
    unfilledDays: "Belum mengisi 3 hari",
    lastFilledDate: "11 Ramadan",
    greeted: false,
    greetedAt: null,
  },
  {
    id: "rizky-pratama",
    name: "Rizky Pratama",
    class: "VIII-A",
    unfilledDays: "Belum mengisi 2 hari",
    lastFilledDate: "12 Ramadan",
    greeted: false,
    greetedAt: null,
  },
  {
    id: "bagas-prakoso",
    name: "Bagas Prakoso",
    class: "VIII-A",
    unfilledDays: "Belum mengisi 2 hari",
    lastFilledDate: "12 Ramadan",
    greeted: false,
    greetedAt: null,
  },
];

export default function PerluDisapa() {
  const navigate = useNavigate();
  const [greetList, setGreetList] = useState(STUDENTS_TO_GREET);

  const toggleGreet = (id) => {
    setGreetList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nowGreeted = !s.greeted;
          return {
            ...s,
            greeted: nowGreeted,
            greetedAt: nowGreeted ? "Disapa hari ini" : null,
          };
        }
        return s;
      })
    );
  };

  const remainingCount = greetList.filter((s) => !s.greeted).length;

  return (
    <AppLayout>
      <main className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-28 lg:pb-12 gap-5 md:gap-6">
        
        {/* ===================== TOP HEADER (G-02 MOCKUP) ===================== */}
        <header className="flex items-center justify-between select-none">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-main leading-tight">
                Perlu Disapa
              </h1>
            </div>
            <p className="text-xs md:text-sm text-text-muted font-normal mt-0.5">
              Kelas VIII-A · Urutan jeda terlama
            </p>
          </div>
        </header>

        {/* ===================== RESPONSIVE 2-COLUMN LAYOUT ===================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= LEFT MAIN CONTENT ================= */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            
            {/* Informational Mint Banner */}
            <div className="w-full bg-emerald-50/70 border border-emerald-300/80 rounded-2xl p-4 text-xs md:text-sm text-emerald-900 leading-relaxed font-medium select-none">
              Daftar diurutkan dari siswa yang paling lama berhenti mengisi agar Bapak/Ibu dapat menyapa secara hangat di sekolah.
            </div>

            {/* Students List */}
            <div className="flex flex-col gap-3.5 select-none">
              {greetList.map((student, idx) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.04 }}
                  className="bg-bg-surface border border-border rounded-2xl p-4 md:p-5 shadow-2xs space-y-3.5"
                >
                  {/* Student Name & Unfilled Days Badge */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        onClick={() => navigate(`/guru/siswa/${student.id}`)}
                        className="text-base font-bold text-text-main hover:text-primary transition-colors cursor-pointer"
                      >
                        {student.name}
                      </h3>
                      <p className="text-xs text-text-muted mt-0.5">
                        Terakhir mengisi: {student.lastFilledDate}
                      </p>
                    </div>

                    <span className="text-xs font-semibold text-text-muted">
                      {student.unfilledDays}
                    </span>
                  </div>

                  {/* Interactive CTA: Tandai sudah disapa */}
                  {student.greeted ? (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => toggleGreet(student.id)}
                      className="w-full py-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                    >
                      <LuCheck className="text-sm font-bold" />
                      <span>Sudah disapa hari ini</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => toggleGreet(student.id)}
                      className="w-full py-2.5 rounded-xl border border-primary text-primary hover:bg-primary-surface text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>Tandai sudah disapa</span>
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>

          </div>

          {/* ================= RIGHT STICKY SIDEBAR (DESKTOP) ================= */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6 select-none">
            
            {/* Tips Card: Adab Menyapa Siswa */}
            <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <LuHeart className="text-sm" />
                <span>Adab & Panduan Menyapa</span>
              </div>

              <div className="space-y-2 text-xs text-text-muted leading-relaxed">
                <p>
                  1. **Tanyakan kabar secara personal** tanpa mempermalukan siswa di depan teman sekelasnya.
                </p>
                <p>
                  2. **Dengarkan kendala ibadah**: mungkin ada siswa yang sedang sakit, safar, atau lupa membawa ponsel.
                </p>
                <p>
                  3. **Beri motivasi dan apresiasi** atas niat baik serta amalan yang telah mereka laksanakan.
                </p>
              </div>
            </div>

            {/* Rekap Sapaan Hari Ini */}
            <div className="bg-bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col gap-3">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Progres Sapaan
              </h4>
              <div className="text-2xl font-bold text-text-main">
                {greetList.filter((s) => s.greeted).length} dari {greetList.length} Siswa Selesai Disapa
              </div>
              <div className="w-full h-2 rounded-md bg-bg-elevated overflow-hidden">
                <div
                  className="h-full bg-primary rounded-md transition-all duration-300"
                  style={{
                    width: `${(greetList.filter((s) => s.greeted).length / greetList.length) * 100}%`,
                  }}
                />
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Floating Bottom Nav for Mobile */}
      <TeacherBottomNav activeTab="sapa" />
    </AppLayout>
  );
}
