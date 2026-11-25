import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AppLayout from "../../components/AppLayout";
import BottomSheet from "../../components/BottomSheet";
import NotificationBell from "../../components/NotificationBell";
import RoleSwitchPill from "../../components/RoleSwitchPill";
import { useAppData } from "../../../context/appDataStore";
import { useToast } from "../../../context/toastStore";
import { DEMO_SCHOOL } from "../../../data/demoData";
import { page, statusCheck, tapScale } from "../../../lib/motion";
import logoAlHikmah from "../../images/logo-al-hikmah.png";
import {
  IconCheckBold,
  IconClock,
  IconCircle,
  IconArrowLeft,
  IconNotebook,
  IconSparkleFill,
  IconBellRinging,
  IconCalendarDays,
} from "../../../lib/icons";

export default function KonfirmasiOrangTua() {
  const {
    parentWeekDays,
    confirmParentDay,
    kegiatanKhusus,
    notifications,
    markNotificationRead,
  } = useAppData();
  const { showToast } = useToast();

  const [selectedDay, setSelectedDay] = useState(null);
  const [isWeekConfirmed, setIsWeekConfirmed] = useState(false);
  const [weekConfirmTime, setWeekConfirmTime] = useState(
    "Sabtu, 21 Februari 2027 · 19.42 WIB"
  );

  const parentNotifications = notifications.filter(
    (n) => n.targetRole === "orang-tua"
  );
  const latestUnread = parentNotifications.find((n) => !n.read);

  const terisiCount = parentWeekDays.filter((d) => d.status === "terisi").length;
  const susulanCount = parentWeekDays.filter(
    (d) => d.status === "susulan"
  ).length;
  const confirmedDayCount = parentWeekDays.filter((d) => d.confirmed).length;

  const activeDayData = selectedDay
    ? parentWeekDays.find((d) => d.day === selectedDay)
    : null;

  const handleConfirmSingleDay = (dayNum) => {
    confirmParentDay(dayNum);
    showToast(`Catatan H${dayNum} dikonfirmasi telah dilihat orang tua.`);
  };

  const handleConfirmWeek = () => {
    const now = new Date();
    const timeStr = `Hari ini · ${String(now.getHours()).padStart(
      2,
      "0"
    )}.${String(now.getMinutes()).padStart(2, "0")} WIB`;
    setWeekConfirmTime(timeStr);
    parentWeekDays.forEach((d) => {
      if (d.status !== "belum") confirmParentDay(d.day);
    });
    setIsWeekConfirmed(true);
    showToast("Konfirmasi mingguan orang tua tercatat.");
  };

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 py-6 pb-16 lg:pb-12 gap-5 md:gap-6 select-none">
        {/* Mobile Brand Header + Bell + Role Switch */}
        <div className="flex items-center justify-between gap-2 lg:hidden">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-bg-surface border border-border overflow-hidden flex items-center justify-center shrink-0 shadow-[var(--shadow-card)]">
              <img
                src={logoAlHikmah}
                alt="Logo Al Hikmah"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display text-lg font-bold text-text-main truncate">
              Al Hikmah
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <NotificationBell targetRole="orang-tua" />
            <RoleSwitchPill />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isWeekConfirmed ? (
            <motion.div
              key="section-o01"
              {...page}
              className="w-full flex flex-col gap-5 md:gap-6"
            >
              {/* Header with Desktop Bell */}
              <header className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs text-text-muted font-medium block">
                    Ringkasan untuk Orang Tua · Data Contoh
                  </span>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-main leading-tight mt-0.5">
                    Assalamu&apos;alaikum, Bapak/Ibu
                  </h1>
                  <p className="text-xs md:text-sm text-text-muted mt-1">
                    Ketuk setiap tanggal untuk melihat keterangan dan
                    mengonfirmasi kegiatan ananda.
                  </p>
                </div>

                <div className="hidden lg:flex items-center gap-2 shrink-0">
                  <NotificationBell targetRole="orang-tua" />
                </div>
              </header>

              {/* Live Student Activity Notification Banner */}
              {latestUnread && (
                <div className="w-full bg-primary-50 border border-primary-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary-600 text-on-primary flex items-center justify-center text-lg shrink-0">
                      <IconBellRinging aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary-900 block">
                        {latestUnread.title}
                      </span>
                      <p className="text-xs text-primary-800 mt-0.5 leading-relaxed">
                        {latestUnread.message}
                      </p>
                      <span className="text-[11px] text-primary-700 mt-1 block">
                        {latestUnread.timestamp}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileTap={tapScale}
                    type="button"
                    onClick={() => markNotificationRead(latestUnread.id)}
                    className="min-h-11 px-4 rounded-full bg-bg-surface border border-primary-200 text-primary-700 hover:bg-bg-base text-xs font-semibold cursor-pointer shrink-0"
                  >
                    Tandai dibaca
                  </motion.button>
                </div>
              )}

              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Main Column */}
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
                  {/* Child Info Card */}
                  <section className="w-full bg-bg-surface border border-border rounded-[1.5rem] p-5 md:p-6 shadow-[var(--shadow-card)] space-y-4">
                    <div className="space-y-0.5">
                      <span className="text-xs text-text-muted font-medium block">
                        Nama anak (contoh)
                      </span>
                      <h2 className="font-display text-xl font-bold text-text-main">
                        Rafi Pratama (Demo)
                      </h2>
                      <p className="text-xs text-text-muted">
                        Kelas VIII-A · {DEMO_SCHOOL}
                      </p>
                    </div>

                    <div className="w-full border-t border-border-subtle pt-3.5 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-xs text-text-muted font-medium block">
                          Rentang yang ditinjau
                        </span>
                        <h3 className="text-sm md:text-base font-bold text-text-main">
                          Pekan ke-2 Ramadan (8–14 Ramadan 1448 H)
                        </h3>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-success-50 text-success-700 border border-success-200">
                        {confirmedDayCount}/{parentWeekDays.length} hari dikonfirmasi
                      </span>
                    </div>
                  </section>

                  {/* Clickable Per-Date Summary Card */}
                  <section className="w-full bg-bg-surface border border-border rounded-[1.5rem] p-5 md:p-6 shadow-[var(--shadow-card)] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-base md:text-lg font-bold text-text-main">
                          Ringkasan catatan per tanggal
                        </h3>
                        <p className="text-xs text-text-muted">
                          Ketuk tanggal untuk melihat keterangan &amp; konfirmasi
                        </p>
                      </div>
                      <span className="text-xs text-text-muted font-medium">
                        7 hari
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="bg-success-50 border border-success-200 rounded-2xl p-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-success-700">
                          <IconCheckBold className="text-xs" aria-hidden="true" />
                          <span>Hari terisi</span>
                        </div>
                        <div className="font-display text-2xl sm:text-3xl font-bold text-success-700 mt-1">
                          {terisiCount} hari
                        </div>
                      </div>

                      <div className="bg-accent-50 border border-accent-200 rounded-2xl p-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-accent-700">
                          <IconClock className="text-xs" aria-hidden="true" />
                          <span>Hari susulan</span>
                        </div>
                        <div className="font-display text-2xl sm:text-3xl font-bold text-accent-700 mt-1">
                          {susulanCount} hari
                        </div>
                      </div>
                    </div>

                    {/* Interactive Clickable 7 Date Buttons */}
                    <div className="bg-bg-base border border-border-subtle rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-text-main">
                          Catatan harian (ketuk tanggal)
                        </span>
                        <span className="text-xs text-text-muted">Pekan 2</span>
                      </div>

                      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                        {parentWeekDays.map((day) => {
                          let chipStyle =
                            "bg-bg-surface border-border text-text-muted hover:border-primary-300";
                          let icon = (
                            <IconCircle className="text-[10px]" aria-hidden="true" />
                          );
                          let statusName = "Belum diisi";

                          if (day.status === "terisi") {
                            chipStyle =
                              "bg-success-50 border-success-200 text-success-700 hover:border-success-600";
                            icon = (
                              <IconCheckBold className="text-xs" aria-hidden="true" />
                            );
                            statusName = "Terisi";
                          } else if (day.status === "susulan") {
                            chipStyle =
                              "bg-accent-50 border-accent-300 border-dashed text-accent-700 hover:border-accent-500";
                            icon = (
                              <IconClock className="text-xs" aria-hidden="true" />
                            );
                            statusName = "Susulan";
                          }

                          return (
                            <motion.button
                              key={day.day}
                              whileTap={tapScale}
                              type="button"
                              onClick={() => setSelectedDay(day.day)}
                              aria-label={`Lihat rincian ${day.label}, status ${statusName}${
                                day.confirmed ? ", sudah dikonfirmasi" : ""
                              }`}
                              className={`min-h-[62px] rounded-xl border flex flex-col items-center justify-center p-1 cursor-pointer transition-colors relative ${chipStyle} ${
                                day.confirmed ? "ring-1 ring-primary-400" : ""
                              }`}
                            >
                              <span className="text-[11px] sm:text-xs font-bold">
                                {day.label}
                              </span>
                              <span className="mt-1">{icon}</span>
                              {day.confirmed && (
                                <span
                                  className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1"
                                  aria-hidden="true"
                                />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-text-muted pt-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          <IconCheckBold
                            className="text-success-600 text-xs"
                            aria-hidden="true"
                          />
                          <span>Terisi</span>
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <IconClock
                            className="text-accent-600 text-xs"
                            aria-hidden="true"
                          />
                          <span>Susulan</span>
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="w-2 h-2 rounded-full bg-primary-600" />
                          <span>Terkonfirmasi</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-text-muted leading-relaxed">
                      Ringkasan menampilkan keterisian kegiatan anak tanpa
                      membuka alasan berhalangan.
                    </p>
                  </section>

                  {/* Jadwal Kegiatan Khusus Sekolah */}
                  <section className="w-full bg-bg-surface border border-border rounded-[1.5rem] p-5 md:p-6 shadow-[var(--shadow-card)] space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <IconCalendarDays
                          className="text-xl text-primary-600"
                          aria-hidden="true"
                        />
                        <h3 className="font-display text-base md:text-lg font-bold text-text-main">
                          Jadwal Kegiatan Khusus Sekolah
                        </h3>
                      </div>
                      <span className="text-xs text-text-muted font-medium">
                        {kegiatanKhusus.length} agenda
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {kegiatanKhusus.map((item) => {
                        const done = item.status === "sudah";
                        return (
                          <div
                            key={item.id}
                            className="p-4 rounded-2xl bg-bg-base border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                          >
                            <div className="min-w-0">
                              <span className="text-[11px] font-semibold text-accent-700 block">
                                {item.tag}
                              </span>
                              <h4 className="text-sm font-bold text-text-main">
                                {item.title}
                              </h4>
                              <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                                {item.description}
                              </p>
                            </div>

                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border shrink-0 self-start sm:self-center ${
                                done
                                  ? "bg-success-50 text-success-700 border-success-200"
                                  : "bg-bg-surface text-text-muted border-border"
                              }`}
                            >
                              {done ? (
                                <IconCheckBold
                                  className="text-[11px]"
                                  aria-hidden="true"
                                />
                              ) : (
                                <IconCircle
                                  className="text-[11px]"
                                  aria-hidden="true"
                                />
                              )}
                              <span>{done ? "Diikuti" : "Terjadwal"}</span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Mobile Confirm All CTA */}
                  <div className="flex flex-col gap-2.5 pt-1 lg:hidden">
                    <motion.button
                      whileTap={tapScale}
                      type="button"
                      onClick={handleConfirmWeek}
                      className="w-full min-h-12 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary font-semibold text-sm shadow-[var(--shadow-card)] transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <IconCheckBold className="text-base" aria-hidden="true" />
                      <span>Konfirmasi semua catatan pekan ini</span>
                    </motion.button>
                  </div>
                </div>

                {/* Desktop Right Column */}
                <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5 sticky top-6">
                  <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary-700 uppercase tracking-wider">
                      <IconNotebook
                        className="text-base text-primary-600"
                        aria-hidden="true"
                      />
                      <span>Konfirmasi Orang Tua</span>
                    </div>

                    <p className="text-xs text-text-muted leading-relaxed">
                      Bapak/Ibu dapat mengonfirmasi per tanggal dengan mengklik
                      kalender di samping, atau menandai seluruh pekan sekaligus.
                    </p>

                    <motion.button
                      whileTap={tapScale}
                      type="button"
                      onClick={handleConfirmWeek}
                      className="w-full min-h-12 px-5 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary font-semibold text-sm shadow-[var(--shadow-card)] transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <IconCheckBold className="text-base" aria-hidden="true" />
                      <span>Konfirmasi Pekan Ini</span>
                    </motion.button>
                  </div>

                  <div className="bg-accent-50 border border-accent-200 rounded-[1.5rem] p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-accent-700 uppercase tracking-wider">
                      <IconSparkleFill
                        className="text-base text-accent-500"
                        aria-hidden="true"
                      />
                      <span>Pendampingan di Rumah</span>
                    </div>
                    <p className="text-xs text-accent-800 leading-relaxed italic">
                      &ldquo;Teladan dan sapaan hangat orang tua di rumah
                      membantu anak menjaga kebiasaan baik sepanjang Ramadan.&rdquo;
                    </p>
                  </div>
                </aside>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="section-o02"
              {...page}
              className="w-full flex flex-col items-center justify-center py-6 md:py-12"
            >
              <div className="w-full max-w-lg bg-bg-surface border border-border rounded-[1.75rem] p-6 sm:p-8 md:p-10 shadow-[var(--shadow-card)] flex flex-col items-center text-center gap-5">
                <motion.div
                  {...statusCheck}
                  className="w-20 h-20 rounded-full bg-success-50 border-2 border-success-200 text-success-600 flex items-center justify-center text-4xl"
                >
                  <IconCheckBold aria-hidden="true" />
                </motion.div>

                <div className="space-y-2">
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main">
                    Sudah dilihat orang tua
                  </h1>
                  <p className="text-sm text-text-muted leading-relaxed max-w-sm mx-auto">
                    Terima kasih, Bapak/Ibu telah meninjau ringkasan catatan{" "}
                    <span className="font-semibold text-text-main">
                      Rafi Pratama (Demo)
                    </span>{" "}
                    untuk rentang 8 – 14 Ramadan 1448 H.
                  </p>
                </div>

                <div className="w-full bg-bg-base border border-border-subtle rounded-2xl p-4 space-y-1">
                  <span className="text-xs text-text-muted font-medium block">
                    Waktu konfirmasi tercatat
                  </span>
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-text-main">
                    <IconClock
                      className="text-primary-600 text-base shrink-0"
                      aria-hidden="true"
                    />
                    <span>{weekConfirmTime}</span>
                  </div>
                </div>

                <div className="w-full pt-2 space-y-3">
                  <p className="text-xs text-text-muted">
                    Bapak/Ibu dapat menutup halaman ini.
                  </p>

                  <motion.button
                    whileTap={tapScale}
                    type="button"
                    onClick={() => setIsWeekConfirmed(false)}
                    className="w-full min-h-12 px-6 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <IconArrowLeft className="text-base" aria-hidden="true" />
                    <span>Kembali lihat ringkasan</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Per-Date Detail & Confirmation Popup */}
      <BottomSheet
        isOpen={Boolean(activeDayData)}
        onClose={() => setSelectedDay(null)}
        title={activeDayData ? `Rincian ${activeDayData.label}` : ""}
        subtitle={activeDayData?.fullDate || ""}
        maxWidthClass="sm:max-w-lg"
      >
        {activeDayData && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border-subtle">
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Status Catatan
              </span>
              {activeDayData.status === "terisi" ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-success-50 text-success-700 border border-success-200">
                  <IconCheckBold className="text-xs" aria-hidden="true" />
                  <span>Terisi</span>
                </span>
              ) : activeDayData.status === "susulan" ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-accent-50 text-accent-700 border border-accent-200">
                  <IconClock className="text-xs" aria-hidden="true" />
                  <span>Catatan Susulan</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-bg-elevated text-text-muted border border-border">
                  <IconCircle className="text-xs" aria-hidden="true" />
                  <span>Belum diisi</span>
                </span>
              )}
            </div>

            <dl className="divide-y divide-border-subtle text-xs sm:text-sm">
              <div className="py-2.5 flex items-start justify-between gap-4">
                <dt className="text-text-muted shrink-0">Shaum</dt>
                <dd className="font-semibold text-text-main text-right">
                  {activeDayData.summary.shaum}
                </dd>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-4">
                <dt className="text-text-muted shrink-0">Sholat Wajib</dt>
                <dd className="font-semibold text-text-main text-right">
                  {activeDayData.summary.sholatWajib}
                </dd>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-4">
                <dt className="text-text-muted shrink-0">Sholat Sunnah</dt>
                <dd className="font-semibold text-text-main text-right">
                  {activeDayData.summary.sholatSunnah}
                </dd>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-4">
                <dt className="text-text-muted shrink-0">Tadarus Qur&apos;an</dt>
                <dd className="font-semibold text-text-main text-right">
                  {activeDayData.summary.tadarus}
                </dd>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-4">
                <dt className="text-text-muted shrink-0">Keterangan Infaq</dt>
                <dd className="font-medium text-text-main text-right">
                  {activeDayData.summary.infaq}
                </dd>
              </div>
              <div className="py-2.5 flex items-start justify-between gap-4">
                <dt className="text-text-muted shrink-0">Ceramah / Kultum</dt>
                <dd className="font-medium text-text-main text-right">
                  {activeDayData.summary.ceramah}
                </dd>
              </div>
            </dl>

            <div className="pt-3 border-t border-border-subtle">
              {activeDayData.confirmed ? (
                <div className="w-full p-3.5 rounded-2xl bg-success-50 border border-success-200 text-success-800 text-xs font-semibold flex items-center justify-center gap-2">
                  <IconCheckBold className="text-sm" aria-hidden="true" />
                  <span>
                    Sudah dikonfirmasi orang tua ({activeDayData.confirmedAt})
                  </span>
                </div>
              ) : (
                <motion.button
                  whileTap={tapScale}
                  type="button"
                  onClick={() => handleConfirmSingleDay(activeDayData.day)}
                  className="w-full min-h-12 px-5 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary text-sm font-semibold shadow-[var(--shadow-card)] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <IconCheckBold className="text-base" aria-hidden="true" />
                  <span>Saya sudah melihat catatan {activeDayData.label}</span>
                </motion.button>
              )}
            </div>
          </div>
        )}
      </BottomSheet>
    </AppLayout>
  );
}
