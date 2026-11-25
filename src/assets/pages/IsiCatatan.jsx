import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import AppLayout from "../components/AppLayout";
import ProgressRing from "../components/ProgressRing";
import {
  ShaumForm,
  SholatWajibForm,
  SholatSunnahForm,
  TadarusForm,
  InfaqForm,
  CeramahForm,
} from "../components/ActivityForms";
import { useAppData } from "../../context/appDataStore";
import { useToast } from "../../context/toastStore";
import { getSurahByNumber } from "../../services/quranService";
import { page, statusCheck, tapScale } from "../../lib/motion";
import {
  IconArrowLeft,
  IconCalendarDays,
  IconCheckBold,
  IconClock,
  IconBookOpenText,
  IconChat,
} from "../../lib/icons";

export default function IsiCatatan() {
  const navigate = useNavigate();
  const { dailyLog, updateDailyLogSection } = useAppData();
  const { showToast } = useToast();

  const [stage, setStage] = useState("form");
  const [shaumStatus, setShaumStatus] = useState(dailyLog.shaum);
  const [prayerStatuses, setPrayerStatuses] = useState(dailyLog.sholatWajib);
  const [sunnahStatuses, setSunnahStatuses] = useState(dailyLog.sholatSunnah);
  const [tadarusData, setTadarusData] = useState(dailyLog.tadarus);
  const [infaqData, setInfaqData] = useState(dailyLog.infaq);
  const [ceramahData, setCeramahData] = useState(dailyLog.ceramah);
  const [savedTime, setSavedTime] = useState(dailyLog.updatedAt || "15:20 WIB");

  const handleSave = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const timeStr = `${hours}:${minutes} WIB`;

    updateDailyLogSection(
      {
        shaum: shaumStatus,
        sholatWajib: prayerStatuses,
        sholatSunnah: sunnahStatuses,
        tadarus: tadarusData,
        infaq: infaqData,
        ceramah: ceramahData,
      },
      "Catatan Harian Lengkap"
    );

    setSavedTime(timeStr);
    setStage("success");
    showToast("Keenam catatan harian berhasil disimpan.");
  };

  const completedPrayers = Object.values(prayerStatuses).filter(
    (s) => s.status === "sudah"
  ).length;
  const sunnahDone = Object.values(sunnahStatuses).some(Boolean);
  const tadarusDone = Boolean(tadarusData?.surahNumber && tadarusData?.ayatEnd);
  const infaqDone = Boolean(infaqData?.keterangan?.trim());
  const ceramahDone = Boolean(ceramahData?.judul?.trim());
  const shaumDone = shaumStatus === "berpuasa" || shaumStatus === "berhalangan";

  const totalCompleted = [
    shaumDone,
    completedPrayers > 0,
    sunnahDone,
    tadarusDone,
    infaqDone,
    ceramahDone,
  ].filter(Boolean).length;
  const totalItems = 6;
  const surahObj = getSurahByNumber(tadarusData?.surahNumber || 2);

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-12 gap-6">
        <AnimatePresence mode="wait">
          {stage === "form" ? (
            <motion.div
              key="form-stage"
              {...page}
              className="flex flex-col gap-6"
            >
              {/* Compact Header */}
              <header className="flex items-center gap-3.5 select-none">
                <motion.button
                  whileTap={tapScale}
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-12 h-12 rounded-2xl border border-border bg-bg-surface flex items-center justify-center text-text-main shadow-[var(--shadow-card)] hover:bg-bg-elevated transition-colors cursor-pointer shrink-0"
                  aria-label="Kembali"
                >
                  <IconArrowLeft className="text-xl" aria-hidden="true" />
                </motion.button>

                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main leading-tight">
                    Isi Catatan Harian
                  </h1>
                  <p className="text-xs md:text-sm text-text-muted flex items-center gap-1.5 mt-0.5">
                    <IconCalendarDays className="text-sm shrink-0" aria-hidden="true" />
                    <span>Selasa, 24 Feb 2027 · 16 Ramadan 1448 H</span>
                  </p>
                </div>
              </header>

              {/* 2-Column Layout with 6 Cards */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
                  {/* Card 1: Shaum */}
                  <section className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
                          1 · Shaum
                        </span>
                        <h2 className="font-display text-lg font-bold text-text-main">
                          Shaum Ramadan
                        </h2>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-primary-50 text-primary-700 font-semibold">
                        Hari ke-16
                      </span>
                    </div>
                    <ShaumForm value={shaumStatus} onChange={setShaumStatus} />
                  </section>

                  {/* Card 2: Sholat Wajib (Waktu + Pelaksanaan) */}
                  <section className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
                          2 · Sholat Wajib
                        </span>
                        <h2 className="font-display text-lg font-bold text-text-main">
                          5 Waktu (Waktu &amp; Pelaksanaan)
                        </h2>
                      </div>
                      <span className="text-xs font-semibold text-text-muted">
                        {completedPrayers}/5 tercatat
                      </span>
                    </div>
                    <SholatWajibForm
                      prayersValue={prayerStatuses}
                      onChangePrayers={setPrayerStatuses}
                      includeSunnahSection={false}
                    />
                  </section>

                  {/* Card 3: Sholat Sunnah */}
                  <section className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-4">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
                        3 · Sholat Sunnah
                      </span>
                      <h2 className="font-display text-lg font-bold text-text-main">
                        Tarawih, Dhuha, Qobla &amp; Ba&apos;da
                      </h2>
                    </div>
                    <SholatSunnahForm
                      value={sunnahStatuses}
                      onChange={setSunnahStatuses}
                    />
                  </section>

                  {/* Card 4: Tadarus Qur'an */}
                  <section className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-4">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
                        4 · Tadarus Qur&apos;an
                      </span>
                      <h2 className="font-display text-lg font-bold text-text-main">
                        Pilih Surah, Juz &amp; Ayat
                      </h2>
                    </div>
                    <TadarusForm
                      value={tadarusData}
                      onChange={setTadarusData}
                    />
                  </section>

                  {/* Card 5: Infaq */}
                  <section className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-4">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
                        5 · Infaq
                      </span>
                      <h2 className="font-display text-lg font-bold text-text-main">
                        Catatan Infaq Harian
                      </h2>
                    </div>
                    <InfaqForm value={infaqData} onChange={setInfaqData} />
                  </section>

                  {/* Card 6: Ceramah / Kultum */}
                  <section className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-4">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
                        6 · Ceramah / Kultum
                      </span>
                      <h2 className="font-display text-lg font-bold text-text-main">
                        Ringkasan Ceramah
                      </h2>
                    </div>
                    <CeramahForm
                      value={ceramahData}
                      onChange={setCeramahData}
                    />
                  </section>

                  {/* Mobile Save Button */}
                  <div className="pt-1 flex flex-col gap-3.5 lg:hidden">
                    <p className="text-xs text-center text-text-muted leading-relaxed px-2">
                      Isilah apa adanya. Catatan terlambat tetap boleh diisi dan
                      diberi penanda waktu Susulan.
                    </p>
                    <motion.button
                      whileTap={tapScale}
                      type="button"
                      onClick={handleSave}
                      className="w-full min-h-12 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary font-semibold text-sm shadow-[var(--shadow-card)] transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <IconCheckBold className="text-base" aria-hidden="true" />
                      <span>Simpan Catatan</span>
                    </motion.button>
                  </div>
                </div>

                {/* Right Sticky Summary (Desktop) */}
                <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6">
                  <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-border-subtle">
                      <div>
                        <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                          Ringkasan 6 Kegiatan
                        </span>
                        <h3 className="font-display text-lg font-bold text-text-main mt-0.5">
                          {totalCompleted} dari {totalItems} tercatat
                        </h3>
                      </div>
                      <ProgressRing
                        value={totalCompleted}
                        total={totalItems}
                        size={72}
                        strokeWidth={6}
                        variant="light"
                      />
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between py-1 border-b border-border-subtle">
                        <span className="text-text-muted">1. Shaum</span>
                        <span className="font-semibold text-text-main">
                          {shaumStatus === "berpuasa"
                            ? "Berpuasa"
                            : shaumStatus === "berhalangan"
                            ? "Berhalangan"
                            : "Tidak Berpuasa"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-border-subtle">
                        <span className="text-text-muted">2. Sholat Wajib</span>
                        <span className="font-semibold text-text-main">
                          {completedPrayers}/5 waktu
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-border-subtle">
                        <span className="text-text-muted">3. Sholat Sunnah</span>
                        <span className="font-semibold text-text-main">
                          {sunnahDone ? "Sudah dicatat" : "Belum"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-border-subtle gap-2">
                        <span className="text-text-muted shrink-0">4. Tadarus</span>
                        <span className="font-semibold text-text-main truncate">
                          {surahObj.name} ({tadarusData.ayatStart}–{tadarusData.ayatEnd})
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-border-subtle">
                        <span className="text-text-muted">5. Infaq</span>
                        <span className="font-semibold text-text-main">
                          {infaqDone ? "Ada keterangan" : "Belum diisi"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-text-muted">6. Ceramah</span>
                        <span className="font-semibold text-text-main">
                          {ceramahDone ? "Sudah diisi" : "Belum diisi"}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      whileTap={tapScale}
                      type="button"
                      onClick={handleSave}
                      className="w-full min-h-12 px-5 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary font-semibold text-sm transition-colors shadow-[var(--shadow-card)] cursor-pointer flex items-center justify-center gap-2 mt-1"
                    >
                      <IconCheckBold className="text-base" aria-hidden="true" />
                      <span>Simpan Catatan</span>
                    </motion.button>
                  </div>

                  <div className="bg-accent-50 border border-accent-200 rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-accent-700 uppercase tracking-wider">
                      <IconBookOpenText
                        className="text-base text-accent-500"
                        aria-hidden="true"
                      />
                      <span>Adab Mencatat</span>
                    </div>
                    <p className="text-sm text-accent-800 leading-relaxed italic">
                      &ldquo;Amalan yang paling dicintai Allah adalah yang
                      dikerjakan secara rutin walaupun sedikit.&rdquo;
                    </p>
                    <span className="text-xs text-accent-600 font-semibold">
                      HR. Muslim no. 783
                    </span>
                  </div>

                  <div className="bg-bg-surface border border-border rounded-[1.5rem] p-4 shadow-[var(--shadow-card)] flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-text-main">
                        Punya pertanyaan seputar puasa?
                      </h4>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        Cari rujukan awal lalu konfirmasi ke guru atau orang tua.
                      </p>
                    </div>
                    <motion.button
                      whileTap={tapScale}
                      type="button"
                      onClick={() => navigate("/chat")}
                      className="min-h-12 px-4 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <IconChat
                        className="text-base text-primary-600"
                        aria-hidden="true"
                      />
                      <span>Tanya</span>
                    </motion.button>
                  </div>
                </aside>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-stage"
              {...page}
              className="w-full max-w-xl mx-auto flex-1 flex flex-col justify-between py-6 min-h-[480px] gap-6"
            >
              <header className="select-none">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main">
                  Catatan Tersimpan
                </h1>
                <p className="text-xs md:text-sm text-text-muted mt-0.5">
                  Selasa, 24 Feb 2027 · 16 Ramadan 1448 H
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
                    Terima kasih, catatan hari ini sudah tersimpan.
                  </h2>
                  <p className="text-sm text-text-muted">
                    Notifikasi pembaruan catatan juga telah dikirim ke akun
                    Orang Tua (Demo).
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-bg-base border border-border text-xs md:text-sm text-text-main font-medium">
                  <IconClock
                    className="text-primary-600 text-base shrink-0"
                    aria-hidden="true"
                  />
                  <span>Tersimpan pukul {savedTime}</span>
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
