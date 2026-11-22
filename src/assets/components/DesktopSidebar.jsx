import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  LuHouse,
  LuCalendarDays,
  LuClipboardCheck,
  LuMessageSquare,
  LuSparkles,
  LuEllipsis,
  LuUsers,
  LuHeart,
  LuClipboardList,
  LuSettings,
  LuRepeat,
  LuHeartHandshake,
} from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";

export default function DesktopSidebar({ onOpenSettings }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { currentUser, switchRole } = useAuth();

  const isTeacher = currentUser?.role === "guru";
  const isParent = currentUser?.role === "orang-tua";

  const teacherNavItems = [
    {
      id: "kelas-saya",
      label: "Kelas Saya",
      path: "/guru",
      icon: LuUsers,
      isActive: pathname === "/guru" || pathname === "/guru/kelas",
    },
    {
      id: "perlu-disapa",
      label: "Perlu Disapa",
      path: "/guru/sapa",
      icon: LuHeart,
      badge: "4",
      isActive: pathname.startsWith("/guru/sapa"),
    },
    {
      id: "rekap-cetak",
      label: "Rekap & Cetak",
      path: "/guru/rekap",
      icon: LuClipboardList,
      isActive: pathname.startsWith("/guru/rekap"),
    },
    {
      id: "atur-kegiatan",
      label: "Atur Kegiatan",
      path: "/guru/atur-kegiatan",
      icon: LuSettings,
      isActive: pathname.startsWith("/guru/atur-kegiatan"),
    },
    {
      id: "chat",
      label: "Tanya AI",
      path: "/chat",
      icon: LuMessageSquare,
      badge: "AI",
      isActive: pathname.startsWith("/chat"),
    },
  ];

  const studentNavItems = [
    {
      id: "hari-ini",
      label: "Hari Ini",
      path: "/",
      icon: LuHouse,
      isActive: pathname === "/" || pathname === "/home",
    },
    {
      id: "ramadan",
      label: "Kalender Ramadan",
      path: "/ramadan",
      icon: LuCalendarDays,
      isActive: pathname.startsWith("/ramadan"),
    },
    {
      id: "kegiatan-khusus",
      label: "Kegiatan Khusus",
      path: "/kegiatan-khusus",
      icon: LuSparkles,
      isActive: pathname.startsWith("/kegiatan-khusus"),
    },
    {
      id: "catatan",
      label: "Isi Catatan",
      path: "/catatan",
      icon: LuClipboardCheck,
      isActive: pathname.startsWith("/catatan"),
    },
    {
      id: "chat",
      label: "Tanya AI",
      path: "/chat",
      icon: LuMessageSquare,
      badge: "AI",
      isActive: pathname.startsWith("/chat"),
    },
  ];

  const parentNavItems = [
    {
      id: "ringkasan-anak",
      label: "Catatan Amaliyah Anak",
      path: "/orang-tua",
      icon: LuHeartHandshake,
      isActive: pathname.startsWith("/orang-tua"),
    },
    {
      id: "chat",
      label: "Tanya AI",
      path: "/chat",
      icon: LuMessageSquare,
      badge: "AI",
      isActive: pathname.startsWith("/chat"),
    },
  ];

  const activeNavItems = isTeacher
    ? teacherNavItems
    : isParent
    ? parentNavItems
    : studentNavItems;

  const handleSwitch = () => {
    const next = switchRole();
    if (next === "guru") navigate("/guru");
    else if (next === "siswa") navigate("/");
    else if (next === "orang-tua") navigate("/orang-tua");
  };

  const roleTitle = isTeacher
    ? "Panel Guru"
    : isParent
    ? "Wali Santri"
    : "Siswa";

  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 xl:w-72 h-screen sticky top-0 border-r border-border bg-bg-surface shrink-0 z-30 select-none p-4 transition-colors duration-200">
      {/* ================= TOP SECTION: BRAND & NAV ================= */}
      <div className="flex flex-col gap-6">
        {/* Brand Header */}
        <div
          onClick={() =>
            navigate(isTeacher ? "/guru" : isParent ? "/orang-tua" : "/")
          }
          className="flex items-center gap-3 px-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary-surface text-primary flex items-center justify-center text-xl shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <LuSparkles />
          </div>
          <div>
            <h1 className="font-bold text-base text-text-main leading-tight">
              Al-Hikmah
            </h1>
            <p className="text-xs text-text-muted font-normal mt-0.5">
              Ramadan 1448 H · {roleTitle}
            </p>
          </div>
        </div>

        {/* Main Navigation Menu */}
        <nav className="flex flex-col gap-1.5">
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider px-3 mb-1">
            {isTeacher
              ? "Menu Guru & Wali Kelas"
              : isParent
              ? "Menu Wali Santri"
              : "Menu Utama"}
          </div>

          {activeNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  item.isActive
                    ? "bg-primary text-white shadow-xs"
                    : "text-text-muted hover:text-text-main hover:bg-bg-elevated"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`text-lg ${
                      item.isActive ? "text-white" : "text-text-muted"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      item.isActive
                        ? "bg-white/20 text-white"
                        : "bg-primary-surface text-primary"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Ramadan Progress Widget in Sidebar */}
        <div className="mx-1 p-3.5 rounded-2xl bg-accent-surface border border-accent/30 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#451A03]">
              Hari ke-14 berjalan
            </span>
            <span className="text-[11px] font-bold text-[#78350F]">
              47%
            </span>
          </div>

          <div className="w-full h-1.5 rounded-md bg-accent/20 overflow-hidden">
            <div
              className="h-full bg-accent rounded-md transition-all duration-300"
              style={{ width: "47%" }}
            />
          </div>

          <p className="text-[11px] text-[#78350F] font-medium leading-tight">
            {isTeacher
              ? "Evaluasi amaliyah tengah Ramadan kelas VIII-A."
              : isParent
              ? "Pekan ke-2: Dampingi ananda beribadah di rumah."
              : "16 hari lagi menuju Hari Raya Idul Fitri 1448 H."}
          </p>
        </div>
      </div>

      {/* ================= BOTTOM SECTION: USER PROFILE & ROLE SWITCH ================= */}
      <div className="flex flex-col gap-2.5 pt-3 border-t border-border">
        {/* User Profile Card */}
        <div className="flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-bg-elevated transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-9 h-9 rounded-xl border-2 font-bold flex items-center justify-center text-sm shrink-0 shadow-2xs ${
                isTeacher
                  ? "border-primary/40 bg-primary-surface text-primary"
                  : isParent
                  ? "border-emerald-600/40 bg-emerald-50 text-emerald-800"
                  : "border-accent/40 bg-accent-surface text-accent"
              }`}
            >
              {currentUser?.avatar || "U"}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-text-main truncate">
                {currentUser?.name || "Pengguna"}
              </div>
              <div className="text-[11px] text-text-muted truncate">
                {currentUser?.title || currentUser?.email}
              </div>
            </div>
          </div>

          {onOpenSettings && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={onOpenSettings}
              className="p-1.5 text-text-muted hover:text-text-main hover:bg-bg-base transition-colors rounded-lg cursor-pointer"
              title="Pengaturan"
              aria-label="Pengaturan"
            >
              <LuEllipsis className="text-lg" />
            </motion.button>
          )}
        </div>

        {/* 1-Click Role Switch Helper */}
        <button
          type="button"
          onClick={handleSwitch}
          className="w-full py-2 px-3 rounded-xl bg-bg-elevated hover:bg-border text-text-main text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <LuRepeat className="text-sm text-primary" />
          <span>Ganti Peran Demo</span>
        </button>
      </div>
    </aside>
  );
}
