import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import AppLayout from "../components/AppLayout";
import { calendarCellHover, tapScale } from "../../lib/motion";
import {
  IconCheckBold,
  IconClock,
  IconCircle,
  IconPartial,
  IconMinus,
  IconStarFill,
  IconMoon,
  IconCalendarDays,
  IconArrowRight,
  IconSparkleFill,
} from "../../lib/icons";

const RAMADAN_DAYS = [
  { day: 1, date: "9 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 2, date: "10 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 3, date: "11 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 4, date: "12 Feb", status: "susulan", completed: 4, total: 5 },
  { day: 5, date: "13 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 6, date: "14 Feb", status: "sebagian", completed: 3, total: 5 },
  { day: 7, date: "15 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 8, date: "16 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 9, date: "17 Feb", status: "kosong", completed: 0, total: 5 },
  { day: 10, date: "18 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 11, date: "19 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 12, date: "20 Feb", status: "berhalangan", completed: 0, total: 5 },
  { day: 13, date: "21 Feb", status: "susulan", completed: 5, total: 5 },
  { day: 14, date: "22 Feb", status: "lengkap", completed: 5, total: 5 },
  { day: 15, date: "23 Feb", status: "lengkap", completed: 5, total: 5 },
  {
    day: 16,
    date: "24 Feb",
    status: "sebagian",
    isToday: true,
    completed: 3,
    total: 5,
  },
  {
    day: 17,
    date: "25 Feb",
    status: "mendatang",
    isSpecial: "nuzulul",
    completed: 0,
    total: 5,
  },
  { day: 18, date: "26 Feb", status: "mendatang", completed: 0, total: 5 },
  { day: 19, date: "27 Feb", status: "mendatang", completed: 0, total: 5 },
  { day: 20, date: "28 Feb", status: "mendatang", completed: 0, total: 5 },
  {
    day: 21,
    date: "1 Mar",
    status: "mendatang",
    isSpecial: "lailatul",
    completed: 0,
    total: 5,
  },
  {
    day: 22,
    date: "2 Mar",
    status: "mendatang",
    isSpecial: "lailatul",
    completed: 0,
    total: 5,
  },
  {
    day: 23,
    date: "3 Mar",
    status: "mendatang",
    isSpecial: "lailatul",
    completed: 0,
    total: 5,
  },
  {
    day: 24,
    date: "4 Mar",
    status: "mendatang",
    isSpecial: "lailatul",
    completed: 0,
    total: 5,
  },
  {
    day: 25,
    date: "5 Mar",
    status: "mendatang",
    isSpecial: "lailatul",
    completed: 0,
    total: 5,
  },
  {
    day: 26,
    date: "6 Mar",
    status: "mendatang",
    isSpecial: "lailatul",
    completed: 0,
    total: 5,
  },
  {
    day: 27,
    date: "7 Mar",
    status: "mendatang",
    isSpecial: "lailatul",
    completed: 0,
    total: 5,
  },
  {
    day: 28,
    date: "8 Mar",
    status: "mendatang",
    isSpecial: "lailatul",
    completed: 0,
    total: 5,
  },
  {
    day: 29,
    date: "9 Mar",
    status: "mendatang",
    isSpecial: "lailatul",
    completed: 0,
    total: 5,
  },
  {
    day: 30,
    date: "10 Mar",
    status: "mendatang",
    isSpecial: "lailatul",
    completed: 0,
    total: 5,
  },
];

export default function KalenderRamadan() {
  const navigate = useNavigate();
  const [selectedDayItem, setSelectedDayItem] = useState(
    RAMADAN_DAYS.find((d) => d.isToday) || RAMADAN_DAYS[15]
  );

  const handleDayClick = (dayItem) => {
    setSelectedDayItem(dayItem);
    if (window.innerWidth < 1024) {
      navigate(`/ramadan/detail/${dayItem.day}`);
    }
  };

  const lengkapCount = RAMADAN_DAYS.filter((d) => d.status === "lengkap").length;
  const sebagianCount = RAMADAN_DAYS.filter((d) => d.status === "sebagian").length;
  const susulanCount = RAMADAN_DAYS.filter((d) => d.status === "susulan").length;
  const kosongCount = RAMADAN_DAYS.filter((d) => d.status === "kosong").length;

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 pt-6 pb-28 lg:pb-12 gap-5 md:gap-6">
        {/* Header */}
        <header className="select-none">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main">
            Kalender Ramadan
          </h1>
          <p className="text-xs md:text-sm text-text-muted mt-0.5">
            Ramadan 1448 H · Februari–Maret 2027
          </p>
        </header>

        {/* Responsive Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Calendar Column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
            {/* Highlight Banner */}
            <div className="w-full bg-accent-50 border border-accent-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-accent-500 text-on-primary flex items-center justify-center text-xl shrink-0">
                  <IconSparkleFill aria-hidden="true" />
                </div>
                <div>
                  <span className="font-display text-base font-bold text-accent-800 block">
                    Hari ke-16 berjalan
                  </span>
                  <span className="text-xs text-accent-700 font-medium">
                    Catatan hari yang terlewat tetap bisa diisi sebagai Susulan
                  </span>
                </div>
              </div>

              <span className="text-xs font-semibold text-accent-800 bg-accent-100 border border-accent-200 px-3 py-1.5 rounded-full shrink-0">
                17 · Nuzulul Qur&apos;an
              </span>
            </div>

            {/* 30-Day Grid (No stagger animation on >20 items) */}
            <section className="bg-bg-surface border border-border rounded-[1.75rem] p-4 md:p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <IconCalendarDays
                    className="text-primary-600 text-xl"
                    aria-hidden="true"
                  />
                  <h2 className="font-display text-base md:text-lg font-bold text-text-main">
                    Catatan 30 Hari
                  </h2>
                </div>
                <span className="text-xs text-text-muted hidden sm:inline">
                  Pilih tanggal untuk detail atau susulan
                </span>
              </div>

              <div className="grid grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3">
                {RAMADAN_DAYS.map((item) => {
                  const isSelected = selectedDayItem.day === item.day;
                  let cardStyle =
                    "border-border bg-bg-surface text-text-main hover:border-primary-300";
                  let iconElement = <IconCircle className="text-xs" aria-hidden="true" />;
                  let statusLabel = "Kosong";

                  if (item.status === "lengkap") {
                    cardStyle =
                      "border-success-200 bg-success-50 text-success-700 hover:border-success-600";
                    iconElement = <IconCheckBold className="text-sm" aria-hidden="true" />;
                    statusLabel = "Sudah";
                  } else if (item.status === "sebagian") {
                    cardStyle =
                      "border-primary-200 bg-primary-50 text-primary-700 hover:border-primary-500";
                    iconElement = <IconPartial className="text-sm" aria-hidden="true" />;
                    statusLabel = "Sebagian";
                  } else if (item.status === "susulan") {
                    cardStyle =
                      "border-accent-300 border-dashed bg-accent-50 text-accent-700 hover:border-accent-500";
                    iconElement = <IconClock className="text-sm" aria-hidden="true" />;
                    statusLabel = "Susulan";
                  } else if (item.status === "berhalangan") {
                    cardStyle =
                      "border-accent-200 bg-accent-50 text-accent-700 hover:border-accent-400";
                    iconElement = <IconMinus className="text-sm" aria-hidden="true" />;
                    statusLabel = "Halangan";
                  } else if (item.status === "kosong") {
                    cardStyle =
                      "border-border bg-bg-surface text-text-muted hover:border-primary-300";
                    iconElement = <IconCircle className="text-xs" aria-hidden="true" />;
                    statusLabel = "Belum";
                  } else if (item.status === "mendatang") {
                    if (item.isSpecial === "nuzulul") {
                      cardStyle =
                        "border-accent-300 bg-accent-50 text-accent-800 hover:border-accent-500";
                    } else if (item.isSpecial === "lailatul") {
                      cardStyle =
                        "border-accent-200 bg-bg-base/70 text-accent-700 hover:border-accent-400";
                    } else {
                      cardStyle =
                        "border-dashed border-border bg-bg-base/60 text-text-muted";
                    }
                    iconElement = (
                      <span className="text-xs leading-none" aria-hidden="true">
                        ·
                      </span>
                    );
                    statusLabel = "Nanti";
                  }

                  const todayRing = item.isToday
                    ? "ring-2 ring-primary-600 ring-offset-2 ring-offset-bg-surface"
                    : isSelected
                    ? "ring-2 ring-primary-300 ring-offset-1 ring-offset-bg-surface"
                    : "";

                  return (
                    <motion.button
                      key={item.day}
                      whileHover={calendarCellHover}
                      whileTap={tapScale}
                      type="button"
                      onClick={() => handleDayClick(item)}
                      aria-label={`Hari ke-${item.day} Ramadan (${item.date}), status ${statusLabel}${
                        item.isToday ? ", hari ini" : ""
                      }`}
                      className={`min-h-[58px] aspect-square rounded-2xl border p-1.5 sm:p-2 flex flex-col items-center justify-between transition-colors cursor-pointer relative select-none ${cardStyle} ${todayRing}`}
                    >
                      {item.isSpecial === "nuzulul" && (
                        <span
                          className="absolute top-1.5 right-1.5 text-[11px] text-accent-500"
                          aria-hidden="true"
                        >
                          <IconStarFill />
                        </span>
                      )}
                      {item.isSpecial === "lailatul" && (
                        <span
                          className="absolute top-1.5 right-1.5 text-[11px] text-accent-500"
                          aria-hidden="true"
                        >
                          <IconMoon />
                        </span>
                      )}

                      <div className="flex flex-col items-center">
                        <span className="text-xs sm:text-sm font-bold leading-tight">
                          {item.day}
                        </span>
                        <span className="text-[10px] text-text-muted hidden sm:inline leading-none mt-0.5">
                          {item.date}
                        </span>
                      </div>

                      <span className="my-auto flex items-center justify-center">
                        {iconElement}
                      </span>

                      <span className="text-[10px] font-medium hidden md:inline leading-none truncate max-w-full">
                        {statusLabel}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* Legend */}
            <div className="bg-bg-surface border border-border rounded-2xl p-4 text-xs space-y-3 shadow-[var(--shadow-card)]">
              <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Keterangan Status
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-text-main">
                <span className="flex items-center gap-1.5">
                  <IconCheckBold className="text-success-600 text-sm shrink-0" aria-hidden="true" />
                  <span>Sudah</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <IconPartial className="text-primary-600 text-sm shrink-0" aria-hidden="true" />
                  <span>Sebagian</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <IconClock className="text-accent-600 text-sm shrink-0" aria-hidden="true" />
                  <span>Susulan</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <IconMinus className="text-accent-600 text-sm shrink-0" aria-hidden="true" />
                  <span>Berhalangan</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <IconCircle className="text-text-muted text-xs shrink-0" aria-hidden="true" />
                  <span>Belum</span>
                </span>
              </div>

              <div className="pt-2.5 border-t border-border-subtle flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-accent-700">
                <span className="flex items-center gap-1.5">
                  <IconStarFill className="text-accent-500 text-sm" aria-hidden="true" />
                  <span>17 · Nuzulul Qur&apos;an</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <IconMoon className="text-accent-500 text-sm" aria-hidden="true" />
                  <span>21–30 · 10 Malam Terakhir</span>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Companion Column */}
          <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6">
            {/* Selected Day Inspector */}
            <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-4">
              <div className="pb-3 border-b border-border-subtle">
                <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                  {selectedDayItem.isToday ? "Hari Ini" : "Ringkasan Tanggal"}
                </span>
                <h3 className="font-display text-lg font-bold text-text-main mt-0.5">
                  Hari ke-{selectedDayItem.day} Ramadan 1448 H
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {selectedDayItem.date} 2027
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Progres Catatan</span>
                  <span className="font-semibold text-text-main">
                    {selectedDayItem.completed} dari {selectedDayItem.total} tercatat
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-bg-elevated overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (selectedDayItem.completed / selectedDayItem.total) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-bg-base rounded-2xl p-3.5 border border-border-subtle text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Shaum</span>
                  <span className="font-semibold text-text-main">
                    {selectedDayItem.status === "berhalangan"
                      ? "Berhalangan"
                      : selectedDayItem.completed > 0
                      ? "Sudah"
                      : "Belum"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Sholat Wajib</span>
                  <span className="font-semibold text-text-main">
                    {selectedDayItem.completed >= 4
                      ? "5/5 Waktu"
                      : selectedDayItem.completed > 0
                      ? "3/5 Waktu"
                      : "Belum dicatat"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Tarawih</span>
                  <span className="font-semibold text-text-main">
                    {selectedDayItem.status === "lengkap" ? "Sudah" : "Belum"}
                  </span>
                </div>
              </div>

              <motion.button
                whileTap={tapScale}
                type="button"
                onClick={() =>
                  navigate(`/ramadan/detail/${selectedDayItem.day}`)
                }
                className="w-full min-h-12 px-5 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary text-sm font-semibold shadow-[var(--shadow-card)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buka Detail / Isi Susulan</span>
                <IconArrowRight className="text-base" aria-hidden="true" />
              </motion.button>
            </div>

            {/* Month Overview */}
            <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Ringkasan Bulan Ini
                </h3>
                <span className="text-xs font-semibold text-primary-600">
                  16 / 30 Hari
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3.5 rounded-2xl bg-success-50 border border-success-200 text-center">
                  <div className="font-display text-xl font-bold text-success-700">
                    {lengkapCount}
                  </div>
                  <div className="text-xs text-text-muted font-medium mt-0.5">
                    Hari Lengkap
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-primary-50 border border-primary-200 text-center">
                  <div className="font-display text-xl font-bold text-primary-700">
                    {sebagianCount}
                  </div>
                  <div className="text-xs text-text-muted font-medium mt-0.5">
                    Hari Sebagian
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-accent-50 border border-accent-200 text-center">
                  <div className="font-display text-xl font-bold text-accent-700">
                    {susulanCount}
                  </div>
                  <div className="text-xs text-text-muted font-medium mt-0.5">
                    Catatan Susulan
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-bg-elevated border border-border text-center">
                  <div className="font-display text-xl font-bold text-text-main">
                    {kosongCount}
                  </div>
                  <div className="text-xs text-text-muted font-medium mt-0.5">
                    Belum Diisi
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </AppLayout>
  );
}
