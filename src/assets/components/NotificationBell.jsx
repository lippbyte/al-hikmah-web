import { useState } from "react";
import { motion } from "motion/react";
import BottomSheet from "./BottomSheet";
import { useAppData } from "../../context/appDataStore";
import { tapScale } from "../../lib/motion";
import {
  IconBell,
  IconBellRinging,
  IconChecks,
  IconClock,
  IconWave,
} from "../../lib/icons";

export default function NotificationBell({ targetRole = "siswa" }) {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markNotificationRead, markAllNotificationsRead } =
    useAppData();

  const roleNotifs = notifications.filter((n) => n.targetRole === targetRole);
  const unreadCount = roleNotifs.filter((n) => !n.read).length;

  return (
    <>
      <motion.button
        whileTap={tapScale}
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative w-12 h-12 rounded-2xl border border-border bg-bg-surface hover:bg-bg-elevated text-text-main flex items-center justify-center shadow-[var(--shadow-card)] transition-colors cursor-pointer shrink-0"
        aria-label={
          unreadCount > 0
            ? `Buka notifikasi (${unreadCount} belum dibaca)`
            : "Buka notifikasi"
        }
        title="Notifikasi"
      >
        {unreadCount > 0 ? (
          <IconBellRinging
            className="text-xl text-primary-600"
            aria-hidden="true"
          />
        ) : (
          <IconBell className="text-xl text-text-muted" aria-hidden="true" />
        )}

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary-600 text-on-primary text-[11px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </motion.button>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Notifikasi"
        subtitle={
          targetRole === "orang-tua"
            ? "Pemberitahuan otomatis saat ananda mengisi catatan."
            : "Sapaan hangat dan pengingat dari wali kelas."
        }
        maxWidthClass="sm:max-w-md"
      >
        <div className="space-y-4">
          {unreadCount > 0 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => markAllNotificationsRead(targetRole)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 min-h-10 px-3 rounded-full hover:bg-primary-50 transition-colors cursor-pointer"
              >
                <IconChecks className="text-sm" aria-hidden="true" />
                <span>Tandai semua dibaca</span>
              </button>
            </div>
          )}

          {roleNotifs.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <IconBell
                className="text-3xl text-text-muted mx-auto"
                aria-hidden="true"
              />
              <p className="text-sm text-text-muted">
                Belum ada notifikasi baru saat ini.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {roleNotifs.map((notif) => (
                <button
                  key={notif.id}
                  type="button"
                  onClick={() => markNotificationRead(notif.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-colors cursor-pointer space-y-1.5 ${
                    notif.read
                      ? "bg-bg-base/60 border-border-subtle"
                      : "bg-primary-50/70 border-primary-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-text-main">
                      <IconWave
                        className="text-sm text-primary-600 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{notif.title}</span>
                    </span>
                    {!notif.read && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary-600 text-on-primary shrink-0">
                        Baru
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-text-main leading-relaxed">
                    {notif.message}
                  </p>

                  <div className="inline-flex items-center gap-1 text-[11px] text-text-muted">
                    <IconClock className="text-xs" aria-hidden="true" />
                    <span>{notif.timestamp}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
}
