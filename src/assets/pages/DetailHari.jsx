import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import AppLayout from "../components/AppLayout";
import { ShaumForm, SholatWajibForm } from "../components/ActivityForms";
import { useAppData } from "../../context/appDataStore";
import { useToast } from "../../context/toastStore";
import { page, statusCheck, tapScale } from "../../lib/motion";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCalendarDays,
  IconCheckBold,
  IconClock,
} from "../../lib/icons";

export default function DetailHari() {
  const navigate = useNavigate();
  const { day } = useParams();
  const { dailyLog, updateDailyLogSection } = useAppData();
  const { showToast } = useToast();

  const [stage, setStage] = useState("form");
  const [shaumStatus, setShaumStatus] = useState(dailyLog.shaum || "berpuasa");
  const [sholatWajib, setSholatWajib] = useState(() => ({
    ...dailyLog.sholatWajib,
  }));
  const [sholatSunnah, setSholatSunnah] = useState(() => ({
    ...dailyLog.sholatSunnah,
  }));
  const [savedTime, setSavedTime] = useState("08:40 WIB");

  const selectedDay = day || "13";
  const dateFormatted = `${selectedDay} Ramadan 1448 H · Februari 2027`;

  const handleSave = () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")} WIB`;
    setSavedTime(timeStr);

    updateDailyLogSection(
      {
        shaum: shaumStatus,
        sholatWajib,
        sholatSunnah,
      },
      `Catatan Susulan Hari ke-${selectedDay}`
    );

    setStage("success");
    showToast("Catatan susulan berhasil diperbarui.", "accent");
  };

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-12 gap-6">
        <AnimatePresence mode="wait">
          {stage === "form" ? (
            <motion.div
              key="detail-form-stage"
              {...page}
              className="flex flex-col gap-6"
            >
              {/* Header */}
              <header className="flex items-center gap-3.5 select-none">
                <motion.button
                  whileTap={tapScale}
                  type="button"
                  onClick={() => navigate("/ramadan")}
                  className="w-12 h-12 rounded-2xl border border-border bg-bg-surface flex items-center justify-center text-text-main shadow-[var(--shadow-card)] hover:bg-bg-elevated transition-colors cursor-pointer shrink-0"
                  aria-label="Kembali ke kalender"
                >
                  <IconArrowLeft className="text-xl" aria-hidden="true" />
                </motion.button>

                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main leading-tight">
                    Detail Catatan Hari
                  </h1>
                  <p className="text-xs md:text-sm text-text-muted flex items-center gap-1.5 mt-0.5">
                    <IconCalendarDays className="text-sm shrink-0" aria-hidden="true" />
                    <span>{dateFormatted}</span>
                  </p>
                </div>
              </header>

              {/* Grid */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                  {/* Susulan Notice */}
                  <div className="w-full bg-accent-50 border border-accent-200 rounded-2xl p-4 flex items-center gap-3">
                    <IconClock
                      className="text-accent-600 text-xl shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-xs md:text-sm font-semibold text-accent-800 leading-snug">
                      Catatan susulan · Tetap boleh diisi dan hanya diberi penanda
                      waktu pengisian.
                    </span>
                  </div>

                  {/* Shaum (3 options) */}
                  <section className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
                          Shaum
                        </span>
                        <h2 className="font-display font-bold text-text-main text-lg">
                          Shaum Ramadan · Hari ke-{selectedDay}
                        </h2>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-accent-50 text-accent-700 border border-accent-200 font-semibold inline-flex items-center gap-1 shrink-0">
                        <IconClock className="text-xs" aria-hidden="true" />
                        <span>Susulan</span>
                      </span>
                    </div>

                    <ShaumForm value={shaumStatus} onChange={setShaumStatus} />
                  </section>

                  {/* Sholat Wajib & Sunnah */}
                  <section className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-4">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
                        Sholat Wajib &amp; Sunnah
                      </span>
                      <h2 className="font-display font-bold text-text-main text-lg">
                        5 Waktu + Opsi Sunnah
                      </h2>
                    </div>

                    <SholatWajibForm
                      prayersValue={sholatWajib}
                      onChangePrayers={setSholatWajib}
                      sunnahValue={sholatSunnah}
                      onChangeSunnah={setSholatSunnah}
                      includeSunnahSection
                    />
                  </section>

                  {/* Mobile Submit */}
                  <div className="pt-1 flex flex-col gap-3.5 lg:hidden">
                    <p className="text-xs text-center text-text-muted">
                      Isilah apa adanya. Catatan terlambat tidak diblokir.
                    </p>
                    <motion.button
                      whileTap={tapScale}
                      type="button"
                      onClick={handleSave}
                      className="w-full min-h-12 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary font-semibold text-sm shadow-[var(--shadow-card)] transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <IconCheckBold className="text-base" aria-hidden="true" />
                      <span>Simpan Perubahan</span>
                    </motion.button>
                  </div>
                </div>

                {/* Desktop Right Column */}
                <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6">
                  <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                      <div>
                        <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                          Hari ke-{selectedDay}
                        </span>
                        <h3 className="font-display text-lg font-bold text-text-main mt-0.5">
                          Catatan Susulan
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-700 bg-accent-50 border border-accent-200 px-3 py-1 rounded-full">
                        <IconClock className="text-xs" aria-hidden="true" />
                        <span>Susulan</span>
                      </span>
                    </div>

                    <p className="text-xs text-text-muted leading-relaxed">
                      Perubahan yang disimpan akan memperbarui kalender Ramadan
                      dan tetap disertai penanda waktu pengisian susulan.
                    </p>

                    <motion.button
                      whileTap={tapScale}
                      type="button"
                      onClick={handleSave}
                      className="w-full min-h-12 px-5 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary font-semibold text-sm transition-colors shadow-[var(--shadow-card)] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <IconCheckBold className="text-base" aria-hidden="true" />
                      <span>Simpan Perubahan</span>
                    </motion.button>
                  </div>

                  <motion.button
                    whileTap={tapScale}
                    type="button"
                    onClick={() => navigate("/ramadan")}
                    className="w-full min-h-12 px-5 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-xs font-semibold text-text-main transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Kembali ke Kalender Ramadan</span>
                    <IconArrowRight className="text-sm" aria-hidden="true" />
                  </motion.button>
                </aside>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail-success-stage"
              {...page}
              className="w-full max-w-xl mx-auto flex-1 flex flex-col justify-between py-6 min-h-[480px] gap-6"
            >
              <header className="select-none">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main">
                  Catatan Tersimpan
                </h1>
                <p className="text-xs md:text-sm text-text-muted mt-0.5">
                  {dateFormatted}
                </p>
              </header>

              <div className="bg-bg-surface border border-border rounded-[1.75rem] p-6 sm:p-8 shadow-[var(--shadow-card)] flex flex-col items-center text-center gap-5 my-auto">
                <motion.div
                  {...statusCheck}
                  className="w-20 h-20 rounded-full border-2 border-success-200 bg-success-50 text-success-600 flex items-center justify-center text-4xl"
                >
                  <IconCheckBold aria-hidden="true" />
                </motion.div>

                <div className="space-y-1.5">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-text-main leading-snug">
                    Catatan susulan sudah diperbarui.
                  </h2>
                  <p className="text-sm text-text-muted">
                    Perubahan tercatat pada kalender Ramadan dengan penanda
                    waktu.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 w-full max-w-sm">
                  <div className="w-full bg-bg-base border border-border rounded-2xl py-3 px-4 flex items-center justify-center gap-2 text-xs md:text-sm text-text-main font-medium">
                    <IconClock
                      className="text-primary-600 text-base shrink-0"
                      aria-hidden="true"
                    />
                    <span>Tersimpan pukul {savedTime}</span>
                  </div>

                  <div className="w-full bg-accent-50 border border-accent-200 rounded-2xl py-3 px-4 flex items-center justify-center gap-2 text-xs md:text-sm text-accent-800 font-semibold">
                    <IconClock
                      className="text-accent-600 text-base shrink-0"
                      aria-hidden="true"
                    />
                    <span>Ditandai sebagai catatan Susulan</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <motion.button
                  whileTap={tapScale}
                  type="button"
                  onClick={() => navigate("/")}
                  className="w-full min-h-12 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary font-semibold text-sm transition-colors shadow-[var(--shadow-card)] cursor-pointer"
                >
                  Kembali ke Hari Ini
                </motion.button>

                <motion.button
                  whileTap={tapScale}
                  type="button"
                  onClick={() => navigate("/ramadan")}
                  className="w-full min-h-12 px-6 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main font-semibold text-sm transition-colors cursor-pointer"
                >
                  Lihat Kalender Ramadan
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </AppLayout>
  );
}
