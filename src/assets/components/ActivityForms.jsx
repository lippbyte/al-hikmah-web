import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { PRAYERS_META, SHOLAT_SUNNAH_OPTIONS } from "../../data/demoData";
import {
  QURAN_JUZ_LIST,
  fetchQuranSurahs,
  getSurahByNumber,
  getSurahsByJuz,
} from "../../services/quranService";
import { statusCheck, tapScale } from "../../lib/motion";
import {
  IconCheckBold,
  IconCircle,
  IconMinus,
  IconMosque,
  IconHome,
  IconInternet,
  IconInfo,
  IconChevronDown,
} from "../../lib/icons";

const SHAUM_OPTIONS = [
  { id: "berpuasa", label: "Berpuasa", icon: IconCheckBold },
  { id: "tidak_berpuasa", label: "Tidak Berpuasa", icon: IconCircle },
  { id: "berhalangan", label: "Berhalangan", icon: IconMinus },
];

const WAKTU_OPTIONS = [
  { id: "awal_waktu", label: "Awal Waktu" },
  { id: "tepat_waktu", label: "Tepat Waktu" },
  { id: "qadha", label: "Qadha" },
];

const PELAKSANAAN_OPTIONS = [
  { id: "berjamaah", label: "Berjamaah" },
  { id: "munfarid", label: "Munfarid" },
];

const MEDIA_OPTIONS = [
  { id: "masjid", label: "Langsung di Masjid", icon: IconMosque },
  { id: "rumah", label: "Di Rumah", icon: IconHome },
  { id: "internet", label: "Lewat Internet", icon: IconInternet },
];

export function ShaumForm({ value, onChange }) {
  return (
    <div className="space-y-3">
      <div
        role="radiogroup"
        aria-label="Status shaum hari ini"
        className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
      >
        {SHAUM_OPTIONS.map((opt) => {
          const isSelected = value === opt.id;
          const Icon = opt.icon;

          let activeStyle =
            "bg-bg-surface text-text-main border-border shadow-[var(--shadow-card)]";
          if (isSelected && opt.id === "berpuasa") {
            activeStyle =
              "bg-success-600 text-on-primary border-success-600";
          } else if (isSelected && opt.id === "berhalangan") {
            activeStyle =
              "bg-accent-100 text-accent-800 border-accent-300";
          }

          return (
            <motion.button
              key={opt.id}
              whileTap={tapScale}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt.id)}
              className={`min-h-12 px-3.5 py-2.5 rounded-2xl border text-xs md:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                isSelected
                  ? activeStyle
                  : "bg-bg-base text-text-muted border-border-subtle hover:text-text-main hover:bg-bg-elevated/70"
              }`}
            >
              {isSelected && opt.id === "berpuasa" ? (
                <motion.span {...statusCheck} className="inline-flex">
                  <Icon className="text-sm shrink-0" aria-hidden="true" />
                </motion.span>
              ) : (
                <Icon className="text-sm shrink-0" aria-hidden="true" />
              )}
              <span>{opt.label}</span>
            </motion.button>
          );
        })}
      </div>

      {value === "berhalangan" && (
        <p className="text-xs text-accent-800 bg-accent-50 border border-accent-200 rounded-2xl px-3.5 py-2.5 flex items-start gap-2">
          <IconInfo className="text-base text-accent-600 shrink-0 mt-0.5" aria-hidden="true" />
          <span>Alasan berhalangan tidak diminta dan tidak terlihat siswa lain.</span>
        </p>
      )}
    </div>
  );
}

export function SholatWajibForm({
  prayersValue,
  onChangePrayers,
  sunnahValue,
  onChangeSunnah,
  includeSunnahSection = true,
}) {
  const handleSelectWaktu = (prayerId, waktuId) => {
    const prev = prayersValue[prayerId] || {};
    onChangePrayers({
      ...prayersValue,
      [prayerId]: {
        status: "sudah",
        waktu: waktuId,
        pelaksanaan: prev.pelaksanaan || "berjamaah",
      },
    });
  };

  const handleSelectPelaksanaan = (prayerId, pelId) => {
    const prev = prayersValue[prayerId] || {};
    onChangePrayers({
      ...prayersValue,
      [prayerId]: {
        status: "sudah",
        waktu: prev.waktu || "awal_waktu",
        pelaksanaan: pelId,
      },
    });
  };

  const handleSetState = (prayerId, stateValue) => {
    onChangePrayers({
      ...prayersValue,
      [prayerId]: {
        status: stateValue,
        waktu: "",
        pelaksanaan: "",
      },
    });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3.5">
        {PRAYERS_META.map((prayer) => {
          const item = prayersValue[prayer.id] || {
            status: "belum",
            waktu: "",
            pelaksanaan: "",
          };
          const isDone = item.status === "sudah";

          return (
            <div
              key={prayer.id}
              className="bg-bg-base/70 border border-border rounded-2xl p-4 space-y-3.5"
            >
              {/* Header Row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base font-bold text-text-main">
                    {prayer.name}
                  </span>
                  <span className="text-xs text-text-muted">{prayer.time}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-success-50 text-success-700 border border-success-200">
                      <IconCheckBold className="text-xs" aria-hidden="true" />
                      <span>Sudah</span>
                    </span>
                  ) : item.status === "berhalangan" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-50 text-accent-700 border border-accent-200">
                      <IconMinus className="text-xs" aria-hidden="true" />
                      <span>Berhalangan</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-bg-surface text-text-muted border border-border">
                      <IconCircle className="text-xs" aria-hidden="true" />
                      <span>Belum</span>
                    </span>
                  )}

                  {item.status !== "belum" && (
                    <button
                      type="button"
                      onClick={() => handleSetState(prayer.id, "belum")}
                      className="text-[11px] font-medium text-text-muted hover:text-text-main px-2 py-1 rounded-full hover:bg-bg-elevated cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                  {item.status !== "berhalangan" && (
                    <button
                      type="button"
                      onClick={() => handleSetState(prayer.id, "berhalangan")}
                      className="text-[11px] font-medium text-accent-700 hover:bg-accent-50 px-2 py-1 rounded-full cursor-pointer"
                    >
                      Berhalangan
                    </button>
                  )}
                </div>
              </div>

              {/* Category 1: Waktu Pelaksanaan */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
                  Waktu Pelaksanaan
                </span>
                <div className="flex flex-wrap gap-2">
                  {WAKTU_OPTIONS.map((w) => {
                    const active = isDone && item.waktu === w.id;
                    return (
                      <motion.button
                        key={w.id}
                        whileTap={tapScale}
                        type="button"
                        onClick={() => handleSelectWaktu(prayer.id, w.id)}
                        className={`min-h-11 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                          active
                            ? "bg-success-600 text-on-primary border-success-600"
                            : "bg-bg-surface text-text-main border-border hover:bg-bg-elevated"
                        }`}
                      >
                        {w.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Category 2: Pelaksanaan */}
              <div className="space-y-1.5 pt-2 border-t border-border-subtle">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted block">
                  Pelaksanaan
                </span>
                <div className="flex flex-wrap gap-2">
                  {PELAKSANAAN_OPTIONS.map((p) => {
                    const active = isDone && item.pelaksanaan === p.id;
                    return (
                      <motion.button
                        key={p.id}
                        whileTap={tapScale}
                        type="button"
                        onClick={() => handleSelectPelaksanaan(prayer.id, p.id)}
                        className={`min-h-11 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                          active
                            ? "bg-primary-600 text-on-primary border-primary-600"
                            : "bg-bg-surface text-text-main border-border hover:bg-bg-elevated"
                        }`}
                      >
                        {p.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Sunnah Prayers inside Sholat Modal */}
      {includeSunnahSection && sunnahValue && onChangeSunnah && (
        <div className="pt-3 border-t border-border-subtle space-y-3">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block">
            Opsi Sholat Sunnah
          </span>
          <SholatSunnahForm value={sunnahValue} onChange={onChangeSunnah} />
        </div>
      )}
    </div>
  );
}

export function SholatSunnahForm({ value, onChange }) {
  const toggleOption = (id) => {
    onChange({
      ...value,
      [id]: !value[id],
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {SHOLAT_SUNNAH_OPTIONS.map((opt) => {
        const checked = Boolean(value?.[opt.id]);
        return (
          <motion.button
            key={opt.id}
            whileTap={tapScale}
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={() => toggleOption(opt.id)}
            className={`min-h-[68px] text-left p-3.5 rounded-2xl border transition-colors cursor-pointer flex items-center justify-between gap-2.5 ${
              checked
                ? "bg-success-50 border-success-200 text-success-800"
                : "bg-bg-base border-border text-text-main hover:bg-bg-elevated"
            }`}
          >
            <div className="min-w-0">
              <span className="text-sm font-semibold block truncate">
                {opt.label}
              </span>
              <span className="text-[11px] text-text-muted block truncate">
                {opt.desc}
              </span>
            </div>

            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                checked
                  ? "bg-success-600 border-success-600 text-on-primary"
                  : "bg-bg-surface border-border text-text-muted"
              }`}
            >
              {checked ? (
                <IconCheckBold className="text-xs" aria-hidden="true" />
              ) : (
                <IconCircle className="text-xs" aria-hidden="true" />
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export function TadarusForm({ value, onChange }) {
  const [surahs, setSurahs] = useState([]);
  const [filterByJuz, setFilterByJuz] = useState(false);

  useEffect(() => {
    let active = true;
    fetchQuranSurahs().then((list) => {
      if (active) setSurahs(list);
    });
    return () => {
      active = false;
    };
  }, []);

  const currentJuz = Number(value?.juz || 1);
  const currentSurahNum = Number(value?.surahNumber || 2);
  const availableSurahs = filterByJuz
    ? getSurahsByJuz(currentJuz)
    : surahs.length > 0
    ? surahs
    : getSurahsByJuz(null);

  const selectedSurah = getSurahByNumber(currentSurahNum);
  const maxAyat = selectedSurah?.ayahs || 286;

  const handleJuzChange = (nextJuz) => {
    const juzNum = Number(nextJuz);
    const matching = getSurahsByJuz(juzNum);
    const firstMatch = matching[0] || selectedSurah;
    onChange({
      ...value,
      juz: juzNum,
      surahNumber: filterByJuz ? firstMatch.number : currentSurahNum,
      ayatStart: 1,
      ayatEnd: Math.min(10, firstMatch.ayahs),
    });
  };

  const handleSurahChange = (nextSurahNum) => {
    const surahObj = getSurahByNumber(nextSurahNum);
    onChange({
      ...value,
      surahNumber: surahObj.number,
      juz: surahObj.startJuz,
      ayatStart: 1,
      ayatEnd: Math.min(20, surahObj.ayahs),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-text-muted">
          Data 114 surah · siap tersambung API Al-Qur&apos;an
        </span>
        <label className="inline-flex items-center gap-1.5 text-xs font-medium text-text-main cursor-pointer">
          <input
            type="checkbox"
            checked={filterByJuz}
            onChange={(e) => setFilterByJuz(e.target.checked)}
            className="accent-primary-600 w-4 h-4"
          />
          <span>Saring sesuai Juz</span>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label
            htmlFor="tadarus-juz"
            className="text-xs font-semibold text-text-main block"
          >
            Juz
          </label>
          <div className="relative">
            <select
              id="tadarus-juz"
              value={currentJuz}
              onChange={(e) => handleJuzChange(e.target.value)}
              className="w-full min-h-12 appearance-none bg-bg-surface border border-border rounded-2xl px-4 pr-10 text-sm font-medium text-text-main focus:border-primary-600 cursor-pointer"
            >
              {QURAN_JUZ_LIST.map((j) => (
                <option key={j} value={j}>
                  Juz {j}
                </option>
              ))}
            </select>
            <IconChevronDown
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-base"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="tadarus-surah"
            className="text-xs font-semibold text-text-main block"
          >
            Pilih Surah
          </label>
          <div className="relative">
            <select
              id="tadarus-surah"
              value={currentSurahNum}
              onChange={(e) => handleSurahChange(e.target.value)}
              className="w-full min-h-12 appearance-none bg-bg-surface border border-border rounded-2xl px-4 pr-10 text-sm font-medium text-text-main focus:border-primary-600 cursor-pointer"
            >
              {availableSurahs.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.number}. {s.name} ({s.ayahs} ayat)
                </option>
              ))}
            </select>
            <IconChevronDown
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-base"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label
            htmlFor="tadarus-ayat-start"
            className="text-xs font-semibold text-text-main block"
          >
            Dari Ayat
          </label>
          <input
            id="tadarus-ayat-start"
            type="number"
            inputMode="numeric"
            min={1}
            max={maxAyat}
            value={value?.ayatStart ?? 1}
            onChange={(e) =>
              onChange({
                ...value,
                ayatStart: Math.max(1, Math.min(maxAyat, Number(e.target.value) || 1)),
              })
            }
            className="w-full min-h-12 px-4 bg-bg-surface border border-border rounded-2xl text-sm font-medium text-text-main focus:border-primary-600"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="tadarus-ayat-end"
            className="text-xs font-semibold text-text-main block"
          >
            Sampai Ayat (maks. {maxAyat})
          </label>
          <input
            id="tadarus-ayat-end"
            type="number"
            inputMode="numeric"
            min={value?.ayatStart || 1}
            max={maxAyat}
            value={value?.ayatEnd ?? 20}
            onChange={(e) =>
              onChange({
                ...value,
                ayatEnd: Math.max(1, Math.min(maxAyat, Number(e.target.value) || 1)),
              })
            }
            className="w-full min-h-12 px-4 bg-bg-surface border border-border rounded-2xl text-sm font-medium text-text-main focus:border-primary-600"
          />
        </div>
      </div>
    </div>
  );
}

export function InfaqForm({ value, onChange }) {
  return (
    <div className="space-y-2.5">
      <label
        htmlFor="infaq-keterangan"
        className="text-xs font-semibold text-text-main block"
      >
        Keterangan Infaq Hari Ini
      </label>
      <input
        id="infaq-keterangan"
        type="text"
        value={value?.keterangan || ""}
        onChange={(e) => onChange({ keterangan: e.target.value })}
        placeholder="Contoh: Hari ini berinfaq di masjid sekolah / Tidak berinfaq hari ini"
        className="w-full min-h-12 px-4 bg-bg-surface border border-border rounded-2xl text-sm text-text-main placeholder:text-text-muted focus:border-primary-600"
      />
      <p className="text-xs text-text-muted leading-relaxed">
        Tidak perlu menyebutkan nominal uang. Cukup tuliskan keterangan apakah
        hari ini berinfaq atau tidak.
      </p>
    </div>
  );
}

export function CeramahForm({ value, onChange }) {
  const data = value || {
    judul: "",
    penceramah: "",
    ringkasan: "",
    media: "masjid",
    keterangan: "",
  };

  const updateField = (key, val) => {
    onChange({
      ...data,
      [key]: val,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label
            htmlFor="ceramah-judul"
            className="text-xs font-semibold text-text-main block"
          >
            Judul Ceramah / Kultum
          </label>
          <input
            id="ceramah-judul"
            type="text"
            value={data.judul}
            onChange={(e) => updateField("judul", e.target.value)}
            placeholder="Contoh: Menjaga Lisan di Bulan Puasa"
            className="w-full min-h-12 px-4 bg-bg-surface border border-border rounded-2xl text-sm text-text-main placeholder:text-text-muted focus:border-primary-600"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="ceramah-penceramah"
            className="text-xs font-semibold text-text-main block"
          >
            Nama Penceramah
          </label>
          <input
            id="ceramah-penceramah"
            type="text"
            value={data.penceramah}
            onChange={(e) => updateField("penceramah", e.target.value)}
            placeholder="Contoh: Pemateri kultum tarawih"
            className="w-full min-h-12 px-4 bg-bg-surface border border-border rounded-2xl text-sm text-text-main placeholder:text-text-muted focus:border-primary-600"
          />
        </div>
      </div>

      {/* Media Pilihan */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-text-main block">
          Media Menyimak
        </span>
        <div
          role="radiogroup"
          aria-label="Media menyimak ceramah"
          className="grid grid-cols-1 sm:grid-cols-3 gap-2"
        >
          {MEDIA_OPTIONS.map((m) => {
            const Icon = m.icon;
            const active = data.media === m.id;
            return (
              <motion.button
                key={m.id}
                whileTap={tapScale}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => updateField("media", m.id)}
                className={`min-h-12 px-3 py-2 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  active
                    ? "bg-primary-600 text-on-primary border-primary-600"
                    : "bg-bg-base text-text-main border-border hover:bg-bg-elevated"
                }`}
              >
                <Icon className="text-base shrink-0" aria-hidden="true" />
                <span>{m.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Ringkasan Ceramah */}
      <div className="space-y-1.5">
        <label
          htmlFor="ceramah-ringkasan"
          className="text-xs font-semibold text-text-main block"
        >
          Ringkasan Ceramah
        </label>
        <textarea
          id="ceramah-ringkasan"
          rows={3}
          value={data.ringkasan}
          onChange={(e) => updateField("ringkasan", e.target.value)}
          placeholder="Tuliskan poin utama yang kamu pahami..."
          className="w-full p-3.5 bg-bg-surface border border-border rounded-2xl text-sm text-text-main placeholder:text-text-muted focus:border-primary-600 resize-y"
        />
        <p className="text-xs text-accent-700 bg-accent-50 border border-accent-200 rounded-xl px-3 py-2">
          Harap tulis dengan jujur berdasarkan pemahamanmu sendiri, bukan asal
          isi.
        </p>
      </div>

      {/* Keterangan Tambahan */}
      <div className="space-y-1.5">
        <label
          htmlFor="ceramah-keterangan"
          className="text-xs font-semibold text-text-main block"
        >
          Keterangan Tambahan (opsional)
        </label>
        <input
          id="ceramah-keterangan"
          type="text"
          value={data.keterangan}
          onChange={(e) => updateField("keterangan", e.target.value)}
          placeholder="Contoh: Disimak bersama keluarga / catatan tambahan"
          className="w-full min-h-12 px-4 bg-bg-surface border border-border rounded-2xl text-sm text-text-main placeholder:text-text-muted focus:border-primary-600"
        />
      </div>
    </div>
  );
}
