// Service Jadwal Sholat berbasis GPS perangkat (Kemenag RI: Subuh 20°, Isya 18°, Ashar Syafi'i)
// serta siap disambungkan ke endpoint API backend (env: VITE_API_BASE_URL).

export const DEFAULT_PRAYER_SCHEDULE = [
  { id: "imsak", name: "Imsak", time: "04:32" },
  { id: "subuh", name: "Subuh", time: "04:42" },
  { id: "dzuhur", name: "Dzuhur", time: "12:05" },
  { id: "ashar", name: "Ashar", time: "15:15" },
  { id: "maghrib", name: "Maghrib", time: "18:12" },
  { id: "isya", name: "Isya", time: "19:22" },
];

const GPS_STORAGE_KEY = "al-hikmah-gps-coords";

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

function fixAngle(a) {
  return a - 360 * Math.floor(a / 360);
}

function fixHour(a) {
  return a - 24 * Math.floor(a / 24);
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function julianDate(year, month, day) {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    B -
    1524.5
  );
}

function sunPosition(jd) {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(
    q + 1.915 * Math.sin(g * D2R) + 0.02 * Math.sin(2 * g * D2R)
  );
  const e = 23.439 - 0.00000036 * D;
  const ra =
    Math.atan2(Math.cos(e * D2R) * Math.sin(L * D2R), Math.cos(L * D2R)) *
    R2D;
  const eqt = q / 15 - fixHour(ra / 15);
  const decl = Math.asin(Math.sin(e * D2R) * Math.sin(L * D2R)) * R2D;
  return { decl, eqt };
}

function hourAngle(lat, decl, angleDeg) {
  const num =
    -Math.sin(angleDeg * D2R) - Math.sin(lat * D2R) * Math.sin(decl * D2R);
  const den = Math.cos(lat * D2R) * Math.cos(decl * D2R);
  return (Math.acos(clamp(num / den, -1, 1)) * R2D) / 15;
}

function asrHourAngle(lat, decl, factor = 1) {
  const diff = Math.abs(lat - decl);
  const altDeg = Math.atan(1 / (factor + Math.tan(diff * D2R))) * R2D;
  const num =
    Math.sin(altDeg * D2R) - Math.sin(lat * D2R) * Math.sin(decl * D2R);
  const den = Math.cos(lat * D2R) * Math.cos(decl * D2R);
  return (Math.acos(clamp(num / den, -1, 1)) * R2D) / 15;
}

function formatHoursToHHMM(hoursFloat) {
  const totalMinutes = Math.round(fixHour(hoursFloat) * 60) % (24 * 60);
  const hh = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const mm = String(totalMinutes % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function getLocalTimezoneLabel(date = new Date()) {
  const offsetHours = -date.getTimezoneOffset() / 60;
  if (offsetHours === 7) return "WIB";
  if (offsetHours === 8) return "WITA";
  if (offsetHours === 9) return "WIT";
  const sign = offsetHours >= 0 ? "+" : "";
  return `UTC${sign}${offsetHours}`;
}

export function calculatePrayerTimesFromCoords(
  latitude,
  longitude,
  date = new Date()
) {
  const jd = julianDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  const { decl, eqt } = sunPosition(jd);
  const tzHours = -date.getTimezoneOffset() / 60;
  const transit = 12 + tzHours - longitude / 15 - eqt;

  // Parameter standar Kemenag RI (Subuh 20°, Isya 18°, Ashar Syafi'i) + 2 menit ihtiyat
  const ihtiyat = 2 / 60;
  const subuh = transit - hourAngle(latitude, decl, 20) + ihtiyat;
  const imsak = subuh - 10 / 60;
  const dzuhur = transit + ihtiyat;
  const ashar = transit + asrHourAngle(latitude, decl, 1) + ihtiyat;
  const maghrib = transit + hourAngle(latitude, decl, 0.833) + ihtiyat;
  const isya = transit + hourAngle(latitude, decl, 18) + ihtiyat;

  return [
    { id: "imsak", name: "Imsak", time: formatHoursToHHMM(imsak) },
    { id: "subuh", name: "Subuh", time: formatHoursToHHMM(subuh) },
    { id: "dzuhur", name: "Dzuhur", time: formatHoursToHHMM(dzuhur) },
    { id: "ashar", name: "Ashar", time: formatHoursToHHMM(ashar) },
    { id: "maghrib", name: "Maghrib", time: formatHoursToHHMM(maghrib) },
    { id: "isya", name: "Isya", time: formatHoursToHHMM(isya) },
  ];
}

export function formatCoordsLabel(latitude, longitude, date = new Date()) {
  const latHem = latitude >= 0 ? "LU" : "LS";
  const lonHem = longitude >= 0 ? "BT" : "BB";
  const tz = getLocalTimezoneLabel(date);
  return `${Math.abs(latitude).toFixed(2)}°${latHem}, ${Math.abs(longitude).toFixed(
    2
  )}°${lonHem} (${tz})`;
}

export function loadCachedGpsCoords() {
  try {
    const raw = localStorage.getItem(GPS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.latitude === "number" &&
      typeof parsed?.longitude === "number"
    ) {
      return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return null;
}

export function saveCachedGpsCoords(coords) {
  try {
    localStorage.setItem(GPS_STORAGE_KEY, JSON.stringify(coords));
  } catch {
    // ignore storage errors
  }
}

export function requestBrowserGps() {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("UNSUPPORTED"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        saveCachedGpsCoords(coords);
        resolve(coords);
      },
      (err) => {
        reject(err);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
}

export async function fetchPrayerScheduleByCoords(coords) {
  const apiBase = import.meta.env.VITE_API_BASE_URL;
  if (apiBase && coords) {
    try {
      const response = await fetch(
        `${apiBase}/prayer-times/today?lat=${coords.latitude}&lng=${coords.longitude}`
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data?.schedule) && data.schedule.length > 0) {
          return {
            schedule: data.schedule,
            source: data.source || "API Jadwal Sholat · GPS aktif",
            locationLabel:
              data.city || formatCoordsLabel(coords.latitude, coords.longitude),
          };
        }
      }
    } catch {
      // Fallback to local solar calculation for the GPS coordinates
    }
  }

  if (coords) {
    return {
      schedule: calculatePrayerTimesFromCoords(
        coords.latitude,
        coords.longitude,
        new Date()
      ),
      source: "Sesuai lokasi GPS perangkat · standar Kemenag RI",
      locationLabel: formatCoordsLabel(coords.latitude, coords.longitude),
    };
  }

  return {
    schedule: DEFAULT_PRAYER_SCHEDULE,
    source: "Jadwal contoh · aktifkan izin lokasi GPS untuk akurasi setempat",
    locationLabel: `Lokasi belum aktif (${getLocalTimezoneLabel()})`,
  };
}

function parseMinutes(timeStr) {
  const [hh, mm] = String(timeStr || "00:00")
    .split(":")
    .map((v) => Number(v));
  return hh * 60 + mm;
}

export function getNextPrayerCountdown(
  schedule = DEFAULT_PRAYER_SCHEDULE,
  now = new Date()
) {
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
