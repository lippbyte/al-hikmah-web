import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import AppLayout from "../components/AppLayout";
import ProgressRing from "../components/ProgressRing";
import BottomSheet from "../components/BottomSheet";
import NotificationBell from "../components/NotificationBell";
import PrayerScheduleCard from "../components/PrayerScheduleCard";
import {
  ShaumForm,
  SholatWajibForm,
  SholatSunnahForm,
  TadarusForm,
  InfaqForm,
  CeramahForm,
} from "../components/ActivityForms";
import { useAuth } from "../../context/authStore";
import { useAppData } from "../../context/appDataStore";
import { useToast } from "../../context/toastStore";
import {
  DEFAULT_PRAYER_SCHEDULE,
  fetchPrayerScheduleByCoords,
  getLocalTimezoneLabel,
  getNextPrayerCountdown,
  loadCachedGpsCoords,
  requestBrowserGps,
} from "../../services/prayerScheduleService";
import { getSurahByNumber } from "../../services/quranService";
import { listItem, tapScale } from "../../lib/motion";
import logoAlHikmah from "../images/logo-al-hikmah.png";
import {
  IconArrowUpRight,
  IconSparkleFill,
  IconMoonStars,
  IconClock,
  IconStar,
  IconCharity,
  IconLecture,
  IconQuran,
  IconCheckBold,
  IconCircle,
  IconMinus,
  IconChat,
  IconBookOpenText,
  IconQuestion,
  IconChevronRight,
} from "../../lib/icons";

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { dailyLog, updateDailyLogSection } = useAppData();
  const { showToast } = useToast();

  // Prayer Schedule (GPS-based + Live Countdown)
  const [prayerState, setPrayerState] = useState({
    schedule: DEFAULT_PRAYER_SCHEDULE,
    source: "Jadwal contoh · aktifkan izin lokasi GPS untuk akurasi setempat",
    locationLabel: `Lokasi belum aktif (${getLocalTimezoneLabel()})`,
  });
  const [locationStatus, setLocationStatus] = useState(() =>
    loadCachedGpsCoords() ? "granted" : "prompt"
  );
  const [now, setNow] = useState(() => new Date());

  const handleRequestLocation = useCallback(
    async (notifyUser = false) => {
      setLocationStatus("requesting");
      try {
        const coords = await requestBrowserGps();
        const data = await fetchPrayerScheduleByCoords(coords);
        setPrayerState(data);
        setLocationStatus("granted");
        if (notifyUser) {
          showToast("Jadwal sholat diperbarui sesuai lokasi GPS.");
        }
      } catch (err) {
        const denied = err?.code === 1;
        setLocationStatus(denied ? "denied" : "prompt");
        if (notifyUser) {
          showToast(
            denied
              ? "Izin lokasi ditolak. Aktifkan izin lokasi pada browser."
              : "Gagal mengambil koordinat GPS. Coba lagi beberapa saat.",
            "accent"
          );
        }
      }
    },
    [showToast]
  );

  useEffect(() => {
    let active = true;
    const cached = loadCachedGpsCoords();
    fetchPrayerScheduleByCoords(cached).then((data) => {
      if (active) setPrayerState(data);
    });

    // Trigger location permission / refresh GPS automatically on load
    requestBrowserGps()
      .then((coords) => fetchPrayerScheduleByCoords(coords))
      .then((data) => {
        if (active) {
          setPrayerState(data);
          setLocationStatus("granted");
        }
      })
      .catch((err) => {
        if (!active) return;
        if (err?.code === 1) {
          setLocationStatus("denied");
        } else if (!cached) {
          setLocationStatus("prompt");
        }
      });

    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const countdown = getNextPrayerCountdown(prayerState.schedule, now);

  // Popup state for Bento Grid cards
  const [activeModal, setActiveModal] = useState(null);
  const [draftShaum, setDraftShaum] = useState(dailyLog.shaum);
  const [draftPrayers, setDraftPrayers] = useState(dailyLog.sholatWajib);
  const [draftSunnah, setDraftSunnah] = useState(dailyLog.sholatSunnah);
  const [draftTadarus, setDraftTadarus] = useState(dailyLog.tadarus);
  const [draftInfaq, setDraftInfaq] = useState(dailyLog.infaq);
  const [draftCeramah, setDraftCeramah] = useState(dailyLog.ceramah);

  const openActivityModal = (activityId) => {
    setDraftShaum(dailyLog.shaum);
    setDraftPrayers(dailyLog.sholatWajib);
    setDraftSunnah(dailyLog.sholatSunnah);
    setDraftTadarus(dailyLog.tadarus);
    setDraftInfaq(dailyLog.infaq);
    setDraftCeramah(dailyLog.ceramah);
    setActiveModal(activityId);
  };

  const handleSaveModal = () => {
    if (activeModal === "shaum") {
      updateDailyLogSection({ shaum: draftShaum }, "Shaum");
      showToast("Catatan Shaum diperbarui.");
    } else if (activeModal === "sholat") {
      updateDailyLogSection(
        { sholatWajib: draftPrayers, sholatSunnah: draftSunnah },
        "Sholat Wajib & Sunnah"
      );
      showToast("Catatan Sholat diperbarui.");
    } else if (activeModal === "sunnah") {
      updateDailyLogSection({ sholatSunnah: draftSunnah }, "Sholat Sunnah");
      showToast("Catatan Sholat Sunnah diperbarui.");
    } else if (activeModal === "tadarus") {
      const s = getSurahByNumber(draftTadarus.surahNumber);
      updateDailyLogSection(
        { tadarus: draftTadarus },
        "Tadarus Qur'an",
        `Rafi Pratama (Demo) mencatat Tadarus QS. ${s.name} ayat ${draftTadarus.ayatStart}–${draftTadarus.ayatEnd}.`
      );
      showToast("Catatan Tadarus Qur'an diperbarui.");
    } else if (activeModal === "infaq") {
      updateDailyLogSection({ infaq: draftInfaq }, "Infaq");
      showToast("Keterangan Infaq disimpan.");
    } else if (activeModal === "ceramah") {
      updateDailyLogSection({ ceramah: draftCeramah }, "Ceramah / Kultum");
      showToast("Catatan Ceramah disimpan.");
    }
    setActiveModal(null);
  };

  // Compute progress across 6 daily bento activities
  const prayersList = Object.values(dailyLog.sholatWajib || {});
  const prayersDone = prayersList.filter((p) => p.status === "sudah").length;
  const sunnahCount = Object.values(dailyLog.sholatSunnah || {}).filter(
    Boolean
  ).length;
  const tadarusSurah = getSurahByNumber(dailyLog.tadarus?.surahNumber || 2);
  const tadarusFilled = Boolean(
    dailyLog.tadarus?.surahNumber && dailyLog.tadarus?.ayatEnd
  );
  const infaqFilled = Boolean(dailyLog.infaq?.keterangan?.trim());
  const ceramahFilled = Boolean(dailyLog.ceramah?.judul?.trim());
  const shaumDone = dailyLog.shaum === "berpuasa";
  const shaumHalangan = dailyLog.shaum === "berhalangan";

  const bentoActivities = [
    {
      id: "shaum",
      title: "Shaum",
      subtitle:
        dailyLog.shaum === "berpuasa"
          ? "Berpuasa hari ini"
          : dailyLog.shaum === "berhalangan"
          ? "Berhalangan"
          : "Tidak berpuasa",
      icon: IconMoonStars,
      status: shaumDone ? "sudah" : shaumHalangan ? "berhalangan" : "belum",
      spanClass: "col-span-2 md:col-span-3",
      featured: true,
    },
    {
      id: "sholat",
      title: "Sholat Wajib",
      subtitle: `${prayersDone}/5 waktu · Waktu & Jamaah`,
      icon: IconClock,
      status: prayersDone > 0 ? "sudah" : "belum",
      spanClass: "col-span-2 md:col-span-3",
      featured: true,
    },
    {
      id: "tadarus",
      title: "Tadarus Qur'an",
      subtitle: tadarusFilled
        ? `QS. ${tadarusSurah.name} · Ayat ${dailyLog.tadarus.ayatStart}–${dailyLog.tadarus.ayatEnd}`
        : "Pilih juz, surah & ayat",
      icon: IconQuran,
      status: tadarusFilled ? "sudah" : "belum",
      spanClass: "col-span-2 md:col-span-3",
    },
    {
      id: "sunnah",
      title: "Sholat Sunnah",
      subtitle:
        sunnahCount > 0
          ? `${sunnahCount} sunnah tercatat (Tarawih/Dhuha/Rawatib)`
          : "Tarawih, Dhuha, Qobla & Ba'da",
      icon: IconStar,
      status: sunnahCount > 0 ? "sudah" : "belum",
      spanClass: "col-span-1 md:col-span-3",
    },
    {
      id: "infaq",
      title: "Infaq",
      subtitle: infaqFilled
        ? dailyLog.infaq.keterangan
        : "Tulis keterangan berinfaq atau tidak",
      icon: IconCharity,
      status: infaqFilled ? "info" : "belum",
      hideStatusPill: true,
      spanClass: "col-span-1 md:col-span-3",
    },
    {
      id: "ceramah",
      title: "Ceramah / Kultum",
      subtitle: ceramahFilled
        ? `${dailyLog.ceramah.judul}`
        : "Judul, penceramah & ringkasan jujur",
      icon: IconLecture,
      status: ceramahFilled ? "sudah" : "belum",
      spanClass: "col-span-2 md:col-span-3",
    },
  ];

  const completedCount = [
    shaumDone || shaumHalangan,
    prayersDone > 0,
    sunnahCount > 0,
    tadarusFilled,
    infaqFilled,
    ceramahFilled,
  ].filter(Boolean).length;

  const totalCount = bentoActivities.length;
  const statusLabel =
    completedCount === totalCount
      ? "Lengkap"
      : completedCount === 0
      ? "Belum dimulai"
      : "Sebagian";

  const displayName =
    currentUser?.role === "siswa" ? currentUser.firstName : "Rafi";

  const modalTitleMap = {
    shaum: "Catat Shaum Hari Ini",
    sholat: "Catat Sholat Wajib & Sunnah",
    sunnah: "Catat Sholat Sunnah",
    tadarus: "Catat Tadarus Qur'an",
    infaq: "Keterangan Infaq",
    ceramah: "Catat Ceramah / Kultum",
  };

  return (
    <AppLayout>
      <main className="w-full max-w-[1100px] mx-auto flex-1 flex flex-col px-4 md:px-6 lg:px-8 pt-6 pb-28 lg:pb-12 gap-5 md:gap-6">
        {/* Compact Header with Mobile Brand Logo & Notification Bell */}
        <header className="flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3 min-w-0">
            <div className="lg:hidden w-11 h-11 rounded-2xl bg-bg-surface border border-border overflow-hidden flex items-center justify-center shrink-0 shadow-[var(--shadow-card)]">
              <img
                src={logoAlHikmah}
                alt="Logo Al Hikmah"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-text-muted font-medium truncate">
                Assalamu&apos;alaikum, {displayName}
              </p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-text-main tracking-tight mt-0.5">
                Hari Ini
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex text-xs font-medium text-text-muted bg-bg-elevated px-3 py-1.5 rounded-full">
              16 Ramadan 1448 H
            </span>
            <NotificationBell targetRole="siswa" />
          </div>
        </header>

        {/* Responsive Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* Primary Column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
            {/* Hero Marun Card */}
            <section
              aria-label="Ringkasan catatan hari ini"
              className="w-full bg-primary-600 rounded-[1.75rem] p-5 md:p-7 text-on-primary shadow-[var(--shadow-elevated)] flex flex-col gap-5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-2.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-on-primary/15 text-on-primary text-xs font-semibold px-3 py-1 rounded-full">
                      {statusLabel}
                    </span>
                    <span className="text-xs text-on-primary/80 font-medium">
                      {completedCount} dari {totalCount} tercatat
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl md:text-[1.75rem] font-bold leading-tight">
                      Catatan hari ini
                    </h2>
                    <p className="text-xs md:text-sm text-on-primary/85 mt-1">
                      Selasa, 24 Feb 2027 · 16 Ramadan 1448 H
                    </p>
                  </div>
                </div>

                <ProgressRing
                  value={completedCount}
                  total={totalCount}
                  size={92}
                  strokeWidth={8}
                  variant="hero"
                  label={`Progres catatan hari ini: ${completedCount} dari ${totalCount}`}
                />
              </div>

              <motion.button
                whileTap={tapScale}
                type="button"
                onClick={() => navigate("/catatan")}
                className="w-full min-h-12 px-6 rounded-full bg-bg-surface text-primary-700 hover:bg-bg-base font-semibold text-sm md:text-base transition-colors shadow-[var(--shadow-card)] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Buka Formulir Lengkap</span>
                <IconArrowUpRight className="text-lg" aria-hidden="true" />
              </motion.button>
            </section>

            {/* Special Activity Highlight Card */}
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => navigate("/kegiatan-khusus/nuzulul-quran")}
              className="w-full text-left bg-accent-50 border border-accent-200 hover:border-accent-300 rounded-2xl p-4 md:p-5 flex items-center justify-between gap-3 shadow-[var(--shadow-card)] transition-colors cursor-pointer min-h-[76px]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-accent-500 text-on-primary flex items-center justify-center text-xl shrink-0">
                  <IconSparkleFill aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-600 block">
                    Kegiatan Khusus · 17 Ramadan
                  </span>
                  <h3 className="font-display text-base md:text-lg font-bold text-accent-800 leading-snug">
                    Nuzulul Qur&apos;an
                  </h3>
                  <p className="text-xs md:text-sm text-accent-700 mt-0.5 truncate">
                    Panduan tadarus &amp; kajian malam ke-17
                  </p>
                </div>
              </div>

              <span className="w-10 h-10 rounded-full bg-bg-surface border border-accent-200 text-accent-700 flex items-center justify-center shrink-0">
                <IconChevronRight className="text-lg" aria-hidden="true" />
              </span>
            </motion.button>

            {/* BENTO GRID: Kegiatan Hari Ini (6 Cards, clickable popup forms) */}
            <section aria-labelledby="kegiatan-hari-ini-heading" className="space-y-3.5">
              <div className="flex items-center justify-between px-0.5 select-none">
                <div>
                  <h2
                    id="kegiatan-hari-ini-heading"
                    className="font-display text-lg md:text-xl font-bold text-text-main"
                  >
                    Kegiatan harian
                  </h2>
                  <p className="text-xs text-text-muted">
                    Ketuk kartu untuk langsung mengisi catatan
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/kegiatan-khusus")}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 min-h-12 px-2 -mr-2 inline-flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span>Kegiatan khusus</span>
                  <IconChevronRight className="text-sm" aria-hidden="true" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {bentoActivities.map((item, idx) => {
                  const Icon = item.icon;
                  const isDone = item.status === "sudah";
                  const isHalangan = item.status === "berhalangan";

                  return (
                    <motion.button
                      key={item.id}
                      custom={idx}
                      variants={listItem}
                      initial="initial"
                      animate="animate"
                      whileTap={tapScale}
                      type="button"
                      onClick={() => openActivityModal(item.id)}
                      className={`${item.spanClass} text-left bg-bg-surface border rounded-[1.5rem] p-4 flex flex-col justify-between gap-3.5 shadow-[var(--shadow-card)] transition-colors cursor-pointer select-none min-h-[124px] ${
                        isDone
                          ? "border-success-200 hover:border-success-600/50"
                          : isHalangan
                          ? "border-accent-200 hover:border-accent-400"
                          : "border-border hover:border-primary-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 w-full">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                            isDone
                              ? "bg-success-50 text-success-600"
                              : isHalangan
                              ? "bg-accent-50 text-accent-600"
                              : "bg-primary-50 text-primary-600"
                          }`}
                        >
                          <Icon aria-hidden="true" />
                        </div>

                        {!item.hideStatusPill ? (
                          isDone ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-success-50 text-success-700 border border-success-200">
                              <IconCheckBold className="text-[10px]" aria-hidden="true" />
                              <span>Sudah</span>
                            </span>
                          ) : isHalangan ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-accent-50 text-accent-700 border border-accent-200">
                              <IconMinus className="text-[10px]" aria-hidden="true" />
                              <span>Halangan</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-bg-elevated text-text-muted border border-border">
                              <IconCircle className="text-[10px]" aria-hidden="true" />
                              <span>Isi</span>
                            </span>
                          )
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-bg-base text-text-muted border border-border-subtle">
                            Catatan
                          </span>
                        )}
                      </div>

                      <div className="space-y-0.5 min-w-0 w-full">
                        <h3 className="font-display text-base font-bold text-text-main leading-tight truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-text-muted line-clamp-2 leading-snug">
                          {item.subtitle}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* Mobile Jadwal Sholat (GPS) */}
            <div className="lg:hidden">
              <PrayerScheduleCard
                prayerState={prayerState}
                countdown={countdown}
                locationStatus={locationStatus}
                onRequestLocation={() => handleRequestLocation(true)}
              />
            </div>
          </div>

          {/* Desktop Companion Column */}
          <aside className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-5">
            {/* Widget 1: Jadwal Sholat (GPS + Countdown) */}
            <PrayerScheduleCard
              prayerState={prayerState}
              countdown={countdown}
              locationStatus={locationStatus}
              onRequestLocation={() => handleRequestLocation(true)}
            />

            {/* Widget 2: Pintasan Tanya */}
            <div className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-3.5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-primary-50 border border-primary-200 text-primary-600 flex items-center justify-center text-xl shrink-0">
                  <IconChat aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-text-main">
                    Tanya
                  </h3>
                  <p className="text-xs text-text-muted">
                    Cari rujukan awal kegiatan Ramadan
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/chat")}
                  className="w-full min-h-12 text-left px-3.5 py-2.5 rounded-2xl bg-bg-base hover:bg-bg-elevated border border-border-subtle text-xs text-text-main transition-colors cursor-pointer flex items-center gap-2"
                >
                  <IconQuestion
                    className="text-primary-600 text-base shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">
                    Syarat air untuk berwudhu dan dalilnya
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/chat")}
                  className="w-full min-h-12 text-left px-3.5 py-2.5 rounded-2xl bg-bg-base hover:bg-bg-elevated border border-border-subtle text-xs text-text-main transition-colors cursor-pointer flex items-center gap-2"
                >
                  <IconSparkleFill
                    className="text-accent-500 text-base shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">
                    Amalan pada malam Nuzulul Qur&apos;an
                  </span>
                </button>
              </div>

              <p className="text-[11px] text-text-muted leading-relaxed">
                Jawaban di fitur Tanya dapat keliru. Untuk persoalan hukum agama,
                tanyakan langsung kepada guru atau orang tua.
              </p>

              <motion.button
                whileTap={tapScale}
                type="button"
                onClick={() => navigate("/chat")}
                className="w-full min-h-12 px-4 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <IconChat className="text-base text-primary-600" aria-hidden="true" />
                <span>Buka Halaman Tanya</span>
              </motion.button>
            </div>

            {/* Widget 3: Mutiara Ramadan */}
            <div className="bg-accent-50 border border-accent-200 rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent-700 uppercase tracking-wider">
                <IconBookOpenText
                  className="text-base text-accent-500"
                  aria-hidden="true"
                />
                <span>Mutiara Ramadan</span>
              </div>
              <p className="text-sm text-accent-800 leading-relaxed italic">
                &ldquo;Barangsiapa yang berpuasa Ramadan karena iman dan mengharap
                pahala dari Allah, maka diampuni dosa-dosanya yang telah lalu.&rdquo;
              </p>
              <span className="text-xs text-accent-600 font-semibold">
                HR. Bukhari no. 38 &amp; Muslim no. 760
              </span>
            </div>
          </aside>
        </div>
      </main>

      {/* Responsive Popup / BottomSheet for Bento Grid Activity Forms */}
      <BottomSheet
        isOpen={Boolean(activeModal)}
        onClose={() => setActiveModal(null)}
        title={modalTitleMap[activeModal] || "Catat Kegiatan"}
        subtitle="Selasa, 24 Feb 2027 · 16 Ramadan 1448 H"
        maxWidthClass="sm:max-w-xl"
      >
        <div className="space-y-5">
          {activeModal === "shaum" && (
            <ShaumForm value={draftShaum} onChange={setDraftShaum} />
          )}
          {activeModal === "sholat" && (
            <SholatWajibForm
              prayersValue={draftPrayers}
              onChangePrayers={setDraftPrayers}
              sunnahValue={draftSunnah}
              onChangeSunnah={setDraftSunnah}
              includeSunnahSection
            />
          )}
          {activeModal === "sunnah" && (
            <SholatSunnahForm value={draftSunnah} onChange={setDraftSunnah} />
          )}
          {activeModal === "tadarus" && (
            <TadarusForm value={draftTadarus} onChange={setDraftTadarus} />
          )}
          {activeModal === "infaq" && (
            <InfaqForm value={draftInfaq} onChange={setDraftInfaq} />
          )}
          {activeModal === "ceramah" && (
            <CeramahForm value={draftCeramah} onChange={setDraftCeramah} />
          )}

          <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 border-t border-border-subtle">
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full sm:w-auto min-h-12 px-5 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main text-sm font-semibold transition-colors cursor-pointer"
            >
              Batal
            </motion.button>
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={handleSaveModal}
              className="w-full sm:w-auto min-h-12 px-6 rounded-full bg-primary-600 hover:bg-primary-700 text-on-primary text-sm font-semibold shadow-[var(--shadow-card)] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <IconCheckBold className="text-base" aria-hidden="true" />
              <span>Simpan Catatan</span>
            </motion.button>
          </div>
        </div>
      </BottomSheet>
    </AppLayout>
  );
}
