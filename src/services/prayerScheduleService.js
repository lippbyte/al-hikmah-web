// Service adapter untuk Jadwal Sholat.
// Siap disambungkan ke endpoint API backend saat SDD selesai (env: VITE_API_BASE_URL).

export const DEFAULT_PRAYER_SCHEDULE = [
  { id: "imsak", name: "Imsak", time: "04:32" },
  { id: "subuh", name: "Subuh", time: "04:42" },
  { id: "dzuhur", name: "Dzuhur", time: "12:05" },
  { id: "ashar", name: "Ashar", time: "15:15" },
  { id: "maghrib", name: "Maghrib", time: "18:12" },
  { id: "isya", name: "Isya", time: "19:22" },
];

export async function fetchPrayerSchedule() {
  const apiBase = import.meta.env.VITE_API_BASE_URL;
  if (apiBase) {
    try {
      const response = await fetch(`${apiBase}/prayer-times/today`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data?.schedule) && data.schedule.length > 0) {
          return {
            schedule: data.schedule,
            source: data.source || "API Jadwal Sholat",
            city: data.city || "Lokasi Sekolah",
          };
        }
      }
    } catch {
      // Fall back silently to local schedule until backend API is active
    }
  }

  return {
    schedule: DEFAULT_PRAYER_SCHEDULE,
    source: "Jadwal contoh · siap dihubungkan ke API",
    city: "Kota Contoh (WIB)",
  };
}

function parseMinutes(timeStr) {
  const [hh, mm] = String(timeStr || "00:00")
    .split(":")
    .map((v) => Number(v));
  return hh * 60 + mm;
}

export function getNextPrayerCountdown(schedule = DEFAULT_PRAYER_SCHEDULE, now = new Date()) {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  let next = schedule.find((item) => parseMinutes(item.time) > nowMinutes);
  let diffMinutes;

  if (next) {
    diffMinutes = parseMinutes(next.time) - nowMinutes;
  } else {
    next = schedule[0];
    diffMinutes = 24 * 60 - nowMinutes + parseMinutes(next.time);
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  let text;
  if (hours > 0 && minutes > 0) {
    text = `${hours} jam ${minutes} menit lagi menuju ${next.name}`;
  } else if (hours > 0) {
    text = `${hours} jam lagi menuju ${next.name}`;
  } else {
    text = `${minutes} menit lagi menuju ${next.name}`;
  }

  return {
    nextId: next.id,
    nextName: next.name,
    nextTime: next.time,
    hours,
    minutes,
    text,
  };
}
