import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import AppLayout from "../../components/AppLayout";
import ProgressRing from "../../components/ProgressRing";
import { STUDENTS_TO_GREET } from "../../../data/demoData";
import { useAppData } from "../../../context/appDataStore";
import { useToast } from "../../../context/toastStore";
import { listItem, statusCheck, tapScale } from "../../../lib/motion";
import {
  IconCheckBold,
  IconHeartFill,
  IconClock,
  IconBellRinging,
} from "../../../lib/icons";

export default function PerluDisapa() {
  const navigate = useNavigate();
  const { sendTeacherGreeting } = useAppData();
  const { showToast } = useToast();
  const [greetList, setGreetList] = useState(STUDENTS_TO_GREET);

  const toggleGreet = (id) => {
    setGreetList((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nowGreeted = !s.greeted;
          if (nowGreeted) {
            sendTeacherGreeting(s);
            showToast(
              `Notifikasi sapaan terkirim ke ${s.name}.`,
              "success"
            );
          } else {
            showToast(`Penanda sapaan untuk ${s.name} dibatalkan.`, "info");
          }
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

  const greetedCount = greetList.filter((s) => s.greeted).length;

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-28 lg:pb-12 gap-5 md:gap-6">
        <header className="select-none">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main leading-tight">
            Perlu Disapa
          </h1>
          <p className="text-xs md:text-sm text-text-muted mt-0.5">
            Kelas VIII-A · Urutan jeda terlama (Data Contoh)
          </p>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Primary Column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            <div className="w-full bg-primary-50 border border-primary-200 rounded-2xl p-4 flex items-start gap-3 text-xs md:text-sm text-primary-800 leading-relaxed select-none">
              <IconBellRinging
                className="text-lg text-primary-600 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p>
                Saat Bapak/Ibu menekan <strong>Tandai sudah disapa</strong>,
                sistem otomatis mengirimkan notifikasi sapaan ke akun siswa
                tersebut.
              </p>
            </div>

            <div className="flex flex-col gap-4 select-none">
              {greetList.map((student, idx) => (
                <motion.article
                  key={student.id}
                  custom={idx}
                  variants={listItem}
                  initial="initial"
                  animate="animate"
                  className="bg-bg-surface border border-border rounded-[1.5rem] p-4 md:p-5 shadow-[var(--shadow-card)] space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <button
                        type="button"
                        onClick={() => navigate(`/guru/siswa/${student.id}`)}
                        className="text-base font-bold text-text-main hover:text-primary-600 transition-colors cursor-pointer text-left"
                      >
                        {student.name}
                      </button>
                      <p className="text-xs text-text-muted mt-0.5">
                        Terakhir mengisi: {student.lastFilledDate}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-accent-50 text-accent-700 border border-accent-200 shrink-0">
                      <IconClock className="text-xs" aria-hidden="true" />
                      <span>{student.unfilledDays}</span>
                    </span>
                  </div>

                  {student.greeted ? (
                    <motion.button
                      whileTap={tapScale}
                      type="button"
                      onClick={() => toggleGreet(student.id)}
                      className="w-full min-h-12 px-5 rounded-full bg-success-50 border border-success-200 text-success-700 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <motion.span {...statusCheck} className="inline-flex">
                        <IconCheckBold className="text-sm" aria-hidden="true" />
                      </motion.span>
                      <span>Sudah disapa · Notifikasi terkirim</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      whileTap={tapScale}
                      type="button"
                      onClick={() => toggleGreet(student.id)}
                      className="w-full min-h-12 px-5 rounded-full border border-primary-600 text-primary-600 hover:bg-primary-50 text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Tandai sudah disapa &amp; kirim notifikasi</span>
                    </motion.button>
                  )}
                </motion.article>
              ))}
            </div>
          </div>

          {/* Desktop Right Column */}
          <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6 select-none">
            <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Progres Sapaan
                </h2>
                <div className="font-display text-xl font-bold text-text-main mt-1">
                  {greetedCount} dari {greetList.length} disapa
                </div>
                <p className="text-xs text-text-muted mt-0.5">
                  Notifikasi terkirim ke siswa terpilih
                </p>
              </div>
              <ProgressRing
                value={greetedCount}
                total={greetList.length}
                size={76}
                strokeWidth={6}
                variant="light"
              />
            </div>

            <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary-700 uppercase tracking-wider">
                <IconHeartFill
                  className="text-base text-primary-600"
                  aria-hidden="true"
                />
                <span>Adab Menyapa Siswa</span>
              </div>

              <ol className="space-y-2.5 text-xs text-text-muted leading-relaxed list-decimal list-inside">
                <li>
                  <strong className="text-text-main font-semibold">
                    Tanyakan kabar secara personal
                  </strong>{" "}
                  tanpa menyinggung di depan teman sekelas.
                </li>
                <li>
                  <strong className="text-text-main font-semibold">
                    Dengarkan kendala yang dihadapi
                  </strong>{" "}
                  seperti sedang sakit, safar, atau lupa membawa perangkat.
                </li>
                <li>
                  <strong className="text-text-main font-semibold">
                    Beri dukungan yang menenangkan
                  </strong>{" "}
                  bahwa catatan susulan tetap boleh diisi kapan saja.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </main>
    </AppLayout>
  );
}
