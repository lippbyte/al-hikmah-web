import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useAuth } from "../../context/authStore";
import { ease, tabPillTransition, tapScale } from "../../lib/motion";
import logoAlHikmah from "../images/logo-al-hikmah.png";
import {
  IconHome,
  IconHomeFill,
  IconCalendarDays,
  IconCalendarDaysFill,
  IconChat,
  IconChatFill,
  IconUser,
  IconUserFill,
  IconSparkle,
  IconUsers,
  IconUsersFill,
  IconHeart,
  IconHeartFill,
  IconClipboard,
  IconSwitchRole,
  IconParent,
  IconCollapseLeft,
  IconExpandRight,
} from "../../lib/icons";

const SIDEBAR_TRANSITION = { duration: 0.3, ease };

export default function DesktopSidebar({ isOpen = true, onToggle }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, switchRole } = useAuth();

  const isChatRoute = pathname.startsWith("/chat");
  // Sidebar tetap tersedia di semua rute desktop (termasuk /chat)
  const isCompletelyHidden = false;

  const isTeacherView =
    pathname.startsWith("/guru") ||
    (!pathname.startsWith("/orang-tua") &&
      isChatRoute &&
      currentUser?.role === "guru");
  const isParentView =
    pathname.startsWith("/orang-tua") ||
    (!pathname.startsWith("/guru") &&
      isChatRoute &&
      currentUser?.role === "orang-tua");

  const studentNavItems = [
    {
      id: "hari-ini",
      label: "Hari Ini",
      path: "/",
      icon: IconHome,
      activeIcon: IconHomeFill,
      isActive:
        pathname === "/" ||
        pathname === "/home" ||
        pathname.startsWith("/catatan"),
    },
    {
      id: "ramadan",
      label: "Ramadan",
      path: "/ramadan",
      icon: IconCalendarDays,
      activeIcon: IconCalendarDaysFill,
      isActive: pathname.startsWith("/ramadan"),
    },
    {
      id: "kegiatan-khusus",
      label: "Kegiatan Khusus",
      path: "/kegiatan-khusus",
      icon: IconSparkle,
      activeIcon: IconSparkle,
      isActive: pathname.startsWith("/kegiatan-khusus"),
    },
    {
      id: "tanya",
      label: "Tanya",
      path: "/chat",
      icon: IconChat,
      activeIcon: IconChatFill,
      isActive: isChatRoute,
    },
    {
      id: "profil",
      label: "Profil",
      path: "/profil",
      icon: IconUser,
      activeIcon: IconUserFill,
      isActive: pathname.startsWith("/profil"),
    },
  ];

  const teacherNavItems = [
    {
      id: "kelas",
      label: "Kelas",
      path: "/guru",
      icon: IconUsers,
      activeIcon: IconUsersFill,
      isActive:
        pathname === "/guru" ||
        pathname === "/guru/kelas" ||
        pathname.startsWith("/guru/siswa"),
    },
    {
      id: "perlu-disapa",
      label: "Perlu Disapa",
      path: "/guru/sapa",
      icon: IconHeart,
      activeIcon: IconHeartFill,
      badge: "4",
      isActive: pathname.startsWith("/guru/sapa"),
    },
    {
      id: "rekap",
      label: "Rekap",
      path: "/guru/rekap",
      icon: IconClipboard,
      activeIcon: IconClipboard,
      isActive: pathname.startsWith("/guru/rekap"),
    },
    {
      id: "tanya",
      label: "Tanya",
      path: "/chat",
      icon: IconChat,
      activeIcon: IconChatFill,
      isActive: isChatRoute,
    },
  ];

  const parentNavItems = [
    {
      id: "ringkasan-anak",
      label: "Catatan Anak",
      path: "/orang-tua",
      icon: IconParent,
      activeIcon: IconParent,
      isActive: pathname.startsWith("/orang-tua"),
    },
    {
      id: "tanya",
      label: "Tanya",
      path: "/chat",
      icon: IconChat,
      activeIcon: IconChatFill,
      isActive: isChatRoute,
    },
  ];

  const activeNavItems = isTeacherView
    ? teacherNavItems
    : isParentView
    ? parentNavItems
    : studentNavItems;

  const roleTitle = isTeacherView
    ? "Panel Guru"
    : isParentView
    ? "Wali Siswa"
    : "Siswa";

  const homeTarget = isTeacherView
    ? "/guru"
    : isParentView
    ? "/orang-tua"
    : "/";

  const handleSwitchRole = () => {
    const next = switchRole();
    if (next === "guru") navigate("/guru");
    else if (next === "orang-tua") navigate("/orang-tua");
    else navigate("/");
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCompletelyHidden ? 0 : isOpen ? 268 : 76,
        opacity: isCompletelyHidden ? 0 : 1,
      }}
      transition={SIDEBAR_TRANSITION}
      aria-label="Sidebar utama"
      aria-hidden={isCompletelyHidden || undefined}
      className={`hidden lg:flex flex-col justify-between h-screen sticky top-0 bg-bg-surface shrink-0 z-30 select-none overflow-hidden no-print ${
        isCompletelyHidden
          ? "border-r-0 pointer-events-none"
          : "border-r border-border"
      }`}
    >
      {/* Top Section — fixed horizontal icon alignment so nothing jumps on toggle */}
      <div className="flex flex-col gap-4 p-3 overflow-y-auto overflow-x-hidden scrollbar-none flex-1">
        {/* Brand Row (Logo ALWAYS visible and pixel-steady!) */}
        <button
          type="button"
          onClick={() => navigate(homeTarget)}
          title="Al Hikmah · Beranda"
          className="w-full min-h-12 pl-1.5 pr-2 py-1 rounded-2xl flex items-center gap-3 text-left hover:bg-bg-base transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-bg-base border border-border-subtle overflow-hidden flex items-center justify-center shrink-0 shadow-[var(--shadow-card)]">
            <img
              src={logoAlHikmah}
              alt="Logo Al Hikmah"
              className="w-full h-full object-cover"
            />
          </div>

          <motion.div
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              x: isOpen ? 0 : -8,
            }}
            transition={SIDEBAR_TRANSITION}
            className="overflow-hidden whitespace-nowrap min-w-0"
          >
            <span className="font-display font-bold text-base text-text-main leading-tight block">
              Al Hikmah
            </span>
            <span className="text-[11px] text-text-muted font-medium block mt-0.5">
              Ramadan 1448 H · {roleTitle}
            </span>
          </motion.div>
        </button>

        {/* Smooth Collapse/Expand Toggle (same vertical slot in both states) */}
        <motion.button
          whileTap={tapScale}
          type="button"
          onClick={onToggle}
          className="w-full min-h-11 pl-4 pr-3 rounded-2xl border border-border-subtle bg-bg-base hover:bg-bg-elevated text-text-muted hover:text-text-main flex items-center gap-3 transition-colors cursor-pointer"
          aria-label={isOpen ? "Tutup navigasi samping" : "Buka navigasi samping"}
          title={isOpen ? "Tutup navigasi" : "Buka navigasi"}
        >
          {isOpen ? (
            <IconCollapseLeft
              className="text-lg text-primary-600 shrink-0"
              aria-hidden="true"
            />
          ) : (
            <IconExpandRight
              className="text-lg text-primary-600 shrink-0"
              aria-hidden="true"
            />
          )}
          <motion.span
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              x: isOpen ? 0 : -8,
            }}
            transition={SIDEBAR_TRANSITION}
            className="text-xs font-semibold whitespace-nowrap overflow-hidden"
          >
            Tutup navigasi
          </motion.span>
        </motion.button>

        {/* Navigation Links (identical pl-4 so icons stay perfectly aligned at 76px & 268px) */}
        <nav aria-label="Menu navigasi" className="flex flex-col gap-1.5">
          <motion.div
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              height: isOpen ? 20 : 0,
              marginBottom: isOpen ? 2 : 0,
            }}
            transition={SIDEBAR_TRANSITION}
            className="text-[11px] font-semibold text-text-muted uppercase tracking-wider pl-4 overflow-hidden whitespace-nowrap"
          >
            {isTeacherView
              ? "Menu Guru"
              : isParentView
              ? "Menu Wali Siswa"
              : "Menu Utama"}
          </motion.div>

          {activeNavItems.map((item) => {
            const Icon = item.isActive ? item.activeIcon : item.icon;
            return (
              <motion.button
                key={item.id}
                whileTap={tapScale}
                type="button"
                onClick={() => navigate(item.path)}
                aria-current={item.isActive ? "page" : undefined}
                aria-label={!isOpen ? item.label : undefined}
                title={!isOpen ? item.label : undefined}
                className={`relative w-full min-h-12 pl-4 pr-3 rounded-2xl flex items-center justify-between text-sm transition-colors cursor-pointer ${
                  item.isActive
                    ? "text-primary-700 font-semibold"
                    : "text-text-muted hover:text-text-main hover:bg-bg-base font-medium"
                }`}
              >
                {item.isActive && (
                  <motion.span
                    layoutId="desktop-nav-pill"
                    transition={tabPillTransition}
                    className="absolute inset-0 rounded-2xl bg-primary-100 border border-primary-200/70"
                    aria-hidden="true"
                  />
                )}

                <span className="relative z-10 flex items-center gap-3 min-w-0">
                  <Icon
                    className={`text-xl shrink-0 ${
                      item.isActive ? "text-primary-600" : "text-text-muted"
                    }`}
                    aria-hidden="true"
                  />
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      x: isOpen ? 0 : -8,
                    }}
                    transition={SIDEBAR_TRANSITION}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                </span>

                {item.badge && (
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      scale: isOpen ? 1 : 0.8,
                    }}
                    transition={SIDEBAR_TRANSITION}
                    className={`relative z-10 text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                      item.isActive
                        ? "bg-primary-600 text-on-primary"
                        : "bg-accent-100 text-accent-700"
                    }`}
                  >
                    {item.badge}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Ramadan Milestone Card */}
        <motion.div
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? "auto" : 0,
          }}
          transition={SIDEBAR_TRANSITION}
          className="overflow-hidden"
        >
          <div className="w-[244px] p-4 rounded-2xl bg-accent-50 border border-accent-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs whitespace-nowrap">
              <span className="font-semibold text-accent-800">
                Hari ke-16 Ramadan
              </span>
              <span className="font-semibold text-accent-700">53%</span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-accent-200/70 overflow-hidden">
              <div
                className="h-full bg-accent-600 rounded-full"
                style={{ width: "53%" }}
              />
            </div>

            <p className="text-xs text-accent-700 leading-relaxed">
              {isTeacherView
                ? "Pendampingan pencatatan pekan kedua kelas VIII-A."
                : isParentView
                ? "Pekan ke-2: dampingi kebiasaan baik ananda di rumah."
                : "14 hari menuju Idulfitri. Catat kegiatan harian apa adanya."}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Profile & Role Switch (pixel-steady icons) */}
      <div className="flex flex-col gap-2.5 p-3 border-t border-border-subtle">
        <div
          className="w-full min-h-12 pl-2 pr-2.5 py-1.5 rounded-2xl bg-bg-base/70 border border-border-subtle flex items-center gap-2.5 overflow-hidden"
          title={!isOpen ? currentUser?.name || "Akun Demo" : undefined}
        >
          <div className="w-9 h-9 rounded-full bg-primary-100 border border-primary-200 text-primary-700 font-semibold flex items-center justify-center text-sm shrink-0">
            {currentUser?.avatar || "D"}
          </div>
          <motion.div
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              x: isOpen ? 0 : -8,
            }}
            transition={SIDEBAR_TRANSITION}
            className="overflow-hidden whitespace-nowrap min-w-0 flex-1"
          >
            <div className="text-xs font-semibold text-text-main truncate">
              {currentUser?.name || "Akun Demo"}
            </div>
            <div className="text-[11px] text-text-muted truncate">
              {currentUser?.title || "Data Contoh"}
            </div>
          </motion.div>
        </div>

        <motion.button
          whileTap={tapScale}
          type="button"
          onClick={handleSwitchRole}
          aria-label={!isOpen ? "Ganti Peran Demo" : undefined}
          title={!isOpen ? "Ganti Peran Demo" : undefined}
          className="w-full min-h-12 pl-4 pr-3 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main text-xs font-semibold transition-colors cursor-pointer flex items-center gap-3 overflow-hidden"
        >
          <IconSwitchRole
            className="text-lg text-primary-600 shrink-0"
            aria-hidden="true"
          />
          <motion.span
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              x: isOpen ? 0 : -8,
            }}
            transition={SIDEBAR_TRANSITION}
            className="overflow-hidden whitespace-nowrap"
          >
            Ganti Peran Demo
          </motion.span>
        </motion.button>
      </div>
    </motion.aside>
  );
}
