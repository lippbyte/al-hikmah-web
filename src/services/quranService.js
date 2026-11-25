// Service adapter untuk data Al-Qur'an (114 surah, 30 juz, ayat).
// Saat backend SDD tersedia, otomatis dapat mengambil dari endpoint API backend.

import {
  QURAN_JUZ_LIST,
  QURAN_SURAHS,
  getSurahByNumber,
  getSurahsByJuz,
} from "../data/quranMeta";

export async function fetchQuranSurahs() {
  const apiBase = import.meta.env.VITE_API_BASE_URL;
  if (apiBase) {
    try {
      const response = await fetch(`${apiBase}/quran/surahs`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data?.surahs) && data.surahs.length > 0) {
          return data.surahs;
        }
      }
    } catch {
      // Fallback to complete bundled 114-surah dataset
    }
  }
  return QURAN_SURAHS;
}

export { QURAN_JUZ_LIST, QURAN_SURAHS, getSurahByNumber, getSurahsByJuz };
