import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import AppLayout from "../../components/AppLayout";
import BottomSheet from "../../components/BottomSheet";
import { INITIAL_STUDENTS, PRAYERS_META } from "../../../data/demoData";
import { useAppData } from "../../../context/appDataStore";
import { getSurahByNumber } from "../../../services/quranService";
import { calendarCellHover, listItem, tapScale } from "../../../lib/motion";
import {
  IconArrowLeft,
  IconCheckBold,
  IconClock,
  IconCircle,
  IconPartial,
  IconMinus,
  IconNotebook,
  IconMoonStars,
  IconQuran,
  IconCharity,
  IconLecture,
  IconStar,
  IconInfo,
  IconChevronRight,
} from "../../../lib/icons";

const STUDENT_CALENDAR_DAYS = [
  { day: 1, status: "lengkap", filledAt: "Tepat hari (19.35 WIB)" },
  { day: 2, status: "lengkap", filledAt: "Tepat hari (20.10 WIB)" },
  { day: 3, status: "lengkap", filledAt: "Tepat hari (19.50 WIB)" },
  { day: 4, status: "susulan", filledAt: "Susulan · Diisi 5 Ram, 06.20 WIB" },
  { day: 5, status: "lengkap", filledAt: "Tepat hari (20.02 WIB)" },
  { day: 6, status: "sebagian", filledAt: "Tepat hari (18.40 WIB)" },
  { day: 7, status: "lengkap", filledAt: "Tepat hari (19.48 WIB)" },
  { day: 8, status: "lengkap", filledAt: "Tepat hari (20.12 WIB)" },
  { day: 9, status: "lengkap", filledAt: "Tepat hari (19.55 WIB)" },
  { day: 10, status: "lengkap", filledAt: "Tepat hari (20.00 WIB)" },
  { day: 11, status: "lengkap", filledAt: "Tepat hari (20.05 WIB)" },
  { day: 12, status: "berhalangan", filledAt: "Tercatat pada 12 Ram" },
  { day: 13, status: "susulan", filledAt: "Susulan · Diisi 14 Ram, 06.15 WIB" },
  { day: 14, status: "lengkap", isToday: true, filledAt: "Tepat hari (19.42 WIB)" },
  { day: 15, status: "datang", filledAt: "Belum waktunya" },
  { day: 16, status: "datang", filledAt: "Belum waktunya" },
  { day: 17, status: "datang", filledAt: "Belum waktunya" },
  { day: 18, status: "datang", filledAt: "Belum waktunya" },
  { day: 19, status: "datang", filledAt: "Belum waktunya" },
  { day: 20, status: "datang", filledAt: "Belum waktunya" },
  { day: 21, status: "datang", filledAt: "Belum waktunya" },
  { day: 22, status: "datang", filledAt: "Belum waktunya" },
  { day: 23, status: "datang", filledAt: "Belum waktunya" },
  { day: 24, status: "datang", filledAt: "Belum waktunya" },
  { day: 25, status: "datang", filledAt: "Belum waktunya" },
  { day: 26, status: "datang", filledAt: "Belum waktunya" },
  { day: 27, status: "datang", filledAt: "Belum waktunya" },
  { day: 28, status: "datang", filledAt: "Belum waktunya" },
  { day: 29, status: "datang", filledAt: "Belum waktunya" },
  { day: 30, status: "datang", filledAt: "Belum waktunya" },
];

const ENTRY_LOGS = [
  { day: 14, title: "14 Ramadan", note: "Tepat waktu (19.42 WIB)", type: "sudah" },
  { day: 13, title: "13 Ramadan", note: "Susulan · Diisi 14 Ram, 06.15 WIB", type: "susulan" },
  { day: 12, title: "12 Ramadan", note: "Berhalangan · Tercatat pada 12 Ram", type: "berhalangan" },
  { day: 11, title: "11 Ramadan", note: "Tepat waktu (20.05 WIB)", type: "sudah" },
];

const WAKTU_LABEL = {
  awal_waktu: "Awal Waktu",
  tepat_waktu: "Tepat Waktu",
  qadha: "Qadha",
};

const PELAKSANAAN_LABEL = {
  berjamaah: "Berjamaah",
  munfarid: "Munfarid",
};

const MEDIA_LABEL = {
  masjid: "Langsung di Masjid",
  rumah: "Di Rumah",
  internet: "Lewat Internet",
};

function buildStudentDayDetail(dayItem, student, liveDailyLog) {
  // For the demo student Rafi on Hari 14, reflect live updates made in Siswa mode
  if (student.id === "rafi-contoh" && dayItem.day === 14 && liveDailyLog) {
    const surah = getSurahByNumber(liveDailyLog.tadarus?.surahNumber || 2);
    const sunnahList = [];
    if (liveDailyLog.sholatSunnah?.tarawih) sunnahList.push("Tarawih");
    if (liveDailyLog.sholatSunnah?.dhuha) sunnahList.push("Dhuha");
    if (liveDailyLog.sholatSunnah?.qoblaBada) sunnahList.push("Qobla & Ba'da");

    return {
      shaum:
        liveDailyLog.shaum === "berpuasa"
          ? "Berpuasa"
          : liveDailyLog.shaum === "berhalangan"
          ? "Berhalangan"
          : "Tidak Berpuasa",
      prayers: PRAYERS_META.map((p) => ({
        ...p,
        ...(liveDailyLog.sholatWajib?.[p.id] || {
          status: "belum",
          waktu: "",
          pelaksanaan: "",
        }),
      })),
      sunnah: sunnahList,
      tadarus: `QS. ${surah.name} · Ayat ${liveDailyLog.tadarus?.ayatStart || 1}–${
        liveDailyLog.tadarus?.ayatEnd || 20
      } (Juz ${liveDailyLog.tadarus?.juz || surah.startJuz})`,
      infaq:
        liveDailyLog.infaq?.keterangan?.trim() || "Belum ada keterangan infaq.",
      ceramah: liveDailyLog.ceramah?.judul?.trim()
        ? {
            judul: liveDailyLog.ceramah.judul,
            penceramah: liveDailyLog.ceramah.penceramah || "-",
            media: MEDIA_LABEL[liveDailyLog.ceramah.media] || "Langsung di Masjid",
            ringkasan:
              liveDailyLog.ceramah.ringkasan || "Belum ada ringkasan tertulis.",
            keterangan: liveDailyLog.ceramah.keterangan || "",
          }
        : null,
    };
  }

  if (dayItem.status === "datang") {
    return null;
  }

  if (dayItem.status === "berhalangan") {
    return {
      shaum: "Berhalangan",
      prayers: PRAYERS_META.map((p) => ({
        ...p,
        status: "berhalangan",
        waktu: "",
        pelaksanaan: "",
      })),
      sunnah: [],
      tadarus: "Menyimak murottal / dzikir harian",
      infaq: "Berinfaq bersama keluarga di rumah",
      ceramah: {
        judul: "Keutamaan Sabar dan Dzikir di Bulan Ramadan",
        penceramah: "Kajian Daring Sekolah (Contoh)",
        media: "Lewat Internet",
        ringkasan:
          "Meskipun sedang berhalangan sholat dan puasa, tetap bisa meraih kebaikan melalui dzikir, menyimak kajian, dan membantu orang tua.",
        keterangan: "Disimak sore hari di rumah",
      },
    };
  }

  const isPartial = dayItem.status === "sebagian";
  const sampleSurahNum = ((dayItem.day - 1) % 3) + 2; // Al-Baqarah, Ali 'Imran, An-Nisa'
  const surah = getSurahByNumber(sampleSurahNum);
  const startAyah = (dayItem.day - 1) * 10 + 1;
  const endAyah = Math.min(startAyah + 14, surah.ayahs);

  return {
    shaum: "Berpuasa",
    prayers: [
      { id: "subuh", name: "Subuh", time: "04:42 WIB", status: "sudah", waktu: "awal_waktu", pelaksanaan: "berjamaah" },
      { id: "dzuhur", name: "Dzuhur", time: "12:05 WIB", status: "sudah", waktu: "tepat_waktu", pelaksanaan: "berjamaah" },
      { id: "ashar", name: "Ashar", time: "15:15 WIB", status: "sudah", waktu: "awal_waktu", pelaksanaan: "munfarid" },
      {
        id: "maghrib",
        name: "Maghrib",
        time: "18:12 WIB",
        status: isPartial ? "belum" : "sudah",
        waktu: isPartial ? "" : "awal_waktu",
        pelaksanaan: isPartial ? "" : "berjamaah",
      },
      {
        id: "isya",
        name: "Isya",
        time: "19:22 WIB",
        status: isPartial ? "belum" : "sudah",
        waktu: isPartial ? "" : "tepat_waktu",
        pelaksanaan: isPartial ? "" : "berjamaah",
      },
    ],
    sunnah: isPartial ? ["Dhuha"] : ["Tarawih", "Dhuha", "Qobla & Ba'da"],
    tadarus: `QS. ${surah.name} · Ayat ${startAyah}–${endAyah} (Juz ${surah.startJuz})`,
    infaq:
      dayItem.day % 2 === 0
        ? "Berinfaq di kotak masjid setelah sholat berjamaah."
        : "Berinfaq di kegiatan jumat / kotak kelas sekolah.",
    ceramah: isPartial
      ? null
      : {
          judul: `Kultum Hari ke-${dayItem.day}: Menjaga Keikhlasan dan Adab`,
          penceramah: "Ustadz Pemateri Masjid (Contoh)",
          media: dayItem.day % 3 === 0 ? "Di Rumah" : "Langsung di Masjid",
          ringkasan:
            "Inti ceramah mengingatkan untuk menjaga niat puasa, berkata lembut kepada orang tua, dan merutinkan membaca Al-Qur'an walau sedikit setiap hari.",
          keterangan: "Mengikuti kultum menjelang Tarawih",
        },
  };
}

export default function DetailSiswa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dailyLog } = useAppData();

  const student =
    INITIAL_STUDENTS.find((s) => s.id === id) || INITIAL_STUDENTS[0];

  const [selectedDay, setSelectedDay] = useState(null);

  const selectedDayItem = selectedDay
    ? STUDENT_CALENDAR_DAYS.find((d) => d.day === selectedDay)
    : null;
  const dayDetail = selectedDayItem
    ? buildStudentDayDetail(selectedDayItem, student, dailyLog)
    : null;

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-16 lg:pb-12 gap-6">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between gap-4 select-none">
          <div className="flex items-start gap-3.5">
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
          </div>

          <motion.button
            whileTap={tapScale}
            type="button"
            onClick={() => setSelectedDay(14)}
            className="min-h-12 px-5 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary text-xs sm:text-sm font-semibold shadow-[var(--shadow-card)] transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Lihat Detail Hari Ini</span>
            <IconChevronRight className="text-base" aria-hidden="true" />
          </motion.button>
        </header>

        {/* Responsive 2-Column Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Calendar & Timeline */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5 select-none">
            {/* 30-Day Interactive Calendar Grid */}
            <section className="bg-bg-surface border border-border rounded-[1.75rem] p-4 md:p-6 shadow-[var(--shadow-card)] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-display text-base md:text-lg font-bold text-text-main">
                    Kalender Ramadan 1448 H
                  </h2>
                  <p className="text-xs text-text-muted mt-0.5">
                    Ketuk tanggal untuk melihat popup detail pengisian kegiatan harian
                  </p>
                </div>
                <span className="text-xs text-text-muted font-medium">
                  30 hari
                </span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-2.5">
                {STUDENT_CALENDAR_DAYS.map((item) => {
                  let cellStyle =
                    "border-border bg-bg-base/70 text-text-muted border-dashed hover:border-primary-300";
                  let icon = <IconCircle className="text-[11px]" aria-hidden="true" />;
                  let statusLabel = "Akan datang";

                  if (item.status === "lengkap") {
                    cellStyle =
                      "border-success-200 bg-success-50 text-success-700 hover:border-success-600";
                    icon = <IconCheckBold className="text-xs" aria-hidden="true" />;
                    statusLabel = "Lengkap";
                  } else if (item.status === "sebagian") {
                    cellStyle =
                      "border-primary-200 bg-primary-50 text-primary-700 hover:border-primary-500";
                    icon = <IconPartial className="text-xs" aria-hidden="true" />;
                    statusLabel = "Sebagian";
                  } else if (item.status === "susulan") {
                    cellStyle =
                      "border-accent-300 bg-accent-50 text-accent-700 border-dashed hover:border-accent-500";
                    icon = <IconClock className="text-xs" aria-hidden="true" />;
                    statusLabel = "Susulan";
                  } else if (item.status === "berhalangan") {
                    cellStyle =
                      "border-accent-200 bg-accent-50 text-accent-700 hover:border-accent-400";
                    icon = <IconMinus className="text-xs" aria-hidden="true" />;
                    statusLabel = "Berhalangan";
                  }

                  return (
                    <motion.button
                      key={item.day}
                      whileHover={calendarCellHover}
                      whileTap={tapScale}
                      type="button"
                      onClick={() => setSelectedDay(item.day)}
                      aria-label={`Hari ke-${item.day} Ramadan, status ${statusLabel}, ketuk untuk melihat detail pengisian`}
                      className={`h-14 rounded-2xl border flex flex-col items-center justify-center p-1 cursor-pointer transition-colors ${cellStyle} ${
                        item.isToday
                          ? "ring-2 ring-primary-600 ring-offset-2 ring-offset-bg-surface"
                          : ""
                      }`}
                    >
                      <span className="text-xs font-bold">{item.day}</span>
                      <span className="mt-0.5">{icon}</span>
                    </motion.button>
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

            {/* Clickable Jejak Pengisian */}
            <section className="space-y-3">
              <div className="flex items-center justify-between px-0.5">
                <h2 className="font-display text-lg font-bold text-text-main">
                  Jejak Pengisian
                </h2>
                <span className="text-xs text-text-muted font-medium">
                  Ketuk untuk detail
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {ENTRY_LOGS.map((entry, idx) => (
                  <motion.button
                    key={entry.day}
                    custom={idx}
                    variants={listItem}
                    initial="initial"
                    animate="animate"
                    whileTap={tapScale}
                    type="button"
                    onClick={() => setSelectedDay(entry.day)}
                    className="w-full text-left bg-bg-surface border border-border hover:border-primary-300 rounded-2xl p-4 min-h-[72px] shadow-[var(--shadow-card)] flex items-center justify-between gap-3 cursor-pointer transition-colors"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-text-main">
                        {entry.title}
                      </h3>
                      <p className="text-xs text-text-muted mt-0.5">
                        {entry.note}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {entry.type === "susulan" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-50 text-accent-700 border border-accent-200">
                          <IconClock className="text-xs" aria-hidden="true" />
                          <span>Susulan</span>
                        </span>
                      ) : entry.type === "berhalangan" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-50 text-accent-700 border border-accent-200">
                          <IconMinus className="text-xs" aria-hidden="true" />
                          <span>Berhalangan</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-success-50 text-success-700 border border-success-200">
                          <IconCheckBold className="text-xs" aria-hidden="true" />
                          <span>Sudah</span>
                        </span>
                      )}
                      <IconChevronRight
                        className="text-base text-text-muted"
                        aria-hidden="true"
                      />
                    </div>
                  </motion.button>
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

      {/* Guru Popup: Detail Pengisian 6 Kegiatan Harian Siswa */}
      <BottomSheet
        isOpen={Boolean(selectedDayItem)}
        onClose={() => setSelectedDay(null)}
        title={
          selectedDayItem
            ? `Detail Pengisian · Hari ke-${selectedDayItem.day} Ramadan`
            : ""
        }
        subtitle={
          selectedDayItem
            ? `${student.name} · ${selectedDayItem.filledAt}`
            : ""
        }
        maxWidthClass="sm:max-w-xl"
      >
        {selectedDayItem && !dayDetail ? (
          <div className="py-8 text-center space-y-2">
            <IconCircle
              className="text-3xl text-text-muted mx-auto"
              aria-hidden="true"
            />
            <p className="text-sm font-semibold text-text-main">
              Belum ada pengisian untuk hari ke-{selectedDayItem.day} Ramadan
            </p>
            <p className="text-xs text-text-muted">
              Tanggal ini belum berjalan atau belum diisi oleh siswa.
            </p>
          </div>
        ) : (
          dayDetail && (
            <div className="space-y-4">
              {/* 1. Shaum */}
              <div className="p-4 rounded-2xl bg-bg-base border border-border-subtle flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <IconMoonStars
                    className="text-lg text-primary-600 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                    1. Shaum
                  </span>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                    dayDetail.shaum === "Berpuasa"
                      ? "bg-success-50 text-success-700 border-success-200"
                      : dayDetail.shaum === "Berhalangan"
                      ? "bg-accent-50 text-accent-700 border-accent-200"
                      : "bg-bg-surface text-text-muted border-border"
                  }`}
                >
                  {dayDetail.shaum === "Berpuasa" ? (
                    <IconCheckBold className="text-[11px]" aria-hidden="true" />
                  ) : dayDetail.shaum === "Berhalangan" ? (
                    <IconMinus className="text-[11px]" aria-hidden="true" />
                  ) : (
                    <IconCircle className="text-[11px]" aria-hidden="true" />
                  )}
                  <span>{dayDetail.shaum}</span>
                </span>
              </div>

              {dayDetail.shaum === "Berhalangan" && (
                <div className="p-3 rounded-2xl bg-accent-50 border border-accent-200 text-xs text-accent-800 flex items-start gap-2">
                  <IconInfo
                    className="text-base text-accent-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Alasan berhalangan tidak diminta dan tidak ditampilkan untuk
                    menjaga privasi siswa.
                  </span>
                </div>
              )}

              {/* 2. Sholat Wajib (Waktu & Pelaksanaan) */}
              <div className="p-4 rounded-2xl bg-bg-base border border-border-subtle space-y-3">
                <div className="flex items-center gap-2">
                  <IconClock
                    className="text-lg text-primary-600 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                    2. Sholat Wajib (5 Waktu)
                  </span>
                </div>

                <div className="divide-y divide-border-subtle">
                  {dayDetail.prayers.map((p) => (
                    <div
                      key={p.id}
                      className="py-2 first:pt-0 last:pb-0 flex flex-wrap items-center justify-between gap-2 text-xs"
                    >
                      <span className="font-semibold text-text-main">
                        {p.name}
                      </span>

                      {p.status === "sudah" ? (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-success-50 text-success-700 border border-success-200 font-semibold">
                            {WAKTU_LABEL[p.waktu] || "Sudah"}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 font-semibold">
                            {PELAKSANAAN_LABEL[p.pelaksanaan] || "Berjamaah"}
                          </span>
                        </div>
                      ) : p.status === "berhalangan" ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-accent-50 text-accent-700 border border-accent-200 font-semibold">
                          Berhalangan
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-bg-surface text-text-muted border border-border">
                          Belum dicatat
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Sholat Sunnah */}
              <div className="p-4 rounded-2xl bg-bg-base border border-border-subtle space-y-2.5">
                <div className="flex items-center gap-2">
                  <IconStar
                    className="text-lg text-primary-600 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                    3. Sholat Sunnah
                  </span>
                </div>

                {dayDetail.sunnah.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {dayDetail.sunnah.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-success-50 text-success-700 border border-success-200"
                      >
                        <IconCheckBold className="text-[10px]" aria-hidden="true" />
                        <span>{s}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-text-muted">
                    Belum ada sholat sunnah tercatat pada tanggal ini.
                  </p>
                )}
              </div>

              {/* 4. Tadarus Qur'an */}
              <div className="p-4 rounded-2xl bg-bg-base border border-border-subtle space-y-1.5">
                <div className="flex items-center gap-2">
                  <IconQuran
                    className="text-lg text-primary-600 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                    4. Tadarus Qur&apos;an
                  </span>
                </div>
                <p className="text-sm font-semibold text-text-main">
                  {dayDetail.tadarus}
                </p>
              </div>

              {/* 5. Infaq */}
              <div className="p-4 rounded-2xl bg-bg-base border border-border-subtle space-y-1.5">
                <div className="flex items-center gap-2">
                  <IconCharity
                    className="text-lg text-primary-600 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                    5. Keterangan Infaq
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-text-main leading-relaxed">
                  {dayDetail.infaq}
                </p>
              </div>

              {/* 6. Ceramah / Kultum */}
              <div className="p-4 rounded-2xl bg-bg-base border border-border-subtle space-y-2">
                <div className="flex items-center gap-2">
                  <IconLecture
                    className="text-lg text-primary-600 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-text-main uppercase tracking-wider">
                    6. Ceramah / Kultum
                  </span>
                </div>

                {dayDetail.ceramah ? (
                  <div className="space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-text-main">
                        {dayDetail.ceramah.judul}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 font-semibold">
                        {dayDetail.ceramah.media}
                      </span>
                    </div>
                    <p className="text-text-muted">
                      Penceramah:{" "}
                      <strong className="text-text-main font-semibold">
                        {dayDetail.ceramah.penceramah}
                      </strong>
                    </p>
                    <p className="text-text-main leading-relaxed bg-bg-surface border border-border-subtle rounded-xl p-3">
                      {dayDetail.ceramah.ringkasan}
                    </p>
                    {dayDetail.ceramah.keterangan && (
                      <p className="text-text-muted italic">
                        Keterangan: {dayDetail.ceramah.keterangan}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-text-muted">
                    Belum ada catatan ceramah atau kultum pada tanggal ini.
                  </p>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <motion.button
                  whileTap={tapScale}
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="min-h-12 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary text-sm font-semibold cursor-pointer"
                >
                  Tutup
                </motion.button>
              </div>
            </div>
          )
        )}
      </BottomSheet>
    </AppLayout>
  );
}
