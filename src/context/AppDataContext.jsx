import { useState, useEffect, useCallback } from "react";
import { AppDataContext } from "./appDataStore";
import {
  DEFAULT_DAILY_LOG,
  INITIAL_KEGIATAN_KHUSUS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PARENT_WEEK_DAYS,
} from "../data/demoData";
import { getSurahByNumber } from "../services/quranService";

const STORAGE_KEYS = {
  dailyLog: "al-hikmah-daily-log-v2",
  kegiatanKhusus: "al-hikmah-kegiatan-khusus-v2",
  notifications: "al-hikmah-notifications-v2",
  parentDays: "al-hikmah-parent-days-v2",
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function formatNowWib() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  return `${h}:${m} WIB`;
}

function summarizeDailyLogForParent(log) {
  const shaumMap = {
    berpuasa: "Berpuasa",
    tidak_berpuasa: "Tidak Berpuasa",
    berhalangan: "Berhalangan",
  };
  const prayers = Object.values(log.sholatWajib || {});
  const doneCount = prayers.filter((p) => p.status === "sudah").length;
  const jamaahCount = prayers.filter(
    (p) => p.status === "sudah" && p.pelaksanaan === "berjamaah"
  ).length;
  const sunnahLabels = [];
  if (log.sholatSunnah?.tarawih) sunnahLabels.push("Tarawih");
  if (log.sholatSunnah?.dhuha) sunnahLabels.push("Dhuha");
  if (log.sholatSunnah?.qoblaBada) sunnahLabels.push("Qobla & Ba'da");

  const surah = getSurahByNumber(log.tadarus?.surahNumber || 2);
  const tadarusText =
    log.tadarus?.surahNumber && log.tadarus?.ayatEnd
      ? `QS. ${surah.name} · Ayat ${log.tadarus.ayatStart}–${log.tadarus.ayatEnd} (Juz ${log.tadarus.juz || surah.startJuz})`
      : "Belum diisi";

  const mediaLabels = {
    masjid: "Langsung di Masjid",
    rumah: "Di Rumah",
    internet: "Lewat Internet",
  };

  return {
    shaum: shaumMap[log.shaum] || "Belum diisi",
    sholatWajib:
      doneCount > 0
        ? `${doneCount}/5 waktu tercatat (${jamaahCount} berjamaah)`
        : "Belum diisi",
    sholatSunnah: sunnahLabels.length > 0 ? sunnahLabels.join(", ") : "Belum diisi",
    tadarus: tadarusText,
    infaq: log.infaq?.keterangan?.trim() || "Belum ada keterangan",
    ceramah: log.ceramah?.judul?.trim()
      ? `${log.ceramah.judul} · ${mediaLabels[log.ceramah.media] || "Masjid"}`
      : "Belum diisi",
  };
}

export function AppDataProvider({ children }) {
  const [dailyLog, setDailyLog] = useState(() =>
    readStorage(STORAGE_KEYS.dailyLog, DEFAULT_DAILY_LOG)
  );
  const [kegiatanKhusus, setKegiatanKhusus] = useState(() =>
    readStorage(STORAGE_KEYS.kegiatanKhusus, INITIAL_KEGIATAN_KHUSUS)
  );
  const [notifications, setNotifications] = useState(() =>
    readStorage(STORAGE_KEYS.notifications, INITIAL_NOTIFICATIONS)
  );
  const [parentWeekDays, setParentWeekDays] = useState(() =>
    readStorage(STORAGE_KEYS.parentDays, INITIAL_PARENT_WEEK_DAYS)
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.dailyLog, JSON.stringify(dailyLog));
    } catch {
      // ignore
    }
  }, [dailyLog]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.kegiatanKhusus,
        JSON.stringify(kegiatanKhusus)
      );
    } catch {
      // ignore
    }
  }, [kegiatanKhusus]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.notifications,
        JSON.stringify(notifications)
      );
    } catch {
      // ignore
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.parentDays,
        JSON.stringify(parentWeekDays)
      );
    } catch {
      // ignore
    }
  }, [parentWeekDays]);

  const pushNotification = useCallback((notif) => {
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: `Hari ini · ${formatNowWib()}`,
        read: false,
        ...notif,
      },
      ...prev,
    ]);
  }, []);

  const updateDailyLogSection = useCallback(
    (sectionPatch, activityLabel, summaryNote) => {
      const nowTime = formatNowWib();
      setDailyLog((prev) => {
        const nextLog = {
          ...prev,
          ...sectionPatch,
          updatedAt: nowTime,
        };

        // Sync latest day (H14) summary for parent preview
        setParentWeekDays((daysPrev) =>
          daysPrev.map((d) =>
            d.day === 14
              ? {
                  ...d,
                  status: "terisi",
                  summary: summarizeDailyLogForParent(nextLog),
                }
              : d
          )
        );

        return nextLog;
      });

      pushNotification({
        targetRole: "orang-tua",
        studentId: "rafi-contoh",
        studentName: "Rafi Pratama (Demo)",
        title: `Siswa mengisi ${activityLabel}`,
        message:
          summaryNote ||
          `Rafi Pratama (Demo) baru saja memperbarui catatan ${activityLabel} pada pukul ${nowTime}.`,
      });
    },
    [pushNotification]
  );

  const sendTeacherGreeting = useCallback(
    (student) => {
      pushNotification({
        targetRole: "siswa",
        studentId: student.id,
        studentName: student.name,
        title: "Sapaan dari Wali Kelas",
        message: `Assalamu'alaikum ${student.name}, wali kelas menyapamu hari ini. Semoga sehat selalu dan tetap semangat mencatat kegiatan Ramadan.`,
      });
    },
    [pushNotification]
  );

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback((targetRole) => {
    setNotifications((prev) =>
      prev.map((n) => (n.targetRole === targetRole ? { ...n, read: true } : n))
    );
  }, []);

  const confirmParentDay = useCallback((dayNumber) => {
    const nowTime = `Hari ini · ${formatNowWib()}`;
    setParentWeekDays((prev) =>
      prev.map((d) =>
        d.day === dayNumber
          ? { ...d, confirmed: true, confirmedAt: nowTime }
          : d
      )
    );
  }, []);

  const saveKegiatanKhususResponse = useCallback(
    (kegiatanId, status, responses) => {
      const nowTime = formatNowWib();
      let targetTitle = "Kegiatan Khusus";

      setKegiatanKhusus((prev) =>
        prev.map((item) => {
          if (item.id === kegiatanId) {
            targetTitle = item.title;
            return {
              ...item,
              status,
              responses,
              savedAt: `Hari ini, ${nowTime}`,
            };
          }
          return item;
        })
      );

      pushNotification({
        targetRole: "orang-tua",
        studentId: "rafi-contoh",
        studentName: "Rafi Pratama (Demo)",
        title: `Catatan ${targetTitle} Diperbarui`,
        message: `Rafi Pratama (Demo) memperbarui keikutsertaan ${targetTitle} pada pukul ${nowTime}.`,
      });
    },
    [pushNotification]
  );

  const addKegiatanKhususItem = useCallback((newItem) => {
    setKegiatanKhusus((prev) => [
      {
        id: `khusus-${Date.now()}`,
        status: "belum",
        responses: {},
        savedAt: null,
        fields: [
          {
            id: "kehadiran",
            type: "attendance",
            label: "Kehadiran Kegiatan",
            required: true,
          },
        ],
        ...newItem,
      },
      ...prev,
    ]);
  }, []);

  const addFieldToKegiatan = useCallback((kegiatanId, field) => {
    setKegiatanKhusus((prev) =>
      prev.map((item) =>
        item.id === kegiatanId
          ? {
              ...item,
              fields: [
                ...(item.fields || []),
                {
                  id: `field-${Date.now()}`,
                  ...field,
                },
              ],
            }
          : item
      )
    );
  }, []);

  const removeFieldFromKegiatan = useCallback((kegiatanId, fieldId) => {
    setKegiatanKhusus((prev) =>
      prev.map((item) =>
        item.id === kegiatanId
          ? {
              ...item,
              fields: (item.fields || []).filter((f) => f.id !== fieldId),
            }
          : item
      )
    );
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        dailyLog,
        updateDailyLogSection,
        kegiatanKhusus,
        saveKegiatanKhususResponse,
        addKegiatanKhususItem,
        addFieldToKegiatan,
        removeFieldFromKegiatan,
        notifications,
        sendTeacherGreeting,
        markNotificationRead,
        markAllNotificationsRead,
        parentWeekDays,
        confirmParentDay,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}
