import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
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
  IconSidebar,
} from "../../lib/icons";

export default function DesktopSidebar({ isOpen = true, onToggle }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, switchRole } = useAuth();

  const isChatRoute = pathname.startsWith("/chat");

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

  // Mode Guru: Atur Kegiatan dihapus sesuai instruksi
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
    <>
      {/* Slim Collapsed Rail on Desktop (non-chat pages; on /chat, toggle sits cleanly in ChatHeader) */}
      {!isOpen && !isChatRoute && (
        <aside
          aria-label="Navigasi ringkas"
          className="hidden lg:flex flex-col items-center justify-between w-[76px] h-screen sticky top-0 border-r border-border bg-bg-surface shrink-0 z-30 select-none py-4 px-2 no-print"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.button
              whileTap={tapScale}
              type="button"
              onClick={onToggle}
              className="w-12 h-12 rounded-2xl border border-border bg-bg-base hover:bg-bg-elevated text-text-main flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Buka navigasi samping"
              title="Buka navigasi"
            >
              <IconSidebar className="text-xl text-primary-600" aria-hidden="true" />
            </motion.button>

            <nav aria-label="Menu ringkas" className="flex flex-col gap-2">
              {activeNavItems.map((item) => {
                const Icon = item.isActive ? item.activeIcon : item.icon;
                return (
                  <motion.button
                    key={item.id}
                    whileTap={tapScale}
                    type="button"
                    onClick={() => navigate(item.path)}
                    aria-label={item.label}
                    title={item.label}
                    aria-current={item.isActive ? "page" : undefined}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors cursor-pointer ${
                      item.isActive
                        ? "bg-primary-100 text-primary-700 border border-primary-200/80"
                        : "text-text-muted hover:text-text-main hover:bg-bg-base"
                    }`}
                  >
                    <Icon className="text-xl" aria-hidden="true" />
                  </motion.button>
                );
              })}
            </nav>
          </div>

          <motion.button
            whileTap={tapScale}
            type="button"
            onClick={handleSwitchRole}
            className="w-12 h-12 rounded-2xl border border-border bg-bg-surface hover:bg-bg-elevated text-primary-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Ganti peran demo"
            title="Ganti peran demo"
          >
            <IconSwitchRole className="text-xl" aria-hidden="true" />
          </motion.button>
        </aside>
      )}

      {/* Expanded Desktop Sidebar */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22, ease }}
            aria-label="Sidebar utama"
            className="hidden lg:flex flex-col justify-between w-64 xl:w-[272px] h-screen sticky top-0 border-r border-border bg-bg-surface shrink-0 z-30 select-none p-4 no-print"
          >
            <div className="flex flex-col gap-6 overflow-y-auto scrollbar-none">
              {/* Brand Header with Logo Al-Hikmah + Collapse Trigger */}
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => navigate(homeTarget)}
                  className="flex items-center gap-2.5 px-1.5 py-1 rounded-2xl text-left hover:bg-bg-base transition-colors cursor-pointer min-h-12 min-w-0 flex-1"
                >
                  <div className="w-10 h-10 rounded-2xl bg-bg-base border border-border-subtle overflow-hidden flex items-center justify-center shrink-0">
                    <img
                      src={logoAlHikmah}
                      alt="Logo Al Hikmah"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="font-display font-bold text-base text-text-main leading-tight block truncate">
                      Al Hikmah
                    </span>
                    <span className="text-[11px] text-text-muted font-medium block mt-0.5 truncate">
                      Ramadan 1448 H · {roleTitle}
                    </span>
                  </div>
                </button>

                <motion.button
                  whileTap={tapScale}
                  type="button"
                  onClick={onToggle}
                  className="w-11 h-11 rounded-2xl text-text-muted hover:text-text-main hover:bg-bg-elevated flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Tutup navigasi samping"
                  title="Tutup navigasi"
                >
                  <IconCollapseLeft className="text-lg" aria-hidden="true" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav aria-label="Menu navigasi" className="flex flex-col gap-1.5">
                <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider px-3 mb-1">
                  {isTeacherView
                    ? "Menu Guru"
                    : isParentView
                    ? "Menu Wali Siswa"
                    : "Menu Utama"}
                </div>

                {activeNavItems.map((item) => {
                  const Icon = item.isActive ? item.activeIcon : item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      whileTap={tapScale}
                      type="button"
                      onClick={() => navigate(item.path)}
                      aria-current={item.isActive ? "page" : undefined}
                      className={`relative w-full min-h-12 flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm transition-colors cursor-pointer ${
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
                        <span className="truncate">{item.label}</span>
                      </span>

                      {item.badge && (
                        <span
                          className={`relative z-10 text-xs font-semibold px-2 py-0.5 rounded-full ${
                            item.isActive
                              ? "bg-primary-600 text-on-primary"
                              : "bg-accent-100 text-accent-700"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Ramadan Milestone Card */}
              <div className="p-4 rounded-2xl bg-accent-50 border border-accent-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
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
            </div>

            {/* Bottom Profile + Role Switch */}
            <div className="flex flex-col gap-2.5 pt-3.5 border-t border-border-subtle">
              <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-2xl bg-bg-base/70 border border-border-subtle">
                <div className="w-10 h-10 rounded-full bg-primary-100 border border-primary-200 text-primary-700 font-semibold flex items-center justify-center text-sm shrink-0">
                  {currentUser?.avatar || "D"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-text-main truncate">
                    {currentUser?.name || "Akun Demo"}
                  </div>
                  <div className="text-[11px] text-text-muted truncate">
                    {currentUser?.title || "Data Contoh"}
                  </div>
                </div>
              </div>

              <motion.button
                whileTap={tapScale}
                type="button"
                onClick={handleSwitchRole}
                className="w-full min-h-12 px-3.5 rounded-full border border-border bg-bg-surface hover:bg-bg-elevated text-text-main text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <IconSwitchRole
                  className="text-base text-primary-600"
                  aria-hidden="true"
                />
                <span>Ganti Peran Demo</span>
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
