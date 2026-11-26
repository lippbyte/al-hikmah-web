import { motion } from "motion/react";
import { tapScale } from "../../lib/motion";
import {
  IconPrayerTime,
  IconClock,
  IconMapPin,
  IconCrosshair,
} from "../../lib/icons";

export default function PrayerScheduleCard({
  prayerState,
  countdown,
  locationStatus,
  onRequestLocation,
}) {
  const isDenied = locationStatus === "denied";
  const isRequesting = locationStatus === "requesting";
  const isGranted = locationStatus === "granted";

  return (
    <section
      aria-label="Jadwal Sholat berdasarkan lokasi GPS"
      className="bg-bg-surface border border-border rounded-[1.5rem] p-5 shadow-[var(--shadow-card)] flex flex-col gap-3.5"
    >
      <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-border-subtle">
        <div className="flex items-center gap-2 min-w-0">
          <IconPrayerTime
            className="text-primary-600 text-xl shrink-0"
            aria-hidden="true"
          />
          <h3 className="font-display text-base font-bold text-text-main">
            Jadwal Sholat
          </h3>
        </div>

        <span className="inline-flex items-center gap-1 text-[11px] text-text-muted font-medium text-right">
          <IconMapPin
            className={`text-xs shrink-0 ${
              isGranted ? "text-success-600" : "text-text-muted"
            }`}
            aria-hidden="true"
          />
          <span>{prayerState.locationLabel}</span>
        </span>
      </div>

      {/* Prompt / Permission Bar when GPS is not yet granted or denied */}
      {!isGranted && (
        <div className="p-3 rounded-2xl bg-accent-50 border border-accent-200 flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-stretch xl:items-center justify-between gap-2.5">
          <p className="text-xs text-accent-800 leading-snug">
            {isDenied
              ? "Izin lokasi GPS ditolak browser. Aktifkan izin lokasi pada pengaturan situs lalu coba lagi."
              : "Izinkan akses lokasi GPS agar jadwal sholat menyesuaikan daerahmu."}
          </p>
          <motion.button
            whileTap={tapScale}
            type="button"
            disabled={isRequesting}
            onClick={onRequestLocation}
            className="min-h-10 px-3.5 rounded-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-on-primary text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-colors"
          >
            <IconCrosshair className="text-sm shrink-0" aria-hidden="true" />
            <span>
              {isRequesting
                ? "Mencari GPS..."
                : isDenied
                ? "Coba Lagi"
                : "Izinkan GPS"}
            </span>
          </motion.button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {prayerState.schedule.map((p) => {
          const isNext = p.id === countdown.nextId;
          return (
            <div
              key={p.id}
              className={`p-2.5 rounded-2xl border text-center transition-colors ${
                isNext
                  ? "bg-primary-50 border-primary-200 text-primary-700"
                  : "bg-bg-base border-border-subtle text-text-main"
              }`}
            >
              <div className="text-[11px] text-text-muted font-medium">
                {p.name}
              </div>
              <div className="text-sm font-bold mt-0.5">{p.time}</div>
            </div>
          );
        })}
      </div>

      {/* Countdown & Refresh Location Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700">
          <IconClock className="text-sm shrink-0" aria-hidden="true" />
          <span>{countdown.text}</span>
        </span>

        {isGranted && (
          <button
            type="button"
            onClick={onRequestLocation}
            disabled={isRequesting}
            className="text-[11px] font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 cursor-pointer"
          >
            <IconCrosshair className="text-xs" aria-hidden="true" />
            <span>{isRequesting ? "Memperbarui..." : "Perbarui GPS"}</span>
          </button>
        )}
      </div>

      <p className="text-[11px] text-text-muted -mt-2">{prayerState.source}</p>
    </section>
  );
}
